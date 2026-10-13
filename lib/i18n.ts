export type Language = "cs" | "en";

export const LANGUAGE_STORAGE_KEY = "polovodice-language";

type TranslationKey =
  | "portalSubtitle"
  | "search"
  | "searchAria"
  | "czech"
  | "english"
  | "allTopics"
  | "chips"
  | "materials"
  | "powerElectronics"
  | "embedded"
  | "quantum"
  | "industry"
  | "academic"
  | "allNews"
  | "chipDesign"
  | "materialsSiC"
  | "embeddedIoT"
  | "quantumPhotonics"
  | "industryChipsAct"
  | "otherNews"
  | "fullArchive"
  | "facultyInfo"
  | "facultyInfoSubtitle"
  | "facultyArchive"
  | "facultyEmpty"
  | "emptyCategory"
  | "showAllNews"
  | "minRead"
  | "readFullStory"
  | "moreArticles"
  | "goToArticle"
  | "prevArticle"
  | "nextArticle"
  | "detail"
  | "topicLabel"
  | "archiveHeading"
  | "generalInfo"
  | "clearSearch"
  | "emptySection"
  | "home"
  | "news"
  | "topics"
  | "backToNews"
  | "relatedArticles"
  | "searchHeadlinesPlaceholder"
  | "noHeadlinesFound"
  | "articlesByTopic"
  | "articleHeadlines"
  | "searchFooterLabel"
  | "navigateHint"
  | "selectHint"
  | "cookiesTitle"
  | "cookiesDescription"
  | "cookiesAccept"
  | "aboutDescription"
  | "guaranteedBy"
  | "pageNavigation"
  | "sectionNews"
  | "allNewsArchive"
  | "backToTop"
  | "privacy"
  | "officialWebsite"
  | "copyright";

export type Translator = (key: TranslationKey) => string;

