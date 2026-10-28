/**
 * Typový systém informačního portálu Polovodiče
 * Odpovídá specifikaci v rules/technologie.md a pravidlům v rules/coding-standards.md.
 */

export type ArticleCategory =
  | "chips"        // Návrh čipů, ASIC, FPGA, EDA flow
  | "materials"    // Polovodičové materiály: SiC, GaN, Křemík, Wafery
  | "power-elec"   // Výkonová elektronika, měniče, elektromobilita
  | "embedded"     // Vestavné systémy, ARM Cortex, RISC-V, senzorika
  | "quantum"      // Kvantové technologie, fotonika, optické čipy
  | "industry"     // Národní polovodičová strategie, investice, Chips Act
  | "academic";    // Program EK, Katedra mikroelektroniky, stipendia, akce

export type SemiconductorMaterial = "Si" | "SiC" | "GaN" | "GaAs" | "InP" | "Diamond";

export type CategoryCounts = Partial<Record<ArticleCategory, number>> & {
  all: number;
};

export interface SemiconductorSpecs {
  nodeNm?: number;               // Např. 3 (nm výrobní uzel)
  material?: SemiconductorMaterial;
  voltageV?: number;             // Např. 2400 (V závěrné napětí)
  switchingFreqKHz?: number;     // Např. 500 (kHz spínací frekvence)
  packageType?: string;          // Např. "BGA-1156", "TO-247", "Wafer 300mm"
  edaTool?: "Cadence" | "Synopsys" | "Siemens EDA" | "Altium" | "KiCad";
  efficiencyPercent?: number;    // Např. 99.2 (%)
}

export interface Author {
  name: string;
  title: string;                 // Např. "prof. Ing., DrSc."
  department: string;            // Např. "Katedra mikroelektroniky FEL ČVUT"
  avatarUrl?: string;
  email?: string;
}

export interface ArticleTranslation {
  title: string;
  perex: string;
  content: string;
  categoryLabel: string;
  imageAlt?: string;
  authorName?: string;
  authorTitle?: string;
  authorDepartment?: string;
  tags?: string[];
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  perex: string;
  content: string;               // Markdown / text obsah článku
  category: ArticleCategory;
  categoryLabel: string;         // Např. "NÁVRH ČIPŮ // ASIC"
  imageUrl?: string;             // Volitelné: bez obrázku se vykreslí šablona (rules/theme.md §8)
  imageAlt?: string;
  publishedAt: string;           // Formát např. "05. 10. 2026"
  readTimeMinutes: number;       // Např. 4
  author: Author;
  featured?: boolean;            // Hlavní otvírák portálu (Hero)
  specs?: SemiconductorSpecs;    // Technická specifikace pro Key Takeaway box
  tags: string[];
  /** Interní značka cílových skupin; zdroj pro podstránky /pro-koho/[audience]. */
  audience: [Audience, ...Audience[]];
  en?: ArticleTranslation;
}

/**
 * Zúžený pohled na článek pro sekci „Informace o fakultě“ a její widget
 * v bočním sloupci. Neobsahuje plný text článku, aby se do klientských
 * komponent nepřenášel celý obsah.
 */
export type FacultyNewsItem = Pick<
  Article,
  "id" | "slug" | "title" | "perex" | "publishedAt" | "categoryLabel" | "en"
>;

/* ------------------------------------------------------------------ */
/* Rozšířené entity portálu podle drátového modelu                      */
/* (rules/technologie.md §10, PLAN-ROZSIRENI.md)                        */
/* ------------------------------------------------------------------ */

/** Cílové skupiny portálu – zároveň hodnoty rozcestníku a filtrů akcí/výzev. */
export type Audience = "students" | "researchers" | "public" | "partners" | "media";

/** Typ akce; letní škola je sdílená mezi sekcemi Akce a Vzdělávání. */
export type EventType = "event" | "conference" | "summer-school";

/** Stav projektu. */
export type ProjectStatus = "preparation" | "running" | "completed";

/** Dočasný placeholder číselníku fakult/součástí (finální sjednocení = otevřený bod). */
export type FacultyUnit = "fel" | "kme" | "fjfi" | "fd" | "external";

export interface ContactPerson {
  name: string;
  email: string;
  department: string;
}

export interface PortalEventTranslation {
  title: string;
  perex: string;
  location: string;
  imageAlt?: string;
}

export interface PortalEvent {
  id: string;
  slug: string;
  type: EventType;
  title: string;
  perex: string;
  location: string;
  startsAt: string;              // ISO "2026-11-12" – zdroj pro řazení i formátování
  endsAt?: string;               // ISO
  imageUrl?: string;
  imageAlt?: string;
  audience: Audience[];
  registrationUrl?: string;
  en?: PortalEventTranslation;
}

export interface ProjectTranslation {
  title: string;
  description: string;
  outputs?: string[];
  imageAlt?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  status: ProjectStatus;
  unit: FacultyUnit;
  contact: ContactPerson;
  outputs: string[];
  imageUrl?: string;
  imageAlt?: string;
  startsAt?: string;             // ISO
  endsAt?: string;               // ISO
  en?: ProjectTranslation;
}

export interface ProjectCallTranslation {
  title: string;
  description: string;
  conditions?: string[];
  imageAlt?: string;
}

export interface ProjectCall {
  id: string;
  slug: string;
  title: string;
  description: string;
  audience: Audience[];
  conditions: string[];
  deadline: string;              // ISO
  contact: ContactPerson;
  unit: FacultyUnit;
  imageUrl?: string;
  imageAlt?: string;
  en?: ProjectCallTranslation;
}

export interface Partner {
  id: string;
  name: string;
  url: string;
}

/** Jednotná položka časové osy Historie (agregace entit). */
export interface TimelineItem {
  kind: "event" | "project";
  id: string;
  title: string;
  date: string;                  // Zobrazované datum
  sortDate: string;              // ISO pro řazení
  href: string;
}

/** Položka příležitostí ve Vzdělávání (stáže, stipendia, semináře). */
export interface Opportunity {
  id: string;
  title: string;
  description: string;
  url: string;
  en?: { title: string; description: string };
}

/** Položka FAQ ve Vzdělávání. */
export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  en?: { question: string; answer: string };
}
