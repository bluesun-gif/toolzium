import JsonLd from "@/components/seo/json-ld";
import { MealPrepClient } from "@/components/tools/productivity/meal-prep-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Weekly Meal Prep & Grocery Planner | Toolzium",
  description: "Plan your weekly meals and generate a categorized grocery list automatically.",
  path: "/tools/productivity/meal-prep",
  keywords: ["meal prep", "grocery list", "planner", "productivity"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/productivity/meal-prep";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Weekly Meal Prep Planner", url: toolUrl, description: "Plan weekly meals and auto-generate grocery lists.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Productivity Tools", item: siteURL + "/tools#cat-productivity" }, { "@type": "ListItem", position: 3, name: "Weekly Meal Prep", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How to use?", acceptedAnswer: { "@type": "Answer", text: "Enter your meals for each day. Ingredients will be compiled into a list." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><MealPrepClient />
      <RelatedTools currentToolUrl="/tools/productivity/meal-prep" />
</div>);
}
