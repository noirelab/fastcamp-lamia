import Link from "next/link";
import type { Article } from "@/modules/blog/types";

interface ArticleCardProps {
  article: Article;
  isFavorite: boolean;
  onToggleFavorite: (slug: string) => void;
}

export const ArticleCard = ({
  article,
  isFavorite,
  onToggleFavorite,
}: ArticleCardProps) => {
  return (
    <article className="rounded border bg-white p-5 shadow-sm">
      <p className="text-sm text-gray-500">
        {article.points} pontos · {article.comments} comentários · {article.date}
      </p>
      <h3 className="mt-2 text-2xl font-bold text-gray-900">
        <Link
          href={`/artigos/${article.slug}`}
          className="hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          {article.title}
        </Link>
      </h3>
      <p className="mt-2 leading-6 text-gray-600">{article.description}</p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <Link
          href={`/artigos/${article.slug}`}
          className="text-sm font-semibold text-blue-600 hover:text-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Ler notícia
        </Link>
        <button
          type="button"
          aria-pressed={isFavorite}
          aria-label={
            isFavorite
              ? `Remover ${article.title} dos favoritos`
              : `Salvar ${article.title} nos favoritos`
          }
          onClick={() => onToggleFavorite(article.slug)}
          className={`rounded border px-3 py-2 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
            isFavorite
              ? "border-blue-600 bg-blue-50 text-blue-700"
              : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          {isFavorite ? "Salva" : "Salvar"}
        </button>
      </div>
    </article>
  );
};
