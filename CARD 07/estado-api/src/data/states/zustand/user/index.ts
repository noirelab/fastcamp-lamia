import { create } from "zustand";
import {
  createJSONStorage,
  persist,
  type StateStorage,
} from "zustand/middleware";
import { clearToken } from "@/data/services/api/token";

interface User {
  name: string;
  email: string;
}

interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

const memoryStorage: StateStorage = {
  getItem: () => null,
  setItem: () => undefined,
  removeItem: () => undefined,
};

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
      storage: createJSONStorage(() =>
        typeof window === "undefined" ? memoryStorage : localStorage,
      ),
      partialize: (state) => ({ user: state.user }),
      skipHydration: true,
    },
  ),
);
