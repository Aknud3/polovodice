# Nasazení na Cloudflare Pages (`polovodice-mockup`)

Návod krok za krokem pro nasazení mockupu **Polovodiče – Informační deník ze světa elektroniky** na Cloudflare Pages pod názvem projektu **`polovodice-mockup`**.

Projekt je čistě statický mockup bez serverové logiky, proto se nasazuje jako **statický export Next.js** (`out/`) přímým uploadem přes Wrangler CLI. Git repozitář není potřeba.

---

## 1. Jak je nasazení nastavené

| Položka | Hodnota |
| :--- | :--- |
| Hosting | Cloudflare Pages |
| Název projektu (Pages) | `polovodice-mockup` |
| Konfigurace projektu | `wrangler.toml` (`pages_build_output_dir = "./out"`) |
| Režim buildu | Statický export (`output: "export"` v `next.config.ts`) |
| Build příkaz | `bun run build` |
| Výstupní adresář | `out/` |
| Deploy příkaz | `wrangler pages deploy out` (nebo `bun run deploy`) |
| Produkční URL | `https://polovodice-mockup.pages.dev` |
| Cloudflare účet | `E.wojnar@seznam.cz's Account` (`d672006ac121e6b73ed7fbc3cb69c24b`) |

V aplikaci jsou už nastavené tyto věci:

- `next.config.ts` obsahuje `output: "export"` a `images.unoptimized: true`.
- `wrangler.toml` definuje projekt `polovodice-mockup` a výstupní adresář `./out`.
- `package.json` obsahuje skripty `deploy`, `deploy:preview` a `preview` a Wrangler je v `devDependencies`.
- `app/zpravy/[slug]` používá `generateStaticParams`, takže se všechny detaily článků vygenerují jako statické HTML.

### Podle čeho je postup zvolený

Projekt je čistě statický mockup, proto se použije **oficiálně dokumentovaná cesta pro statický export Next.js na Cloudflare Pages**:

