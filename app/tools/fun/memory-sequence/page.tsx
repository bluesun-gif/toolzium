import JsonLd from "@/components/seo/json-ld";
import { MemorySequenceClient } from "@/components/tools/fun/memory-sequence-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "Memory Tile Sequence Challenge | Toolzium",
  description: "Test your memory with this interactive Simon-says style tile sequence game. Various grid sizes and speeds.",
  path: "/tools/fun/memory-sequence",
  keywords: ["memory game", "tile sequence", "simon says", "brain trainer"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/fun/memory-sequence`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Memory Tile Sequence Challenge", url: toolUrl, description: "Test your memory with this interactive Simon-says style tile sequence game.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Fun Tools", item: `${siteURL}/tools#cat-fun` }, { "@type": "ListItem", position: 3, name: "Memory Tile Sequence Challenge", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How do I play?", acceptedAnswer: { "@type": "Answer", text: "Watch the sequence of tiles light up, then click them in the same order." } }, { "@type": "Question", name: "Are there different grid sizes?", acceptedAnswer: { "@type": "Answer", text: "Yes, you can choose between 3x3 and 4x4 grids." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><MemorySequenceClient />
      <RelatedTools currentToolUrl="/tools/fun/memory-sequence" />
</div>);
}
