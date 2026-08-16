import JsonLd from "@/components/seo/json-ld";
import WordSearchClient from "@/components/tools/fun/word-search-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "Word Search Puzzle Generator | Toolzium",
  description: "Create and play interactive word search puzzles online.",
  path: "/tools/fun/word-search",
  keywords: ["word search", "puzzle generator", "game", "interactive"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/fun/word-search";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Word Search Puzzle Generator", url: toolUrl, description: "Create and play interactive word search puzzles online.", applicationCategory: "EntertainmentApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Fun Tools", item: siteURL + "/tools#cat-fun" }, { "@type": "ListItem", position: 3, name: "Word Search Puzzle Generator", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [] };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <WordSearchClient />
    
      <RelatedTools currentToolUrl="/tools/fun/word-search" />
</div>
  );
}
