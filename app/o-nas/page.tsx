import type { Metadata } from "next";
import { getPartners, getTimelineItems } from "@/lib/api";
import { AboutClient } from "@/components/portal/AboutClient";

export const metadata: Metadata = {
  title: "O nás",
  description: "Katedra mikroelektroniky FEL ČVUT, naši průmysloví partneři a časová osa historie portálu Polovodiče.",
};

export default async function AboutPage() {
  const [partners, timeline] = await Promise.all([
    getPartners(),
    getTimelineItems(),
  ]);

  return (
    <div className="w-full max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 overflow-x-clip">
      <AboutClient partners={partners} timeline={timeline} />
    </div>
  );
}
