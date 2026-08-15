import { siteConfig } from "./site";

export interface PreviewBlock {
  title: string;
  lines: string[];
}

export type ProjectId = "vision" | "http" | "discord";

export interface ProjectData {
  id: ProjectId;
  index: string;
  href: string;
  stack: string[];
  previews: PreviewBlock[];
}

export const projects: ProjectData[] = [
  {
    id: "vision",
    index: "01",
    href: siteConfig.visionSecret,
    stack: ["TypeScript", "Node.js", "Vitest", "GitHub Actions"],
    previews: [
      {
        title: "secret-scanner",
        lines: [
          "$ secret-scanner scan .",
          "──────────────────────────────",
          "Files scanned:   5",
          "Lines analyzed:  30",
          "Duration:        0.04s",
          "",
          "8 potential secrets found.",
        ],
      },
      {
        title: "detection engine",
        lines: [
          "source ─► rule engine",
          "          ├─ pattern matching",
          "          ├─ context analysis",
          "          ├─ entropy analysis",
          "          └─ confidence score",
        ],
      },
    ],
  },
  {
    id: "http",
    index: "02",
    href: siteConfig.httpSecurityAnalyzer,
    stack: ["TypeScript", "Node.js", "Commander", "Vitest"],
    previews: [
      {
        title: "httpsec",
        lines: [
          "$ httpsec goatrealm.com.br",
          "──────────────────────────────",
          "Security Headers   ✓ HSTS ✓ CSP",
          "Cookies            ✓ Secure",
          "TLS                ✓ TLSv1.3",
          "CORS               ✓ Locked down",
          "",
          "Security Score:    85/100",
          "Risk Level:        FAIR",
        ],
      },
      {
        title: "ci gate",
        lines: [
          "$ httpsec https://staging.app --quiet --threshold HIGH",
          "exit code: 1 — findings above threshold",
          "",
          "# gating deploys with exit codes",
        ],
      },
    ],
  },
  {
    id: "discord",
    index: "03",
    href: siteConfig.completeDiscord,
    stack: ["JavaScript", "Webpack", "Research"],
    previews: [
      {
        title: "quest-research",
        lines: [
          "webpackChunkDiscord_app",
          "  └─ module discovery",
          "       ├─ QuestsStore",
          "       ├─ FluxDispatcher",
          "       └─ progress system",
          "",
          "understand · document · expect change",
        ],
      },
    ],
  },
];