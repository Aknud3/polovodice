"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { FacultyNewsItem } from "@/types/portal";
import { useLanguage } from "@/components/providers/LanguageProvider";

/** Interval střídání zpráv ve widgetu (rules/layout.md §2.3). */
const FACULTY_ROTATE_MS = 6000;

/** Počet zpráv v plné sekci 2 × 2 (rules/layout.md §2.5). */
const FACULTY_SECTION_LIMIT = 4;

/** Zpoždění postupného najetí položek sekce (rules/theme.md §7). */
const REVEAL_STAGGER_MS = 70;

interface FacultyNewsProps {
  articles: FacultyNewsItem[];
}

/**
 * Plná sekce „Informace o fakultě“ – nejhlasitější prvek hlavní stránky.
 * 2 × 2 grid, větší typografie a postupné najetí položek.
 */
export function FacultyNewsSection({ articles }: FacultyNewsProps) {
  const { language, t } = useLanguage();
  const visible = articles.slice(0, FACULTY_SECTION_LIMIT);

  return (
    <section
      id="informace-o-fakulte"
      className="rounded-sm border border-border border-l-4 border-l-cvut-blue dark:border-l-fel-cyan bg-surface p-4 sm:p-8 overflow-hidden"
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 border-b border-border">
        <div className="space-y-1.5 min-w-0">
          <h2 className="text-2xl sm:text-3xl font-bold font-sans tracking-tight text-foreground">
            {t("facultyInfo")}
          </h2>
          <p className="text-sm sm:text-base font-mono text-muted">
            {t("facultyInfoSubtitle")}
          </p>
        </div>

        <a
          href="https://ek.fel.cvut.cz/"
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring shrink-0 inline-flex items-center gap-1 rounded-xs text-sm font-mono font-semibold text-cvut-blue dark:text-fel-cyan hover:underline"
        >
          {t("facultyArchive")}
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>

      {visible.length === 0 ? (
        <p className="py-10 text-center text-base font-mono text-muted">
          {t("facultyEmpty")}
        </p>
      ) : (
        <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          {visible.map((article, index) => {
            const isEn = language === "en" && article.en;
            const title = isEn ? article.en!.title : article.title;
            const perex = isEn ? article.en!.perex : article.perex;

            return (
              <Link
                key={article.id}
                href={`/zpravy/${article.slug}`}
                style={{ animationDelay: `${index * REVEAL_STAGGER_MS}ms` }}
                className="focus-ring group animate-reveal-up flex items-start justify-between gap-4 rounded-xs border-l-2 border-cvut-blue dark:border-fel-cyan pl-4 sm:pl-5 py-1 transition-transform duration-200 hover:translate-x-0.5"
              >
                <div className="space-y-2 min-w-0">
                  <span className="block text-[11px] font-mono text-muted">
                    {article.publishedAt}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold font-sans tracking-tight leading-snug text-foreground group-hover:text-cvut-blue dark:group-hover:text-fel-cyan transition-colors line-clamp-2">
                    {title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted leading-relaxed line-clamp-2">
                    {perex}
                  </p>
                </div>

                <ArrowUpRight className="w-5 h-5 shrink-0 mt-1 text-muted group-hover:text-cvut-blue dark:group-hover:text-fel-cyan group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}

/**
 * Widget „Informace o fakultě“ pro redakční boční sloupec – zobrazuje vždy
 * jednu zprávu a střídá je zdola nahoru v pevně definované výšce.
 */
export function FacultyNewsRail({ articles }: FacultyNewsProps) {
  const { language, t } = useLanguage();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (articles.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % articles.length);
    }, FACULTY_ROTATE_MS);
    return () => clearInterval(timer);
  }, [articles.length]);

  if (articles.length === 0) {
    return null;
  }

  const article = articles[index % articles.length];
  const isEn = language === "en" && article.en;
  const title = isEn ? article.en!.title : article.title;
  const perex = isEn ? article.en!.perex : article.perex;

  return (
    <section
      aria-label={t("facultyInfo")}
      className="rounded-sm border border-border border-l-2 border-l-cvut-blue dark:border-l-fel-cyan bg-surface p-4 sm:p-5 shadow-xs space-y-3"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-cvut-blue dark:text-fel-cyan">
          {t("facultyInfo")}
        </span>
        <a
          href="https://ek.fel.cvut.cz/"
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring inline-flex items-center gap-1 rounded-xs text-[11px] font-mono font-semibold text-cvut-blue dark:text-fel-cyan hover:underline"
        >
          {t("facultyArchive")}
          <ArrowRight className="w-3 h-3" />
        </a>
      </div>

      {/* Pevná daná výška rotujícího bloku: střídání zpráv nesmí posouvat layout */}
      <div className="h-[8.5rem] sm:h-[9.5rem] overflow-hidden">
        <Link
          key={article.id}
          href={`/zpravy/${article.slug}`}
          className="focus-ring group block space-y-1.5 rounded-xs animate-faculty-slide-up"
        >
          <span className="block text-[11px] font-mono text-muted">
            {article.publishedAt}
          </span>
          <h3 className="text-base sm:text-lg font-bold font-sans tracking-tight leading-snug text-foreground group-hover:text-cvut-blue dark:group-hover:text-fel-cyan transition-colors line-clamp-3">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-muted leading-relaxed line-clamp-2">
            {perex}
          </p>
        </Link>
      </div>
    </section>
  );
}
