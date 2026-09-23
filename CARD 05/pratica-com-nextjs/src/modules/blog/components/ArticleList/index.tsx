"use client";

import { useRef, useState } from "react";
import { ArticleCard } from "@/modules/blog/components/ArticleCard";
import { useFavorites } from "@/modules/blog/hooks/useFavorites";
import type { Article } from "@/modules/blog/types";

interface ArticleListProps {
  articles: Article[];
}

export const ArticleList = ({ articles }: ArticleListProps) => {
  const [search, setSearch] = useState("");
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { isFavorite, toggleFavorite } = useFavorites();

  const filteredArticles = articles
    .filter((article) => !onlyFavorites || isFavorite(article.slug))
    .filter((article) =>
      article.title.toLowerCase().includes(search.toLowerCase()),
    );

  return (
    <section className="mt-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="text-2xl font-bold">Notícias</h2>
        <div className="flex flex-wrap items-end gap-3">
          <label className="grid gap-1 text-sm font-semibold text-gray-700">
            Buscar
            <input
              ref={inputRef}
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Digite um título"
              className="rounded border border-gray-300 bg-white px-3 py-2 font-normal outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
            />
          </label>
          <button
            type="button"
            onClick={() => inputRef.current?.focus()}
            className="rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Focar
          </button>
          <label className="flex items-center gap-2 pb-2 text-sm font-semibold text-gray-700">
            <input
              type="checkbox"
              checked={onlyFavorites}
              onChange={(event) => setOnlyFavorites(event.target.checked)}
              className="h-4 w-4 rounded border-gray-300"
            />
            Só favoritas
          </label>
        </div>
      </div>

      {filteredArticles.length > 0 ? (
        <div className="mt-4 grid gap-4">
          {filteredArticles.map((article) => (
            <ArticleCard
              key={article.slug}
              article={article}
              isFavorite={isFavorite(article.slug)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      ) : (
        <p className="mt-4 rounded border bg-white p-5 text-gray-600">
          Nenhuma notícia encontrada.
        </p>
      )}
    </section>
  );
};
