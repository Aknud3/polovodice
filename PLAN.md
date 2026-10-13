# Implementační plán: Polovodiče – Informační portál pro elektroniku a polovodiče ČVUT FEL (Program EK)

## Aktuální změna: Fakulta jako hlavní sdělení + zpevnění layoutu homepage

Sekce „Informace o fakultě“ se stává nejvýraznějším prvkem portálu. V hero sekci z ní zůstává **jeden rotující** blok, plná sekce se mění na **2 × 2 grid** s větší typografií a animovaným vstupem. Zároveň se zpevňuje layout: obě strany hero sekce končí ve stejné lince, filtry rubrik drží jednu linku za všech šířek, odpadá redundantní CTA i datumový blok v bočním sloupci a články bez fotografie dostávají vlastní šablonu.

- Rozvržení obou instancí, filtry, zarovnání: `rules/layout.md` §1, §2.1, §2.3, §2.4, §2.5, §3.3
- Tokeny, animace a šablona bez obrázku: `rules/theme.md` §6, §7, §8
- Volitelné obrázky a sdílená media komponenta: `rules/technologie.md` §9

### Akceptační kritéria

1. Boční sloupec hero sekce obsahuje **pouze** cyklovač „Další články“ a widget „Informace o fakultě“; datumový blok i blok s odkazem do archivu jsou odstraněny.
2. Widget „Informace o fakultě“ zobrazuje **vždy 1** zprávu, střídá je automaticky po 6 s, nová položka najíždí zdola nahoru (`animate-faculty-slide-up`) a jeho rotující blok má **pevnou výšku** `h-[8.5rem] sm:h-[9.5rem]`. Žádný loading pruh v něm není.
3. Boční sloupec hero sekce na desktopu přesně lícuje se spodní hranou hero článku díky technickému oddělovači (čistá jemná linka bez textu a bez symbolů), který rozbíjí pozornost a vstřebává výškový rozdíl bez deformace karet či obrázků.
4. Sekce `#informace-tydne` nemá žádnou horní nadpisovou lištu („Informace týdne“ ani „Týdenní vydání“) – začíná přímo hlavním 8 : 4 gridem.
5. Plná sekce „Informace o fakultě“ má nadpis `text-2xl sm:text-3xl`, **2 × 2 grid se 4 položkami**, titulky `text-lg sm:text-xl`, levý akcentní pruh panelu a postupné najetí položek (`animate-reveal-up`, stagger 70 ms).
6. „Ostatní novinky“ nezobrazují modré CTA tlačítko a nadpis nemá modrou tečku; odkaz do archivu zůstává pouze v záhlaví.
7. Filtry rubrik v sekci „Ostatní novinky“ mají univerzální rozbalovací menu (dropdown) na mobilu i na desktopu.
8. V navbaru je na telefonu (`< 640px`) skrytý nápis POLOVODIČE, podtitul i dělící čára (zobrazuje se pouze oficiální logo ČVUT FEL); vyhledávací pole má výšku 40 px a na desktopu min. šířka 208 px.
9. Podstránka archivu `/zpravy` nemá odznak „ARCHIV TECHNOLOGICKÉHO ZPRAVODAJSTVÍ“ ani dlouhý popisný odstavec.
10. Filtry rubrik a materiálů v archivu jsou dočasně odstraněny, vyhledávací pole má placeholder „Hledat...“ a zobrazuje se počet nalezených článků.
11. Archiv je rozdělen do **dvou samostatných sekcí**: „Všeobecné informace“ a „Informace o fakultě“, obě filtrované hledáním.
12. `Article.imageUrl`/`imageAlt` jsou volitelné a každý náhled článku bez obrázku vykreslí šablonu `article-media-placeholder`; žádné rozbité `<img>`.
13. Animace respektují `prefers-reduced-motion: reduce`.
14. Popis portálu v patičce a i18n je aktualizován na „Informační deník Fakulty elektrotechnické ČVUT v Praze. Přinášíme nové informace z oblasti elektroniky a zprávy ohledně fakulty.“.
15. V patičce je logo zobrazeno výhradně jako čistý text POLOVODIČE bez ikony, navigace obsahuje sekce (*Ostatní novinky* `/#ostatni-novinky`, *Informace o fakultě* `https://ek.fel.cvut.cz/`), *Archiv všech zpráv* (`/zpravy`) a *Zpět nahoru* (podstránky `/udalosti` a `/servis` jsou odstraněny) a odkaz na ochranu osobních údajů směřuje na `https://fel.cvut.cz/cs/ochrana-osobnich-udaju` s textem „Ochrana osobních údajů“.
16. Při přepnutí do anglického režimu (`EN`) se kompletně přeloží celé uživatelské rozhraní i všech 12 článků (nadpis, perex, celý obsah článku, kategorie, oddělení autora, tagy) na hlavní stránce, v archivu, ve vyhledávání i v detailu článku.
17. Patička plně respektuje přepínání světlého a tmavého režimu (ve světlém režimu čistý bílý podklad, jemné neutrální linky a tmavé písmo, v tmavém režimu hluboký navy podklad se světlým písmem).
18. Metadata portálu (v layoutu i v manifestu) jsou zkrácena na hlavní nadpis „Polovodiče“ a popis „Informační deník ze světa elektroniky“ s pomlčkou (-) jako oddělovačem místo dvojitého lomítka (//).

## Aktuální změna: Sekce „Informace o fakultě“ a zkrácení mřížky novinek

Placeholder „Šablona pro další sekci“ je nahrazen redakční sekcí **„Informace o fakultě“** s nejdůležitějšími zprávami fakulty (letní škola, dny otevřených dveří, přijímací řízení, stáže, stipendia, konference). Mřížka „Ostatní novinky“ je zkrácena na **3 × 1** karty a doplněna šipkou do celého archivu, aby návštěvník nemusel dlouho scrollovat. Sekce fakulty je na stránce **zdvojená**: plná sekce pod novinkami a kompaktní widget se 3 položkami v bočním sloupci hned pod cyklovačem „Další články“.

- Rozvržení obou instancí a limity mřížky: `rules/layout.md` §2.3, §2.4, §2.5
- Barevné tokeny sekce: `rules/theme.md` §6
- Datová vrstva a nové API funkce: `rules/technologie.md` §8
- Data zpráv fakulty: `data/mock-data.ts` (kategorie `academic`)

### Akceptační kritéria

1. Na hlavní stránce existuje sekce s `id="informace-o-fakulte"` s nadpisem **„Informace o fakultě“** a podtitulem **„Nejdůležitější zprávy z Fakulty elektrotechnické ČVUT“**, obsahující až 6 zpráv fakulty ve dvou sloupcích na desktopu.
2. Stejný obsah je podruhé v bočním sloupci jako widget se 3 položkami umístěný **pod** cyklovačem „Další články“; obě instance mají identické pořadí.
3. Mřížka „Ostatní novinky“ zobrazuje maximálně **3 karty v jedné řadě** (3×1) a to i při aktivním filtru rubriky.
4. Pod mřížkou je tlačítko **„Celý archiv zpráv“** s ikonou šipky vedoucí na `/zpravy`.
5. Články kategorie `academic` se v mřížce „Ostatní novinky“ ani v cyklovači „Další články“ nezobrazují.
6. Počítadla u filtrů rubrik odpovídají sadě článků zobrazitelné v mřížce.
7. Komponenta `SectionTemplate` je smazána, kotva `#nova-sekce` nahrazena kotvou `#informace-o-fakulte` včetně patičky a překladových klíčů.
8. Archiv `/zpravy` umí filtrovat rubriku `academic`.
9. Zprávy fakulty mají funkční statické detaily na `/zpravy/<slug>` (build projde, protože `generateStaticParams` je odvozen z `getArticles()`).

## Aktuální změna: Ikonový systém portálu (favicon, touch ikony, PWA manifest)

Portál dostává kompletní sadu ikon prohlížeče a operačních systémů postavenou na **oficiálním znaku ČVUT FEL** – heraldickém lvu v rámované čtvercové značce vyříznutém z `public/felcvut-logo-blue.svg` (viewBox `0 0 215 64`, používá se čtvercová část `0 0 64 64`). Znak je v oficiálním navy `#080B38` na plné bílé dlaždici `#ffffff`. Ikony jsou statické soubory v `public/icons/` a deklarují se datově v `app/layout.tsx`.

- Specifikace brand marku, dlaždice a inventáře: `rules/theme.md` §5
- Technické zapojení metadat a manifestu: `rules/technologie.md` §7
- Zdroj pravdy pro soubory: `public/icons/`

### Akceptační kritéria ikonového systému

1. `public/icons/` obsahuje kompletní inventář z `rules/theme.md` §5.3 (SVG zdroje, `.ico`, PNG sady 16/32/48/180/192/512, maskable sada, MS tile, `manifest.webmanifest`, `browserconfig.xml`).
2. `app/layout.tsx` deklaruje `metadata.icons` bez `shortcut` a bez `sizes="any"` u bitmapového `.ico`, dále `metadata.manifest`, `metadata.other` a `viewport.themeColor` (dark `#081d3d`, light `#edfff9`).
3. Ikony používají výhradně oficiální křivku znaku ČVUT FEL v navy `#080B38` na bílé dlaždici `#ffffff`; neobsahují textový lockup loga ani překreslené varianty znaku.
4. Všechny PNG/ICO soubory jsou vygenerované ze vektorových předloh v `public/icons/`, nikoliv generované runtime skriptem.
5. `manifest.webmanifest` je platný JSON s ikonami `purpose: any` i `purpose: maskable`.
6. `public/_headers` cachuje cestu `/icons/*`.
7. Ikony jsou dostupné po statickém exportu na cestách `/icons/...` bez nutnosti serverové logiky.

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
