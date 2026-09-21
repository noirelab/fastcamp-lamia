import Link from "next/link";
import type { Article } from "@/modules/blog/types";
import { PageShell } from "@/shared/components/PageShell";

interface ArticleDetailScreenProps {
  article: Article;
}

export const ArticleDetailScreen = ({
  article,
}: ArticleDetailScreenProps) => {
  return (
    <PageShell>
      <article className="rounded border bg-white p-6 shadow-sm sm:p-8">
        <Link
          href="/"
          className="text-sm font-semibold text-blue-600 hover:text-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Voltar para os posts
        </Link>
        <p className="mt-6 text-sm text-gray-500">
          {article.category} - {article.date}
        </p>
        <h1 className="mt-2 text-4xl font-bold">{article.title}</h1>
        <div className="mt-6 space-y-4 leading-7 text-gray-700">
          {article.content.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </article>
    </PageShell>
  );
};
