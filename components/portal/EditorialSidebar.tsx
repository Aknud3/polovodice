"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import type { Article, FacultyNewsItem } from "@/types/portal";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { FacultyNewsRail } from "./FacultyNews";
import { ArticleMedia } from "./ArticleMedia";

interface EditorialSidebarProps {
  articles?: Article[];
  facultyNews?: FacultyNewsItem[];
}

export function EditorialSidebar({ articles = [], facultyNews = [] }: EditorialSidebarProps) {
  const { language, t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-cycle článků každých 5 sekund pro živý animovaný prvek
  useEffect(() => {
    if (articles.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % articles.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [articles.length]);

  const currentArticle = articles[currentIndex];
  const isEn = language === "en" && currentArticle?.en;
  const currentTitle = isEn ? currentArticle.en!.title : currentArticle?.title;
  const currentPerex = isEn ? currentArticle.en!.perex : currentArticle?.perex;
  const currentCategoryLabel = isEn
    ? currentArticle.en!.categoryLabel
    : (currentArticle?.categoryLabel ?? "");
  const currentImageAlt = isEn
    ? (currentArticle.en!.imageAlt ?? currentArticle?.imageAlt)
    : currentArticle?.imageAlt;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + articles.length) % articles.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % articles.length);
  };

  return (
    <aside className="h-full flex flex-col justify-between gap-4 lg:gap-0">
      {/* 1. ANIMOVANÝ CYKLUJÍCÍ PRVEK ČLÁNKŮ */}
      {articles.length > 0 && currentArticle && (
        <div className="rounded-sm border border-slate-200 dark:border-neutral-800 bg-white dark:bg-[#141846] p-4 sm:p-5 shadow-xs space-y-4">
          {/* Záhlaví cyklovače */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-neutral-800 text-xs font-mono">
            <div>
              <span className="font-bold uppercase tracking-wider text-slate-900 dark:text-white text-[11px]">
                {t("moreArticles")}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handlePrev}
                className="min-w-9 min-h-9 p-1 flex items-center justify-center hover:text-[#0065bd] dark:hover:text-fel-cyan rounded-xs text-slate-400 focus-ring"
                aria-label={t("prevArticle")}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-[10px] text-slate-400 min-w-[28px] text-center">
                {currentIndex + 1} / {articles.length}
              </span>
              <button
                type="button"
                onClick={handleNext}
                className="min-w-9 min-h-9 p-1 flex items-center justify-center hover:text-[#0065bd] dark:hover:text-fel-cyan rounded-xs text-slate-400 focus-ring"
                aria-label={t("nextArticle")}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Animovaná karta rotujícího článku */}
          <Link
            href={`/zpravy/${currentArticle.slug}`}
            className="group block space-y-2.5 transition-all duration-300"
          >
            <div className="aspect-video w-full rounded-xs overflow-hidden bg-neutral-900 relative">
              <ArticleMedia
                imageUrl={currentArticle.imageUrl}
                imageAlt={currentImageAlt}
                label={currentCategoryLabel}
                compact
                imageClassName="group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono text-neutral-400 block">
                {currentArticle.publishedAt}
              </span>
              <h4 className="text-sm font-bold font-sans text-slate-900 dark:text-white group-hover:text-[#0065bd] dark:group-hover:text-fel-cyan transition-colors line-clamp-2 leading-snug">
                {currentTitle}
              </h4>
              <p className="text-xs text-slate-700 dark:text-neutral-300 line-clamp-2 leading-relaxed">
                {currentPerex}
              </p>
            </div>

            <div className="pt-2 text-xs font-mono font-semibold text-[#0065bd] dark:text-fel-cyan flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
              <span>{t("goToArticle")}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          {/* Indikační tečky */}
          <div className="flex items-center justify-center gap-1.5 pt-1">
            {articles.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  currentIndex === idx
                    ? "w-4 bg-[#0065bd] dark:bg-fel-cyan"
                    : "w-1.5 bg-slate-300 dark:bg-neutral-700 hover:bg-slate-400"
                }`}
                aria-label={`${t("goToArticle")} ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* 2. TECHNICKÝ ODDĚLOVAČ – čistá jemná linka pro rozbití pozornosti a lícování */}
      <div className="flex-1 min-h-6 flex items-center justify-center py-2" aria-hidden="true">
        <div className="h-px w-full bg-border" />
      </div>

      {/* 3. INFORMACE O FAKULTĚ – jeden rotující blok lícující se spodní hranou hero */}
      <div className="shrink-0">
        <FacultyNewsRail articles={facultyNews} />
      </div>
    </aside>
  );
}
