import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

interface ArrowLinkProps {
  href: string;
  label: string;
  className?: string;
  external?: boolean;
}

export function ArrowLink({
  href,
  label,
  className,
  external = true,
}: ArrowLinkProps) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(
        "group inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors duration-300 hover:text-white",
        className,
      )}
    >
      <span className="relative">
        {label}
        <span className="absolute inset-x-0 -bottom-1 h-px scale-x-0 bg-white transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:scale-x-100" />
      </span>
      <ArrowUpRight
        size={15}
        className="transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </a>
  );
}