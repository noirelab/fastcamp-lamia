import { create } from "zustand";
import { persist } from "zustand/middleware";
import { clearToken } from "@/data/services/api/token";
import { createSafeStorage } from "@/data/states/zustand/storage";

interface User {
  name: string;
  email: string;
}

interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => {
        clearToken();
        set({ user: null });
      },
    }),
    {
      name: "user",
      storage: createSafeStorage(),
      partialize: (state) => ({ user: state.user }),
      skipHydration: true,
    },
  ),
);
