"use client";

import Link from "next/link";
import { ArrowUpRight, Calendar, User } from "lucide-react";
import type { Profile } from "@/types/portal";
import { useLanguage } from "@/components/providers/LanguageProvider";

interface ProfilesClientProps {
  profiles: Profile[];
}

export function ProfilesClient({ profiles }: ProfilesClientProps) {
  const { language, t } = useLanguage();

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* Záhlaví stránky */}
      <div className="border-b border-neutral-200 dark:border-neutral-800 pb-5 space-y-2">
        <h1 className="text-2xl sm:text-4xl font-extrabold font-sans text-neutral-900 dark:text-white tracking-tight">
          {t("profilesHeading")}
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 max-w-3xl leading-relaxed">
          {t("profilesSubtitle")}
        </p>
      </div>

      {/* Mřížka medailonků */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {profiles.map((profile) => {
          const isEn = language === "en" && profile.en;
          const title = isEn ? profile.en!.title : profile.title;
          const photoAlt = isEn ? (profile.en!.photoAlt ?? profile.photoAlt) : profile.photoAlt;
          const initial = profile.name.replace(/^(prof\.|doc\.|Ing\.|CSc\.|Ph\.D\.|Mgr\.)\s*/g, "").trim()[0] ?? "P";

          return (
            <article
              key={profile.id}
              className="group relative rounded-sm border border-slate-200 dark:border-neutral-800 bg-white dark:bg-[#141846] overflow-hidden hover:border-[#0065bd] dark:hover:border-fel-cyan/40 hover:-translate-y-1 hover:shadow-md transition-all duration-200 flex flex-col h-full"
            >
              <Link href={`/zpravy/medailonky/${profile.slug}`} className="flex flex-col h-full">
                {/* Čtvercové foto nebo navy placeholder s iniciálou */}
                <div className="relative aspect-square w-full overflow-hidden bg-neutral-900 shrink-0">
                  {profile.photoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={profile.photoUrl}
                      alt={photoAlt ?? profile.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#081d3d] flex flex-col items-center justify-center text-center p-6 border-b border-neutral-800">
                      <span className="w-20 h-20 rounded-full border-2 border-fel-cyan/40 bg-fel-cyan/10 flex items-center justify-center font-mono font-bold text-3xl text-fel-cyan">
                        {initial}
                      </span>
                      <span className="mt-3 text-[11px] font-mono text-neutral-400">
                        {profile.name}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />
                </div>

                <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1 text-[11px] font-mono text-neutral-400">
                      <Calendar className="w-3 h-3" />
                      <span>{profile.publishedAt}</span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold font-sans text-slate-900 dark:text-white group-hover:text-[#0065bd] dark:group-hover:text-fel-cyan transition-colors line-clamp-1">
                      {profile.name}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-700 dark:text-neutral-300 leading-relaxed line-clamp-2">
                      {title}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-xs font-mono">
                    <span className="flex items-center gap-1 text-[11px] text-neutral-400">
                      <User className="w-3 h-3" />
                      <span>Medailonek</span>
                    </span>
                    <span className="inline-flex items-center gap-0.5 text-[#0065bd] dark:text-fel-cyan font-semibold group-hover:translate-x-0.5 transition-transform">
                      {t("detail")} <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          );
        })}
      </div>
    </div>
  );
}
