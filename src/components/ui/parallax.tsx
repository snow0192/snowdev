"use client";

import { useEffect, useRef, type ReactNode } from "react";

import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  /** Positive moves the element with the scroll (faster), negative against it. */
  speed?: number;
}

export function Parallax({
  children,
  className,
  speed = -0.12,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const element = ref.current;
    if (!element) return;

    const context = gsap.context(() => {
      gsap.fromTo(
        element,
        { yPercent: speed * 55 },
        {
          yPercent: speed * -55,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        },
      );
    });

    return () => context.revert();
  }, [reduced, speed]);

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}