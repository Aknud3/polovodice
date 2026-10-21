import type {
  Article,
  ArticleCategory,
  Audience,
  StorystreamItem,
  CleanroomStatus,
  MarketIndexItem,
  CampusEvent,
  PollData,
  CategoryCounts,
  FacultyNewsItem,
  PortalEvent,
  EventType,
  Project,
  ProjectCall,
  Profile,
  Partner,
  FacultyUnit,
  TimelineItem,
  Opportunity,
  FaqItem,
} from "@/types/portal";
import {
  MOCK_ARTICLES,
  MOCK_STORYSTREAM,
  MOCK_MARKET_INDICES,
  MOCK_CLEANROOM_STATUS,
  MOCK_CAMPUS_EVENTS,
  MOCK_POLL_DATA,
  MOCK_EVENTS,
  MOCK_PROJECTS,
  MOCK_PROJECT_CALLS,
  MOCK_PROFILES,
  MOCK_PARTNERS,
  MOCK_OPPORTUNITIES,
  MOCK_FAQ,
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
 * Získá články s interní značkou konkrétní cílové skupiny.
 * Zdroj pro podstránky /pro-koho/[audience] (rules/layout.md §2.18).
 */
export async function getArticlesByAudience(audience: Audience): Promise<Article[]> {
  return MOCK_ARTICLES.filter((article) => article.audience.includes(audience));
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
 * Získá nejdůležitější zprávy o fakultě (kategorie "academic") pro sekci
 * „Informace o fakultě“ i pro kompaktní widget v bočním sloupci.
 * Vrací zúžený typ bez plného obsahu článků, aby se do klientských komponent
 * nepřenášel celý text. Pořadí odpovídá prioritě v datech.
 */
export async function getFacultyNews(limit?: number): Promise<FacultyNewsItem[]> {
  const faculty = MOCK_ARTICLES.filter((art) => art.category === "academic").map(
    ({ id, slug, title, perex, publishedAt, categoryLabel, en }) => ({
      id,
      slug,
      title,
      perex,
      publishedAt,
      categoryLabel,
      en,
    }),
  );

  if (typeof limit === "number" && limit > 0) {
    return faculty.slice(0, limit);
  }

  return faculty;
}

/**
 * Získá redakční články mimo zprávy o fakultě – tedy sadu pro hero,
 * cyklovač „Další články“ a mřížku „Ostatní novinky“.
 */
export async function getEditorialArticles(limit?: number): Promise<Article[]> {
  const editorial = MOCK_ARTICLES.filter((art) => art.category !== "academic");

  if (typeof limit === "number" && limit > 0) {
    return editorial.slice(0, limit);
  }

  return editorial;
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
 * Volitelně počítá nad předanou sadou, aby počítadla filtrů odpovídala
 * přesně tomu, co dokáže zobrazit mřížka „Ostatní novinky“.
 */
export async function getCategoryCounts(articles: Article[] = MOCK_ARTICLES): Promise<CategoryCounts> {
  const counts: CategoryCounts = {
    all: articles.length,
  };

  for (const art of articles) {
    counts[art.category] = (counts[art.category] ?? 0) + 1;
  }

  return counts;
}

/* ------------------------------------------------------------------ */
/* Rozšířené entity portálu (rules/technologie.md §10)                  */
/* ------------------------------------------------------------------ */

/** Parsuje české datum „DD. MM. YYYY“ na ISO „YYYY-MM-DD“. */
function parseCsDate(date: string): string {
  const match = date.trim().match(/^(\d{1,2})\.\s*(\d{1,2})\.\s*(\d{4})$/);
  if (!match) return "1970-01-01";
  const [, d, m, y] = match;
  return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
}

/**
 * Získá akce řazené vzestupně podle data konání, volitelně filtrované podle typu.
 */
export async function getEvents(filter?: { type?: EventType | "all" }): Promise<PortalEvent[]> {
  const events = MOCK_EVENTS.filter((event) => !filter?.type || filter.type === "all" || event.type === filter.type);
  return [...events].sort((a, b) => a.startsAt.localeCompare(b.startsAt));
}

/**
 * Získá nejbližší nadcházející akce od dnešního data (pro homepage).
 * Pokud žádná budoucí akce neexistuje, vrátí poslední `limit` proběhlých.
 */
export async function getUpcomingEvents(limit = 2): Promise<PortalEvent[]> {
  const today = new Date().toISOString().slice(0, 10);
  const sorted = [...MOCK_EVENTS].sort((a, b) => a.startsAt.localeCompare(b.startsAt));
  const upcoming = sorted.filter((event) => (event.endsAt ?? event.startsAt) >= today);
  if (upcoming.length > 0) return upcoming.slice(0, limit);
  return sorted.slice(-limit);
}

/**
 * Získá projekty, volitelně filtrované podle fakulty/součásti.
 */
export async function getProjects(unit?: FacultyUnit | "all"): Promise<Project[]> {
  if (!unit || unit === "all") return MOCK_PROJECTS;
  return MOCK_PROJECTS.filter((project) => project.unit === unit);
}

export async function getProjectCalls(): Promise<ProjectCall[]> {
  return MOCK_PROJECT_CALLS;
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return MOCK_PROJECTS.find((project) => project.slug === slug) ?? null;
}

export async function getProjectCallBySlug(slug: string): Promise<ProjectCall | null> {
  return MOCK_PROJECT_CALLS.find((call) => call.slug === slug) ?? null;
}

export async function getProfiles(): Promise<Profile[]> {
  return MOCK_PROFILES;
}

export async function getProfileBySlug(slug: string): Promise<Profile | null> {
  return MOCK_PROFILES.find((profile) => profile.slug === slug) ?? null;
}

export async function getPartners(): Promise<Partner[]> {
  return MOCK_PARTNERS;
}

export async function getOpportunities(): Promise<Opportunity[]> {
  return MOCK_OPPORTUNITIES;
}

export async function getFaqItems(): Promise<FaqItem[]> {
  return MOCK_FAQ;
}

/**
 * Agreguje Akce, Projekty, Medailonky a Články do jednotné časové osy
 * Historie, řazené sestupně podle data. Volitelně filtruje typ položky.
 */
export async function getTimelineItems(kind?: TimelineItem["kind"] | "all"): Promise<TimelineItem[]> {
  const items: TimelineItem[] = [
    ...MOCK_EVENTS.map((event): TimelineItem => ({
      kind: "event",
      id: event.id,
      title: event.title,
      date: event.startsAt,
      sortDate: event.startsAt,
      href: "/akce",
    })),
    ...MOCK_PROJECTS.map((project): TimelineItem => ({
      kind: "project",
      id: project.id,
      title: project.title,
      date: project.startsAt ?? "",
      sortDate: project.startsAt ?? "1970-01-01",
      href: `/projekty/${project.slug}`,
    })),
    ...MOCK_PROFILES.map((profile): TimelineItem => ({
      kind: "profile",
      id: profile.id,
      title: `${profile.name} – ${profile.title}`,
      date: profile.publishedAt,
      sortDate: parseCsDate(profile.publishedAt),
      href: `/zpravy/medailonky/${profile.slug}`,
    })),
    ...MOCK_ARTICLES.map((article): TimelineItem => ({
      kind: "article",
      id: article.id,
      title: article.title,
      date: article.publishedAt,
      sortDate: parseCsDate(article.publishedAt),
      href: `/zpravy/${article.slug}`,
    })),
  ];

  const filtered = !kind || kind === "all" ? items : items.filter((item) => item.kind === kind);
  return filtered.sort((a, b) => b.sortDate.localeCompare(a.sortDate));
}
