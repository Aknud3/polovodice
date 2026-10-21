export type Language = "cs" | "en";

export const LANGUAGE_STORAGE_KEY = "polovodice-language";

export type TranslationKey =
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
  | "copyright"
  | "navNews"
  | "navEvents"
  | "navProjects"
  | "navEducation"
  | "navAbout"
  | "menuOpen"
  | "menuClose"
  | "audienceTitle"
  | "audienceStudents"
  | "audienceStudentsDesc"
  | "audienceResearchers"
  | "audienceResearchersDesc"
  | "audiencePublic"
  | "audiencePublicDesc"
  | "audiencePartners"
  | "audiencePartnersDesc"
  | "audienceMedia"
  | "audienceMediaDesc"
  | "audiencePageStudents"
  | "audiencePageResearchers"
  | "audiencePagePublic"
  | "audiencePagePartners"
  | "audiencePageMedia"
  | "audienceMenuLabel"
  | "audienceEmpty"
  | "upcomingEvents"
  | "allEvents"
  | "noUpcomingEvents"
  | "register"
  | "eventTypeEvent"
  | "eventTypeConference"
  | "eventTypeSummerSchool"
  | "newsletterTitle"
  | "newsletterDesc"
  | "newsletterPlaceholder"
  | "newsletterSubmit"
  | "newsletterSuccess"
  | "eventsHeading"
  | "eventsSubtitle"
  | "eventTypeLabel"
  | "allEventTypes"
  | "emptyEvents"
  | "projectsHeading"
  | "projectsSubtitle"
  | "unitLabel"
  | "allUnits"
  | "unitFel"
  | "unitKme"
  | "unitFjfi"
  | "unitFd"
  | "unitExternal"
  | "emptyProjects"
  | "projectCalls"
  | "statusPreparation"
  | "statusRunning"
  | "statusCompleted"
  | "deadline"
  | "conditions"
  | "outputs"
  | "contactPerson"
  | "backToProjects"
  | "projectCallLabel"
  | "educationHeading"
  | "educationSubtitle"
  | "studyProgram"
  | "studyProgramDesc"
  | "studyProgramLink"
  | "opportunities"
  | "summerSchools"
  | "noSummerSchools"
  | "faq"
  | "aboutHeading"
  | "aboutSubtitle"
  | "contacts"
  | "contactDepartment"
  | "contactAddress"
  | "contactEmail"
  | "contactPhone"
  | "contactMedia"
  | "partners"
  | "history"
  | "timelineLabel"
  | "timelineAll"
  | "timelineEvents"
  | "timelineProjects"
  | "timelineProfiles"
  | "timelineArticles"
  | "emptyTimeline"
  | "profilesHeading"
  | "profilesSubtitle"
  | "backToProfiles"
  | "profilesLink"
  | "footerContact"
  | "footerSocial";

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
    navNews: "Novinky",
    navEvents: "Akce",
    navProjects: "Projekty",
    navEducation: "Vzdělávání",
    navAbout: "O nás",
    menuOpen: "Otevřít navigaci",
    menuClose: "Zavřít navigaci",
    audienceTitle: "Komu je portál určen",
    audienceStudents: "Studenti",
    audienceStudentsDesc: "Studijní programy, příležitosti a letní školy.",
    audienceResearchers: "Výzkumníci",
    audienceResearchersDesc: "Výzkumné projekty, výzvy a publikační výstupy.",
    audiencePublic: "Veřejnost",
    audiencePublicDesc: "Akce, exkurze a novinky ze světa elektroniky.",
    audiencePartners: "Partneři",
    audiencePartnersDesc: "Spolupráce s průmyslem a společné projekty.",
    audienceMedia: "Média",
    audienceMediaDesc: "Kontakty pro novináře a tiskové materiály.",
    audiencePageStudents: "Pro studenty",
    audiencePageResearchers: "Pro výzkumníky",
    audiencePagePublic: "Pro veřejnost",
    audiencePagePartners: "Pro partnery",
    audiencePageMedia: "Pro média",
    audienceMenuLabel: "Cílové skupiny:",
    audienceEmpty: "Pro tuto cílovou skupinu zatím nejsou publikované žádné zprávy.",
    upcomingEvents: "Nadcházející akce",
    allEvents: "Všechny akce",
    noUpcomingEvents: "Aktuálně nejsou vypsané žádné nadcházející akce.",
    register: "Registrace",
    eventTypeEvent: "Událost",
    eventTypeConference: "Konference",
    eventTypeSummerSchool: "Letní škola",
    newsletterTitle: "Newsletter",
    newsletterDesc: "Jednou měsíčně shrnutí nejdůležitějších novinek ze světa elektroniky a dění na fakultě. Žádný spam.",
    newsletterPlaceholder: "vas@email.cz",
    newsletterSubmit: "Odebírat",
    newsletterSuccess: "Děkujeme za přihlášení k odběru.",
    eventsHeading: "Akce",
    eventsSubtitle: "Přehled událostí, konferencí a letních škol pořádaných fakultou a partnery.",
    eventTypeLabel: "Typ akce:",
    allEventTypes: "Všechny typy",
    emptyEvents: "Pro zadaný filtr nebyly nalezeny žádné akce.",
    projectsHeading: "Projekty",
    projectsSubtitle: "Výzkumné projekty a projektové výzvy napříč fakultami a součástmi ČVUT.",
    unitLabel: "Součást:",
    allUnits: "Všechny součásti",
    unitFel: "FEL ČVUT",
    unitKme: "Katedra mikroelektroniky",
    unitFjfi: "FJFI ČVUT",
    unitFd: "Fakulta dopravní",
    unitExternal: "Externí spolupráce",
    emptyProjects: "Pro zadaný filtr nebyly nalezeny žádné projekty.",
    projectCalls: "Projektové výzvy",
    statusPreparation: "Příprava",
    statusRunning: "Probíhá",
    statusCompleted: "Dokončen",
    deadline: "Deadline",
    conditions: "Podmínky",
    outputs: "Výstupy a publikace",
    contactPerson: "Kontakt",
    backToProjects: "Zpět na projekty",
    projectCallLabel: "Projektová výzva",
    educationHeading: "Vzdělávání",
    educationSubtitle: "Studijní programy, příležitosti a letní školy programu Elektronika a komunikace.",
    studyProgram: "Studijní program",
    studyProgramDesc: "Program Elektronika a komunikace (EK) připravuje inženýry pro návrh čipů, výkonovou elektroniku a vestavné systémy. Magisterský navazující program Elektronika a integrované systémy (EIS) je vyučován v angličtině.",
    studyProgramLink: "Více o programu na ek.fel.cvut.cz",
    opportunities: "Příležitosti",
    summerSchools: "Letní školy",
    noSummerSchools: "Aktuálně není vypsaná žádná letní škola.",
    faq: "Časté dotazy",
    aboutHeading: "O nás",
    aboutSubtitle: "Katedra mikroelektroniky FEL ČVUT, naši partneři a historie portálu Polovodiče.",
    contacts: "Kontakty",
    contactDepartment: "Katedra mikroelektroniky FEL ČVUT",
    contactAddress: "Technická 2, 166 27 Praha 6 – Dejvice",
    contactEmail: "mikroelektronika@fel.cvut.cz",
    contactPhone: "+420 224 352 000",
    contactMedia: "Kontakt pro média: media@fel.cvut.cz",
    partners: "Partneři",
    history: "Historie",
    timelineLabel: "Typ obsahu:",
    timelineAll: "Vše",
    timelineEvents: "Události",
    timelineProjects: "Projekty",
    timelineProfiles: "Medailonky",
    timelineArticles: "Články",
    emptyTimeline: "Pro zadaný filtr nebyly nalezeny žádné položky.",
    profilesHeading: "Medailonky",
    profilesSubtitle: "Lidé, kteří stojí za výzkumem, výukou a spoluprací s průmyslem.",
    backToProfiles: "Zpět na medailonky",
    profilesLink: "Medailonky",
    footerContact: "Kontakt",
    footerSocial: "Sledujte nás",
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
    navNews: "News",
    navEvents: "Events",
    navProjects: "Projects",
    navEducation: "Education",
    navAbout: "About us",
    menuOpen: "Open navigation",
    menuClose: "Close navigation",
    audienceTitle: "Who is the portal for",
    audienceStudents: "Students",
    audienceStudentsDesc: "Study programmes, opportunities and summer schools.",
    audienceResearchers: "Researchers",
    audienceResearchersDesc: "Research projects, calls and publication outputs.",
    audiencePublic: "Public",
    audiencePublicDesc: "Events, tours and news from the world of electronics.",
    audiencePartners: "Partners",
    audiencePartnersDesc: "Industry cooperation and joint projects.",
    audienceMedia: "Media",
    audienceMediaDesc: "Press contacts and media materials.",
    audiencePageStudents: "For students",
    audiencePageResearchers: "For researchers",
    audiencePagePublic: "For the public",
    audiencePagePartners: "For partners",
    audiencePageMedia: "For media",
    audienceMenuLabel: "Audience groups:",
    audienceEmpty: "No news has been published for this audience group yet.",
    upcomingEvents: "Upcoming events",
    allEvents: "All events",
    noUpcomingEvents: "There are currently no upcoming events listed.",
    register: "Register",
    eventTypeEvent: "Event",
    eventTypeConference: "Conference",
    eventTypeSummerSchool: "Summer school",
    newsletterTitle: "Newsletter",
    newsletterDesc: "A monthly digest of the most important electronics news and faculty updates. No spam.",
    newsletterPlaceholder: "you@email.com",
    newsletterSubmit: "Subscribe",
    newsletterSuccess: "Thank you for subscribing.",
    eventsHeading: "Events",
    eventsSubtitle: "An overview of events, conferences and summer schools organised by the faculty and its partners.",
    eventTypeLabel: "Event type:",
    allEventTypes: "All types",
    emptyEvents: "No events found for the selected filter.",
    projectsHeading: "Projects",
    projectsSubtitle: "Research projects and project calls across CTU faculties and units.",
    unitLabel: "Unit:",
    allUnits: "All units",
    unitFel: "CTU FEL",
    unitKme: "Department of Microelectronics",
    unitFjfi: "CTU FNSPE",
    unitFd: "Faculty of Transportation",
    unitExternal: "External cooperation",
    emptyProjects: "No projects found for the selected filter.",
    projectCalls: "Project calls",
    statusPreparation: "Preparation",
    statusRunning: "Running",
    statusCompleted: "Completed",
    deadline: "Deadline",
    conditions: "Conditions",
    outputs: "Outputs and publications",
    contactPerson: "Contact",
    backToProjects: "Back to projects",
    projectCallLabel: "Project call",
    educationHeading: "Education",
    educationSubtitle: "Study programmes, opportunities and summer schools of the Electronics and Communications programme.",
    studyProgram: "Study programme",
    studyProgramDesc: "The Electronics and Communications (EK) programme prepares engineers for chip design, power electronics and embedded systems. The follow-up Master's programme Electronics and Integrated Systems (EIS) is taught in English.",
    studyProgramLink: "More about the programme at ek.fel.cvut.cz",
    opportunities: "Opportunities",
    summerSchools: "Summer schools",
    noSummerSchools: "There is currently no summer school listed.",
    faq: "Frequently asked questions",
    aboutHeading: "About us",
    aboutSubtitle: "The Department of Microelectronics at CTU FEL, our partners and the history of the Semiconductors portal.",
    contacts: "Contacts",
    contactDepartment: "Department of Microelectronics, CTU FEL",
    contactAddress: "Technická 2, 166 27 Prague 6 – Dejvice",
    contactEmail: "mikroelektronika@fel.cvut.cz",
    contactPhone: "+420 224 352 000",
    contactMedia: "Media contact: media@fel.cvut.cz",
    partners: "Partners",
    history: "History",
    timelineLabel: "Content type:",
    timelineAll: "All",
    timelineEvents: "Events",
    timelineProjects: "Projects",
    timelineProfiles: "Profiles",
    timelineArticles: "Articles",
    emptyTimeline: "No items found for the selected filter.",
    profilesHeading: "Profiles",
    profilesSubtitle: "The people behind the research, teaching and industry cooperation.",
    backToProfiles: "Back to profiles",
    profilesLink: "Profiles",
    footerContact: "Contact",
    footerSocial: "Follow us",
  },
};

export function getTranslations(language: Language): Translator {
  return (key) => TRANSLATIONS[language][key];
}
