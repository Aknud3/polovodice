# Polovodiče – Informační a technologický portál FEL ČVUT

Informační web a technologické médium věnované polovodičovému ekosystému, výzkumu a vývoji čipů, výkonové elektronice a pokročilým materiálům na **Fakultě elektrotechnické ČVUT v Praze**.

Veřejný náhled: **[polovodice-mockup.pages.dev](https://polovodice-mockup.pages.dev)**

---

## 🚀 Použité technologie

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router, Static Site Generation / SSG)
- **UI & Styling:** [Tailwind CSS v4](https://tailwindcss.com/), [Lucide React](https://lucide.dev/)
- **Typografie:** IBM Plex Sans & IBM Plex Mono
- **Deployment:** [Cloudflare Pages](https://pages.cloudflare.com/) via Wrangler
- **Správa balíčků:** [Bun](https://bun.sh/)
- **Funkce:**
  - Bilingvní rozhraní (čeština / angličtina)
  - Světlý a tmavý režim (Dark / Light mode)
  - Okamžité vyhledávání (`Cmd+K` / `Ctrl+K`)
  - Filtrování témat bez nutnosti scrollování
  - Responzivní design s důrazem na nulový Cumulative Layout Shift (CLS)

---

## 🛠️ Lokální vývoj

### Požadavky
- [Bun](https://bun.sh/) (doporučeno) nebo Node.js 20+

### Instalace závislostí
```bash
bun install
```

### Spuštění vývojového serveru
```bash
bun run dev
```
Aplikace běží na `http://localhost:3000`.

---

## 📦 Sestavení a nasazení

### Statický export (SSG)
```bash
bun run build
```
Výsledné statické soubory se vygenerují do složky `out/`.

### Lokální náhled buildu
```bash
bun run preview
```

### Nasazení na Cloudflare Pages
```bash
bun run deploy
```

---

## 📁 Struktura projektu

```text
├── app/                  # Next.js App Router (stránky a rozvržení)
├── components/           # Komponenty UI, rozvržení a widgety
│   ├── layout/           # Hlavička, patička, navigace
│   ├── portal/           # Karty článků, hero, boční panel, feed
│   ├── providers/        # Context providery (jazyk, téma)
│   └── ui/               # Tlačítka, dialog vyhledávání, cookie banner
├── data/                 # Datové modely a ukázková data
├── lib/                  # Pomocné funkce a lokalizace (i18n)
├── rules/                # Architektonická pravidla a design standardy
└── public/               # Statické assety (SVG loga, konfigurace)
```

---

## 📄 Licence

Tento projekt je vyvíjen pro Fakultu elektrotechnickou ČVUT v Praze.
Všechna práva vyhrazena.
