"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Building2,
  Mail,
  Phone,
  Newspaper,
  ExternalLink,
  ChevronDown,
  Check,
  Calendar,
  Layers,
} from "lucide-react";
import type { Partner, TimelineItem } from "@/types/portal";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { formatEventDate } from "@/lib/utils";

interface AboutClientProps {
  partners: Partner[];
  timeline: TimelineItem[];
}

function getKindLabel(kind: TimelineItem["kind"], t: (k: string) => string) {
  switch (kind) {
    case "event":
      return {
        label: t("timelineEvents"),
        className: "text-[#0879bb] dark:text-[#27d0d0]",
      };
    case "project":
      return {
        label: t("timelineProjects"),
        className: "text-[#2856cb] dark:text-[#3beeb1]",
      };
    case "profile":
      return {
        label: t("timelineProfiles"),
        className: "text-[#b47a00] dark:text-[#e2a21a]",
      };
    case "article":
    default:
      return {
        label: t("timelineArticles"),
        className: "text-neutral-500 dark:text-neutral-400",
      };
  }
}

export function AboutClient({ partners, timeline }: AboutClientProps) {
  const { language, t } = useLanguage();
  const [selectedKind, setSelectedKind] = useState<TimelineItem["kind"] | "all">("all");
  const [isOpen, setIsOpen] = useState(false);

  const kindOptions: Array<{ id: TimelineItem["kind"] | "all"; label: string }> = [
    { id: "all", label: t("timelineAll") },
    { id: "event", label: t("timelineEvents") },
    { id: "project", label: t("timelineProjects") },
    { id: "profile", label: t("timelineProfiles") },
    { id: "article", label: t("timelineArticles") },
  ];

  const activeOption = kindOptions.find((opt) => opt.id === selectedKind) ?? kindOptions[0];

  const filteredTimeline =
    selectedKind === "all"
      ? timeline
      : timeline.filter((item) => item.kind === selectedKind);

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* Záhlaví stránky */}
      <div className="border-b border-neutral-200 dark:border-neutral-800 pb-5 space-y-2">
        <h1 className="text-2xl sm:text-4xl font-extrabold font-sans text-neutral-900 dark:text-white tracking-tight">
          {t("aboutHeading")}
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 max-w-3xl leading-relaxed">
          {t("aboutSubtitle")}
        </p>
      </div>

      {/* 1. Kontakty */}
      <section id="kontakty" className="space-y-4">
        <div className="flex items-center gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-3">
          <Building2 className="w-4 h-4 text-[#0065bd] dark:text-fel-cyan" />
          <h2 className="text-xl sm:text-2xl font-bold font-sans text-neutral-900 dark:text-white tracking-tight">
            {t("contacts")}
          </h2>
        </div>

        <div className="rounded-sm border border-slate-200 dark:border-neutral-800 bg-white dark:bg-[#141846] p-5 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <div className="space-y-3">
            <h3 className="text-base sm:text-lg font-bold font-sans text-neutral-900 dark:text-white">
              {t("contactDepartment")}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
              {t("contactAddress")}
            </p>
            <div className="pt-2 space-y-1.5 text-xs sm:text-sm font-mono">
              <p className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300">
                <Mail className="w-4 h-4 text-[#0065bd] dark:text-fel-cyan shrink-0" />
                <a
                  href={`mailto:${t("contactEmail")}`}
                  className="text-[#0065bd] dark:text-fel-cyan hover:underline"
                >
                  {t("contactEmail")}
                </a>
              </p>
              <p className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300">
                <Phone className="w-4 h-4 text-[#0065bd] dark:text-fel-cyan shrink-0" />
                <span>{t("contactPhone")}</span>
              </p>
            </div>
          </div>

          <div className="rounded-sm border border-neutral-100 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/40 p-4 sm:p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-[#0065bd] dark:text-fel-cyan text-xs font-mono font-semibold uppercase tracking-wider mb-2">
                <Newspaper className="w-4 h-4" />
                <span>Tisk &amp; Média</span>
              </div>
              <h4 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white">
                Informace pro novináře a redakce
              </h4>
              <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Zajišťujeme odborná vyjádření garantů, podklady k Národní polovodičové strategii a tiskové materiály.
              </p>
            </div>
            <p className="mt-4 pt-3 border-t border-neutral-200 dark:border-neutral-800 text-xs font-mono text-[#0065bd] dark:text-fel-cyan">
              {t("contactMedia")}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Partneři */}
      <section id="partneri" className="space-y-4">
        <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold font-sans text-neutral-900 dark:text-white tracking-tight">
            {t("partners")}
          </h2>
          <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
            {partners.length} klíčových partnerů
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {partners.map((partner) => (
            <a
              key={partner.id}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-sm border border-slate-200 dark:border-neutral-800 bg-white dark:bg-[#141846] p-4 sm:p-5 flex flex-col items-center justify-center text-center hover:border-[#0065bd] dark:hover:border-fel-cyan/40 hover:-translate-y-1 hover:shadow-md transition-all duration-200 min-h-[90px]"
            >
              <span className="font-bold font-sans text-sm sm:text-base text-neutral-900 dark:text-white group-hover:text-[#0065bd] dark:group-hover:text-fel-cyan transition-colors">
                {partner.name}
              </span>
              <span className="mt-1 inline-flex items-center gap-0.5 text-[10px] font-mono text-neutral-400 group-hover:text-[#0065bd] dark:group-hover:text-fel-cyan transition-colors">
                <span>web</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* 3. Historie (Časová osa s filtrem typu) */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#0065bd] dark:text-fel-cyan" />
            <h2 className="text-xl sm:text-2xl font-bold font-sans text-neutral-900 dark:text-white tracking-tight">
              {t("history")}
            </h2>
          </div>

          {/* Dropdown filtru typu na časové ose */}
          <div className="relative w-full sm:max-w-xs">
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-expanded={isOpen}
              className="focus-ring w-full min-h-10 px-3.5 py-2 rounded-sm bg-white dark:bg-[#141846] text-slate-900 dark:text-white border border-slate-300 dark:border-neutral-800 flex items-center justify-between gap-2 text-xs font-mono font-semibold shadow-2xs hover:border-[#0065bd] dark:hover:border-fel-cyan transition-colors"
            >
              <span className="flex items-center gap-2 min-w-0">
                <span className="text-neutral-500 dark:text-neutral-400 font-normal">{t("timelineLabel")}</span>
                <span className="truncate text-[#0065bd] dark:text-fel-cyan">{activeOption.label}</span>
              </span>
              <ChevronDown
                className={`w-4 h-4 text-neutral-500 dark:text-neutral-400 shrink-0 transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isOpen && (
              <div className="absolute left-0 right-0 z-30 mt-1.5 rounded-sm border border-slate-300 dark:border-neutral-800 bg-white dark:bg-[#141846] shadow-lg overflow-hidden divide-y divide-neutral-100 dark:divide-neutral-800/80">
                {kindOptions.map((opt) => {
                  const isSelected = opt.id === selectedKind;
                  const count =
                    opt.id === "all"
                      ? timeline.length
                      : timeline.filter((item) => item.kind === opt.id).length;

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        setSelectedKind(opt.id);
                        setIsOpen(false);
                      }}
                      className={`w-full px-3.5 py-2.5 text-left text-xs font-mono flex items-center justify-between gap-2 transition-colors ${
                        isSelected
                          ? "bg-[#0065bd]/10 dark:bg-fel-cyan/15 text-[#0065bd] dark:text-fel-cyan font-bold"
                          : "text-slate-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800/60 font-medium"
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        {isSelected ? (
                          <Check className="w-3.5 h-3.5 text-[#0065bd] dark:text-fel-cyan shrink-0" />
                        ) : (
                          <span className="w-3.5 h-3.5 shrink-0" />
                        )}
                        <span className="truncate">{opt.label}</span>
                      </div>
                      <span className="text-[11px] text-neutral-400 dark:text-neutral-500 font-normal shrink-0">
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Vertikální časová osa */}
        {filteredTimeline.length === 0 ? (
          <div className="p-12 text-center rounded-sm border border-dashed border-neutral-300 dark:border-neutral-800 text-sm text-neutral-500 font-mono">
            {t("emptyTimeline")}
          </div>
        ) : (
          <div className="relative border-l-2 border-neutral-200 dark:border-neutral-800 ml-3 sm:ml-4 pl-6 sm:pl-8 space-y-6 sm:space-y-8 py-2">
            {filteredTimeline.map((item) => {
              const badge = getKindLabel(item.kind, t as (k: string) => string);
              const isIsoDate = /^\d{4}-\d{2}-\d{2}$/.test(item.date);
              const displayDate = isIsoDate ? formatEventDate(item.date, language) : item.date;

              return (
                <div key={`${item.kind}-${item.id}`} className="relative group">
                  {/* Bod na časové ose */}
                  <span className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full bg-white dark:bg-[#080B38] border-2 border-[#0065bd] dark:border-fel-cyan group-hover:scale-125 transition-transform" />

                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4">
                    <Link
                      href={item.href}
                      className="text-sm sm:text-base font-bold font-sans text-neutral-900 dark:text-white group-hover:text-[#0065bd] dark:group-hover:text-fel-cyan transition-colors"
                    >
                      {item.title}
                    </Link>

                    <div className="flex items-center gap-2 shrink-0 text-[11px] font-mono text-neutral-400">
                      <span className={`font-medium ${badge.className}`}>
                        {badge.label}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-neutral-500 dark:text-neutral-400">
                        <Calendar className="w-3 h-3 text-neutral-400" />
                        {displayDate}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
