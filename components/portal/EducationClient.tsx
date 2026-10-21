"use client";

import { useState } from "react";
import { GraduationCap, ArrowUpRight, ChevronDown, Sparkles, HelpCircle } from "lucide-react";
import type { PortalEvent, Opportunity, FaqItem } from "@/types/portal";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { EventCard } from "@/components/portal/EventCard";

interface EducationClientProps {
  summerSchools: PortalEvent[];
  opportunities: Opportunity[];
  faq: FaqItem[];
}

export function EducationClient({
  summerSchools,
  opportunities,
  faq,
}: EducationClientProps) {
  const { language, t } = useLanguage();
  const [openFaqId, setOpenFaqId] = useState<string | null>(faq[0]?.id ?? null);

  return (
    <div className="space-y-10 sm:space-y-14">
      {/* Záhlaví stránky */}
      <div className="border-b border-neutral-200 dark:border-neutral-800 pb-5 space-y-2">
        <h1 className="text-2xl sm:text-4xl font-extrabold font-sans text-neutral-900 dark:text-white tracking-tight">
          {t("educationHeading")}
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 max-w-3xl leading-relaxed">
          {t("educationSubtitle")}
        </p>
      </div>

      {/* 1. Studijní program */}
      <section className="rounded-sm border border-slate-200 dark:border-neutral-800 bg-white dark:bg-[#141846] border-l-4 border-l-[#0065bd] dark:border-l-fel-cyan p-5 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-[#0065bd] dark:text-fel-cyan text-xs font-mono font-semibold uppercase tracking-wider">
          <GraduationCap className="w-4 h-4" />
          <span>{t("studyProgram")}</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold font-sans text-neutral-900 dark:text-white tracking-tight">
          Elektronika a komunikace (EK) &amp; Elektronika a integrované systémy (EIS)
        </h2>

        <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed max-w-3xl">
          {t("studyProgramDesc")}
        </p>

        <div className="pt-2">
          <a
            href="https://ek.fel.cvut.cz/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-sm bg-[#0065bd] hover:bg-[#005299] text-white text-xs sm:text-sm font-mono font-semibold uppercase tracking-wider transition-colors shadow-xs"
          >
            <span>{t("studyProgramLink")}</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* 2. Příležitosti */}
      <section className="space-y-5">
        <div className="flex items-center gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-3">
          <Sparkles className="w-4 h-4 text-[#0065bd] dark:text-fel-cyan" />
          <h2 className="text-xl sm:text-2xl font-bold font-sans text-neutral-900 dark:text-white tracking-tight">
            {t("opportunities")}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {opportunities.map((opp) => {
            const isEn = language === "en" && opp.en;
            const title = isEn ? opp.en!.title : opp.title;
            const desc = isEn ? opp.en!.description : opp.description;

            return (
              <article
                key={opp.id}
                className="group rounded-sm border border-slate-200 dark:border-neutral-800 bg-white dark:bg-[#141846] p-5 hover:border-[#0065bd] dark:hover:border-fel-cyan/40 hover:-translate-y-1 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-base sm:text-lg font-bold font-sans text-slate-900 dark:text-white group-hover:text-[#0065bd] dark:group-hover:text-fel-cyan transition-colors">
                    {title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-700 dark:text-neutral-300 leading-relaxed">
                    {desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-end">
                  <a
                    href={opp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-[#0065bd] dark:text-fel-cyan hover:underline"
                  >
                    <span>{t("detail")}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* 3. Letní školy (sdílená entita Akce typu summer-school) */}
      <section className="space-y-5">
        <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold font-sans text-neutral-900 dark:text-white tracking-tight">
            {t("summerSchools")}
          </h2>
          <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
            {summerSchools.length} {summerSchools.length === 1 ? "škola" : "školy"}
          </span>
        </div>

        {summerSchools.length === 0 ? (
          <div className="p-8 text-center rounded-sm border border-dashed border-neutral-300 dark:border-neutral-800 text-xs sm:text-sm text-neutral-500 font-mono">
            {t("noSummerSchools")}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {summerSchools.map((school) => (
              <EventCard key={school.id} event={school} />
            ))}
          </div>
        )}
      </section>

      {/* 4. FAQ akordeon */}
      <section className="space-y-5">
        <div className="flex items-center gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-3">
          <HelpCircle className="w-4 h-4 text-[#0065bd] dark:text-fel-cyan" />
          <h2 className="text-xl sm:text-2xl font-bold font-sans text-neutral-900 dark:text-white tracking-tight">
            {t("faq")}
          </h2>
        </div>

        <div className="rounded-sm border border-slate-200 dark:border-neutral-800 bg-white dark:bg-[#141846] divide-y divide-neutral-200 dark:divide-neutral-800 overflow-hidden">
          {faq.map((item) => {
            const isEn = language === "en" && item.en;
            const question = isEn ? item.en!.question : item.question;
            const answer = isEn ? item.en!.answer : item.answer;
            const isOpen = openFaqId === item.id;

            return (
              <div key={item.id} className="transition-colors">
                <button
                  type="button"
                  onClick={() => setOpenFaqId(isOpen ? null : item.id)}
                  aria-expanded={isOpen}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-neutral-50/50 dark:hover:bg-neutral-800/40 transition-colors focus-ring"
                >
                  <span className="text-sm sm:text-base font-bold font-sans text-slate-900 dark:text-white">
                    {question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-500 dark:text-neutral-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-[#0065bd] dark:text-fel-cyan" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed border-t border-neutral-100 dark:border-neutral-800/60">
                    {answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
