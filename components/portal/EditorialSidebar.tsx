"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Clock, Calendar, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import type { Article } from "@/types/portal";

interface EditorialSidebarProps {
  articles?: Article[];
}

export function EditorialSidebar({ articles = [] }: EditorialSidebarProps) {
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

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + articles.length) % articles.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % articles.length);
  };

  return (
    <aside className="space-y-6">
      {/* 1. ČISTÝ DATUMOVÝ BLOK (Bez balastu) */}
      <div className="rounded-sm border border-slate-200 dark:border-neutral-800 bg-white dark:bg-[#141846] p-4 sm:p-5 shadow-xs">
        <div className="space-y-2.5 text-xs font-mono">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100 dark:border-neutral-800">
            <span className="text-slate-500 dark:text-neutral-400 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#0065bd] dark:text-fel-cyan" />
              Dnešní datum:
            </span>
            <strong className="text-slate-900 dark:text-white font-semibold">
              5. října 2026
            </strong>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-slate-500 dark:text-neutral-400 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              Poslední aktualizace:
            </span>
            <strong className="text-emerald-700 dark:text-emerald-400 font-semibold">
              Dnes v 14:00
            </strong>
          </div>
        </div>
      </div>

      {/* 2. ANIMOVANÝ CYKLUJÍCÍ PRVEK ČLÁNKŮ */}
      {articles.length > 0 && currentArticle && (
        <div className="rounded-sm border border-slate-200 dark:border-neutral-800 bg-white dark:bg-[#141846] p-4 sm:p-5 shadow-xs space-y-4">
          {/* Záhlaví cyklovače */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-neutral-800 text-xs font-mono">
            <div>
              <span className="font-bold uppercase tracking-wider text-slate-900 dark:text-white text-[11px]">
                Další články
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handlePrev}
                className="min-w-9 min-h-9 p-1 flex items-center justify-center hover:text-[#0065bd] dark:hover:text-fel-cyan rounded-xs text-slate-400 focus-ring"
                aria-label="Předchozí článek"
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
                aria-label="Další článek"
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
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={currentArticle.id}
                src={currentArticle.imageUrl}
                alt={currentArticle.imageAlt}
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500 animate-in fade-in"
              />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono text-neutral-400 block">
                {currentArticle.publishedAt}
              </span>
              <h4 className="text-sm font-bold font-sans text-slate-900 dark:text-white group-hover:text-[#0065bd] dark:group-hover:text-fel-cyan transition-colors line-clamp-2 leading-snug">
                {currentArticle.title}
              </h4>
              <p className="text-xs text-slate-700 dark:text-neutral-300 line-clamp-2 leading-relaxed">
                {currentArticle.perex}
              </p>
            </div>

            <div className="pt-2 text-xs font-mono font-semibold text-[#0065bd] dark:text-fel-cyan flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
              <span>Přejít na článek</span>
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
                aria-label={`Přejít na článek ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* 3. RYCHLÝ ODKAZ DO ARCHIVU */}
      <div className="rounded-sm border border-slate-200 dark:border-neutral-800 bg-white dark:bg-[#141846] p-4 shadow-xs">
        <Link
          href="/zpravy"
          className="group flex items-center justify-between text-xs font-mono font-semibold text-slate-900 dark:text-white hover:text-[#0065bd] dark:hover:text-fel-cyan transition-colors"
        >
          <span>Celý archiv zpráv</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#0065bd] dark:text-fel-cyan group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </aside>
  );
}
