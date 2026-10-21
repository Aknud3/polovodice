import type { Audience } from "@/types/portal";

/** Pořadí cílových skupin v rozcestníku i v sub-menu podstránek. */
export const AUDIENCE_ORDER: Audience[] = [
  "students",
  "researchers",
  "public",
  "partners",
  "media",
];

/** České URL slugy podstránek /pro-koho/[audience]. */
export const AUDIENCE_SLUGS: Record<Audience, string> = {
  students: "studenti",
  researchers: "vyzkumnici",
  public: "verejnost",
  partners: "partneri",
  media: "media",
};

/** Reverzní mapa slug → interní identifikátor pro generateStaticParams a validaci routy. */
export const AUDIENCE_BY_SLUG: Record<string, Audience> = Object.fromEntries(
  AUDIENCE_ORDER.map((audience) => [AUDIENCE_SLUGS[audience], audience]),
) as Record<string, Audience>;
