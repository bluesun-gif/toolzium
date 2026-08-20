import { ToolsData } from "@/data/tools";
import { env } from "@/lib/env";
import type { MetadataRoute } from "next";

const site = env.app.siteUrl;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/tools",
    "/about",
    "/privacy",
    "/terms",
    "/sponsor",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: new URL(route, site).toString(),
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.6,
  }));

  const categoryEntries: MetadataRoute.Sitemap = ToolsData.filter(
    (section) => section.url && section.url !== "/tools" && !staticRoutes.includes(section.url)
  ).map((section) => ({
    url: new URL(section.url, site).toString(),
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.85,
  }));

  const toolEntries: MetadataRoute.Sitemap = ToolsData.flatMap((section) =>
    section.items
      .filter((item) => !staticRoutes.includes(item.url) && item.url !== section.url)
      .map((item) => ({
        url: new URL(item.url, site).toString(),
        lastModified: new Date(),
        changeFrequency: "daily" as const,
        priority: item.popular ? 0.9 : 0.7,
      }))
  );

  return [...staticEntries, ...categoryEntries, ...toolEntries];
}
