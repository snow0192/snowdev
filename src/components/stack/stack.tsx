"use client";

import { useLanguage } from "@/i18n";
import { stackCategories } from "@/data/stack";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function Stack() {
  const { dict, t } = useLanguage();

  return (
    <section id="stack" className="border-t border-[var(--color-line)]">
      <div className="container-page py-28 sm:py-36">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading eyebrow={dict.stack.eyebrow} title={dict.stack.title} />
          <Reveal delay={0.1} y={16} className="sm:pb-2">
            <p className="max-w-xs text-sm leading-relaxed text-faint">
              {dict.stack.sub}
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-x-12 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {stackCategories.map((category, index) => (
            <div key={category.labelKey}>
              <Reveal y={16} delay={index * 0.04}>
                <div className="flex items-center justify-between">
                  <p className="eyebrow">{t(category.labelKey)}</p>
                  <span className="font-mono text-[11px] text-faint">
                    0{index + 1}
                  </span>
                </div>
              </Reveal>
              <ul className="mt-4">
                {category.items.map((item, itemIndex) => (
                  <li key={item}>
                    <Reveal delay={itemIndex * 0.04} y={12}>
                      <span className="group relative flex cursor-default items-center justify-between overflow-hidden border-b border-[var(--color-line)] py-3 text-sm text-muted transition-colors duration-300 hover:border-[var(--color-line-strong)] hover:text-white after:absolute after:inset-0 after:-translate-x-full after:bg-gradient-to-r after:from-transparent after:via-white/[0.06] after:to-transparent after:transition-transform after:duration-700 after:ease-out group-hover:after:translate-x-full">
                        <span className="transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-1.5">
                          {item}
                        </span>
                        <span className="font-mono text-[10px] text-faint opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          /
                        </span>
                      </span>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}