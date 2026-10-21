# Technologický stack & Architektura: Polovodiče (`technologie.md`)

> **Specifikace moderního technologického stacku v TypeScriptu a Reactu pro informační portál Polovodiče.**
> Tento dokument definuje runtime, framework, knihovny, typový systém, adresářovou strukturu a inženýrské standardy pro produkční implementaci.

---

## 1. Přehled technologického stacku

| Oblast | Vybraná technologie | Verze / Specifikace | Důvod volby & Přínos pro portál |
| :--- | :--- | :--- | :--- |
| **Jazyk** | **TypeScript** | **5.8+ (Strict Mode)** | 100% typová bezpečnost, explicitní datové modely pro články, polovodičové parametry a burzovní indexy. |
| **Framework** | **Next.js (App Router)** | **15.x (React 19)** | Standard pro moderní informační portály. Server Components pro bleskový TTFB a SEO, Client Components pro interaktivní widgety. |
| **UI Knihovna** | **React** | **19.x** | Komponentový model, Server/Client split, React Server Actions. |
| **Stylování** | **Tailwind CSS** | **v4.x (`@tailwindcss/postcss`)** | Moderní engine, CSS proměnné integrované s design tokens ČVUT FEL a Vercel Geist principy. |
| **Typografie** | **IBM Plex Sans & Mono** | `@fontsource/ibm-plex-*` | Lokálně hostovaná písma bez externích Google Fonts závislostí (GDPR ready, nulová latence, plná česká diakritika). |
| **Ikony** | **Lucide React** | `^1.16+` | Vektorové ikony s technickou geometrií. |
| **Téma (Dark/Light)** | **next-themes** | `^0.4+` | Bezzásahové přepínání témat s perzistencí v `localStorage` a prevencí probliknutí (Zero FOUC). |
| **UI Utilities** | **clsx + tailwind-merge** | `cn()` helper | Bezpečné spojování a podmiňování Tailwind tříd bez konfliktů. |
| **Vývojové prostředí** | **Node.js / Bun** | Node 24 LTS / Bun 1.4 | Rychlá instalace, bleskový bundler a stabilní build proces. |

---

## 2. Architektonické rozdělení (RSC – React Server vs. Client Components)

…

---

## 3. Typový systém (TypeScript Core Schemas)

Všechna data portálu jsou striktně typována v souboru `types/portal.ts`:

### 3.1 Datový model článku a polovodičových parametrů
```typescript
export type ArticleCategory =
  | "chips"
  | "materials"
  | "power-elec"
  | "embedded"
  | "quantum"
  | "industry"
  | "academic";

export interface ArticleTranslation {
  title: string;
  perex: string;
  content: string;
  categoryLabel: string;
  imageAlt?: string;
  authorTitle?: string;
  authorDepartment?: string;
  tags?: string[];
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  perex: string;
  content: string;
  category: ArticleCategory;
  categoryLabel: string;
  imageUrl?: string;
  imageAlt?: string;
  publishedAt: string;
  readTimeMinutes: number;
  author: { name: string; title: string; department: string; avatarUrl?: string };
  featured?: boolean;
  specs?: SemiconductorSpecs;
  tags: string[];
  audience: [Audience, ...Audience[]];
  en?: ArticleTranslation;
}
```

### 3.2 Kontrakt čistého vyhledávání
- Vyhledávání v `components/ui/CommandMenu.tsx` používá `ArticleCategory` jako jediný tematický filtr.
- Filtry jsou odvozeny z těchto kategorií: `all`, `chips`, `materials`, `power-elec`, `embedded`, `quantum`, `industry`, `academic`.
- Textový dotaz se vyhodnocuje pouze proti `Article.title`, aby výsledek odpovídal čistému seznamu nadpisů.
- Výsledky zobrazují pouze `Article.title` a `Article.publishedAt`; nesmí obsahovat `perex`, `categoryLabel`, `tags`, `specs.material` ani tematické odznaky.
- Výchozí stav bez dotazu a bez filtru zobrazuje nejvýše 4 články; aktivní filtr zobrazí články dané kategorie.

---

## 4. Adresářová struktura

Stávající struktura zůstává zachována; `components/ui/CommandMenu.tsx` je klientský interaktivní dialog a používá sdílený typ `ArticleCategory`.

