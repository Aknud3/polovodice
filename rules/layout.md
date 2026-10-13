# Technická architektura a prvky rozvržení: Polovodiče (`layout.md`)

> **Syntéza a průnik technických prvků z 5 předních informačních portálů (ČT24, iRozhlas, The Verge, MIT Technology Review, Seznam Zprávy).**
> Tento dokument specifikuje kompletní sadu povinných technických prvků, mřížkový systém, rozvržení sekcí, komponentní hierarchii a responzivní chování portálu **Polovodiče**.

---

## 1. Souhrnná strukturální dekonstrukce informačního portálu

Na základě dekonstrukce analyzovaných portálů je architektura stránek portálu **Polovodiče** organizována do následující vertikální a horizontální hierarchie:

```
┌───────────────────────────────────────────────────────────────────────────────────┐
│ 1. MINIMALISTICKÝ NAVBAR (Logo ČVUT FEL • POLOVODIČE • Informační deník elektroniky) │
├───────────────────────────────────────────────────────────────────────────────────┤
│ 2. HLAVNÍ GRID (8 : 4 SPLIT, spodní hrana sloupce B lícuje se sloupcem A)           │
│  ┌───────────────────────────────────────────────┬──────────────────────────────┐ │
│  │ A. Hlavní sloupec (8 sloupců)                 │ B. Boční sloupec (4 sloupce) │ │
│  │  - Informace týdne (Hero 16:9, bez tečky)     │  - Další články (cyklovač)   │ │
│  │                                               │  - Technický oddělovač (čistá linka) │ │
│  │                                               │  - INFORMACE O FAKULTĚ       │ │
│  │                                               │    (1 rotující zpráva)       │ │
│  │  Spodní hrana lícuje s pravým sloupcem        │  Spodní hrana lícuje s hero  │ │
│  └───────────────────────────────────────────────┴──────────────────────────────┘ │
├───────────────────────────────────────────────────────────────────────────────────┤
│ 3. OSTATNÍ NOVINKY (Univerzální rozbalovací menu rubrik + 3×1 karty, bez CTA)      │
├───────────────────────────────────────────────────────────────────────────────────┤
│ 4. INFORMACE O FAKULTĚ (2×2 grid, nejdůležitější zprávy fakulty, animovaný vstup;  │
│    jde o druhou instanci widgetu ze sekce 2B)                                     │
├───────────────────────────────────────────────────────────────────────────────────┤
│ 5. ZJEDNODUŠENÁ PATIČKA (Info o portálu, kotvy na sekce, copyright ČVUT FEL)      │
├───────────────────────────────────────────────────────────────────────────────────┤
│ 6. COOKIE LIŠTA (Vercel-style decentní lišta pro souhlas s cookies)                │
└───────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Přehled povinných technických prvků (Required Technical Elements)

Následujících 14 technických prvků představuje průnik nejlepších praktik analyzovaných portálů a tvoří jádro informačního systému **Polovodiče**:

### 2.1 Prvek 1: Minimalistická navigace (Clean Header – Zero Bloat)
- **Koncepce:**
  - Odstraněn duplicitní horní ekosystémový bar i běžící lišta aktualit („ŽIVĚ / BLESKOVKY“) pro maximální odlehčení HTML a nulový JavaScriptový bloat.
  - Odstraněny středové navigační odkazy („Aktuality“, „Čipy & ASIC“ atd.) – navigace se děje přirozeně přes vyhledávání a Topic Hubs přímo v obsahu.
  - Žádná modrá kostka: na levé straně se nachází výhradně **oficiální logo ČVUT FEL**, název **POLOVODIČE** a podtitul **„Informační deník ze světa elektroniky“**.
- **Vizuál a komponenty:**
  - Výška: **64px**, `position: sticky; top: 0; z-index: 50;` s jemným rozostřením (`bg-background/90 backdrop-blur-md border-b border-border`).
  - **Logo ČVUT FEL:** Oficiální vektorové logo fakulty (tmavá varianta pro světlý režim, bílá varianta pro tmavý režim). Od `sm:` (`>= 640px`) jej doplňuje dělící čára, nápis **POLOVODIČE** a podtitul **Informační deník ze světa elektroniky**; na telefonu (`< 640px`) jsou nápis POLOVODIČE, podtitul i dělící čára **skryté** (`hidden sm:block` / `hidden sm:flex`), aby horní lišta zůstala čistá a vzdušná.
  - **Brand mark portálu:** samostatná ikona čipu (`rules/theme.md` §5) se používá **výhradně** pro favicon, touch ikony a webový manifest; v navbaru ani v patičce se jako logo nezobrazuje.
  - **Hledání:** Čistá ikona lupy (16 px) a pole „Hledat...“ bez Mac-specifických zkratek `⌘K`. Vyhledávací pole je **výrazné**: výška **40 px** (`h-10`), text `text-sm`, horizontální padding `px-3 sm:px-4`, na desktopu minimální šířka **208 px** (`sm:min-w-52`); na mobilu zůstává pouze ikona ve čtverci 40 × 40 px.
  - **Vyhledávací dialog (Clean Search – Pouze nadpisy & filtry témat):**
    - Ve výsledcích vyhledávání se nezobrazují žádné plovoucí odznaky kategorií ani materiálové flags.
    - Seznam výsledků zobrazuje **výhradně čisté nadpisy článků** s datem publikace.
    - Dialog obsahuje možnost filtrace pomocí klíčových témat portálu (Čipy, Materiály, Výkonová el., atd.) umístěných v záhlaví hledání.
  - **Přepínač jazyka:** Kompaktní segment `CZ | EN`, dostupný i na mobilu.
  - **Přepínač motivu:** Tlačítko `Light / Dark mode`, dostupné i na mobilu.
### 2.2 Prvek 2: Informace týdne (Hero Feature) – PŘÍSNÝ ZÁKAZ FLAGS
- **Koncepce a periodicita:**
  - Portál je koncipován jako týdeník (1 stěžejní informace za týden).
  - **Bez horní nadpisové lišty:** Sekce `#informace-tydne` na úvodní stránce **nemá** žádnou horní lištu s nadpisem „Informace týdne“ ani štítkem „Týdenní vydání“ – začíná přímo hlavním 8 : 4 gridem.
