import JsonLd from "@/components/seo/json-ld";
import { PatternMemoryClient } from "@/components/tools/fun/pattern-memory-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "Memory Pattern Game | Toolzium",
  description: "Test your memory with this visual grid pattern game.",
  path: "/tools/fun/pattern-memory",
  keywords: ["memory game", "pattern game", "fun", "grid"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/fun/pattern-memory";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Memory Pattern Game", url: toolUrl, description: "Test your memory with this visual grid pattern game.", applicationCategory: "GameApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Fun Tools", item: siteURL + "/tools#cat-fun" }, { "@type": "ListItem", position: 3, name: "Memory Pattern Game", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is Memory Pattern Game?", acceptedAnswer: { "@type": "Answer", text: "It is a visual grid memory pattern game." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><PatternMemoryClient />
      <RelatedTools currentToolUrl="/tools/fun/pattern-memory" />
</div>);
}
