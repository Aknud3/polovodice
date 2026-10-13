"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Article, ArticleCategory, CategoryCounts } from "@/types/portal";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { TopicHubs } from "./TopicHubs";
import { ArticleCard } from "./ArticleCard";

/** Maximální počet karet v mřížce 3 × 1 (rules/layout.md §2.4). */
const VISIBLE_ARTICLE_LIMIT = 3;

interface HomeFeedProps {
  initialArticles: Article[];
  counts: CategoryCounts;
}

export function HomeFeed({ initialArticles, counts }: HomeFeedProps) {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<ArticleCategory | "all">("all");

  const filteredArticles = (
    selectedCategory === "all"
      ? initialArticles
      : initialArticles.filter((article) => article.category === selectedCategory)
  ).slice(0, VISIBLE_ARTICLE_LIMIT);

  return (
    <section id="ostatni-novinky" className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-neutral-200 dark:border-neutral-800">
          <h2 className="text-xl sm:text-2xl font-bold font-sans tracking-tight text-neutral-900 dark:text-white">
            {t("otherNews")}
          </h2>
          <Link
            href="/zpravy"
            className="text-xs font-mono font-semibold text-fel-blue dark:text-fel-cyan hover:underline flex items-center gap-1 shrink-0"
          >
            {t("fullArchive")} <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <TopicHubs
          activeCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          counts={counts}
        />
      </div>

      {filteredArticles.length === 0 ? (
        <div className="py-16 text-center rounded-sm border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#141846]">
          <p className="text-sm font-mono text-neutral-500">
            {t("emptyCategory")}
          </p>
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className="mt-3 text-xs font-mono text-fel-cyan underline"
          >
            {t("showAllNews")}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </section>
  );
}
