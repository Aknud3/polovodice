"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { PortalEvent } from "@/types/portal";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { EventCard } from "@/components/portal/EventCard";

interface UpcomingEventsProps {
  events: PortalEvent[];
}

export function UpcomingEvents({ events }: UpcomingEventsProps) {
  const { t } = useLanguage();

  return (
    <section id="nadchazejici-akce" className="space-y-4 sm:space-y-6" aria-label={t("upcomingEvents")}>
      <div className="flex items-center justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-3">
        <h2 className="text-xl sm:text-2xl font-bold font-sans text-neutral-900 dark:text-white tracking-tight">
          {t("upcomingEvents")}
        </h2>

        <Link
          href="/akce"
          className="group inline-flex items-center gap-1 text-xs sm:text-sm font-mono text-[#0065bd] dark:text-fel-cyan hover:underline shrink-0"
        >
          <span>{t("allEvents")}</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>

      {events.length === 0 ? (
        <div className="p-8 text-center rounded-sm border border-dashed border-neutral-300 dark:border-neutral-800 text-xs sm:text-sm text-neutral-500 font-mono">
          {t("noUpcomingEvents")}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-stretch">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </section>
  );
}
