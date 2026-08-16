import JsonLd from "@/components/seo/json-ld";
import { MemoryMatchClient } from "@/components/tools/fun/memory-match-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "Memory Match Game | Toolzium",
  description: "Play the classic card memory matching game. Test your memory with different themes like animals, food, and flags.",
  path: "/tools/fun/memory-match",
  keywords: ["memory game", "card match", "brain training", "emoji match"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/fun/memory-match";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Memory Match Game", url: toolUrl, description: "Play the classic card memory matching game.", applicationCategory: "GameApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Fun Tools", item: siteURL + "/tools#cat-fun" }, { "@type": "ListItem", position: 3, name: "Memory Match Game", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How do I play the memory match game?", acceptedAnswer: { "@type": "Answer", text: "Click on cards to flip them over. Try to find two identical cards. Match all pairs in the fewest moves and fastest time possible." } }] };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <MemoryMatchClient />
    
      <RelatedTools currentToolUrl="/tools/fun/memory-match" />
</div>
  );
}