---

## 5. Znovupoužitelný Helper pro třídy (`lib/utils.ts`)

Stávající `cn()` helper a ostatní inženýrské standardy zůstávají beze změny.

---

## 6. Nasazení (Deployment) – Cloudflare Pages

- Cílový hosting je **Cloudflare Pages**, projekt s názvem **`polovodice-mockup`**.
- Portál je mockup bez serverové logiky, proto se nasazuje jako **statický export**: `next.config.ts` má `output: "export"` a `images.unoptimized: true`.
- Konfigurace projektu je v `wrangler.toml` (`name = "polovodice-mockup"`, `pages_build_output_dir = "./out"`); Wrangler ji bere jako zdroj pravdy a soubor brání automatické konfiguraci pro Workers.
- Build příkaz: `bun run build`; výstupní adresář: `out/`.
- Deploy: `wrangler pages deploy out` (přes `bun run deploy`, který nejdřív spustí build).
- Veškeré routy MUSÍ zůstat staticky generovatelné (`generateStaticParams` u `app/zpravy/[slug]`); dynamické API routy, middleware ani server components závislé na requestu nejsou povoleny.
- Návod krok za krokem je v `DEPLOY.md`; po změně hostingu nebo názvu projektu se MUSÍ současně aktualizovat `DEPLOY.md`, tento soubor a `PLAN.md`.
- Projekt Pages se zakládá přes `bunx wrangler pages project create polovodice-mockup --production-branch main --force`; bez `--force` se Wrangler pokusí delegovat nasazení na Cloudflare Workers přes OpenNext, přepíše `package.json` a přidá závislost `@opennextjs/cloudflare`.
- V kořeni projektu se NESMÍ nacházet `wrangler.jsonc`, `open-next.config.ts`, `cloudflare-env.d.ts` ani `.open-next/` — jde o artefakty Workers varianty, které rozbíjejí `wrangler pages deploy`.
- Cloudflare Pages servíruje cesty bez přípony ze souborů `*.html`; požadavek na `*.html` vrací `308` redirect. Soubor `out/404.html` se používá jako stránka pro neexistující adresy.
- Zvolený postup odpovídá oficiální dokumentaci: [Next.js static site na Pages](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/). Pro full-stack Next.js Cloudflare doporučuje vinext na Workers, což se tohoto mockupu netýká.

---

## 7. Metadata prohlížeče, ikony a webový manifest

- Veškeré ikony jsou **statické soubory v `public/icons/`**; zdrojem pravdy je inventář v `rules/theme.md` §5.3.
- Projekt je statický export (`output: "export"`), proto se **NEPOUŽÍVAJÍ** konvenční metadata routes Next.js (`app/icon.tsx`, `app/apple-icon.tsx`, `app/manifest.ts`, `app/opengraph-image.tsx`). Vše se deklaruje datově v `app/layout.tsx`.
- `app/layout.tsx` MUSÍ deklarovat:
  - `metadata.manifest` → `/icons/manifest.webmanifest`,
  - `metadata.icons` s `icon` (SVG s `sizes: "any"` + PNG s přesnými velikostmi), `apple` (180×180) a `other` s `rel: "mask-icon"` na `safari-pinned-tab.svg`; klíč `shortcut` se nepoužívá,
  - `metadata.other` s `msapplication-config` a `msapplication-TileColor`,
  - `viewport.themeColor` pro tmavý (`#081d3d`) i světlý (`#edfff9`) režim.
- **Lokalizace metadat:** statický export neumožňuje měnit `<title>` a `description` podle klientského přepínače jazyka. Metadata všech rout jsou proto **česky** (zdroj: `generateMetadata()` v příslušné `page.tsx`) a jazykový přepínač mění pouze obsah stránky. Tento stav je záměrný, nikoliv chyba hydratace.
- **Zkrácená metadata portálu:**
  - Titulek: `title: "Polovodiče - Informační deník ze světa elektroniky"` (hlavní nadpis Polovodiče, šablona `%s - Polovodiče` pro podstránky, oddělovač pomlčka `-` bez `//`).
  - Popis: `description: "Informační deník ze světa elektroniky"`.
