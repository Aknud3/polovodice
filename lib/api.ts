import type {
  Article,
  ArticleCategory,
  StorystreamItem,
  CleanroomStatus,
  MarketIndexItem,
  CampusEvent,
  PollData,
  CategoryCounts,
} from "@/types/portal";
import {
  MOCK_ARTICLES,
  MOCK_STORYSTREAM,
  MOCK_MARKET_INDICES,
  MOCK_CLEANROOM_STATUS,
  MOCK_CAMPUS_EVENTS,
  MOCK_POLL_DATA,
} from "@/data/mock-data";

/**
 * Získá seznam článků s volitelnou filtrací podle kategorie a vyhledávacího dotazu.
 * Implementuje Negative Space Programming – okamžitý early return při neshodě.
 */
export async function getArticles(options?: {
  category?: ArticleCategory | "all";
  query?: string;
  limit?: number;
}): Promise<Article[]> {
  const category = options?.category ?? "all";
  const query = options?.query?.trim().toLowerCase() ?? "";
  const limit = options?.limit;

  let results = MOCK_ARTICLES;

  // 1. Filtr kategorie
  if (category !== "all") {
    results = results.filter((art) => art.category === category);
  }

  // 2. Fulltext vyhledávání v titulku, perexu a tazích
  if (query.length > 0) {
    results = results.filter((art) => {
      const matchTitle = art.title.toLowerCase().includes(query);
      const matchPerex = art.perex.toLowerCase().includes(query);
      const matchTag = art.tags.some((t) => t.toLowerCase().includes(query));
      return matchTitle || matchPerex || matchTag;
    });
  }

  // 3. Omezení počtu výsledků
  if (typeof limit === "number" && limit > 0) {
    results = results.slice(0, limit);
  }

  return results;
}

/**
 * Získá hlavní prioritní zprávu pro Hero otvírák portálu.
 */
export async function getFeaturedArticle(): Promise<Article> {
  const featured = MOCK_ARTICLES.find((art) => art.featured === true);
  if (featured) {
    return featured;
  }
  return MOCK_ARTICLES[0];
}

/**
 * Vyhledá detail článku podle unikátního URL slugu.
 * Vrátí null, pokud článek neexistuje (Negative space boundary).
 */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const cleanSlug = slug.trim();
  if (cleanSlug.length === 0) {
    return null;
  }

  const found = MOCK_ARTICLES.find((art) => art.slug === cleanSlug);
  return found ?? null;
}

/**
 * Získá související články ke konkrétnímu článku.
 */
export async function getRelatedArticles(currentSlug: string, limit = 3): Promise<Article[]> {
  const current = await getArticleBySlug(currentSlug);
  if (!current) {
    return MOCK_ARTICLES.slice(0, limit);
  }

  return MOCK_ARTICLES
    .filter((art) => art.slug !== currentSlug)
    .filter((art) => art.category === current.category || art.tags.some((t) => current.tags.includes(t)))
    .slice(0, limit);
}

/**
 * Získá proud rychlých zpráv pro pravý sloupec (Minuta po minutě / Storystream).
 */
export async function getStorystreamItems(): Promise<StorystreamItem[]> {
  return MOCK_STORYSTREAM;
}

/**
 * Získá tržní a technologické indexy pro horní veřejnou lištu.
 */
export async function getMarketIndices(): Promise<MarketIndexItem[]> {
  return MOCK_MARKET_INDICES;
}

/**
 * Získá živý provozní stav čistých prostorů KN:E na Karlově náměstí.
 */
export async function getCleanroomStatus(): Promise<CleanroomStatus> {
  return MOCK_CLEANROOM_STATUS;
}

/**
 * Získá přehled nadcházejících seminářů a akcí.
 */
export async function getCampusEvents(limit = 3): Promise<CampusEvent[]> {
  return MOCK_CAMPUS_EVENTS.slice(0, limit);
}

/**
 * Získá data pro interaktivní hlasovací anketu.
 */
export async function getPollData(): Promise<PollData> {
  return MOCK_POLL_DATA;
}

/**
 * Spočítá počet článků v jednotlivých kategoriích pro Topic Hubs.
 */
export async function getCategoryCounts(): Promise<CategoryCounts> {
  const counts: CategoryCounts = {
    all: MOCK_ARTICLES.length,
  };

  for (const art of MOCK_ARTICLES) {
    counts[art.category] = (counts[art.category] ?? 0) + 1;
  }

  return counts;
}
