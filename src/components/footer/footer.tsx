"use client";

import { ArrowUp } from "lucide-react";

import { useLanguage } from "@/i18n";
import { siteConfig } from "@/data/site";

export function Footer() {
  const { dict } = useLanguage();

  return (
    <footer className="border-t border-[var(--color-line)]">
      <div className="container-page pb-10 pt-16">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <a href="#top" className="font-display text-xl font-semibold tracking-tight text-white">
              SNOW
            </a>
            <p className="mt-2 font-mono text-[11px] tracking-wide text-faint">
              {dict.footer.role}
            </p>
            <p className="mt-8 font-mono text-[11px] tracking-[0.2em] text-faint uppercase">
              {dict.footer.tagline}
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-3 text-sm">
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted transition-colors duration-300 hover:text-white"
            >
              {dict.footer.github}
            </a>
            <a
              href={siteConfig.goatrealm}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted transition-colors duration-300 hover:text-white"
            >
              {dict.footer.goatrealm}
            </a>
            <a
              href="#contact"
              className="text-muted transition-colors duration-300 hover:text-white"
            >
              {dict.footer.contact}
            </a>
          </nav>

          <a
            href="#top"
            aria-label="Back to top"
            className="group inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-xs)] border border-[var(--color-line)] text-muted transition-all duration-300 hover:border-[var(--color-line-strong)] hover:text-white"
          >
            <ArrowUp
              size={16}
              className="transition-transform duration-300 group-hover:-translate-y-0.5"
            />
          </a>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-[var(--color-line)] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[11px] text-faint">
            {dict.footer.copyright}
          </p>
          <p className="font-mono text-[11px] text-faint">
            @{siteConfig.username}
          </p>
        </div>
      </div>
    </footer>
  );
}