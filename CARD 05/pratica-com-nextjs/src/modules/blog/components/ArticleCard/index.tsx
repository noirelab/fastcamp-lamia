import Link from "next/link";
import { FavoriteButton } from "@/modules/blog/components/FavoriteButton";
import type { Article } from "@/modules/blog/types";

interface ArticleCardProps {
  article: Article;
}

export const ArticleCard = ({ article }: ArticleCardProps) => {
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
      <p className="mt-2 leading-6 text-gray-600">por {article.author}</p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <Link
          href={`/artigos/${article.slug}`}
          className="text-sm font-semibold text-blue-600 hover:text-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Ler notícia
        </Link>
        <FavoriteButton slug={article.slug} title={article.title} />
      </div>
    </article>
  );
};
