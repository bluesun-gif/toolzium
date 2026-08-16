import JsonLd from "@/components/seo/json-ld";
import { CurrencyCardClient } from "@/components/tools/travel/currency-card-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Currency Quick Reference Card | Toolzium",
  description: "Generate a pocket-sized printable travel currency conversion cheat card.",
  path: "/tools/travel/currency-card",
  keywords: ["currency reference card", "travel currency cheat sheet", "travel tool", "currency converter printable"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/travel/currency-card";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Currency Quick Reference Card", url: toolUrl, description: "Generate a printable currency conversion card.", applicationCategory: "TravelApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Travel Tools", item: siteURL + "/tools#cat-travel" }, { "@type": "ListItem", position: 3, name: "Currency Reference Card", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is this tool for?", acceptedAnswer: { "@type": "Answer", text: "It creates a small printable card with quick currency conversions for common expenses while traveling." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><CurrencyCardClient />
      <RelatedTools currentToolUrl="/tools/travel/currency-card" />
</div>);
}
