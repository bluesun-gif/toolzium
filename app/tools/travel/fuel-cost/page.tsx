import JsonLd from "@/components/seo/json-ld";
import { FuelCostClient } from "@/components/tools/travel/fuel-cost-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Fuel Cost Calculator | Toolzium",
  description: "Calculate and compare fuel costs for your trips across multiple vehicles. Supports metric and imperial units.",
  path: "/tools/travel/fuel-cost",
  keywords: ["fuel cost", "trip calculator", "gas price calculator", "mpg", "l/100km", "travel tool"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/travel/fuel-cost`;
  
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Fuel Cost Calculator",
    url: toolUrl,
    description: "Calculate fuel cost for a trip and compare different vehicles.",
    applicationCategory: "TravelApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
  };
  
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL },
      { "@type": "ListItem", position: 2, name: "Travel Tools", item: `${siteURL}/tools#cat-travel` },
      { "@type": "ListItem", position: 3, name: "Fuel Cost Calculator", item: toolUrl }
    ]
  };
  
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How is fuel cost calculated?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Fuel cost is calculated by determining the total amount of fuel required for a given distance based on the vehicle's efficiency, then multiplying that by the price per unit of fuel."
        }
      },
      {
        "@type": "Question",
        name: "Can I use MPG or L/100km?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, you can easily toggle between metric (L/100km) and imperial (MPG) units to suit your preference."
        }
      }
    ]
  };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <FuelCostClient />
    </div>
  );
}
