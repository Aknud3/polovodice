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
  | "industry"     // Národní polovodičová strategie, onsemi, investice, Chips Act
  | "academic";    // Program EK, Katedra mikroelektroniky, stipendia, akce

export type SemiconductorMaterial = "Si" | "SiC" | "GaN" | "GaAs" | "InP" | "Diamond";

export type ArticleCategoryFilter = ArticleCategory | "all";

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

export interface Article {
  id: string;
  slug: string;
  title: string;
  perex: string;
  content: string;               // Markdown / text obsah článku
  category: ArticleCategory;
  categoryLabel: string;         // Např. "NÁVRH ČIPŮ // ASIC"
  imageUrl: string;
  imageAlt: string;
  publishedAt: string;           // Formát např. "05. 10. 2026"
  readTimeMinutes: number;       // Např. 4
  author: Author;
  featured?: boolean;            // Hlavní otvírák portálu (Hero)
  specs?: SemiconductorSpecs;    // Technická specifikace pro Key Takeaway box
  tags: string[];
}

export interface StorystreamItem {
  id: string;
  timestamp: string;             // Např. "15:42"
  date: string;
  title: string;
  category: ArticleCategory;
  urgent?: boolean;              // Červený indikátor pro mimořádné události
  url?: string;
}

export interface CleanroomStatus {
  facility: string;              // "Čisté prostory Karlovo náměstí KN:E"
  isoClass: "ISO 5" | "ISO 6" | "ISO 7";
  operationalState: "V provozu" | "Omezený provoz" | "Sanitární den";
  temperatureCelsius: number;    // Např. 21.2 °C
  humidityPercent: number;       // Např. 44.5 %
  airParticlesPerM3: number;     // Čistota vzduchu
  lastCalibrationDate: string;
}

export interface MarketIndexItem {
  symbol: string;                // Např. "SOX", "ONSEMI", "STM", "ASML"
  name: string;
  value: string;                 // Např. "$5,240.12"
  changePercent: number;         // Např. +1.42
}

export interface CampusEvent {
  id: string;
  title: string;
  description: string;
  dateDay: string;               // Např. "12"
  dateMonth: string;             // Např. "ŘÍJ"
  fullDate: string;              // Např. "12. 10. 2026"
  time: string;                  // Např. "16:15"
  location: string;              // Např. "Zengerova posluchárna KN:E-107"
  category: "Přednáška" | "Workshop" | "Konference" | "Obhajoby";
  targetAudience: "Veřejnost" | "Inženýři" | "Studenti" | "Všichni";
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface PollData {
  id: string;
  question: string;
  totalVotes: number;
  options: PollOption[];
}
