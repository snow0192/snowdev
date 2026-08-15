"use client";

import { useCallback, useLayoutEffect, useRef } from "react";

import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

type SplitTag = "h1" | "h2" | "h3" | "p" | "span";

interface SplitWordsProps {
  text: string;
  className?: string;
  accentLast?: boolean;
  mode?: "scroll" | "manual";
  as?: SplitTag;
  id?: string;
}

export function SplitWords({
  text,
  className,
  accentLast = false,
  mode = "scroll",
  as: Tag = "span",
  id,
}: SplitWordsProps) {
  const reduced = usePrefersReducedMotion();
  const elementRef = useRef<HTMLElement | null>(null);

  const setRef = useCallback(
    (node: HTMLHeadingElement | HTMLParagraphElement | HTMLSpanElement | null) => {
      elementRef.current = node;
    },
    [],
  );

  useLayoutEffect(() => {
    if (reduced) return;
    const element = elementRef.current;
    if (!element) return;

    const words = element.querySelectorAll<HTMLElement>("[data-word]");
    if (!words.length) return;

    const context = gsap.context(() => {
      if (mode === "manual") {
        gsap.set(words, { yPercent: 120 });
        return;
      }

      gsap.fromTo(
        words,
        { yPercent: 120 },
        {
          yPercent: 0,
          duration: 0.9,
          ease: "power4.out",
          stagger: 0.045,
          scrollTrigger: {
            trigger: element,
            start: "top 88%",
            once: true,
          },
        },
      );
    });

    return () => context.revert();
  }, [reduced, text, mode]);

  const words = text.split(" ");

  return (
    <Tag ref={setRef} id={id} className={cn("flex flex-wrap", className)}>
      {words.map((word, index) => {
        const isAccent = accentLast && index === words.length - 1;
        return (
          <span key={index} className="overflow-hidden pb-[0.14em] -mb-[0.14em]">
            <span
              data-word
              className={cn(
                "inline-block will-change-transform",
                isAccent && "text-outline",
              )}
            >
              {word}
              {index < words.length - 1 ? "\u00A0" : ""}
            </span>
          </span>
        );
      })}
    </Tag>
  );
}