- **Deklarace ikon MUSÍ být jednoznačná. Konkrétně:**
  - `sizes: "any"` smí být **pouze** u vektorového SVG. U pevně velikého `.ico` by prohlížeč považoval kandidáta za vhodného pro všechny velikosti a přepnul by na něj i tehdy, když má k dispozici novější SVG (projeví se jako „blikne nová ikona a pak naskočí stará“).
  - `icons.shortcut` (rel `shortcut icon`) se **nepoužívá** – jen duplikuje kandidáta na `/favicon.ico` a zvyšuje nejednoznačnost.
  - `/favicon.ico` zůstává na disku pro implicitní požadavek starších agentů, ale **NESMÍ být v `metadata.icons` deklarován** (jeho cesta nejde cache-bustovat).
  - Pořadí kandidátů: SVG se `sizes: "any"` první, pak PNG s přesnými velikostmi.
- Ikony se cachují **1 hodinu** (`/icons/*` i `/favicon.ico` v `public/_headers`). Ikony se mění při rebrandu, proto se u nich nepoužívá dlouhé `max-age` – delší TTL znamená, že prohlížeč i po nasazení drží staré bajty.
- Ověření po změně ikon: v HTML musí být právě jeden `<link rel="icon" ... sizes="any">` (u SVG) a žádný `rel="icon"` na `/favicon.ico`; starou ikonu v záložce může držet lokální cache prohlížeče a projeví se i po korektním nasazení (řeší se tvrdým reloadem nebo anonymním oknem).
- `public/icons/manifest.webmanifest` je platný JSON s klíči `name`, `short_name`, `description`, `lang: "cs"`, `dir`, `start_url`, `scope`, `display: standalone`, `background_color`, `theme_color` a `icons` s `purpose: any` i `purpose: maskable`.
- `public/icons/browserconfig.xml` odkazuje na `mstile-150x150.png` a používá `TileColor #ffffff` (shodně s `background_color` manifestu, viz `rules/theme.md` §5.5).
- `public/_headers` MUSÍ cachovat cestu `/icons/*`.
- Adresy ikon jsou absolutní cesty začínající `/icons/`, aby fungovaly jak na Cloudflare Pages, tak při nasazení do kořene školního serveru či WordPress šablony.
- `public/favicon.ico` je kopie `public/icons/favicon.ico` v kořeni, která pokrývá implicitní požadavek na `/favicon.ico` u prohlížečů i serverů bez přepisovacích pravidel.
- Geometrie brand marku odpovídá **oficiálnímu znaku** z `public/felcvut-logo-blue.svg` (ořez na čtvercovou znakovou část `0 0 64 64`). SVG zdroje v `public/icons/` obsahují obsah loga verbatim a jsou ručně udržované soubory; mark se za běhu negeneruje.
- Změna kteréhokoliv souboru v `public/icons/` vyžaduje současnou aktualizaci `rules/theme.md` §5 a `PLAN.md`.

---

## 8. Datová vrstva: Informace o fakultě a homepage

- Zprávy o fakultě (letní škola, dny otevřených dveří, přijímací řízení, stáže, stipendia, konference) jsou standardní `Article` s `category: "academic"`. MUSÍ mít vyplněný `slug`, `perex`, `publishedAt` a `author` (obrázek je volitelný, viz §9), aby fungoval detail `/zpravy/[slug]`, archiv i vyhledávání.
- Každý `Article` MUSÍ mít vyplněné `audience: [Audience, ...Audience[]]` – interní značku cílových skupin, pro které je zpráva určena. Značka je povinná i pro články o fakultě; neprázdné pole vynucuje typ, takže článek bez skupiny nelze publikovat ani zobrazit na `/pro-koho/[audience]` (`rules/layout.md` §2.18).
- `getArticlesByAudience(audience: Audience)` vrací články obsahující danou skupinu v poli `audience`, v pořadí `MOCK_ARTICLES` – tedy shodně s archivem bez dalšího řazení.
- `lib/api.ts` MUSÍ poskytovat `getFacultyNews(limit?)`: vrací články kategorie `academic` seřazené podle priority (nejdůležitější první), volitelně oříznuté na `limit`, a to ve **zúženém typu `FacultyNewsItem`** (`types/portal.ts`) bez plného textu článku – do klientských komponent se nesmí přenášet `content`.
- Homepage MUSÍ pracovat se dvěma oddělenými sadami:
  - `facultyNews` = `getFacultyNews()` – pro sekci „Informace o fakultě“ a pro rail widget,
  - `editorialArticles` = `getEditorialArticles()` (tj. `getArticles()` **bez** kategorie `academic`) – pro hero, cyklovač „Další články“ a mřížku „Ostatní novinky“.