- **Pravidlo NO FLAGS (Zákaz plovoucích štítků):**
  - Na obrázku ani pod ním se NESMÍ nacházet žádné technické plovoucí odznaky (žádné vlaječky typu `STRATEGIE`, `Materiál: SiC`, `2400 V` ani spec-grid boxy).
  - Zobrazuje se pouze čistý obrázek 16:9, datum, doba čtení, H1 titulek, 3řádkový perex a autor.
- **Pevná přirozená velikost (zákaz umělého natahování a zmenšování):**
  - Všechny prvky v hero sekci si zachovávají své pevné a přirozené proporce.
  - Mediální blok hero článku má pevný poměr **16:9** na všech šířkách (`aspect-video`), žádné flex-1 natahování výšky.
  - Sloupce gridu mají přirozené zarovnání `items-start`, žádné umělé dorovnávání výšek.

### 2.3 Prvek 3: Redakční boční sloupec (Editorial Sidebar – Faculty First)
- **Koncepce (Zero Balast):** Sloupec obsahuje **pouze dva** bloky. Datumový blok („Dnešní datum“ / „Poslední aktualizace“) i samostatný blok „Rychlý přechod do archivu“ jsou **zrušeny** – duplikovaly informace, které jsou v záhlaví jiných sekcí.
  1. *Animovaný prvek – Cyklovač článků:* Automaticky rotující přehled dalších zpráv s ovládacími šipkami a pořadovým čítačem. Záhlaví „Další články“ je čistě textové, bez blikající tečky.
     - Blok má přirozenou výšku s poměrem náhledu **16:9** (`aspect-video`), nic se uměle nenatahuje.
  2. *Widget „Informace o fakultě“:* **Nejdůležitější prvek celé stránky** („hlasná trouba“ portálu), proto:
     - zobrazuje **vždy právě 1 zprávu** o fakultě; nikdy seznam více položek,
     - zprávy se automaticky střídají po **6 sekundách** a přechod je **vertikální** – nová zpráva najíždí zdola nahoru (`faculty-slide-up`, 360 ms) a nahrazuje předchozí,
     - **rotující blok má pevnou výšku** (`h-[8.5rem] sm:h-[9.5rem]`), aby střídání zpráv nezpůsobovalo posun layoutu; delší titulky a perexy ořezávají `line-clamp`,
     - **žádný progres/loading pruh ani jiný indikátor** – u vertikálně se měnícího obsahu nemá smysl a působí jako načítání; manuální přepínání zajišťuje cyklovač výše,
     - typografie je větší než u ostatních widgetů: titulek `text-base sm:text-lg`, mono datum `text-[11px]`, perex `text-xs sm:text-sm` (`line-clamp-2`),
     - titulek má plný akcentní režim: `text-foreground` s hover akcentem `text-cvut-blue dark:text-fel-cyan`, panel má levý akcentní proužek `border-l-2 border-cvut-blue dark:border-fel-cyan`,
     - v záhlaví je odkaz „Vše z fakulty“ na `/zpravy`.
     - Widget je pevně vysoký (`shrink-0`) a **nikdy se roztahuje**.
