"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-sm border border-neutral-300/40 dark:border-neutral-700/60 bg-transparent" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="focus-ring flex items-center justify-center w-9 h-9 rounded-sm border border-neutral-300 dark:border-neutral-700 hover:border-fel-blue dark:hover:border-fel-cyan bg-white/50 dark:bg-neutral-900/50 text-neutral-700 dark:text-neutral-300 transition-colors"
      aria-label={isDark ? "Přepnout na světlý režim" : "Přepnout na tmavý režim"}
      title={isDark ? "Světlý režim" : "Tmavý režim"}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-amber-400 animate-in fade-in duration-200" />
      ) : (
        <Moon className="w-4 h-4 text-fel-blue animate-in fade-in duration-200" />
      )}
    </button>
  );
}
