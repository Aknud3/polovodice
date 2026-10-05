# Implementační plán: Informační portál ČVUT FEL (Frontend)

## Context
Cílem projektu je vytvořit moderní, vysoce výkonný informační portál s autentickou vizuální identitou Fakulty elektrotechnické Českého vysokého učení technického v Praze (ČVUT FEL). Tato první fáze řeší kompletní frontend: od detailní extrakce design systému a analýzy 5 univerzitních webů ČVUT FEL přes strukturální a rozměrovou dekonstrukci 5 předních informačních portálů až po produkční implementaci v Next.js (App Router), TypeScriptu a Tailwind CSS s plnou podporou světlého/tmavého režimu, responzivity a interaktivních widgetů. Výsledkem bude funkční portál s redakčním systémem zpráv, živým proudem aktualit, přehledem akademických událostí a studentským rozcestníkem.

---

## 1. Analýza 5 webových stránek ČVUT / FEL (Tematika, barvy a vizuální styl)

Pro dosažení 100% vizuální shody s ekosystémem ČVUT a moderním brandem FEL byly podrobně zanalyzovány následující stránky:

### 1.1 Stránka 1: Hlavní web ČVUT FEL (`https://fel.cvut.cz/cs`)
- **Role v ekosystému:** Vlajková loď fakulty, určující aktuální vizuální směr zavedený v roce 2020+.
- **Vizuální jazyk:** Technologický, čistý, vysoký kontrast, ostré geometrické tvary kombinované s jemnými poloměry zaoblení (4px–6px), technologická mřížka v pozadí.
- **Barevná paleta (extrahované CSS proměnné z produkčního bundlu `styles.*.css`):**
  - **Tmavě modrá / Navy (hlavní podklad a hlavička):** `#080B38` (`--darkBlue`)
  - **Výrazná modrá (interaktivní prvky a tlačítka):** `#3A2AD0` (`--blue`, `--btnBlue`)
  - **Tyrkysová (technologický akcent, hover, kód):** `#44D8EB` (`--turquoise`)
  - **Neonová zelená (akcent, statusy, úspěch):** `#43F6C8` (`--green`)
  - **Fialová (sekundární akcent):** `#6B43F0` (`--violet`)
  - **Šedá pozadí (světlý režim):** `#EFF2F5` (`--bgGray`), světlejší modrošedá `#EBE9FB` (`--bgBlueGray`)
  - **Barvy textu:** Tělo textu `#080B38` (světlý režim) / `#FFFFFF` (tmavý režim), doplňkový text `#516075` (`--blueGray`), popisky a štítky `#6A6D88` (`--gray`)
  - **Tmavý režim (Dark mode tokens):** Pozadí těla `#080B38` / `#24264A`, panely `#1B1F48` (`--newsletterBg`), text `#FFFFFF` / `#C3C4D8`.
- **Typografie:**
  - Primární písmo: `IBM Plex Sans, sans-serif` (řezy 400 Regular, 500 Medium, 600 SemiBold, 700 Bold) s podporou plné české diakritiky.
  - Technické písmo (monospaced): `IBM Plex Mono, monospace` (použito pro kategorie, datumy, čísla, statistiky, štítky a technické tagy).
- **Komponentní specifika:** Tmavá horní navigace, logo ČVUT FEL s modro-bílým kontrastem, karty s tenkým rámečkem (`#E0E3E7`) a odsazením 24px.

### 1.2 Stránka 2: Zpravodajství a aktuality FEL (`https://fel.cvut.cz/cs/aktualne/novinky`)
- **Role v ekosystému:** Primární referenční struktura pro články, zprávy a fakultní tiskové výstupy.
- **Rozvržení:** Filtrační lišta s kategoriemi (Věda, Studium, Lidé, Ocenění), hlavní vybraná zpráva (Hero article) následovaná 3sloupcovou mřížkou zpráv.
- **Anatomie karty zprávy (News Card):**
  - Poměr stran obrázku: 16:9 (`aspect-ratio: 16/9`), objektové krytí `object-fit: cover`.
  - Kategorie: Monospace kapitálky, velikost 11px–12px, barva `#3A2AD0` (světlý) / `#44D8EB` (tmavý), horní mezera 12px.
  - Datum: Monospace šedá (`#6A6D88`), formát `DD. MM. YYYY`, velikost 12px.
  - Titulek: `IBM Plex Sans`, velikost 20px–22px, `font-weight: 600`, řádkování 1.3.
  - Perex: Velikost 15px, barva `#516075`, maximálně 3 řádky (`line-clamp-3`).
  - Interakce: Při najetí myší lehký posun karty nahoru (-4px), stín `0 12px 24px rgba(8,11,56,0.08)`, modrý podtrh titulku.

