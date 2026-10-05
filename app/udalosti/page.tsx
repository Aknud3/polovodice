import type { Metadata } from "next";
import { getCampusEvents } from "@/lib/api";
import { EventList } from "@/components/portal/EventList";

export const metadata: Metadata = {
  title: "Události, semináře a konference // POLOVODIČE ČVUT FEL",
  description:
    "Harmonogram odborných přednášek, workshopů IC designu a dnů otevřených dveří na Katedře mikroelektroniky FEL ČVUT.",
};

export default async function EventsPage() {
  const events = await getCampusEvents(10);

  return (
    <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Záhlaví */}
      <div className="space-y-2 pb-6 border-b border-neutral-200 dark:border-neutral-800">
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-xs bg-fel-blue/10 dark:bg-fel-cyan/15 text-fel-blue dark:text-fel-cyan text-xs font-mono font-bold uppercase tracking-wider">
          AKADEMICKÝ A PRŮMYSLOVÝ KALENDÁŘ
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-sans tracking-tight text-neutral-900 dark:text-white">
          Přednášky, workshopy a semináře
        </h1>
        <p className="text-base text-neutral-600 dark:text-neutral-300 max-w-3xl leading-relaxed">
          Zúčastněte se odborných přednášek inženýrů z praxe (onsemi, STMicroelectronics, Cadence)
          a obhajob výzkumných projektů Katedry mikroelektroniky FEL ČVUT.
        </p>
      </div>

      {/* Seznam událostí (Klientský interaktivní komponent) */}
      <EventList events={events} />
    </div>
  );
}
