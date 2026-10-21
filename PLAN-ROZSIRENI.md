# Plán rozšíření portálu Polovodiče podle drátového modelu

> Zdroj pravdy pro obsahovou architekturu: `analyza-dratoveho-modelu-webu.md`.
> Zdroj pravdy pro vizuální identitu: `rules/theme.md` – **design systém se nemění** (tokeny Green Silicon, IBM Plex, border-driven depth, 4/8px grid, light/dark). Rozšiřujeme pouze informační architekturu, sekce a datové entity.

---

## 1. Východiska: co máme vs. co model požaduje

### Současný stav (zůstává)
- **Homepage:** `#informace-tydne` (hero 8:4 + cyklovač „Další články“ + rotující widget fakulty) → „Ostatní novinky“ (dropdown filtr + 3×1) → „Informace o fakultě“ (2×2).
- **Archiv** `/zpravy` (dvě sekce, hledání) a **detail článku** `/zpravy/[slug]`.
- Entity: `Article` (7 kategorií vč. `academic`), mock data v `data/mock-data.ts`, plná lokalizace CZ/EN.

### Co model přidává
| Oblast z modelu | Stav dnes | Cíl |
| :--- | :--- | :--- |
| Rozcestník cílových skupin (studenti, výzkumníci, veřejnost, partneři, média) | chybí | nová homepage sekce |
| Newsletter | chybí | homepage blok (mockup formulář) |
| Nadcházející akce na homepage (1–2) | chybí | nová homepage sekce |
| **Akce** – přehled + filtr typu | chybí | nová stránka `/akce` |
| **Projekty** – mřížka + filtr fakulty + detail; **projektové výzvy** | chybí | nová stránka `/projekty` |
| **Vzdělávání** – studijní program, příležitosti, letní školy, FAQ | chybí | nová stránka `/vzdelavani` |
| **O nás** – kontakty, partneři, historie (časová osa) | chybí | nová stránka `/o-nas` |
| **Medailonky** v Novinkách | chybí | `/zpravy/medailonky` + detail |
| Hlavní navigace do 5 sekcí | navbar bez středových odkazů | navbar + patička rozšíří |
| Nové entity: **Akce, Projekt, Projektová výzva, Medailonek** | jen `Article` | nové typy + mock data |

---

## 2. Rozhodnutí a jejich zdůvodnění (k potvrzení uživatelem)

1. **URL Novinek:** zůstává `/zpravy` (existující archiv i detaily, SEO, nasazení). Medailonky budou na `/zpravy/medailonky`. Model uváděl `/novinky/medailonky` s poznámkou „ověřit při implementaci“ – nemigrujeme, zachováváme konzistenci.
2. **Letní školy = typ entity Akce** (`type: "summer-school"`). Jeden záznam sdílený oběma sekcemi: Akce ho zobrazí ve filtru, Vzdělávání/„Letní školy“ ho vypíše podmnožinou. Odpovídá rozhodnutí č. 3 z analýzy §11.
3. **Cílové skupiny** jsou navigační rozcestník na homepage, interní značka každého článku (`Article.audience`) a zároveň `audience` filtr u Akcí a Výzev. Podstránky `/pro-koho/[audience]` jsou sekcí zpráv a zobrazují pouze články s danou značkou (`rules/layout.md` §2.18).
4. **Historie** řadí položky podle data události/konání (`startsAt`), při absenci podle `publishedAt`. Položkou osy může být: událost (Akce), projekt, medailonek, článek – filtr typu přepíná sadu.
5. **Fakulty/součásti:** jednotný číselník v `types/portal.ts` (`FacultyUnit`). Projekt/výzva má právě **jednu** hlavní součást (zjednodušení mockupu; více součástí lze doplnit později bez redesignu).
6. **Stav projektu:** `"preparation" | "running" | "completed"` – zobrazuje se jako čistý text metadat bez rámečkových badge boxů (`rules/theme.md` §10).
7. **Kontakt** u projektů/výzev: jednoduchý objekt `{ name, email, department }`, ne samostatná entita osoby.
8. **Newsletter:** mockup bez poskytovatele – formulář s lokálním success stavem, bez odesílání. Poskytovatele (rozhodnutí č. 7) řeší až produkční fáze; plán ho nepředjímá.
9. **Správa obsahu:** mimo rozsah mockupu – vše zůstává na mock datech ve statickém exportu.

---

## 3. Cílová architektura stránek

