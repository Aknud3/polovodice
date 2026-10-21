# Analýza drátového modelu webu

## 1. Účel a celková struktura

Web je navržen jako tematický portál s hlavní stránkou a pěti hlavními
sekcemi:

1.  **Novinky**
2.  **O nás**
3.  **Projekty**
4.  **Vzdělávání**
5.  **Akce**

Hlavní navigace je vedena z homepage do jednotlivých sekcí. Diagram
rozlišuje běžné stránky (modře/fialově orámované) a datové entity či
typy obsahu (oranžově orámované). Plné šipky představují navigaci mezi
stránkami, šipky k entitám znázorňují návaznost stránky na obsah a
přerušované čáry označují potenciální propojení mezi obsahovými typy.

## 2. Homepage

Homepage slouží jako rozcestník a přehled aktuálního dění.

### Obsah homepage

-   Rozcestník cílových skupin -- krátký popis a odkazy pro:
    -   studenty,
    -   výzkumníky,
    -   veřejnost,
    -   partnery,
    -   média.
-   Newsletter.
-   Nadcházející akce -- přibližně 1--2 nejbližší akce.
-   Novinky -- přibližně 2--3 poslední novinky.
-   Patička webu -- například kontakty a odkazy na sociální sítě.

Homepage odkazuje do sekcí Novinky, O nás, Projekty, Vzdělávání a Akce.

## 3. Novinky

Sekce **Novinky** obsahuje dva typy obsahu:

### 3.1 Medailonky

Samostatné medailonky osob nebo dalších prezentovaných subjektů.

**Atributy entity Medailonek:** - foto, - jméno, - datum, - název, -
text.

### 3.2 Články

Články tvoří samostatnou obsahovou část sekce Novinky.

**Atributy entity Článek:** - foto, - název, - autor, - datum, - text.

V diagramu jsou u sekce Novinky uvedeny také odkazy na výpisy medailonků
a článků. U medailonků je naznačena URL ve tvaru `/novinky/medailonky`;
konkrétní URL je vhodné ověřit při implementaci.

## 4. O nás

Sekce **O nás** představuje instituci, její kontakty, partnery a
historii.

### Podstránky

-   **Kontakty**
-   **Partneři**
-   **Historie**

### Historie

Historie má podobu časové osy. Uživatel by měl mít možnost zobrazovat
vybrané typy událostí či obsahových entit: - události, - projekty, -
medailonky, - články.

Historie tedy může být propojena s dalšími částmi webu a fungovat jako
průřezová prezentace obsahu v čase.

## 5. Projekty

Sekce **Projekty** obsahuje přehled projektů a projektových výzev.
Diagram zmiňuje také filtr podle fakulty a zobrazení projektů v mřížce.

### 5.1 Projekt

**Atributy entity Projekt:** - foto, - název, - popis, - stav, -
fakulta/součást, - kontakt, - výstupy/publikace.

### 5.2 Projektová výzva

**Atributy entity Projektová výzva:** - foto, - název, - popis, - cílová
skupina, - podmínky, - deadline, - kontakt, - fakulta/součást.

### Funkce přehledu

-   filtrování podle fakulty/součásti,
-   zobrazení projektů v mřížce,
-   proklik z přehledu na detail projektu nebo projektové výzvy.

Projektové entity jsou v diagramu propojené přerušovanými čarami s
dalšími částmi webu, což naznačuje možné tematické nebo obsahové vazby.

## 6. Vzdělávání

Sekce **Vzdělávání** sdružuje vzdělávací nabídku a příležitosti.

### Podstránky

-   **Studijní program**
-   **Příležitosti**
-   **Letní školy**
-   **FAQ**

Diagram tyto části uvádí jako samostatné stránky. Konkrétní atributy
jejich obsahu nejsou v modelu rozepsány.

## 7. Akce

Sekce **Akce** nabízí přehled akcí a kalendář akcí. V diagramu je uveden
také filtr podle typu.

### Atributy entity Akce

-   typ:
    -   událost,
    -   konference,
    -   letní škola;
-   místo,
-   datum od/do,
-   úvodní foto,
-   název,
-   popis,
-   cílovka:
    -   studenti,
    -   výzkumníci,
    -   veřejnost;
-   odkaz/registrace.

