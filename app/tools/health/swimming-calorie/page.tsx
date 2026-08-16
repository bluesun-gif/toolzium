import JsonLd from "@/components/seo/json-ld";
import { SwimmingCalorieClient } from "@/components/tools/health/swimming-calorie-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Swimming & Water Sports Calorie Calculator | Toolzium",
  description: "Calculate calories burned during swimming, water polo, kayaking, and other water sports based on your weight and duration.",
  path: "/tools/health/swimming-calorie",
  keywords: ["swimming calorie calculator", "water sports calories", "calories burned swimming", "health tools", "fitness calculator"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/health/swimming-calorie";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Swimming & Water Sports Calorie Calculator", url: toolUrl, description: "Calculate calories burned during swimming, water polo, kayaking, and other water sports.", applicationCategory: "HealthApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Health Tools", item: siteURL + "/tools#cat-health" }, { "@type": "ListItem", position: 3, name: "Swimming Calorie Calculator", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How are swimming calories calculated?", acceptedAnswer: { "@type": "Answer", text: "We use MET (Metabolic Equivalent of Task) values for different swimming strokes and water sports, multiplied by your body weight and the duration of the activity." } }] };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <SwimmingCalorieClient />
    
      <RelatedTools currentToolUrl="/tools/health/swimming-calorie" />
</div>
  );
}
