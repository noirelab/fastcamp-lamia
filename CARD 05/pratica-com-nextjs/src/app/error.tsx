"use client";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <main className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
      <h1 className="text-2xl font-bold text-gray-900">
        Não foi possível carregar as notícias.
      </h1>
      <p className="mt-3 text-gray-600">{error.message}</p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        Tentar novamente
      </button>
    </main>
  );
}
