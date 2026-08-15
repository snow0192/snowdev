"use client";

import { useEffect, useRef } from "react";

import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: string[];
  className?: string;
  duration?: number;
}

export function Marquee({
  items,
  className,
  duration = 30,
}: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const track = trackRef.current;
    if (!track) return;

    const context = gsap.context(() => {
      gsap.to(track, {
        xPercent: -50,
        duration,
        ease: "none",
        repeat: -1,
      });
    });

    return () => context.revert();
  }, [reduced, duration]);

  const row = (
    <div className="flex shrink-0 items-center" aria-hidden>
      {items.map((item) => (
        <span key={item} className="flex items-center">
          <span className="px-7 font-mono text-xs tracking-[0.32em] text-faint uppercase sm:text-sm">
            {item}
          </span>
          <span className="text-xs text-white/25">✦</span>
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={cn(
        "relative overflow-hidden border-y border-[var(--color-line)] py-5 select-none",
        className,
      )}
      aria-hidden
    >
      <div ref={trackRef} className="flex w-max">
        {row}
        {row}
      </div>
    </div>
  );
}