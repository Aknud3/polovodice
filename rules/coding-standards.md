# Pravidla kódování, Negative Space Programming a Bezpečnost (`coding-standards.md`)

> **Standardy čistého, produkčně připraveného a bezpečného kódu pro informační portál Polovodiče.**
> Tento dokument definuje inženýrské principy, paradigma *Negative Space Programming*, pravidla čisté architektury v TypeScriptu a Reactu a bezpečnostní opatření nutná pro nasazení do ostrého provozu.

---

## 1. Filozofie Negative Space Programming (Programování v negativním prostoru)

V tradičním programování se vývojáři často soustředí pouze na „pozitivní prostor“ – tedy co má systém udělat, když vše funguje (tzv. happy path). **Negative Space Programming** obrací tuto optiku: **definuje systém skrze to, co se stát NESMÍ, eliminuje neplatné stavy a ohraničuje prostor možných chyb.**

### 1.1 Klíčové pilíře Negative Space Programming v našem kódu
1. **Plochý tok řízení a Guard Clauses (Zákaz hlubokého zanořování):**
   - Kód nesmí obsahovat zanořené bloky `if-else` do hloubky 3 a více úrovní.
   - **Pravidlo:** Neplatné, chybové či okrajové stavy se ověřují okamžitě na začátku funkce s předčasným návratem (`early return`). Hlavní logika běží v nulové hloubce zanoření.
2. **Nelegální stavy jsou netypovatelné (Make Illegal States Unrepresentable):**
   - Využití diskriminovaných sjednocení (discriminated unions) v TypeScriptu namísto desítek volitelných boolean flagů (`isLoading`, `isError`, `isSuccess`, `data`).
   - Stav může být v jeden okamžik pouze jeden: buď `{ status: 'idle' }`, `{ status: 'loading' }`, `{ status: 'error', error: Error }`, nebo `{ status: 'success', data: T }`. Nikdy nemůže nastat stav „loading a zároveň success“.
3. **Defenzivní hraniční kontrola (Boundary Validation):**
   - Veškerá data vstupující zvenčí (props, URL parametry z App Routeru, vstupy uživatele z vyhledávání) jsou validována ihned na vstupu (boundary). Pokud neodpovídají kontraktu, komponenta okamžitě bezpečně reaguje fallbackem a nedovolí chybě propagovat se dále.

---

## 2. Zásady psaní čistého kódu (Clean Code Standards)

### 2.1 Princip jedné odpovědnosti (Single Responsibility Principle)
- Každá komponenta řeší pouze jednu věc:
  - Komponenta **rozvržení** (`HeroFeature.tsx`, `StorystreamRail.tsx`) pouze skládá layout a řídí zobrazení.
  - Komponenta **logiky** (např. `useSearch`, `useTopicFilter`) zapouzdřuje stav a výpočty.
  - **Prezentační prvky** (`Badge.tsx`, `Kbd.tsx`) nemají žádné vedlejší efekty (side effects).

### 2.2 Sémantické pojmenování a doménový jazyk
- Názvy proměnných a funkcí musí přesně odrážet elektrotechnickou a polovodičovou doménu:
  - Správně: `fetchSemiconductorArticles()`, `cleanroomStatus`, `activeSiliconWaferNode`, `formatVoltageParam()`.
  - Špatně: `getData()`, `item`, `val`, `temp`, `doStuff()`.
- Funkce vracející boolean začínají prefixem: `is*`, `has*`, `should*` (např. `isUrgent`, `hasSiliconSpecs`).

### 2.3 Nulové kouzelné konstanty (No Magic Numbers)
- Žádné anonymní konstanty v kódu:
  - Správně: `const MAX_PEREX_LENGTH = 160;`, `const READING_SPEED_WORDS_PER_MIN = 200;`.
  - Špatně: `if (text.length > 160) ...`, `Math.ceil(count / 200)`.

### 2.4 Striktní TypeScript bez kompromisů
- **Zákaz typu `any`:** `any` je v celém repozitáři přísně zakázáno. V neznámých případech se používá `unknown` s následným type-narrowingem.
- **Explicitní rozhraní pro Props:** Každá React komponenta musí mít explicitní interface `interface ComponentNameProps { ... }`.
- **Exhaustive Checks u switchů:** Použití typu `never` pro zaručení, že byly obslouženy všechny kategorie čipů nebo stavů.

---

## 3. Bezpečnostní standardy (Security-First Architecture)

Portál Polovodiče je veřejné médium vystavené internetu. Bezpečnost je integrální součástí kódu, nikoliv následným doplňkem:

