"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, X, ArrowRight } from "lucide-react";
import { MOCK_ARTICLES } from "@/data/mock-data";
import type { ArticleCategory } from "@/types/portal";
import { Kbd } from "./Kbd";

interface CommandMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const TOPIC_FILTERS: Array<{ id: ArticleCategory | "all"; label: string }> = [
  { id: "all", label: "Všechna témata" },
  { id: "chips", label: "Čipy" },
  { id: "materials", label: "Materiály" },
  { id: "power-elec", label: "Výkonová el." },
  { id: "embedded", label: "Embedded & IoT" },
  { id: "quantum", label: "Kvantové čipy" },
  { id: "industry", label: "Průmysl & Chips Act" },
  { id: "academic", label: "Akademie" },
];

export function CommandMenu({ isOpen, onClose }: CommandMenuProps) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<ArticleCategory | "all">("all");

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          window.dispatchEvent(new CustomEvent("open-command-menu"));
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const cleanQuery = query.trim().toLowerCase();
  const matchingArticles = MOCK_ARTICLES.filter((article) => {
    const matchesCategory = activeCategory === "all" || article.category === activeCategory;
    const matchesTitle = cleanQuery.length === 0 || article.title.toLowerCase().includes(cleanQuery);
    return matchesCategory && matchesTitle;
  });
  const filteredArticles = cleanQuery.length === 0 && activeCategory === "all"
    ? matchingArticles.slice(0, 4)
    : matchingArticles;

  return (
    <div className="fixed inset-0 z-100 flex items-start justify-center pt-20 px-4">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-2xl overflow-hidden rounded-md border border-slate-200 bg-white shadow-2xl dark:border-neutral-700 dark:bg-[#0E1242] animate-in zoom-in-95 duration-150">
        <div className="border-b border-slate-200 dark:border-neutral-800">
          <div className="flex items-center px-4 py-3.5">
            <Search className="mr-3 h-5 w-5 shrink-0 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Hledat v nadpisech článků..."
              className="w-full border-0 bg-transparent text-base text-slate-900 outline-none placeholder:text-slate-400 dark:text-white"
              autoFocus
            />
            <div className="ml-2 flex items-center gap-1.5">
              <Kbd className="hidden sm:inline-flex">ESC</Kbd>
              <button
                type="button"
                onClick={onClose}
                className="rounded-sm p-1 text-slate-400 hover:text-slate-700 dark:hover:text-neutral-200"
                aria-label="Zavřít vyhledávání"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 px-4 pb-3" aria-label="Filtrovat podle tématu">
            {TOPIC_FILTERS.map((filter) => {
              const isActive = activeCategory === filter.id;
              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setActiveCategory(filter.id)}
                  className={`rounded-xs border px-2.5 py-1 text-[11px] font-mono font-semibold transition-colors ${
                    isActive
                      ? "border-[#0065bd] bg-[#0065bd] text-white dark:border-fel-cyan dark:bg-fel-cyan dark:text-neutral-950"
                      : "border-slate-200 bg-slate-50 text-slate-600 hover:border-[#0065bd] hover:text-[#0065bd] dark:border-neutral-700 dark:bg-[#141846] dark:text-neutral-300 dark:hover:border-fel-cyan dark:hover:text-fel-cyan"
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-slate-100 dark:divide-neutral-800/60">
          {filteredArticles.length === 0 ? (
            <div className="py-12 text-center text-sm text-slate-500">
              Nebyly nalezeny žádné nadpisy pro zadané téma nebo dotaz.
            </div>
          ) : (
            <div>
              <div className="px-3 py-1.5 text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400">
                {cleanQuery.length === 0 ? "Články podle tématu" : "Nadpisy článků"}
              </div>
              <ul className="mt-1 space-y-1">
                {filteredArticles.map((article) => (
                  <li key={article.id}>
                    <Link
                      href={`/zpravy/${article.slug}`}
                      onClick={onClose}
                      className="group flex items-center gap-3 rounded-sm p-3 transition-colors hover:bg-slate-50 dark:hover:bg-neutral-800/60"
                    >
                      <div className="min-w-0 flex-1">
                        <h4 className="line-clamp-2 text-sm font-semibold text-slate-900 transition-colors group-hover:text-[#0065bd] dark:text-neutral-100 dark:group-hover:text-fel-cyan">
                          {article.title}
                        </h4>
                        <time className="mt-1 block text-[10px] font-mono text-slate-400" dateTime={article.publishedAt}>
                          {article.publishedAt}
                        </time>
                      </div>
                      <ArrowRight className="h-4 w-4 shrink-0 text-slate-400 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-4 py-2 text-[11px] font-mono text-slate-400 dark:border-neutral-800 dark:bg-[#0A0D30]">
          <span>Hledání v databázi ČVUT FEL Polovodiče</span>
          <div className="hidden sm:flex items-center gap-3">
            <span>Navigace <Kbd>↑</Kbd> <Kbd>↓</Kbd></span>
            <span>Výběr <Kbd>↵</Kbd></span>
          </div>
        </div>
      </div>
    </div>
  );
}
