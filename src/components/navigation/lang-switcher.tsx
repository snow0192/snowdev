"use client";

import { useCallback } from "react";

import { locales, useLanguage } from "@/i18n";
import { cn } from "@/lib/utils";

export function LangSwitcher({ className }: { className?: string }) {
  const { lang, setLang } = useLanguage();

  const onSelect = useCallback(
    (locale: (typeof locales)[number]) => {
      setLang(locale);
    },
    [setLang],
  );

  return (
    <div
      role="group"
      aria-label="Language"
      className={cn(
        "flex items-center gap-0.5 rounded-[var(--radius-xs)] border border-[var(--color-line)] p-0.5",
        className,
      )}
    >
      {locales.map((locale) => {
        const active = lang === locale;
        return (
          <button
            key={locale}
            type="button"
            onClick={() => onSelect(locale)}
            aria-pressed={active}
            className={cn(
              "rounded-[2px] px-2 py-1 font-mono text-[11px] tracking-wide uppercase transition-colors duration-200",
              active
                ? "bg-white font-medium text-black"
                : "text-faint hover:text-white",
            )}
          >
            {locale}
          </button>
        );
      })}
    </div>
  );
}