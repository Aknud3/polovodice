"use client";

import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";
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
  const [isOpen, setIsOpen] = useState(false);

  const categories: Array<{ id: ArticleCategory | "all"; label: string }> = [
    { id: "all", label: t("allNews") },
    { id: "chips", label: t("chipDesign") },
    { id: "materials", label: t("materialsSiC") },
    { id: "power-elec", label: t("powerElectronics") },
    { id: "embedded", label: t("embeddedIoT") },
    { id: "quantum", label: t("quantumPhotonics") },
    { id: "industry", label: t("industryChipsAct") },
  ];

  const activeItem = categories.find((c) => c.id === activeCategory) ?? categories[0];
  const activeCount = counts?.[activeItem.id === "all" ? "all" : activeItem.id];

  return (
    <div className="w-full py-1">
      {/* Univerzální rozbalovací menu rubrik pro všechna zařízení */}
      <div className="relative w-full sm:max-w-xs md:max-w-sm">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          className="focus-ring w-full min-h-10 px-3.5 py-2 rounded-sm bg-white dark:bg-[#141846] text-slate-900 dark:text-white border border-slate-300 dark:border-neutral-800 flex items-center justify-between gap-2 text-xs font-mono font-semibold shadow-2xs hover:border-[#0065bd] dark:hover:border-fel-cyan transition-colors"
        >
          <span className="flex items-center gap-2 min-w-0">
            <span className="text-muted font-normal text-[11px] shrink-0">{t("topicLabel")}</span>
            <span className="truncate">{activeItem.label}</span>
            {typeof activeCount === "number" && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-xs bg-[#0065bd] text-white dark:bg-fel-cyan dark:text-neutral-950 font-bold shrink-0">
                {activeCount}
              </span>
            )}
          </span>
          <ChevronDown
            className={`w-4 h-4 text-neutral-400 shrink-0 transition-transform duration-150 ${
              isOpen ? "rotate-180 text-[#0065bd] dark:text-fel-cyan" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div className="absolute left-0 right-0 z-30 mt-1.5 rounded-sm border border-slate-300 dark:border-neutral-800 bg-white dark:bg-[#141846] shadow-lg overflow-hidden divide-y divide-neutral-100 dark:divide-neutral-800/80">
            {categories.map((category) => {
              const isActive = activeCategory === category.id;
              const count = counts?.[category.id === "all" ? "all" : category.id];

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => {
                    onSelectCategory(category.id);
                    setIsOpen(false);
                  }}
                  className={`w-full min-h-10 px-3.5 py-2.5 text-left text-xs font-mono flex items-center justify-between gap-2 transition-colors ${
                    isActive
                      ? "bg-[#0065bd]/10 dark:bg-fel-cyan/15 text-[#0065bd] dark:text-fel-cyan font-bold"
                      : "text-slate-800 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800/60"
                  }`}
                >
                  <span className="truncate">{category.label}</span>
                  <span className="flex items-center gap-2 shrink-0">
                    {typeof count === "number" && (
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-xs font-bold ${
                          isActive
                            ? "bg-[#0065bd] text-white dark:bg-fel-cyan dark:text-neutral-950"
                            : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                        }`}
                      >
                        {count}
                      </span>
                    )}
                    {isActive && <Check className="w-3.5 h-3.5" />}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
