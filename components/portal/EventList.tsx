"use client";

import { useState } from "react";
import { Clock, Users, MapPin, ArrowUpRight, Check } from "lucide-react";
import type { CampusEvent } from "@/types/portal";

interface EventListProps {
  events: CampusEvent[];
}

export function EventList({ events }: EventListProps) {
  const [registeredIds, setRegisteredIds] = useState<string[]>([]);

  const handleRegister = (id: string, title: string) => {
    if (registeredIds.includes(id)) return;
    setRegisteredIds((prev) => [...prev, id]);
  };

  return (
    <div className="space-y-4">
      {events.map((ev) => {
        const isRegistered = registeredIds.includes(ev.id);

        return (
          <div
            key={ev.id}
            className="group rounded-sm border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#141846] p-6 hover:border-fel-blue/40 dark:hover:border-fel-cyan/40 hover:shadow-md transition-all duration-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          >
            {/* Datum kostka + informace */}
            <div className="flex items-start gap-5">
              {/* Datová kostka */}
              <div className="w-16 h-16 rounded-sm bg-fel-blue/10 dark:bg-fel-cyan/15 border border-fel-blue/20 dark:border-fel-cyan/30 flex flex-col items-center justify-center shrink-0">
                <span className="text-2xl font-bold font-mono text-fel-blue dark:text-fel-cyan leading-none">
                  {ev.dateDay}
                </span>
                <span className="text-[10px] font-mono font-semibold uppercase text-neutral-500 dark:text-neutral-400 mt-1">
                  {ev.dateMonth}
                </span>
              </div>

              {/* Texty události */}
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2 py-0.2 rounded-xs bg-neutral-100 dark:bg-neutral-800 text-[10px] font-mono font-semibold uppercase text-neutral-600 dark:text-neutral-300">
                    {ev.category}
                  </span>
                  <span className="text-xs font-mono text-neutral-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {ev.time}
                  </span>
                  <span className="text-xs font-mono text-neutral-400 flex items-center gap-1">
                    <Users className="w-3 h-3" /> Pro: {ev.targetAudience}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold font-sans tracking-tight text-neutral-900 dark:text-white group-hover:text-fel-blue dark:group-hover:text-fel-cyan transition-colors">
                  {ev.title}
                </h3>

                <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-2xl">
                  {ev.description}
                </p>

                <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 dark:text-neutral-400 pt-1">
                  <MapPin className="w-3.5 h-3.5 text-fel-cyan shrink-0" />
                  <span>{ev.location}</span>
                </div>
              </div>
            </div>

            {/* Akční tlačítko */}
            <div className="shrink-0 self-end md:self-center">
              <button
                type="button"
                onClick={() => handleRegister(ev.id, ev.title)}
                className={`focus-ring px-4 py-2 rounded-xs text-xs font-mono font-semibold transition-colors flex items-center gap-1.5 border ${
                  isRegistered
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                    : "bg-neutral-100 dark:bg-neutral-800 hover:bg-fel-blue dark:hover:bg-fel-cyan hover:text-white dark:hover:text-neutral-950 border-neutral-300 dark:border-neutral-700"
                }`}
              >
                {isRegistered ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Uloženo do kalendáře</span>
                  </>
                ) : (
                  <>
                    <span>Přidat do kalendáře</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
