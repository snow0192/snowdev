"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { useLanguage } from "@/i18n";
import { LangSwitcher } from "./lang-switcher";

const LINKS = [
  { id: "about", key: "nav.about" },
  { id: "stack", key: "nav.stack" },
  { id: "projects", key: "nav.projects" },
  { id: "goatrealm", key: "nav.goatrealm" },
  { id: "contact", key: "nav.contact" },
] as const;

export function Header() {
  const { dict, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[60] transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled
            ? "border-b border-[var(--color-line)] bg-ink/75 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="container-page flex h-16 items-center justify-between gap-6">
          <a
            href="#top"
            className="group flex items-baseline gap-2"
            aria-label={dict.nav.menu}
          >
            <span className="font-display text-lg font-semibold tracking-tight text-white">
              SNOW
            </span>
            <span className="hidden font-mono text-[11px] text-faint transition-colors duration-300 group-hover:text-muted sm:inline">
              snow0192
            </span>
          </a>

          <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
            {LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="group relative text-[13px] text-muted transition-colors duration-300 hover:text-white"
              >
                <span className="relative">
                  {t(link.key)}
                  <span className="absolute inset-x-0 -bottom-1 h-px scale-x-0 bg-white transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:scale-x-100" />
                </span>
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <LangSwitcher className="hidden sm:flex" />
            <button
              type="button"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? dict.nav.close : dict.nav.menu}
              className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-xs)] border border-[var(--color-line)] text-white transition-colors hover:bg-white/[0.06] md:hidden"
            >
              {open ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-[55] flex flex-col bg-ink/98 backdrop-blur-xl md:hidden"
        >
          <nav
            aria-label="Mobile"
            className="flex flex-1 flex-col justify-center gap-2 px-6"
          >
            {LINKS.map((link, index) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setOpen(false)}
                className="group flex items-baseline gap-4 border-b border-[var(--color-line)] py-5"
              >
                <span className="font-mono text-xs text-faint">
                  0{index + 1}
                </span>
                <span className="text-section text-3xl text-white transition-transform duration-300 group-hover:translate-x-2">
                  {t(link.key)}
                </span>
              </a>
            ))}
          </nav>
          <div className="flex items-center justify-between px-6 pb-10">
            <LangSwitcher />
            <span className="font-mono text-[11px] text-faint">
              snow0192
            </span>
          </div>
        </div>
      )}
    </>
  );
}