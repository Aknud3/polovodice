"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import type { Article } from "@/types/portal";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { ArticleCard } from "@/components/portal/ArticleCard";

interface NewsArchiveClientProps {
  initialArticles: Article[];
}

function formatArticleCount(count: number, language: "cs" | "en", isSearching = false): string {
  if (language === "en") {
    const prefix = isSearching ? "Found " : "Total ";
    return `${prefix}${count} ${count === 1 ? "article" : "articles"}`;
  }
  const prefix = isSearching ? "Nalezeno " : "Celkem ";
  const noun = count === 1 ? "článek" : count > 1 && count < 5 ? "články" : "článků";
  return `${prefix}${count} ${noun}`;
}

function formatSectionCount(count: number, language: "cs" | "en"): string {
  if (language === "en") {
    return `${count} ${count === 1 ? "article" : "articles"}`;
  }
  const noun = count === 1 ? "článek" : count > 1 && count < 5 ? "články" : "článků";
  return `${count} ${noun}`;
}

export function NewsArchiveClient({ initialArticles }: NewsArchiveClientProps) {
  const { language, t } = useLanguage();
  const [query, setQuery] = useState("");
  const cleanQuery = query.trim().toLowerCase();

  const filtered = cleanQuery.length > 0
    ? initialArticles.filter((article) => {
        const title = (language === "en" && article.en ? article.en.title : article.title).toLowerCase();
        const perex = (language === "en" && article.en ? article.en.perex : article.perex).toLowerCase();
        const tags = (language === "en" && article.en?.tags ? article.en.tags : article.tags) ?? [];
        const matchTag = tags.some((tag) => tag.toLowerCase().includes(cleanQuery));
        return title.includes(cleanQuery) || perex.includes(cleanQuery) || matchTag;
      })
    : initialArticles;

  // Rozdělení archivu na všeobecné informace a informace o fakultě
  const generalArticles = filtered.filter((article) => article.category !== "academic");
  const facultyArticles = filtered.filter((article) => article.category === "academic");

  return (
    <div className="space-y-10">
      {/* Záhlaví archivu */}
      <div className="pb-6 border-b border-neutral-200 dark:border-neutral-800">
        <h1 className="text-3xl sm:text-4xl font-bold font-sans tracking-tight text-neutral-900 dark:text-white">
          {t("archiveHeading")}
        </h1>
      </div>

      {/* Vyhledávací panel */}
      <div className="p-4 sm:p-5 rounded-sm border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#141846] shadow-xs space-y-3">
        {/* Hledací pole */}
        <div className="relative">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("search")}
            className="focus-ring w-full h-11 pl-10 pr-10 rounded-sm border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#0A0D30] text-sm text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 transition-colors shadow-2xs"
          />
          {query.length > 0 && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 dark:hover:text-white"
              aria-label={t("clearSearch")}
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Počítadlo výsledků */}
        <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400 flex items-center justify-between">
          <span>
            {formatArticleCount(filtered.length, language, cleanQuery.length > 0)}
          </span>
          {cleanQuery.length > 0 && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="text-cvut-blue dark:text-fel-cyan hover:underline"
            >
              {t("clearSearch")}
            </button>
          )}
        </div>
      </div>

      {/* 1. Všeobecné informace */}
      <section className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-neutral-200 dark:border-neutral-800">
          <h2 className="text-lg sm:text-xl font-bold font-sans tracking-tight text-neutral-900 dark:text-white">
            {t("generalInfo")}
          </h2>
          <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
            {formatSectionCount(generalArticles.length, language)}
          </span>
        </div>

        {generalArticles.length === 0 ? (
          <div className="py-12 text-center rounded-sm border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#141846]">
            <p className="text-sm font-mono text-neutral-500 dark:text-neutral-400">
              {t("emptySection")}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {generalArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </section>

      {/* 2. Informace o fakultě */}
      <section className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-neutral-200 dark:border-neutral-800">
          <h2 className="text-lg sm:text-xl font-bold font-sans tracking-tight text-neutral-900 dark:text-white">
            {t("facultyInfo")}
          </h2>
          <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
            {formatSectionCount(facultyArticles.length, language)}
          </span>
        </div>

        {facultyArticles.length === 0 ? (
          <div className="py-12 text-center rounded-sm border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#141846]">
            <p className="text-sm font-mono text-neutral-500 dark:text-neutral-400">
              {t("emptySection")}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facultyArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
