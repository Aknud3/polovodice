"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Check, ArrowUpRight, Calendar, Building2 } from "lucide-react";
import type { Project, ProjectCall, FacultyUnit, ProjectStatus, Audience } from "@/types/portal";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { formatEventDate } from "@/lib/utils";

interface ProjectsClientProps {
  projects: Project[];
  calls: ProjectCall[];
}

function getProjectStatusStyle(status: ProjectStatus, t: (k: string) => string) {
  switch (status) {
    case "preparation":
      return {
        label: t("statusPreparation"),
        className: "text-[#0879bb] dark:text-[#27d0d0] font-medium",
      };
    case "running":
      return {
        label: t("statusRunning"),
        className: "text-[#2856cb] dark:text-[#3beeb1] font-semibold",
      };
    case "completed":
    default:
      return {
        label: t("statusCompleted"),
        className: "text-neutral-500 dark:text-neutral-400",
      };
  }
}

function getUnitLabel(unit: FacultyUnit, t: (k: string) => string): string {
  switch (unit) {
    case "fel":
      return t("unitFel");
    case "kme":
      return t("unitKme");
    case "fjfi":
      return t("unitFjfi");
    case "fd":
      return t("unitFd");
    case "external":
    default:
      return t("unitExternal");
  }
}

function getAudienceLabel(audience: Audience, t: (k: string) => string): string {
  switch (audience) {
    case "students":
      return t("audienceStudents");
    case "researchers":
      return t("audienceResearchers");
    case "public":
      return t("audiencePublic");
    case "partners":
      return t("audiencePartners");
    case "media":
      return t("audienceMedia");
  }
}