- **Lícování spodní hrany a technický splitter (povinné):**
  - Na desktopu (`lg:`) má boční sloupec `h-full flex flex-col`.
  - Mezi cyklovačem „Další články“ a widgetem „Informace o fakultě“ je umístěn **technický oddělovač / splitter** (`flex-1 min-h-6 flex items-center py-2`), který vizuálně rozbíjí pozornost mezi polovodičovými články a zprávami z fakulty.
  - Oddělovač je **čistá jemná linka bez textu a bez symbolů** (`h-px w-full bg-border`).
  - Díky pružnosti oddělovače (`flex-1`) spodní hrana widgetu „Informace o fakultě“ **přesně lícuje se spodní hranou hero článku vlevo**, aniž by se deformovaly poměry obrázků či velikosti karet.
### 2.4 Prvek 4: Ostatní novinky (Article Grid & Single-Line Filters)
- **Sekční nadpis:** Striktně **„Ostatní novinky“** (nikoliv „Nejnovější technologické analýzy a zprávy“). Nadpis **nemá** žádnou barevnou tečku ani jiný dekorativní prvek před textem.
- **Pravidlo NO FLAGS na kartách:**
  - Ani karty článků nesmí nést žádné plovoucí odznaky, materiálové štítky ani technické vlaječky. Pouze čistý náhled 16:9, datum, H3 titulek, 2řádkový perex a autor.
- **Filtry témat (Univerzální rozbalovací menu dropdown na všech zařízeních):**
  - Filtry rubrik fungují jako čisté **rozbalovací menu (dropdown)** na telefonu, tabletu i desktopu.
  - Tlačítko (na mobilu plná šířka, od `sm:` kompaktní šířka `sm:max-w-xs md:max-w-sm`, min-h 40 px) zobrazuje text „Rubrika:“, aktuálně vybranou rubriku, počet článků a ikonu šipky (`ChevronDown`).
  - Po kliknutí se rozbalí plovoucí panel (`absolute z-30`) s přehledem všech rubrik, počty článků a fajfkou (`Check`) u aktivní položky, aniž by se posouval obsah mřížky pod ním.
  - Vodorovné řady tlačítek jsou nahrazeny tímto sjednoceným rozbalovacím menu.