### 1.3 Stránka 3: Informační servis a úřední deska FEL (`https://fel.cvut.cz/cs/informacni-servis/pro-studujici` a `/informacni-deska`)
- **Role v ekosystému:** Úřední a provozní informace, harmonogram semestru, stipendia, směrnice děkana.
- **Vizuální prvky:**
  - Stavové štítky (Urgentní / Důležité / Standardní) s barevným kódováním: Červená/Oranžová pro blížící se termíny, modrá pro studijní záležitosti, tyrkysová pro stipendia.
  - Tabulkový a seznamový layout s vysokou hustotou informací (dense UI).
  - Tlačítka rychlého stažení dokumentů (PDF, DOCX) s ikonou typu souboru a velikostí v monospace závorce `[PDF, 240 kB]`.
  - Akordeony (FAQ) s jemným oddělovačem 1px border `#E0E3E7`.

### 1.4 Stránka 4: Hlavní rektorátní web ČVUT (`https://www.cvut.cz/`) a grafický manuál ČVUT
- **Role v ekosystému:** Nadřazená institucionální identita ČVUT v Praze.
- **Klíčové barvy a symbolika:**
  - **Oficiální modř ČVUT:** Pantone 300 / HEX `#0065BD` (též používána webová varianta `#0072B9`).
  - **Doplňková modř ČVUT:** Tmavě modrá `#004F8A`.
  - **Lev ČVUT:** Stylizovaný znak dvouocasého českého lva v geometrické vektorové kompozici.
  - **Univerzitní horní lišta (Top Utility Bar):** Výška 36px–40px, podklad `#0065BD` nebo tmavě šedá, odkazy na centrální systémy: *Lidé ČVUT (Usermap)*, *Knihovna ČVUT*, *Informační systém (KOS)*, *Moodle*, *Jazyková mutace (CZ/EN)*.

### 1.5 Stránka 5: Otevřená informatika a Katedra počítačů FEL (`https://oi.fel.cvut.cz/` & `https://cs.fel.cvut.cz/`)
- **Role v ekosystému:** Technicky zaměřené sub-portály studijních programů a kateder FEL.
- **Specifické prvky:**
  - Technický minimalismus: Tmavé sekce, zvýraznění kódu a výzkumných laboratoří (AI Center, Agent Technology Center, Robotics).
  - Karty vyučujících a výzkumníků: Čtvercové portréty, štítky s příslušností k laboratoři, e-mail v monospace fontu.
  - Rychlý rozcestník předmětů a repozitářů (GitLab FEL, CourseWare FEL).

---

## 2. Analýza 5 informačních portálů (Struktura, grid a exaktní rozměry prvků)

Pro návrh informační architektury, typografického měřítka a hierarchie komponent bylo zanalyzováno 5 špičkových zpravodajských a technologických portálů:

### 2.1 Portál 1: ČT24 (`ct24.ceskatelevize.cz`) – Veřejnoprávní zpravodajský portál s vysokou hustotou
- **Grid a šířka kontejneru:** 12sloupcový grid, maximální šířka kontejneru **1320px**, mezera mezi sloupci (gutter) **24px**.
- **Hlavička a navigační zóna:**
  - *Top bar (servisní lišta):* Výška **36px**, písmo 12px, odkazy na sesterské kanály.
  - *Hlavní navigace:* Výška **56px**, fixní/sticky na pozici `top: 0`, z-index 100.
  - *Mimořádná zpráva / Breaking News lišta:* Výška **42px**, podklad sytě červený `#D32F2F` nebo tmavý akcent, pulzující indikátor "ŽIVĚ", text 14px bold, horizontální posuvník.
