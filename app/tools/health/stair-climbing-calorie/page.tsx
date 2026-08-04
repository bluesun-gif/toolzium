import JsonLd from "@/components/seo/json-ld";
import { StairClimbingCalorieClient } from "@/components/tools/health/stair-climbing-calorie-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Stair Climbing & Step Workout Calorie Calculator | Toolzium",
  description: "Calculate calories burned during stair climbing and step workouts based on weight, duration, flights of stairs, and intensity.",
  path: "/tools/health/stair-climbing-calorie",
  keywords: ["stair climbing calculator", "calories burned stairmaster", "step workout calories", "fitness calculator", "health tools", "MET stair climbing"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/health/stair-climbing-calorie";
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Stair Climbing Calorie Calculator",
    url: toolUrl,
    description: "Calculate calories burned during stair climbing and step workouts.",
    applicationCategory: "HealthApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL },
      { "@type": "ListItem", position: 2, name: "Health Tools", item: siteURL + "/tools#cat-health" },
      { "@type": "ListItem", position: 3, name: "Stair Climbing Calorie Calculator", item: toolUrl },
    ],
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How are stair climbing calories calculated?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Calories are calculated using MET (Metabolic Equivalent of Task) values. The formula uses your body weight, the duration of the workout, and the intensity level (e.g., slow vs fast pace).",
        },
      },
      {
        "@type": "Question",
        name: "How many steps are in a flight of stairs?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Typically, a standard flight of stairs contains about 16 steps.",
        },
      },
    ],
  };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <StairClimbingCalorieClient />
    </div>
  );
}
