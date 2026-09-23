import Link from "next/link";
import { FavoriteButton } from "@/modules/blog/components/FavoriteButton";
import type { Article } from "@/modules/blog/types";
import { PageShell } from "@/shared/components/PageShell";

interface ArticleDetailScreenProps {
  article: Article;
}

export const ArticleDetailScreen = ({ article }: ArticleDetailScreenProps) => {
  return (
    <PageShell>
      <article className="rounded border bg-white p-6 shadow-sm sm:p-8">
        <Link
          href="/"
          className="text-sm font-semibold text-blue-600 hover:text-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Voltar para as notícias
        </Link>
        <p className="mt-6 text-sm text-gray-500">
          {article.points} pontos · por {article.author} · {article.date}
        </p>
        <h1 className="mt-2 text-4xl font-bold">{article.title}</h1>
        <div className="mt-6 space-y-4 leading-7 text-gray-700">
          {article.content.map((paragraph, index) => (
            <p key={`${article.slug}-${index}`}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Abrir notícia original
          </a>
          <FavoriteButton slug={article.slug} title={article.title} />
        </div>
      </article>
    </PageShell>
  );
};
