"use client";

import Link from "next/link";
import { GraduationCap, FlaskConical, Users, Handshake, Newspaper, ArrowRight } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

export function AudienceGateway() {
  const { t } = useLanguage();

  const audiences = [
    {
      key: "students",
      icon: GraduationCap,
      title: t("audienceStudents"),
      desc: t("audienceStudentsDesc"),
      href: "/pro-koho/studenti",
    },
    {
      key: "researchers",
      icon: FlaskConical,
      title: t("audienceResearchers"),
      desc: t("audienceResearchersDesc"),
      href: "/pro-koho/vyzkumnici",
    },
    {
      key: "public",
      icon: Users,
      title: t("audiencePublic"),
      desc: t("audiencePublicDesc"),
      href: "/pro-koho/verejnost",
    },
    {
      key: "partners",
      icon: Handshake,
      title: t("audiencePartners"),
      desc: t("audiencePartnersDesc"),
      href: "/pro-koho/partneri",
    },
    {
      key: "media",
      icon: Newspaper,
      title: t("audienceMedia"),
      desc: t("audienceMediaDesc"),
      href: "/pro-koho/media",
    },
  ];

  return (
    <section id="pro-koho" className="space-y-3 sm:space-y-4" aria-label={t("audienceTitle")}>
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          {t("audienceTitle")}
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {audiences.map((aud, index) => {
          const Icon = aud.icon;
          const isLastOnMobile = index === audiences.length - 1;
          return (
            <Link
              key={aud.key}
              href={aud.href}
              className={`group rounded-sm border border-slate-200 dark:border-neutral-800 bg-white dark:bg-[#141846] p-4 sm:p-5 hover:border-[#0065bd] dark:hover:border-fel-cyan/40 hover:-translate-y-1 hover:shadow-md transition-all duration-200 flex flex-col justify-between ${
                isLastOnMobile ? "col-span-2 sm:col-span-1" : ""
              }`}
            >
              <div>
                <div className="w-9 h-9 rounded-sm bg-neutral-100 dark:bg-neutral-800/80 flex items-center justify-center text-[#0065bd] dark:text-fel-cyan group-hover:scale-105 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="mt-3 text-sm sm:text-base font-bold font-sans text-neutral-900 dark:text-white group-hover:text-[#0065bd] dark:group-hover:text-fel-cyan transition-colors">
                  {aud.title}
                </h3>
                <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-2">
                  {aud.desc}
                </p>
              </div>

              <div className="mt-4 pt-2 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-end text-[#0065bd] dark:text-fel-cyan">
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
