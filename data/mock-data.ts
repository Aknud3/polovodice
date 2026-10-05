import type {
  Article,
  StorystreamItem,
  CleanroomStatus,
  MarketIndexItem,
  CampusEvent,
  PollData,
} from "@/types/portal";

export const MOCK_ARTICLES: Article[] = [
  {
    id: "art-1",
    slug: "onsemi-investice-46-miliard-roznov-fel-cvut",
    title: "Historický zlom pro český křemík: onsemi investuje 46 miliard Kč v Rožnově p. R. a rozšiřuje spolupráci s ČVUT FEL",
    perex: "Americký polovodičový gigant onsemi oficiálně potvrdil masivní investici do výstavby nového závodu na výrobu karbid-křemíkových (SiC) waferů a čipů. Katedra mikroelektroniky FEL ČVUT se stává klíčovým partnerem pro výzkum i výchovu inženýrů.",
    content: `
Americký polovodičový gigant onsemi potvrdil gigantickou investici ve výši 46 miliard korun (přibližně 2 miliardy dolarů) do rozšíření svého výrobního areálu v Rožnově pod Radhoštěm. V České republice tak vyroste jeden z nejmodernějších vertikálně integrovaných závodů na světě, který pokryje kompletní řetězec od pěstování krystalů karbidu křemíku (SiC), přes řezání a leštění waferů, až po finální litografické zpracování a balení výkonových integrovaných modulů.

### Reakce na evropský Chips Act
Investice představuje přímé naplnění cílů **Evropského aktu o čipech (European Chips Act)** a **Národní polovodičové strategie České republiky**, jejímž cílem je ztrojnásobit kapacitu polovodičového sektoru v ČR do roku 2029.

Výroba v Rožnově pod Radhoštěm bude primárně orientována na automobilový průmysl a energetiku. SiC čipy umožňují dramatické zvýšení dojezdu elektromobilů (až o 12–15 %) a zkrácení doby rychlonabíjení díky schopnosti pracovat při napětích přes 1 200 V a spínacích kmitočtech v řádu stovek kilohertzů s minimálními tepelnými ztrátami.

### Strategická role programu Elektronika a komunikace (EK)
Klíčovým pilířem úspěchu je dostupnost špičkových inženýrů v oboru návrhu čipů a mikroelektronických technologií. Fakulta elektrotechnická ČVUT v Praze v čele s Katedrou mikroelektroniky rozšiřuje strategické partnerství s onsemi:
- Otevření společné výzkumné laboratoře výkonových struktur na Karlově náměstí.
- Finanční podpora studentů v novém magisterském programu **Elektronika a integrované systémy (EIS)**.
- Společné diplomové práce a přímé stáže v čistých prostorech a design centrech.
    `,
    category: "industry",
    categoryLabel: "STRATEGIE // CHIPS ACT",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Křemíkový wafer v čistých prostorách polovodičové továrny",
    publishedAt: "05. 10. 2026",
    readTimeMinutes: 5,
    author: {
      name: "prof. Ing. Jiří Vobecký, CSc.",
      title: "Vedoucí Katedry mikroelektroniky",
      department: "ČVUT FEL – Katedra mikroelektroniky",
    },
    featured: true,
    specs: {
      material: "SiC",
      voltageV: 2400,
      switchingFreqKHz: 450,
      packageType: "Wafer 200mm / TO-247-4L",
      efficiencyPercent: 99.4,
    },
    tags: ["onsemi", "SiC", "Chips Act", "Národní strategie", "Rožnov", "Automotive"],
  },
  {
    id: "art-2",
    slug: "navrh-3nm-asic-cipu-v-nastrojich-cadence",
    title: "Kompletní návrhové flow: Jak na FEL ČVUT vzniká zákaznický čip ASIC od RTL kódu po fyzický layout",
    perex: "Nahlédněte pod pokličku laboratorní výuky na Katedře mikroelektroniky. Od SystemVerilogu a logické syntézy až po timing analýzu a DRC verifikaci v průmyslových EDA nástrojích Cadence a Synopsys.",
    content: `
Vývoj moderních mikročipů dosáhl komplexity, kdy se na křemíkovém plátku o ploše několika čtverečních milimetrů nacházejí desítky miliard tranzistorů. V rámci nového magisterského programu Elektronika a integrované systémy (EIS) mají studenti k dispozici stejné EDA nástroje, jaké používají giganti jako Apple, NVIDIA či Qualcomm.

Celý proces návrhu ASIC čipu probíhá v několika fázích:
1. **Architektonický návrh a specifikace:** Definice funkčních bloků, datových toků a rozhraní (např. AXI bus, SPI).
2. **RTL Kódování:** Zápis chování obvodu v jazycích SystemVerilog nebo VHDL.
3. **Funkční verifikace:** UVM (Universal Verification Methodology) testbenche a simulace.
4. **Logická syntéza:** Převod RTL kódu na hradlovou síť (gate-level netlist) podle konkrétní knihovny polovodičové slévárny (Foundry PDK).
5. **Place & Route (Fyzický layout):** Umístění buněk a trasování kovových propojů při dodržení přísných design rules (DRC) a časových limitů (Static Timing Analysis).
    `,
    category: "chips",
    categoryLabel: "NÁVRH ČIPŮ // ASIC & EDA",
    imageUrl: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Návrh integrovaného obvodu v EDA nástroji na monitoru",
    publishedAt: "04. 10. 2026",
    readTimeMinutes: 6,
    author: {
      name: "Ing. Tomáš Horák, Ph.D.",
      title: "Odborný asistent",
      department: "ČVUT FEL – Katedra mikroelektroniky",
    },
    specs: {
      nodeNm: 3,
      material: "Si",
      edaTool: "Cadence",
      packageType: "FC-BGA 1156",
    },
    tags: ["ASIC", "Cadence", "Synopsys", "SystemVerilog", "RTL", "EDA"],
  },
  {
    id: "art-3",
    slug: "gan-tranzistory-vykonova-elektronika-rekordni-ucinnost",
    title: "Revoluce v napájení: Nitrid galia (GaN) posouvá účinnost spínaných měničů na 99,2 %",
    perex: "Laboratoř výkonové elektroniky představila nový prototyp vícefázového měniče pro stejnosměrné rychlonabíjecí stanice. Použití GaN HEMT spínačů zmenšilo pasivní prvky na třetinu původního objemu.",
    content: `
Křemík dominoval výkonové elektronice déle než půl století, avšak jeho fyzikální limity (dané šířkou zakázaného pásu 1,12 eV) neumožňují další zmenšování spínacích ztrát při megahertzových frekvencích.

Výzkumný tým programu Elektronika a komunikace dokončil testování nového typu měniče využívajícího komerční i experimentální GaN na křemíku (GaN-on-Si) tranzistory. Výsledky měření:
- Dosažená účinnost přeměny energie: **99,2 %** při zátěži 5 kW.
- Spínací kmitočet: **1,2 MHz** (ve srovnání s běžnými 65–100 kHz u křemíkových MOSFETů).
- Drastická redukce objemu feritových tlumivek a filtračních keramických kondenzátorů.
    `,
    category: "power-elec",
    categoryLabel: "VÝKONOVÁ ELEKTRONIKA // GaN",
    imageUrl: "https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Plošný spoj s GaN tranzistory a výkonovými cívkami",
    publishedAt: "03. 10. 2026",
    readTimeMinutes: 4,
    author: {
      name: "doc. Ing. Jan Novotný, Ph.D.",
      title: "Docent",
      department: "ČVUT FEL – Katedra teorie obvodů",
    },
    specs: {
      material: "GaN",
      voltageV: 650,
      switchingFreqKHz: 1200,
      efficiencyPercent: 99.2,
    },
    tags: ["GaN", "Měniče", "Spínané zdroje", "Elektromobilita", "Účinnost"],
  },
  {
    id: "art-4",
    slug: "modernizace-cistych-prostor-kn-e-karlovo-namesti",
    title: "Čisté prostory KN:E po generální rekonstrukci: FEL ČVUT nabízí špičkové prostředí třídy ISO 6",
    perex: "V areálu Karlova náměstí byla dokončena modernizace laboratorního komplexu pro fotolitografii, vakuové napařování a difuzní procesy. Laboratoř slouží pro výrobu senzorů i studentský výzkum.",
    content: `
Laboratorní zázemí čistých prostorů Fakulty elektrotechnické na Karlově náměstí (budova E) prošlo komplexní modernizací HVAC vzduchotechniky a filtrace. Certifikace potvrdila splnění přísných parametrů třídy čistoty **ISO 6** (méně než 1 000 000 částic větších než 0,1 µm na metr krychlový).

Nové vybavení zahrnuje:
- Bezkontaktní mask aligner pro UV litografii s rozlišením 0,8 µm.
- Reaktivní iontové leptání (RIE) pro přesné leptání polovodičových vrstev.
- Profilometr a atomární silový mikroskop (AFM) pro diagnostiku nanostruktur.
    `,
    category: "materials",
    categoryLabel: "LABORATOŘE // CLEANROOMS",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Výzkumník ve žlutém ochranném obleku v čistých prostorách",
    publishedAt: "01. 10. 2026",
    readTimeMinutes: 4,
    author: {
      name: "Ing. Zdeněk Pekárek",
      title: "Správce čistých prostor",
      department: "ČVUT FEL – Katedra mikroelektroniky",
    },
    specs: {
      packageType: "Čisté prostory ISO 6",
      material: "Si",
    },
    tags: ["Cleanrooms", "ISO 6", "Karlovo náměstí", "Litografie", "Výroba"],
  },
  {
    id: "art-5",
    slug: "risc-v-mikrokontroler-kryptografie-fel",
    title: "Český křemík pro bezpečný IoT: FEL ČVUT představuje otevřený 32bitový RISC-V procesor s hardwarovým šifrováním",
    perex: "Architektura RISC-V zažívá celosvětový boom. Tým Katedry číslicové techniky a mikroelektroniky navrhl čip s vestavěným post-kvantovým kryptografickým jádrem a ultra-nízkou spotřebou v režimu spánku.",
    content: `
Nezávislost na proprietárních procesorových jádrech typu ARM je jedním z hlavních trendů moderního čipového inženýrství. Tým pod vedením vědců z FEL ČVUT úspěšně odeslal do výroby (tzv. tape-out) nový prototyp procesoru založeného na otevřené instrukční sadě RISC-V (RV32IMC).

Klíčové vlastnosti čipu:
- Integrovaný kryptografický akcelerátor pro algoritmy odolné vůči kvantovým počítačům (Kyber / Dilithium).
- Spotřeba v aktivním režimu: pouze **18 µW/MHz**.
- Špičková odolnost vůči útokům postranními kanály (Side-Channel Attacks - DPA).
    `,
    category: "embedded",
    categoryLabel: "HARDWARE // RISC-V & IOT",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Mikroprocesorový čip na desce plošných spojů",
    publishedAt: "28. 09. 2026",
    readTimeMinutes: 5,
    author: {
      name: "Ing. Martin Daněk, Ph.D.",
      title: "Výzkumník",
      department: "ČVUT FEL – Program Elektronika a komunikace",
    },
    specs: {
      nodeNm: 22,
      switchingFreqKHz: 120000,
      material: "Si",
      packageType: "QFN-48",
    },
    tags: ["RISC-V", "Kryptografie", "IoT", "Vestavné systémy", "Tape-out"],
  },
  {
    id: "art-6",
    slug: "fotonicke-cipy-kvantove-komunikace",
    title: "Světlo místo elektronů: Fotonické integrované obvody (PIC) zrychlují přenosy dat v optických sítích",
    perex: "Katedra radioelektroniky a optoelektronické týmy FEL ČVUT vyvíjejí křemíkovou fotoniku pro budoucí generace 6G sítí a optické propojování serverů v AI datacentrech.",
    content: `
Spotřeba elektrické energie v datových centrech pro umělou inteligenci roste exponenciálním tempem. Jedním z hlavních úzkých hrdel jsou metalické spoje mezi procesory a paměťmi.

Fotonické integrované obvody (Photonic Integrated Circuits – PIC) nahrazují měděné vodiče optickými vlnovody přímo na křemíkovém substrátu:
- Přenosové rychlosti přesahující **1,6 Tb/s na jediný čip**.
- Latence snížená o 80 % ve srovnání s konvenčním metalickým přenosem.
- Výzkumná spolupráce v rámci evropského konsorcia PhotonDelta.
    `,
    category: "quantum",
    categoryLabel: "FOTONIKA // KVANTOVÉ ČIPY",
    imageUrl: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Laserový optický paprsek a optické vlnovody",
    publishedAt: "25. 09. 2026",
    readTimeMinutes: 5,
    author: {
      name: "doc. Ing. Stanislav Zvánovec, Ph.D.",
      title: "Profesor optoelektroniky",
      department: "ČVUT FEL – Katedra radioelektroniky",
    },
    specs: {
      material: "InP",
      switchingFreqKHz: 40000000,
      packageType: "Optical Co-Packaged",
    },
    tags: ["Fotonika", "Kvantové čipy", "Optické sítě", "6G", "PhotonDelta"],
  },
];

