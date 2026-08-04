import JsonLd from "@/components/seo/json-ld";
import { MemoryGridFlipClient } from "@/components/tools/fun/memory-grid-flip-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Memory Grid Flip Challenge | Toolzium",
  description: "Interactive memory grid pattern flip challenge game.",
  path: "/tools/fun/memory-grid-flip",
  keywords: ["memory", "grid", "game", "challenge", "brain"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/fun/memory-grid-flip`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Memory Grid Flip Challenge", url: toolUrl, description: "Interactive memory grid pattern flip challenge game.", applicationCategory: "GameApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Fun Tools", item: `${siteURL}/tools#cat-fun` }, { "@type": "ListItem", position: 3, name: "Memory Grid Flip Challenge", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How do I play the Memory Grid Flip Challenge?", acceptedAnswer: { "@type": "Answer", text: "Memorize the pattern of illuminated tiles and click to recall them." } }] };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <MemoryGridFlipClient />
    </div>
  );
}
