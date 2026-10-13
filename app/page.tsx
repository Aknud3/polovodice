import { getFeaturedArticle, getEditorialArticles, getFacultyNews, getCategoryCounts } from "@/lib/api";
import { HeroFeature } from "@/components/portal/HeroFeature";
import { EditorialSidebar } from "@/components/portal/EditorialSidebar";
import { HomeFeed } from "@/components/portal/HomeFeed";
import { FacultyNewsSection } from "@/components/portal/FacultyNews";

export default async function HomePage() {
  const [featured, editorialArticles, facultyNews] = await Promise.all([
    getFeaturedArticle(),
    getEditorialArticles(),
    getFacultyNews(),
  ]);

  // Vyloučíme hlavní zprávu týdne z mřížky ostatních novinek
  const gridArticles = editorialArticles.filter((a) => a.id !== featured.id);

  // Počítadla filtrů musejí odpovídat přesně tomu, co mřížka umí zobrazit
  const counts = await getCategoryCounts(gridArticles);

  return (
    <div className="w-full max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-10 sm:space-y-14 overflow-x-clip">
      {/* 1. INFORMACE TÝDNE (8 : 4 SPLIT) */}
      <section id="informace-tydne">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 items-start lg:items-stretch">
          {/* Levých 8 sloupců: Hlavní zpráva týdne BEZ flags a technických štítků */}
          <div className="col-span-12 lg:col-span-8">
            <HeroFeature article={featured} />
          </div>

          {/* Pravé 4 sloupce: cyklovač článků a rotující zprávy o fakultě */}
          <div className="col-span-12 lg:col-span-4 h-full">
            <EditorialSidebar articles={gridArticles} facultyNews={facultyNews} />
          </div>
        </div>
      </section>

      {/* 2. OSTATNÍ NOVINKY (Filtry rubrik + mřížka 3 × 1 bez flags + šipka do archivu) */}
      <HomeFeed initialArticles={gridArticles} counts={counts} />

      {/* 3. INFORMACE O FAKULTĚ (Nejdůležitější zprávy fakulty) */}
      <FacultyNewsSection articles={facultyNews} />
    </div>
  );
}
