import { cookies } from "next/headers";
import Link from "next/link";
import { logoutAction } from "@/modules/auth/actions";
import { SESSION_COOKIE_NAME } from "@/modules/auth/session";

const navItemClass =
  "hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600";

export const SiteHeader = async () => {
  const cookieStore = await cookies();
  const isLoggedIn = cookieStore.get(SESSION_COOKIE_NAME)?.value === "1";

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-4xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 md:max-w-5xl lg:max-w-6xl">
        <Link
          href="/"
          className="text-xl font-bold text-gray-900 hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          F1 2021 - Mini Blog
        </Link>

        <nav
          aria-label="Navegação principal"
          className="flex flex-wrap gap-4 text-sm text-gray-600"
        >
          <Link href="/" className={navItemClass}>
            Início
          </Link>
          {isLoggedIn ? (
            <>
              <Link href="/perfil" className={navItemClass}>
                Perfil
              </Link>
              <form action={logoutAction}>
                <button type="submit" className={navItemClass}>
                  Sair
                </button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login" className={navItemClass}>
                Login
              </Link>
              <Link href="/cadastro" className={navItemClass}>
                Cadastro
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};
