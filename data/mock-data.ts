import type {
  Article,
  StorystreamItem,
  CleanroomStatus,
  MarketIndexItem,
  CampusEvent,
  PollData,
  PortalEvent,
  Project,
  ProjectCall,
  Profile,
  Partner,
  Opportunity,
  FaqItem,
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
    audience: ["partners", "media", "students"],
    en: {
      title: "Historic Milestone for Czech Silicon: onsemi Invests $2 Billion in Rožnov and Expands Partnership with CTU FEL",
      perex: "US semiconductor giant onsemi has officially confirmed a massive investment to build a new vertically integrated Silicon Carbide (SiC) wafer and chip manufacturing facility. The Department of Microelectronics at CTU FEL becomes a key partner for R&D and talent education.",
      content: `
US semiconductor giant onsemi has confirmed a landmark investment of CZK 46 billion (approximately USD 2 billion) to expand its manufacturing campus in Rožnov pod Radhoštěm. The Czech Republic will host one of the world's most advanced vertically integrated facilities, covering the entire production chain from Silicon Carbide (SiC) crystal growth, wafer slicing and polishing, to final lithography processing and packaging of integrated power modules.

### Aligning with the European Chips Act
The investment directly fulfills the goals of the **European Chips Act** and the **National Semiconductor Strategy of the Czech Republic**, which aims to triple the capacity of the Czech semiconductor sector by 2029.

Production in Rožnov pod Radhoštěm will primarily serve the automotive and clean energy sectors. SiC chips enable a significant increase in electric vehicle driving range (up to 12–15%) and faster charging times thanks to their ability to operate at voltages exceeding 1,200 V and switching frequencies of hundreds of kilohertz with minimal thermal losses.

### Strategic Role of the Electronics and Communications (EK) Programme
A key pillar of this expansion is the availability of top-tier engineers in IC design and microelectronic technologies. The Faculty of Electrical Engineering at CTU in Prague, led by the Department of Microelectronics, is expanding its strategic partnership with onsemi:
- Opening a joint power semiconductor research laboratory at the Charles Square campus.
- Direct financial scholarships for students in the new Master's programme **Electronics and Integrated Systems (EIS)**.
- Joint Master's theses and hands-on internships in cleanrooms and IC design centers.
      `,
      categoryLabel: "STRATEGY // CHIPS ACT",
      imageAlt: "Silicon wafer inside a semiconductor fabrication cleanroom",
      authorTitle: "Head of the Department of Microelectronics",
      authorDepartment: "CTU FEL – Department of Microelectronics",
      tags: ["onsemi", "SiC", "Chips Act", "National Strategy", "Rožnov", "Automotive"],
    },
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
    audience: ["students", "researchers"],
    en: {
      title: "Complete IC Design Flow: How Custom ASIC Chips Are Created at CTU FEL from RTL Code to Physical Layout",
      perex: "Look inside the hands-on laboratory courses at the Department of Microelectronics. From SystemVerilog and logic synthesis to static timing analysis and DRC verification in industrial Cadence and Synopsys EDA tools.",
      content: `
Modern microchip development has reached a complexity where tens of billions of transistors reside on a silicon die measuring just a few square millimeters. Within the new Master's programme Electronics and Integrated Systems (EIS), students work with the exact same industrial EDA suites used by companies such as Apple, NVIDIA, and Qualcomm.

The complete ASIC design flow consists of several key stages:
1. **Architectural Design & Specification:** Defining functional blocks, data paths, and standard interfaces (such as AXI bus and SPI).
2. **RTL Coding:** Describing circuit behavior in hardware description languages like SystemVerilog or VHDL.
3. **Functional Verification:** Building UVM (Universal Verification Methodology) testbenches and running coverage-driven simulations.
4. **Logic Synthesis:** Translating RTL code into a gate-level netlist mapped to a specific semiconductor foundry library (Foundry PDK).
5. **Place & Route (Physical Layout):** Placing standard cells and routing metal interconnects while meeting strict Design Rule Checks (DRC) and Static Timing Analysis (STA) constraints.
      `,
      categoryLabel: "CHIP DESIGN // ASIC & EDA",
      imageAlt: "Integrated circuit layout design on a workstation monitor",
      authorTitle: "Assistant Professor",
      authorDepartment: "CTU FEL – Department of Microelectronics",
      tags: ["ASIC", "Cadence", "Synopsys", "SystemVerilog", "RTL", "EDA"],
    },
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
    audience: ["researchers", "partners"],
    en: {
      title: "Power Conversion Breakthrough: Gallium Nitride (GaN) Pushes Switching Converter Efficiency to 99.2%",
      perex: "The Power Electronics Laboratory has unveiled a new multiphase converter prototype for DC fast-charging stations. Using GaN HEMT switches reduced passive component volume to one-third of its original size.",
      content: `
Silicon has dominated power electronics for more than half a century, but its physical limits—governed by its 1.12 eV bandgap—prevent further reductions in switching losses at megahertz frequencies.

A research team from the Electronics and Communications programme has completed testing of a new converter topology utilizing both commercial and experimental Gallium Nitride on Silicon (GaN-on-Si) transistors. Key measurement results include:
- Achieved energy conversion efficiency: **99.2%** at a 5 kW load.
- Switching frequency: **1.2 MHz** (compared to 65–100 kHz for conventional silicon MOSFETs).
- A dramatic reduction in the size and weight of ferrite inductors and ceramic filter capacitors.
      `,
      categoryLabel: "POWER ELECTRONICS // GaN",
      imageAlt: "Printed circuit board with GaN power transistors and inductors",
      authorTitle: "Associate Professor",
      authorDepartment: "CTU FEL – Department of Circuit Theory",
      tags: ["GaN", "Converters", "Switched-Mode Power", "E-Mobility", "Efficiency"],
    },
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
    audience: ["students", "researchers", "public"],
    en: {
      title: "KN:E Cleanrooms After Major Upgrade: CTU FEL Offers State-of-the-Art ISO 6 Environment",
      perex: "The modernization of the cleanroom laboratory complex for photolithography, vacuum deposition, and diffusion processes at the Charles Square campus has been completed, serving both sensor fabrication and student research.",
      content: `
The cleanroom laboratory facilities of the Faculty of Electrical Engineering at Charles Square (Building E) have undergone a comprehensive overhaul of their HVAC air handling and HEPA/ULPA filtration systems. Certification confirmed compliance with strict **ISO Class 6** standards (fewer than 1,000,000 particles larger than 0.1 µm per cubic meter).

Newly installed equipment includes:
- A contactless UV mask aligner with 0.8 µm optical resolution.
- A Reactive Ion Etching (RIE) system for precision patterning of semiconductor layers.
- A surface profilometer and Atomic Force Microscope (AFM) for nanostructure diagnostics.
      `,
      categoryLabel: "LABORATORIES // CLEANROOMS",
      imageAlt: "Researcher in a protective cleanroom suit working under yellow light",
      authorTitle: "Cleanroom Facility Manager",
      authorDepartment: "CTU FEL – Department of Microelectronics",
      tags: ["Cleanrooms", "ISO 6", "Charles Square", "Lithography", "Fabrication"],
    },
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
    audience: ["students", "researchers", "media"],
    en: {
      title: "Czech Silicon for Secure IoT: CTU FEL Unveils Open 32-Bit RISC-V Processor with Hardware Encryption",
      perex: "The open RISC-V architecture is experiencing a global boom. A joint team from the Digital Design and Microelectronics departments has designed a chip featuring a built-in post-quantum cryptographic core and ultra-low sleep power.",
      content: `
Technological independence from proprietary processor cores such as ARM is one of the defining trends of modern chip engineering. A team led by researchers at CTU FEL has successfully completed the tape-out of a new processor prototype based on the open RISC-V instruction set (RV32IMC).

Key specifications of the chip:
- Integrated cryptographic hardware accelerator supporting post-quantum algorithms (Kyber / Dilithium).
- Active-mode power consumption of only **18 µW/MHz**.
- Built-in countermeasures against Differential Power Analysis (DPA) side-channel attacks.
      `,
      categoryLabel: "HARDWARE // RISC-V & IOT",
      imageAlt: "Microprocessor chip mounted on a printed circuit board",
      authorTitle: "Senior Researcher",
      authorDepartment: "CTU FEL – Electronics and Communications Programme",
      tags: ["RISC-V", "Cryptography", "IoT", "Embedded Systems", "Tape-out"],
    },
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
    audience: ["researchers", "media"],
    en: {
      title: "Light Instead of Electrons: Photonic Integrated Circuits (PIC) Accelerate Optical Data Interconnects",
      perex: "The Department of Radioelectronics and optoelectronics teams at CTU FEL are developing silicon photonics for next-generation 6G networks and optical server interconnects in AI data centers.",
      content: `
Electricity consumption in artificial intelligence data centers is growing exponentially, with copper interconnects between processors and memory modules forming one of the primary bottlenecks.

Photonic Integrated Circuits (PICs) replace copper traces with optical waveguides fabricated directly on a silicon substrate:
- Data transmission rates exceeding **1.6 Tb/s per single chip**.
- Latency reduced by 80% compared to conventional electrical interconnects.
- Active research collaboration within the European PhotonDelta consortium.
      `,
      categoryLabel: "PHOTONICS // QUANTUM CHIPS",
      imageAlt: "Laser beam and optical waveguides in a photonics laboratory",
      authorTitle: "Professor of Optoelectronics",
      authorDepartment: "CTU FEL – Department of Radioelectronics",
      tags: ["Photonics", "Quantum Chips", "Optical Networks", "6G", "PhotonDelta"],
    },
  },
  {
    id: "art-7",
    slug: "letni-skola-polovodicovych-technologii-2027",
    title: "Letní škola polovodičových technologií FEL ČVUT 2027: přihlášky do 31. března",
    perex: "Týdenní intenzivní kurz na Karlově náměstí provede studenty celým řetězcem od návrhu čipu po měření v čistých prostorech. Kapacita je 24 míst, přihlášky se podávají přes studijní systém.",
    content: `
Fakulta elektrotechnická ČVUT otevírá sedmý ročník **Letní školy polovodičových technologií**, který se uskuteční v areálu Karlova náměstí (budova E) a v čistých prostorech KN:E.

Program letní školy:
1. **Návrh čipu:** od SystemVerilogu přes logickou syntézu po fyzický layout v Cadence Virtuoso.
2. **Technologie:** litografie, vakuové napařování, difuzní procesy a leptání v čistých prostorech třídy ISO 6.
3. **Charakterizace:** měření na waferové úrovni, profilometrie a diagnostika pomocí AFM.
4. **Exkurze:** provozní prohlídka laboratoří a setkání s inženýry z partnerských firem.

Kurz je určen studentům bakalářského i magisterského studia programu Elektronika a komunikace a dalším zájemcům z technických oborů. Podmínkou účasti je absolvování úvodního předmětu z mikroelektroniky.
    `,
    category: "academic",
    categoryLabel: "FAKULTA // LETNÍ ŠKOLA",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Studenti v laboratoři mikroelektroniky během praktické výuky",
    publishedAt: "12. 10. 2026",
    readTimeMinutes: 3,
    author: {
      name: "prof. Ing. Jiří Vobecký, CSc.",
      title: "Vedoucí Katedry mikroelektroniky",
      department: "ČVUT FEL – Katedra mikroelektroniky",
    },
    tags: ["Letní škola", "Vzdělávání", "Čisté prostory", "Přihlášky"],
    audience: ["students"],
    en: {
      title: "CTU FEL Summer School of Semiconductor Technologies 2027: Applications Open Until March 31",
      perex: "An intensive one-week course at the Charles Square campus guides students through the entire workflow from IC design to cleanroom wafer characterization. Capacity is limited to 24 participants.",
      content: `
The Faculty of Electrical Engineering at CTU is opening the seventh edition of the **Summer School of Semiconductor Technologies**, held at the Charles Square campus (Building E) and inside the KN:E cleanrooms.

Summer school curriculum:
1. **IC Design:** From SystemVerilog and logic synthesis to physical layout in Cadence Virtuoso.
2. **Cleanroom Fabrication:** Photolithography, vacuum evaporation, diffusion processes, and etching in ISO 6 cleanrooms.
3. **Characterization:** Wafer-level electrical probing, surface profilometry, and AFM nanoscale diagnostics.
4. **Industry Networking:** Guided laboratory tours and workshops with engineers from partner semiconductor companies.

The course is open to Bachelor's and Master's students of the Electronics and Communications programme as well as applicants from related technical fields.
      `,
      categoryLabel: "FACULTY // SUMMER SCHOOL",
      imageAlt: "Students working inside the microelectronics laboratory",
      authorTitle: "Head of the Department of Microelectronics",
      authorDepartment: "CTU FEL – Department of Microelectronics",
      tags: ["Summer School", "Education", "Cleanrooms", "Applications"],
    },
  },
  {
    id: "art-8",
    slug: "dny-otevrenych-dveri-fel-cvut-cisty-prostory",
    title: "Dny otevřených dveří FEL ČVUT: prohlídka čistých prostor KN:E a laboratoří mikroelektroniky",
    perex: "Zájemci z řad veřejnosti i uchazečů o studium si mohou prohlédnout čisté prostory třídy ISO 6, mask aligner pro UV litografii a měřicí pracoviště na Karlově náměstí.",
    content: `
Fakulta elektrotechnická pořádá **Dny otevřených dveří** s komentovanými prohlídkami laboratoří Katedry mikroelektroniky.

Návštěvníci uvidí:
- Čisté prostory KN:E-32 s certifikací **ISO 6** včetně vzduchotechniky a filtračních systémů.
- Bezkontaktní mask aligner pro UV litografii a pracoviště reaktivního iontového leptání (RIE).
- Měřicí komoru pro charakterizaci výkonových SiC a GaN struktur.
- Ukázky studentských projektů a prototypů čipů z programu EIS.

Prohlídky probíhají v hodinových blocích, vstup do čistých prostor je pouze v doprovodu personálu a s ochranným oděvem, který je zajištěn na místě.
    `,
    category: "academic",
    categoryLabel: "FAKULTA // DEN OTEVŘENÝCH DVEŘÍ",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Křemíkový wafer představený veřejnosti v laboratoři",
    publishedAt: "10. 10. 2026",
    readTimeMinutes: 2,
    author: {
      name: "Ing. Zdeněk Pekárek",
      title: "Správce čistých prostor",
      department: "ČVUT FEL – Katedra mikroelektroniky",
    },
    tags: ["Den otevřených dveří", "Čisté prostory", "Karlovo náměstí", "Uchazeči"],
    audience: ["students", "public"],
    en: {
      title: "CTU FEL Open Days: Guided Tours of the KN:E Cleanrooms and Microelectronics Laboratories",
      perex: "Prospective students and members of the public can explore the ISO 6 cleanrooms, UV lithography mask aligner, and semiconductor measurement setups at the Charles Square campus.",
      content: `
The Faculty of Electrical Engineering invites prospective students and visitors to its **Open Days**, featuring guided tours of the Department of Microelectronics laboratories.

What visitors will see:
- The **ISO 6** certified KN:E-32 cleanrooms, including air filtration and environmental control systems.
- Contactless UV lithography mask aligner and Reactive Ion Etching (RIE) workstations.
- High-voltage characterization chambers for testing SiC and GaN power devices.
- Live demonstrations of student projects and chip prototypes from the EIS programme.

Tours run in hourly blocks. Entry into the cleanroom zone requires protective garments provided on-site and accompaniment by laboratory staff.
      `,
      categoryLabel: "FACULTY // OPEN DAYS",
      imageAlt: "Silicon wafer presented during a laboratory tour",
      authorTitle: "Cleanroom Facility Manager",
      authorDepartment: "CTU FEL – Department of Microelectronics",
      tags: ["Open Days", "Cleanrooms", "Charles Square", "Prospective Students"],
    },
  },
  {
    id: "art-9",
    slug: "stipendijni-program-onsemi-program-eis",
    title: "Stipendijní program onsemi pro studenty programu EIS: až 20 000 Kč měsíčně",
    perex: "Společnost onsemi rozšiřuje podporu studentů magisterského programu Elektronika a integrované systémy. Stipendium je spojené s prací na společných projektech a stáží v Rožnově pod Radhoštěm.",
    content: `
V návaznosti na investici do nového závodu v Rožnově pod Radhoštěm otevírá společnost onsemi **stipendijní program** pro studenty programu Elektronika a integrované systémy (EIS).

Podmínky programu:
- Měsíční stipendium až **20 000 Kč** po dobu dvou semestrů.
- Povinná účast na společném výzkumném projektu Katedry mikroelektroniky a onsemi.
- Nabídka odborné stáže v design centru nebo v čistých prostorech výrobního závodu.
- Možnost zpracování diplomové práce na téma výkonových SiC struktur.

Přihlášky se podávají elektronicky přes studijní oddělení, součástí je motivační dopis a přehled dosažených výsledků.
    `,
    category: "academic",
    categoryLabel: "FAKULTA // STIPENDIA",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Mikroprocesorový čip jako symbol stipendijního programu onsemi",
    publishedAt: "08. 10. 2026",
    readTimeMinutes: 3,
    author: {
      name: "doc. Ing. Jan Novotný, Ph.D.",
      title: "Docent",
      department: "ČVUT FEL – Program Elektronika a komunikace",
    },
    tags: ["Stipendia", "onsemi", "EIS", "Podpora studentů"],
    audience: ["students", "partners"],
    en: {
      title: "onsemi Scholarship Programme for EIS Master's Students: Up to CZK 20,000 per Month",
      perex: "onsemi is expanding its financial support for students enrolled in the Electronics and Integrated Systems Master's programme, combining monthly stipends with R&D projects and internships in Rožnov.",
      content: `
Following its major fab investment in Rožnov pod Radhoštěm, onsemi is launching a dedicated **scholarship programme** for students of the Electronics and Integrated Systems (EIS) Master's programme.

Programme benefits and terms:
- Monthly scholarship of up to **CZK 20,000** for two semesters.
- Participation in a joint R&D project between the Department of Microelectronics and onsemi.
- Guaranteed paid internship at an IC design center or fabrication cleanroom facility.
- Opportunity to write a Master's thesis focused on SiC power semiconductor structures.

Applications are submitted electronically via the Study Department and include a cover letter and academic transcript.
      `,
      categoryLabel: "FACULTY // SCHOLARSHIPS",
      imageAlt: "Microprocessor chip representing the onsemi scholarship programme",
      authorTitle: "Associate Professor",
      authorDepartment: "CTU FEL – Electronics and Communications Programme",
      tags: ["Scholarships", "onsemi", "EIS", "Student Support"],
    },
  },
  {
    id: "art-10",
    slug: "prijimaci-rizeni-eis-akademicky-rok-2027-2028",
    title: "Přijímací řízení do magisterského programu EIS pro akademický rok 2027/2028 je otevřeno",
    perex: "Program Elektronika a integrované systémy přijímá přihlášky do 30. dubna. Součástí přijímacího řízení je pohovor zaměřený na základy elektroniky a motivaci ke studiu mikroelektroniky.",
    content: `
Fakulta elektrotechnická vyhlásila **přijímací řízení** do navazujícího magisterského programu Elektronika a integrované systémy (EIS) pro akademický rok 2027/2028.

Průběh přijímacího řízení:
1. **Elektronická přihláška** ve studijním systému do 30. dubna 2027.
2. **Odborný pohovor** z okruhů teorie obvodů, číslicové techniky a základů polovodičových součástek.
3. **Motivační část** zaměřená na volbu specializace (návrh čipů, technologie, výkonová elektronika).

Uchazeči mohou doložit výsledky bakalářské práce, odborné stáže nebo účast na soutěžích. Program je vyučován v češtině s možností volitelných přednášek v angličtině.
    `,
    category: "academic",
    categoryLabel: "FAKULTA // PŘIJÍMACÍ ŘÍZENÍ",
    imageUrl: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Návrh integrovaného obvodu na monitoru během výuky",
    publishedAt: "06. 10. 2026",
    readTimeMinutes: 3,
    author: {
      name: "Ing. Tomáš Horák, Ph.D.",
      title: "Odborný asistent",
      department: "ČVUT FEL – Katedra mikroelektroniky",
    },
    tags: ["Přijímací řízení", "EIS", "Studium", "Magisterský program"],
    audience: ["students"],
    en: {
      title: "Admissions Open for the EIS Master's Programme for Academic Year 2027/2028",
      perex: "The Electronics and Integrated Systems programme is accepting applications until April 30. The admission process includes an interview focused on electronics fundamentals and motivation for microelectronics.",
      content: `
The Faculty of Electrical Engineering has officially opened **admissions** for the follow-up Master's programme Electronics and Integrated Systems (EIS) for the 2027/2028 academic year.

Admission stages:
1. **Online Application:** Submitted through the university study system by April 30, 2027.
2. **Technical Interview:** Covering circuit theory, digital design, and semiconductor device fundamentals.
3. **Specialization Discussion:** Focused on the applicant's preferred track (IC design, semiconductor technology, or power electronics).

Applicants may present their Bachelor's thesis results, industry internships, or engineering competition achievements.
      `,
      categoryLabel: "FACULTY // ADMISSIONS",
      imageAlt: "Integrated circuit layout on a monitor during a class session",
      authorTitle: "Assistant Professor",
      authorDepartment: "CTU FEL – Department of Microelectronics",
      tags: ["Admissions", "EIS", "Study", "Master's Programme"],
    },
  },
  {
    id: "art-11",
    slug: "letni-staze-v-cistych-prostorech-kn-e",
    title: "Letní studentské stáže v čistých prostorech KN:E: dvanáct míst pro bakaláře i magistráty",
    perex: "Katedra mikroelektroniky vypisuje placené letní stáže v laboratořích na Karlově náměstí. Studenti se zapojí do reálných projektů výroby senzorů a měření polovodičových struktur.",
    content: `
Katedra mikroelektroniky vypisuje **dvanáct placených stáží** pro letní období v čistých prostorech KN:E a v návrhových laboratořích.

Náplň stáží:
- Asistence při fotolitografii a leptání křemíkových struktur.
- Měření elektrických parametrů SiC a GaN součástek.
- Příprava testovacích struktur pro studentské projekty.
- Práce s EDA nástroji Cadence a Synopsys na reálných blocích obvodu.

Stáže jsou vhodné pro studenty od třetího ročníku bakalářského studia. Odborný dohled zajišťují zaměstnanci katedry, výstupem je odborná zpráva nebo rozšířená semestrální práce.
    `,
    category: "academic",
    categoryLabel: "FAKULTA // STÁŽE",
    imageUrl: "https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Pracoviště s elektronikou připravené pro studentské stáže",
    publishedAt: "02. 10. 2026",
    readTimeMinutes: 3,
    author: {
      name: "Ing. Martin Daněk, Ph.D.",
      title: "Výzkumník",
      department: "ČVUT FEL – Program Elektronika a komunikace",
    },
    tags: ["Stáže", "Čisté prostory", "Bakalářské studium", "Laboratoře"],
    audience: ["students", "researchers"],
    en: {
      title: "Summer Student Internships in KN:E Cleanrooms: Twelve Positions for Bachelor's and Master's Students",
      perex: "The Department of Microelectronics is offering paid summer internships at its Charles Square laboratories. Students will join active sensor fabrication and semiconductor characterization projects.",
      content: `
The Department of Microelectronics has opened **twelve paid summer internship positions** in the KN:E cleanrooms and IC design laboratories.

Internship responsibilities:
- Assisting with photolithography and etching of silicon structures.
- Electrical characterization of SiC and GaN power devices.
- Preparing test structures and wafer samples for student projects.
- Working with Cadence and Synopsys EDA tools on real circuit blocks.

Internships are suited for students from their third year of Bachelor's studies onward. Faculty researchers provide direct mentorship, and the output can be credited toward a thesis or semester project.
      `,
      categoryLabel: "FACULTY // INTERNSHIPS",
      imageAlt: "Electronics measurement workstation prepared for student interns",
      authorTitle: "Senior Researcher",
      authorDepartment: "CTU FEL – Electronics and Communications Programme",
      tags: ["Internships", "Cleanrooms", "Bachelor's Study", "Laboratories"],
    },
  },
  {
    id: "art-12",
    slug: "ieee-ispsd-2027-call-for-papers-praha",
    title: "FEL ČVUT hostí konferenci IEEE ISPSD 2027: call for papers do 15. ledna",
    perex: "Praha se stane dějištěm přední světové konference o výkonových polovodičových součástkách. Fakulta zajišťuje organizaci a vyzývá výzkumné týmy k zaslání abstraktů.",
    content: `
Fakulta elektrotechnická ČVUT byla vybrána jako hostitel mezinárodní konference **IEEE ISPSD 2027** (International Symposium on Power Semiconductor Devices and ICs), která se zaměřuje na výkonové polovodičové součástky a integrované obvody.

Klíčové termíny:
- Zaslání abstraktů: **do 15. ledna 2027**.
- Oznámení přijetí: březen 2027.
- Vlastní konference: červen 2027 v Praze.

Konference pokrývá SiC a GaN struktury, návrh výkonových integrovaných obvodů, spolehlivost a tepelné management. Studenti FEL ČVUT se mohou zapojit jako dobrovolníci a organizační tým.
    `,
    category: "academic",
    categoryLabel: "FAKULTA // KONFERENCE",
    publishedAt: "30. 09. 2026",
    readTimeMinutes: 3,
    author: {
      name: "prof. Ing. Jiří Vobecký, CSc.",
      title: "Vedoucí Katedry mikroelektroniky",
      department: "ČVUT FEL – Katedra mikroelektroniky",
    },
    tags: ["Konference", "IEEE ISPSD", "Power Devices", "Výzkum"],
    audience: ["researchers", "partners", "media"],
    en: {
      title: "CTU FEL Hosts IEEE ISPSD 2027 Conference in Prague: Call for Papers Open Until January 15",
      perex: "Prague will host the premier global conference on power semiconductor devices and integrated circuits. The faculty is leading the organization and invites research teams to submit abstracts.",
      content: `
The Faculty of Electrical Engineering at CTU has been selected to host **IEEE ISPSD 2027** (International Symposium on Power Semiconductor Devices and ICs), the flagship global conference dedicated to power semiconductor devices and integrated circuits.

Key dates:
- Abstract submission deadline: **January 15, 2027**.
- Notification of acceptance: March 2027.
- Conference dates: June 2027 in Prague.

The symposium covers SiC and GaN devices, smart power ICs, device reliability, and advanced thermal management. CTU FEL students are invited to join the organizing and volunteer teams.
      `,
      categoryLabel: "FACULTY // CONFERENCE",
      authorTitle: "Head of the Department of Microelectronics",
      authorDepartment: "CTU FEL – Department of Microelectronics",
      tags: ["Conference", "IEEE ISPSD", "Power Devices", "Research"],
    },
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

/* ------------------------------------------------------------------ */
/* Rozšířené entity portálu podle drátového modelu (PLAN-ROZSIRENI.md)  */
/* ------------------------------------------------------------------ */

export const MOCK_EVENTS: PortalEvent[] = [
  {
    id: "event-1",
    slug: "den-otevrenych-dveri-fel-listopad-2026",
    type: "event",
    title: "Den otevřených dveří FEL: Čisté prostory a měřicí komory",
    perex: "Exkurze do zázemí Katedry mikroelektroniky, ukázky litografie a měření na waferové úrovni. Seznámení s programem Elektronika a komunikace.",
    location: "FEL ČVUT, Karlovo náměstí 13, Praha 2",
    startsAt: "2026-11-06",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Studenti v čistých prostorách při exkurzi",
    audience: ["students", "public"],
    registrationUrl: "https://ek.fel.cvut.cz/",
    en: {
      title: "FEL Open House: Cleanrooms and Measurement Chambers",
      perex: "A tour of the Department of Microelectronics facilities, lithography demos and wafer-level measurements. Introduction to the Electronics and Communications programme.",
      location: "CTU FEL, Karlovo náměstí 13, Prague 2",
      imageAlt: "Students touring the cleanroom facilities",
    },
  },
  {
    id: "event-2",
    slug: "konference-ceska-polovodicova-strategie-2026",
    type: "conference",
    title: "Konference Česká polovodičová strategie 2026",
    perex: "Výroční konference k naplňování Národní polovodičové strategie: investice, vzdělávání a propojení průmyslu s akademií. Pořádá FEL ČVUT společně s MPO.",
    location: "Bethlehem Chapel, Betlémské náměstí, Praha 1",
    startsAt: "2026-11-19",
    endsAt: "2026-11-20",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Konferenční sál s publikem",
    audience: ["researchers", "partners", "media"],
    registrationUrl: "https://ek.fel.cvut.cz/",
    en: {
      title: "Czech Semiconductor Strategy 2026 Conference",
      perex: "Annual conference on delivering the National Semiconductor Strategy: investment, education and industry–academia collaboration. Organised by CTU FEL together with the Ministry of Industry and Trade.",
      location: "Bethlehem Chapel, Betlémské náměstí, Prague 1",
      imageAlt: "Conference hall with audience",
    },
  },
  {
    id: "event-3",
    slug: "letni-skola-navrhu-cipu-2027",
    type: "summer-school",
    title: "Letní škola návrhu čipů 2027",
    perex: "Týdenní intenzivní kurz návrhu integrovaných obvodů: od RTL kódu v SystemVerilogu přes syntézu až po fyzický layout v Cadence Virtuoso.",
    location: "FEL ČVUT, Dejvice, Praha 6",
    startsAt: "2027-07-05",
    endsAt: "2027-07-09",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Křemíkový wafer na podložce",
    audience: ["students"],
    registrationUrl: "https://ek.fel.cvut.cz/",
    en: {
      title: "Chip Design Summer School 2027",
      perex: "A week-long intensive IC design course: from SystemVerilog RTL through synthesis to physical layout in Cadence Virtuoso.",
      location: "CTU FEL, Dejvice, Prague 6",
      imageAlt: "Silicon wafer on a chuck",
    },
  },
  {
    id: "event-4",
    slug: "prednaska-onsemi-spolehlivost-sic-mosfet",
    type: "event",
    title: "Přednáška inženýrů onsemi: Spolehlivost SiC MOSFETů pro automotive",
    perex: "Praktická přednáška s ukázkami reálných měření spolehlivosti výkonových SiC tranzistorů přímo z provozu v Rožnově pod Radhoštěm.",
    location: "Zengerova posluchárna KN:E-107, Karlovo náměstí",
    startsAt: "2026-12-03",
    audience: ["students", "researchers"],
    en: {
      title: "onsemi Engineers Lecture: SiC MOSFET Reliability for Automotive",
      perex: "A hands-on lecture with real reliability measurements of power SiC transistors straight from the Rožnov fab.",
      location: "Zenger Lecture Hall KN:E-107, Charles Square",
    },
  },
  {
    id: "event-5",
    slug: "workshop-gaN-vykonove-menice-2027",
    type: "event",
    title: "Workshop: GaN výkonové měniče v praxi",
    perex: "Celodenní praktický workshop návrhu výkonových měničů s GaN tranzistory – měření přepínacích ztrát a EMC v laboratoři výkonové elektroniky.",
    location: "Laboratoř výkonové elektroniky, FEL ČVUT Dejvice",
    startsAt: "2027-02-12",
    audience: ["researchers", "partners"],
    registrationUrl: "https://ek.fel.cvut.cz/",
    en: {
      title: "Workshop: GaN Power Converters in Practice",
      perex: "A full-day hands-on workshop on designing GaN power converters – switching loss and EMC measurements in the power electronics lab.",
      location: "Power Electronics Laboratory, CTU FEL Dejvice",
    },
  },
  {
    id: "event-6",
    slug: "letni-skola-polovodicovych-technologii-2027",
    type: "summer-school",
    title: "Letní škola polovodičových technologií 2027",
    perex: "Úvod do technologií výroby čipů: pěstování krystalů, litografie, leptání a difúze. Praktické bloky v čistých prostorách KN:E.",
    location: "Čisté prostory KN:E, Karlovo náměstí, Praha 2",
    startsAt: "2027-08-23",
    endsAt: "2027-08-27",
    audience: ["students", "public"],
    registrationUrl: "https://ek.fel.cvut.cz/",
    en: {
      title: "Semiconductor Technology Summer School 2027",
      perex: "An introduction to chip manufacturing: crystal growth, lithography, etching and diffusion. Hands-on sessions in the KN:E cleanrooms.",
      location: "KN:E Cleanrooms, Charles Square, Prague 2",
    },
  },
];

export const MOCK_PROJECTS: Project[] = [
  {
    id: "proj-1",
    slug: "sic-vykonove-moduly-pro-trakci",
    title: "SiC výkonové moduly pro trakční měniče",
    description: `Výzkum a vývoj výkonových modulů na bázi karbidu křemíku pro trakční měniče elektromobilů a železniční trakce. Projekt řeší tepelné managementy modulů, spolehlivost pájených a sinterních spojů a pokročilé metody měření ztrát v reálném provozu.

### Cíle projektu
- Návrh a ověření modulu 1200 V / 400 A s nízkou parazitní indukčností.
- Zrychlené životní testy (power cycling) a modelování degradace.
- Přenos know-how do výuky magisterského programu EIS.`,
    status: "running",
    unit: "kme",
    contact: { name: "prof. Ing. Jiří Vobecký, CSc.", email: "vobecky@fel.cvut.cz", department: "ČVUT FEL – Katedra mikroelektroniky" },
    outputs: [
      "Vobecký, J. et al.: Thermal Design of SiC Power Modules for Traction Applications, IEEE Transactions on Power Electronics, 2026.",
      "Vzorek modulu 1200 V / 400 A pro laboratorní ověření.",
    ],
    imageUrl: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Výkonový polovodičový modul na chladiči",
    startsAt: "2025-01-01",
    endsAt: "2027-12-31",
    en: {
      title: "SiC Power Modules for Traction Converters",
      description: `Research and development of silicon carbide power modules for traction converters in electric vehicles and rail traction. The project addresses module thermal management, reliability of soldered and sintered joints, and advanced loss measurement methods under real operating conditions.

### Project Goals
- Design and verification of a 1200 V / 400 A module with low parasitic inductance.
- Accelerated lifetime testing (power cycling) and degradation modelling.
- Transfer of know-how into the EIS Master's programme.`,
      outputs: [
        "Vobecký, J. et al.: Thermal Design of SiC Power Modules for Traction Applications, IEEE Transactions on Power Electronics, 2026.",
        "1200 V / 400 A module sample for laboratory verification.",
      ],
      imageAlt: "Power semiconductor module on a heatsink",
    },
  },
  {
    id: "proj-2",
    slug: "spolecna-laborator-onsemi-fel",
    title: "Společná výzkumná laboratoř onsemi – FEL ČVUT",
    description: `Vznik společné laboratoře výkonových polovodičových struktur na Karlově náměstí v rámci strategického partnerství s onsemi. Laboratoř umožní studentům i výzkumníkům pracovat na reálných výrobních procesech SiC technologie.

Laboratoř bude sloužit zároveň jako výukové zázemí pro předměty polovodičových technologií a jako základna pro společné diplomové práce a stáže.`,
    status: "preparation",
    unit: "kme",
    contact: { name: "Ing. Tomáš Horák, Ph.D.", email: "horak@fel.cvut.cz", department: "ČVUT FEL – Katedra mikroelektroniky" },
    outputs: ["Memorandum o spolupráci podepsáno 10/2026.", "Projektová dokumentace laboratoře KN:E-3."],
    imageUrl: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Vybavení výzkumné laboratoře",
    startsAt: "2026-10-01",
    en: {
      title: "Joint onsemi – CTU FEL Research Laboratory",
      description: `Establishment of a joint power semiconductor structures laboratory at Charles Square within the strategic partnership with onsemi. The lab will let students and researchers work on real SiC manufacturing processes.

The lab will also serve as a teaching facility for semiconductor technology courses and as a base for joint theses and internships.`,
      outputs: ["Memorandum of cooperation signed 10/2026.", "Design documentation of the KN:E-3 laboratory."],
      imageAlt: "Research laboratory equipment",
    },
  },
  {
    id: "proj-3",
    slug: "kvantove-fotonické-cipy-fjfi",
    title: "Kvantové fotonické čipy pro zabezpečenou komunikaci",
    description: `Mezifakultní projekt FEL a FJFI zaměřený na návrh integrovaných fotonických obvodů pro kvantové distribuce klíčů (QKD). Řeší se návrh vlnovodů, jednofotonových detektorů a integrace na platformě SiN.

Projekt navazuje na evropskou iniciativu EuroQCI a připravuje český uzel kvantové komunikační infrastruktury.`,
    status: "running",
    unit: "fjfi",
    contact: { name: "doc. Ing. Lenka Novotná, Ph.D.", email: "novotna@fjfi.cvut.cz", department: "ČVUT FJFI – Katedra fyziky" },
    outputs: ["Prototyp fotonického čipu SiN pro QKD.", "2 publikace v Optics Express (2025, 2026)."],
    startsAt: "2024-09-01",
    endsAt: "2026-08-31",
    en: {
      title: "Quantum Photonic Chips for Secure Communication",
      description: `A joint project of FEL and FNSPE focused on the design of integrated photonic circuits for quantum key distribution (QKD). The work covers waveguide design, single-photon detectors and integration on the SiN platform.

The project follows the EuroQCI initiative and prepares the Czech node of the quantum communication infrastructure.`,
      outputs: ["SiN photonic chip prototype for QKD.", "2 publications in Optics Express (2025, 2026)."],
    },
  },
  {
    id: "proj-4",
    slug: "senzory-pro-industry-40",
    title: "Vestavné senzorové uzly pro Industry 4.0",
    description: `Vývoj nízkopříkonových senzorických uzlů s vlastním ASIC front-endem pro monitorování strojů v průmyslových provozech. Uzel kombinuje měření vibrací, teploty a proudu s bezdrátovým přenosem (BLE / IO-Link).

Projekt je řešen ve spolupráci s průmyslovými partnery a výsledky jsou ověřovány v reálném provozu.`,
    status: "completed",
    unit: "fel",
    contact: { name: "Ing. Petr Malý, Ph.D.", email: "maly@fel.cvut.cz", department: "ČVUT FEL – Katedra mikroelektroniky" },
    outputs: ["Funkční vzorek senzorického uzlu (3. revize).", "3 diplomové práce obhájené nad tématem projektu."],
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Deska plošného spoje se senzorickým uzlem",
    startsAt: "2023-02-01",
    endsAt: "2025-12-31",
    en: {
      title: "Embedded Sensor Nodes for Industry 4.0",
      description: `Development of low-power sensor nodes with a custom ASIC front-end for machine monitoring in industrial plants. The node combines vibration, temperature and current sensing with wireless transmission (BLE / IO-Link).

The project was carried out with industrial partners and validated in a real production environment.`,
      outputs: ["Working sensor node sample (3rd revision).", "3 Master's theses defended on project topics."],
      imageAlt: "PCB with the sensor node",
    },
  },
  {
    id: "proj-5",
    slug: "diamantove-detektory-fd",
    title: "Diamantové detektory ionizujícího záření",
    description: `Projekt Fakulty dopravní a FEL zaměřený na detektory z chemicky vytvářeného (CVD) diamantu pro měření ionizujícího záření v náročných prostředích – od jaderných zařízení po kosmické aplikace.

Řeší se příprava elektrod, nábojový transport a čtecí elektronika s nízkým šumem.`,
    status: "running",
    unit: "fd",
    contact: { name: "Ing. Jana Křížová, Ph.D.", email: "krizova@fd.cvut.cz", department: "ČVUT FD – Ústav bezpečnosti" },
    outputs: ["Detektor s rozlišením < 1 % pro alfa spektroskopii.", "Společná publikace ve Journal of Instrumentation, 2026."],
    startsAt: "2025-06-01",
    endsAt: "2028-05-31",
    en: {
      title: "Diamond Detectors of Ionizing Radiation",
      description: `A project of the Faculty of Transportation Sciences and FEL focused on CVD diamond detectors for ionizing radiation measurement in demanding environments – from nuclear facilities to space applications.

The work covers electrode preparation, charge transport and low-noise readout electronics.`,
      outputs: ["Detector with < 1 % resolution for alpha spectroscopy.", "Joint publication in Journal of Instrumentation, 2026."],
    },
  },
  {
    id: "proj-6",
    slug: "eda-flow-pro-studenty-oss",
    title: "Otevřené EDA flow pro výuku návrhu čipů",
    description: `Projekt připravuje kompletní open-source návrhové flow (Yosys, OpenROAD, Magic, SKY130 PDK) pro výuku návrhu integrovaných obvodů. Cílem je umožnit studentům navrhnout a odeslat k výrobě vlastní čip bez komerčních licencí.

Součástí je sada laboratorních zadání a předpřipravených šablon pro rychlý start.`,
    status: "preparation",
    unit: "external",
    contact: { name: "Ing. Martin Svoboda", email: "svoboda@fel.cvut.cz", department: "ČVUT FEL – Katedra mikroelektroniky" },
    outputs: ["Repozitář laboratorních zadání na GitLabu FEL.", "Pilotní běh v předmětu Návrh integrovaných obvodů (ZS 2027)."],
    startsAt: "2026-09-01",
    en: {
      title: "Open EDA Flow for Chip Design Education",
      description: `This project prepares a complete open-source design flow (Yosys, OpenROAD, Magic, SKY130 PDK) for teaching integrated circuit design. The goal is to let students design and tape out their own chip without commercial licences.

It includes a set of lab assignments and ready-made templates for a quick start.`,
      outputs: ["Lab assignment repository on the FEL GitLab.", "Pilot run in the IC Design course (winter 2027)."],
    },
  },
];

export const MOCK_PROJECT_CALLS: ProjectCall[] = [
  {
    id: "call-1",
    slug: "vyzva-studentske-granty-polovodice-2027",
    title: "Studentské granty Polovodiče 2027",
    description: `Výzva pro studenty bakalářského a magisterského studia k podání vlastních výzkumných projektů v oblasti elektroniky, mikroelektroniky a polovodičových materiálů. Podpořené projekty získají finanční příspěvek a zázemí laboratoří Katedry mikroelektroniky.`,
    audience: ["students"],
    conditions: [
      "Student Bc. nebo Mgr. studia na ČVUT (jakékoliv fakulty).",
      "Projekt vedený akademickým pracovníkem FEL.",
      "Maximální rozpočet 80 000 Kč na projekt.",
      "Prezentace výsledků na studentské konferenci.",
    ],
    deadline: "2026-12-15",
    contact: { name: "Ing. Tomáš Horák, Ph.D.", email: "horak@fel.cvut.cz", department: "ČVUT FEL – Katedra mikroelektroniky" },
    unit: "fel",
    en: {
      title: "Semiconductors Student Grants 2027",
      description: `A call for Bachelor's and Master's students to submit their own research projects in electronics, microelectronics and semiconductor materials. Supported projects receive funding and access to the Department of Microelectronics laboratories.`,
      conditions: [
        "Bachelor's or Master's student at any CTU faculty.",
        "Project supervised by a FEL academic staff member.",
        "Maximum budget of CZK 80,000 per project.",
        "Results presented at the student conference.",
      ],
    },
  },
  {
    id: "call-2",
    slug: "vyzva-spoluprace-s-prumyslem-staze",
    title: "Stáže v průmyslových partnerech 2027",
    description: `Program placených stáží u průmyslových partnerů portálu (onsemi, STMicroelectronics, ASML) pro studenty magisterského studia. Stáž trvá 3–6 měsíců a může navázat na diplomovou práci.`,
    audience: ["students", "researchers"],
    conditions: [
      "Student Mgr. studia programu EK nebo EIS.",
      "Průměr známek do 2,0.",
      "Motivační dopis a doporučení vedoucího katedry.",
    ],
    deadline: "2027-01-31",
    contact: { name: "Ing. Petra Svobodová", email: "svobodova@fel.cvut.cz", department: "ČVUT FEL – Oddělení vnějších vztahů" },
    unit: "kme",
    en: {
      title: "Industry Partner Internships 2027",
      description: `A paid internship programme with the portal's industrial partners (onsemi, STMicroelectronics, ASML) for Master's students. The internship lasts 3–6 months and can lead into a Master's thesis.`,
      conditions: [
        "Master's student in the EK or EIS programme.",
        "Grade average up to 2.0.",
        "Motivation letter and a recommendation from the department head.",
      ],
    },
  },
  {
    id: "call-3",
    slug: "vyzva-spolecne-projekty-fel-prumysl-2027",
    title: "Společné výzkumné projekty FEL – průmysl 2027",
    description: `Výzva pro výzkumné týmy a firmy k podávání návrhů společných aplikovaných projektů v oblasti polovodičů, výkonové elektroniky a vestavných systémů. Výzva je spolufinancována z programu podpory aplikovaného výzkumu.`,
    audience: ["researchers", "partners"],
    conditions: [
      "Konzorcium minimálně jedné fakulty ČVUT a jednoho podniku.",
      "Podíl aplikovaného výstupu (prototyp, validace v provozu).",
      "Trvání projektu 12–36 měsíců.",
    ],
    deadline: "2027-03-15",
    contact: { name: "prof. Ing. Jiří Vobecký, CSc.", email: "vobecky@fel.cvut.cz", department: "ČVUT FEL – Katedra mikroelektroniky" },
    unit: "external",
    en: {
      title: "Joint FEL – Industry Research Projects 2027",
      description: `A call for research teams and companies to submit joint applied research proposals in semiconductors, power electronics and embedded systems. The call is co-funded from the applied research support programme.`,
      conditions: [
        "A consortium of at least one CTU faculty and one company.",
        "An applied output (prototype, validation in operation).",
        "Project duration of 12–36 months.",
      ],
    },
  },
];

export const MOCK_PROFILES: Profile[] = [
  {
    id: "prof-1",
    slug: "jiri-vobecky",
    name: "prof. Ing. Jiří Vobecký, CSc.",
    title: "Vedoucí Katedry mikroelektroniky a průkopník výkonových polovodičů",
    content: `Profesor Jiří Vobecký působí na Katedře mikroelektroniky FEL ČVUT více než třicet let. Zabývá se fyzikou, návrhem a spolehlivostí výkonových polovodičových součástí – od diod a tyristorů po moderní SiC MOSFETy.

Pod jeho vedením vznikla řada spoluprací s evropskými výrobci polovodičů a katedra se stala uznávaným centrem výzkumu výkonových struktur. Je autorem více než stovky odborných publikací a několika patentů.

### Role na portálu
Jako garant obsahu dohlíží na odbornou správnost technologických analýz a zastřešuje strategická témata národní polovodičové politiky.`,
    publishedAt: "20. 09. 2026",
    photoUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
    photoAlt: "Portrét profesora v laboratoři",
    en: {
      title: "Head of the Department of Microelectronics and Power Semiconductor Pioneer",
      content: `Professor Jiří Vobecký has served at the Department of Microelectronics at CTU FEL for over thirty years. He focuses on the physics, design and reliability of power semiconductor devices – from diodes and thyristors to modern SiC MOSFETs.

Under his leadership, the department has built numerous collaborations with European semiconductor manufacturers and become a recognised centre of power device research. He has authored over a hundred scientific publications and several patents.

### Role on the Portal
As content guarantor he oversees the technical accuracy of technology analyses and covers strategic topics of national semiconductor policy.`,
      photoAlt: "Portrait of the professor in the laboratory",
    },
  },
  {
    id: "prof-2",
    slug: "tomas-horak",
    name: "Ing. Tomáš Horák, Ph.D.",
    title: "Odborný asistent a vedoucí výuky návrhu ASIC",
    content: `Tomáš Horák vede na Katedře mikroelektroniky laboratorní výuku návrhu zákaznických integrovaných obvodů. Studentům zprostředkovává kompletní návrhové flow od RTL kódu po fyzický layout v průmyslových nástrojích Cadence a Synopsys.

Ve výzkumu se věnuje nízkopříkonovým digitálním architekturám a návrhu pro radiačně odolné aplikace.`,
    publishedAt: "27. 09. 2026",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    photoAlt: "Portrét odborného asistenta",
    en: {
      title: "Assistant Professor and Head of ASIC Design Education",
      content: `Tomáš Horák leads the hands-on laboratory courses in custom integrated circuit design at the Department of Microelectronics. He guides students through the complete design flow from RTL code to physical layout in industrial Cadence and Synopsys tools.

His research focuses on low-power digital architectures and design for radiation-hardened applications.`,
      photoAlt: "Portrait of the assistant professor",
    },
  },
  {
    id: "prof-3",
    slug: "lenka-novotna",
    name: "doc. Ing. Lenka Novotná, Ph.D.",
    title: "Vedoucí výzkumu kvantových fotonických čipů",
    content: `Docentka Lenka Novotná působí na Fakultě jaderné a fyzikálně inženýrské ČVUT a vede mezifakultní tým kvantové fotoniky. Její skupina navrhuje integrované fotonické obvody pro kvantovou distribuci klíčů na platformě nitridu křemíku.

Je členkou pracovní skupiny evropské iniciativy EuroQCI a odbornou garantkou několika evropských projektů.`,
    publishedAt: "04. 10. 2026",
    en: {
      title: "Quantum Photonic Chip Research Lead",
      content: `Associate Professor Lenka Novotná works at the Faculty of Nuclear Sciences and Physical Engineering at CTU and leads the cross-faculty quantum photonics team. Her group designs integrated photonic circuits for quantum key distribution on the silicon nitride platform.

She is a member of the EuroQCI initiative working group and the scientific guarantor of several European projects.`,
    },
  },
  {
    id: "prof-4",
    slug: "petra-svobodova",
    name: "Ing. Petra Svobodová",
    title: "Koordinátorka spolupráce s průmyslem a stáží",
    content: `Petra Svobodová řídí na FEL ČVUT program spolupráce s průmyslovými partnery – od smluvního zajištění společných laboratoří přes diplomové práce zadávané firmami až po placené studentské stáže.

Pro studenty je prvním kontaktem při hledání stáže či tématu závěrečné práce v polovodičových firmách.`,
    publishedAt: "11. 10. 2026",
    photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    photoAlt: "Portrét koordinátorky",
    en: {
      title: "Industry Cooperation and Internship Coordinator",
      content: `Petra Svobodová manages the industry cooperation programme at CTU FEL – from contracting joint laboratories through company-assigned theses to paid student internships.

She is the first point of contact for students looking for an internship or a thesis topic in semiconductor companies.`,
      photoAlt: "Portrait of the coordinator",
    },
  },
];

export const MOCK_PARTNERS: Partner[] = [
  { id: "partner-1", name: "onsemi", url: "https://www.onsemi.com/" },
  { id: "partner-2", name: "STMicroelectronics", url: "https://www.st.com/" },
  { id: "partner-3", name: "ASML", url: "https://www.asml.com/" },
  { id: "partner-4", name: "Bosch", url: "https://www.bosch.com/" },
  { id: "partner-5", name: "Škoda Auto", url: "https://www.skoda-auto.cz/" },
  { id: "partner-6", name: "Codasip", url: "https://codasip.com/" },
];

export const MOCK_OPPORTUNITIES: Opportunity[] = [
  {
    id: "opp-1",
    title: "Stáže v onsemi Rožnov pod Radhoštěm",
    description: "Placené letní stáže v design centru i výrobě SiC čipů. Náplň lze propojit s diplomovou prací.",
    url: "https://ek.fel.cvut.cz/",
    en: {
      title: "Internships at onsemi Rožnov pod Radhoštěm",
      description: "Paid summer internships in the SiC chip design centre and fab. Can be combined with a Master's thesis.",
    },
  },
  {
    id: "opp-2",
    title: "Stipendia programu EIS",
    description: "Motivační stipendia pro studenty magisterského programu Elektronika a integrované systémy od průmyslových partnerů.",
    url: "https://ek.fel.cvut.cz/",
    en: {
      title: "EIS Programme Scholarships",
      description: "Motivation scholarships for students of the Electronics and Integrated Systems Master's programme, funded by industrial partners.",
    },
  },
  {
    id: "opp-3",
    title: "Semináře Katedry mikroelektroniky",
    description: "Pravidelné odborné semináře s hosty z průmyslu i akademie. Otevřené studentům i veřejnosti.",
    url: "https://ek.fel.cvut.cz/",
    en: {
      title: "Department of Microelectronics Seminars",
      description: "Regular expert seminars with guests from industry and academia. Open to students and the public.",
    },
  },
  {
    id: "opp-4",
    title: "Diplomové práce zadané firmami",
    description: "Témata závěrečných prací přímo od polovodičových firem – reálné problémy, data i mentoring z praxe.",
    url: "https://ek.fel.cvut.cz/",
    en: {
      title: "Company-Assigned Theses",
      description: "Thesis topics directly from semiconductor companies – real problems, real data and industry mentoring.",
    },
  },
];

export const MOCK_FAQ: FaqItem[] = [
  {
    id: "faq-1",
    question: "Jak se přihlásím do programu Elektronika a komunikace?",
    answer: "Přihlášku podáváte elektronicky přes přihlašovací portál ČVUT do konce března. Program EK nepřijímá na základě talentových zkoušek – rozhoduje výsledek přijímacího řízení z matematiky a fyziky nebo průměr známek.",
    en: {
      question: "How do I apply for the Electronics and Communications programme?",
      answer: "You apply online through the CTU admission portal by the end of March. There are no talent exams – admission is based on the mathematics and physics entrance exam or your grade average.",
    },
  },
  {
    id: "faq-2",
    question: "Můžu se jako student účastnit výzkumu už v bakalářském studiu?",
    answer: "Ano. Katedra mikroelektroniky nabízí studentské granty, zapojení do výzkumných týmů i práci v čistých prostorách od druhého ročníku. Kontaktujte vedoucího příslušné laboratoře nebo koordinátora stáží.",
    en: {
      question: "Can I take part in research as a Bachelor's student?",
      answer: "Yes. The Department of Microelectronics offers student grants, research team placements and cleanroom work from the second year. Contact the relevant lab head or the internship coordinator.",
    },
  },
  {
    id: "faq-3",
    question: "Jsou letní školy zpoplatněné?",
    answer: "Letní školy pořádané fakultou jsou pro studenty ČVUT bezplatné. Pro externí účastníky je účastnický poplatek uveden vždy u konkrétní akce včetně informace o stipendiích.",
    en: {
      question: "Are the summer schools paid?",
      answer: "Faculty-organised summer schools are free for CTU students. External participants pay a fee listed with each event, including scholarship information.",
    },
  },
  {
    id: "faq-4",
    question: "Kde najdu témata diplomových prací z praxe?",
    answer: "Aktuální témata zadaná průmyslovými partnery jsou v sekci Vzdělávání → Příležitosti a na nástěnkách katedry. Téma si lze domluvit i individuálně s koordinátorkou spolupráce s průmyslem.",
    en: {
      question: "Where can I find industry thesis topics?",
      answer: "Current topics assigned by industrial partners are listed under Education → Opportunities and on the department notice boards. A topic can also be arranged individually with the industry cooperation coordinator.",
    },
  },
  {
    id: "faq-5",
    question: "Mohu studovat program v angličtině?",
    answer: "Ano, magisterský program Electronics and Integrated Systems (EIS) je vyučován plně v angličtině a je otevřený i zahraničním studentům. Bakalářský program probíhá primárně v češtině.",
    en: {
      question: "Can I study the programme in English?",
      answer: "Yes, the Electronics and Integrated Systems (EIS) Master's programme is taught fully in English and is open to international students. The Bachelor's programme is taught primarily in Czech.",
    },
  },
];
