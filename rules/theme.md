# Design System & Vizuální styl: Polovodiče

## 1. Vztah k vizuálu ČVUT FEL
Polovodiče používají stejnou vizuální rodinu jako ČVUT FEL, ale nesmí být přímou kopií fakultního webu. Varianty v katalogu mohou mít odchylku až přibližně 20 %: zachovávají navy základ, elektrickou modř, cyan akcent a IBM Plex typografii, ale zřetelně posouvají odstín, světlost nebo sytost, aby byly mezi sebou porovnatelné.

Referenční tokeny ČVUT FEL:
- Navy: `#080B38`
- FEL blue: `#3A2AD0`
- Cyan: `#44D8EB`
- Green: `#43F6C8`
- Violet: `#6B43F0`
- ČVUT blue: `#0065BD`
- Dark panel: `#141846`
- Dark border: `#24264A`

## 2. Povinné tokeny variant
Každá varianta musí definovat samostatné tokeny pro light i dark náhled a společné akcenty:
`dark`, `darkDeep`, `darkText`, `darkMuted`, `darkBorder`, `lightBg`, `lightCard`, `lightText`, `lightMuted`, `lightBorder`, `blue`, `blueHover`, `cvutBlue`, `cvutDarkBlue`, `cyan`, `green`, `violet`, `waferGold`, `circuitRed`.

## 3. Výběrový katalog
- Katalog variant je v `lightning-grids.html` a slouží pouze k vizuálnímu výběru; neovlivňuje runtime aplikace.
- Katalog musí obsahovat 10 variant označených `01` až `10`, vždy s light i dark náhledem, názvem a přesnými hex tokeny.
- Každá varianta má být identifikovatelná jako „bratranec“ FEL: žádné radikální změny na červenou, zelenou nebo fialovou dominantní paletu.
- Po výběru uživatelem se jediná zvolená varianta propíše do `app/globals.css`; ostatní zůstanou pouze v katalogu.

### Vybraná varianta 09: Green Silicon
Runtime používá tyto přesné tokeny varianty 09: `dark #081d3d`, `darkDeep #041129`, `darkText #f4fffc`, `darkMuted #abd8ca`, `darkBorder #24554e`, `lightBg #edfff9`, `lightCard #ffffff`, `lightText #0e2b35`, `lightMuted #4f7770`, `lightBorder #c3e4da`, `blue #2856cb`, `blueHover #1842ac`, `cvutBlue #0879bb`, `cvutDarkBlue #075781`, `cyan #27d0d0`, `green #3beeb1`, `violet #4c72e3`, `waferGold #e2a21a`, `circuitRed #e34c55`.
## 4. Výchozí zobrazení
- Portál se otevírá v tmavém režimu jako výchozí, aby byla první návštěva konzistentní s technologickou identitou Polovodičů.
- Tmavý režim používá navy plátno, tmavé panely a světlý text. Přepínač stále umožňuje ruční přepnutí do light mode.
- Systémová preference zařízení nesmí přepsat výchozí tmavý režim; ruční volba uživatele se ukládá přes `next-themes`.
- IBM Plex Sans je hlavní písmo, IBM Plex Mono technické písmo.
- Light mode používá vysoký kontrast textu na světlém podkladu.
- Komponenty nesmí přidávat flags tam, kde to zakazuje `rules/layout.md`.
