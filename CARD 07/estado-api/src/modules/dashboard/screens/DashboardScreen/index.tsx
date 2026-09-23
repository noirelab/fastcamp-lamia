"use client";

import { usePostsQuery } from "@/modules/posts/data/hooks/queries/usePostsQuery";

export const DashboardScreen = () => {
  const { data: posts, isPending, isError, refetch, isFetching } = usePostsQuery();

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">
      <section className="rounded border bg-white p-6 shadow-sm sm:p-8">
        <p className="text-sm font-semibold text-blue-600">Dashboard</p>
        <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Posts da API pública</h1>
            <p className="mt-2 max-w-2xl leading-7 text-gray-600">Lista de posts do JSONPlaceholder.</p>
          </div>
          <button type="button" onClick={() => refetch()} disabled={isFetching} className="rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50">
            {isFetching ? "Atualizando..." : "Atualizar posts"}
          </button>
        </div>
      </section>

      <section className="mt-6 rounded border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900">Lista de posts</h2>
        {isPending && <p className="mt-5 text-gray-600">Carregando posts...</p>}
        {isError && <p className="mt-5 text-red-600">Não foi possível carregar os posts.</p>}
        {posts && (
          <ul className="mt-5 grid gap-3">
            {posts.map((post) => (
              <li key={post.id} className="rounded border bg-gray-50 p-4">
                <p className="font-semibold capitalize text-gray-900">{post.title}</p>
                <p className="mt-2 text-sm leading-6 text-gray-600">{post.body}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
};
