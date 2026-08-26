import { ToolsData } from "@/data/tools";
import { env } from "@/lib/env";
import { getAllSoftwareSlugs } from "@/lib/data/adapters/alternatives-adapter";
import { getAllPromptSlugs } from "@/lib/data/adapters/prompts-adapter";
import { getGeneratedPages, type GeneratedPageRecord } from "@/lib/storage/expansion-db";
import type { MetadataRoute } from "next";

const site = env.app.siteUrl || "https://www.toolzium.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/tools",
    "/about",
    "/privacy",
    "/terms",
    "/sponsor",
    "/lookup/phone",
    "/lookup/ip",
    "/lookup/whois",
    "/lookup/username",
    "/security/password",
    "/security/breach",
    "/security/email",
    "/security/ssl",
    "/alternatives",
    "/prompts",
    "/tools/analytics/growth",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: new URL(route, site).toString(),
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: route === "" ? 1 : 0.8,
  }));

  // Software Alternatives Entries
  const alternativeEntries: MetadataRoute.Sitemap = getAllSoftwareSlugs().map((slug) => ({
    url: new URL(`/alternatives/${slug}`, site).toString(),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  // Prompt Templates Entries
  const promptEntries: MetadataRoute.Sitemap = getAllPromptSlugs().map((slug) => ({
    url: new URL(`/prompts/${slug}`, site).toString(),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  // Dynamically Generated Entity Pages (Phones, IPs, WHOIS, Usernames)
  const dynamicGeneratedPages: GeneratedPageRecord[] = getGeneratedPages();
  const programmaticEntries: MetadataRoute.Sitemap = dynamicGeneratedPages.map((page: GeneratedPageRecord) => ({
    url: new URL(page.path, site).toString(),
    lastModified: new Date(page.updatedAt || new Date()),
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  // Core Tools Directory & Tool Pages
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

  return [
    ...staticEntries,
    ...alternativeEntries,
    ...promptEntries,
    ...programmaticEntries,
    ...categoryEntries,
    ...toolEntries,
  ];
}
