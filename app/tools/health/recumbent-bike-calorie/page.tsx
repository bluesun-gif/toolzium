import JsonLd from "@/components/seo/json-ld";
import { RecumbentBikeCalorieClient } from "@/components/tools/health/recumbent-bike-calorie-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Recumbent Exercise Bike Calorie Calculator | Toolzium",
  description: "Calculate calories burned on a recumbent stationary bike based on weight, duration, intensity, and cadence.",
  path: "/tools/health/recumbent-bike-calorie",
  keywords: ["recumbent bike calories", "stationary bike calculator", "exercise bike calories burned", "health calculator", "fitness tools"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/health/recumbent-bike-calorie";
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Recumbent Exercise Bike Calorie Calculator",
    url: toolUrl,
    description: "Calculate calories burned on a recumbent stationary bike based on weight, duration, intensity, and cadence.",
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
      { "@type": "ListItem", position: 3, name: "Recumbent Bike Calorie Calculator", item: toolUrl }
    ]
  };

  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <RecumbentBikeCalorieClient />
    </div>
  );
}
