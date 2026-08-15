"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";

import { gsap } from "@/lib/gsap";
import { useLanguage } from "@/i18n";
import { useFinePointer } from "@/lib/use-fine-pointer";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { siteConfig } from "@/data/site";
import { Reveal } from "@/components/ui/reveal";
import { Magnetic } from "@/components/ui/magnetic";
import { Button } from "@/components/ui/button";

const HUB = { x: 240, y: 210 };
const SATELLITES = [
  { x: 120, y: 88 },
  { x: 372, y: 70 },
  { x: 436, y: 190 },
  { x: 368, y: 330 },
  { x: 132, y: 350 },
  { x: 62, y: 208 },
  { x: 238, y: 56 },
  { x: 470, y: 272 },
  { x: 24, y: 84 },
];

const GOATREALM_TECH = [
  "TypeScript",
  "Next.js",
  "React",
  "Node.js",
  "Supabase",
  "Cloudflare",
  "Docker",
  "Cloud Infrastructure",
];

function NetworkGraph() {
  const svgRef = useRef<SVGSVGElement>(null);
  const groupRef = useRef<SVGGElement>(null);
  const fine = useFinePointer();
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const svg = svgRef.current;
    const group = groupRef.current;
    if (!svg || !group) return;

    const context = gsap.context(() => {
      const lines = svg.querySelectorAll<SVGLineElement>("[data-line]");
      const nodes = svg.querySelectorAll<SVGCircleElement>("[data-node]");

      gsap.fromTo(
        lines,
        { strokeDashoffset: (index) => (lines[index]?.getTotalLength() ?? 300) },
        {
          strokeDashoffset: 0,
          duration: 1.4,
          ease: "power2.inOut",
          stagger: 0.07,
          scrollTrigger: { trigger: svg, start: "top 80%", once: true },
        },
      );
      gsap.fromTo(
        nodes,
        { scale: 0, transformOrigin: "center" },
        {
          scale: 1,
          duration: 0.5,
          ease: "back.out(2)",
          stagger: 0.08,
          delay: 0.5,
          scrollTrigger: { trigger: svg, start: "top 80%", once: true },
        },
      );
      gsap.to(group, {
        y: 10,
        duration: 3.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    });

    return () => context.revert();
  }, []);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || !fine || reduced) return;

    const xTo = gsap.quickTo(svg, "rotationY", { duration: 0.8, ease: "power3.out" });
    const yTo = gsap.quickTo(svg, "rotationX", { duration: 0.8, ease: "power3.out" });

    const onMove = (event: MouseEvent) => {
      const rect = svg.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      xTo(px * 14);
      yTo(py * -10);
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    svg.addEventListener("mousemove", onMove);
    svg.addEventListener("mouseleave", onLeave);
    return () => {
      svg.removeEventListener("mousemove", onMove);
      svg.removeEventListener("mouseleave", onLeave);
    };
  }, [fine, reduced]);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 480 420"
      className="h-auto w-full [transform-style:preserve-3d]"
      aria-hidden
    >
      <g
        ref={groupRef}
        className="[transform-style:preserve-3d]"
      >
        <circle cx={HUB.x} cy={HUB.y} r={150} fill="none" stroke="white" strokeOpacity={0.04} strokeDasharray="2 8" />
        <circle cx={HUB.x} cy={HUB.y} r={100} fill="none" stroke="white" strokeOpacity={0.05} strokeDasharray="1 6" />
        {SATELLITES.map((point, index) => (
          <g key={index}>
            <line
              data-line
              x1={HUB.x}
              y1={HUB.y}
              x2={point.x}
              y2={point.y}
              stroke="white"
              strokeOpacity={0.22}
              strokeWidth={1}
              strokeDasharray={400}
            />
            <circle
              data-node
              cx={point.x}
              cy={point.y}
              r={3.5}
              fill="white"
              fillOpacity={0.65}
            />
          </g>
        ))}
        <circle cx={HUB.x} cy={HUB.y} r={24} fill="none" stroke="white" strokeOpacity={0.35} strokeWidth={1} />
        <circle cx={HUB.x} cy={HUB.y} r={7} fill="white" />
        <circle cx={HUB.x} cy={HUB.y} r={7} fill="none" stroke="white" strokeOpacity={0.5}>
          <animate
            attributeName="r"
            values="7;26"
            dur="2.8s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-opacity"
            values="0.5;0"
            dur="2.8s"
            repeatCount="indefinite"
          />
        </circle>
      </g>
    </svg>
  );
}

