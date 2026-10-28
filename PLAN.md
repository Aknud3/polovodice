# Implementační plán: Polovodiče – Informační portál pro elektroniku a polovodiče ČVUT FEL (Program EK)

> **Vedení dokumentu:** V `PLAN.md` je vždy právě **jedna** „Aktuální změna“. Po dokončení se přejmenuje na „Dokončená změna“ a nová aktivní změna se přidá nad ni. Dokončené sekce jsou historické; pokud se rozcházejí s `rules/`, platí aktuální `rules/`.

## Aktuální změna: Režim BOILERPLATE – z webu je odstraněn veškerý vymyšlený obsah

Veškerá redakční i ukázková data jsou z webu odstraněna. Jediný zdroj dat je neutrální boilerplate sada `data/boilerplate.ts` (původní `data/mock-data.ts` zrušen): zprávy, zprávy fakulty, akce, projekty, výzvy, partneři, příležitosti i FAQ mají zástupné texty (`Titulek zprávy NN`, `Název akce NN`, `Partner NN`, `Otázka NN`), žádnou fotografii a žádnou vymyšlenou vazbu (akce nemá `registrationUrl`, partneři odkazují na `https://example.com`, kontakt je `Kontaktní osoba`). Web tak ukazuje čistou strukturu a design bez obsahového balastu. Medailonky, storystream, tržní indexy, stav čistých prostor, kampusové akce a anketa jsou zrušeny i se svými daty a typy.

- Specifikace: `rules/layout.md` §0, §2.4, §2.9, §2.16, §2.17, §8; `rules/theme.md` §3, §8, §10; `rules/technologie.md` §3.1, §8, §9, §10

### Akceptační kritéria

1. `data/boilerplate.ts` je jediným zdrojem dat: 12 redakčních článků (dva na rubriku, jeden z nich hero), 6 zpráv fakulty, 6 akcí (`event` / `conference` / `summer-school`), 6 projektů (stavy i součásti se střídají), 3 výzvy, 6 partnerů, 3 příležitosti a 3 otázky FAQ; vše má CZ i EN variantu.
2. Zástupné texty: `Titulek zprávy NN`, `Název akce NN`, `Místo konání`, `Název projektu NN`, `Název výzvy NN`, `Partner NN`, `Název příležitosti NN`, `Otázka NN`, datum `DD. MM. YYYY`, rubrika `ŠABLONA`, autor `Jméno autora` / `Součást fakulty`, tag `šablona`.
3. Žádná entita nemá `imageUrl`, žádná akce `registrationUrl`, žádný partner reálnou firmu a kontakt není fiktivní osoba (`Kontaktní osoba` / `kontakt@example.cz`); `data/mock-data.ts` ani deklarace `MOCK_*` v projektu neexistují.
4. Routy `/zpravy/medailonky` a `/zpravy/medailonky/[slug]`, komponenty `ProfilesClient` / `ProfileDetailClient`, typ `Profile` a klíče i18n medailonků jsou smazané; archiv ani podstránky cílových skupin na medailonky neodkazují.
5. Časová osa na `/o-nas` agreguje jen akce a projekty; filtr nabízí Vše / Události / Projekty.
6. Homepage (hero, novinky, nadcházející akce, fakulta), archiv, detail článku, `/akce`, `/projekty` (+ detail), `/vzdelavani`, `/o-nas`, vyhledávací dialog i `/pro-koho/*` fungují nad boilerplate sadou a drží původní layout i počítadla.
7. Statický export (`bun run build`) projde bez chyb a neexistující slug vede na 404.

## Dokončená změna: Interní značky cílových skupin u zpráv a podstránky `/pro-koho/[audience]` jako sekce zpráv

Každá zpráva (`Article`) nese povinnou interní značku `audience: [Audience, ...Audience[]]`. Karty rozcestníku na homepage (*Studenti*, *Výzkumníci*, *Veřejnost*, *Partneři*, *Média*) otevírají podstránku `/pro-koho/[audience]`, která je **stejnou sekcí jako archiv zpráv** – obsahuje sub-menu všech pěti skupin, vyhledávání a dvě sekce archivu (**Všeobecné informace**, **Informace o fakultě**) a zobrazuje výhradně články s přiřazenou značkou dané skupiny.

