import { getFeaturedArticle, getArticles, getCategoryCounts } from "@/lib/api";
import { HeroFeature } from "@/components/portal/HeroFeature";
import { EditorialSidebar } from "@/components/portal/EditorialSidebar";
import { HomeFeed } from "@/components/portal/HomeFeed";
import { SectionTemplate } from "@/components/portal/SectionTemplate";

export default async function HomePage() {
  const [featured, allArticles, counts] = await Promise.all([
    getFeaturedArticle(),
    getArticles(),
    getCategoryCounts(),
  ]);

  // Vyloučíme hlavní zprávu týdne z mřížky ostatních novinek
  const gridArticles = allArticles.filter((a) => a.id !== featured.id);

  return (
    <div className="w-full max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-10 sm:space-y-14 overflow-x-clip">
      {/* 1. INFORMACE TÝDNE (8 : 4 SPLIT) */}
      <section id="informace-tydne" className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-fel-blue dark:bg-fel-cyan" />
            <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
              Informace týdne
            </h2>
          </div>
          <span className="text-xs font-mono text-neutral-400">
            Týdenní vydání
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 items-start">
          {/* Levých 8 sloupců: Hlavní zpráva týdne BEZ flags a technických štítků */}
          <div className="col-span-12 lg:col-span-8">
            <HeroFeature article={featured} />
          </div>

          {/* Pravé 4 sloupce: Redakční týdenní přehled & animovaný cyklovač článků */}
          <div className="col-span-12 lg:col-span-4">
            <EditorialSidebar articles={gridArticles} />
          </div>
        </div>
      </section>

      {/* 2. OSTATNÍ NOVINKY (Nescrollovatelné filtry + mřížka čistých karet bez flags) */}
      <HomeFeed initialArticles={gridArticles} counts={counts} />

      {/* 3. ŠABLONA PRO DALŠÍ SEKCI (Ukázka budoucí rozšiřitelnosti se stylovými tlačítky) */}
      <SectionTemplate />
    </div>
  );
}