- **Hero sekce (Otvírák):**
  - Asymetrické rozdělení 8 sloupců (hlavní zpráva, šířka **864px**) ku 4 sloupcům (proud rychlých zpráv, šířka **432px**).
  - Velikost titulku hlavní zprávy: **36px–40px**, `font-weight: 700`, line-height **1.2**.
  - Obrázek hlavní zprávy: šířka 100%, výška **480px** (poměr 16:9).
- **Pravý boční panel rychlých zpráv ("Minuta po minutě"):**
  - Šířka panelu: **400px–432px**.
  - Výška jednotlivé položky: **72px–88px**, padding **12px 16px**.
  - Časový odznak: **12px–13px** monospace bold, šířka časového sloupce 54px.
  - Titulek rychlé zprávy: **14px**, line-height 1.35.

### 2.2 Portál 2: iRozhlas (`irozhlas.cz`) – Typograficky vytříbený analytický portál
- **Grid a šířka kontejneru:** 12sloupcový systém s maximální šířkou **1170px–1200px** (v mobilu 100% s paddingem 16px).
  - 1/12 = 98px, 2/12 = 195px, 3/12 = 293px, 4/12 = 390px, 6/12 = 585px, 8/12 = 780px, 12/12 = 1170px.
- **Čtenářský sloupec detailu článku:**
  - Optimální šířka pro čtení: **680px–720px** (zajišťuje ideálních 65–75 znaků na řádek).
- **Typografická hierarchie (Exaktní velikosti):**
  - `H1` (Hlavní titulek článku): **38px–44px** (desktop) / **28px–32px** (mobil), line-height **1.15**.
  - `Perex` (Úvodní odstavec): **20px–22px**, `font-weight: 500`, line-height **1.45**.
  - `Body text` (Odstavec): **18px**, line-height **1.65** (29.7px), barva `#1A1A1A`.
  - `H2` (Mezititulek): **26px–30px**, horní okraj 40px, dolní okraj 16px.
  - `Metadata & Štítky`: **12px–13px**, `letter-spacing: 0.5px`, uppercase.
- **Komponenta Fakt / Shrnutí (Key takeaway box):**
  - Odsazení: padding **24px**, levý okraj 4px solid akcentní barva, pozadí ztmavené o 4%.

### 2.3 Portál 3: The Verge (`theverge.com`) – High-tech magazín a "Storystream"
- **Rozvržení:** Moderní asymetrický split s vysokým kontrastem a neonovými akcenty.
  - Levá/střední sekce (kurátorovaný feed): 65 % šířky.
  - Pravá sekce ("The Storystream" – živý stream aktualit): 35 % šířky (cca **360px**).
- **Exaktní rozměry prvků:**
  - *Sticky Header:* Výška **64px**, tenká dělící linka 1px (`#24264A`).
  - *Kategorie / Topic pill:* Výška **24px**, padding **3px 10px**, font 11px uppercase bold, zaoblení **2px** (technický vzhled).
  - *Doba čtení / Timestamp:* Monospace 12px, ikona hodin 14x14px.
  - *Feature Card (Velká zpráva):* Výška karty **460px**, textový overlay s lineárním gradientem `linear-gradient(180deg, transparent 0%, rgba(8,11,56,0.92) 80%)`.
  - *Kompaktní karta zprávy:* Horizontální orientace, náhledový čtverec **120x120px** vpravo, text vlevo.