export function ProjectsClient({ projects, calls }: ProjectsClientProps) {
  const { language, t } = useLanguage();
  const [selectedUnit, setSelectedUnit] = useState<FacultyUnit | "all">("all");
  const [isOpen, setIsOpen] = useState(false);

  const unitOptions: Array<{ id: FacultyUnit | "all"; label: string }> = [
    { id: "all", label: t("allUnits") },
    { id: "fel", label: t("unitFel") },
    { id: "kme", label: t("unitKme") },
    { id: "fjfi", label: t("unitFjfi") },
    { id: "fd", label: t("unitFd") },
    { id: "external", label: t("unitExternal") },
  ];

  const activeOption = unitOptions.find((opt) => opt.id === selectedUnit) ?? unitOptions[0];

  const filteredProjects =
    selectedUnit === "all"
      ? projects
      : projects.filter((project) => project.unit === selectedUnit);

  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="space-y-10 sm:space-y-14">
      {/* Záhlaví stránky */}
      <div className="border-b border-neutral-200 dark:border-neutral-800 pb-5 space-y-2">
        <h1 className="text-2xl sm:text-4xl font-extrabold font-sans text-neutral-900 dark:text-white tracking-tight">
          {t("projectsHeading")}
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 max-w-3xl leading-relaxed">
          {t("projectsSubtitle")}
        </p>
      </div>

      {/* 1. Mřížka projektů s filtrem */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative w-full sm:max-w-xs md:max-w-sm">
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-expanded={isOpen}
              className="focus-ring w-full min-h-10 px-3.5 py-2 rounded-sm bg-white dark:bg-[#141846] text-slate-900 dark:text-white border border-slate-300 dark:border-neutral-800 flex items-center justify-between gap-2 text-xs font-mono font-semibold shadow-2xs hover:border-[#0065bd] dark:hover:border-fel-cyan transition-colors"
            >
              <span className="flex items-center gap-2 min-w-0">
                <span className="text-neutral-500 dark:text-neutral-400 font-normal">{t("unitLabel")}</span>
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
                {unitOptions.map((opt) => {
                  const isSelected = opt.id === selectedUnit;
                  const count =
                    opt.id === "all"
                      ? projects.length
                      : projects.filter((p) => p.unit === opt.id).length;

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        setSelectedUnit(opt.id);
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

          <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
            {filteredProjects.length}{" "}
            {filteredProjects.length === 1 ? "projekt" : filteredProjects.length < 5 ? "projekty" : "projektů"}
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="p-12 text-center rounded-sm border border-dashed border-neutral-300 dark:border-neutral-800 text-sm text-neutral-500 font-mono">
            {t("emptyProjects")}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => {
              const isEn = language === "en" && project.en;
              const title = isEn ? project.en!.title : project.title;
              const desc = isEn ? project.en!.description : project.description;
              const statusStyle = getProjectStatusStyle(project.status, t as (k: string) => string);
              // Z popisu vyjmeme pouze čistý text bez markdown nadpisů pro perex
              const plainDesc = desc
                .replace(/###[^\n]+/g, "")
                .replace(/-[^\n]+/g, "")
                .trim();

              return (
                <article
                  key={project.id}
                  className="group relative rounded-sm border border-slate-200 dark:border-neutral-800 bg-white dark:bg-[#141846] overflow-hidden hover:border-[#0065bd] dark:hover:border-fel-cyan/40 hover:-translate-y-1 hover:shadow-md transition-all duration-200 flex flex-col h-full"
                >
                  <Link href={`/projekty/${project.slug}`} className="flex flex-col h-full">
                    {project.imageUrl && (
                      <div className="relative aspect-video w-full overflow-hidden bg-neutral-900 shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={project.imageUrl}
                          alt={title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />
                      </div>
                    )}

                    <div className="p-4 sm:p-5 flex flex-col flex-1 gap-2.5">
                      {/* Čistá metadata dle vzoru novinek */}
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-mono text-neutral-400">
                        <span className="flex items-center gap-1">
                          <Building2 className="w-3 h-3 text-neutral-400 shrink-0" />
                          <span>{getUnitLabel(project.unit, t as (k: string) => string)}</span>
                        </span>
                        <span>•</span>
                        <span className={statusStyle.className}>
                          {statusStyle.label}
                        </span>
                        {project.startsAt && (
                          <>
                            <span>•</span>
                            <span>{project.startsAt.slice(0, 4)}</span>
                          </>
                        )}
                      </div>
                      {/* Název */}
                      <h3 className="text-base sm:text-lg font-bold font-sans text-slate-900 dark:text-white tracking-tight leading-snug group-hover:text-[#0065bd] dark:group-hover:text-fel-cyan transition-colors line-clamp-2">
                        {title}
                      </h3>

                      {/* Popis */}
                      <p className="text-xs sm:text-sm text-slate-700 dark:text-neutral-300 leading-relaxed line-clamp-2 flex-1">
                        {plainDesc}
                      </p>

                      {/* Patička */}
                      <div className="mt-2 pt-3 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-xs font-mono">
                        <span className="text-[11px] text-neutral-400 truncate max-w-[180px]">
                          {project.contact.name}
                        </span>
                        <span className="inline-flex items-center gap-0.5 text-[#0065bd] dark:text-fel-cyan font-semibold group-hover:translate-x-0.5 transition-transform">
                          {t("detail")} <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* 2. Blok Projektové výzvy */}
      <section className="space-y-6 pt-6 border-t border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold font-sans text-neutral-900 dark:text-white tracking-tight">
            {t("projectCalls")}
          </h2>
          <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
            {calls.length} {calls.length === 1 ? "výzva" : calls.length < 5 ? "výzvy" : "výzev"}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {calls.map((call) => {
            const isEn = language === "en" && call.en;
            const title = isEn ? call.en!.title : call.title;
            const desc = isEn ? call.en!.description : call.description;
            const isPast = call.deadline < today;

            return (
              <article
                key={call.id}
                className="group relative rounded-sm border border-slate-200 dark:border-neutral-800 bg-white dark:bg-[#141846] p-5 hover:border-[#0065bd] dark:hover:border-fel-cyan/40 hover:-translate-y-1 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <Link href={`/projekty/${call.slug}`} className="flex flex-col h-full">
                  <div>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-mono text-neutral-400 mb-2">
                      <span className="text-[#0879bb] dark:text-fel-cyan font-semibold">
                        {t("projectCallLabel")}
                      </span>
                      <span>•</span>
                      <span
                        className={`flex items-center gap-1 ${
                          isPast ? "text-[#e34c55] font-semibold" : "text-neutral-500 dark:text-neutral-400"
                        }`}
                      >
                        <Calendar className="w-3 h-3 text-neutral-400 shrink-0" />
                        <span>{t("deadline")}:</span>
                        <span>{formatEventDate(call.deadline, language)}</span>
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold font-sans text-slate-900 dark:text-white tracking-tight leading-snug group-hover:text-[#0065bd] dark:group-hover:text-fel-cyan transition-colors line-clamp-2">
                      {title}
                    </h3>

                    <p className="mt-2 text-xs sm:text-sm text-slate-700 dark:text-neutral-300 leading-relaxed line-clamp-3">
                      {desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between gap-2 text-xs font-mono text-neutral-400">
                    <span className="truncate min-w-0 max-w-[200px] text-[11px]">
                      {call.audience.map((aud) => getAudienceLabel(aud, t as (k: string) => string)).join(", ")}
                    </span>

                    <span className="inline-flex items-center gap-0.5 text-[#0065bd] dark:text-fel-cyan font-semibold group-hover:translate-x-0.5 transition-transform shrink-0">
                      {t("detail")} <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
