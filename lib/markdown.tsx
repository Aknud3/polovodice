import React from "react";

/**
 * Převede inline Markdown značky (**tučné**, *kurzíva*, `kód`) na React elementy.
 * Zabraňuje zobrazení surových hvězdiček na stránce.
 */
export function formatInlineMarkdown(text: string): React.ReactNode {
  if (!text) return null;

  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g);

  return parts.map((part, index) => {
    // 1. Tučný text **text**
    if (part.startsWith("**") && part.endsWith("**") && part.length >= 4) {
      return (
        <strong key={index} className="font-bold text-neutral-900 dark:text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }

    // 2. Kurzíva *text*
    if (part.startsWith("*") && part.endsWith("*") && part.length >= 2) {
      return (
        <em key={index} className="italic text-neutral-800 dark:text-neutral-200">
          {part.slice(1, -1)}
        </em>
      );
    }

    // 3. Inline kód `kód`
    if (part.startsWith("`") && part.endsWith("`") && part.length >= 2) {
      return (
        <code
          key={index}
          className="font-mono text-xs px-1.5 py-0.5 rounded-xs bg-neutral-100 dark:bg-neutral-800 text-fel-blue dark:text-fel-cyan border border-neutral-200 dark:border-neutral-700"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    // Běžný text
    return part;
  });
}
