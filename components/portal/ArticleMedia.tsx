import { Cpu } from "lucide-react";

interface ArticleMediaProps {
  imageUrl?: string;
  imageAlt?: string;
  /** Popisek kategorie pro šablonu bez obrázku (rules/theme.md §8) */
  label: string;
  imageClassName?: string;
  loading?: "lazy" | "eager";
  /** Menší varianta šablony pro náhledy v bočním sloupci */
  compact?: boolean;
}

/**
 * Jediné místo, kde se vykresluje náhled článku. Buď skutečný obrázek,
 * nebo brandovaná šablona pro články bez fotografie.
 */
export function ArticleMedia({
  imageUrl,
  imageAlt,
  label,
  imageClassName,
  loading = "lazy",
  compact = false,
}: ArticleMediaProps) {
  if (imageUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={imageUrl}
        alt={imageAlt ?? ""}
        loading={loading}
        className={`w-full h-full object-cover ${imageClassName ?? ""}`}
      />
    );
  }

  return (
    <div className="article-media-placeholder w-full h-full flex flex-col items-center justify-center gap-2 px-3 text-center">
      <Cpu className={compact ? "w-5 h-5 text-fel-cyan/70" : "w-7 h-7 text-fel-cyan/70"} />
      <span
        className={`font-mono uppercase tracking-wider text-fel-cyan/80 line-clamp-2 ${
          compact ? "text-[9px]" : "text-[10px] sm:text-xs"
        }`}
      >
        {label}
      </span>
    </div>
  );
}
