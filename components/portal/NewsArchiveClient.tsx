"use client";

import { useState } from "react";
import { Search, X, Filter } from "lucide-react";
import type { Article, ArticleCategory, SemiconductorMaterial } from "@/types/portal";
import { ArticleCard } from "@/components/portal/ArticleCard";

interface NewsArchiveClientProps {
  initialArticles: Article[];
}

export function NewsArchiveClient({ initialArticles }: NewsArchiveClientProps) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ArticleCategory | "all">("all");
  const [selectedMaterial, setSelectedMaterial] = useState<SemiconductorMaterial | "all">("all");

  const cleanQuery = query.trim().toLowerCase();

  const filtered = initialArticles.filter((article) => {
    // 1. Kategorie
    if (selectedCategory !== "all" && article.category !== selectedCategory) {
      return false;
    }

    // 2. Materiál polovodiče
    if (selectedMaterial !== "all" && article.specs?.material !== selectedMaterial) {
      return false;
    }

    // 3. Textové vyhledávání
    if (cleanQuery.length > 0) {
      const matchTitle = article.title.toLowerCase().includes(cleanQuery);
      const matchPerex = article.perex.toLowerCase().includes(cleanQuery);
      const matchTag = article.tags.some((t) => t.toLowerCase().includes(cleanQuery));
      return matchTitle || matchPerex || matchTag;
    }

    return true;
  });

  const categories: Array<{ id: ArticleCategory | "all"; label: string }> = [
    { id: "all", label: "Všechny rubriky" },
    { id: "chips", label: "Návrh čipů & ASIC" },
    { id: "materials", label: "Materiály (SiC / GaN)" },
    { id: "power-elec", label: "Výkonová elektronika" },
    { id: "embedded", label: "Vestavné systémy & IoT" },
    { id: "quantum", label: "Kvantové čipy & Fotonika" },
    { id: "industry", label: "Průmysl & Chips Act" },
  ];

  const materials: Array<{ id: SemiconductorMaterial | "all"; label: string }> = [
    { id: "all", label: "Všechny materiály" },
    { id: "SiC", label: "SiC (Karbid křemíku)" },
    { id: "GaN", label: "GaN (Nitrid galia)" },
    { id: "Si", label: "Křemík (Si)" },
    { id: "InP", label: "Fotonický InP" },
  ];

  return (
    <div className="space-y-8">
      {/* Filtrační panel */}
      <div className="p-6 rounded-sm border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#141846] space-y-5 shadow-xs">
        {/* Hledací pole */}
        <div className="relative">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Hledat v článcích, autorech, polovodičových technologiích a tazích..."
            className="focus-ring w-full h-11 pl-10 pr-10 rounded-sm border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#0A0D30] text-sm text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 transition-colors shadow-2xs"
          />
          {query.length > 0 && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 dark:hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Kategorie a materiály filtry */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
            <span className="text-neutral-400 font-semibold mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3" /> Rubrika:
            </span>
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`focus-ring h-7 px-2.5 rounded-xs transition-colors ${
                  selectedCategory === cat.id
                    ? "bg-fel-blue dark:bg-fel-cyan text-white dark:text-neutral-950 font-bold"
                    : "bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700/60 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono pt-2 border-t border-neutral-100 dark:border-neutral-800">
            <span className="text-neutral-400 font-semibold mr-1">Polovodič:</span>
            {materials.map((mat) => (
              <button
                key={mat.id}
                type="button"
                onClick={() => setSelectedMaterial(mat.id)}
                className={`focus-ring h-6 px-2 rounded-xs transition-colors ${
                  selectedMaterial === mat.id
                    ? "bg-amber-500 text-white font-bold"
                    : "bg-neutral-100 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700/60 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                }`}
              >
                {mat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Počítadlo výsledků */}
        <div className="pt-2 text-xs font-mono text-neutral-400 flex items-center justify-between border-t border-neutral-100 dark:border-neutral-800">
          <span>Nalezeno {filtered.length} {filtered.length === 1 ? "článek" : filtered.length < 5 ? "články" : "článků"}</span>
          {(selectedCategory !== "all" || selectedMaterial !== "all" || query.length > 0) && (
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("all");
                setSelectedMaterial("all");
                setQuery("");
              }}
              className="text-fel-cyan hover:underline"
            >
              Resetovat filtry
            </button>
          )}
        </div>
      </div>

      {/* Mřížka článků */}
      {filtered.length === 0 ? (
        <div className="py-20 text-center rounded-sm border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#141846]">
          <p className="text-base font-semibold text-neutral-900 dark:text-white mb-2">
            Žádné články neodpovídají zadaným kritériím.
          </p>
          <p className="text-xs font-mono text-neutral-400">
            Zkuste změnit klíčové slovo nebo vybrat jinou rubriku.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