- `getCategoryCounts(articles?)` MUSÍ umět spočítat počty nad předanou sadou, aby počítadla filtrů odpovídala tomu, co mřížka skutečně umí zobrazit (`rules/layout.md` §2.4). Bez argumentu počítá přes celý archiv.
- Podstránka archivu `/zpravy` v `NewsArchiveClient.tsx` rozděluje výpis článků do dvou samostatných sekcí: **Všeobecné informace** (`category !== "academic"`) a **Informace o fakultě** (`category === "academic"`). Filtry rubrik a materiálů jsou dočasně odstraněny, vyhledávací pole používá placeholder `Hledat...` a filtruje obě sekce současně.
- Všechny články v `data/mock-data.ts` mají kompletní anglický překlad v objektu `en` (`ArticleTranslation`) a v `lib/api.ts` / `types/portal.ts` je součástí i `FacultyNewsItem`.
- Klientské komponenty (`HeroFeature`, `ArticleCard`, `EditorialSidebar`, `FacultyNews`, `NewsArchiveClient`, `ArticleDetailClient`, `CommandMenu`, `CookieBanner`) přepínají jak veškeré popisky UI, tak i obsah článků do angličtiny při `language === "en"`.
- Komponenta `components/portal/SectionTemplate.tsx`, podstránky `app/udalosti/page.tsx` a `app/servis/page.tsx` i komponenta `components/portal/EventList.tsx` jsou smazány. Sekci o fakultě zajišťuje `components/portal/FacultyNews.tsx` (`FacultyNewsSection` a `FacultyNewsRail`).

---

## 9. Volitelné obrázky článků a sdílená media komponenta

- V typu `Article` jsou `imageUrl` a `imageAlt` **volitelné** (`imageUrl?: string`), protože redakce nemusí mít u každé zprávy fotografii.
- Všechna místa zobrazující náhled článku (hero, `ArticleCard`, cyklovač v `EditorialSidebar`, detail `/zpravy/[slug]`) MUSÍ použít `components/portal/ArticleMedia.tsx`. Přímé `<img src={article.imageUrl}>` je zakázané.
- `ArticleMedia` vykresluje buď `<img>` (hero s `loading="eager"`, ostatní `loading="lazy"`), nebo šablonu podle `rules/theme.md` §8; `alt` je prázdný, pokud článek popis nemá.
- Rotující widget „Informace o fakultě“ potřebuje **celý seznam** z `getFacultyNews()`, protože zobrazuje jednu položku, ale střídá je mezi sebou. Stránka proto NESMÍ tento seznam ořezávat – ořez je jen vizuální (vždy 1 položka najednou).
- Sekce „Informace o fakultě“ zobrazuje první **4** položky (2 × 2) – ořez se děje v komponentě sekce (`rules/layout.md` §2.5).
- `TopicHubs` používá univerzální rozbalovací menu (dropdown) na všech zařízeních (`TopicHubs.tsx`), viz `rules/layout.md` §2.4.
- Ikona `Cpu` v šabloně bez obrázku je dekorace obsahu, nikoliv brand mark – pravidla pro ikony prohlížeče (`rules/theme.md` §5) se jí netýkají.

---

## 10. Datové entity rozšířeného portálu (Akce, Projekty, Výzvy, Medailonky, Partneři)

Podle `analyza-dratoveho-modelu-webu.md` a `PLAN-ROZSIRENI.md` se typový systém v `types/portal.ts` rozšiřuje o pět entit a sdílené číselníky. Atributy přesně odpovídají analýze §9.

### Číselníky
```typescript
export type Audience = "students" | "researchers" | "public" | "partners" | "media";
export type EventType = "event" | "conference" | "summer-school";
export type ProjectStatus = "preparation" | "running" | "completed";
export type FacultyUnit = "fel" | "kme" | "fjfi" | "fd" | "external";
```
- `Audience` slouží zároveň jako hodnoty rozcestníku cílových skupin na homepage, jako filtr u Akcí a Výzev a jako **povinná interní značka každého článku** (`Article.audience`).
- `FacultyUnit` je dočasný placeholder číselníku fakult/součástí (finální sjednocení je otevřený bod); projekt/výzva má právě jednu hlavní součást.
- Letní škola je `Event` s `type: "summer-school"` – jeden záznam sdílený sekcemi Akce i Vzdělávání.

