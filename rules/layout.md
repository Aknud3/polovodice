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
│ 2. HLAVNÍ GRID (8 : 4 SPLIT)                                                      │
│  ┌───────────────────────────────────────────────┬──────────────────────────────┐ │
│  │ A. Hlavní sloupec (8 sloupců)                 │ B. Boční sloupec (4 sloupce) │ │
│  │  - Informace týdne (Hero bez flags a štítků)  │  - Týdenní přehled & O webu  │ │
│  └───────────────────────────────────────────────┴──────────────────────────────┘ │
├───────────────────────────────────────────────────────────────────────────────────┤
│ 3. OSTATNÍ NOVINKY (Nescrollovatelné filtry rubrik + čisté karty bez flags)        │
├───────────────────────────────────────────────────────────────────────────────────┤
│ 4. ŠABLONA PRO DALŠÍ SEKCI (Ukázka budoucí sekce se stylovými tlačítky)           │
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
  - **Logo ČVUT FEL:** Oficiální vektorové logo fakulty (tmavá varianta pro světlý režim, bílá varianta pro tmavý režim) + nápis **POLOVODIČE** a podtitul **Informační deník ze světa elektroniky**.
  - **Hledání:** Čistá ikona lupy a pole „Hledat...“ bez Mac-specifických zkratek `⌘K`.
  - **Vyhledávací dialog (Clean Search – Pouze nadpisy & filtry témat):**
    - Ve výsledcích vyhledávání se nezobrazují žádné plovoucí odznaky kategorií ani materiálové flags.
    - Seznam výsledků zobrazuje **výhradně čisté nadpisy článků** s datem publikace.
    - Dialog obsahuje možnost filtrace pomocí klíčových témat portálu (Čipy, Materiály, Výkonová el., atd.) umístěných v záhlaví hledání.
  - **Přepínač jazyka:** Kompaktní segment `CZ | EN`, dostupný i na mobilu.
  - **Přepínač motivu:** Tlačítko `Light / Dark mode`, dostupné i na mobilu.
