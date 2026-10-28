import type {
  Article,
  ArticleCategory,
  Audience,
  PortalEvent,
  Project,
  ProjectCall,
  Partner,
  Opportunity,
  FaqItem,
  FacultyUnit,
  ProjectStatus,
  EventType,
} from "@/types/portal";

/**
 * Režim boilerplate (rules/layout.md §0): jediný zdroj dat portálu.
 * Žádná redakční zpráva, žádná fotografie a žádná vymyšlená entita – jen
 * neutrální zástupné texty, které drží přesnou geometrii layoutu, aby šel
 * design ladit bez obsahového balastu.
 */

/**
 * Dvě články na rubriku: mřížka „Ostatní novinky“ i archiv tak mají plné řady
 * a žádný filtr rubriky neskončí na prázdném stavu.
 */
const EDITORIAL_CATEGORIES: ArticleCategory[] = [
  "chips",
  "materials",
  "power-elec",
  "embedded",
  "quantum",
  "industry",
  "chips",
  "materials",
  "power-elec",
  "embedded",
  "quantum",
  "industry",
];

/** Počet zástupných zpráv fakulty – 2 × 2 sekce i plné řady archivu. */
const FACULTY_ARTICLE_COUNT = 6;

/** Všechny cílové skupiny – zástupné entity se zobrazí na každé podstránce /pro-koho. */
const ALL_AUDIENCES: [Audience, ...Audience[]] = [
  "students",
  "researchers",
  "public",
  "partners",
  "media",
];

const PEREX_CS =
  "Perex zprávy – zástupný text pro kontrolu typografie, délky řádku a rytmu sazby.";
const PEREX_EN =
  "News perex – placeholder text for checking typography, line length and layout rhythm.";

const CONTENT_CS = `Zástupný text článku pro kontrolu typografie, šířky čtecího sloupce a rytmu sazby.

### Podnadpis článku

Druhý odstavec zástupného textu. Nahrazuje redakční obsah, dokud není design uzavřený.`;
const CONTENT_EN = `Placeholder article text for checking typography, reading column width and layout rhythm.

### Article subheading

Second paragraph of placeholder text. It stands in for editorial content until the design is signed off.`;

const PUBLISHED_AT = "DD. MM. YYYY";

const CONTACT = {
  name: "Kontaktní osoba",
  email: "kontakt@example.cz",
  department: "Součást fakulty",
};

function createBoilerplateArticle(
  index: number,
  category: ArticleCategory,
  isFaculty: boolean,
): Article {
  const number = String(index).padStart(2, "0");

  return {
    id: `boilerplate-${number}`,
    slug: `sablona-zpravy-${number}`,
    title: isFaculty ? `Titulek zprávy z fakulty ${number}` : `Titulek zprávy ${number}`,
    perex: PEREX_CS,
    content: CONTENT_CS,
    category,
    categoryLabel: "ŠABLONA",
    publishedAt: PUBLISHED_AT,
    readTimeMinutes: 5,
    author: {
      name: "Jméno autora",
      title: "Pozice autora",
      department: "Součást fakulty",
    },
    featured: !isFaculty && index === 1,
    tags: ["šablona"],
    audience: ALL_AUDIENCES,
    en: {
      title: isFaculty ? `Faculty news headline ${number}` : `News headline ${number}`,
      perex: PEREX_EN,
      content: CONTENT_EN,
      categoryLabel: "TEMPLATE",
      authorName: "Author name",
      authorTitle: "Author role",
      authorDepartment: "Faculty unit",
      tags: ["template"],
    },
  };
}

/**
 * Dvanáct redakčních článků (01–12, dvě na rubriku) a šest zpráv fakulty (13–18).
 * První redakční článek je hlavní zpráva týdne (hero).
 */
export const BOILERPLATE_ARTICLES: Article[] = [
  ...EDITORIAL_CATEGORIES.map((category, position) =>
    createBoilerplateArticle(position + 1, category, false),
  ),
  ...Array.from({ length: FACULTY_ARTICLE_COUNT }, (_, position) =>
    createBoilerplateArticle(position + 13, "academic", true),
  ),
];

/** Typy a termíny akcí – pevné budoucí datumy řídí řazení i formát „od – do“. */
const EVENT_SCHEDULE: Array<{ type: EventType; startsAt: string; endsAt?: string }> = [
  { type: "event", startsAt: "2026-11-06" },
  { type: "conference", startsAt: "2026-11-19", endsAt: "2026-11-20" },
  { type: "summer-school", startsAt: "2026-12-03", endsAt: "2026-12-04" },
  { type: "event", startsAt: "2027-01-15" },
  { type: "conference", startsAt: "2027-02-11", endsAt: "2027-02-12" },
  { type: "event", startsAt: "2027-03-05" },
];