```
/                        Homepage (hero → rozcestník cílových skupin → ostatní novinky
│                        → nadcházející akce → informace o fakultě → newsletter)
├── /zpravy              Archiv článků (beze změny struktury)
│   ├── /zpravy/[slug]   Detail článku (beze změny)
│   └── /zpravy/medailonky          Přehled medailonků
│       └── /zpravy/medailonky/[slug]  Detail medailonku
├── /pro-koho/[audience] Podstránky cílových skupin – pouze články s danou značkou
├── /akce                Přehled akcí (filtr typu + list)
├── /projekty            Mřížka projektů (filtr fakulty/součásti) + blok výzev
│   └── /projekty/[slug] Detail projektu / výzvy
├── /vzdelavani          Studijní program, příležitosti, letní školy, FAQ
└── /o-nas               Kontakty, partneři, historie (časová osa s filtrem typu)
```

Vše staticky exportovatelné (`generateStaticParams` u všech `[slug]` i `[audience]`).

---

## 4. Fáze implementace (Rules-First)

> Každá fáze = nejdřív úprava uvedených souborů v `rules/`, křížová kontrola, teprve potom kód. Po dokončení fáze se její akceptační kritéria zapíší do `PLAN.md` jako **Dokončená změna**; v `PLAN.md` je vždy pouze **jedna** „Aktuální změna“ (ta, na které se právě pracuje).

### Fáze 0 – Datová vrstva a typy (základ pro všechno)
- **Rules:** `rules/technologie.md` §3 (nová schémata), §10 „Datové entity rozšířeného portálu“.
- **Kód:**
  - `types/portal.ts`: `Article` (`audience: [Audience, ...Audience[]]`), `PortalEvent` (`type: "event" | "conference" | "summer-school"`, `location`, `startsAt`, `endsAt`, `imageUrl?`, `title`, `perex`, `audience: Audience[]`, `registrationUrl?`, `en?`), `Project` (`imageUrl?`, `title`, `description`, `status`, `unit: FacultyUnit`, `audience: Audience[]`, `contact`, `outputs: string[]`), `ProjectCall` (`imageUrl?`, `title`, `description`, `audience`, `conditions`, `deadline`, `contact`, `unit`), `Profile` (medailonek: `photoUrl?`, `name`, `publishedAt`, `title`, `content`, `audience: Audience[]`, `en?`), `Partner` (`name`, `url`), `Audience`, `FacultyUnit`, `ProjectStatus`.
  - `data/mock-data.ts`: vzorová data (min. 6 akcí, 6 projektů, 3 výzvy, 4 medailonky, 6 partnerů) – CZ i EN.
  - `lib/api.ts`: `getEvents(filter?)`, `getUpcomingEvents(limit)`, `getProjects(unit?)`, `getProjectCalls()`, `getProfiles()`, `getTimelineItems(type?)`, `getArticlesByAudience(audience)`.
  - `lib/i18n.ts`: klíče pro všechny nové sekce.
- **Kritéria:** typy přesně odpovídají atributům entit z analýzy §9; všechny záznamy mají EN překlad; build projde beze změny homepage.

### Fáze 1 – Homepage: rozcestník, akce, newsletter
- **Rules:** `rules/layout.md` §1 (nový diagram pořadí sekcí), §2.10 rozcestník, §2.11 nadcházející akce, §2.12 newsletter; `rules/theme.md` – žádné nové tokeny, jen mapování na stávající.
- **Kód:** `components/portal/AudienceGateway.tsx`, `UpcomingEvents.tsx`, `NewsletterSection.tsx`; úprava `app/page.tsx` (pořadí: Informace týdne → **Rozcestník** → Ostatní novinky → **Nadcházející akce (1–2)** → Informace o fakultě → **Newsletter**).
- **Kritéria:** 5 karet rozcestníku (studenti/výzkumníci/veřejnost/partneři/média) s krátkým popisem a odkazem na `/pro-koho/<slug>`; 1–2 nejbližší akce; newsletter formulář s lokálním potvrzením; zachován limit 3×1 a 2×2; CLS = 0; CZ/EN.

### Fáze 2 – Sekce Akce `/akce`
- **Rules:** `rules/layout.md` (nová podstránka: záhlaví, filtr typu, list), `rules/technologie.md` (routa, `generateStaticParams` n/a – jediná stránka).
- **Kód:** `app/akce/page.tsx` + `components/portal/EventsClient.tsx` (filtr typu: událost/konference/letní škola; karta akce: foto, datum od–do, místo, název, cílovka, odkaz/registrace).
- **Kritéria:** filtr typu funguje nad mock daty; letní školy mají proklik i ze Vzdělávání; registrace vede na `registrationUrl`; CZ/EN; responzivní dle §3.2.

### Fáze 3 – Sekce Projekty `/projekty`
- **Rules:** `rules/layout.md` (mřížka projektů, filtr součástí, blok výzev, detail), `rules/theme.md` (čistý text stavu projektu bez badge boxů), `rules/technologie.md` (`generateStaticParams`).
- **Kód:** `app/projekty/page.tsx` + `ProjectsClient.tsx` (dropdown filtr fakulty/součásti, mřížka karet), blok výzev na téže stránce, `app/projekty/[slug]/page.tsx` (detail projektu i výzvy – atributy dle analýzy §5).
- **Kritéria:** filtr jednotného číselníku součástí; detail zobrazuje všechny atributy vč. kontaktu a výstupů/podmínek a deadlinu; statický export projde.

