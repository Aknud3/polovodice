export type Language = "cs" | "en";

export const LANGUAGE_STORAGE_KEY = "polovodice-language";

type TranslationKey =
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
  | "allNews"
  | "chipDesign"
  | "materialsSiC"
  | "embeddedIoT"
  | "quantumPhotonics"
  | "industryChipsAct"
  | "otherNews"
  | "fullArchive"
  | "emptyCategory"
  | "showAllNews"
  | "aboutDescription"
  | "guaranteedBy"
  | "pageNavigation"
  | "weekInformation"
  | "sectionNews"
  | "newSection"
  | "allNewsArchive"
  | "backToTop"
  | "privacy"
  | "officialWebsite";

export type Translator = (key: TranslationKey) => string;

const TRANSLATIONS: Record<Language, Record<TranslationKey, string>> = {
  cs: {
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
    allNews: "Všechny zprávy",
    chipDesign: "Návrh čipů & ASIC",
    materialsSiC: "Materiály (SiC / GaN)",
    embeddedIoT: "Vestavné systémy & IoT",
    quantumPhotonics: "Kvantové čipy & Fotonika",
    industryChipsAct: "Průmysl & Chips Act",
    otherNews: "Ostatní novinky",
    fullArchive: "Celý archiv",
    emptyCategory: "V této kategorii zatím nejsou žádné publikované články.",
    showAllNews: "Zobrazit všechny zprávy",
    aboutDescription: "Informační týdeník Fakulty elektrotechnické ČVUT v Praze. Přinášíme klíčové zprávy z oblasti polovodičového průmyslu, návrhu mikročipů a programu Elektronika a komunikace.",
    guaranteedBy: "Garant: Katedra mikroelektroniky FEL ČVUT",
    pageNavigation: "Navigace na stránce",
    weekInformation: "Informace týdne",
    sectionNews: "Ostatní novinky",
    newSection: "Šablona nové sekce",
    allNewsArchive: "Archiv všech zpráv",
    backToTop: "Zpět nahoru",
    privacy: "Ochrana osobních údajů (GDPR)",
    officialWebsite: "Oficiální web FEL ČVUT",
  },
  en: {
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
    allNews: "All news",
    chipDesign: "Chip design & ASIC",
    materialsSiC: "Materials (SiC / GaN)",
    embeddedIoT: "Embedded systems & IoT",
    quantumPhotonics: "Quantum chips & photonics",
    industryChipsAct: "Industry & Chips Act",
    otherNews: "Other news",
    fullArchive: "Full archive",
    emptyCategory: "No published articles are available in this category yet.",
    showAllNews: "Show all news",
    aboutDescription: "The weekly information journal of the Czech Technical University Faculty of Electrical Engineering in Prague. We bring key news from the semiconductor industry, microchip design and the Electronics and Communications programme.",
    guaranteedBy: "Maintained by: FEL CTU Department of Microelectronics",
    pageNavigation: "Page navigation",
    weekInformation: "Weekly information",
    sectionNews: "Other news",
    newSection: "New section template",
    allNewsArchive: "All news archive",
    backToTop: "Back to top",
    privacy: "Privacy (GDPR)",
    officialWebsite: "Official FEL CTU website",
  },
};

export function getTranslations(language: Language): Translator {
  return (key) => TRANSLATIONS[language][key];
}
