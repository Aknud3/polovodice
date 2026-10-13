"use client";

import Link from "next/link";
import { Clock, User, ArrowUpRight } from "lucide-react";
import type { Article } from "@/types/portal";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { ArticleMedia } from "./ArticleMedia";

interface HeroFeatureProps {
  article: Article;
}

export function HeroFeature({ article }: HeroFeatureProps) {
  const { language, t } = useLanguage();
  const isEn = language === "en" && article.en;
  const title = isEn ? article.en!.title : article.title;
  const perex = isEn ? article.en!.perex : article.perex;
  const categoryLabel = isEn ? article.en!.categoryLabel : article.categoryLabel;
  const imageAlt = isEn ? (article.en!.imageAlt ?? article.imageAlt) : article.imageAlt;
  const authorDepartment = isEn
    ? (article.en!.authorDepartment ?? article.author.department)
    : article.author.department;

  return (
    <article className="group relative rounded-sm border border-slate-200 dark:border-neutral-800 bg-white dark:bg-[#141846] overflow-hidden hover:border-[#0065bd] dark:hover:border-fel-cyan/50 transition-all duration-300 shadow-xs hover:shadow-md">
      <Link href={`/zpravy/${article.slug}`} className="block">
        {/* Čistý obrázkový kontejner 16:9 BEZ jakýchkoliv flags/odznaků */}
        <div className="relative aspect-video w-full overflow-hidden bg-neutral-900">
          <ArticleMedia
            imageUrl={article.imageUrl}
            imageAlt={imageAlt}
            label={categoryLabel}
            loading="eager"
            imageClassName="group-hover:scale-103 transition-transform duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080B38]/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        </div>

        {/* Textový obsah pod obrázkem */}
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] sm:text-xs font-mono text-neutral-500 dark:text-neutral-400 mb-3">
            <span>{article.publishedAt}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.readTimeMinutes} {t("minRead")}
            </span>
          </div>

          <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold font-sans text-slate-900 dark:text-white tracking-tight leading-tight group-hover:text-[#0065bd] dark:group-hover:text-fel-cyan transition-colors">
            {title}
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-700 dark:text-neutral-300 leading-relaxed line-clamp-3">
            {perex}
          </p>

          {/* Autor a výzva ke čtení */}
          <div className="mt-5 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-neutral-100 dark:border-neutral-800">
            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-neutral-400">
              <div className="w-6 h-6 rounded-full bg-blue-50 text-[#0065bd] dark:bg-fel-cyan/15 dark:text-fel-cyan flex items-center justify-center font-bold">
                <User className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="font-semibold text-slate-900 dark:text-neutral-200 block font-sans">
                  {article.author.name}
                </span>
                <span className="text-[11px] text-slate-500 dark:text-neutral-500 block">
                  {authorDepartment}
                </span>
              </div>
            </div>

            <span className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-[#0065bd] dark:text-fel-cyan group-hover:translate-x-1 transition-transform">
              {t("readFullStory")} <ArrowUpRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