### 2.4 Portál 4: MIT Technology Review (`technologyreview.com`) – Akademicko-technologický portál
- **Zaměření struktury:** Výzkumné články, hloubkové analýzy, profily laboratorních projektů (přesně odpovídá akademickému profilu FEL: AI, robotika, čipy, energetika, telekomunikace).
- **Architektura stránek:**
  - *Sekce Témat (Topic Hubs):* Vodorovný pás štítků s tématy (Umělá inteligence, Kvantové počítače, Polovodiče, Robotika, Bioinženýrství) s výškou **44px**.
  - *Akademická vizitka autora:* Velikost **320px x 110px**, kulatý avatar **48x48px**, akademické tituly, katedra/laboratoř, odkaz na odborné publikace.
  - *Research Abstract Box:* Šířka 100%, rámeček 1px monospace styl, pozadí `#EFF2F5` / `#1B1F48`, zvýrazněná klíčová zjištění bodově.
  - *Metrika dopadu (Impact Metric Widget):* Číslo velikosti **48px bold** s popiskem velikosti 13px (např. "24 patentů", "TOP 3 v robotice").

### 2.5 Portál 5: Seznam Zprávy (`seznamzpravy.cz`) – Rychlý rozcestník a interaktivní widgety
- **Responzivní breakpointy a struktura zobrazení:**
  - Mobil: `< 768px` (1 sloupec, zjednodušená vertikální navigace, karty na celou šířku s paddingem 16px).
  - Tablet: `768px – 1023px` (2 sloupce, odsazení 20px).
  - Desktop: `1024px – 1319px` (hlavní obsah 8 sloupců + pravý widgetový sloupec 4 sloupce).
  - Wide Desktop: `>= 1320px` (max-width **1360px**, plný 12sloupcový grid s bočními maržemi).
- **Widgety a doplňkové moduly portálu:**
  - *Kampusový status bar (Rychlé info):* Widget stavu menzy (otevřeno/zavřeno), stavu studijního oddělení a nejbližší události. Výška **56px–72px**.
  - *Anketní / Hlasovací modul:* Karta šířky **360px**, padding **20px**, výsledek s animovaným progress barem (výška pruhu **8px**, zaoblení 4px).
  - *Podcast / Audio přehrávač:* Plovoucí lišta výšky **60px** s ovládáním přehrávání, časovou osou a jménem epizody (např. fakultní podcast *potkany.cz* / *FEL ČVUT Podcast*).

---

## 3. Informační architektura a rozsah portálu ČVUT FEL

Na základě syntézy identity ČVUT FEL a rozměrové analýzy předních informačních portálů navrhujeme následující strukturu stránek a komponent:

```
┌────────────────────────────────────────────────────────────────────────┐
│ 1. TOP UTILITY BAR (ČVUT central services: KOS, Moodle, Usermap, Menza)│
├────────────────────────────────────────────────────────────────────────┤
│ 2. MAIN NAVBAR (Logo ČVUT FEL, Sekce portálu, Hledání, Theme Switcher) │
├────────────────────────────────────────────────────────────────────────┤
│ 3. BREAKING NEWS / CAMPUS TICKER (Aktuální termíny, výstrahy, živě)    │
├────────────────────────────────────────────────────────────────────────┤
│ 4. HLAVNÍ OBSAHOVÝ GRID (12 sloupců / max-width: 1320px)              │
│  ┌───────────────────────────────────────┬───────────────────────────┐ │
│  │ A. Hlavní obsahový sloupec (8 sl.)    │ B. Boční panel (4 sl.)    │ │
│  │  - Hero Highlight (hlavní zpráva)     │  - Živý proud FEL         │ │
│  │  - Rychlý filtr témat (Pills)         │    (minuta po minutě)     │ │
│  │  - 3sloupcová mřížka zpráv (Grid)     │  - Nadcházející události  │ │
│  │  - Hloubková reportáž (Research story)│  - Servis & Menza widget  │ │
│  │  - Katederní přehled a projekty       │  - Rychlé odkazy FEL      │ │
│  └───────────────────────────────────────┴───────────────────────────┘ │
├────────────────────────────────────────────────────────────────────────┤
│ 5. NEWSLETTER & KAMPUŠNÍ STATISTIKY (Plná šířka, tmavě modré pozadí)   │
├────────────────────────────────────────────────────────────────────────┤
│ 6. INSTITUCIONÁLNÍ PATIČKA (Odkazy na fakulty ČVUT, kontakty, GDPR)    │
└────────────────────────────────────────────────────────────────────────┘
```