### Fáze 4 – Sekce Vzdělávání `/vzdelavani`
- **Rules:** `rules/layout.md` (4 bloky: Studijní program, Příležitosti, Letní školy, FAQ), `rules/technologie.md`.
- **Kód:** `app/vzdelavani/page.tsx` + `EducationClient.tsx`; „Letní školy“ vypisuje `getEvents({ type: "summer-school" })` (sdílená entita s Akcemi); FAQ jako akordeon.
- **Kritéria:** všechny 4 podčásti na stránce; letní školy korespondují s `/akce`; FAQ plně lokalizované.

### Fáze 5 – Sekce O nás `/o-nas`
- **Rules:** `rules/layout.md` (Kontakty, Partneři, Historie – časová osa s filtrem typu obsahu), `rules/technologie.md` (timeline agregace).
- **Kód:** `app/o-nas/page.tsx` + `AboutClient.tsx` (agregace Akce/Projekty/Medailonky/Články → jednotné `TimelineItem`, filtr typu, řazení dle data), mřížka partnerů jako čisté textové odkazy.
- **Kritéria:** osa umí přepínat události/projekty/medailonky/články; položky odkazují do příslušných detailů; kontaktní blok dle rozhodnutí č. 7.

### Fáze 6 – Medailonky `/zpravy/medailonky`
- **Rules:** `rules/layout.md` (přehled + detail medailonku v rámci Novinek), `rules/technologie.md` (routy, `generateStaticParams`).
- **Kód:** `app/zpravy/medailonky/page.tsx`, `app/zpravy/medailonky/[slug]/page.tsx`, `ProfilesClient.tsx`, `ProfileDetailClient.tsx`; vstup z archivu `/zpravy` (odkaz „Medailonky“).
- **Kritéria:** karta medailonku = foto, jméno, datum, název; detail obsahuje celý text; CZ/EN; odkaz z archivu funguje obousměrně.

### Fáze 7 – Navigace a patička (hierarchie celého webu)
- **Rules:** `rules/layout.md` §2.1 (**úprava pravidla**: navbar dostává středové odkazy na 5 sekcí – dosavadní zákaz se ruší pro desktop, mobil řeší hamburger/dropdown), §2.6 (patička: kontakty + sociální sítě + odkazy na všech 5 sekcí).
- **Kód:** `components/layout/Navbar.tsx` (desktop: Novinky, Akce, Projekty, Vzdělávání, O nás; mobil: sbalené menu), `components/layout/Footer.tsx` (blok kontaktů, sociální sítě, navigační sloupec sekcí).
- **Kritéria:** aktivní stav položky dle routy; mobil bez horizontálního scrollu; patička respektuje light/dark dle stávajících pravidel.

### Fáze 8 – Metadata, SEO a finální konzistence
- **Rules:** `rules/technologie.md` §7 (metadata nových rout – titulky `%s - Polovodiče`, česky i pro `/pro-koho/[audience]`).
- **Kód:** metadata v nových `page.tsx`, aktualizace `PLAN.md`, `DEPLOY.md` (nové routy v akceptačních kritériích nasazení), README.
- **Kritéria:** všechny staticky generované routy (`/akce`, `/projekty`, `/projekty/[slug]`, `/vzdelavani`, `/o-nas`, `/zpravy/medailonky…`, `/pro-koho/[audience]`) vrací 200 po statickém exportu; 404 zachován.

---

## 5. Co se záměrně NEMĚNÍ

- Design systém (tokeny, typografie, motiv Green Silicon, light/dark, animace).
- Struktura homepage sekcí „Informace týdne“, „Ostatní novinky“ (3×1, dropdown filtr), „Informace o fakultě“ (2×2 + rotující widget v railu) – nové bloky se vkládají mezi ně dle Fáze 1.
- Archiv `/zpravy` a detail článku včetně pravidla NO FLAGS a dvousekčního rozdělení. Podstránky `/pro-koho/[audience]` archiv znovupoužívají se zúženou sadou článků (`rules/layout.md` §2.18), archiv samotný se nemění.
- Statický export, Cloudflare Pages, ikonový systém, lokalizační architektura (`lib/i18n.ts`).

## 6. Otevřené body k potvrzení (z analýzy §11)

- Poskytovatel newsletteru a produkční způsob přihlašování (mockup = lokální stav).
- Finální číselník fakult/součástí ČVUT (nyní placeholder v `FacultyUnit`).
- Zda medailonky zahrnout i do fulltextového hledání v `CommandMenu` (výchozí: ano, jako samostatná skupina výsledků).
- Sociální sítě v patičce – konkrétní kanály fakulty/programu EK.
