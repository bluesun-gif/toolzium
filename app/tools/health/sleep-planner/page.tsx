import JsonLd from "@/components/seo/json-ld";
import { SleepPlannerClient } from "@/components/tools/health/sleep-planner-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Sleep Cycle & Bedtime Calculator | Toolzium",
  description: "Calculate optimal bedtime or wake-up times based on 90-minute REM sleep cycles.",
  path: "/tools/health/sleep-planner",
  keywords: ["sleep cycle calculator", "bedtime calculator", "wake up time", "REM sleep", "health tools"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/health/sleep-planner";
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Sleep Cycle & Bedtime Calculator",
    url: toolUrl,
    description: "Calculate optimal bedtime or wake-up times based on 90-minute REM sleep cycles.",
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
      { "@type": "ListItem", position: 3, name: "Sleep Cycle Calculator", item: toolUrl }
    ]
  };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <SleepPlannerClient />
    
      <RelatedTools currentToolUrl="/tools/health/sleep-planner" />
</div>
  );
}
