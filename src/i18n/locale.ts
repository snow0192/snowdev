export const locales = ["pt", "en", "es"] as const;

export type Locale = (typeof locales)[number];

export function isLocale(value: string | undefined | null): value is Locale {
  return value === "pt" || value === "es" || value === "en";
}