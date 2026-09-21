import { notFound } from "next/navigation";
import { articles } from "@/modules/blog/data/articles";
import { ArticleDetailScreen } from "@/modules/blog/screens/ArticleDetailScreen";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);

  if (!article) {
    notFound();
  }

  return <ArticleDetailScreen article={article} />;
}
