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

  // Pre-seeded 1000 phone number lookup pages (top 50 US area codes × 20 patterns)
  const TOP_US_AREA_CODES = [
    "212","213","214","215","216","312","313","314","317","323",
    "347","404","407","408","410","412","415","424","469","470",
    "503","512","513","516","517","518","561","571","602","612",
    "614","615","617","619","630","646","678","702","703","704",
    "713","714","718","720","737","770","786","801","813","817",
  ];
  // 20 common 7-digit suffixes (exchange + subscriber number, valid E.164 after area code)
  const PHONE_7DIGIT = [
    "5550100","5550200","5550300","5550400","5550500",
    "5551000","5551100","5551200","5551300","5551400",
    "5552000","5552100","5552200","5552300","5552400",
    "5553000","5553100","5553200","5553300","5554000",
  ];
  const preSeededPhoneNumbers: string[] = TOP_US_AREA_CODES.flatMap((area) =>
    PHONE_7DIGIT.map((suffix) => `+1${area}${suffix}`)
  );
  const preSeededPhoneEntries: MetadataRoute.Sitemap = preSeededPhoneNumbers.map((phone) => ({
    url: new URL(`/phone/${encodeURIComponent(phone)}`, site).toString(),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Toll-free numbers (extremely high search volume)
  const TOLL_FREE_NUMBERS = [
    "+18002752273","+18884280232","+18008290922","+18009220204","+18005221222",
    "+18004321000","+18009359935","+18008693557","+18006427676","+18002244177",
    "+18003759900","+18005281000","+18007742678","+18003800366","+18004639776",
    "+18886802426","+18005711000","+18006423790","+18443432100","+18005267955",
    "+18887807234","+18008015856","+18006500020","+18009009248","+18008284322",
    "+18887462453","+18554800648","+18887746726","+18002253227","+18003062273",
    "+18774232453","+18779008055","+18884742673","+18554802273","+18669710100",
    "+18003316000","+18773732677","+18882807717","+18662394253","+18445429872",
    "+18005551234","+18004448888","+18003334444","+18002221111","+18885559999",
    "+18774448888","+18662223333","+18553334444","+18445556666","+18337778888",
  ];
  const tollFreeEntries: MetadataRoute.Sitemap = TOLL_FREE_NUMBERS.map((phone) => ({
    url: new URL(`/phone/${encodeURIComponent(phone)}`, site).toString(),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

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
    ...tollFreeEntries,
    ...preSeededIPEntries,
    ...preSeededWhoisEntries,
    ...preSeededUsernameEntries,
    ...categoryEntries,
    ...toolEntries,
  ];
}
