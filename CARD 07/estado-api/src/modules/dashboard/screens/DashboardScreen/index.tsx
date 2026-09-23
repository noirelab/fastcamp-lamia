"use client";

import { useEffect, useState } from "react";
import { usePostsStore } from "@/data/states/zustand/posts";
import { usePostsQuery } from "@/modules/posts/data/hooks/queries/usePostsQuery";

type PostFilter = "all" | "unread" | "read";

const filterOptions: Array<{ value: PostFilter; label: string }> = [
  { value: "all", label: "Todos" },
  { value: "unread", label: "Não lidos" },
  { value: "read", label: "Lidos" },
];

export const DashboardScreen = () => {
  const { data: posts, isPending, isError, refetch, isFetching } = usePostsQuery();
  const readIds = usePostsStore((state) => state.readIds);
  const favoriteIds = usePostsStore((state) => state.favoriteIds);
  const toggleRead = usePostsStore((state) => state.toggleRead);
  const toggleFavorite = usePostsStore((state) => state.toggleFavorite);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<PostFilter>("all");

  useEffect(() => {
    void usePostsStore.persist.rehydrate();
  }, []);

  const filteredPosts = (posts ?? [])
    .filter((post) => {
      if (filter === "unread") return !readIds.includes(post.id);
      if (filter === "read") return readIds.includes(post.id);

      return true;
    })
    .filter((post) => post.title.toLowerCase().includes(search.toLowerCase()));

  const readCount = (posts ?? []).filter((post) => readIds.includes(post.id)).length;
  const favoriteCount = (posts ?? []).filter((post) =>
    favoriteIds.includes(post.id),
  ).length;

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
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Lista de posts</h2>
            <p role="status" className="mt-2 text-sm text-gray-600">
              {readCount} de {posts?.length ?? 0} lidos · {favoriteCount} favoritos
            </p>
          </div>

          <div className="flex flex-wrap items-end gap-3">
            <label className="grid gap-1 text-sm font-semibold text-gray-700">
              Buscar
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Título do post"
                className="min-h-10 rounded border border-gray-300 bg-white px-3 text-sm font-normal text-gray-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
              />
            </label>
            <div role="group" aria-label="Filtrar posts" className="flex gap-2">
              {filterOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  aria-pressed={filter === option.value}
                  onClick={() => setFilter(option.value)}
                  className={`min-h-10 rounded border px-3 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                    filter === option.value
                      ? "border-blue-600 bg-blue-50 text-blue-700"
                      : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {isPending && <p role="status" className="mt-5 text-gray-600">Carregando posts...</p>}
        {isError && <p role="alert" className="mt-5 text-red-600">Não foi possível carregar os posts.</p>}
        {posts &&
          (filteredPosts.length > 0 ? (
            <ul className="mt-5 grid gap-3">
              {filteredPosts.map((post) => {
                const isRead = readIds.includes(post.id);
                const isFavorite = favoriteIds.includes(post.id);

                return (
                  <li
                    key={post.id}
                    className={`rounded border p-4 ${isRead ? "bg-gray-50" : "bg-white"}`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <p className={`font-semibold capitalize ${isRead ? "text-gray-500" : "text-gray-900"}`}>
                        {post.title}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          aria-pressed={isFavorite}
                          aria-label={
                            isFavorite
                              ? `Remover ${post.title} dos favoritos`
                              : `Salvar ${post.title} nos favoritos`
                          }
                          onClick={() => toggleFavorite(post.id)}
                          className={`rounded border px-3 py-2 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                            isFavorite
                              ? "border-blue-600 bg-blue-50 text-blue-700"
                              : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {isFavorite ? "Favorito" : "Favoritar"}
                        </button>
                        <button
                          type="button"
                          aria-pressed={isRead}
                          aria-label={
                            isRead
                              ? `Marcar ${post.title} como não lido`
                              : `Marcar ${post.title} como lido`
                          }
                          onClick={() => toggleRead(post.id)}
                          className={`rounded border px-3 py-2 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                            isRead
                              ? "border-green-600 bg-green-50 text-green-700"
                              : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {isRead ? "Lido" : "Marcar lido"}
                        </button>
                      </div>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-gray-600">{post.body}</p>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="mt-5 text-gray-600">Nenhum post encontrado com esses filtros.</p>
          ))}
      </section>
    </main>
  );
};
