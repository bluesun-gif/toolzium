import JsonLd from "@/components/seo/json-ld";
import { FuelEfficiencyClient } from "@/components/tools/travel/fuel-efficiency-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Fuel Efficiency Converter | Toolzium",
  description: "Convert between fuel efficiency units: MPG (US), MPG (UK), L/100km, km/L instantly.",
  path: "/tools/travel/fuel-efficiency",
  keywords: ["fuel efficiency", "mpg", "l/100km", "fuel converter", "travel"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/travel/fuel-efficiency`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Fuel Efficiency Converter", url: toolUrl, description: "Convert between fuel efficiency units: MPG (US), MPG (UK), L/100km, km/L instantly.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Travel Tools", item: `${siteURL}/tools#cat-travel` }, { "@type": "ListItem", position: 3, name: "Fuel Efficiency Converter", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How do I convert MPG to L/100km?", acceptedAnswer: { "@type": "Answer", text: "Enter your MPG value and it will instantly show the equivalent L/100km value." } }] };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <FuelEfficiencyClient />
    
      <RelatedTools currentToolUrl="/tools/travel/fuel-efficiency" />
</div>
  );
}
