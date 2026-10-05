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

export interface Article {
  id: string;
  slug: string;
  title: string;
  perex: string;
  content: string;
  category: ArticleCategory;
  categoryLabel: string;
  imageUrl: string;
  imageAlt: string;
  publishedAt: string;
  readTimeMinutes: number;
  author: { name: string; title: string; department: string; avatarUrl?: string };
  featured?: boolean;
  specs?: SemiconductorSpecs;
  tags: string[];
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
