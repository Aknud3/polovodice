import type { Metadata } from "next";
import { getEvents, getOpportunities, getFaqItems } from "@/lib/api";
import { EducationClient } from "@/components/portal/EducationClient";

export const metadata: Metadata = {
  title: "Vzdělávání",
  description: "Studijní programy, příležitosti a letní školy programu Elektronika a komunikace na ČVUT FEL.",
};

export default async function EducationPage() {
  const [summerSchools, opportunities, faq] = await Promise.all([
    getEvents({ type: "summer-school" }),
    getOpportunities(),
    getFaqItems(),
  ]);

  return (
    <div className="w-full max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 overflow-x-clip">
      <EducationClient
        summerSchools={summerSchools}
        opportunities={opportunities}
        faq={faq}
      />
    </div>
  );
}