- **Zákaz CTA tlačítka:** Pod mřížkou **NESMÍ** být žádné velké akční tlačítko „Celý archiv zpráv“ – odkaz do archivu je pouze v záhlaví sekce (`Celý archiv` s ikonou šipky) a v patičce. Duplicitní CTA se odstranilo jako redundantní.
- **Limit 3 × 1 (povinné):**
  - Sekce zobrazuje **maximálně 3 karty** a na desktopu je řadí do **jediné řady o 3 sloupcích** (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`). Na tabletu 2 sloupce, na mobilu 1 sloupec.
  - Limit platí i pro filtrovaný stav: při aktivním filtru rubriky se zobrazí nejvýše 3 nejnovější články dané rubriky. Zbytek archivu je dostupný pouze přes odkaz do archivu.
  - **Články kategorie `academic` (Informace o fakultě) se v této mřížce nezobrazují** – mají vlastní sekci (§2.5 a §2.3).
- **Počítadla filtrů:**
  - Čísla u tlačítek rubrik odpovídají **přesně sadě článků, které může mřížka zobrazit** (tj. bez hlavní zprávy týdne a bez kategorie `academic`), aby žádný filtr nevedl na prázdný stav.

### 2.5 Prvek 5: Informace o fakultě (Faculty Information Section – hlavní sdělení portálu)
- **Koncepce:** Jde o **nejhlasitější prvek stránky** („hlasná trouba“). Placeholder „Šablona pro další sekci“ je zrušen; sekce nese nejdůležitější zprávy Fakulty elektrotechnické ČVUT – letní škola, dny otevřených dveří, přijímací řízení, stáže, stipendia, konference.
- **Umístění a kotva:** Poslední sekce hlavní stránky pod „Ostatní novinky“; `id="informace-o-fakulte"`.
- **Záhlaví (bez emotikonů, ale výrazné):**
  - **Hlavní nadpis:** Striktně **„Informace o fakultě“**, velikost **`text-2xl sm:text-3xl`** a váha `font-bold` (výrazně větší než nadpisy ostatních sekcí).
  - **Podtitul:** Striktně **„Nejdůležitější zprávy z Fakulty elektrotechnické ČVUT“**, `text-sm sm:text-base`.
  - **Odkaz v záhlaví:** „Vše z fakulty“ s ikonou šipky směřuje na `https://ek.fel.cvut.cz/`.
- **Obsah a rozvržení:**
  - Panel s rámečkem (`border-border`, `bg-surface`), vnitřní odsazení `p-4 sm:p-8` a **levý akcentní pruh** `border-l-4 border-cvut-blue dark:border-fel-cyan` jako znamení priority.
  - **2 × 2 grid**: sekce zobrazuje **4 nejdůležitější zprávy** (`grid-cols-1 sm:grid-cols-2`), tedy na ≥ 640 px dvě řady po dvou. Při menším počtu dat se počet položek snižuje bez prázdných míst.
  - Každá položka: mono datum `text-[11px]`, titulek **`text-lg sm:text-xl`** (výrazně větší než u karet v „Ostatních novinkách“), perex **`text-sm sm:text-base`**, celá plocha je klikatelná na `/zpravy/<slug>`, vpravo šipka `ArrowUpRight`.
  - Položky **nezobrazují obrázky** – jde o textově-hustý seznam oznámení.
  - Prázdný stav: informační text „Zatím nejsou zveřejněny žádné informace o fakultě.“ bez mřížky.
- **Animace (aby sekce zaujala):**
  - Položky najíždějí při vstupu na stránku postupně shora (`reveal-up`), zpoždění **70 ms** násobené indexem položky.
  - Hover: položka se posune doprava o 2 px, titulek přejde do akcentní barvy, šipka se posune diagonálně a levý akcentní pruh položky zesílí.
  - Povolené trvání animací viz `rules/theme.md` §7; při `prefers-reduced-motion` se animace vypínají.
- **Zdvojení sekce (povinné):** Stejný zdroj dat, ale **jiná forma**: plná 2 × 2 sekce zde a **jeden rotující** widget v bočním sloupci (§2.3, bod 2).
### 2.6 Prvek 6: Zjednodušená patička (Streamlined Footer)
- **Koncepce:**
  - Odstraněny odkazy na centrální systémy ČVUT, kampusy i seznam kateder.
  - **Logo portálu:** Pouze **čistý text POLOVODIČE** bez ikony či modrého čtverce.
  - Patička obsahuje:
    - Informace o projektu a Katedře mikroelektroniky FEL ČVUT.
    - Navigace na stránce obsahuje **výhradně** sekce hlavní stránky a archiv zpráv:
      - *Ostatní novinky* (`/#ostatni-novinky`)
      - *Informace o fakultě* (`https://ek.fel.cvut.cz/`)
      - *Archiv všech zpráv* (`/zpravy`)
      - *Zpět nahoru* (`#`)
      - Podstránky `/udalosti` (Kalendář akcí) a `/servis` (Studentský servis) i odkaz „Informace týdne“ jsou odstraněny – portál slouží jako čistá informační „hlasná trouba“ fakulty, nikoliv jako další komplexní rozcestník pro studenty.
    - Spodní řádek: Copyright ČVUT FEL a odkaz na ochranu osobních údajů směřující na `https://fel.cvut.cz/cs/ochrana-osobnich-udaju` s textem **„Ochrana osobních údajů“** (bez zkratky GDPR).
    - **Barevný režim (Light / Dark mode):** Patička plně reaguje na přepnutí motivu – ve světlém režimu má čistý podklad `bg-white` s linkami `border-neutral-200` a tmavým písmem, v tmavém režimu hluboký navy podklad `dark:bg-[#050724]` s linkami `dark:border-white/10` a světlým písmem. Zákaz natvrdo tmavé patičky ve světlém režimu.
### 2.7 Prvek 7: Cookie lišta (Vercel-style Cookie Banner)
- Decentní lišta u dolního okraje obrazovky s informací o cookies a tlačítkem „Rozumím a přijmout“.

### 2.8 Prvek 8: Témata a tagy bez prefixu mřížky
- Všechny štítky témat u článků i v detailu se zobrazují **čistě bez symbolu `#`** (např. `onsemi`, `SiC`, nikoliv `#onsemi`).
### 2.9 Prvek 9: Podstránka archivu zpráv (`/zpravy`)
- **Záhlaví archivu:** Čisté a minimalistické – obsahuje výhradně H1 nadpis **„Zprávy, studie & polovodičové novinky“**. Odznak „ARCHIV TECHNOLOGICKÉHO ZPRAVODAJSTVÍ“ i dlouhý popisný odstavec pod nadpisem jsou **odstraněny**.
- **Vyhledávací panel:**
  - Vyhledávací pole má placeholder striktně **„Hledat...“**.
  - Filtry rubrik i polovodičových materiálů jsou **dočasně odstraněny** – zůstává pouze vyhledávací pole a počítadlo nalezených článků.
- **Rozdělení archivu na dvě sekce (povinné):**
  - Výpis článků je vizuálně i strukturálně rozdělen do **dvou samostatných sekcí**:
    1. **Všeobecné informace** – odborné a technologické články (všechny s `category !== "academic"`),
    2. **Informace o fakultě** – články spojené s fakultou, studiem a akcemi (`category === "academic"`).
  - Každá sekce má vlastní podnadpis s počtem článků a vlastní 3sloupcovou mřížku karet (`ArticleCard`).
  - Vyhledávací pole filtruje články v obou sekcích současně.
---

## 3. Mřížkový systém a responzivní chování (Grid & Breakpoints)

### 3.1 12sloupcový systém
- **Šířka kontejneru:** `max-w-[1320px] mx-auto` s horizontálním paddingem `px-4 sm:px-6 lg:px-8`.
- **Gutter (mezery):** `gap-6` (24px) na desktopu, `gap-4` (16px) na mobilu.
- **Asymetrický split:**
  - Desktop (`lg: >= 1024px`): `col-span-12 lg:col-span-8` (hlavní sloupec) a `col-span-12 lg:col-span-4` (boční rail).
  - Mobil a tablet: Sloupce řazeny sekvenčně pod sebou (1 sloupec na mobilu, 2 sloupce na tabletu pro mřížku karet).

### 3.2 Tabulka chování podle šířky obrazovky

| Breakpoint | Třída Tailwindu | Šířka viewportu | Uspořádání layoutu | Chování navigace a widgetů |
| :--- | :--- | :--- | :--- | :--- |
| **Mobile** | Default (`< 640px`) | `320px – 639px` | 1 sloupec, karty na 100 % šířky | Hamburger menu, sbalený ticker, boční rail pod obsahem |
| **Mobile Large** | `sm:` | `640px – 767px` | 1–2 sloupce | Rozšířený kontejner, plné zobrazení času u bleskovek |
| **Tablet** | `md:` | `768px – 1023px` | 2 sloupce v mřížce | Horizontální topic pills, zjednodušený status bar |
| **Desktop** | `lg:` | `1024px – 1279px` | 12sloupcový grid (8 : 4 split) | Plná desktopová navigace, sticky pravý boční panel |
| **Wide Desktop** | `xl:` & `2xl:` | `>= 1280px` (max 1320px) | 12 sloupců s maximální hustotou | Plná šířka 1320px, boční bezpečnostní marže, maximální čitelnost |

### 3.3 Native mobile UI

- Mobile-first základ je bez horizontálního scrollu a bez pevné šířky větší než viewport.
- Na šířce `320px–639px` používá hlavní kontejner `px-4`, vertikální rozestup `space-y-10` a grid `grid-cols-1`.
- Navbar má na mobilu `min-h-14` a vlevo zobrazuje **výhradně oficiální logo ČVUT FEL** (nápis POLOVODIČE, podtitul i dělící čára jsou na telefonu skryté).
- Vyhledávání zobrazuje pouze ikonu na mobilu; jazykový a theme přepínač zůstávají dostupné. V otevřeném vyhledávacím dialogu se na mobilu nezobrazují vizuální klávesové nápovědy `ESC`, šipek ani `↵`.
- Hero a karty používají mobilní padding `p-4`, titulky mají základ `text-xl`/`text-base`; desktopové velikosti se přidávají až od `sm:`.
- Topic filtry v sekci „Ostatní novinky“ používají univerzální **rozbalovací menu (dropdown)** na všech velikostech obrazovky (na telefonu plná šířka, na desktopu kompaktní max-w-sm).
- Footer přechází na jeden sloupec, text a právní odkazy se zalamují a nesmí vytvářet horizontální overflow.


## 4. Shrnutí layoutových pravidel dle Vercel UI/UX standardů
1. **Content-First & No Clutter:** Portál funguje jako **veřejné technologické médium světové úrovně**. Obsah, polovodičová data, schémata a analýzy stojí na prvním místě; školní interní systémy (KOS, Moodle) jsou elegantně dostupné v horní liště pro studenty, ale neovlivňují čistou novinářskou tvář webu pro veřejnost.
2. **Vercel Layout Density (4px / 8px Grid):** Veškerá vertikální i horizontální odsazení přísně dodržují násobky 4px a 8px (paddingy 16px / 24px, gutter 24px, výška navigace 64px, výška tickeru 42px).
3. **Border-Driven Depth:** Vizuální hierarchie vrstev a karet je definována čistými 1px linkami (`border border-neutral-200 dark:border-neutral-800`), nikoliv rozplizlými stíny.
4. **Keyboard-First & Command Menu (`Cmd+K`):** Návštěvníci mohou bleskově vyhledávat témata, materiály (SiC, GaN) či články pomocí klávesové zkratky `Cmd+K` / `Ctrl+K`.
5. **Zero Cumulative Layout Shift (CLS = 0):** Všechny obrázky a widgety mají pevně vyhrazený prostor a poměry stran (16:9 u článků, čtverec u avatarů) s jemným skeleton shimmerem při načítání dat.

## 8. Lokalizace portálu

- Portál je plně bilingvní v češtině (`cs`) a angličtině (`en`).
- Přepínač jazyka je součástí hlavní navigace a změna se ukládá do `localStorage` pod klíčem `polovodice-language`.
- Překlady rozhraní jsou centralizované v `lib/i18n.ts`; komponenty nesmí duplikovat jazykovou logiku.
- Všechny články v `data/mock-data.ts` mají obě jazykové verze (českou i kompletní anglickou verzi v poli `en`: `title`, `perex`, `content`, `categoryLabel`, `imageAlt`, `authorTitle`, `authorDepartment`, `tags`).
- Při přepnutí do anglického režimu (`en`) se okamžitě přepne celé rozhraní (navbar, vyhledávání, filtry, cookie lišta, patička, archiv i detail článku) i kompletní obsah všech článků do angličtiny.
