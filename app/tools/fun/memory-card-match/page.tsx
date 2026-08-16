import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import MemoryCardMatchClient from "@/components/tools/fun/memory-card-match-client";
<<<<<<< HEAD
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
=======

>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
export const metadata = buildMetadata({
  title: "Memory Card Matching Game",
  description: "Interactive 3D memory card matching game. 4x4 & 6x6 grids, Emoji/Developer/Animal themes, move counter, timer, best scores.",
  path: "/tools/fun/memory-card-match",
  keywords: ["interactive", "matching", "memory", "card", "emoji", "move", "themes", "grids", "developer", "game", "counter", "animal"],
});

export default function Page() {
<<<<<<< HEAD
  const toolUrl = siteURL + "/tools/fun/memory-card-match";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Memory Card Match", url: toolUrl, description: "Play an interactive memory card matching game with multiple themes and grid sizes.", applicationCategory: "GameApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Fun Tools", item: siteURL + "/tools#cat-fun" }, { "@type": "ListItem", position: 3, name: "Memory Card Match", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How to play?", acceptedAnswer: { "@type": "Answer", text: "Match pairs of identical cards." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><MemoryCardMatchClient />
      <RelatedTools currentToolUrl="/tools/fun/memory-card-match" />
</div>);
=======
  const jsonLd = buildToolJsonLd({
    name: "Memory Card Matching Game",
    description: "Interactive 3D memory card matching game. 4x4 & 6x6 grids, Emoji/Developer/Animal themes, move counter, timer, best scores.",
    path: "/tools/fun/memory-card-match",
    categoryName: "Fun",
    categoryPath: "/tools/fun",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <MemoryCardMatchClient />
    </div>
  );
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
}
