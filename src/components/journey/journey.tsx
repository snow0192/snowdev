"use client";

import { useEffect, useRef } from "react";

import { gsap } from "@/lib/gsap";
import { useLanguage } from "@/i18n";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function Journey() {
  const { dict } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    if (!section) return;

    const context = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll("[data-journey-line]"),
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          stagger: 0.12,
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            end: "bottom 60%",
            scrub: 0.4,
          },
        },
      );

      section.querySelectorAll("[data-journey-dot]").forEach((dot) => {
        gsap.fromTo(
          dot,
          { scale: 0, autoAlpha: 0 },
          {
            scale: 1,
            autoAlpha: 1,
            duration: 0.5,
            ease: "back.out(2.5)",
            scrollTrigger: {
              trigger: dot,
              start: "top 82%",
            },
          },
        );
      });
    }, section);

    return () => context.revert();
  }, [reduced]);

  return (
    <section id="journey" ref={sectionRef} className="border-t border-[var(--color-line)]">
      <div className="container-page py-28 sm:py-36">
        <SectionHeading eyebrow={dict.journey.eyebrow} title={dict.journey.title} />

        <div className="mt-16 max-w-3xl">
          {dict.journey.steps.map((step, index) => {
            const last = index === dict.journey.steps.length - 1;
            return (
              <div key={step.title} className="relative flex gap-7 pb-12 last:pb-0">
                <div className="flex flex-col items-center">
                  <span
                    data-journey-dot
                    className="relative z-10 mt-1.5 h-2 w-2 shrink-0 rounded-full bg-white"
                  />
                  {!last && (
                    <span
                      data-journey-line
                      className="mt-2 w-px flex-1 origin-top bg-gradient-to-b from-[var(--color-line-strong)] to-transparent"
                    />
                  )}
                </div>
                <Reveal y={26} delay={index * 0.05}>
                  <div className="pb-2">
                    <span className="font-mono text-[11px] text-faint">
                      0{index + 1}
                    </span>
                    <h3 className="mt-2 font-display text-xl font-medium text-white sm:text-2xl">
                      {step.title}
                    </h3>
                    <p className="mt-2.5 max-w-lg text-sm leading-relaxed text-muted">
                      {step.text}
                    </p>
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}