- Specifikace: `rules/layout.md` §2.10, §2.18; `rules/technologie.md` §3.1, §8, §10

### Akceptační kritéria

1. `Article` v `types/portal.ts` obsahuje povinné pole `audience: [Audience, ...Audience[]]`; každý článek v `data/boilerplate.ts` má alespoň jednu cílovou skupinu.
2. Existuje statická routa `/pro-koho/[audience]` s `generateStaticParams()` pro všech 5 českých URL slugů (`studenti`, `vyzkumnici`, `verejnost`, `partneri`, `media`).
3. Podstránka má záhlaví s ikonou skupiny, H1 („Pro studenty“ atd.) a popisem zaměření.
4. Pod záhlavím je horizontální sub-menu všech 5 cílových skupin s aktivním stavem (akcentní písmo + spodní linka, bez rámečků).
5. Výpis používá architekturu `/zpravy` – vyhledávání, počítadlo, sekce Všeobecné informace a Informace o fakultě, 3sloupcová mřížka `ArticleCard`.
6. Filtrování probíhá nejprve podle značky `audience`, poté podle hledaného dotazu; značka je interní a na kartě ani v detailu článku se nezobrazuje jako odznak.
7. Rozcestník cílových skupin na homepage (`AudienceGateway.tsx`) odkazuje na podstránky `/pro-koho/<slug>`.
8. Všechny texty jsou plně bilingvní (CZ / EN) a statický export zůstává funkční.
9. Sub-menu cílů má `aria-current` a `aria-label`; na mobilu se posouvá uvnitř vlastního pruhu a nezpůsobuje horizontální scroll stránky.

## Dokončená změna: Sjednocení typografie karet s novinkami – odstranění rámečkových značek a odznaků (NO BOXED BADGES)

Všechny sekce portálu (Akce, Projekty, Vzdělávání, O nás) se plně sjednocují s čistým novinářským vizuálem článků (`ArticleCard`). Z karet se odstraňují veškeré ohraničené badge krabičky, rámečkové štítky a barevné chipy (`[UDÁLOST]`, `[KONFERENCE]`, `[PROBÍHÁ]`, `[STUDENTI]`). Metadata se zapisují výhradně jako čistý jednořádkový text `text-[11px] font-mono text-neutral-400` s tečkovým oddělovačem `•` a volitelným jemným tónováním písma bez ohraničení či podkladů.

- Specifikace: `rules/layout.md` §2.11, §2.14, §2.16; `rules/theme.md` §10
## Dokončená změna: Rozšíření portálu podle drátového modelu

Portál byl kompletně rozšířen z jednostránkového deníku na plnohodnotný web s pěti hlavními sekcemi podle `analyza-dratoveho-modelu-webu.md` a `PLAN-ROZSIRENI.md` (Novinky, Akce, Projekty, Vzdělávání, O nás) s plným zachováním design systému, typografie i barevné varianty Green Silicon.

- Specifikace v rules: `rules/layout.md` (§1, §2.1, §2.6, §2.9–§2.17), `rules/technologie.md` (§3, §10), `rules/theme.md` (§10)
- Detailní koncepce a fázování: `PLAN-ROZSIRENI.md`
### Akceptační kritéria rozšíření

