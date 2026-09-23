import { useEffect } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ILoginSchema, IRegisterSchema } from "./schemas";

export interface AuthUser {
  name: string;
  email: string;
}

interface MockAccount extends AuthUser {
  password: string;
}

// conta fixa de demonstração, documentada no README
export const MOCK_ACCOUNT: MockAccount = {
  name: "Piloto Demo",
  email: "piloto@f1.com",
  password: "senha123",
};

interface AuthStore {
  hydrated: boolean;
  user: AuthUser | null;
  accounts: MockAccount[];
  signIn: (credentials: ILoginSchema) => boolean;
  register: (data: IRegisterSchema) => boolean;
  signOut: () => void;
  updateName: (name: string) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      hydrated: false,
      user: null,
      accounts: [MOCK_ACCOUNT],

      signIn: ({ email, password }) => {
        const account = get().accounts.find(
          (item) => item.email === email.toLowerCase() && item.password === password,
        );

        if (!account) return false;

        set({ user: { name: account.name, email: account.email } });
        return true;
      },

      register: ({ name, email, password }) => {
        const normalizedEmail = email.toLowerCase();

        if (get().accounts.some((item) => item.email === normalizedEmail)) return false;

        set((state) => ({
          accounts: [...state.accounts, { name, email: normalizedEmail, password }],
          user: { name, email: normalizedEmail },
        }));
        return true;
      },

      signOut: () => set({ user: null }),

      updateName: (name) =>
        set((state) => {
          if (!state.user) return {};

          const email = state.user.email;

          return {
            user: { ...state.user, name },
            accounts: state.accounts.map((item) =>
              item.email === email ? { ...item, name } : item,
            ),
          };
        }),
    }),
    {
      name: "f1-auth",
      // hidrata só no cliente, depois da montagem, para o HTML do servidor bater com o primeiro render
      skipHydration: true,
      partialize: ({ user, accounts }) => ({ user, accounts }),
      onRehydrateStorage: () => () => useAuthStore.setState({ hydrated: true }),
    },
  ),
);

export const useAuthHydrated = () => {
  const hydrated = useAuthStore((state) => state.hydrated);

  useEffect(() => {
    if (!useAuthStore.persist.hasHydrated()) void useAuthStore.persist.rehydrate();
  }, []);

  return hydrated;
};
