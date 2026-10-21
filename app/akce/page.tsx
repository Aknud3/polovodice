import type { Metadata } from "next";
import { getEvents } from "@/lib/api";
import { EventsClient } from "@/components/portal/EventsClient";

export const metadata: Metadata = {
  title: "Akce",
  description: "Přehled událostí, konferencí a letních škol pořádaných fakultou a partnery.",
};

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <div className="w-full max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 overflow-x-clip">
      <EventsClient initialEvents={events} />
    </div>
  );
}