### Stránky portálu v první fázi:
1. **Domovská stránka (`/`)**: Hlavní rozcestník, hero zpráva, kategorie, živý proud, kalendář událostí, stav služeb kampusu Dejvice/Karlovo náměstí.
2. **Archiv a výpis zpráv (`/zpravy`)**: Filtrování dle 6 témat (Věda & AI, Studium & Život, Polovodiče & Hardware, Energetika, Vesmír & Satelity, Fakulta), fulltextové hledání s okamžitou odezvou, řazení dle data/popularity.
3. **Detail článku (`/zpravy/[slug]`)**: Zpětná navigace (breadcrumbs), autor s fakultním titulem, odhad doby čtení, interaktivní obsah článku, citace v FEL designu, obrazová galerie, související témata.
4. **Kalendář událostí & Harmonogram (`/udalosti`)**: Přednášky, obhajoby, dny otevřených dveří, hackathony, možnost exportu do kalendáře (`.ics`).
5. **Studentský servis & Portálový rozcestník (`/servis`)**: Důležité termíny (státnice, zápisy), kontakty na studijní oddělení, jídelníček Menzy ČVUT, přímé vstupy do systémů KOS, Moodle, CourseWare.

---

## 4. Technologický stack a architektonické rozhodnutí

- **Framework:** Next.js 15 (App Router, React 19) – standard pro obsahové a informační portály s rychlým načítáním, SSR/SSG a automatickou optimalizací obrázků.
- **Jazyk:** TypeScript s přísným typováním (`strict: true`).
- **Stylování:** Tailwind CSS v4 s nadefinovanými design tokens přesně odpovídajícími ČVUT FEL identitě.
- **Fonty:** `@fontsource/ibm-plex-sans` a `@fontsource/ibm-plex-mono` z lokálního balíčku (garance rychlého načtení bez externích Google Fonts závislostí a stoprocentní české znaky).
- **Ikony:** `lucide-react` (čisté vektorové ikony s technickou geometrií).
- **Téma (Dark/Light mode):** `next-themes` s perzistencí v `localStorage` a preferencí systémového nastavení.
- **Data Layer:** Typovaný lokální mock-store se vzorovými daty z reálného prostředí FEL (články, události, živý proud zpráv, data o menze a termínech) s možností přímého přepojení na REST API / CMS v budoucích fázích.

---

## 5. Implementační kroky (Ordered Behavior Steps)

### Krok 0: Uložení plánu do kořene projektu (PLAN.md)
- Hned po schválení plánu a odemčení zápisu vytvořit soubor `PLAN.md` v kořenu projektu (`/home/ed/ed/01 PROJECTS/polovodice/PLAN.md`) s kompletním obsahem tohoto plánu.

### Krok 1: Inicializace projektu a instalace závislostí
- Inicializovat Next.js projekt v aktuálním adresáři s podporou TypeScriptu a Tailwind CSS:
  - Balíčky: `next`, `react`, `react-dom`, `lucide-react`, `next-themes`, `@fontsource/ibm-plex-sans`, `@fontsource/ibm-plex-mono`, `clsx`, `tailwind-merge`.
- Nastavit konfiguraci `tsconfig.json` s path aliasem `@/*` mířícím do kořene/src.

### Krok 2: Vytvoření Design Systemu a CSS tokenů (`globals.css` a Tailwind konfigurace)
- Definovat FEL paletu barev:
  - `--fel-dark: #080B38` (primární tmavá, pozadí navbaru a dark mode)
  - `--fel-blue: #3A2AD0` (primární interaktivní modř FEL)
  - `--fel-cyan: #44D8EB` (akcentní tyrkys pro kód a zvýraznění)
  - `--fel-green: #43F6C8` (akcentní zelená pro statusy a živé indikátory)
  - `--fel-violet: #6B43F0` (sekundární akcent)
  - `--cvut-blue: #0065BD` (oficiální ČVUT modř pro univerzitu)
  - `--fel-gray-bg: #EFF2F5` (světlé neutrální pozadí stránek)
  - `--fel-gray-card: #FFFFFF` / tmavá varianta `#141846`
  - `--fel-border: #E0E3E7` / tmavá varianta `#24264A`
