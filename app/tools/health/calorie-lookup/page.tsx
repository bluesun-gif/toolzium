import JsonLd from "@/components/seo/json-ld";
import { CalorieLookupClient } from "@/components/tools/health/calorie-lookup-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Calorie Lookup & Meal Planner | Toolzium",
  description: "Look up calories and macros for common foods and build a daily meal plan.",
  path: "/tools/health/calorie-lookup",
  keywords: ["calorie lookup", "macro tracker", "meal planner", "food database", "nutrition"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/health/calorie-lookup`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Calorie Lookup", url: toolUrl, description: "Look up calories and macros for common foods.", applicationCategory: "HealthApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Health Tools", item: `${siteURL}/tools#cat-health` }, { "@type": "ListItem", position: 3, name: "Calorie Lookup", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How do I calculate daily calories?", acceptedAnswer: { "@type": "Answer", text: "Search for foods and add them to your meal planner to see the total daily intake of calories, protein, carbs, and fat." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><CalorieLookupClient /></div>);
}
