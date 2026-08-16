import JsonLd from "@/components/seo/json-ld";
import { SunCalculatorClient } from "@/components/tools/time/sun-calculator-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Sunrise & Sunset Calculator | Toolzium",
  description: "Calculate sunrise, sunset, dawn, dusk, golden hour, and day length for any date and city.",
  path: "/tools/time/sun-calculator",
  keywords: ["sunrise calculator", "sunset calculator", "golden hour", "day length", "solar time"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/time/sun-calculator";
  const appLd = { 
    "@context": "https://schema.org", 
    "@type": "WebApplication", 
    name: "Sunrise & Sunset Calculator", 
    url: toolUrl, 
    description: "Calculate sunrise, sunset, dawn, dusk, golden hour, and day length.", 
    applicationCategory: "UtilitiesApplication", 
    operatingSystem: "All", 
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } 
  };
  const crumbsLd = { 
    "@context": "https://schema.org", 
    "@type": "BreadcrumbList", 
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL }, 
      { "@type": "ListItem", position: 2, name: "Time Tools", item: siteURL + "/tools#cat-time" }, 
      { "@type": "ListItem", position: 3, name: "Sunrise & Sunset Calculator", item: toolUrl }
    ] 
  };
  const faqLd = { 
    "@context": "https://schema.org", 
    "@type": "FAQPage", 
    mainEntity: [
      { "@type": "Question", name: "Can I use custom coordinates?", acceptedAnswer: { "@type": "Answer", text: "Yes, select 'Custom' from the city list to enter your own latitude and longitude." } }
    ] 
  };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <SunCalculatorClient />
    
      <RelatedTools currentToolUrl="/tools/time/sun-calculator" />
</div>
  );
}
