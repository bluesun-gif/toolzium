import JsonLd from "@/components/seo/json-ld";
import { BloodSugarClient } from "@/components/tools/health/blood-sugar-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Blood Sugar Tracker | Toolzium",
  description: "Track and monitor your blood glucose readings over time with insights and averages.",
  path: "/tools/health/blood-sugar",
  keywords: ["blood sugar tracker", "glucose monitor", "health tracker", "diabetes log"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/health/blood-sugar";
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Blood Sugar Tracker",
    url: toolUrl,
    description: "Track and monitor your blood glucose readings.",
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
      { "@type": "ListItem", position: 3, name: "Blood Sugar Tracker", item: toolUrl }
    ]
  };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <BloodSugarClient />
    </div>
  );
}
