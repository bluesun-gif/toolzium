import JsonLd from "@/components/seo/json-ld";
import { HikingCalorieClient } from "@/components/tools/health/hiking-calorie-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Hiking & Elevation Gain Calorie Calculator | Toolzium",
  description: "Calculate calories burned during hiking based on body weight, pack weight, distance, and elevation gain.",
  path: "/tools/health/hiking-calorie",
  keywords: ["hiking", "calorie calculator", "elevation gain", "fitness", "health tools", "backpacking"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/health/hiking-calorie";
  const appLd = { 
    "@context": "https://schema.org", 
    "@type": "WebApplication", 
    name: "Hiking & Elevation Gain Calorie Calculator", 
    url: toolUrl, 
    description: "Calculate calories burned during hiking based on body weight, pack weight, distance, and elevation gain.", 
    applicationCategory: "HealthApplication", 
    operatingSystem: "All", 
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } 
  };
  const crumbsLd = { 
    "@context": "https://schema.org", 
    "@type": "BreadcrumbList", 
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL }, 
      { "@type": "ListItem", position: 2, name: "Health Tools", item: siteURL + "/tools#cat-health" }, 
      { "@type": "ListItem", position: 3, name: "Hiking Calorie Calculator", item: toolUrl }
    ] 
  };
  const faqLd = { 
    "@context": "https://schema.org", 
    "@type": "FAQPage", 
    mainEntity: [
      { "@type": "Question", name: "Does elevation gain affect calories burned?", acceptedAnswer: { "@type": "Answer", text: "Yes, hiking uphill requires significantly more energy than hiking on a flat surface, burning substantially more calories depending on the grade." } }
    ] 
  };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <HikingCalorieClient />
    </div>
  );
}
