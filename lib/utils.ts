import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Spojuje názvy tříd pomocí clsx a řeší případné konflikty v Tailwind CSS.
 * Odpovídá standardu definovanému v rules/technologie.md a rules/coding-standards.md.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Formátuje ISO datum („2026-11-12“) podle aktivního jazyka portálu:
 * cs → „12. 11. 2026“, en → „November 12, 2026“ (rules/technologie.md §10).
 */
export function formatEventDate(iso: string, language: "cs" | "en"): string {
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat(language === "en" ? "en-US" : "cs-CZ", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

/**
 * Formátuje rozsah akce „od – do“; bez `endsAt` nebo při shodném dni vrací jediné datum.
 */
export function formatEventDateRange(startsAt: string, endsAt: string | undefined, language: "cs" | "en"): string {
  if (!endsAt || endsAt === startsAt) return formatEventDate(startsAt, language);
  return `${formatEventDate(startsAt, language)} – ${formatEventDate(endsAt, language)}`;
}
