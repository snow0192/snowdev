"use client";

import type { MouseEvent } from "react";

import { useLanguage } from "@/i18n";
import { projects, type ProjectData } from "@/data/projects";
import { siteConfig } from "@/data/site";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { ArrowLink } from "@/components/ui/arrow-link";
import { ArrowUpRight } from "lucide-react";

function onRowMove(event: MouseEvent<HTMLElement>) {
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty(
    "--mx",
    `${event.clientX - rect.left}px`,
  );
  event.currentTarget.style.setProperty(
    "--my",
    `${event.clientY - rect.top}px`,
  );
}

function ProjectPreview({ block }: { block: ProjectData["previews"][number] }) {
  return (
    <div className="overflow-hidden rounded-[var(--radius-sm)] border border-[var(--color-line)] bg-ink/70 transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-1.5 group-hover:border-[var(--color-line-strong)] group-hover:shadow-[0_24px_60px_-32px_rgb(255_255_255/0.18)]">
      <div className="flex items-center gap-1.5 border-b border-[var(--color-line)] px-4 py-2.5">
        <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
        <span className="ml-3 font-mono text-[10px] tracking-wide text-faint">
          {block.title}
        </span>
      </div>
      <pre className="overflow-x-auto px-4 py-4 font-mono text-[11px] leading-relaxed text-faint">
        {block.lines.join("\n")}
      </pre>
    </div>
  );
}

export function Projects() {
  const { dict } = useLanguage();

  return (
    <section id="projects" className="border-t border-[var(--color-line)]">
      <div className="container-page pt-28 pb-4 sm:pt-36">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow={dict.projects.eyebrow}
            title={dict.projects.title}
            accentLast
          />
          <Reveal delay={0.1} y={16} className="sm:pb-2">
            <ArrowLink href={siteConfig.github} label="GitHub" />
          </Reveal>
        </div>
        <Reveal delay={0.15} className="mt-6">
          <p className="max-w-md text-sm leading-relaxed text-faint">
            {dict.projects.sub}
          </p>
        </Reveal>
      </div>

      {projects.map((project, rowIndex) => {
        const meta = dict.projects[project.id];
        return (
          <article
            key={project.id}
            onMouseMove={onRowMove}
            className="group relative overflow-hidden border-t border-[var(--color-line)] transition-colors duration-500 hover:bg-white/[0.02]"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(520px circle at var(--mx, 50%) var(--my, 50%), rgb(255 255 255 / 0.045), transparent 65%)",
              }}
            />
            <div className="container-page relative grid gap-10 py-14 sm:py-16 lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-1">
                <Reveal delay={rowIndex * 0.05} y={16}>
                  <span className="font-mono text-sm text-faint">
                    {project.index}
                  </span>
                </Reveal>
              </div>

              <div className="lg:col-span-7">
                <Reveal delay={rowIndex * 0.08} y={24}>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-section text-[clamp(1.5rem,3vw,2.1rem)] text-white transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1">
                      {meta.name}
                    </h3>
                    <span className="rounded-[var(--radius-xs)] border border-[var(--color-line)] px-2.5 py-1 font-mono text-[10px] tracking-wide text-faint uppercase">
                      {meta.category}
                    </span>
                  </div>
                  <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted sm:text-[15px]">
                    {meta.description}
                  </p>
                </Reveal>

                <Reveal delay={rowIndex * 0.12} y={20}>
                  <ul className="mt-8 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                    {meta.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2.5 text-[13px] text-muted"
                      >
                        <span className="mt-[7px] h-px w-3.5 shrink-0 bg-white/30" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </Reveal>

                <Reveal delay={rowIndex * 0.16} y={16}>
                  <div className="mt-8 flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[10px] tracking-[0.18em] text-faint uppercase">
                      {dict.projects.stackLabel}:
                    </span>
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-[var(--radius-xs)] border border-[var(--color-line)] px-2 py-1 font-mono text-[10px] text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="mt-7">
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link inline-flex items-center gap-2 text-sm font-medium text-white"
                    >
                      {dict.projects.viewGithub}
                      <ArrowUpRight
                        size={15}
                        className="transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                      />
                    </a>
                  </div>
                </Reveal>
              </div>

              <div className="hidden flex-col gap-4 lg:col-span-4 lg:flex">
                <Reveal delay={rowIndex * 0.2} y={30}>
                  <div className="flex flex-col gap-4">
                    {project.previews.map((block) => (
                      <ProjectPreview key={block.title} block={block} />
                    ))}
                  </div>
                </Reveal>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}