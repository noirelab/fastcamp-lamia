import type { Article } from "@/modules/blog/types";

const HN_API_URL = "https://hn.algolia.com/api/v1";
const HN_QUERY = "formula 1";
const REVALIDATE_SECONDS = 60 * 60;

interface HnHit {
  objectID: string;
  title: string | null;
  author: string | null;
  points: number | null;
  num_comments: number | null;
  created_at: string | null;
  url: string | null;
  story_text: string | null;
}

interface HnSearchResponse {
  hits: HnHit[];
}

interface HnItem {
  id: number;
  title: string | null;
  author: string | null;
  points: number | null;
  created_at: string | null;
  url: string | null;
  text: string | null;
}

const formatDate = (value: string | null) =>
  value ? new Date(value).toLocaleDateString("pt-BR") : "Data desconhecida";

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, "").trim();

const mapHit = (hit: HnHit): Article => ({
  slug: hit.objectID,
  title: hit.title ?? "Sem título",
  description: `${hit.points ?? 0} pontos · ${hit.num_comments ?? 0} comentários`,
  author: hit.author ?? "desconhecido",
  points: hit.points ?? 0,
  comments: hit.num_comments ?? 0,
  date: formatDate(hit.created_at),
  url: hit.url ?? `https://news.ycombinator.com/item?id=${hit.objectID}`,
  content: hit.story_text
    ? [stripHtml(hit.story_text)]
    : [
        "Esta notícia foi publicada originalmente na Hacker News. Abra o link original para ler o conteúdo completo.",
      ],
});

export const fetchArticles = async (): Promise<Article[]> => {
  const params = new URLSearchParams({
    query: HN_QUERY,
    tags: "story",
    hitsPerPage: "12",
  });

  const response = await fetch(`${HN_API_URL}/search?${params}`, {
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error("Não foi possível buscar as notícias na Hacker News.");
  }

  const data = (await response.json()) as HnSearchResponse;

  return data.hits.filter((hit) => hit.title).map(mapHit);
};

export const fetchArticleBySlug = async (slug: string): Promise<Article | null> => {
  const response = await fetch(`${HN_API_URL}/items/${slug}`, {
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!response.ok) return null;

  const item = (await response.json()) as HnItem;

  if (!item.title) return null;

  return {
    slug: String(item.id),
    title: item.title,
    description: `${item.points ?? 0} pontos · por ${item.author ?? "desconhecido"}`,
    author: item.author ?? "desconhecido",
    points: item.points ?? 0,
    comments: 0,
    date: formatDate(item.created_at),
    url: item.url ?? `https://news.ycombinator.com/item?id=${item.id}`,
    content: item.text
      ? [stripHtml(item.text)]
      : [
          "Esta notícia foi publicada originalmente na Hacker News. Abra o link original para ler o conteúdo completo.",
        ],
  };
};
