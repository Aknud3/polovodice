"use client";

import { useState } from "react";
import { Mail, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

export function NewsletterSection() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim().length > 0 && email.includes("@")) {
      setIsSubmitted(true);
    }
  }

  return (
    <section id="newsletter" aria-label={t("newsletterTitle")}>
      <div className="rounded-sm border border-slate-200 dark:border-neutral-800 bg-white dark:bg-[#141846] border-l-4 border-l-[#0065bd] dark:border-l-fel-cyan p-5 sm:p-8">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-[#0065bd] dark:text-fel-cyan text-xs font-mono font-semibold uppercase tracking-wider mb-2">
            <Mail className="w-4 h-4" />
            <span>Newsletter</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold font-sans text-neutral-900 dark:text-white tracking-tight">
            {t("newsletterTitle")}
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
            {t("newsletterDesc")}
          </p>

          {isSubmitted ? (
            <div className="mt-5 flex items-center gap-2.5 p-3 rounded-sm bg-[#0065bd]/10 dark:bg-fel-cyan/15 text-[#0065bd] dark:text-fel-cyan border border-[#0065bd]/20 dark:border-fel-cyan/30 text-xs sm:text-sm font-medium">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{t("newsletterSuccess")}</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-5 flex flex-col sm:flex-row gap-2.5 max-w-lg">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("newsletterPlaceholder")}
                required
                className="h-10 px-3 sm:px-4 rounded-sm border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-hidden focus:border-[#0065bd] dark:focus:border-fel-cyan flex-1 font-sans"
              />
              <button
                type="submit"
                className="h-10 px-5 rounded-sm bg-[#0065bd] hover:bg-[#005299] text-white font-medium text-xs sm:text-sm font-mono uppercase tracking-wider transition-colors shrink-0 shadow-xs"
              >
                {t("newsletterSubmit")}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
