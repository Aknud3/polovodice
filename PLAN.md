# Implementační plán: Polovodiče – Informační portál pro elektroniku a polovodiče ČVUT FEL (Program EK)

## Aktuální změna: příbuzná barevná identita

Polovodiče zůstávají ve vizuální rodině ČVUT FEL, ale nesmí působit jako kopie hlavního fakultního webu. Katalog obsahuje 10 barevných variant s viditelnou odchylkou až přibližně 20 % od referenčních FEL tokenů. Varianty zachovávají navy základ, elektrickou modř, cyan akcent, IBM Plex Sans/Mono a vysoký kontrast.

- Specifikace tokenů: `rules/theme.md`
- Výběrový katalog: `lightning-grids.html`
- Po výběru uživatelem se do `app/globals.css` aplikuje pouze vítězná varianta.
- Vybraná varianta: **09 – Green Silicon**; její přesné tokeny jsou zdrojem pravdy pro runtime motiv.
- Ostatní varianty zůstanou v katalogu jako archiv návrhů.

## Původní projektový kontext

Cílem projektu je vytvořit moderní informační portál **Polovodiče** zastřešený programem **Elektronika a komunikace (EK)** Fakulty elektrotechnické ČVUT v Praze. Portál slouží jako informační uzel pro elektroniku, mikroelektroniku, polovodiče, výzkum, studium a související technologický ekosystém.

## Akceptační kritéria této změny

1. Katalog obsahuje 10 variant `01–10`.
2. Každá varianta má light/dark náhled a přesné tokeny.
3. Žádná varianta neopouští barevnou rodinu FEL/ČVUT.
4. Runtime se otevírá v tmavém režimu; light mode zůstává dostupný přes přepínač motivu.

## Aktuální změna: čistý HTML katalog a debugger-friendly zdroj

- `lightning-grids.html` zůstává samostatný katalog bez serveru a bez externího runtime skriptu.
- Zdroj musí mít sémantické HTML, pojmenovaná data variant, oddělené bloky `DATA`, `DOM`, `RENDER`, `EVENTS` a jediný čitelně formátovaný inline script.
- Každá z 10 variant musí zachovat light/dark náhled, přesné tokeny a funkci COPY.

## Lokalizace


## Mobilní UI

Mobilní zobrazení je mobile-first: bez horizontálního scrollu, s jednosloupcovým layoutem, dotykovými ovládacími prvky minimálně 36px vysokými, sbaleným vyhledáváním a responsivním navbar/footer layoutem.

Mobilní hlavička zobrazuje logo ČVUT FEL, název „POLOVODIČE“, podtitul „Informační deník ze světa elektroniky“, ikonové vyhledávání a dostupné přepínače jazyka a motivu. V otevřeném vyhledávání se na mobilu skrývají pouze klávesové nápovědy `ESC`, šipek a `↵`.

## Aktuální změna: nasazení na Cloudflare Pages

- Cíl: veřejně dostupný mockup na Cloudflare Pages pod názvem projektu **`polovodice-mockup`**.
- Režim: statický export Next.js (`output: "export"`), výstup v `out/`.
- Nasazení probíhá přímým uploadem přes Wrangler CLI, protože projekt není git repozitář.
- Postup a ověření je popsáno v `DEPLOY.md`.

### Akceptační kritéria nasazení

1. `bun run build` dokončí statický export bez chyb a vytvoří `out/`.
2. Projekt `polovodice-mockup` existuje na Cloudflare Pages a produkční URL je `https://polovodice-mockup.pages.dev`.
3. Všechny routy (`/`, `/zpravy`, `/zpravy/[slug]`, `/udalosti`, `/servis`) vrací `200`.
4. Neexistující cesta vrací `404` přes `out/404.html`.
5. `DEPLOY.md` obsahuje ověřený postup včetně vytvoření projektu přes `--force`.

### Stav nasazení

- Ověřeno per oficiální dokumentaci Cloudflare: statický Next.js export na Pages je dokumentovaná cesta (`pages_build_output_dir` v `wrangler.toml`).
- Deployment `07b7bdc0-5376-489e-8e3c-1fed38155a34` (Production, branch `main`) proběhl úspěšně 5. 10. 2026 přes `bun run deploy`.
- Uploadnuto 134 souborů (21 nových, 113 z cache); produkční URL `https://polovodice-mockup.pages.dev` vrací `200` na všech routách, neexistující cesta vrací `404`.
- Wrangler při zakládání projektu přepsal `package.json` a přidal `@opennextjs/cloudflare`; stav byl vyčištěn a do kořene přidán `wrangler.toml`, který další delegaci na Workers brání.

## Předchozí oprava sestavení

Po posledním pádu `bun run build` byla lokalizována konkrétní chyba v `components/ui/CommandMenu.tsx`: jeden nadbytečný uzavírací `</div>` na konci dialogu způsobil syntaktickou chybu `Unterminated regexp literal`. Oprava se omezuje na odstranění tohoto elementu.
