import { create } from "zustand";
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

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => {
    clearToken();
    set({ user: null });
  },
}));
