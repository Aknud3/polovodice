"use client";

import { MapPin, ArrowUpRight, Calendar } from "lucide-react";
import type { PortalEvent, EventType, Audience } from "@/types/portal";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { formatEventDateRange } from "@/lib/utils";

interface EventCardProps {
  event: PortalEvent;
}

function getEventTypeLabel(type: EventType, t: (k: string) => string): string {
  switch (type) {
    case "conference":
      return t("eventTypeConference");
    case "summer-school":
      return t("eventTypeSummerSchool");
    case "event":
    default:
      return t("eventTypeEvent");
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

export function EventCard({ event }: EventCardProps) {
  const { language, t } = useLanguage();
  const isEn = language === "en" && event.en;
  const title = isEn ? event.en!.title : event.title;
  const perex = isEn ? event.en!.perex : event.perex;
  const location = isEn ? event.en!.location : event.location;
  const imageAlt = isEn ? (event.en!.imageAlt ?? event.imageAlt) : event.imageAlt;

  const typeLabel = getEventTypeLabel(event.type, t as (k: string) => string);
  return (
    <article className="group relative rounded-sm border border-slate-200 dark:border-neutral-800 bg-white dark:bg-[#141846] overflow-hidden hover:border-[#0065bd] dark:hover:border-fel-cyan/40 hover:-translate-y-1 hover:shadow-md transition-all duration-200 flex flex-col h-full">
      {event.imageUrl && (
        <div className="relative aspect-video w-full overflow-hidden bg-neutral-900 shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={event.imageUrl}
            alt={imageAlt ?? title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />
        </div>
      )}

      <div className="p-4 sm:p-5 flex flex-col flex-1 gap-2.5">
        {/* Čistá jednořádková metadata dle vzoru novinek */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-mono text-neutral-400">
          <span>{formatEventDateRange(event.startsAt, event.endsAt, language)}</span>
          <span>•</span>
          <span className="text-[#0879bb] dark:text-fel-cyan font-medium">{typeLabel}</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-neutral-400 shrink-0" />
            <span className="truncate max-w-[170px]">{location}</span>
          </span>
        </div>

        {/* Název */}
        <h3 className="text-base sm:text-lg font-bold font-sans text-slate-900 dark:text-white tracking-tight leading-snug group-hover:text-[#0065bd] dark:group-hover:text-fel-cyan transition-colors line-clamp-2">
          {title}
        </h3>

        {/* Perex */}
        <p className="text-xs sm:text-sm text-slate-700 dark:text-neutral-300 leading-relaxed line-clamp-2 flex-1">
          {perex}
        </p>

        {/* Patička karty: Čistý text cílových skupin a volitelná registrace */}
        <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between gap-2 text-xs font-mono text-neutral-400">
          <span className="truncate min-w-0 max-w-[200px] text-[11px]">
            {event.audience.map((aud) => getAudienceLabel(aud, t as (k: string) => string)).join(", ")}
          </span>

          {event.registrationUrl && (
            <a
              href={event.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-0.5 text-[#0065bd] dark:text-fel-cyan font-semibold hover:underline shrink-0"
            >
              <span>{t("register")}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
