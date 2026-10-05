import { ArrowRight, Plus, ExternalLink } from "lucide-react";

export function SectionTemplate() {
  return (
    <section id="nova-sekce" className="rounded-sm border border-slate-200 dark:border-neutral-800 bg-white dark:bg-[#141846] p-4 sm:p-8 lg:p-10 shadow-xs space-y-6 overflow-hidden">
      {/* Záhlaví šablony bez emotikonů */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 dark:border-neutral-800 gap-2">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold font-sans tracking-tight text-slate-900 dark:text-white">
            Zde mohou být nové informace, které na stránce mohou být zobrazeny
          </h3>
          <p className="text-xs sm:text-sm font-mono text-neutral-400 mt-1">
            Toto je template pro novou sekci / sekce.
          </p>
        </div>

        <span className="self-start sm:self-center px-2.5 py-1 rounded-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 font-mono text-xs border border-neutral-200 dark:border-neutral-700 shrink-0">
          Template sekce
        </span>
      </div>

      {/* Prázdný obsahový prostor s ukázkou tlačítek */}
      <div className="py-6 sm:py-8 px-4 sm:px-6 rounded-xs border-2 border-dashed border-slate-200 dark:border-neutral-800 text-center space-y-3">
        <p className="text-sm font-sans text-slate-700 dark:text-neutral-300 max-w-lg mx-auto leading-relaxed">
          Tento prostor je připraven pro vložení libovolného dalšího obsahu (například partnerských projektů,
          fotogalerie, rozhovorů či laboratorních výstupů).
        </p>

        {/* Ukázka stylových tlačítek bez emotikonů */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <button
            type="button"
            className="focus-ring px-5 py-2.5 rounded-sm bg-[#0065bd] hover:bg-[#004f8a] text-white text-xs font-mono font-semibold transition-colors flex items-center gap-2 shadow-xs"
          >
            <span>Primární tlačítko</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            className="focus-ring px-5 py-2.5 rounded-sm bg-blue-50 hover:bg-blue-100 text-[#0065bd] border border-blue-200 dark:bg-fel-cyan/15 dark:hover:bg-fel-cyan/25 dark:text-fel-cyan dark:border-fel-cyan/30 text-xs font-mono font-semibold transition-colors flex items-center gap-2"
          >
            <span>Sekundární akce</span>
            <Plus className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            className="focus-ring px-5 py-2.5 rounded-sm bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-700 text-xs font-mono font-semibold transition-colors flex items-center gap-2"
          >
            <span>Sekundární tlačítko</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
