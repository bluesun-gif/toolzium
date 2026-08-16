import JsonLd from "@/components/seo/json-ld";
import { WaterIntakeClient } from "@/components/tools/health/water-intake-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Water Intake Calculator — Daily Hydration Goal | Toolzium",
  description: "Calculate your daily water intake needs based on weight, activity level, and climate. Track your hydration and get personalized drinking schedules.",
  path: "/tools/health/water-intake",
  keywords: ["water intake calculator", "daily water needs", "hydration calculator", "how much water to drink", "drink water reminder", "health tools", "hydration tracker", "water glasses per day", "water schedule"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/health/water-intake`;
  
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Water Intake Calculator",
    "url": toolUrl,
    "description": "Calculate your optimal daily water intake and track your hydration progress throughout the day.",
    "applicationCategory": "HealthApplication",
    "operatingSystem": "All",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };
  
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": siteURL },
      { "@type": "ListItem", "position": 2, "name": "Health Tools", "item": `${siteURL}/tools#cat-health` },
      { "@type": "ListItem", "position": 3, "name": "Water Intake Calculator", "item": toolUrl }
    ]
  };
  
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How much water should I drink a day?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The general recommendation is about 2.7 to 3.7 liters per day, but this varies significantly based on your weight, activity level, and climate. Our calculator provides a personalized estimate."
        }
      },
      {
        "@type": "Question",
        "name": "Does coffee or tea count towards my water intake?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, all fluids count towards your hydration, but plain water is the best source. Caffeinated drinks have a mild diuretic effect, but they still contribute to overall hydration."
        }
      },
      {
        "@type": "Question",
        "name": "How large is a standard glass of water?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A standard glass of water is typically considered to be 8 ounces or approximately 240 milliliters."
        }
      }
    ]
  };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <WaterIntakeClient />
    
      <RelatedTools currentToolUrl="/tools/health/water-intake" />
</div>
  );
}
