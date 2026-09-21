import Link from "next/link";
import type { Article } from "@/modules/blog/types";

interface ArticleCardProps {
  article: Article;
}

export const ArticleCard = ({ article }: ArticleCardProps) => {
  return (
    <article className="rounded border bg-white p-5 shadow-sm">
      <p className="text-sm text-gray-500">
        {article.category} - {article.date}
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
      <Link
        href={`/artigos/${article.slug}`}
        className="mt-4 inline-block text-sm font-semibold text-blue-600 hover:text-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        Ler post
      </Link>
    </article>
  );
};
