import JsonLd from "@/components/seo/json-ld";
import { PackingWeightClient } from "@/components/tools/travel/packing-weight-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Packing Weight Calculator | Toolzium",
  description: "Calculate your luggage weight before traveling to avoid overweight baggage fees.",
  path: "/tools/travel/packing-weight",
  keywords: ["luggage weight calculator", "packing list weight", "travel baggage weight", "overweight baggage"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/travel/packing-weight`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Packing Weight Calculator", url: toolUrl, description: "Calculate your luggage weight before traveling to avoid overweight baggage fees.", applicationCategory: "TravelApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Travel Tools", item: `${siteURL}/tools#cat-travel` }, { "@type": "ListItem", position: 3, name: "Packing Weight Calculator", item: toolUrl }] };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "How does the Packing Weight Calculator work?", acceptedAnswer: { "@type": "Answer", text: "Toolzium's Packing Weight Calculator runs instantly in your browser. Calculate luggage weight before traveling. Categorize items, set airline weight limits. Visual progress bar with over-limit warnings. Toggle kg/lb. Know before you go. No sign-up or software installation required." } },
      { "@type": "Question", name: "Is the Packing Weight Calculator 100% free to use?", acceptedAnswer: { "@type": "Answer", text: "Yes, the Packing Weight Calculator is 100% free with unlimited usage and no account required." } },
      { "@type": "Question", name: "Is my data secure when using the Packing Weight Calculator?", acceptedAnswer: { "@type": "Answer", text: "Yes, all processing occurs locally in your browser. Your data never leaves your device." } }
    ]
  };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <PackingWeightClient />
    
      <RelatedTools currentToolUrl="/tools/travel/packing-weight" />
</div>
  );
}
