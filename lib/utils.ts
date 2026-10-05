import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Spojuje názvy tříd pomocí clsx a řeší případné konflikty v Tailwind CSS.
 * Odpovídá standardu definovanému v rules/technologie.md a rules/coding-standards.md.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
