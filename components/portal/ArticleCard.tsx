import Link from "next/link";
import { Clock, ArrowUpRight } from "lucide-react";
import type { Article } from "@/types/portal";

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="group relative rounded-sm border border-slate-200 dark:border-neutral-800 bg-white dark:bg-[#141846] overflow-hidden hover:border-[#0065bd] dark:hover:border-fel-cyan/40 hover:-translate-y-1 hover:shadow-md transition-all duration-200 flex flex-col h-full">
      <Link href={`/zpravy/${article.slug}`} className="flex flex-col h-full">
        {/* Čistý obrázek 16:9 BEZ jakýchkoliv flags a plovoucích štítků */}
        <div className="relative aspect-video w-full overflow-hidden bg-neutral-900 shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={article.imageUrl}
            alt={article.imageAlt}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-50 group-hover:opacity-30 transition-opacity" />
        </div>

        {/* Textový obsah */}
        <div className="p-4 sm:p-5 flex flex-col flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-mono text-neutral-400 mb-2">
            <span>{article.publishedAt}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {article.readTimeMinutes} min
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-bold font-sans text-slate-900 dark:text-white tracking-tight leading-snug group-hover:text-[#0065bd] dark:group-hover:text-fel-cyan transition-colors line-clamp-2">
            {article.title}
          </h3>

          <p className="mt-2.5 text-xs sm:text-sm text-slate-700 dark:text-neutral-300 leading-relaxed line-clamp-2 flex-1">
            {article.perex}
          </p>

          {/* Patička karty */}
          <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between gap-2 text-xs font-mono text-neutral-400">
            <span className="truncate min-w-0 max-w-[180px] text-[11px]">
              {article.author.name}
            </span>
            <span className="inline-flex items-center gap-0.5 text-[#0065bd] dark:text-fel-cyan font-semibold group-hover:translate-x-0.5 transition-transform">
              Detail <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
