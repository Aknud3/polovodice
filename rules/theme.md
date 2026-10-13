# Design System & Vizuální styl: Polovodiče

## 1. Vztah k vizuálu ČVUT FEL
Polovodiče používají stejnou vizuální rodinu jako ČVUT FEL, ale nesmí být přímou kopií fakultního webu. Varianty v katalogu mohou mít odchylku až přibližně 20 %: zachovávají navy základ, elektrickou modř, cyan akcent a IBM Plex typografii, ale zřetelně posouvají odstín, světlost nebo sytost, aby byly mezi sebou porovnatelné.

Referenční tokeny ČVUT FEL:
- Navy: `#080B38`
- FEL blue: `#3A2AD0`
- Cyan: `#44D8EB`
- Green: `#43F6C8`
- Violet: `#6B43F0`
- ČVUT blue: `#0065BD`
- Dark panel: `#141846`
- Dark border: `#24264A`

## 2. Povinné tokeny variant
Každá varianta musí definovat samostatné tokeny pro light i dark náhled a společné akcenty:
`dark`, `darkDeep`, `darkText`, `darkMuted`, `darkBorder`, `lightBg`, `lightCard`, `lightText`, `lightMuted`, `lightBorder`, `blue`, `blueHover`, `cvutBlue`, `cvutDarkBlue`, `cyan`, `green`, `violet`, `waferGold`, `circuitRed`.

## 3. Výběrový katalog
- Katalog variant je v `lightning-grids.html` a slouží pouze k vizuálnímu výběru; neovlivňuje runtime aplikace.
- Katalog musí obsahovat 10 variant označených `01` až `10`, vždy s light i dark náhledem, názvem a přesnými hex tokeny.
- Každá varianta má být identifikovatelná jako „bratranec“ FEL: žádné radikální změny na červenou, zelenou nebo fialovou dominantní paletu.
- Po výběru uživatelem se jediná zvolená varianta propíše do `app/globals.css`; ostatní zůstanou pouze v katalogu.

### Vybraná varianta 09: Green Silicon
Runtime používá tyto přesné tokeny varianty 09: `dark #081d3d`, `darkDeep #041129`, `darkText #f4fffc`, `darkMuted #abd8ca`, `darkBorder #24554e`, `lightBg #edfff9`, `lightCard #ffffff`, `lightText #0e2b35`, `lightMuted #4f7770`, `lightBorder #c3e4da`, `blue #2856cb`, `blueHover #1842ac`, `cvutBlue #0879bb`, `cvutDarkBlue #075781`, `cyan #27d0d0`, `green #3beeb1`, `violet #4c72e3`, `waferGold #e2a21a`, `circuitRed #e34c55`.
## 4. Výchozí zobrazení
- Portál se otevírá v tmavém režimu jako výchozí, aby byla první návštěva konzistentní s technologickou identitou Polovodičů.
- Tmavý režim používá navy plátno, tmavé panely a světlý text. Přepínač stále umožňuje ruční přepnutí do light mode.
- Systémová preference zařízení nesmí přepsat výchozí tmavý režim; ruční volba uživatele se ukládá přes `next-themes`.
- IBM Plex Sans je hlavní písmo, IBM Plex Mono technické písmo.
- Light mode používá vysoký kontrast textu na světlém podkladu.
- Komponenty nesmí přidávat flags tam, kde to zakazuje `rules/layout.md`.

---

## 5. Brand mark a ikonový systém

### 5.1 Brand mark „ČVUT FEL“
- Ikony portálu nesou **oficiální znak Fakulty elektrotechnické ČVUT**: heraldického lva v rámované čtvercové značce, převzatý z `public/felcvut-logo-blue.svg`.
- Z oficiálního loga (viewBox `0 0 215 64`) se používá **výhradně čtvercová znaková část `x 0–64, y 0–64`**. Textový lockup „FAKULTA ELEKTROTECHNICKÁ ČVUT V PRAZE“ se do ikon nedostává – v 16 px je nečitelný.
- Barvy: lev a rámeček v oficiálním navy loga `#080B38` na bílém podkladu `#ffffff`. Bílá dlaždice je povinná – na tmavém panelu prohlížeče by navy znak bez ní zanikl.
- Křivky loga se **nepřekreslují ani nezjednodušují**: zdrojové SVG ikony obsahují obsah oficiálního loga verbatim ve vnořeném `<svg viewBox="0 0 64 64">`, který ořeže textový lockup mimo viewBox.
- Motiv čipu ani dlaždicový motiv `silicon-grid-bg` se do brand marku nepropsují; zůstávají pouze jako dekorace stránky.

