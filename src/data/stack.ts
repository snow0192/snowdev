import type { TranslationKey } from "@/i18n";

export interface StackCategoryData {
  labelKey: TranslationKey;
  items: string[];
}

export const stackCategories: StackCategoryData[] = [
  {
    labelKey: "stack.categories.languages",
    items: ["TypeScript", "JavaScript", "Python", "HTML", "CSS"],
  },
  {
    labelKey: "stack.categories.frontend",
    items: ["React", "Next.js", "Tailwind CSS"],
  },
  {
    labelKey: "stack.categories.backend",
    items: ["Node.js", "Express", "Supabase", "PostgreSQL", "MongoDB", "REST APIs", "Auth"],
  },
  {
    labelKey: "stack.categories.cloud",
    items: ["AWS", "Cloudflare", "Vercel", "Docker", "Linux"],
  },
  {
    labelKey: "stack.categories.tools",
    items: ["Git", "GitHub", "VS Code", "Figma"],
  },
];