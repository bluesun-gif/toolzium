import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import QuoteGeneratorClient from "@/components/tools/fun/quote-generator-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "Random Quote Generator",
  description: "Get inspired with random quotes from 50+ curated entries across inspirational, motivational, funny, philosophical, and life categories. Save favorites, copy, and share on Twitter.",
  path: "/tools/fun/quote-generator",
  keywords: ["across", "from", "motivational", "random", "with", "philosophical", "inspired", "quotes", "inspirational", "entries", "curated", "funny"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Random Quote Generator",
    description: "Get inspired with random quotes from 50+ curated entries across inspirational, motivational, funny, philosophical, and life categories. Save favorites, copy, and share on Twitter.",
    path: "/tools/fun/quote-generator",
    categoryName: "Fun",
    categoryPath: "/tools/fun",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <QuoteGeneratorClient />
    
      <RelatedTools currentToolUrl="/tools/fun/quote-generator" />
</div>
  );
}
