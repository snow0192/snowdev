"use client";

import { useLanguage } from "@/i18n";
import { siteConfig } from "@/data/site";
import { Reveal } from "@/components/ui/reveal";
import { ArrowLink } from "@/components/ui/arrow-link";

const REPOS = [
  { label: "vision-secret", href: siteConfig.visionSecret },
  { label: "http-security-analyzer", href: siteConfig.httpSecurityAnalyzer },
  { label: "complete-discord", href: siteConfig.completeDiscord },
];

export function GitHubStrip() {
  const { dict } = useLanguage();

  return (
    <section className="border-t border-[var(--color-line)]">
      <div className="container-page flex flex-col gap-10 py-24 sm:py-28 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <Reveal y={20}>
            <h2 className="text-section text-[clamp(1.6rem,3vw,2.25rem)]">
              {dict.github.title}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-3 text-sm text-faint">{dict.github.sub}</p>
          </Reveal>
          <Reveal delay={0.12} className="mt-6">
            <div className="flex flex-wrap gap-2">
              {REPOS.map((repo) => (
                <a
                  key={repo.label}
                  href={repo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-[var(--radius-xs)] border border-[var(--color-line)] px-3 py-1.5 font-mono text-[11px] text-muted transition-colors duration-300 hover:border-[var(--color-line-strong)] hover:text-white"
                >
                  {repo.label}
                </a>
              ))}
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.1} y={16}>
          <ArrowLink href={siteConfig.github} label={dict.github.cta} />
        </Reveal>
      </div>
    </section>
  );
}