"use client";

import { useCallback, useSyncExternalStore } from "react";

const FAVORITES_KEY = "favorite-articles";
const EMPTY_FAVORITES: string[] = [];

const readFavorites = (): string[] => {
  try {
    const stored = JSON.parse(localStorage.getItem(FAVORITES_KEY) ?? "[]");

    return Array.isArray(stored)
      ? stored.filter((item): item is string => typeof item === "string")
      : [];
  } catch {
    return [];
  }
};

let favorites: string[] | null = null;
let listeners: Array<() => void> = [];

const emitChange = () => {
  listeners.forEach((listener) => listener());
};

const getSnapshot = () => {
  if (favorites === null) {
    favorites = readFavorites();
  }

  return favorites;
};

const getServerSnapshot = () => EMPTY_FAVORITES;

const subscribe = (listener: () => void) => {
  listeners.push(listener);

  const handleStorage = (event: StorageEvent) => {
    if (event.key !== FAVORITES_KEY) return;

    favorites = readFavorites();
    emitChange();
  };

  window.addEventListener("storage", handleStorage);

  return () => {
    listeners = listeners.filter((item) => item !== listener);
    window.removeEventListener("storage", handleStorage);
  };
};

const writeFavorites = (next: string[]) => {
  favorites = next;
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
  emitChange();
};

export const useFavorites = () => {
  const currentFavorites = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const toggleFavorite = useCallback((slug: string) => {
    const current = getSnapshot();

    writeFavorites(
      current.includes(slug)
        ? current.filter((item) => item !== slug)
        : [...current, slug],
    );
  }, []);

  const isFavorite = useCallback(
    (slug: string) => currentFavorites.includes(slug),
    [currentFavorites],
  );

  return { favorites: currentFavorites, isFavorite, toggleFavorite };
};
