import {
  getFeaturedArticle,
  getEditorialArticles,
  getFacultyNews,
  getCategoryCounts,
  getUpcomingEvents,
} from "@/lib/api";
import { HeroFeature } from "@/components/portal/HeroFeature";
import { EditorialSidebar } from "@/components/portal/EditorialSidebar";
import { AudienceGateway } from "@/components/portal/AudienceGateway";
import { HomeFeed } from "@/components/portal/HomeFeed";
import { UpcomingEvents } from "@/components/portal/UpcomingEvents";
import { FacultyNewsSection } from "@/components/portal/FacultyNews";
import { NewsletterSection } from "@/components/portal/NewsletterSection";

export default async function HomePage() {
  const [featured, editorialArticles, facultyNews, upcomingEvents] = await Promise.all([
    getFeaturedArticle(),
    getEditorialArticles(),
    getFacultyNews(),
    getUpcomingEvents(2),
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

      {/* 2. ROZCESTNÍK CÍLOVÝCH SKUPIN (5 karet: studenti, výzkumníci, veřejnost, partneři, média) */}
      <AudienceGateway />

      {/* 3. OSTATNÍ NOVINKY (Filtry rubrik + mřížka 3 × 1 bez flags + šipka do archivu) */}
      <HomeFeed initialArticles={gridArticles} counts={counts} />

      {/* 4. NADCHÁZEJÍCÍ AKCE (1–2 nejbližší akce + odkaz na /akce) */}
      <UpcomingEvents events={upcomingEvents} />

      {/* 5. INFORMACE O FAKULTĚ (Nejdůležitější zprávy fakulty) */}
      <FacultyNewsSection articles={facultyNews} />

      {/* 6. NEWSLETTER (přihlašovací blok, mockup formulář s lokálním potvrzením) */}
      <NewsletterSection />
    </div>
  );
}
