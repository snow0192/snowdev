"use client";

import { ArrowUpRight } from "lucide-react";

import { useLanguage } from "@/i18n";
import { siteConfig } from "@/data/site";
import { Reveal } from "@/components/ui/reveal";
import { Magnetic } from "@/components/ui/magnetic";
import { Button } from "@/components/ui/button";
import { ArrowLink } from "@/components/ui/arrow-link";
import { ContactForm } from "./contact-form";

export function Contact() {
  const { dict } = useLanguage();

  const mailHref = `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(
    "Let's build something",
  )}`;

  return (
    <section id="contact" className="border-t border-[var(--color-line)]">
      <div className="container-page py-28 sm:py-36">
        <div className="flex flex-col items-center text-center">
          <Reveal y={16}>
            <p className="eyebrow">{dict.contact.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.06} className="mt-7 w-full">
            <h2 className="text-section mx-auto max-w-5xl text-[clamp(2.4rem,6vw,4.75rem)]">
              {dict.contact.title}
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-6 text-base text-muted sm:text-lg">
              {dict.contact.sub}
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-12">
          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="h-full">
              <p className="eyebrow">{dict.contact.formTitle}</p>
              <p className="mt-3 mb-6 max-w-md text-sm leading-relaxed text-faint">
                {dict.contact.formSub}
              </p>
              <ContactForm />
            </div>
          </Reveal>

          <Reveal delay={0.18} className="lg:col-span-5">
            <div className="flex h-full flex-col justify-center gap-8 lg:pl-8">
              <div className="flex items-center gap-3">
                <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-white" />
                <p className="font-mono text-[11px] tracking-[0.22em] text-faint uppercase">
                  {dict.hero.status}
                </p>
              </div>
              <div>
                <h3 className="font-display text-2xl font-medium text-white sm:text-3xl">
                  {dict.contact.cta}
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
                  {dict.contact.directSub}
                </p>
              </div>
              <Magnetic>
                <Button href={mailHref} className="px-8 py-4 text-base">
                  {dict.contact.cta}
                  <ArrowUpRight
                    size={17}
                    className="transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Button>
              </Magnetic>
              <div className="flex flex-wrap items-center gap-x-9 gap-y-3">
                <ArrowLink href={siteConfig.github} label={dict.contact.githubLabel} />
                <ArrowLink href={siteConfig.goatrealm} label={dict.contact.goatrealmLabel} />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}