"use client";

import { useState, useEffect } from "react";
import { Cookie, X } from "lucide-react";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem("polovodice_cookie_consent");
      if (!consent) {
        setIsVisible(true);
      }
    } catch {
      // localStorage unavailable or restricted
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem("polovodice_cookie_consent", "accepted");
    } catch {
      // ignore
    }
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      role="region"
      aria-label="Informace o souborech cookies"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 p-4 rounded-sm border border-neutral-200 dark:border-neutral-700 bg-white/95 dark:bg-[#141846]/95 backdrop-blur-md shadow-xl animate-in slide-in-from-bottom duration-300"
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-xs bg-fel-blue/10 dark:bg-fel-cyan/15 text-fel-blue dark:text-fel-cyan shrink-0 mt-0.5">
          <Cookie className="w-4 h-4" />
        </div>
        <div className="flex-1 space-y-1">
          <h4 className="text-xs font-mono font-bold text-neutral-900 dark:text-white uppercase tracking-wider">
            Soubory cookies
          </h4>
          <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
            Tento portál využívá pouze nezbytné technické cookies pro ukládání vašeho nastavení motivu (světlý/tmavý) a jazykové preference.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsVisible(false)}
          className="text-neutral-400 hover:text-neutral-600 dark:hover:text-white p-1 rounded-xs"
          aria-label="Zavřít lištu cookies"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="mt-3 pt-3 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={handleAccept}
          className="focus-ring px-4 py-1.5 rounded-xs bg-fel-blue hover:bg-fel-blue-hover text-white text-xs font-mono font-semibold transition-colors shadow-xs"
        >
          Rozumím a přijmout
        </button>
      </div>
    </div>
  );
}
