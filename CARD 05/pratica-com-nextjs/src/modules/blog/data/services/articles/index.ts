import { z } from "zod";
import type { Article } from "@/modules/blog/types";

const HN_QUERY = "formula 1";
const REVALIDATE_SECONDS = 60 * 60;

const hnHitSchema = z.object({
  objectID: z.string(),
  title: z.string().nullish(),
  author: z.string().nullish(),
  points: z.number().nullish(),
  num_comments: z.number().nullish(),
  created_at: z.string().nullish(),
  url: z.url().or(z.literal("")).nullish(),
  story_text: z.string().nullish(),
});

const hnSearchSchema = z.object({
  hits: z.array(hnHitSchema),
});

type HnHit = z.infer<typeof hnHitSchema>;

const getApiUrl = () => {
  const url = process.env.HN_API_URL;

  if (!url) {
    throw new Error("Defina HN_API_URL no .env (veja o .env.example).");
  }

  return url;
};

const formatDate = (value: string | null | undefined) =>
  value ? new Date(value).toLocaleDateString("pt-BR") : "Data desconhecida";

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, "").trim();

const toArticle = (hit: HnHit & { title: string }): Article => ({
  slug: hit.objectID,
  title: hit.title,
  author: hit.author ?? "desconhecido",
  points: hit.points ?? 0,
  comments: hit.num_comments ?? 0,
  date: formatDate(hit.created_at),
  url: hit.url || null,
  content: hit.story_text
    ? [stripHtml(hit.story_text)]
    : [
        "Esta notícia foi publicada originalmente na Hacker News. Abra o link original para ler o conteúdo completo.",
      ],
});

const searchStories = async (params: Record<string, string>) => {
  const query = new URLSearchParams({ tags: "story", ...params });

  const response = await fetch(`${getApiUrl()}/search?${query}`, {
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error("Não foi possível buscar as notícias na Hacker News.");
  }

  const result = hnSearchSchema.safeParse(await response.json());

  if (!result.success) {
    throw new Error("A Hacker News respondeu num formato inesperado.");
  }

  return result.data.hits
    .filter((hit): hit is HnHit & { title: string } => Boolean(hit.title))
    .map(toArticle);
};

export const fetchArticles = () =>
  searchStories({ query: HN_QUERY, hitsPerPage: "12" });

export const fetchArticleBySlug = async (
  slug: string,
): Promise<Article | null> => {
  if (!/^\d+$/.test(slug)) return null;

  const [article] = await searchStories({ tags: `story,story_${slug}` });

  return article ?? null;
};
