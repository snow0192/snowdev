"use client";

import { useEffect, useRef } from "react";

import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const element = ref.current;
    if (!element) return;

    const context = gsap.context(() => {
      gsap.to(element, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          start: 0,
          end: "max",
          scrub: 0.3,
        },
      });
    });

    return () => context.revert();
  }, [reduced]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left scale-x-0 bg-white"
    />
  );
}