1. **Homepage:** obsahuje všech 6 sekcí v přesném pořadí dle dekonstrukce: `#informace-tydne` (8:4 split, cyklovač, rotující widget fakulty) → `#pro-koho` (5 karet: studenti, výzkumníci, veřejnost, partneři, média) → `#ostatni-novinky` (3×1 + dropdown filtr rubrik) → `#nadchazejici-akce` (1–2 nejbližší akce + odkaz do archivu) → `#informace-o-fakulte` (2×2 grid zpráv z fakulty) → `#newsletter` (mockup formulář s lokálním potvrzením).
2. **Navigace v Navbaru:** na desktopu (`>= md`) obsahuje textové odkazy na 5 hlavních sekcí: *Novinky* (`/zpravy`), *Akce* (`/akce`), *Projekty* (`/projekty`), *Vzdělávání* (`/vzdelavani`), *O nás* (`/o-nas`) s aktivním stavem a hover akcentem; na mobilu se zobrazuje hamburger menu s vertikálním panelem odkazů.
3. **Patička:** rozšířena o 3sloupcový layout s kompletní navigací sekcí, kontaktním blokem Katedry mikroelektroniky FEL ČVUT a sociálními sítěmi fakulty; plně respektuje light i dark režim.
4. **Stránka Akce (`/akce`):** obsahuje H1, dropdown filtr typu akce (Vše / Událost / Konference / Letní škola) s počty položek, mřížku karet akcí s datem od–do, místem, čistým textem typu a cílových skupin (bez rámečkových odznaků) a volitelným odkazem na registraci.
5. **Stránka Projekty (`/projekty`):** obsahuje H1, dropdown filtr součástí dle jednotného číselníku `FacultyUnit` (FEL, Katedra mikroelektroniky, FJFI, Fakulta dopravní, Externí), mřížku projektů s čistým textem stavu (příprava, probíhá, dokončen) bez badge boxů a samostatnou sekci projektových výzev s termíny (deadlines) a cílovými skupinami.
6. **Detail projektu a výzvy (`/projekty/[slug]`):** společná staticky generovaná podstránka zobrazující popis, podmínky výzvy či výstupy projektu, kontaktní osobu s e-mailem a zpětný odkaz na přehled.
7. **Stránka Vzdělávání (`/vzdelavani`):** obsahuje 4 bloky v přesném pořadí: Studijní program (představení EK a EIS s odkazem), Příležitosti (stáže, stipendia, semináře), Letní školy (sdílená entita Akce typu `summer-school`) a interaktivní FAQ akordeon.
8. **Stránka O nás (`/o-nas`):** obsahuje blok Kontakty s údaji pro veřejnost i média, mřížku klíčových průmyslových partnerů s proklikem a interaktivní Časovou osu historie s dropdown filtrem typu záznamu (události, projekty, medailonky, články).
9. **Medailonky (`/zpravy/medailonky` a `[slug]`):** přehled medailonků osobností výzkumu a výuky s čtvercovými portréty (či iniciálovými placeholdery) a plný detail s markdown formátováním. V záhlaví archivu `/zpravy` je přímý odkaz na medailonky.
10. **Lokalizace a data:** všechny nové entity, komponenty, rozhraní i stránky mají 100% bilingvní podporu CZ / EN; přepínač jazyka v navbaru přepíná rozhraní i obsah napříč celým webem.
11. **Statický export a Zero Bloat:** veškeré nové dynamické routy (`[slug]`) implementují `generateStaticParams`, kód neobsahuje externí síťové požadavky a build probíhá čistě bez chyb.
## Dokončená změna: Fakulta jako hlavní sdělení + zpevnění layoutu homepage

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
15. V patičce je logo zobrazeno výhradně jako čistý text POLOVODIČE bez ikony, navigace obsahuje všech 5 sekcí (*Novinky* `/zpravy`, *Akce* `/akce`, *Projekty* `/projekty`, *Vzdělávání* `/vzdelavani`, *O nás* `/o-nas`), *Informace o fakultě* (`https://ek.fel.cvut.cz/`) a *Zpět nahoru* (podstránky `/udalosti` a `/servis` byly odstraněny) a odkaz na ochranu osobních údajů směřuje na `https://fel.cvut.cz/cs/ochrana-osobnich-udaju` s textem „Ochrana osobních údajů“.
16. Při přepnutí do anglického režimu (`EN`) se kompletně přeloží celé uživatelské rozhraní i všechny články (nadpis, perex, celý obsah článku, kategorie, oddělení autora, tagy) na hlavní stránce, v archivu, ve vyhledávání i v detailu článku.
17. Patička plně respektuje přepínání světlého a tmavého režimu (ve světlém režimu čistý bílý podklad, jemné neutrální linky a tmavé písmo, v tmavém režimu hluboký navy podklad se světlým písmem).
18. Metadata portálu (v layoutu i v manifestu) jsou zkrácena na hlavní nadpis „Polovodiče“ a popis „Informační deník ze světa elektroniky“ s pomlčkou (-) jako oddělovačem místo dvojitého lomítka (//).

## Dokončená změna: Sekce „Informace o fakultě“ a zkrácení mřížky novinek

Placeholder „Šablona pro další sekci“ je nahrazen redakční sekcí **„Informace o fakultě“** s nejdůležitějšími zprávami fakulty (letní škola, dny otevřených dveří, přijímací řízení, stáže, stipendia, konference). Mřížka „Ostatní novinky“ je zkrácena na **3 × 1** karty a doplněna šipkou do celého archivu, aby návštěvník nemusel dlouho scrollovat. Sekce fakulty je na stránce **zdvojená**: plná sekce pod novinkami a kompaktní widget se 3 položkami v bočním sloupci hned pod cyklovačem „Další články“.

- Rozvržení obou instancí a limity mřížky: `rules/layout.md` §2.3, §2.4, §2.5
- Barevné tokeny sekce: `rules/theme.md` §6
- Datová vrstva a nové API funkce: `rules/technologie.md` §8
- Data zpráv fakulty: `data/boilerplate.ts` (kategorie `academic`)

### Akceptační kritéria (historická)

> Tato kritéria platila pro původní verzi sekce „Informace o fakultě“. Nahradila je změna „Fakulta jako hlavní sdělení + zpevnění layoutu homepage“ výše; aktuálně platí `rules/layout.md` §2.3 a §2.5 (2 × 2 grid se 4 položkami, widget s 1 rotující zprávou, žádné CTA pod mřížkou).

1. Na hlavní stránce existuje sekce s `id="informace-o-fakulte"` s nadpisem **„Informace o fakultě“** a podtitulem **„Nejdůležitější zprávy z Fakulty elektrotechnické ČVUT“**, obsahující až 6 zpráv fakulty ve dvou sloupcích na desktopu.
2. Stejný obsah je podruhé v bočním sloupci jako widget se 3 položkami umístěný **pod** cyklovačem „Další články“; obě instance mají identické pořadí.
3. Mřížka „Ostatní novinky“ zobrazuje maximálně **3 karty v jedné řadě** (3×1) a to i při aktivním filtru rubriky.
4. Pod mřížkou je tlačítko **„Celý archiv zpráv“** s ikonou šipky vedoucí na `/zpravy`.
5. Články kategorie `academic` se v mřížce „Ostatní novinky“ ani v cyklovači „Další články“ nezobrazují.
6. Počítadla u filtrů rubrik odpovídají sadě článků zobrazitelné v mřížce.
7. Komponenta `SectionTemplate` je smazána, kotva `#nova-sekce` nahrazena kotvou `#informace-o-fakulte` včetně patičky a překladových klíčů.
8. Archiv `/zpravy` umí filtrovat rubriku `academic`.
9. Zprávy fakulty mají funkční statické detaily na `/zpravy/<slug>` (build projde, protože `generateStaticParams` je odvozen z `getArticles()`).

## Dokončená změna: Ikonový systém portálu (favicon, touch ikony, PWA manifest)

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

## Dokončená změna: příbuzná barevná identita

Polovodiče zůstávají ve vizuální rodině ČVUT FEL, ale nesmí působit jako kopie hlavního fakultního webu. Katalog obsahuje 10 barevných variant s viditelnou odchylkou až přibližně 20 % od referenčních FEL tokenů. Varianty zachovávají navy základ, elektrickou modř, cyan akcent, IBM Plex Sans/Mono a vysoký kontrast.

- Specifikace tokenů: `rules/theme.md`
- Výběrový katalog: `lightning-grids.html`
- Po výběru uživatelem se do `app/globals.css` aplikuje pouze vítězná varianta.
- Vybraná varianta: **09 – Green Silicon**; její přesné tokeny jsou zdrojem pravdy pro runtime motiv.
- Ostatní varianty zůstanou v katalogu jako archiv návrhů.

### Akceptační kritéria variant

1. Katalog obsahuje 10 variant `01–10`.
2. Každá varianta má light/dark náhled a přesné tokeny.
3. Žádná varianta neopouští barevnou rodinu FEL/ČVUT.
4. Runtime se otevírá v tmavém režimu; light mode zůstává dostupný přes přepínač motivu.

## Původní projektový kontext

Cílem projektu je vytvořit moderní informační portál **Polovodiče** zastřešený programem **Elektronika a komunikace (EK)** Fakulty elektrotechnické ČVUT v Praze. Portál slouží jako informační uzel pro elektroniku, mikroelektroniku, polovodiče, výzkum, studium a související technologický ekosystém.

## Dokončená změna: čistý HTML katalog a debugger-friendly zdroj

- `lightning-grids.html` zůstává samostatný katalog bez serveru a bez externího runtime skriptu.
- Zdroj musí mít sémantické HTML, pojmenovaná data variant, oddělené bloky `DATA`, `DOM`, `RENDER`, `EVENTS` a jediný čitelně formátovaný inline script.
- Každá z 10 variant musí zachovat light/dark náhled, přesné tokeny a funkci COPY.

## Lokalizace

- Zdroj pravdy pro jazykové chování je `rules/layout.md` §8 a `rules/technologie.md` §3.2 a §7.
- Přepínač jazyka mění veškeré UI i obsah článků; metadata (`<title>`, `description`) zůstávají česky, protože statický export neumožňuje měnit metadata podle klientského přepínače.

## Mobilní UI

Mobilní zobrazení je mobile-first: bez horizontálního scrollu, s jednosloupcovým layoutem, dotykovými ovládacími prvky minimálně 36px vysokými, sbaleným vyhledáváním a responsivním navbar/footer layoutem. Jediná výjimka je sub-menu cílových skupin na `/pro-koho/[audience]`, které se na `< 640px` posouvá uvnitř vlastního pruhu a nesmí způsobit horizontální scroll stránky.

Mobilní hlavička zobrazuje logo ČVUT FEL, název „POLOVODIČE“, podtitul „Informační deník ze světa elektroniky“, ikonové vyhledávání a dostupné přepínače jazyka a motivu. V otevřeném vyhledávání se na mobilu skrývají pouze klávesové nápovědy `ESC`, šipek a `↵`.

## Dokončená změna: nasazení na Cloudflare Pages

- Cíl: veřejně dostupný mockup na Cloudflare Pages pod názvem projektu **`polovodice-mockup`**.
- Režim: statický export Next.js (`output: "export"`), výstup v `out/`.
- Nasazení probíhá přímým uploadem přes Wrangler CLI, protože projekt není git repozitář.
- Postup a ověření je popsáno v `DEPLOY.md`.

### Akceptační kritéria nasazení

1. `bun run build` dokončí statický export bez chyb a vytvoří `out/`.
2. Projekt `polovodice-mockup` existuje na Cloudflare Pages a produkční URL je `https://polovodice-mockup.pages.dev`.
3. Všechny staticky generované routy (`/`, `/zpravy`, `/zpravy/[slug]`, `/akce`, `/projekty`, `/projekty/[slug]`, `/vzdelavani`, `/o-nas`, `/zpravy/medailonky`, `/zpravy/medailonky/[slug]`, `/pro-koho/[audience]`) vrací `200`.
4. Neexistující cesta vrací `404` přes `out/404.html`.
5. `DEPLOY.md` obsahuje ověřený postup včetně vytvoření projektu přes `--force`.

### Stav nasazení

- Ověřeno per oficiální dokumentaci Cloudflare: statický Next.js export na Pages je dokumentovaná cesta (`pages_build_output_dir` v `wrangler.toml`).
- Deployment `07b7bdc0-5376-489e-8e3c-1fed38155a34` (Production, branch `main`) proběhl úspěšně 5. 10. 2026 přes `bun run deploy`.
- Uploadnuto 134 souborů (21 nových, 113 z cache); produkční URL `https://polovodice-mockup.pages.dev` vracela v době nasazení `200` na tehdejších routách, neexistující cesta vrací `404`.
- Wrangler při zakládání projektu přepsal `package.json` a přidal `@opennextjs/cloudflare`; stav byl vyčištěn a do kořene přidán `wrangler.toml`, který další delegaci na Workers brání.

## Dokončená oprava sestavení

Po posledním pádu `bun run build` byla lokalizována konkrétní chyba v `components/ui/CommandMenu.tsx`: jeden nadbytečný uzavírací `</div>` na konci dialogu způsobil syntaktickou chybu `Unterminated regexp literal`. Oprava se omezuje na odstranění tohoto elementu.
