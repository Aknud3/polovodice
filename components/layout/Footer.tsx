"use client";

import Link from "next/link";
import { Cpu, ArrowUp } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#050724] border-t border-white/10 text-neutral-300 text-sm font-sans pt-10 sm:pt-12 pb-8 transition-colors overflow-hidden">
      <div className="w-full max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 pb-8 border-b border-white/10">
          <div className="space-y-3 max-w-md min-w-0">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-xs bg-[#0065BD] flex items-center justify-center text-white">
                <Cpu className="w-4 h-4" />
              </div>
              <span className="font-bold text-lg text-white tracking-tight">POLOVODIČE</span>
            </div>
            <p className="text-neutral-400 text-xs leading-relaxed break-words">
              {t("aboutDescription")}
            </p>
            <div className="text-xs font-mono text-neutral-400 pt-1 break-words">
              {t("guaranteedBy")}
            </div>
          </div>

          <div className="space-y-3 md:justify-self-end min-w-0">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-white">
              {t("pageNavigation")}
            </h4>
            <ul className="space-y-2 text-xs font-mono text-neutral-400">
              <li><a href="#informace-tydne" className="hover:text-fel-cyan transition-colors">→ {t("weekInformation")}</a></li>
              <li><a href="#ostatni-novinky" className="hover:text-fel-cyan transition-colors">→ {t("sectionNews")}</a></li>
              <li><a href="#nova-sekce" className="hover:text-fel-cyan transition-colors">→ {t("newSection")}</a></li>
              <li><Link href="/zpravy" className="hover:text-fel-cyan transition-colors">→ {t("allNewsArchive")}</Link></li>
              <li>
                <a href="#" className="hover:text-white transition-colors flex items-center gap-1 pt-1 text-fel-cyan">
                  <ArrowUp className="w-3.5 h-3.5" />
                  <span>{t("backToTop")}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-neutral-400">
          <p className="break-words">© {new Date().getFullYear()} České vysoké učení technické v Praze. Fakulta elektrotechnická.</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px]">
            <a href="https://fel.cvut.cz/cs/gdpr" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              {t("privacy")}
            </a>
            <span>•</span>
            <a href="https://fel.cvut.cz" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              {t("officialWebsite")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