const TRANSLATIONS: Record<Language, Record<TranslationKey, string>> = {
  cs: {
    portalSubtitle: "Informační deník ze světa elektroniky",
    search: "Hledat...",
    searchAria: "Hledat na portálu",
    czech: "Čeština",
    english: "English",
    allTopics: "Všechna témata",
    chips: "Čipy",
    materials: "Materiály",
    powerElectronics: "Výkonová el.",
    embedded: "Embedded & IoT",
    quantum: "Kvantové čipy",
    industry: "Průmysl",
    academic: "Akademie",
    allNews: "Všechny zprávy",
    chipDesign: "Návrh čipů & ASIC",
    materialsSiC: "Materiály (SiC / GaN)",
    embeddedIoT: "Vestavné systémy & IoT",
    quantumPhotonics: "Kvantové čipy & Fotonika",
    industryChipsAct: "Průmysl & Chips Act",
    otherNews: "Ostatní novinky",
    fullArchive: "Celý archiv",
    facultyInfo: "Informace o fakultě",
    facultyInfoSubtitle: "Nejdůležitější zprávy z Fakulty elektrotechnické ČVUT",
    facultyArchive: "Vše z fakulty",
    facultyEmpty: "Zatím nejsou zveřejněny žádné informace o fakultě.",
    emptyCategory: "V této kategorii zatím nejsou žádné publikované články.",
    showAllNews: "Zobrazit všechny zprávy",
    minRead: "min čtení",
    readFullStory: "Číst celou informaci",
    moreArticles: "Další články",
    goToArticle: "Přejít na článek",
    prevArticle: "Předchozí článek",
    nextArticle: "Další článek",
    detail: "Detail",
    topicLabel: "Rubrika:",
    archiveHeading: "Zprávy, studie & polovodičové novinky",
    generalInfo: "Všeobecné informace",
    clearSearch: "Zrušit hledání",
    emptySection: "V této sekci nebyly nalezeny žádné články.",
    home: "Domů",
    news: "Zprávy",
    topics: "Témata:",
    backToNews: "Zpět na přehled zpráv",
    relatedArticles: "Související technologické články",
    searchHeadlinesPlaceholder: "Hledat v nadpisech článků...",
    noHeadlinesFound: "Nebyly nalezeny žádné nadpisy pro zadané téma nebo dotaz.",
    articlesByTopic: "Články podle tématu",
    articleHeadlines: "Nadpisy článků",
    searchFooterLabel: "Hledání v databázi ČVUT FEL Polovodiče",
    navigateHint: "Navigace",
    selectHint: "Výběr",
    cookiesTitle: "Soubory cookies",
    cookiesDescription: "Tento portál využívá pouze nezbytné technické cookies pro ukládání vašeho nastavení motivu (světlý/tmavý) a jazykové preference.",
    cookiesAccept: "Rozumím a přijmout",
    aboutDescription: "Informační deník Fakulty elektrotechnické ČVUT v Praze. Přinášíme nové informace z oblasti elektroniky a zprávy ohledně fakulty.",
    guaranteedBy: "Garant: Katedra mikroelektroniky FEL ČVUT",
    pageNavigation: "Navigace na stránce",
    sectionNews: "Ostatní novinky",
    allNewsArchive: "Archiv všech zpráv",
    backToTop: "Zpět nahoru",
    privacy: "Ochrana osobních údajů",
    officialWebsite: "Oficiální web FEL ČVUT",
    copyright: "České vysoké učení technické v Praze. Fakulta elektrotechnická.",
  },
  en: {
    portalSubtitle: "Information Daily from the World of Electronics",
    search: "Search...",
    searchAria: "Search the portal",
    czech: "Czech",
    english: "English",
    allTopics: "All topics",
    chips: "Chips",
    materials: "Materials",
    powerElectronics: "Power electronics",
    embedded: "Embedded & IoT",
    quantum: "Quantum chips",
    industry: "Industry",
    academic: "Academia",
    allNews: "All news",
    chipDesign: "Chip design & ASIC",
    materialsSiC: "Materials (SiC / GaN)",
    embeddedIoT: "Embedded systems & IoT",
    quantumPhotonics: "Quantum chips & photonics",
    industryChipsAct: "Industry & Chips Act",
    otherNews: "Other news",
    fullArchive: "Full archive",
    facultyInfo: "Faculty information",
    facultyInfoSubtitle: "The most important news from the CTU Faculty of Electrical Engineering",
    facultyArchive: "All faculty news",
    facultyEmpty: "No faculty information has been published yet.",
    emptyCategory: "No published articles are available in this category yet.",
    showAllNews: "Show all news",
    minRead: "min read",
    readFullStory: "Read full story",
    moreArticles: "More articles",
    goToArticle: "Read article",
    prevArticle: "Previous article",
    nextArticle: "Next article",
    detail: "Read more",
    topicLabel: "Topic:",
    archiveHeading: "News, Studies & Semiconductor Updates",
    generalInfo: "General information",
    clearSearch: "Clear search",
    emptySection: "No articles found in this section.",
    home: "Home",
    news: "News",
    topics: "Topics:",
    backToNews: "Back to news archive",
    relatedArticles: "Related technology articles",
    searchHeadlinesPlaceholder: "Search article headlines...",
    noHeadlinesFound: "No headlines found for the selected topic or query.",
    articlesByTopic: "Articles by topic",
    articleHeadlines: "Article headlines",
    searchFooterLabel: "Search the CTU FEL Semiconductors database",
    navigateHint: "Navigate",
    selectHint: "Select",
    cookiesTitle: "Cookies",
    cookiesDescription: "This portal uses only essential technical cookies to store your theme (light/dark) and language preferences.",
    cookiesAccept: "Accept & close",
    aboutDescription: "Information daily of the Faculty of Electrical Engineering, CTU in Prague. We bring new information from the field of electronics and faculty news.",
    guaranteedBy: "Maintained by: FEL CTU Department of Microelectronics",
    pageNavigation: "Page navigation",
    sectionNews: "Other news",
    allNewsArchive: "All news archive",
    backToTop: "Back to top",
    privacy: "Personal data protection",
    officialWebsite: "Official FEL CTU website",
    copyright: "Czech Technical University in Prague. Faculty of Electrical Engineering.",
  },
};

export function getTranslations(language: Language): Translator {
  return (key) => TRANSLATIONS[language][key];
}
