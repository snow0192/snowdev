import type { MetadataRoute } from "next";

import { siteConfig } from "@/data/site";

const BASE_URL = "https://snowdev-github-io.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: `${BASE_URL}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1.0,
    },
  ];
}
