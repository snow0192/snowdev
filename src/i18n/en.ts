export const en = {
  meta: {
    title: "Snow — Full Stack Developer & Cloud",
    description:
      "Snow is a Full Stack Developer focused on modern software, cloud infrastructure, developer tools and scalable systems.",
  },
  nav: {
    about: "About",
    stack: "Stack",
    projects: "Projects",
    goatrealm: "GoatRealm",
    contact: "Contact",
    menu: "Menu",
    close: "Close",
  },
  hero: {
    status: "Building things that matter",
    title: "I build software that goes beyond the interface.",
    subtitle:
      "Full Stack developer focused on cloud infrastructure, developer tools, automation and modern software systems. I take ideas from concept to code, deployment and a real product.",
    ctaPrimary: "Let's talk",
    ctaSecondary: "View projects",
    scroll: "Scroll",
    metaLine: 'const snow = { focus: ["Full-Stack", "Cloud", "DevTools"] }',
  },
  about: {
    eyebrow: "01 — About",
    title: "I build things that actually exist.",
    body: "I'm a developer focused on building modern applications, developer tools, automation and cloud-based systems. I enjoy taking an idea from concept to code, deployment and eventually a real product — constantly experimenting with new technologies, architectures and ideas.",
    philosophyLabel: "Philosophy",
    philosophy: ["Build.", "Break.", "Learn.", "Improve.", "Ship."],
    exploringLabel: "Currently exploring",
    exploring: [
      "Cloud infrastructure & AWS",
      "System design & backend architecture",
      "API design & scalable applications",
      "AI developer tools",
      "Cybersecurity & infrastructure",
      "Open source & developer experience",
    ],
  },
  stack: {
    eyebrow: "02 — Stack",
    title: "Tools I build with.",
    sub: "The technologies I use to design, build and ship software end to end.",
    categories: {
      languages: "Languages",
      frontend: "Frontend",
      backend: "Backend & APIs",
      cloud: "Cloud & Infrastructure",
      tools: "Tools & Environment",
    },
  },
  goatrealm: {
    eyebrow: "03 — Ecosystem",
    title: "Building GoatRealm.",
    description:
      "GoatRealm is a technology ecosystem I'm building around software, applications, SaaS, automation, developer tools and cloud infrastructure — products that live beyond a single repository.",
    areasLabel: "What lives inside",
    areas: [
      "Applications",
      "SaaS",
      "Automation",
      "Developer Tools",
      "Cloud",
      "Infrastructure",
    ],
    techLabel: "Built with",
    note: "Where the larger projects live",
    cta: "Explore GoatRealm",
  },
  projects: {
    eyebrow: "04 — Selected Projects",
    title: "Selected work.",
    sub: "Projects I've designed, built and shipped. Open source, MIT licensed, fully documented.",
    stackLabel: "Stack",
    viewGithub: "View on GitHub",
    vision: {
      name: "Vision Secret",
      category: "Security · Developer Tool",
      description:
        "A privacy-first CLI that scans source code for leaked secrets, credentials and sensitive configuration — built for developers and CI/CD pipelines.",
      features: [
        "Static scanning & entropy analysis",
        "Confidence scoring & false-positive handling",
        "JSON + SARIF 2.1.0 output",
        "GitHub Code Scanning integration",
        ".secretignore & custom config",
        "Zero network requests · No telemetry",
      ],
    },
    http: {
      name: "HTTP Security Analyzer",
      category: "Security · Web Analysis",
      description:
        "A defensive CLI scanner that analyzes the HTTP security configuration of any site you own: headers, HTTPS, TLS, cookies and CORS — with a 0–100 score and CI-ready exit codes.",
      features: [
        "12 security header rule families",
        "TLS, cookies & CORS analysis",
        "0–100 security score",
        "JSON + SARIF 2.1.0 output",
        "Batch scanning & CI gating",
        "260+ tests · Strict TypeScript",
      ],
    },
    discord: {
      name: "Discord Quest Research",
      category: "Research · Reverse Engineering",
      description:
        "Experimental research into the internals of a large JavaScript client: Webpack runtime, module discovery, event-driven architecture and state management.",
      features: [
        "Webpack runtime analysis",
        "Module discovery & internal stores",
        "Event-driven architecture study",
        "Educational & non-affiliated",
      ],
    },
  },
  github: {
    title: "More experiments, code and ideas.",
    sub: "Open source repos, research and things I'm playing with.",
    cta: "Visit GitHub",
  },
  journey: {
    eyebrow: "05 — Journey",
    title: "The road so far.",
    steps: [
      {
        title: "Exploration",
        text: "Started with TypeScript and modern web development — learning by shipping small things.",
      },
      {
        title: "Developer tools",
        text: "Designed and shipped security-focused CLIs with strict TypeScript, tests and CI.",
      },
      {
        title: "GoatRealm",
        text: "Started building an ecosystem around applications, SaaS, automation and cloud infrastructure.",
      },
      {
        title: "Cloud & infrastructure",
        text: "AWS, Cloudflare, Docker, Linux — moving from writing code to operating systems.",
      },
      {
        title: "What's next",
        text: "System design, scalable architectures and AI developer tools.",
      },
    ],
  },
  contact: {
    eyebrow: "06 — Contact",
    title: "Have something worth building?",
    sub: "Let's turn an idea into something real.",
    cta: "Get in touch",
    directSub:
      "Prefer email? Write to me directly — same 48-hour response, zero forms.",
    githubLabel: "GitHub",
    goatrealmLabel: "GoatRealm",
    formTitle: "Or send a project request",
    formSub:
      "Tell me about your project, timeline and goals. I usually reply within 48 hours.",
    name: "Name",
    namePlaceholder: "Your name",
    email: "Email",
    emailPlaceholder: "you@example.com",
    type: "Project type",
    typeOptions: {
      project: "Software project",
      website: "Website / web app",
      automation: "Automation / tool",
      other: "Something else",
    },
    budget: "Budget (optional)",
    budgetOptions: {
      none: "Not sure yet",
      small: "Under $2,000",
      medium: "$2,000 – $10,000",
      large: "$10,000+",
    },
    message: "Message",
    messagePlaceholder: "What are you building? Any details help.",
    submit: "Send request",
    sending: "Sending…",
    successTitle: "Request sent",
    successText:
      "Thanks! Your request arrived in my inbox. I'll get back to you as soon as possible.",
    again: "Send another",
    sendError:
      "Something went wrong. Try again, or email me directly.",
    required: "Required",
    invalidEmail: "Invalid email address",
  },
  bigCta: {
    title: "Building something bigger?",
    text: "For larger products, software projects, infrastructure or business-oriented solutions, visit GoatRealm.",
    cta: "Visit GoatRealm",
  },
  footer: {
    role: "Full Stack Developer · Cloud",
    github: "GitHub",
    goatrealm: "GoatRealm",
    contact: "Contact",
    copyright: "© 2026 Snow. Built with TypeScript.",
    tagline: "Build. Learn. Ship.",
  },
};

export type Translation = typeof en;