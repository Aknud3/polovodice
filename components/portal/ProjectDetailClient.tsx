"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, Building2, Mail, CheckCircle2, User } from "lucide-react";
import type { Project, ProjectCall, ProjectStatus, FacultyUnit, Audience } from "@/types/portal";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { formatEventDate } from "@/lib/utils";

interface ProjectDetailClientProps {
  project: Project | null;
  call: ProjectCall | null;
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

/** Jednoduchý bezpečný renderer textu s podporou ### nadpisů a odrážek */
function FormattedDescription({ text }: { text: string }) {
  const blocks = text.trim().split(/\n\s*\n/);

  return (
    <div className="space-y-4 text-sm sm:text-base text-slate-800 dark:text-neutral-200 leading-relaxed font-sans">
      {blocks.map((block, idx) => {
        const trimmed = block.trim();
        if (trimmed.startsWith("###")) {
          const heading = trimmed.replace(/^###\s*/, "");
          return (
            <h3 key={idx} className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white pt-3">
              {heading}
            </h3>
          );
        }
        if (trimmed.startsWith("-")) {
          const items = trimmed
            .split("\n")
            .map((line) => line.replace(/^-\s*/, "").trim())
            .filter(Boolean);
          return (
            <ul key={idx} className="space-y-1.5 list-disc pl-5 text-sm sm:text-base text-neutral-700 dark:text-neutral-300">
              {items.map((item, itemIdx) => (
                <li key={itemIdx}>{item}</li>
              ))}
            </ul>
          );
        }
        return <p key={idx}>{trimmed}</p>;
      })}
    </div>
  );
}

export function ProjectDetailClient({ project, call }: ProjectDetailClientProps) {
  const { language, t } = useLanguage();

  if (call) {
    const isEn = language === "en" && call.en;
    const title = isEn ? call.en!.title : call.title;
    const desc = isEn ? call.en!.description : call.description;
    const conditions = isEn && call.en?.conditions ? call.en.conditions : call.conditions;

    return (
      <article className="max-w-4xl mx-auto space-y-8">
        {/* Zpět na projekty */}
        <div>
          <Link
            href="/projekty"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-mono text-[#0065bd] dark:text-fel-cyan hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t("backToProjects")}</span>
          </Link>
        </div>

        {/* Hlavička výzvy */}
        <header className="space-y-3 pb-6 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono text-neutral-400">
            <span className="text-[#0879bb] dark:text-fel-cyan font-semibold">
              {t("projectCallLabel")}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-[#0879bb] dark:text-fel-cyan font-semibold">
              <Calendar className="w-3.5 h-3.5" />
              <span>{t("deadline")}:</span>
              <span>{formatEventDate(call.deadline, language)}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5 text-neutral-400" />
              <span>{getUnitLabel(call.unit, t as (k: string) => string)}</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold font-sans text-neutral-900 dark:text-white tracking-tight leading-tight">
            {title}
          </h1>

          <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs font-mono text-neutral-500 dark:text-neutral-400">
            <span>Cílová skupina:</span>
            <span className="text-neutral-700 dark:text-neutral-300 font-medium">
              {call.audience.map((aud) => getAudienceLabel(aud, t as (k: string) => string)).join(", ")}
            </span>
          </div>
        </header>

        {/* Obrázek */}
        {call.imageUrl && (
          <div className="relative aspect-video w-full rounded-sm overflow-hidden bg-neutral-900">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={call.imageUrl} alt={title} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Popis */}
        <div className="prose dark:prose-invert max-w-none">
          <FormattedDescription text={desc} />
        </div>

        {/* Podmínky výzvy */}
        {conditions && conditions.length > 0 && (
          <div className="rounded-sm border border-slate-200 dark:border-neutral-800 bg-white dark:bg-[#141846] p-5 sm:p-6 space-y-3">
            <h2 className="text-lg font-bold font-sans text-neutral-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#0065bd] dark:text-fel-cyan shrink-0" />
              <span>{t("conditions")}</span>
            </h2>
            <ul className="space-y-2 text-sm text-neutral-700 dark:text-neutral-300 pl-1">
              {conditions.map((cond, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#0065bd] dark:text-fel-cyan mt-1">•</span>
                  <span>{cond}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Kontaktní blok */}
        <div className="rounded-sm border border-slate-200 dark:border-neutral-800 bg-white dark:bg-[#141846] p-5 sm:p-6 space-y-2">
          <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            {t("contactPerson")}
          </h2>
          <div className="space-y-1 text-sm text-neutral-800 dark:text-neutral-200">
            <p className="font-bold flex items-center gap-2">
              <User className="w-4 h-4 text-neutral-400" />
              <span>{call.contact.name}</span>
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 pl-6">{call.contact.department}</p>
            <p className="pl-6">
              <a
                href={`mailto:${call.contact.email}`}
                className="text-xs font-mono text-[#0065bd] dark:text-fel-cyan hover:underline flex items-center gap-1 mt-1"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{call.contact.email}</span>
              </a>
            </p>
          </div>
        </div>
      </article>
    );
  }

  if (project) {
    const isEn = language === "en" && project.en;
    const title = isEn ? project.en!.title : project.title;
    const desc = isEn ? project.en!.description : project.description;
    const outputs = isEn && project.en?.outputs ? project.en.outputs : project.outputs;
    const statusStyle = getProjectStatusStyle(project.status, t as (k: string) => string);
    return (
      <article className="max-w-4xl mx-auto space-y-8">
        {/* Zpět na projekty */}
        <div>
          <Link
            href="/projekty"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-mono text-[#0065bd] dark:text-fel-cyan hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t("backToProjects")}</span>
          </Link>
        </div>

        {/* Hlavička projektu */}
        <header className="space-y-3 pb-6 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono text-neutral-400">
            <span className="flex items-center gap-1 text-neutral-700 dark:text-neutral-300">
              <Building2 className="w-3.5 h-3.5 text-neutral-400" />
              <span>{getUnitLabel(project.unit, t as (k: string) => string)}</span>
            </span>
            <span>•</span>
            <span className={statusStyle.className}>
              {statusStyle.label}
            </span>
            {project.startsAt && (
              <>
                <span>•</span>
                <span className="flex items-center gap-1 text-neutral-500 dark:text-neutral-400">
                  <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                  <span>
                    {formatEventDate(project.startsAt, language)}
                    {project.endsAt ? ` – ${formatEventDate(project.endsAt, language)}` : ""}
                  </span>
                </span>
              </>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold font-sans text-neutral-900 dark:text-white tracking-tight leading-tight">
            {title}
          </h1>
        </header>

        {/* Obrázek */}
        {project.imageUrl && (
          <div className="relative aspect-video w-full rounded-sm overflow-hidden bg-neutral-900">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={project.imageUrl} alt={title} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Popis */}
        <div className="prose dark:prose-invert max-w-none">
          <FormattedDescription text={desc} />
        </div>

        {/* Výstupy a publikace */}
        {outputs && outputs.length > 0 && (
          <div className="rounded-sm border border-slate-200 dark:border-neutral-800 bg-white dark:bg-[#141846] p-5 sm:p-6 space-y-3">
            <h2 className="text-lg font-bold font-sans text-neutral-900 dark:text-white">
              {t("outputs")}
            </h2>
            <ul className="space-y-2 text-sm text-neutral-700 dark:text-neutral-300 pl-1">
              {outputs.map((out, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#0065bd] dark:text-fel-cyan mt-1">•</span>
                  <span>{out}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Kontaktní blok */}
        <div className="rounded-sm border border-slate-200 dark:border-neutral-800 bg-white dark:bg-[#141846] p-5 sm:p-6 space-y-2">
          <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            {t("contactPerson")}
          </h2>
          <div className="space-y-1 text-sm text-neutral-800 dark:text-neutral-200">
            <p className="font-bold flex items-center gap-2">
              <User className="w-4 h-4 text-neutral-400" />
              <span>{project.contact.name}</span>
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 pl-6">{project.contact.department}</p>
            <p className="pl-6">
              <a
                href={`mailto:${project.contact.email}`}
                className="text-xs font-mono text-[#0065bd] dark:text-fel-cyan hover:underline flex items-center gap-1 mt-1"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{project.contact.email}</span>
              </a>
            </p>
          </div>
        </div>
      </article>
    );
  }

  return null;
}