export const MOCK_STORYSTREAM: StorystreamItem[] = [
  {
    id: "story-1",
    timestamp: "15:42",
    date: "Dnes",
    title: "onsemi vyhlašuje stipendijní program pro studenty magisterského programu EIS (až 20 000 Kč měsíčně)",
    category: "industry",
    urgent: true,
  },
  {
    id: "story-2",
    timestamp: "14:15",
    date: "Dnes",
    title: "Čisté prostory KN:E hlásí úspěšnou kalibraci reaktivního iontového leptání RIE na křemíkových strukturách",
    category: "materials",
  },
  {
    id: "story-3",
    timestamp: "12:30",
    date: "Dnes",
    title: "Katedra mikroelektroniky instalovala novou licenci EDA balíku Synopsys Custom Compiler pro 3nm procesy",
    category: "chips",
  },
  {
    id: "story-4",
    timestamp: "10:05",
    date: "Dnes",
    title: "Zahájena registrace na seminář IEEE: Pokročilé topologie SiC měničů pro palubní nabíječky elektromobilů",
    category: "power-elec",
  },
  {
    id: "story-5",
    timestamp: "Včera",
    date: "Včera",
    title: "Tým studentů programu EK obsadil 1. místo v mezinárodním hackathonu vestavných systémů v Drážďanech",
    category: "embedded",
  },
  {
    id: "story-6",
    timestamp: "Včera",
    date: "Včera",
    title: "Evropská komise schválila českou notifikaci veřejné podpory pro polovodičový klastr v hodnotě 12 mld. Kč",
    category: "industry",
  },
];

