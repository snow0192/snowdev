"use client";

import { useLayoutEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

import { gsap } from "@/lib/gsap";
import { useLanguage } from "@/i18n";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { siteConfig } from "@/data/site";
import { HeroScene } from "@/components/three/hero-scene";
import { SplitWords } from "@/components/ui/split-words";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { ArrowLink } from "@/components/ui/arrow-link";

export function Hero() {
  const { dict } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    if (!section) return;

    const context = gsap.context(() => {
      gsap.set(section.querySelectorAll("[data-hero-el]"), {
        autoAlpha: 0,
        y: 26,
      });
      gsap.set("[data-hero-canvas]", { autoAlpha: 0 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to("[data-hero-canvas]", { autoAlpha: 1, duration: 2.2 }, 0.1)
        .to("[data-hero-status]", { autoAlpha: 1, y: 0, duration: 0.8 }, 0.55)
        .to(
          "[data-hero-title] [data-word]",
          { yPercent: 0, duration: 1.15, stagger: 0.055, ease: "power4.out" },
          0.7,
        )
        .to("[data-hero-sub]", { autoAlpha: 1, y: 0, duration: 0.9 }, 1.15)
        .to("[data-hero-cta]", { autoAlpha: 1, y: 0, duration: 0.9 }, 1.35)
        .to("[data-hero-links]", { autoAlpha: 1, y: 0, duration: 0.9 }, 1.5)
        .to("[data-hero-meta]", { autoAlpha: 1, y: 0, duration: 0.8 }, 1.7);

      gsap.to("[data-hero-canvas]", {
        yPercent: 16,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to("[data-hero-content]", {
        yPercent: -14,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "80% top",
          scrub: true,
        },
      });

      gsap.to("[data-hero-foot]", {
        autoAlpha: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "30% top",
          scrub: true,
        },
      });
    }, section);

    return () => context.revert();
  }, [reduced]);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex min-h-svh flex-col overflow-hidden"
    >
      <HeroScene />

      <div data-hero-content className="container-page relative z-10 flex flex-1 flex-col justify-center pt-32 pb-16 sm:pt-36">
        <div data-hero-el data-hero-status className="mb-8 flex items-center gap-3">
          <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-white" />
          <p className="eyebrow !text-muted">{dict.hero.status}</p>
        </div>

        <h1
          data-hero-title
          className="text-display max-w-[14ch] text-[clamp(2.55rem,7vw,5.6rem)]"
        >
          <SplitWords text={dict.hero.title} accentLast mode="manual" as="span" />
        </h1>

        <p
          data-hero-el
          data-hero-sub
          className="mt-8 max-w-xl text-[15px] leading-relaxed text-muted sm:text-lg"
        >
          {dict.hero.subtitle}
        </p>

        <div data-hero-el data-hero-cta className="mt-11 flex flex-wrap items-center gap-4">
          <Magnetic>
            <Button href="#contact">
              {dict.hero.ctaPrimary}
              <ArrowRight
                size={16}
                className="transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-1"
              />
            </Button>
          </Magnetic>
          <Magnetic>
            <Button href="#projects" variant="outline">
              {dict.hero.ctaSecondary}
            </Button>
          </Magnetic>
        </div>

        <div
          data-hero-el
          data-hero-links
          className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-3"
        >
          <ArrowLink href={siteConfig.github} label="GitHub" />
          <ArrowLink href={siteConfig.goatrealm} label="GoatRealm" />
        </div>
      </div>

      <div data-hero-foot className="container-page relative z-10 flex items-end justify-between pb-8">
        <a
          href="#about"
          data-hero-el
          data-hero-meta
          className="group flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] text-faint uppercase transition-colors duration-300 hover:text-muted"
        >
          <span className="scroll-line h-9 w-px bg-white/40" />
          {dict.hero.scroll}
        </a>
        <span
          data-hero-el
          data-hero-meta
          className="hidden font-mono text-[11px] text-faint sm:block"
        >
          {dict.hero.metaLine}
        </span>
      </div>
    </section>
  );
}