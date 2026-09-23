import { ArticleList } from "@/modules/blog/components/ArticleList";
import type { Article } from "@/modules/blog/types";
import { PageShell } from "@/shared/components/PageShell";

interface HomeScreenProps {
  articles: Article[];
}

export const HomeScreen = ({ articles }: HomeScreenProps) => {
  return (
    <PageShell>
      <section className="rounded border bg-white p-6 shadow-sm sm:p-8">
        <p className="text-sm font-semibold text-blue-600">Fórmula 1</p>
        <h1 className="mt-3 text-4xl font-bold">Notícias de Fórmula 1</h1>
        <p className="mt-3 max-w-2xl leading-7 text-gray-600">
          Curadoria de notícias sobre Fórmula 1 buscadas na API da Hacker News.
          Salve as favoritas para encontrar depois.
        </p>
      </section>
      <ArticleList articles={articles} />
    </PageShell>
  );
};
