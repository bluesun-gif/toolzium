import JsonLd from "@/components/seo/json-ld";
import { PatternTileMemoryClient } from "@/components/tools/fun/pattern-tile-memory-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Tile Sequence Pattern Memory Challenge | Toolzium",
  description: "Test and improve your spatial memory with this interactive sequence puzzle game.",
  path: "/tools/fun/pattern-tile-memory",
  keywords: ["memory game", "tile pattern", "spatial memory", "sequence puzzle", "brain training"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/fun/pattern-tile-memory";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Tile Sequence Pattern Memory Challenge", url: toolUrl, description: "Test and improve your spatial memory with this interactive sequence puzzle game.", applicationCategory: "GameApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Fun Tools", item: siteURL + "/tools#cat-fun" }, { "@type": "ListItem", position: 3, name: "Tile Sequence Pattern Memory", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How do I play?", acceptedAnswer: { "@type": "Answer", text: "Watch the sequence of tiles light up, then repeat the pattern by clicking the tiles in the exact same order." } }, { "@type": "Question", name: "Does it save my high score?", acceptedAnswer: { "@type": "Answer", text: "Yes, your high score is automatically saved locally in your browser." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><PatternTileMemoryClient /></div>);
}