export function GoatRealm() {
  const { dict } = useLanguage();

  return (
    <section id="goatrealm" className="relative overflow-hidden border-y border-[var(--color-line)] bg-surface">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          background:
            "radial-gradient(60% 60% at 70% 40%, rgb(255 255 255 / 0.8), transparent 70%)",
        }}
      />
      <div className="container-page relative py-28 sm:py-36">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal y={16}>
              <p className="eyebrow">{dict.goatrealm.eyebrow}</p>
            </Reveal>
            <div className="mt-6">
              <Reveal delay={0.05}>
                <h2 className="text-section text-[clamp(2.4rem,5.5vw,4.25rem)]">
                  {dict.goatrealm.title}
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.12}>
              <p className="mt-7 max-w-xl text-base leading-relaxed text-muted">
                {dict.goatrealm.description}
              </p>
            </Reveal>

            <div className="mt-12">
              <Reveal y={14}>
                <p className="eyebrow">{dict.goatrealm.areasLabel}</p>
              </Reveal>
              <ul className="mt-4 grid gap-x-10 gap-y-2 sm:grid-cols-2">
                {dict.goatrealm.areas.map((area, index) => (
                  <li key={area}>
                    <Reveal delay={index * 0.05} y={12}>
                      <span className="group flex items-center gap-3 border-b border-[var(--color-line)] py-2.5 text-sm text-white transition-colors duration-300 hover:border-[var(--color-line-strong)]">
                        <span className="font-mono text-[11px] text-faint">
                          0{index + 1}
                        </span>
                        <span className="transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-1">
                          {area}
                        </span>
                      </span>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-12">
              <Reveal y={14}>
                <p className="eyebrow">{dict.goatrealm.techLabel}</p>
              </Reveal>
              <div className="mt-4 flex flex-wrap gap-2">
                {GOATREALM_TECH.map((tech, index) => (
                  <Reveal key={tech} delay={index * 0.04} y={10}>
                    <span className="inline-block cursor-default rounded-[var(--radius-xs)] border border-[var(--color-line)] px-3 py-1.5 font-mono text-[11px] text-muted transition-colors duration-300 hover:border-[var(--color-line-strong)] hover:text-white">
                      {tech}
                    </span>
                  </Reveal>
                ))}
              </div>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-6">
              <Magnetic>
                <Button href={siteConfig.goatrealm} className="px-8 py-4">
                  {dict.goatrealm.cta}
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Button>
              </Magnetic>
              <Reveal delay={0.1}>
                <span className="font-mono text-[11px] text-faint">
                  {dict.goatrealm.note}
                </span>
              </Reveal>
            </div>
          </div>

          <Reveal y={40} delay={0.15} className="hidden sm:block lg:pl-4">
            <div className="border border-[var(--color-line)] bg-ink/60 p-8 sm:p-10">
              <div className="mb-6 flex items-center justify-between">
                <span className="font-mono text-[11px] tracking-[0.2em] text-faint uppercase">
                  goatrealm.network
                </span>
                <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-white" />
              </div>
              <NetworkGraph />
              <div className="mt-6 flex items-center justify-between border-t border-[var(--color-line)] pt-4">
                <span className="font-mono text-[11px] text-faint">
                  nodes: {SATELLITES.length + 1}
                </span>
                <span className="font-mono text-[11px] text-faint">
                  status: building
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}