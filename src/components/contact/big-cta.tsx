"use client";

import { ArrowUpRight } from "lucide-react";

import { useLanguage } from "@/i18n";
import { siteConfig } from "@/data/site";
import { Reveal } from "@/components/ui/reveal";
import { Parallax } from "@/components/ui/parallax";
import { Magnetic } from "@/components/ui/magnetic";
import { Button } from "@/components/ui/button";

export function BigCta() {
  const { dict } = useLanguage();

  return (
    <section className="relative overflow-hidden border-t border-[var(--color-line)] bg-surface">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          background:
            "radial-gradient(50% 80% at 50% 0%, rgb(255 255 255 / 0.9), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="grid-lines pointer-events-none absolute -inset-x-40 inset-y-0 opacity-[0.05]"
      />
      <div className="container-page relative flex flex-col items-center py-28 text-center sm:py-36">
        <Parallax speed={-0.06} className="w-full">
          <Reveal y={20}>
            <h2 className="text-section mx-auto max-w-3xl text-[clamp(2rem,4.5vw,3.5rem)]">
              {dict.bigCta.title}
            </h2>
          </Reveal>
        </Parallax>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
            {dict.bigCta.text}
          </p>
        </Reveal>
        <Reveal delay={0.18} className="mt-10">
          <Magnetic>
            <Button href={siteConfig.goatrealm} className="px-8 py-4">
              {dict.bigCta.cta}
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Button>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}