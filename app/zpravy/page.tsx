import type { Metadata } from "next";
import { getArticles } from "@/lib/api";
import { NewsArchiveClient } from "@/components/portal/NewsArchiveClient";

export const metadata: Metadata = {
  title: "Archiv zpráv",
  description: "Informační deník ze světa elektroniky",
};

export default async function NewsPage() {
  const articles = await getArticles();

  return (
    <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <NewsArchiveClient initialArticles={articles} />
    </div>
  );
}
