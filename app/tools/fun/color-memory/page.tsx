import JsonLd from "@/components/seo/json-ld";
import ColorMemoryClient from "@/components/tools/fun/color-memory-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Color Memory Game | Toolzium",
  description: "Test your memory with this classic color matching card game.",
  path: "/tools/fun/color-memory",
  keywords: ["memory game", "color match", "fun tools", "brain game"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/fun/color-memory`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Color Memory Game", url: toolUrl, description: "Test your memory with this classic color matching card game.", applicationCategory: "GameApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Fun Tools", item: `${siteURL}/tools#cat-fun` }, { "@type": "ListItem", position: 3, name: "Color Memory Game", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How to play Color Memory Game?", acceptedAnswer: { "@type": "Answer", text: "Click on cards to flip them. Match pairs of the same color to win the game." } }] };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <ColorMemoryClient />
    </div>
  );
}