export const MOCK_MARKET_INDICES: MarketIndexItem[] = [
  { symbol: "CHIPS ACT ČR", name: "Investice onsemi", value: "46 mld. Kč", changePercent: 100.0 },
  { symbol: "SOX INDEX", name: "PHLX Semiconductor", value: "5 248.10", changePercent: 1.42 },
  { symbol: "ON", name: "onsemi Corp", value: "$76.40", changePercent: 2.15 },
  { symbol: "STM", name: "STMicroelectronics", value: "€28.90", changePercent: 0.85 },
  { symbol: "ASML", name: "ASML Holding", value: "€782.50", changePercent: 1.94 },
];

export const MOCK_CLEANROOM_STATUS: CleanroomStatus = {
  facility: "Čisté prostory Karlovo náměstí KN:E-32",
  isoClass: "ISO 6",
  operationalState: "V provozu",
  temperatureCelsius: 21.2,
  humidityPercent: 44.5,
  airParticlesPerM3: 41200,
  lastCalibrationDate: "02. 10. 2026",
};

export const MOCK_CAMPUS_EVENTS: CampusEvent[] = [
  {
    id: "ev-1",
    title: "Přednáška inženýrů z onsemi: Fyzika a spolehlivost SiC MOSFETů pro automotive",
    description: "Přednáška s ukázkami reálných měření na waferové úrovni přímo z provozu v Rožnově p. R.",
    dateDay: "14",
    dateMonth: "ŘÍJ",
    fullDate: "14. 10. 2026",
    time: "16:15",
    location: "Zengerova posluchárna KN:E-107",
    category: "Přednáška",
    targetAudience: "Všichni",
  },
  {
    id: "ev-2",
    title: "Workshop: Fyzický layout zákaznického čipu ASIC v Cadence Virtuoso",
    description: "Hands-on workshop pro studenty i veřejnost v počítačové laboratoři mikroelektroniky.",
    dateDay: "22",
    dateMonth: "ŘÍJ",
    fullDate: "22. 10. 2026",
    time: "14:00",
    location: "Laboratoř mikroelektroniky KN:E-301",
    category: "Workshop",
    targetAudience: "Inženýři",
  },
  {
    id: "ev-3",
    title: "Dny otevřených dveří FEL: Prohlídka čistých prostor a měřicích komor",
    description: "Exkurze do zázemí Katedry mikroelektroniky a seznámení s novým programem EIS.",
    dateDay: "06",
    dateMonth: "LIS",
    fullDate: "06. 11. 2026",
    time: "09:00",
    location: "Areál Karlovo náměstí & Dejvice",
    category: "Konference",
    targetAudience: "Veřejnost",
  },
];

export const MOCK_POLL_DATA: PollData = {
  id: "poll-1",
  question: "Který polovodičový materiál bude do roku 2030 nejvíce dominovat výkonové elektronice?",
  totalVotes: 348,
  options: [
    { id: "opt-1", text: "Karbid křemíku (SiC) – elektromobilita & trakce", votes: 168 },
    { id: "opt-2", text: "Nitrid galia (GaN) – vysokofrekvenční spínače & zdroje", votes: 122 },
    { id: "opt-3", text: "Konvenční křemík (Si) – cenová dominance zůstane", votes: 41 },
    { id: "opt-4", text: "Diamant & ultra-wide bandgap materiály", votes: 17 },
  ],
};
