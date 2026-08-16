import JsonLd from "@/components/seo/json-ld";
import { MealPlannerClient } from "@/components/tools/health/meal-planner-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Meal Planner & Calorie Target | Toolzium",
  description: "Plan meals and track macros.",
  path: "/tools/health/meal-planner",
  keywords: ["meal planner", "calorie target", "health", "macro tracker"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/health/meal-planner";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Meal Planner", url: toolUrl, description: "Meal planner tool.", applicationCategory: "HealthApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Health Tools", item: siteURL + "/tools#cat-health" }, { "@type": "ListItem", position: 3, name: "Meal Planner", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How to track macros?", acceptedAnswer: { "@type": "Answer", text: "Use this planner." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><MealPlannerClient />
      <RelatedTools currentToolUrl="/tools/health/meal-planner" />
</div>);
}
