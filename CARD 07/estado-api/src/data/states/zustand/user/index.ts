import { create } from "zustand";
import { persist } from "zustand/middleware";
import { clearToken } from "@/data/services/api/token";
import { createSafeStorage } from "@/data/states/zustand/storage";
import type { LoggedUser } from "@/modules/auth/data/schemas/login";

interface UserStore {
  user: LoggedUser | null;
  setUser: (user: LoggedUser | null) => void;
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
