import JsonLd from "@/components/seo/json-ld";
import { PaceCalorieClient } from "@/components/tools/health/pace-calorie-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Running vs Walking Pace & Calorie Calculator | Toolzium",
  description: "Compare calories burned running vs walking the same distance. Calculate time saved and METs.",
  path: "/tools/health/pace-calorie",
  keywords: ["calories burned walking vs running", "pace calculator", "running calorie calculator", "health tools", "METs calculator"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/health/pace-calorie";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Pace & Calorie Calculator", url: toolUrl, description: "Compare calories burned running vs walking.", applicationCategory: "HealthApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Health Tools", item: siteURL + "/tools#cat-health" }, { "@type": "ListItem", position: 3, name: "Pace & Calorie Calculator", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "Do you burn more calories running or walking?", acceptedAnswer: { "@type": "Answer", text: "Running typically burns more calories per minute and per mile than walking due to the higher intensity (METs)." } }] };
  
  return (
    <div className={"space-y-4"}>
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <PaceCalorieClient />
    
      <RelatedTools currentToolUrl="/tools/health/pace-calorie" />
</div>
  );
}
