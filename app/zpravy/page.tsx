import type { Metadata } from "next";
import { getArticles } from "@/lib/api";
import { NewsArchiveClient } from "@/components/portal/NewsArchiveClient";

export const metadata: Metadata = {
  title: "Archiv zpráv a analýz // POLOVODIČE ČVUT FEL",
  description:
    "Kompletní archiv zpráv, analýz a tiskových zpráv z oblasti polovodičů, návrhu integrovaných obvodů a elektrotechniky na FEL ČVUT.",
};

export default async function NewsPage() {
  const articles = await getArticles();

  return (
    <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Záhlaví archivu */}
      <div className="space-y-2 pb-6 border-b border-neutral-200 dark:border-neutral-800">
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-xs bg-fel-blue/10 dark:bg-fel-cyan/15 text-fel-blue dark:text-fel-cyan text-xs font-mono font-bold uppercase tracking-wider">
          ARCHIV TECHNOLOGICKÉHO ZPRAVODAJSTVÍ
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-sans tracking-tight text-neutral-900 dark:text-white">
          Zprávy, studie & polovodičové novinky
        </h1>
        <p className="text-base text-neutral-600 dark:text-neutral-300 max-w-3xl leading-relaxed">
          Sledujte nejnovější dění z Katedry mikroelektroniky, partnerských gigafactories (onsemi, STMicroelectronics)
          a výsledky výzkumu nových materiálů (SiC, GaN).
        </p>
      </div>

      {/* Klientský interaktivní filtr a mřížka */}
      <NewsArchiveClient initialArticles={articles} />
    </div>
  );
}