- Cloudflare: [Next.js → Static site](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/) — framework preset *Next.js (Static HTML Export)*, build `next build`, výstup `out`.
- Cloudflare: [Wrangler – Pages commands](https://developers.cloudflare.com/workers/wrangler/commands/pages/) — `pages deploy`, `pages project create`, `pages dev`.
- Next.js: [Static Exports](https://nextjs.org/docs/app/building-your-application/deploying/static-exports).

Cloudflare dnes pro **full-stack** Next.js (SSR, Server Actions, middleware) doporučuje [vinext na Workers](https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/). To se tohoto mockupu netýká — nepotřebuje server, API routy ani middleware, a proto je Pages + statický export jednodušší a levnější varianta bez závislosti na beta nástroji.

---

## 2. Prerekvizity

1. **Bun** (ověřeno na verzi `1.4.2`):
   ```bash
   bun -v
   ```
2. **Přihlášení do Cloudflare** (Wrangler, ověřeno na verzi `4.147.0`):
   ```bash
   bunx wrangler whoami
   ```
   Očekávaný výstup: `You are logged in with an OAuth Token` a tabulka s účtem.
3. **Scope `pages:write`** v OAuth tokenu. Pokud Wrangler hlásí chybějící scope, obnov přihlášení:
   ```bash
   bunx wrangler login
   ```

---

## 3. Jednorázové vytvoření projektu

Projekt se **nevytváří automaticky**. Pokud ještě neexistuje, deploy skončí chybou:

```text
✘ [ERROR] The Pages project "polovodice-mockup" does not exist.
```

Založ ho proto jednou ručně:

```bash
bunx wrangler pages project create polovodice-mockup --production-branch main --force
```

> **Pozor:** Wrangler `4.147` se bez `--force` pokusí projekt delegovat na Cloudflare Workers přes OpenNext, přepíše `package.json`, přidá závislost `@opennextjs/cloudflare` a vygeneruje `wrangler.jsonc` + `open-next.config.ts`. `--force` tuhle delegaci obejde a založí klasický Pages projekt. `--force` se používá **jen při zakládání projektu**.

Alternativně v dashboardu: **Workers & Pages → Create → Pages → Upload assets**, kde jako název projektu zadáš `polovodice-mockup`.

Projekt je už založený, takže tento krok se znovu nespouští.

---

## 4. Nasazení (produkce)

Z kořene projektu:

```bash
bun run deploy
```

Tento skript provede obojí — build i upload:

```bash
bun run build
wrangler pages deploy out
```

Název projektu a výstupní adresář se berou z `wrangler.toml`, proto se `--project-name` už neuvádí.

Nebo krok po kroku ručně:

```bash
# 1) Statický export
bun run build

# 2) Upload výstupu do Pages
bunx wrangler pages deploy out
```

Po dokončení Wrangler vypíše:

- produkční URL `https://polovodice-mockup.pages.dev`
- unikátní URL daného deploymentu (např. `https://<hash>.polovodice-mockup.pages.dev`)

---

## 5. Co se má ve výstupu objevit

Build vypíše `✓ Exporting (2/2)` a vytvoří v `out/` mimo jiné:

```text
out/index.html
out/404.html
out/zpravy.html
out/udalosti.html
out/servis.html
out/lightning-grids.html
out/zpravy/<slug>.html            (6 článků)
out/_next/static/...              (JS, CSS, fonty IBM Plex)
```

Kontrola po buildu:

```bash
ls out
find out -name "*.html" | wc -l
du -sh out
```

Očekávané hodnoty z ověřeného buildu: **134 souborů** a přibližně **2,9 MB**.

---

## 6. Ověření po nasazení

1. Otevři `https://polovodice-mockup.pages.dev`.
2. Zkontroluj routy:
   - `/` – domovská stránka s hero článkem
   - `/zpravy` – archiv zpráv
   - `/zpravy/onsemi-investice-46-miliard-roznov-fel-cvut` – detail článku
   - `/udalosti` – kalendář událostí
   - `/servis` – studentský servis
3. Zkontroluj, že se načítají fonty IBM Plex Sans a Mono (žádný fallback systémový font).
4. Zkontroluj přepínač `CZ / EN` a přepínač světlého/tmavého režimu.
5. Na telefonu ověř, že se v otevřeném vyhledávání nezobrazují klávesové nápovědy `ESC`, šipek ani `↵`.

### Směrování bez přípony `.html`

Cloudflare Pages automaticky servíruje `/zpravy` ze souboru `out/zpravy.html` a `/zpravy/<slug>` ze `out/zpravy/<slug>.html`. Není proto potřeba měnit `trailingSlash` ani přidávat `_redirects`.

Soubor `out/404.html` slouží jako vlastní stránka pro neexistující adresy.

---

## 7. Náhled a náhledové nasazení

Lokální náhled statického výstupu přes Cloudflare runtime:

```bash
bun run build
bun run preview
```

Náhledový (neprodukční) deployment na samostatné branch URL:

```bash
bun run build
bun run deploy:preview
```

---

## 8. Aktualizace už nasazeného webu

Po každé změně kódu stačí spustit znovu:

```bash
bun run deploy
```

Wrangler nahradí obsah projektu novým deploymentem. Předchozí deploymenty zůstávají v historii a lze se k nim vrátit.

---

## 9. Vlastní doména

Wrangler CLI v této verzi (`4.147.0`) nemá podpříkaz pro správu domén Pages, vlastní doména se proto nastavuje v dashboardu (nebo přes Cloudflare API):

**Pages → polovodice-mockup → Custom domains → Set up a custom domain**

U domény ČVUT bude potřeba nastavit CNAME záznam na `polovodice-mockup.pages.dev`.

---

## 10. Alternativa: napojení přes Git

Pokud se projekt v budoucnu přesune do Git repozitáře, lze místo přímého uploadu použít Git integraci Cloudflare Pages:

| Nastavení | Hodnota |
| :--- | :--- |
| Build command | `bun run build` |
| Build output directory | `out` |
| Framework preset | Next.js (Static HTML Export) |
| Proměnná prostředí | `BUN_VERSION` = `1.4.2` (nebo `NODE_VERSION` = `24`) |

V tomto režimu se deploy spustí automaticky při každém pushi do produkční branche.

---

## 11. Řešení problémů

### `Missing some expected Oauth scopes`

```bash
bunx wrangler login
```

Scope `pages:write` je pro nasazení na Pages povinný.

### `Project not found`

Projekt nevznikl, vytvoř ho ručně (včetně `--force`, viz sekce 3):

```bash
bunx wrangler pages project create polovodice-mockup --production-branch main --force
```

### Wrangler přepsal `package.json` a přidal `@opennextjs/cloudflare`

Staví se to při delegaci na Workers (viz sekce 3 a 12). Náprava:

```bash
rm -rf .open-next open-next.config.ts cloudflare-env.d.ts
# package.json vrátit na skripty "build": "next build", "deploy": "bun run build && wrangler pages deploy out"
bun install
```

### `next start` nefunguje

Po přechodu na statický export už `next start` není podporovaný. Místo něj použij `bun run preview` (Cloudflare runtime nad `out/`) nebo `bun run dev` pro vývoj.

### V aplikaci chybí serverová logika

Statický export nepodporuje API routy, middleware ani server components závislé na requestu. Mockup je proto musí mít vyřešené klientsky nebo přes externí API — jinak se build při exportu zastaví chybou.

### Změna názvu projektu

Pokud se název projektu změní, musí se upravit na čtyřech místech současně:

1. `wrangler.toml` (klíč `name` a `pages_build_output_dir`)
2. `package.json` (skripty `deploy` a `deploy:preview`, pokud obsahují název)
3. `rules/technologie.md` (sekce 6 – Nasazení)
4. tento soubor `DEPLOY.md`

Novou konfiguraci z dashboardu lze vygenerovat oficiálním příkazem:

```bash
bunx wrangler pages download config polovodice-mockup
```

---

## 12. Ověřeno při nasazení

Datum ověření: **5. 10. 2026**, Wrangler `4.147.0`, Next.js `15.5.27`, Bun `1.4.2`.

| Kontrola | Výsledek |
| :--- | :--- |
| Nasazení přes `bun run deploy` | úspěšné |
| Deployment ID | `07b7bdc0-5376-489e-8e3c-1fed38155a34` (Production, branch `main`) |
| Produkční URL | `https://polovodice-mockup.pages.dev` |
| Deployment URL | `https://07b7bdc0.polovodice-mockup.pages.dev` |
| Uploadnuto souborů | 134 (21 nových, 113 z cache) |
| `/` | `200` |
| `/zpravy` | `200` |
| `/udalosti` | `200` |
| `/servis` | `200` |
| `/zpravy/<slug>` | `200` u všech 6 článků |
| Neexistující cesta | `404` (`out/404.html`) |
| `/zpravy/<slug>.html` | `308` redirect na cestu bez přípony |

Titulek nasazené stránky: `POLOVODIČE // Informační portál pro technologie a čipy – ČVUT FEL`.

### Úskalí: Wrangler se snaží delegovat na Workers (OpenNext)

Wrangler `4.147.0` při `pages project create` automaticky detekoval Next.js a pokusil se projekt převést na **Cloudflare Workers přes OpenNext**. Následky:

- delegace selhala na `bunx opennextjs-cloudflare build`,
- vygeneroval se `wrangler.jsonc` a `open-next.config.ts` pro Workers,
- **`package.json` byl přepsán** — skripty `preview`/`deploy` se změnily na `opennextjs-cloudflare …`, přibyl skript `upload` a `cf-typegen`,
- do závislostí se přidal `@opennextjs/cloudflare` a vznikl adresář `.open-next/`.

Náprava, která fungovala:

```bash
# 1) založit klasický Pages projekt (jen jednou)
bunx wrangler pages project create polovodice-mockup --production-branch main --force

# 2) vyčistit artefakty Workers/OpenNext
rm -rf .open-next open-next.config.ts cloudflare-env.d.ts wrangler.jsonc

# 3) obnovit package.json a odstranit @opennextjs/cloudflare
bun install
```

`--force` se použije **pouze jednou** při vytváření projektu. Jakmile projekt na Pages existuje a v kořeni je `wrangler.toml` s `pages_build_output_dir`, Wrangler už delegaci nepouští.

### Preventivní opatření: `wrangler.toml`

Soubor `wrangler.toml` v kořeni projektu jednoznačně určuje, že jde o **Pages** projekt, a tím brání automatické konfiguraci pro Workers:

```toml
name = "polovodice-mockup"
pages_build_output_dir = "./out"
compatibility_date = "2026-10-05"
```

Díky tomu funguje `wrangler pages deploy out` i bez `--project-name`.

---

## 13. Rychlý přehled

```bash
# instalace / obnova přihlášení
bunx wrangler login

# jednorázové vytvoření projektu (projekt už existuje, nespouštět znovu)
bunx wrangler pages project create polovodice-mockup --production-branch main --force

# build + deploy (běžné nasazení)
bun run deploy

# náhled
bun run preview

# seznam deploymentů
bunx wrangler pages deployment list
```