export const BOILERPLATE_EVENTS: PortalEvent[] = EVENT_SCHEDULE.map(
  ({ type, startsAt, endsAt }, position) => {
    const number = String(position + 1).padStart(2, "0");

    return {
      id: `boilerplate-event-${number}`,
      slug: `sablona-akce-${number}`,
      type,
      title: `Název akce ${number}`,
      perex: "Perex akce – zástupný text pro kontrolu typografie, délky řádku a rytmu sazby.",
      location: "Místo konání",
      startsAt,
      endsAt,
      audience: ALL_AUDIENCES,
      en: {
        title: `Event title ${number}`,
        perex: "Event perex – placeholder text for checking typography, line length and layout rhythm.",
        location: "Venue",
      },
    };
  },
);

/** Stavy a součásti se střídají, aby filtry projektů měly co zobrazit. */
const PROJECT_STATUSES: ProjectStatus[] = [
  "running",
  "preparation",
  "completed",
  "running",
  "preparation",
  "completed",
];
const PROJECT_UNITS: FacultyUnit[] = ["kme", "fel", "fjfi", "fd", "external", "kme"];

/** Šest zástupných projektů – tři plné řady mřížky, dva od každého stavu. */
export const BOILERPLATE_PROJECTS: Project[] = PROJECT_STATUSES.map((status, position) => {
  const number = String(position + 1).padStart(2, "0");

  return {
    id: `boilerplate-project-${number}`,
    slug: `sablona-projektu-${number}`,
    title: `Název projektu ${number}`,
    description: `Popis projektu – zástupný text pro kontrolu typografie a délky řádku.

### Sekce projektu

Druhý odstavec zástupného textu. Nahrazuje redakční obsah, dokud není design uzavřený.`,
    status,
    unit: PROJECT_UNITS[position],
    audience: ALL_AUDIENCES,
    contact: CONTACT,
    outputs: ["Výstup projektu – zástupný text."],
    en: {
      title: `Project title ${number}`,
      description: `Project description – placeholder text for checking typography and line length.

### Project section

Second paragraph of placeholder text. It stands in for editorial content until the design is signed off.`,
      outputs: ["Project output – placeholder text."],
    },
  };
});

/** Tři zástupné projektové výzvy s budoucími deadliny. */
const CALL_DEADLINES = ["2026-12-15", "2027-01-15", "2027-02-15"];

export const BOILERPLATE_PROJECT_CALLS: ProjectCall[] = CALL_DEADLINES.map(
  (deadline, position) => {
    const number = String(position + 1).padStart(2, "0");

    return {
      id: `boilerplate-call-${number}`,
      slug: `sablona-vyzvy-${number}`,
      title: `Název výzvy ${number}`,
      description: "Popis výzvy – zástupný text pro kontrolu typografie a délky řádku.",
      audience: ALL_AUDIENCES,
      conditions: ["Podmínka výzvy – zástupný text.", "Druhá podmínka – zástupný text."],
      deadline,
      contact: CONTACT,
      unit: PROJECT_UNITS[position],
      en: {
        title: `Call title ${number}`,
        description: "Call description – placeholder text for checking typography and line length.",
        conditions: ["Call condition – placeholder text.", "Second condition – placeholder text."],
      },
    };
  },
);

/** Šest zástupných partnerů – jedna plná řada mřížky na desktopu. */
export const BOILERPLATE_PARTNERS: Partner[] = ["01", "02", "03", "04", "05", "06"].map(
  (number) => ({
    id: `boilerplate-partner-${number}`,
    name: `Partner ${number}`,
    url: "https://example.com",
  }),
);

/** Tři zástupné příležitosti ve Vzdělávání. */
export const BOILERPLATE_OPPORTUNITIES: Opportunity[] = ["01", "02", "03"].map((number) => ({
  id: `boilerplate-opportunity-${number}`,
  title: `Název příležitosti ${number}`,
  description: "Příležitost – zástupný text pro kontrolu typografie a délky řádku.",
  url: "https://example.com",
  en: {
    title: `Opportunity title ${number}`,
    description: "Opportunity – placeholder text for checking typography and line length.",
  },
}));

/** Tři zástupné otázky FAQ. */
export const BOILERPLATE_FAQ: FaqItem[] = ["01", "02", "03"].map((number) => ({
  id: `boilerplate-faq-${number}`,
  question: `Otázka ${number}`,
  answer: "Odpověď – zástupný text pro kontrolu sazby akordeonu a délky řádku.",
  en: {
    question: `Question ${number}`,
    answer: "Answer – placeholder text for checking accordion typesetting and line length.",
  },
}));
