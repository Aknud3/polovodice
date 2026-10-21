"use client";

import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-white dark:bg-[#050724] border-t border-neutral-200 dark:border-white/10 text-neutral-600 dark:text-neutral-300 text-sm font-sans pt-10 sm:pt-12 pb-8 transition-colors overflow-hidden">
      <div className="w-full max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 pb-8 border-b border-neutral-200 dark:border-white/10">
          {/* 1. O portálu & Garance */}
          <div className="space-y-3 max-w-sm min-w-0">
            <span className="font-bold text-lg text-neutral-900 dark:text-white tracking-tight block">
              POLOVODIČE
            </span>
            <p className="text-neutral-600 dark:text-neutral-400 text-xs leading-relaxed break-words">
              {t("aboutDescription")}
            </p>
            <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400 pt-1 break-words">
              {t("guaranteedBy")}
            </div>
          </div>

          {/* 2. Navigace sekcí */}
          <div className="space-y-3 min-w-0">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-900 dark:text-white">
              {t("pageNavigation")}
            </h4>
            <ul className="space-y-2 text-xs font-mono text-neutral-600 dark:text-neutral-400">
              <li>
                <Link href="/zpravy" className="hover:text-fel-blue dark:hover:text-fel-cyan transition-colors">
                  → {t("navNews")}
                </Link>
              </li>
              <li>
                <Link href="/akce" className="hover:text-fel-blue dark:hover:text-fel-cyan transition-colors">
                  → {t("navEvents")}
                </Link>
              </li>
              <li>
                <Link href="/projekty" className="hover:text-fel-blue dark:hover:text-fel-cyan transition-colors">
                  → {t("navProjects")}
                </Link>
              </li>
              <li>
                <Link href="/vzdelavani" className="hover:text-fel-blue dark:hover:text-fel-cyan transition-colors">
                  → {t("navEducation")}
                </Link>
              </li>
              <li>
                <Link href="/o-nas" className="hover:text-fel-blue dark:hover:text-fel-cyan transition-colors">
                  → {t("navAbout")}
                </Link>
              </li>
              <li>
                <a
                  href="https://ek.fel.cvut.cz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-fel-blue dark:hover:text-fel-cyan transition-colors"
                >
                  → {t("facultyInfo")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-neutral-900 dark:hover:text-white transition-colors flex items-center gap-1 pt-1 text-fel-blue dark:text-fel-cyan"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                  <span>{t("backToTop")}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* 3. Kontakt a sociální sítě */}
          <div className="space-y-3 min-w-0">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-900 dark:text-white">
              {t("footerContact")}
            </h4>
            <div className="space-y-1.5 text-xs text-neutral-600 dark:text-neutral-400">
              <p className="font-semibold text-neutral-900 dark:text-neutral-200">{t("contactDepartment")}</p>
              <p>{t("contactAddress")}</p>
              <p>
                <a
                  href="mailto:mikroelektronika@fel.cvut.cz"
                  className="text-fel-blue dark:text-fel-cyan hover:underline"
                >
                  {t("contactEmail")}
                </a>
              </p>
              <p>{t("contactPhone")}</p>
            </div>

            <div className="pt-2">
              <span className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 block mb-2">
                {t("footerSocial")}
              </span>
              <div className="flex items-center gap-3 text-xs font-mono">
                <a
                  href="https://facebook.com/fel.cvut"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-600 dark:text-neutral-400 hover:text-fel-blue dark:hover:text-fel-cyan transition-colors"
                  aria-label="Facebook FEL ČVUT"
                >
                  Facebook
                </a>
                <span>•</span>
                <a
                  href="https://instagram.com/fel_cvut"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-600 dark:text-neutral-400 hover:text-fel-blue dark:hover:text-fel-cyan transition-colors"
                  aria-label="Instagram FEL ČVUT"
                >
                  Instagram
                </a>
                <span>•</span>
                <a
                  href="https://linkedin.com/school/fel-cvut"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-600 dark:text-neutral-400 hover:text-fel-blue dark:hover:text-fel-cyan transition-colors"
                  aria-label="LinkedIn FEL ČVUT"
                >
                  LinkedIn
                </a>
                <span>•</span>
                <a
                  href="https://youtube.com/user/felcvutpraha"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-600 dark:text-neutral-400 hover:text-fel-blue dark:hover:text-fel-cyan transition-colors"
                  aria-label="YouTube FEL ČVUT"
                >
                  YouTube
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-neutral-500 dark:text-neutral-400">
          <p className="break-words">
            © {new Date().getFullYear()} {t("copyright")}
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px]">
            <a
              href="https://fel.cvut.cz/cs/ochrana-osobnich-udaju"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              {t("privacy")}
            </a>
            <span>•</span>
            <a
              href="https://fel.cvut.cz"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              {t("officialWebsite")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