- Nastavit typografické třídy:
  - Font rodiny: `font-sans` (`IBM Plex Sans`) a `font-mono` (`IBM Plex Mono`).
  - Rozměrové měřítko kontejneru: `max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8`.

### Krok 3: Datový model a autentická ukázková data ČVUT FEL (`/data/*`)
- Vytvořit soubor typů `types/portal.ts`:
  - Rozhraní: `Article`, `NewsStreamItem`, `CampusEvent`, `StudyDeadline`, `CampusServiceStatus`, `MenzaMenuItem`.
- Vytvořit reálná data `data/mock-data.ts`:
  - Články s tematikou FEL: Vývoj polovodičových čipů na katedře mikroelektroniky, autonomní formule eForce FEL ČVUT, nasazení robotických psů v podzemí (DARPA SubT), nový kvantový algoritmus týmu OI, příprava družice na FEL.
  - Položky živého proudu: Termíny odevzdání semestrálek, vyhlášení stipendií děkana, rekonstrukce laboratoří na Karlově náměstí.
  - Události: Den otevřených dveří FEL, mezinárodní konference IEEE, přednáška odborníků z CERNu.

### Krok 4: Základní layoutové komponenty (Top bar, Navbar, Ticker, Footer)
- `components/layout/TopUtilityBar.tsx`:
  - Horní pruh s odznáčkem ČVUT (`#0065BD`), rychlé přepínače na Usermap, KOS, Moodle, Menzy a jazyk (CZ/EN).
- `components/layout/Navbar.tsx`:
  - Autentické vektorové logo ČVUT FEL, navigační menu (Aktuality, Studium, Věda, Katedry, Události, Servis), vyhledávací pole s klávesovou zkratkou `Cmd+K / Ctrl+K`, přepínač světlého/tmavého režimu, mobilní hamburgerové menu.
- `components/layout/CampusTicker.tsx`:
  - Rychlý pruh mimořádných zpráv s pulzujícím zeleným indikátorem (`#43F6C8`) a možností procházení zpráv.
- `components/layout/Footer.tsx`:
  - Oficiální fakultní patička s adresami kampusů (Dejvice – Technická 2, Karlovo náměstí – Karlovo nám. 13), kontakty, odkazy na všech 14 kateder FEL a sociální sítě.

### Krok 5: Specializované komponenty informačního portálu
- `components/portal/HeroFeature.tsx`:
  - Hlavní otvírák portálu odpovídající rozměrům z analýzy (8 sloupců, 16:9 obrázek, monospace kategorie, velký čitelný titulek 36px, perex a autor).
- `components/portal/LiveStreamRail.tsx`:
  - Boční sloupec "Živý proud zpráv z FEL" (4 sloupce, výška položky ~76px, monospace časový razítko, živé filtrování).
- `components/portal/ArticleCard.tsx`:
  - Karta článku v mřížce (obrazový náhled 16:9, monospace štítek tématu, datum, titulek, 2řádkový perex, odhad čtení).
- `components/portal/TopicFilter.tsx`:
  - Interaktivní horizontální lišta témat s filtry a počtem článků v každém tématu.
- `components/portal/EventWidget.tsx`:
  - Kalendářový widget s datovou kostkou (den/měsíc v modrém akcentu) a místem konání (např. "Místnost KN:E-301" / "Zengerova posluchárna KN:E-107").
- `components/portal/CampusStatusWidget.tsx`:
  - Rychlý informační stav studijního oddělení a menzy Technická / Studentský dům.

### Krok 6: Sestavení hlavní stránky (`app/page.tsx`)
- Integrovat `HeroFeature` s nejnovější prioritní zprávou.
- Napojit hlavní 12sloupcový grid:
  - 8 sloupců: Filtrovaná mřížka zpráv (Grid 2 sloupce na tabletu / 3 na desktopu).
  - 4 sloupce: `LiveStreamRail` + `CampusStatusWidget` + `EventWidget`.
- Vložit sekci "Fakultní výzkum & Projekty" se speciálním tmavým panelem inspirovaným MIT Tech Review.

