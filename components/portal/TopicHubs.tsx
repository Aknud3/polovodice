"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import type { ArticleCategory, CategoryCounts } from "@/types/portal";

interface TopicHubsProps {
  activeCategory: ArticleCategory | "all";
  onSelectCategory: (category: ArticleCategory | "all") => void;
  counts?: CategoryCounts;
}

export function TopicHubs({
  activeCategory,
  onSelectCategory,
  counts,
}: TopicHubsProps) {
  const { t } = useLanguage();
  const categories: Array<{ id: ArticleCategory | "all"; label: string }> = [
    { id: "all", label: t("allNews") },
    { id: "chips", label: t("chipDesign") },
    { id: "materials", label: t("materialsSiC") },
    { id: "power-elec", label: t("powerElectronics") },
    { id: "embedded", label: t("embeddedIoT") },
    { id: "quantum", label: t("quantumPhotonics") },
    { id: "industry", label: t("industryChipsAct") },
  ];

  return (
    <div className="w-full py-1">
      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
        {categories.map((category) => {
          const isActive = activeCategory === category.id;
          const count = counts?.[category.id === "all" ? "all" : category.id];

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => onSelectCategory(category.id)}
              className={`focus-ring min-h-9 h-auto px-2 sm:px-3 py-1.5 rounded-xs text-[11px] sm:text-xs font-mono font-semibold transition-all duration-150 flex items-center gap-1.5 ${
                isActive
                  ? "bg-[#0065bd] text-white shadow-xs dark:bg-fel-cyan dark:text-neutral-950 font-bold"
                  : "bg-white dark:bg-[#141846] text-slate-800 dark:text-neutral-300 border border-slate-300 dark:border-neutral-800 hover:border-[#0065bd] dark:hover:border-fel-cyan hover:text-[#0065bd] dark:hover:text-fel-cyan shadow-2xs"
              }`}
            >
              <span>{category.label}</span>
              {typeof count === "number" && (
                <span
                  className={`text-[10px] px-1 py-0.2 rounded-xs font-bold ${
                    isActive
                      ? "bg-black/20 text-white dark:bg-black/30 dark:text-neutral-900"
                      : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
