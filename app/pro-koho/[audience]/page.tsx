import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticlesByAudience } from "@/lib/api";
import { AUDIENCE_BY_SLUG, AUDIENCE_ORDER, AUDIENCE_SLUGS } from "@/lib/audiences";
import { NewsArchiveClient } from "@/components/portal/NewsArchiveClient";

interface AudiencePageProps {
  params: Promise<{ audience: string }>;
}

const AUDIENCE_METADATA: Record<string, { title: string; description: string }> = {
  studenti: {
    title: "Pro studenty",
    description: "Zprávy o studiu, stážích, stipendiích a akcích pro studenty FEL ČVUT.",
  },
  vyzkumnici: {
    title: "Pro výzkumníky",
    description: "Výzkumné zprávy, projekty a publikační výstupy z oblasti polovodičů.",
  },
  verejnost: {
    title: "Pro veřejnost",
    description: "Novinky, exkurze a akce otevřené široké veřejnosti.",
  },
  partneri: {
    title: "Pro partnery",
    description: "Zprávy o průmyslové spolupráci, projektech a partnerstvích.",
  },
  media: {
    title: "Pro média",
    description: "Aktuální zprávy a podklady pro novináře a média.",
  },
};

export function generateStaticParams() {
  return AUDIENCE_ORDER.map((audience) => ({ audience: AUDIENCE_SLUGS[audience] }));
}

export async function generateMetadata({ params }: AudiencePageProps): Promise<Metadata> {
  const { audience } = await params;
  const meta = AUDIENCE_METADATA[audience];

  if (!meta) {
    return { title: "Cílová skupina nenalezena" };
  }

  return { title: meta.title, description: meta.description };
}

export default async function AudiencePage({ params }: AudiencePageProps) {
  const { audience: slug } = await params;
  const audience = AUDIENCE_BY_SLUG[slug];

  if (!audience) {
    notFound();
  }

  const articles = await getArticlesByAudience(audience);

  return (
    <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <NewsArchiveClient initialArticles={articles} audience={audience} />
    </div>
  );
}
