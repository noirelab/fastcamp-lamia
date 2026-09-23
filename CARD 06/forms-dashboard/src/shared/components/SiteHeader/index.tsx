import Link from "next/link";

export const SiteHeader = () => {
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
          className="flex flex-wrap gap-4 text-sm text-gray-600"
        >
          <Link
            href="/"
            className="hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Início
          </Link>
          <Link
            href="/dashboard"
            className="hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Dashboard
          </Link>
          <Link
            href="/perfil"
            className="hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Perfil
          </Link>
          <Link
            href="/login"
            className="hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Login
          </Link>
          <Link
            href="/cadastro"
            className="hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Cadastro
          </Link>
        </nav>
      </div>
    </header>
  );
};
