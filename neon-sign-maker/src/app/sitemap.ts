import type { MetadataRoute } from "next";

const SITE = "https://www.chameneon.jp";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: `${SITE}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE}/studio`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];
}
