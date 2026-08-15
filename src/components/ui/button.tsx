"use client";

import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "outline";

interface ButtonProps extends ComponentPropsWithoutRef<"a"> {
  variant?: ButtonVariant;
}

export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <a
      {...props}
      className={cn(
        "group inline-flex items-center justify-center gap-2.5 rounded-[var(--radius-xs)] px-6 py-3.5 text-sm font-medium transition-colors duration-300 select-none",
        variant === "primary" &&
          "bg-white text-black hover:bg-white/85 focus-visible:outline-white",
        variant === "outline" &&
          "border border-[var(--color-line-strong)] text-white hover:border-white/60 hover:bg-white/[0.04]",
        className,
      )}
    >
      {children}
    </a>
  );
}