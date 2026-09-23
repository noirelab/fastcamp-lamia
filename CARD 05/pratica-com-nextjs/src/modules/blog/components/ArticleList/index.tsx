"use client";

import { useRef, useState } from "react";
import { ArticleCard } from "@/modules/blog/components/ArticleCard";
import type { Article } from "@/modules/blog/types";

interface ArticleListProps {
  articles: Article[];
}

export const ArticleList = ({ articles }: ArticleListProps) => {
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <section className="mt-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="text-2xl font-bold">Posts</h2>
        <div className="flex items-end gap-2">
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
        </div>
      </div>

      {filteredArticles.length > 0 ? (
        <div className="mt-4 grid gap-4">
          {filteredArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      ) : (
        <p className="mt-4 rounded border bg-white p-5 text-gray-600">
          Nenhum post encontrado.
        </p>
      )}
    </section>
  );
};
