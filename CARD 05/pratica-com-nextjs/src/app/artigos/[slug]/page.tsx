import { notFound } from "next/navigation";
import { fetchArticleBySlug, fetchArticles } from "@/modules/blog/data/services/articles";
import { ArticleDetailScreen } from "@/modules/blog/screens/ArticleDetailScreen";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export const generateStaticParams = async () => {
  try {
    const articles = await fetchArticles();

    return articles.map((article) => ({ slug: article.slug }));
  } catch {
    return [];
  }
};

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await fetchArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return <ArticleDetailScreen article={article} />;
}
