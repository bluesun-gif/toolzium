import { ToolsData } from "@/data/tools";
import { env } from "@/lib/env";
import { getAllSoftwareSlugs } from "@/lib/data/adapters/alternatives-adapter";
import { getAllPromptSlugs } from "@/lib/data/adapters/prompts-adapter";
import { getGeneratedPages, type GeneratedPageRecord } from "@/lib/storage/expansion-db";
import type { MetadataRoute } from "next";

const site = env.app.siteUrl || "https://toolzium.com";

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

  // Pre-seeded high-traffic phone number pages for immediate SEO indexing
  const preSeededPhoneNumbers = [
    "+18002752273", "+18884280232", "+18008290922", "+18009220204", "+18005221222",
    "+18004321000", "+18009359935", "+18008693557", "+18006427676", "+18002244177",
    "+18003759900", "+18005281000", "+18007742678", "+18003800366", "+14152900946",
    "+18004639776", "+18886802426", "+18005711000", "+18006423790", "+18443432100",
    "+18005267955", "+18887807234", "+18008015856", "+18006500020", "+18009009248",
    "+12025551234", "+13105551234", "+12125551234", "+14085551234", "+16505550123",
    "+18005550199", "+18776453279", "+18772327871", "+12135551234", "+13125551234",
    "+17035551234", "+14045551234", "+17135551234", "+12025550177", "+18009220204",
    "+18008284322", "+18887462453", "+16178570900", "+19292005765", "+17147810800",
    "+18554800648", "+18887467726", "+12124561000", "+18004668411", "+14153851000",
  ];
  const preSeededPhoneEntries: MetadataRoute.Sitemap = preSeededPhoneNumbers.map((number) => {
    const encoded = number.replace("+", "%2B");
    return {
      url: new URL(`/phone/${encoded}`, site).toString(),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.75,
    };
  });

  // Pre-seeded high-traffic IP lookup pages for immediate SEO indexing
  const preSeededIPs = [
    "8.8.8.8", "8.8.4.4", "1.1.1.1", "1.0.0.1", "4.2.2.1", "4.2.2.2",
    "208.67.222.222", "208.67.220.220", "9.9.9.9", "149.112.112.112",
    "76.76.19.19", "76.223.122.150", "64.6.64.6", "64.6.65.6",
    "198.101.242.72", "23.253.163.53", "185.228.168.9", "185.228.169.9",
    "156.154.70.1", "156.154.71.1", "216.146.35.35", "216.146.36.36",
    "74.82.42.42", "109.69.8.51", "194.242.2.2", "193.110.81.0",
    "195.46.39.39", "195.46.39.40", "77.88.8.8", "77.88.8.1",
    "180.76.76.76", "114.114.114.114", "119.29.29.29", "182.254.116.116",
    "101.226.4.6", "218.30.118.6", "123.125.81.6", "140.207.198.6",
    "103.86.96.100", "103.86.99.100",
  ];
  const preSeededIPEntries: MetadataRoute.Sitemap = preSeededIPs.map((ip) => ({
    url: new URL(`/ip/${ip}`, site).toString(),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  // Pre-seeded high-traffic WHOIS domain pages for immediate SEO indexing
  const preSeededDomains = [
    "google.com", "facebook.com", "youtube.com", "amazon.com", "twitter.com",
    "instagram.com", "tiktok.com", "linkedin.com", "netflix.com", "microsoft.com",
    "apple.com", "reddit.com", "wikipedia.org", "openai.com", "github.com",
    "shopify.com", "zoom.us", "slack.com", "spotify.com", "airbnb.com",
    "ubiqer.com", "paypal.com", "ebay.com", "walmart.com", "target.com",
    "bestbuy.com", "homedepot.com", "lowes.com", "costco.com", "kroger.com",
    "cnn.com", "bbc.com", "nytimes.com", "washingtonpost.com", "theguardian.com",
    "medium.com", "substack.com", "wordpress.com", "blogger.com", "tumblr.com",
  ];
  const preSeededWhoisEntries: MetadataRoute.Sitemap = preSeededDomains.map((domain) => ({
    url: new URL(`/whois/${domain}`, site).toString(),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  // Pre-seeded high-traffic username lookup pages for immediate SEO indexing
  const preSeededUsernames = [
    "johnsmith", "john_doe", "admin", "user123", "michael", "david", "sarah", "emily",
    "chris", "jessica", "daniel", "ashley", "matthew", "amanda", "andrew", "stephanie",
    "joshua", "jennifer", "ryan", "megan", "james", "brittany", "john", "samantha",
    "robert", "rachel", "william", "lauren", "joseph", "alexis", "charles", "amber",
    "thomas", "crystal", "christopher", "brianna", "mark", "natalie", "kevin", "kelly",
  ];
  const preSeededUsernameEntries: MetadataRoute.Sitemap = preSeededUsernames.map((name) => ({
    url: new URL(`/username/${name}`, site).toString(),
    lastModified: new Date(),
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
    ...preSeededPhoneEntries,
    ...preSeededIPEntries,
    ...preSeededWhoisEntries,
    ...preSeededUsernameEntries,
    ...categoryEntries,
    ...toolEntries,
  ];
}