### Entity
```typescript
export interface ContactPerson { name: string; email: string; department: string; }

export interface PortalEvent {
  id: string; slug: string; type: EventType;
  title: string; perex: string; location: string;
  startsAt: string;           // ISO "2026-11-12" (zdroj pro řazení i formátování)
  endsAt?: string;            // ISO
  imageUrl?: string; imageAlt?: string;
  audience: Audience[]; registrationUrl?: string;
  en?: { title: string; perex: string; location: string; imageAlt?: string };
}

export interface Project {
  id: string; slug: string; title: string; description: string;
  status: ProjectStatus; unit: FacultyUnit;
  audience: Audience[];
  contact: ContactPerson; outputs: string[];
  imageUrl?: string; imageAlt?: string; startsAt?: string; endsAt?: string;
  en?: { title: string; description: string; outputs?: string[]; imageAlt?: string };
}

export interface ProjectCall {
  id: string; slug: string; title: string; description: string;
  audience: Audience[]; conditions: string[]; deadline: string;
  contact: ContactPerson; unit: FacultyUnit;
  imageUrl?: string; imageAlt?: string;
  en?: { title: string; description: string; conditions?: string[]; imageAlt?: string };
}

export interface Profile { // Medailonek
  id: string; slug: string; name: string; title: string; content: string;
  publishedAt: string; photoUrl?: string; photoAlt?: string;
  audience: Audience[];
  en?: { title: string; content: string; photoAlt?: string };
}

export interface Partner { id: string; name: string; url: string; }

export interface TimelineItem {
  kind: "event" | "project" | "profile" | "article";
  id: string; title: string; date: string; sortDate: string; href: string;
}
```

### API vrstva (`lib/api.ts`)
- `getEvents(filter?: { type?: EventType | "all" })` – akce řazené vzestupně podle `startsAt`.
- `getUpcomingEvents(limit = 2)` – nejbližší akce od dnešního data (pro homepage).
- `getProjects(unit?: FacultyUnit | "all")`, `getProjectCalls()`, `getProjectBySlug(slug)`, `getProjectCallBySlug(slug)`.
- `getProfiles()`, `getProfileBySlug(slug)`, `getPartners()`.
- `getTimelineItems(kind?)` – agregace Akcí, Projektů, Medailonků a Článků do jednotného `TimelineItem[]` řazeného sestupně podle `sortDate`; u článků se `sortDate` parsuje z českého formátu `publishedAt` (`DD. MM. YYYY`).
- `getArticlesByAudience(audience: Audience)` – vrací pouze články s danou skupinou v `audience`, v pořadí `MOCK_ARTICLES` (shodné s archivem); zdroj pro podstránky `/pro-koho/[audience]`.
- `AUDIENCE_SLUGS` a `AUDIENCE_ORDER` jsou definované v `lib/audiences.ts` (bez importu mock dat, aby je šlo použít i v klientských komponentách) a mapují české URL slugy na interní identifikátory cílových skupin: `studenti` -> `students`, `vyzkumnici` -> `researchers`, `verejnost` -> `public`, `partneri` -> `partners`, `media` -> `media`.
- Formátování data akce z ISO probíhá v klientských komponentách podle aktivního jazyka (`cs`: `12. 11. 2026`, `en`: `November 12, 2026`).

### Routy
- `/akce` (přehled + filtr typu), `/projekty` (mřížka + filtr součástí + výzvy), `/projekty/[slug]` (detail projektu i výzvy), `/vzdelavani`, `/o-nas`, `/zpravy/medailonky`, `/zpravy/medailonky/[slug]`, `/pro-koho/[audience]` (podstránky cílových skupin ve stylu archivu zpráv – pouze články s interní značkou dané skupiny a sub-menu všech pěti skupin).
- Všechny `[slug]` i `[audience]` routy MUSÍ mít `generateStaticParams` odvozené z příslušných getterů a mapování; statický export zůstává povinný.