### 5.2 Dlaždice
- Dlaždice ikony je **plná bílá** (`#ffffff`), celoplošná a **bez zaoblení** – znak loga má vlastní rámeček, další tvarování by kresbu rozbilo.
- Žádné stíny, žádné rámečky navíc, žádné gradienty ani průhledné rohy.
- Jediná výjimka: `safari-pinned-tab.svg`, kde je podklad průhledný a znak jednobarevný černý (jde o monochromní masku).

### 5.3 Inventář souborů (`public/icons/`)

| Soubor | Formát | Rozměr | Účel |
| :--- | :--- | :--- | :--- |
| `icon.svg` | SVG | vektor (viewBox 64) | primární ikona: bílá dlaždice + znak FEL (favicon, PWA `any`, Apple touch, MS tile) |
| `favicon.ico` | ICO | 16 + 32 + 48 | klasická záložka, starší prohlížeče |
| `favicon-16x16.png` | PNG | 16×16 | záložka (malá) |
| `favicon-32x32.png` | PNG | 32×32 | záložka (standardní) |
| `favicon-48x48.png` | PNG | 48×48 | záložka (HiDPI) |
| `apple-touch-icon.png` | PNG | 180×180 | plocha iOS / iPadOS (celoplošná dlaždice) |
| `icon-192.png` | PNG | 192×192 | PWA `purpose: any` |
| `icon-512.png` | PNG | 512×512 | PWA `purpose: any` |
| `icon-maskable-192.png` | PNG | 192×192 | PWA `purpose: maskable` |
| `icon-maskable-512.png` | PNG | 512×512 | PWA `purpose: maskable` |
| `mstile-150x150.png` | PNG | 150×150 | dlaždice Windows / Edge |
| `safari-pinned-tab.svg` | SVG | vektor | Safari pinned tab (monochromní silueta) |
| `manifest.webmanifest` | JSON | — | metadata PWA |
| `browserconfig.xml` | XML | — | dlaždice Windows |

Zdrojové vektorové předlohy `icon.svg` (běžná ikona 84 %), `icon-maskable.svg` (znak 56 %) a `safari-pinned-tab.svg` (černá maska) zůstávají v `public/icons/` jako reprodukovatelné zdroje pravdy. Všechny tři obsahují obsah `public/felcvut-logo-blue.svg` verbatim.

Kopie `favicon.ico` leží navíc v kořeni `public/favicon.ico`, aby implicitní požadavek prohlížeče na `/favicon.ico` fungoval i bez deklarace v HTML (a na serverech bez přepisovacích pravidel).

### 5.4 Bezpečná zóna znaku
- Běžná ikona (záložka, PWA `any`, Apple touch, MS tile): znak zabírá **84 %** hrany dlaždice, tedy 8 % odsazení na každé straně.
- Maskable: znak je čtvercový, proto se do bezpečného kruhu o poloměru **40 %** hrany musí vejít **celou úhlopříčkou** → hrana znaku je **56 %** hrany dlaždice (56 % × √2 / 2 = 39,6 %).
- Safari pinned tab: znak přes celou plochu (100 %), jednobarevný černý, podklad průhledný.
- Pro 16 px se používá stejná předloha jako pro běžnou ikonu; v této velikosti je znak čitelný jako rámovaný FEL lev a dále se nezjednodušuje.

### 5.5 Barvy rozhraní prohlížeče
- `theme-color` pro tmavý režim: `#081d3d`; pro světlý režim: `#edfff9` (jde o barvu UI prohlížeče, nikoliv ikony).
- `TileColor` dlaždic Windows a `background_color` manifestu: `#ffffff` – musejí odpovídat bílému podkladu ikony, aby splash screen a dlaždice neladily s navy znakem.

### 5.6 Zákazy
- Ikony NESMÍ být generovány runtime skriptem ani vkládány jako data URI do komponent; jsou to statické soubory v `public/icons/`.
- Znak FEL se NESMÍ překreslovat, zjednodušovat, přebarvovat ani doplňovat o další prvky; používá se oficiální křivka z `public/felcvut-logo-blue.svg`.
- Do ikony se NESMÍ dostat textový lockup loga ani jiný text.
- Inventář v §5.3 je závazný: každý nový soubor ikony musí být zapsán zde a naopak.

