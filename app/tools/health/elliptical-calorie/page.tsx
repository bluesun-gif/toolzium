import JsonLd from "@/components/seo/json-ld";
import { EllipticalCalorieClient } from "@/components/tools/health/elliptical-calorie-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Elliptical Trainer Calorie Calculator | Toolzium",
  description: "Calculate calories burned during Elliptical Cross-Trainer workouts based on effort, weight, and duration.",
  path: "/tools/health/elliptical-calorie",
  keywords: ["elliptical", "calorie calculator", "fitness", "workout", "cross trainer"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/health/elliptical-calorie";
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Elliptical Trainer Calorie Calculator",
    url: toolUrl,
    description: "Calculate calories burned during Elliptical Cross-Trainer workouts.",
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
      { "@type": "ListItem", position: 3, name: "Elliptical Trainer Calorie Calculator", item: toolUrl }
    ]
  };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <EllipticalCalorieClient />
    </div>
  );
}
