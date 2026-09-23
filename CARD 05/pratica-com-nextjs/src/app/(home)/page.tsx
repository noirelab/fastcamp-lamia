import type { Metadata } from "next";
import { fetchArticles } from "@/modules/blog/data/services/articles";
import { HomeScreen } from "@/modules/blog/screens/HomeScreen";

export const metadata: Metadata = {
  title: "Notícias | F1 2021 - Mini Blog",
};

export default async function HomePage() {
  const articles = await fetchArticles();

  return <HomeScreen articles={articles} />;
}
