import JsonLd from "@/components/seo/json-ld";
import { HydrationTrackerClient } from "@/components/tools/health/hydration-tracker-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Hydration & Daily Water Tracker | Toolzium",
  description: "Track your daily water intake and calculate your optimal hydration goal based on weight and activity.",
  path: "/tools/health/hydration-tracker",
  keywords: ["hydration tracker", "water tracker", "daily water goal", "health tool"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/health/hydration-tracker";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Hydration Tracker", url: toolUrl, description: "Daily water tracker.", applicationCategory: "HealthApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Health Tools", item: siteURL + "/tools#cat-health" }, { "@type": "ListItem", position: 3, name: "Hydration Tracker", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How much water should I drink?", acceptedAnswer: { "@type": "Answer", text: "It varies, but a general rule is about 35ml per kg of body weight." } }] };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <HydrationTrackerClient />
    </div>
  );
}