### 3.1 Ochrana proti XSS (Cross-Site Scripting)
1. **Zákaz nechráněného `dangerouslySetInnerHTML`:**
   - Texty článků a bleskovek se renderují jako čistý text nebo přes bezpečné markdown komponenty.
   - Pokud je výjimečně potřeba vložit HTML (např. ze schváleného CMS), obsah **musí** projít sanitizací přes `DOMPurify` před samotným renderem.
2. **Automatický React Escaping:** Všechny uživatelské vstupy (vyhledávací dotazy v `Cmd+K`, vstupy anket) jsou v JSX automaticky escapovány.

### 3.2 Bezpečné externí odkazy (Tabnabbing Prevention)
- Každý odkaz směřující mimo doménu portálu (`target="_blank"`) **musí povinně obsahovat atribut:**
  ```tsx
  rel="noopener noreferrer"
  ```
  Tím se zabrání útokům typu reverse-tabnabbing, kdy cizí stránka může manipulovat s oknem portálu přes `window.opener`.

### 3.3 Validace a sanitizace vstupů
- Veškeré URL parametry (např. slug článku v `app/zpravy/[slug]/page.tsx` nebo dotaz `?q=...`) jsou před použitím ošetřeny:
  - Ořez bílých znaků (`trim()`).
  - Omezení maximální délky (např. vyhledávací dotaz max. 100 znaků).
  - Kontrola proti neplatným znakům (path traversal, vkládání speciálních řídicích znaků).

### 3.4 Ochrana klientského bundlu a oddělení tajemství
- Do klientských komponent (`'use client'`) se **nikdy nesmí importovat citlivé klíče ani serverové moduly**.
- Pouze proměnné s prefixem `NEXT_PUBLIC_` jsou přístupné v prohlížeči; nesmí obsahovat žádné interní fakultní tokeny.

### 3.5 Graceful Error Boundaries (Žádný únik stack-trace)
- Chyby v produkčním prostředí se zachytávají na úrovni `error.tsx` v App Routeru.
- Uživatel vidí profesionální technické chybové hlášení s možností návratu na úvodní stránku. **Technické stack-trace, cesty k souborům na serveru a vnitřní výjimky se veřejnosti nikdy nezobrazují.**

---

## 4. Produkční připravenost (Production-Ready Criteria)

Aby byl kód okamžitě způsobilý pro produkční provoz, musí splňovat:

1. **Zero Cumulative Layout Shift (CLS = 0):**
   - Všechny obrázky používají pevnou definici poměru stran (`aspect-video 16:9` nebo rozměry `width`/`height`).
   - Dynamické bloky mají vyhrazený prostor pomocí `min-h-[...]` a skeleton komponent.
2. **Přístupnost (a11y) dle WCAG AAA:**
   - Každé tlačítko má text nebo `aria-label`.
   - Všechny interaktivní prvky jsou plně ovladatelné z klávesnice (`Tab`, `Enter`, `Escape` pro zavření vyhledávání).
   - Kontrast textu vůči pozadí splňuje minimální poměr 4.5:1 pro běžný text a 7:1 pro klíčové prvky.
3. **Deterministický rendering (Hydration Match):**
   - Kód nesmí obsahovat závislosti na lokálním čase klienta či `window` během SSR, které by způsobily chybu hydratace (`hydration mismatch`). Pro manipulaci s časem se používají formátovací funkce běžící konzistentně.

---

## 5. Ukázky kódu: Anti-Pattern vs. Production-Ready

### 5.1 Negative Space Programming (Guard Clauses vs. Nested Hell)

#### ❌ Špatně (Nested Hell, nejasné podmínky, náchylné k chybám):
```typescript
// ANTI-PATTERN: Hluboké zanoření, obtížně čitelné, chybí defenzivní kontrola
function renderArticleSpecs(article: any) {
  if (article) {
    if (article.specs) {
      if (article.specs.material) {
        if (article.specs.material === "SiC" || article.specs.material === "GaN") {
          return `<span class="badge">${article.specs.material} - ${article.specs.voltageV}V</span>`;
        } else {
          return `<span class="badge">${article.specs.material}</span>`;
        }
      }
    }
  }
  return null;
}
```

#### ✅ Správně (Negative Space: Guard clauses, přísný typ, žádné zanoření):
```typescript
import type { Article } from "@/types/portal";

// PRODUCTION-READY: Negativní prostor okamžitě eliminuje neplatné stavy
export function formatSemiconductorBadge(article: Article): string | null {
  // 1. Guard: Chybí specifikace polovodiče -> okamžitý exit
  if (!article.specs?.material) {
    return null;
  }

  const { material, voltageV } = article.specs;
  const isWideBandgap = material === "SiC" || material === "GaN";

  // 2. Specifická výkonová varianta
  if (isWideBandgap && typeof voltageV === "number" && voltageV > 0) {
    return `${material} // ${voltageV} V`;
  }

  // 3. Standardní materiálový výstup
  return material;
}
```

---

### 5.2 Bezpečné otevírání externích odkazů (Tabnabbing & Security)

#### ❌ Špatně (Bezpečnostní riziko):
```tsx
// ANTI-PATTERN: Chybí rel ochrana, zranitelné vůči reverse tabnabbing
<a href={partnerUrl} target="_blank">
  {partnerName}
