"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthHydrated, useAuthStore } from "@/modules/auth/store";

const linkClass =
  "hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600";

export const SiteHeader = () => {
  const hydrated = useAuthHydrated();
  const user = useAuthStore((state) => state.user);
  const signOut = useAuthStore((state) => state.signOut);
  const router = useRouter();

  const handleSignOut = () => {
    signOut();
    router.replace("/login");
  };

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-4xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 md:max-w-5xl lg:max-w-6xl">
        <Link
          href="/"
          className="text-xl font-bold text-gray-900 hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          F1 2021 - Dashboard
        </Link>

        <nav
          aria-label="Navegação principal"
          className="flex flex-wrap items-center gap-4 text-sm text-gray-600"
        >
          <Link href="/" className={linkClass}>
            Início
          </Link>
          <Link href="/dashboard" className={linkClass}>
            Dashboard
          </Link>
          <Link href="/perfil" className={linkClass}>
            Perfil
          </Link>
          {hydrated &&
            (user ? (
              <>
                <span className="font-semibold text-gray-900">Olá, {user.name}</span>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="font-semibold text-red-600 hover:text-red-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                >
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className={linkClass}>
                  Login
                </Link>
                <Link href="/cadastro" className={linkClass}>
                  Cadastro
                </Link>
              </>
            ))}
        </nav>
      </div>
    </header>
  );
};
