import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createSafeStorage } from "@/data/states/zustand/storage";

interface PostsStore {
  readIds: number[];
  favoriteIds: number[];
  toggleRead: (id: number) => void;
  toggleFavorite: (id: number) => void;
}

const toggleId = (ids: number[], id: number) =>
  ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id];

export const usePostsStore = create<PostsStore>()(
  persist(
    (set) => ({
      readIds: [],
      favoriteIds: [],
      toggleRead: (id) =>
        set((state) => ({ readIds: toggleId(state.readIds, id) })),
      toggleFavorite: (id) =>
        set((state) => ({ favoriteIds: toggleId(state.favoriteIds, id) })),
    }),
    {
      name: "posts-state",
      storage: createSafeStorage(),
      partialize: (state) => ({
        readIds: state.readIds,
        favoriteIds: state.favoriteIds,
      }),
      skipHydration: true,
    },
  ),
);
