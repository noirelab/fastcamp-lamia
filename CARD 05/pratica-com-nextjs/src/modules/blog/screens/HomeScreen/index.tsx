import { ArticleList } from "@/modules/blog/components/ArticleList";
import { articles } from "@/modules/blog/data/articles";
import { PageShell } from "@/shared/components/PageShell";

export const HomeScreen = () => {
  return (
    <PageShell>
      <section className="rounded border bg-white p-6 shadow-sm sm:p-8">
        <p className="text-sm font-semibold text-blue-600">Fórmula 1</p>
        <h1 className="mt-3 text-4xl font-bold">Temporada 2021</h1>
        <p className="mt-3 max-w-2xl leading-7 text-gray-600">
          Dois posts simples sobre alguns momentos marcantes da Fórmula 1 em
          2021.
        </p>
      </section>
      <ArticleList articles={articles} />
    </PageShell>
  );
};
