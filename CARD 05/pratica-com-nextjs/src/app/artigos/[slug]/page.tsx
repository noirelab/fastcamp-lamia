import { notFound } from "next/navigation";
import { fetchArticleBySlug } from "@/modules/blog/data/services/articles";
import { ArticleDetailScreen } from "@/modules/blog/screens/ArticleDetailScreen";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await fetchArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return <ArticleDetailScreen article={article} />;
}
