import JsonLd from "@/components/seo/json-ld";
import { BaggageCalcClient } from "@/components/tools/travel/baggage-calc-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Airline Baggage Allowance & Fee Calculator | Toolzium",
  description: "Calculate total checked bag weight & potential excess baggage fee.",
  path: "/tools/travel/baggage-calc",
  keywords: ["baggage", "allowance", "fee", "calculator", "airline", "travel"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/travel/baggage-calc";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Airline Baggage Allowance & Fee Calculator", url: toolUrl, description: "Calculate total checked bag weight & potential excess baggage fee.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Travel Tools", item: siteURL + "/tools#cat-travel" }, { "@type": "ListItem", position: 3, name: "Baggage Calculator", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How is excess baggage fee calculated?", acceptedAnswer: { "@type": "Answer", text: "It usually depends on the weight limit set by airlines based on travel class, size of the bag, and overweight amount." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><BaggageCalcClient />
      <RelatedTools currentToolUrl="/tools/travel/baggage-calc" />
</div>);
}