Z detailu akce by měl být dostupný odkaz na další informace nebo
registrační stránku, pokud je relevantní. Letní školy jsou zároveň
uvedeny v sekci Vzdělávání; diagram tak naznačuje možné propojení
stejného obsahu mezi sekcemi.

## 8. Přehled navigace

``` text
Homepage
├── Novinky
│   ├── Medailonky
│   │   └── Entita: Medailonek
│   └── Články
│       └── Entita: Článek
├── O nás
│   ├── Kontakty
│   ├── Partneři
│   └── Historie
│       └── časová osa: události, projekty, medailonky, články
├── Projekty
│   ├── přehled projektů (filtr podle fakulty/součásti, mřížka)
│   │   └── Entita: Projekt
│   └── projektové výzvy
│       └── Entita: Projektová výzva
├── Vzdělávání
│   ├── Studijní program
│   ├── Příležitosti
│   ├── Letní školy
│   └── FAQ
└── Akce
    ├── filtr podle typu
    ├── kalendář akcí
    └── Entita: Akce
```

## 9. Datové entity a jejich atributy

  -----------------------------------------------------------------------
  Entita                              Atributy
  ----------------------------------- -----------------------------------
  **Medailonek**                      foto, jméno, datum, název, text

  **Článek**                          foto, název, autor, datum, text

  **Projekt**                         foto, název, popis, stav,
                                      fakulta/součást, kontakt,
                                      výstupy/publikace

  **Projektová výzva**                foto, název, popis, cílová skupina,
                                      podmínky, deadline, kontakt,
                                      fakulta/součást

  **Akce**                            typ, místo, datum od/do, úvodní
                                      foto, název, popis, cílová skupina,
                                      odkaz/registrace
  -----------------------------------------------------------------------

## 10. Propojení obsahu

Přerušované čáry v diagramu označují možná propojení mezi obsahovými
typy. Z modelu lze vyčíst zejména tyto zamýšlené vazby:

-   Medailonky a články mohou být součástí časové osy Historie.
-   Projekty a projektové výzvy mohou souviset s historií a dalšími
    obsahovými stránkami.
-   Akce mohou být propojené s Letními školami v sekci Vzdělávání.
-   Obsah může být filtrován nebo zobrazován podle cílové skupiny,
    fakulty/součásti či typu akce.

Přerušované čáry je potřeba chápat jako návrh potenciálních vazeb,
nikoli jako potvrzené technické vztahy v databázi.

## 11. Doporučení pro další specifikaci

Před implementací je vhodné doplnit následující rozhodnutí:

1.  **Cílové skupiny:** upřesnit, zda jde pouze o navigační rozcestník,
    nebo také o štítky použitelné při filtrování obsahu.
2.  **Historie:** stanovit, které typy obsahu mohou být položkou časové
    osy a zda se řadí podle data vzniku, konání nebo jiného data.
3.  **Akce a letní školy:** rozhodnout, zda letní škola bude typem
    entity Akce, samostatným typem obsahu ve Vzdělávání, nebo jedním
    záznamem sdíleným mezi oběma sekcemi.
4.  **Fakulty a součásti:** sjednotit číselník fakult/součástí a určit,
    zda může jeden projekt nebo výzva náležet k více součástem.
5.  **Stav projektu:** definovat možné hodnoty a pravidla pro jejich
    zobrazování.
6.  **Kontakty:** rozhodnout, zda bude kontakt uložen jako text, osoba s
    vlastními údaji, nebo odkaz na kontaktní stránku.
7.  **Newsletter:** určit poskytovatele, způsob přihlášení a umístění
    formuláře.
8.  **URL a SEO:** definovat finální adresy stránek, pravidla pro URL
    detailů a metadata.
9.  **Patička:** specifikovat povinné odkazy, kontaktní údaje a sociální
    sítě.
10. **Správa obsahu:** stanovit, kdo může vytvářet a upravovat
    jednotlivé entity a zda je nutné plánování publikace.

## 12. Shrnutí

Model popisuje web s pěti hlavními sekcemi a několika typy opakovaně
spravovaného obsahu. Nejvýraznějšími datovými entitami jsou
**Medailonek, Článek, Projekt, Projektová výzva a Akce**. Vedle běžné
navigace model počítá s průřezovými vazbami mezi obsahem, zejména s
časovou osou Historie a s propojením Letních škol s akcemi. Tyto vazby a
některé atributy je vhodné potvrdit před návrhem redakčního systému nebo
databáze.