### Krok 7: Implementace podstránek portálu
- `app/zpravy/page.tsx`:
  - Plnohodnotný archiv s vyhledáváním v reálném čase, multi-kategoriálním filtrem a stránkováním.
- `app/zpravy/[slug]/page.tsx`:
  - Detail článku se čtenářskou šířkou (700px), postranním panelem souvisejících článků, sdílením, citacemi a formátováním kódu.
- `app/udalosti/page.tsx`:
  - Kompletní přehled akademických akcí s filtrací dle cílové skupiny (Studenti / Uchazeči / Veřejnost).
- `app/servis/page.tsx`:
  - Studentský rozcestník, harmonogram akademického roku a rychlé fakultní kontakty.

---

## 6. Kritické soubory a kotvy

1. `app/globals.css`:
   - Definice kompletních barevných proměnných FEL (`--fel-*`, `--cvut-*`), typografických základů IBM Plex a stylů pro dark mode.
2. `types/portal.ts`:
   - Datová schémata pro články, události a stavové moduly.
3. `components/layout/Navbar.tsx`:
   - Globální navigace s responzivním zobrazením a integrací design systému FEL.
4. `components/portal/HeroFeature.tsx`:
   - Klíčový vizuální prvek portálu reprezentující novinářskou hierarchii.
5. `data/mock-data.ts`:
   - Autentická datová základna pro FEL témata (polovodiče, robotika, AI, studium).

---

## 7. Verifikace a akceptační kritéria

Pro ověření funkčnosti celého řešení musí implementátor spustit a zkontrolovat:

1. **Sestavení a typová kontrola:**
   - Spustit `npm run build` bez jakýchkoliv chyb TypeScriptu či Tailwindu.
2. **Ověření designu a barevnosti dle ČVUT FEL specifikace:**
   - Otevřít portál v prohlížeči a ověřit v Developer Tools:
     - Tmavé pozadí hlavičky odpovídá `#080B38`.
     - Tlačítka a primární interaktivní prvky nesou barvu `#3A2AD0`.
     - Technické štítky a časová razítka používají font `IBM Plex Mono`.
     - Nadpisy a tělo textu používají font `IBM Plex Sans`.
3. **Responzivní chování (Breakpoints):**
   - Šířka 375px (mobil): 1sloupcové rozložení, hamburger menu, čitelné karty.
   - Šířka 768px (tablet): 2sloupcová mřížka, zkrácený ticker.
   - Šířka 1280px / 1440px (desktop): 12sloupcový grid, poměr 8:4 mezi zprávami a živým proudem.
4. **Přepínání témat (Dark / Light mode):**
   - Přepnutí tlačítka v navigaci plynule přepne třídu `dark` na kořenovém elementu a změní podklad z `#EFF2F5` na `#080B38` / `#24264A`.
5. **Interaktivita komponent:**
   - Kliknutí na filtr témat okamžitě přefiltruje mřížku článků.
   - Vyhledávací pole reaguje na vstup a filtruje zprávy dle titulku i obsahu.
   - Otevření článku přejde na detail `/zpravy/[slug]` s funkčními breadcrumbs a čtenářským sloupcem.

---

## 8. Předpoklady a záložní řešení (Assumptions & Contingencies)

- **Výchozí volba stacku:** Next.js 15 s App Routerem a Tailwind CSS je zvolen jako standard pro moderní informační portály. Pokud by byl požadován čistě statický SPA build bez Node.js serveru, v `next.config.ts` se nastaví `output: 'export'`, což umožní generovat statické HTML/CSS/JS do složky `out/` pro jakýkoliv webhosting.
- **Fonty offline:** Fonty `IBM Plex Sans` a `IBM Plex Mono` jsou instalovány přes `@fontsource`, aby byl portál nezávislý na dostupnosti externích CDN sítí a splňoval přísné požadavky na ochranu soukromí (GDPR).
- **Backendová nezávislost:** Všechny komponenty čerpají data přes typované funkce v `lib/api.ts`. Přepnutí z mock dat na reálné REST API / headless CMS (např. Strapi či fakultní API) v budoucnu vyžaduje změnu pouze v tomto jediném souboru.
