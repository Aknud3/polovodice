"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { CommandMenu } from "@/components/ui/CommandMenu";
import { useLanguage } from "@/components/providers/LanguageProvider";

export function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    function handleCustomOpen() {
      setIsSearchOpen(true);
    }
    window.addEventListener("open-command-menu", handleCustomOpen);
    return () => window.removeEventListener("open-command-menu", handleCustomOpen);
  }, []);

  return (
    <>
      <nav className="sticky top-0 z-40 min-h-14 sm:h-16 bg-white/95 dark:bg-[#080B38]/95 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 transition-colors shadow-xs">
        <div className="max-w-[1320px] mx-auto min-h-14 sm:h-full px-4 sm:px-6 lg:px-8 py-2 sm:py-0 flex items-center justify-between gap-2 sm:gap-4">
          {/* Vlevo: Oficiální logo ČVUT FEL + Čistý název POLOVODIČE */}
          <Link
            href="/"
            className="group flex items-center gap-2 sm:gap-3.5 focus-ring rounded-sm py-1 min-w-0 shrink"
            aria-label="POLOVODIČE – ČVUT FEL"
          >
            {/* Oficiální stažené vektorové logo ČVUT FEL */}
            <div className="h-8 flex items-center shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/felcvut-logo-blue.svg"
                alt="FEL ČVUT logo"
                className="h-7 w-auto dark:hidden"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/felcvut-logo.svg"
                alt="FEL ČVUT logo"
                className="h-7 w-auto hidden dark:block"
              />
            </div>

            <span className="w-px h-6 bg-neutral-300 dark:bg-neutral-700" />

            {/* Název portálu a stručný redakční podtitul */}
            <span className="min-w-0 flex flex-col justify-center">
              <span className="font-sans font-extrabold text-base sm:text-2xl tracking-tight text-neutral-900 dark:text-white leading-none truncate group-hover:text-fel-blue dark:group-hover:text-fel-cyan transition-colors">
                POLOVODIČE
              </span>
              <span className="block mt-0.5 text-[9px] sm:text-[11px] font-mono leading-tight text-neutral-500 dark:text-neutral-400 truncate">
                Informační deník ze světa elektroniky
              </span>
            </span>
          </Link>

          {/* Vpravo: Jednoduché hledání (bez ⌘K) + CZ/EN přepínač + Theme switcher */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Jednoduché hledací pole */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="focus-ring flex items-center justify-center gap-2 px-2 sm:px-3 py-1.5 h-9 w-9 sm:w-auto rounded-sm border border-neutral-200 dark:border-neutral-700 bg-neutral-100/80 dark:bg-neutral-900/60 text-neutral-600 dark:text-neutral-300 hover:border-fel-blue dark:hover:border-fel-cyan hover:text-neutral-900 dark:hover:text-white transition-colors text-xs font-mono"
              aria-label={t("searchAria")}
            >
              <Search className="w-3.5 h-3.5 text-neutral-400" />
              <span className="hidden sm:inline">{t("search")}</span>
            </button>

            {/* Přepínač jazyka CZ / EN */}
            <div className="flex items-center text-[11px] sm:text-xs font-mono border border-neutral-200 dark:border-neutral-700 rounded-sm overflow-hidden h-9 bg-neutral-100/80 dark:bg-neutral-900/60">
              <button
                type="button"
                onClick={() => setLanguage("cs")}
                className={`px-2 h-full transition-colors font-semibold ${
                  language === "cs"
                    ? "bg-[#0065BD] text-white shadow-xs"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                }`}
                aria-label={t("czech")}
              >
                CZ
              </button>
              <span className="w-px h-4 bg-neutral-300 dark:bg-neutral-700" />
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={`px-2 h-full transition-colors font-semibold ${
                  language === "en"
                    ? "bg-[#0065BD] text-white shadow-xs"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                }`}
                aria-label="English"
              >
                EN
              </button>
            </div>

            {/* Přepínač Light / Dark módu */}
            <div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      {/* Vyhledávací dialog */}
      <CommandMenu isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
