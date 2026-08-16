import JsonLd from "@/components/seo/json-ld";
import { CalorieActivityClient } from "@/components/tools/health/calorie-activity-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Calorie Burn by Activity Calculator | Toolzium",
  description: "Calculate calories burned for over 40 physical activities and sports based on your body weight and duration.",
  path: "/tools/health/calorie-activity",
  keywords: ["calorie calculator", "calories burned", "fitness calculator", "health tools", "activity calories"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/health/calorie-activity";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Calorie Burn Calculator", url: toolUrl, description: "Calculate calories burned for over 40 physical activities and sports.", applicationCategory: "HealthApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Health Tools", item: siteURL + "/tools#cat-health" }, { "@type": "ListItem", position: 3, name: "Calorie Burn Calculator", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How is calorie burn calculated?", acceptedAnswer: { "@type": "Answer", text: "Calorie burn is calculated using the MET (Metabolic Equivalent of Task) value of an activity multiplied by your body weight and the duration of the activity." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><CalorieActivityClient />
      <RelatedTools currentToolUrl="/tools/health/calorie-activity" />
</div>);
}
