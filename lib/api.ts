import type {
  Article,
  ArticleCategory,
  Audience,
  CategoryCounts,
  FacultyNewsItem,
  PortalEvent,
  EventType,
  Project,
  ProjectCall,
  Partner,
  FacultyUnit,
  TimelineItem,
  Opportunity,
  FaqItem,
} from "@/types/portal";
import {
  BOILERPLATE_ARTICLES,
  BOILERPLATE_EVENTS,
  BOILERPLATE_PROJECTS,
  BOILERPLATE_PROJECT_CALLS,
  BOILERPLATE_PARTNERS,
  BOILERPLATE_OPPORTUNITIES,
  BOILERPLATE_FAQ,
} from "@/data/boilerplate";

/* ------------------------------------------------------------------ */
/* Zprávy – režim boilerplate (rules/layout.md §0)                      */
/* ------------------------------------------------------------------ */

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

  let results = BOILERPLATE_ARTICLES;

  // 1. Filtr kategorie
  if (category !== "all") {
    results = results.filter((art) => art.category === category);
  }

  // 2. Fulltext vyhledávání v titulku, perexu a tazích
  if (query.length > 0) {
    results = results.filter((art) => {
      const matchTitle = art.title.toLowerCase().includes(query);
      const matchPerex = art.perex.toLowerCase().includes(query);
      const matchTag = art.tags.some((tag) => tag.toLowerCase().includes(query));
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
 * Zdroj pro podstránky /pro-koho/[audience] (rules/layout.md §2.17).
 */
export async function getArticlesByAudience(audience: Audience): Promise<Article[]> {
  return BOILERPLATE_ARTICLES.filter((article) => article.audience.includes(audience));
}

/** Získá hlavní prioritní zprávu pro Hero otvírák portálu. */
export async function getFeaturedArticle(): Promise<Article> {
  return BOILERPLATE_ARTICLES.find((art) => art.featured === true) ?? BOILERPLATE_ARTICLES[0];
}

/**
 * Získá nejdůležitější zprávy o fakultě (kategorie "academic") pro sekci
 * „Informace o fakultě“ i pro kompaktní widget v bočním sloupci.
 * Vrací zúžený typ bez plného obsahu článků, aby se do klientských komponent
 * nepřenášel celý text. Pořadí odpovídá pořadí v datech.
 */
export async function getFacultyNews(limit?: number): Promise<FacultyNewsItem[]> {
  const faculty = BOILERPLATE_ARTICLES.filter((art) => art.category === "academic").map(
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
  const editorial = BOILERPLATE_ARTICLES.filter((art) => art.category !== "academic");

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

  return BOILERPLATE_ARTICLES.find((art) => art.slug === cleanSlug) ?? null;
}

/** Získá související články ke konkrétnímu článku. */
export async function getRelatedArticles(currentSlug: string, limit = 3): Promise<Article[]> {
  return BOILERPLATE_ARTICLES.filter((art) => art.slug !== currentSlug).slice(0, limit);
}

/**
 * Spočítá počet článků v jednotlivých kategoriích pro Topic Hubs.
 * Volitelně počítá nad předanou sadou, aby počítadla filtrů odpovídala
 * přesně tomu, co dokáže zobrazit mřížka „Ostatní novinky“.
 */
export async function getCategoryCounts(
  articles: Article[] = BOILERPLATE_ARTICLES,
): Promise<CategoryCounts> {
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

/**
 * Získá akce řazené vzestupně podle data konání, volitelně filtrované podle typu.
 */
export async function getEvents(filter?: { type?: EventType | "all" }): Promise<PortalEvent[]> {
  const events = BOILERPLATE_EVENTS.filter(
    (event) => !filter?.type || filter.type === "all" || event.type === filter.type,
  );
  return [...events].sort((a, b) => a.startsAt.localeCompare(b.startsAt));
}

/**
 * Získá nejbližší nadcházející akce od dnešního data (pro homepage).
 * Pokud žádná budoucí akce neexistuje, vrátí poslední `limit` proběhlých.
 */
export async function getUpcomingEvents(limit = 2): Promise<PortalEvent[]> {
  const today = new Date().toISOString().slice(0, 10);
  const sorted = [...BOILERPLATE_EVENTS].sort((a, b) => a.startsAt.localeCompare(b.startsAt));
  const upcoming = sorted.filter((event) => (event.endsAt ?? event.startsAt) >= today);
  if (upcoming.length > 0) return upcoming.slice(0, limit);
  return sorted.slice(-limit);
}

/** Získá projekty, volitelně filtrované podle fakulty/součásti. */
export async function getProjects(unit?: FacultyUnit | "all"): Promise<Project[]> {
  if (!unit || unit === "all") return BOILERPLATE_PROJECTS;
  return BOILERPLATE_PROJECTS.filter((project) => project.unit === unit);
}

export async function getProjectCalls(): Promise<ProjectCall[]> {
  return BOILERPLATE_PROJECT_CALLS;
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return BOILERPLATE_PROJECTS.find((project) => project.slug === slug) ?? null;
}

export async function getProjectCallBySlug(slug: string): Promise<ProjectCall | null> {
  return BOILERPLATE_PROJECT_CALLS.find((call) => call.slug === slug) ?? null;
}

export async function getPartners(): Promise<Partner[]> {
  return BOILERPLATE_PARTNERS;
}

export async function getOpportunities(): Promise<Opportunity[]> {
  return BOILERPLATE_OPPORTUNITIES;
}

export async function getFaqItems(): Promise<FaqItem[]> {
  return BOILERPLATE_FAQ;
}

/**
 * Agreguje Akce a Projekty do jednotné časové osy Historie,
 * řazené sestupně podle data. Volitelně filtruje typ položky.
 */
export async function getTimelineItems(
  kind?: TimelineItem["kind"] | "all",
): Promise<TimelineItem[]> {
  const items: TimelineItem[] = [
    ...BOILERPLATE_EVENTS.map((event): TimelineItem => ({
      kind: "event",
      id: event.id,
      title: event.title,
      date: event.startsAt,
      sortDate: event.startsAt,
      href: "/akce",
    })),
    ...BOILERPLATE_PROJECTS.map((project): TimelineItem => ({
      kind: "project",
      id: project.id,
      title: project.title,
      date: project.startsAt ?? "",
      sortDate: project.startsAt ?? "1970-01-01",
      href: `/projekty/${project.slug}`,
    })),
  ];

  const filtered = !kind || kind === "all" ? items : items.filter((item) => item.kind === kind);
  return filtered.sort((a, b) => b.sortDate.localeCompare(a.sortDate));
}
