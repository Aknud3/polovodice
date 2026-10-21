"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, User } from "lucide-react";
import type { Profile } from "@/types/portal";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { formatInlineMarkdown } from "@/lib/markdown";

interface ProfileDetailClientProps {
  profile: Profile;
}

export function ProfileDetailClient({ profile }: ProfileDetailClientProps) {
  const { language, t } = useLanguage();
  const isEn = language === "en" && profile.en;
  const title = isEn ? profile.en!.title : profile.title;
  const content = isEn ? profile.en!.content : profile.content;
  const photoAlt = isEn ? (profile.en!.photoAlt ?? profile.photoAlt) : profile.photoAlt;

  // Rozdělení obsahu na odstavce, nadpisy a odrážky
  const blocks = content.trim().split(/\n\s*\n/);

  return (
    <div className="py-8 sm:py-10">
      <article className="max-w-[700px] mx-auto px-4 sm:px-6 space-y-8">
        {/* Zpět na medailonky */}
        <div>
          <Link
            href="/zpravy/medailonky"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-mono text-[#0065bd] dark:text-fel-cyan hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t("backToProfiles")}</span>
          </Link>
        </div>

        {/* Hlavička medailonku */}
        <header className="space-y-5 pb-6 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {profile.photoUrl ? (
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-sm overflow-hidden bg-neutral-900 shrink-0 border border-neutral-200 dark:border-neutral-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={profile.photoUrl}
                  alt={photoAlt ?? profile.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-sm bg-[#081d3d] border border-neutral-800 flex items-center justify-center shrink-0">
                <User className="w-10 h-10 text-fel-cyan/70" />
              </div>
            )}

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{profile.publishedAt}</span>
                </span>
                <span>•</span>
                <span>Medailonek</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold font-sans text-neutral-900 dark:text-white tracking-tight leading-tight">
                {profile.name}
              </h1>

              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-medium leading-relaxed">
                {title}
              </p>
            </div>
          </div>
        </header>

        {/* Obsah medailonku */}
        <div className="space-y-4 text-sm sm:text-base text-neutral-800 dark:text-neutral-200 leading-relaxed font-sans">
          {blocks.map((block, idx) => {
            const trimmed = block.trim();
            if (trimmed.startsWith("###")) {
              const heading = trimmed.replace(/^###\s*/, "");
              return (
                <h3
                  key={idx}
                  className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white pt-4 tracking-tight"
                >
                  {heading}
                </h3>
              );
            }
            if (trimmed.startsWith("-")) {
              const items = trimmed
                .split("\n")
                .map((line) => line.replace(/^-\s*/, "").trim())
                .filter(Boolean);
              return (
                <ul key={idx} className="space-y-1.5 list-disc pl-5 text-sm sm:text-base text-neutral-700 dark:text-neutral-300">
                  {items.map((item, itemIdx) => (
                    <li key={itemIdx}>{formatInlineMarkdown(item)}</li>
                  ))}
                </ul>
              );
            }
            return <p key={idx}>{formatInlineMarkdown(trimmed)}</p>;
          })}
        </div>

        {/* Spodní navigace zpět */}
        <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800">
          <Link
            href="/zpravy/medailonky"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-mono text-[#0065bd] dark:text-fel-cyan hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t("backToProfiles")}</span>
          </Link>
        </div>
      </article>
    </div>
  );
}
