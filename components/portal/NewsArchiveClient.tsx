"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  X,
  ArrowUpRight,
  GraduationCap,
  FlaskConical,
  Users,
  Handshake,
  Newspaper,
  type LucideIcon,
} from "lucide-react";
import type { Article, Audience } from "@/types/portal";
import type { TranslationKey } from "@/lib/i18n";
import { AUDIENCE_ORDER, AUDIENCE_SLUGS } from "@/lib/audiences";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { ArticleCard } from "@/components/portal/ArticleCard";

interface NewsArchiveClientProps {
  initialArticles: Article[];
  /** Je-li zadáno, archiv se chová jako podstránka cílové skupiny (rules/layout.md §2.18). */
  audience?: Audience;
}

const AUDIENCE_HEADING_KEY: Record<Audience, TranslationKey> = {
  students: "audiencePageStudents",
  researchers: "audiencePageResearchers",
  public: "audiencePagePublic",
  partners: "audiencePagePartners",
  media: "audiencePageMedia",
};

const AUDIENCE_LABEL_KEY: Record<Audience, TranslationKey> = {
  students: "audienceStudents",
  researchers: "audienceResearchers",
  public: "audiencePublic",
  partners: "audiencePartners",
  media: "audienceMedia",
};

const AUDIENCE_DESC_KEY: Record<Audience, TranslationKey> = {
  students: "audienceStudentsDesc",
  researchers: "audienceResearchersDesc",
  public: "audiencePublicDesc",
  partners: "audiencePartnersDesc",
  media: "audienceMediaDesc",
};

const AUDIENCE_ICON: Record<Audience, LucideIcon> = {
  students: GraduationCap,
  researchers: FlaskConical,
  public: Users,
  partners: Handshake,
  media: Newspaper,
};

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

export function NewsArchiveClient({ initialArticles, audience }: NewsArchiveClientProps) {
  const { language, t } = useLanguage();
  const [query, setQuery] = useState("");
  const cleanQuery = query.trim().toLowerCase();
  const heading = audience ? t(AUDIENCE_HEADING_KEY[audience]) : t("archiveHeading");
  const AudienceIcon = audience ? AUDIENCE_ICON[audience] : null;
  const emptyLabel = audience && cleanQuery.length === 0 ? t("audienceEmpty") : t("emptySection");

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
      {/* Záhlaví archivu / podstránky cílové skupiny */}
      <div className="pb-6 border-b border-neutral-200 dark:border-neutral-800">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              {AudienceIcon && (
                <AudienceIcon
                  className="w-6 h-6 shrink-0 text-[#0065bd] dark:text-fel-cyan"
                  aria-hidden="true"
                />
              )}
              <h1 className="text-3xl sm:text-4xl font-bold font-sans tracking-tight text-neutral-900 dark:text-white">
                {heading}
              </h1>
            </div>
            {audience && (
              <p className="mt-2 max-w-2xl text-sm text-neutral-600 dark:text-neutral-400">
                {t(AUDIENCE_DESC_KEY[audience])}
              </p>
            )}
          </div>

          <Link
            href="/zpravy/medailonky"
            className="group inline-flex items-center gap-1 text-xs sm:text-sm font-mono text-[#0065bd] dark:text-fel-cyan hover:underline shrink-0"
          >
            <span>{t("profilesLink")}</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Sub-menu cílových skupin */}
      {audience && (
        <nav
          aria-label={t("audienceMenuLabel")}
          className="border-b border-neutral-200 dark:border-neutral-800 overflow-x-auto"
        >
          <div className="flex items-center min-w-max">
            <span className="hidden sm:inline pr-3 text-[11px] font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              {t("audienceMenuLabel")}
            </span>
            {AUDIENCE_ORDER.map((key) => {
              const isActive = key === audience;
              return (
                <Link
                  key={key}
                  href={`/pro-koho/${AUDIENCE_SLUGS[key]}`}
                  aria-current={isActive ? "page" : undefined}
                  className={`shrink-0 px-3 py-2.5 -mb-px border-b-2 text-xs sm:text-sm font-mono transition-colors ${
                    isActive
                      ? "border-[#0065bd] dark:border-fel-cyan text-[#0065bd] dark:text-fel-cyan font-semibold"
                      : "border-transparent text-neutral-500 dark:text-neutral-400 hover:text-[#0065bd] dark:hover:text-fel-cyan"
                  }`}
                >
                  {t(AUDIENCE_LABEL_KEY[key])}
                </Link>
              );
            })}
          </div>
        </nav>
      )}

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
              {emptyLabel}
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
              {emptyLabel}
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
