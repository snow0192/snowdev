"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { en, type Translation } from "./en";
import { pt } from "./pt";
import { es } from "./es";
import { locales, isLocale, type Locale } from "./locale";

export { locales, isLocale };
export type { Locale };

export const translations: Record<Locale, Translation> = { pt, en, es };

type NestedKeyOf<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends string
          ? K
          : `${K}.${NestedKeyOf<T[K]>}`
        : never;
    }[keyof T]
  : never;

export type TranslationKey = NestedKeyOf<Translation>;

function resolveKey(dict: Translation, key: TranslationKey): string {
  let current: unknown = dict;
  for (const part of key.split(".")) {
    if (current && typeof current === "object" && part in current) {
      current = (current as Record<string, unknown>)[part];
    } else {
      return key;
    }
  }
  return typeof current === "string" ? current : key;
}

const STORAGE_KEY = "snow-lang";
const COOKIE_KEY = "snow-lang";

interface LanguageContextValue {
  lang: Locale;
  setLang: (locale: Locale) => void;
  dict: Translation;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

interface LanguageProviderProps {
  children: ReactNode;
  initialLang: Locale;
}

export function LanguageProvider({
  children,
  initialLang,
}: LanguageProviderProps) {
  const [lang, setLangState] = useState<Locale>(initialLang);

  const setLang = useCallback((locale: Locale) => {
    setLangState(locale);
    try {
      localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      /* storage unavailable */
    }
    document.cookie = `${COOKIE_KEY}=${locale};path=/;max-age=31536000;samesite=lax`;
    document.documentElement.lang = locale;
  }, []);

  const value = useMemo<LanguageContextValue>(() => {
    const dict = translations[lang];
    return {
      lang,
      setLang,
      dict,
      t: (key: TranslationKey) => resolveKey(dict, key),
    };
  }, [lang, setLang]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}