</a>
```

#### ✅ Správně (Bezpečné produkční řešení):
```tsx
interface ExternalLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

// PRODUCTION-READY: Automatické zabezpečení externích odkazů
export function ExternalLink({ href, children, className }: ExternalLinkProps) {
  // Validace protokolu pro zamezení javascript: injection
  const isSafeProtocol = href.startsWith("https://") || href.startsWith("http://");
  const safeHref = isSafeProtocol ? href : "#";

  return (
    <a
      href={safeHref}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}
```

---

### 5.3 Exhaustive Type Checking s diskriminovaným sjednocením

```typescript
import type { ArticleCategory } from "@/types/portal";

/**
 * Zaručuje, že při přidání nové kategorie čipů kompilátor TypeScriptu
 * okamžitě vynutí implementaci příslušné barvy štítku.
 */
export function getCategoryAccentClass(category: ArticleCategory): string {
  switch (category) {
    case "chips":
      return "text-fel-cyan border-fel-cyan/30 bg-fel-cyan/10";
    case "materials":
      return "text-wafer-gold border-wafer-gold/30 bg-wafer-gold/10";
    case "power-elec":
      return "text-fel-blue border-fel-blue/30 bg-fel-blue/10";
    case "embedded":
      return "text-emerald-400 border-emerald-400/30 bg-emerald-400/10";
    case "quantum":
      return "text-fel-violet border-fel-violet/30 bg-fel-violet/10";
    case "industry":
      return "text-amber-400 border-amber-400/30 bg-amber-400/10";
    case "academic":
      return "text-blue-400 border-blue-400/30 bg-blue-400/10";
    default: {
      // TypeScript zde zkontroluje, že všechny varianty byly vyčerpány
      const _exhaustiveCheck: never = category;
      return "text-neutral-400 border-neutral-400/30 bg-neutral-400/10";
    }
  }
}
```

---
## 6. Čistá HTML struktura a debugger-friendly katalogy

- Každý samostatný HTML artefakt MUST mít jasnou strukturu `<!doctype html>`, `<html lang>`, `<head>`, `<body>` a sémantické landmarky (`header`, `main`, `section`, `footer`) podle významu obsahu.
- Jednoduchý katalog MAY zůstat v jediném HTML souboru, ale zdroj MUSÍ být rozdělen do čitelných bloků: metadata, styly, obsahová data, renderovací funkce a event handlery.
- HTML generované JavaScriptem MUST používat pojmenované funkce a template fragmenty; dlouhé minifikované řádky, anonymní vnořené callbacky a nečitelný HTML string jsou zakázané.
- Data variant MUST být uložena v pojmenovaných objektech s klíči, ne v pozičních polích, aby debugger zobrazoval význam hodnot bez dekódování indexů.
- Inline script MUST být jediný pro daný katalog, bez externích runtime závislostí, ale MUSÍ být formátovaný jako běžný zdrojový kód s konzistentním odsazením.
- Interaktivní prvky MUST mít `type`, dostupný název a explicitní stavovou zpětnou vazbu; clipboard akce MUSÍ mít bezpečný fallback nebo srozumitelnou nedostupnost.
- Zdrojový kód MUSÍ být organizovaný tak, aby při otevření v DevTools byly okamžitě rozpoznatelné sekce `DATA`, `DOM`, `RENDER` a `EVENTS`.

## 7. Závěrečný kontrolní seznam před publikací (Definition of Done)

Každý kousek kódu před odevzdáním musí projít tímto sítem:
- [ ] Žádné zanořené `if-else` (použity guard clauses a early returns).
- [ ] Žádný typ `any` v TypeScriptu; striktní kontrola typů.
- [ ] Všechny externí odkazy nesou `rel="noopener noreferrer"`.
- [ ] Žádný nechráněný `dangerouslySetInnerHTML`.
- [ ] Žádný Layout Shift (CLS = 0) – obrázky i boxy mají explicitní poměry stran / min-výšky.
- [ ] Plná podpora klávesnice (focus ringy, `Esc` na modalech).
- Každá oprava po sestavovacím selhání MUSÍ nejdříve odstranit konkrétní syntaktickou nebo typovou příčinu; změna nesmí rozšiřovat původní rozsah požadavku. Při úpravách JSX MUSÍ zůstat párování elementů čitelné a jednoznačné. Nadbytečné uzavírací elementy MUSÍ být odstraněny před dalším buildem.
