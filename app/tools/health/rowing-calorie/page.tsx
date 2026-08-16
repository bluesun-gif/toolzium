import JsonLd from "@/components/seo/json-ld";
import { RowingCalorieClient } from "@/components/tools/health/rowing-calorie-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Rowing Machine Calorie Calculator | Toolzium",
  description: "Calculate calories burned and average split pace during rowing machine (ergometer) workouts.",
  path: "/tools/health/rowing-calorie",
  keywords: ["rowing calorie calculator", "ergometer calories", "rowing machine split pace", "rowing calculator"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/health/rowing-calorie";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Rowing Machine Calorie Calculator", url: toolUrl, description: "Calculate calories burned on an ergometer.", applicationCategory: "HealthApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Health Tools", item: siteURL + "/tools#cat-health" }, { "@type": "ListItem", position: 3, name: "Rowing Calorie Calculator", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How are rowing calories calculated?", acceptedAnswer: { "@type": "Answer", text: "Rowing calories are typically calculated based on user weight, duration, and the intensity or average watts generated during the session." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><RowingCalorieClient />
      <RelatedTools currentToolUrl="/tools/health/rowing-calorie" />
</div>);
}
