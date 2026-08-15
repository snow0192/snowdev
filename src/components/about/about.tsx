"use client";

import { useLanguage } from "@/i18n";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function About() {
  const { dict } = useLanguage();

  return (
    <section id="about" className="border-t border-[var(--color-line)]">
      <div className="container-page py-28 sm:py-36">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow={dict.about.eyebrow}
              title={dict.about.title}
              accentLast
            />
          </div>

          <div className="lg:col-span-7 lg:pl-10">
            <Reveal>
              <p className="max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
                {dict.about.body}
              </p>
            </Reveal>

            <div className="mt-16">
              <Reveal y={16}>
                <p className="eyebrow">{dict.about.philosophyLabel}</p>
              </Reveal>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {dict.about.philosophy.map((step, index) => (
                  <Reveal key={step} delay={index * 0.07} y={14}>
                    <span className="inline-block cursor-default rounded-[var(--radius-xs)] border border-[var(--color-line)] px-4 py-2 font-display text-sm text-white transition-colors duration-300 hover:border-[var(--color-line-strong)] hover:bg-white/[0.04]">
                      {step}
                    </span>
                  </Reveal>
                ))}
              </div>
            </div>

            <div className="mt-16">
              <Reveal y={16}>
                <p className="eyebrow">{dict.about.exploringLabel}</p>
              </Reveal>
              <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {dict.about.exploring.map((item, index) => (
                  <li key={item}>
                    <Reveal delay={index * 0.05} y={12}>
                      <span className="flex items-center gap-3 text-sm text-muted">
                        <span className="h-1 w-1 shrink-0 rounded-full bg-white/40" />
                        {item}
                      </span>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}