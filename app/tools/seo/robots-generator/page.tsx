import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import RobotsGeneratorClient from "@/components/tools/seo/robots-generator-client";

export const metadata = buildMetadata({
  title: "robots.txt Generator",
  description: "Generate robots.txt files for SEO and search engine crawling control. Create robots.txt with custom user-agent rules, disallow patterns, and sitemap references. Free robots.txt builder.",
  path: "/tools/seo/robots-generator",
  keywords: ["crawling", "with", "generate", "robots", "files", "create", "engine", "user", "search", "custom", "control"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "robots.txt Generator",
    description: "Generate robots.txt files for SEO and search engine crawling control. Create robots.txt with custom user-agent rules, disallow patterns, and sitemap references. Free robots.txt builder.",
    path: "/tools/seo/robots-generator",
    categoryName: "Seo",
    categoryPath: "/tools/seo",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <RobotsGeneratorClient />
    </div>
  );
}
