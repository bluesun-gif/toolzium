import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import SitemapGeneratorClient from "@/components/tools/seo/sitemap-generator-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "Sitemap.xml Generator",
  description: "Create XML sitemaps from URL lists for search engines. Generate sitemaps for Google, Bing, and other search engines. Add priority, change frequency, and last modified dates. Free sitemap builder.",
  path: "/tools/seo/sitemap-generator",
  keywords: ["from", "generate", "create", "other", "google", "search", "engines", "bing", "lists", "sitemaps"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Sitemap.xml Generator",
    description: "Create XML sitemaps from URL lists for search engines. Generate sitemaps for Google, Bing, and other search engines. Add priority, change frequency, and last modified dates. Free sitemap builder.",
    path: "/tools/seo/sitemap-generator",
    categoryName: "Seo",
    categoryPath: "/tools/seo",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <SitemapGeneratorClient />
    
      <RelatedTools currentToolUrl="/tools/seo/sitemap-generator" />
</div>
  );
}
