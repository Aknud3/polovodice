"use client";

import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import type { PortalEvent, EventType } from "@/types/portal";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { EventCard } from "@/components/portal/EventCard";

interface EventsClientProps {
  initialEvents: PortalEvent[];
}

export function EventsClient({ initialEvents }: EventsClientProps) {
  const { t } = useLanguage();
  const [selectedType, setSelectedType] = useState<EventType | "all">("all");
  const [isOpen, setIsOpen] = useState(false);

  const typeOptions: Array<{ id: EventType | "all"; label: string }> = [
    { id: "all", label: t("allEventTypes") },
    { id: "event", label: t("eventTypeEvent") },
    { id: "conference", label: t("eventTypeConference") },
    { id: "summer-school", label: t("eventTypeSummerSchool") },
  ];

  const activeOption = typeOptions.find((opt) => opt.id === selectedType) ?? typeOptions[0];

  const filteredEvents =
    selectedType === "all"
      ? initialEvents
      : initialEvents.filter((event) => event.type === selectedType);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Záhlaví stránky */}
      <div className="border-b border-neutral-200 dark:border-neutral-800 pb-5 space-y-2">
        <h1 className="text-2xl sm:text-4xl font-extrabold font-sans text-neutral-900 dark:text-white tracking-tight">
          {t("eventsHeading")}
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 max-w-3xl leading-relaxed">
          {t("eventsSubtitle")}
        </p>
      </div>

      {/* Ovládací lišta: Dropdown filtru typu akce */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative w-full sm:max-w-xs md:max-w-sm">
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
            className="focus-ring w-full min-h-10 px-3.5 py-2 rounded-sm bg-white dark:bg-[#141846] text-slate-900 dark:text-white border border-slate-300 dark:border-neutral-800 flex items-center justify-between gap-2 text-xs font-mono font-semibold shadow-2xs hover:border-[#0065bd] dark:hover:border-fel-cyan transition-colors"
          >
            <span className="flex items-center gap-2 min-w-0">
              <span className="text-neutral-500 dark:text-neutral-400 font-normal">{t("eventTypeLabel")}</span>
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
              {typeOptions.map((opt) => {
                const isSelected = opt.id === selectedType;
                const count =
                  opt.id === "all"
                    ? initialEvents.length
                    : initialEvents.filter((e) => e.type === opt.id).length;

                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      setSelectedType(opt.id);
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
          {filteredEvents.length} {filteredEvents.length === 1 ? "akce" : filteredEvents.length < 5 ? "akce" : "akcí"}
        </div>
      </div>

      {/* Mřížka akcí */}
      {filteredEvents.length === 0 ? (
        <div className="p-12 text-center rounded-sm border border-dashed border-neutral-300 dark:border-neutral-800 text-sm text-neutral-500 font-mono">
          {t("emptyEvents")}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
