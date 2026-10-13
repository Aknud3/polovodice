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