### 2.2 Prvek 2: Informace týdne (Hero Feature) – PŘÍSNÝ ZÁKAZ FLAGS
- **Koncepce a periodicita:**
  - Portál je koncipován jako týdeník (1 stěžejní informace za týden).
  - **Sekční nadpis:** Striktně **„Informace týdne“** (nikoliv „Hlavní událost // Exkluzivní analýza“).
- **Pravidlo NO FLAGS (Zákaz plovoucích štítků):**
  - Na obrázku ani pod ním se NESMÍ nacházet žádné technické plovoucí odznaky (žádné vlaječky typu `STRATEGIE`, `Materiál: SiC`, `2400 V` ani spec-grid boxy).
  - Zobrazuje se pouze čistý obrázek 16:9, datum, doba čtení, H1 titulek, 3řádkový perex a autor.

### 2.3 Prvek 3: Redakční boční sloupec (Editorial Sidebar)
- **Koncepce (Zero Balast):**
  - Žádný zbytečný popisný text. Sloupec obsahuje výhradně:
    - *Datumový blok:* Přehledné zobrazení **Dnešní datum** a **Poslední aktualizace** (datum a čas).
    - *Animovaný prvek – Cyklovač článků:* Automaticky rotující/cyklující přehled dalších zpráv s plynulým animovaným přechodem a ovládacími šipkami. Záhlaví „Další články“ je čistě textové, bez blikající tečky / pulzujícího indikátoru.
    - *Rychlý přechod do archivu.*
### 2.4 Prvek 4: Ostatní novinky (Article Grid & No-Scroll Filters)
- **Sekční nadpis:** Striktně **„Ostatní novinky“** (nikoliv „Nejnovější technologické analýzy a zprávy“).
- **Pravidlo NO FLAGS na kartách:**
  - Ani karty článků nesmí nést žádné plovoucí odznaky, materiálové štítky ani technické vlaječky. Pouze čistý náhled 16:9, datum, H3 titulek, 2řádkový perex a autor.
- **Nescrollovatelné filtry:**
  - Tlačítka témat se přirozeně zalamují do řádků (`flex-wrap`) tak, aby uživatel nemusel horizontálně scrollovat lištu.

### 2.5 Prvek 5: Šablona pro další sekci (Section Template)
- **Koncepce a textace (Bez emotikonů):**
  - Zcela bez jakýchkoliv ikon, emotikonů či dekorací v záhlaví.
  - **Hlavní nadpis:** Striktně **„Zde mohou být nové informace, které na stránce mohou být zobrazeny“**.
  - **Podtitul:** Striktně **„Toto je template pro novou sekci / sekce.“**.
  - Obsahuje ukázku čistých akčních tlačítek pro budoucí sekce.
### 2.6 Prvek 6: Zjednodušená patička (Streamlined Footer)
- **Koncepce:**
  - Odstraněny odkazy na centrální systémy ČVUT, kampusy i seznam kateder.
  - Patička obsahuje pouze:
    - Informace o projektu a Katedře mikroelektroniky FEL ČVUT.
    - Kotvy na stránku (On-page anchors): *Informace týdne*, *Ostatní novinky*, *Nová sekce*, *Zpět nahoru*.
    - Spodní řádek: Copyright ČVUT FEL a odkaz na GDPR.

### 2.7 Prvek 7: Cookie lišta (Vercel-style Cookie Banner)
- Decentní lišta u dolního okraje obrazovky s informací o cookies a tlačítkem „Rozumím a přijmout“.

### 2.8 Prvek 8: Témata a tagy bez prefixu mřížky
- Všechny štítky témat u článků i v detailu se zobrazují **čistě bez symbolu `#`** (např. `onsemi`, `SiC`, nikoliv `#onsemi`).
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
- Navbar má na mobilu `min-h-14`, logo se nesmí smrštit pod čitelnou velikost a název doplňuje jednořádkový podtitul.
- Vyhledávání zobrazuje pouze ikonu na mobilu; jazykový a theme přepínač zůstávají dostupné. V otevřeném vyhledávacím dialogu se na mobilu nezobrazují vizuální klávesové nápovědy `ESC`, šipek ani `↵`.
- Hero a karty používají mobilní padding `p-4`, titulky mají základ `text-xl`/`text-base`; desktopové velikosti se přidávají až od `sm:`.
- Topic filtry se zalamují, nikdy nepoužívají `overflow-x-auto`; tlačítka mají minimální dotykovou výšku `36px`.
- Footer přechází na jeden sloupec, text a právní odkazy se zalamují a nesmí vytvářet horizontální overflow.


## 4. Shrnutí layoutových pravidel dle Vercel UI/UX standardů
1. **Content-First & No Clutter:** Portál funguje jako **veřejné technologické médium světové úrovně**. Obsah, polovodičová data, schémata a analýzy stojí na prvním místě; školní interní systémy (KOS, Moodle) jsou elegantně dostupné v horní liště pro studenty, ale neovlivňují čistou novinářskou tvář webu pro veřejnost.
2. **Vercel Layout Density (4px / 8px Grid):** Veškerá vertikální i horizontální odsazení přísně dodržují násobky 4px a 8px (paddingy 16px / 24px, gutter 24px, výška navigace 64px, výška tickeru 42px).
3. **Border-Driven Depth:** Vizuální hierarchie vrstev a karet je definována čistými 1px linkami (`border border-neutral-200 dark:border-neutral-800`), nikoliv rozplizlými stíny.
4. **Keyboard-First & Command Menu (`Cmd+K`):** Návštěvníci mohou bleskově vyhledávat témata, materiály (SiC, GaN) či články pomocí klávesové zkratky `Cmd+K` / `Ctrl+K`.
5. **Zero Cumulative Layout Shift (CLS = 0):** Všechny obrázky a widgety mají pevně vyhrazený prostor a poměry stran (16:9 u článků, čtverec u avatarů) s jemným skeleton shimmerem při načítání dat.

## 8. Lokalizace portálu

- Portál podporuje češtinu (`cs`) a angličtinu (`en`).
- Přepínač jazyka je součástí hlavní navigace a změna se ukládá do `localStorage` pod klíčem `polovodice-language`.
- Překlady jsou centralizované v `lib/i18n.ts`; komponenty nesmí duplikovat jazykovou logiku.
- Výchozí jazyk je čeština a při změně jazyka se musí okamžitě aktualizovat veškeré texty dostupné v klientských komponentách.
