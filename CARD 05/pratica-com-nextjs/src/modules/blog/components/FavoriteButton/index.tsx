"use client";

import { useFavorites } from "@/modules/blog/hooks/useFavorites";

interface FavoriteButtonProps {
  slug: string;
  title: string;
}

export const FavoriteButton = ({ slug, title }: FavoriteButtonProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const saved = isFavorite(slug);

  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={
        saved ? `Remover ${title} dos favoritos` : `Salvar ${title} nos favoritos`
      }
      onClick={() => toggleFavorite(slug)}
      className={`rounded border px-3 py-2 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
        saved
          ? "border-blue-600 bg-blue-50 text-blue-700"
          : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
      }`}
    >
      {saved ? "Salvo nos favoritos" : "Salvar nos favoritos"}
    </button>
  );
};
