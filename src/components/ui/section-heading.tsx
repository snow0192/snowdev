"use client";

import { Reveal } from "./reveal";
import { Parallax } from "./parallax";
import { SplitWords } from "./split-words";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  accentLast?: boolean;
  className?: string;
  titleClassName?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  accentLast = false,
  className,
  titleClassName,
}: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col gap-5", className)}>
      <Reveal y={16}>
        <p className="eyebrow">{eyebrow}</p>
      </Reveal>
      <Parallax speed={-0.1}>
        <SplitWords
          text={title}
          as="h2"
          accentLast={accentLast}
          className={cn("text-section text-[clamp(2rem,4.5vw,3.25rem)]", titleClassName)}
        />
      </Parallax>
    </div>
  );
}