---

## 6. Tokeny pro sekci „Informace o fakultě“

- Panel sekce používá výhradně tokeny varianty 09: `bg-surface`, `border-border`, `text-foreground`, `text-muted`.
- Panel má **levý akcentní pruh priority** `border-l-4 border-cvut-blue dark:border-fel-cyan`.
- Akcent titulku, data a šipky: `text-cvut-blue` v light režimu a `text-fel-cyan` v dark režimu; levý akcentní proužek položky `border-l-2 border-cvut-blue dark:border-fel-cyan`.
- Nadpis sekce je největší text sekcí na stránce (`text-2xl sm:text-3xl`), titulek položky `text-lg sm:text-xl`, perex `text-sm sm:text-base`.
- Rail widget v bočním sloupci používá stejné tokeny jako ostatní widgety sloupce (panel `bg-surface` s `border-border`) a rotující položku animuje podle §7.
- Sekce NESMÍ používat legacy hardcoded hodnoty (`#141846`, `#080B38`, `#0065bd`), které zůstávají pouze ve starších komponentách a nejsou součástí runtime tokenů varianty 09.
- Technický oddělovač v bočním sloupci: čistá jemná linka v barvě `border-border` (`h-px w-full`), bez textu a bez symbolů.

---

## 7. Animace a pohyb

- Portál používá pouze krátké věcné animace: žádné pružinové (bounce/elastic) přechody a nic delšího než **600 ms** kromě swipe indikátoru, jehož trvání je dáno intervalem střídání.
- Definice jsou v `app/globals.css` jako `--animate-*` tokeny v `@theme`:

| Token | Klíčové snímky | Trvání / easing | Kde se používá |
| :--- | :--- | :--- | :--- |
| `animate-reveal-up` | `reveal-up`: `opacity 0` + `translateY(12px)` → `opacity 1` + `none` | 420 ms, ease-out, `both` | položky sekce „Informace o fakultě“ (stagger 70 ms dle indexu) |
| `animate-faculty-slide-up` | `faculty-slide-up`: `opacity 0` + `translateY(16px)` → `opacity 1` + `none` | 360 ms, ease-out | rotující widget „Informace o fakultě“ v bočním sloupci |

- Animace se spouštějí remountem přes React `key` při změně položky, nikoliv ručním přepínáním tříd.
- `prefers-reduced-motion: reduce` MUSÍ vypnout všechny animace i přechody (globální media query v `app/globals.css`).
- Hover efekty zůstávají v rozsahu 150–300 ms a NESMÍ měnit layout (povoleno je pouze `transform`, `opacity`, `color`, `border-color`, `background-color`).

---

## 8. Šablona pro články bez obrázku

- Článek bez `imageUrl` NESMÍ vykreslovat rozbitý `<img>` ani prázdný blok; MUSÍ použít šablonu z `components/portal/ArticleMedia.tsx`.
- Šablona: poměr **16:9**, podklad navy `#081d3d` s dlaždicovým motivem (rhombus grid) v cyan linii `rgba(39,208,208,0.10)`, uprostřed ikona `Cpu` a mono popisek `Article.categoryLabel` v cyan.
- Podklad je definován jednou v `app/globals.css` ve třídě `.article-media-placeholder` – komponenty NESMÍ obsahovat data URI ani duplikovat tuto kresbu.
- Šablona se používá na všech místech, kde se zobrazuje náhled: hero, karta článku, cyklovač v bočním sloupci i detail článku.
- Motiv čipu je zde povolen: jde o dekoraci obsahu, nikoliv o brand mark ikon (§5).

---

## 9. Stylování patičky pro světlý a tmavý režim

+- Patička portálu MUSÍ plně respektovat přepínač motivů a nesmí zůstávat natvrdo tmavá ve světlém režimu:
+-   **Tmavý režim (Dark mode):** podklad `dark:bg-[#050724]`, linky `dark:border-white/10`, nadpisy `dark:text-white`, text `dark:text-neutral-300` a `dark:text-neutral-400`, hover akcent `dark:hover:text-fel-cyan`.
+-   **Světlý režim (Light mode):** podklad `bg-white`, linky `border-neutral-200`, nadpisy `text-neutral-900`, text `text-neutral-600` a `text-neutral-500`, hover akcent `hover:text-fel-blue`.
