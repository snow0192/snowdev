import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { cookies, headers } from "next/headers";

import { isLocale, type Locale } from "@/i18n/locale";
import { LanguageProvider } from "@/i18n";
import { siteConfig } from "@/data/site";
import { en } from "@/i18n/en";
import { Header } from "@/components/navigation/header";
import { Footer } from "@/components/footer/footer";
import { CursorGlow } from "@/components/ui/cursor-glow";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default: en.meta.title,
    template: `%s — ${siteConfig.name}`,
  },

  description: en.meta.description,

  keywords: [
    "Snow",
    "snow0192",
    "Full Stack Developer",
    "Cloud Infrastructure",
    "Developer Tools",
    "TypeScript",
    "GoatRealm",
    "Security",
    "Automation",
  ],

  authors: [{ name: "Snow", url: siteConfig.github }],
  creator: "Snow",

  // Google Search Console verification
  verification: {
    google: "rF_hMEBfO_0hQtIHQJx1K2jFvBEhgUEMUwvk3uHQ-fI",
  },

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: en.meta.title,
    description: en.meta.description,
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: en.meta.title,
    description: en.meta.description,
    images: ["/opengraph-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/icon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#070707",
};

const LANGUAGE_SCRIPT = `(function(){try{var l;var m=document.cookie.match(/(?:^|;\\s*)snow-lang=([a-z]{2})/);var s;try{s=localStorage.getItem('snow-lang')}catch(e){}l=m?m[1]:(s||(navigator.language||'en').toLowerCase().slice(0,2));if(l!=='pt'&&l!=='es'&&l!=='en')l='en';document.documentElement.lang=l;try{document.cookie='snow-lang='+l+';path=/;max-age=31536000;samesite=lax'}catch(e){}}catch(e){}})();`;

function detectLocale(
  cookieValue: string | undefined,
  acceptLanguage: string | null,
): Locale {
  if (isLocale(cookieValue)) return cookieValue;

  if (acceptLanguage) {
    const accepted = acceptLanguage.toLowerCase();

    if (accepted.includes("pt")) return "pt";
    if (accepted.includes("es")) return "es";
  }

  return "en";
}

export default async function RootLayout({
  children,
}: LayoutProps<"/">) {
  const cookieStore = await cookies();
  const headerStore = await headers();

  const initialLang = detectLocale(
    cookieStore.get("snow-lang")?.value,
    headerStore.get("accept-language"),
  );

  return (
    <html
      lang={initialLang}
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: LANGUAGE_SCRIPT,
          }}
        />
      </head>

      <body className="grain min-h-svh">
        <a
          href="#main"
          className="sr-only z-[80] rounded-[var(--radius-xs)] bg-white px-4 py-2 text-sm font-medium text-black focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Skip to content
        </a>

        <LanguageProvider initialLang={initialLang}>
          <ScrollProgress />
          <CursorGlow />
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
