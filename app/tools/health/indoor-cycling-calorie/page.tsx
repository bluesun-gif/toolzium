import JsonLd from "@/components/seo/json-ld";
import { IndoorCyclingCalorieClient } from "@/components/tools/health/indoor-cycling-calorie-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Indoor Cycling & Spin Bike Calorie Calculator — Calories Burned (2026) | Toolzium",
  description: "Calculate exact calories burned during indoor bike, stationary cycle, Peloton, and spin workouts based on body weight, duration, and MET intensity level.",
  path: "/tools/health/indoor-cycling-calorie",
  keywords: [
    "indoor bike calorie calculator",
    "calories burned cycling stationary",
    "stationary bike calorie calculator",
    "calories burned on exercise bike",
    "indoor cycling calorie calculator",
    "spin bike calorie burn",
    "bike trainer calorie calculator"
  ],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/health/indoor-cycling-calorie";
  
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Indoor Cycling Calorie Calculator",
    url: toolUrl,
    description: "Calculate calories burned during stationary spin bike and indoor cycling workouts.",
    applicationCategory: "HealthApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
  };

  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL },
      { "@type": "ListItem", position: 2, name: "Health Tools", item: siteURL + "/tools/health" },
      { "@type": "ListItem", position: 3, name: "Indoor Cycling Calorie Calculator", item: toolUrl }
    ]
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How are calories burned on an indoor exercise bike calculated?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Calories are calculated using scientific MET (Metabolic Equivalent of Task) values adjusted for your body weight, workout duration, and cycling intensity (light, moderate, vigorous, or HIIT effort)."
        }
      },
      {
        "@type": "Question",
        name: "How many calories does 30 minutes of stationary cycling burn?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "On average, a 155 lb (70 kg) person burns approximately 210 to 315 calories in 30 minutes of indoor stationary cycling depending on speed and resistance."
        }
      }
    ]
  };

  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <IndoorCyclingCalorieClient />
    
      <RelatedTools currentToolUrl="/tools/health/indoor-cycling-calorie" />
</div>
  );
}
