"use client";

import { useEffect, useRef } from "react";
import { useUserStore } from "@/data/states/zustand/user";
import { useLoginMutation } from "@/modules/auth/data/hooks/mutations/useLoginMutation";

const mockCredentials = {
  email: "piloto@f1.com",
  password: "senha123",
};

export const SiteHeader = () => {
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);
  const { mutate, isPending, isError } = useLoginMutation();
  const statusRef = useRef<HTMLDivElement>(null);
  const previousUserRef = useRef(user);

  useEffect(() => {
    void useUserStore.persist.rehydrate();
  }, []);

  useEffect(() => {
    if (previousUserRef.current !== user) {
      previousUserRef.current = user;
      statusRef.current?.focus();
    }
  }, [user]);

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="text-lg font-bold text-gray-900">Card 07 - Estado e API</p>
          <p className="text-sm text-gray-600">Zustand, TanStack Query e Axios</p>
        </div>

        <div
          ref={statusRef}
          tabIndex={-1}
          role="status"
          aria-live="polite"
          aria-busy={isPending}
          className="flex items-center gap-3 focus:outline-none"
        >
          {user ? (
            <>
              <p className="text-sm font-semibold text-gray-700">Olá, {user.name}</p>
              <button
                type="button"
                onClick={logout}
                className="rounded border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100"
              >
                Sair
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => mutate(mockCredentials)}
              disabled={isPending}
              className="rounded bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isPending ? "Entrando..." : "Entrar como usuário mock"}
            </button>
          )}
        </div>
      </div>

      {isError && (
        <p
          role="alert"
          className="border-t border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700 sm:px-6"
        >
          Não foi possível entrar. Tente novamente.
        </p>
      )}
    </header>
  );
};
