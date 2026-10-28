"use client";

import Link from "next/link";
import { Clock, User, ArrowLeft } from "lucide-react";
import type { Article } from "@/types/portal";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { ArticleCard } from "@/components/portal/ArticleCard";
import { ArticleMedia } from "@/components/portal/ArticleMedia";
import { formatInlineMarkdown } from "@/lib/markdown";

interface ArticleDetailClientProps {
  article: Article;
  related: Article[];
}

export function ArticleDetailClient({ article, related }: ArticleDetailClientProps) {
  const { language, t } = useLanguage();
  const isEn = language === "en" && article.en;
  const title = isEn ? article.en!.title : article.title;
  const perex = isEn ? article.en!.perex : article.perex;
  const content = isEn ? article.en!.content : article.content;
  const categoryLabel = isEn ? article.en!.categoryLabel : article.categoryLabel;
  const imageAlt = isEn ? (article.en!.imageAlt ?? article.imageAlt) : article.imageAlt;
  const authorDepartment = isEn
    ? (article.en!.authorDepartment ?? article.author.department)
    : article.author.department;
  const authorName = isEn ? (article.en!.authorName ?? article.author.name) : article.author.name;
  const tags = isEn ? (article.en!.tags ?? article.tags) : article.tags;

  return (
    <div className="py-10">
      {/* 1. Drobečková navigace (Breadcrumbs) */}
      <div className="max-w-[700px] mx-auto px-4 sm:px-6 mb-6">
        <nav aria-label="Breadcrumbs" className="flex items-center gap-2 text-xs font-mono text-neutral-400">
          <Link href="/" className="hover:text-fel-cyan transition-colors">
            {t("home")}
          </Link>
          <span>/</span>
          <Link href="/zpravy" className="hover:text-fel-cyan transition-colors">
            {t("news")}
          </Link>
          <span>/</span>
          <span className="text-neutral-500 truncate max-w-[200px]">
            {categoryLabel}
          </span>
        </nav>
      </div>

      {/* 2. ČTENÁŘSKÝ SLOUPEC (Ergonomická šířka 700px dle rules/theme.md a rules/layout.md) */}
      <article className="max-w-[700px] mx-auto px-4 sm:px-6 space-y-8">
        {/* Záhlaví článku */}
        <header className="space-y-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-sans tracking-tight text-neutral-900 dark:text-white leading-tight">
            {title}
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 font-medium leading-relaxed border-l-2 border-fel-blue dark:border-fel-cyan pl-4 py-1">
            {perex}
          </p>

          {/* Autorská vizitka a metadata */}
          <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between gap-4 text-xs font-mono text-neutral-400">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-fel-blue/10 dark:bg-fel-cyan/15 text-fel-blue dark:text-fel-cyan flex items-center justify-center font-bold">
                <User className="w-4 h-4" />
              </div>
              <div>
                <span className="font-semibold text-neutral-900 dark:text-white block font-sans">
                  {authorName}
                </span>
                <span className="text-[11px] text-neutral-500 block">
                  {authorDepartment}
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="block text-neutral-400">{article.publishedAt}</span>
              <span className="flex items-center gap-1 text-[11px] text-neutral-500 justify-end">
                <Clock className="w-3 h-3" />
                {article.readTimeMinutes} {t("minRead")}
              </span>
            </div>
          </div>
        </header>

        {/* Hlavní 16:9 náhledový obrázek (nebo šablona bez fotografie) */}
        <div className="aspect-video w-full rounded-sm overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-900 shadow-sm">
          <ArticleMedia
            imageUrl={article.imageUrl}
            imageAlt={imageAlt}
            label={categoryLabel}
            loading="eager"
          />
        </div>

        {/* Tělo článku */}
        <div className="max-w-none text-base text-neutral-800 dark:text-neutral-200 leading-relaxed space-y-4 font-sans">
          {content.split("\n\n").map((paragraph, index) => {
            const trimmed = paragraph.trim();
            if (trimmed.startsWith("### ")) {
              return (
                <h2
                  key={index}
                  className="text-xl sm:text-2xl font-bold font-sans tracking-tight text-neutral-900 dark:text-white pt-5 pb-1"
                >
                  {formatInlineMarkdown(trimmed.replace("### ", ""))}
                </h2>
              );
            }
            if (trimmed.startsWith("- ")) {
              const items = trimmed.split("\n- ").map((item) => item.replace(/^- /, ""));
              return (
                <ul key={index} className="list-disc pl-5 space-y-2 text-sm sm:text-base text-neutral-700 dark:text-neutral-300">
                  {items.map((it, i) => (
                    <li key={i} className="leading-relaxed">
                      {formatInlineMarkdown(it)}
                    </li>
                  ))}
                </ul>
              );
            }
            if (/^\d+\.\s/.test(trimmed)) {
              const items = trimmed.split(/\n\d+\.\s/).map((item) => item.replace(/^\d+\.\s/, ""));
              return (
                <ol key={index} className="list-decimal pl-5 space-y-2 text-sm sm:text-base text-neutral-700 dark:text-neutral-300">
                  {items.map((it, i) => (
                    <li key={i} className="leading-relaxed">
                      {formatInlineMarkdown(it)}
                    </li>
                  ))}
                </ol>
              );
            }
            if (trimmed.length > 0) {
              return (
                <p key={index} className="text-sm sm:text-base leading-relaxed text-neutral-700 dark:text-neutral-300">
                  {formatInlineMarkdown(trimmed)}
                </p>
              );
            }
            return null;
          })}
        </div>

        {/* Tagy */}
        <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center gap-2 text-xs font-mono">
          <span className="text-neutral-400">{t("topics")}</span>
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Zpět na archiv */}
        <div className="pt-4 flex items-center justify-between">
          <Link
            href="/zpravy"
            className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-fel-blue dark:text-fel-cyan hover:underline"
          >
            <ArrowLeft className="w-4 h-4" /> {t("backToNews")}
          </Link>
        </div>
      </article>

      {/* 3. SOUVISEJÍCÍ ČLÁNKY (Celá šířka kontejneru) */}
      {related.length > 0 && (
        <section className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-10 border-t border-neutral-200 dark:border-neutral-800 space-y-6">
          <h3 className="text-xl font-bold font-sans tracking-tight text-neutral-900 dark:text-white">
            {t("relatedArticles")}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((rel) => (
              <ArticleCard key={rel.id} article={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
