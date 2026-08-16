import JsonLd from "@/components/seo/json-ld";
import { HabitPlannerClient } from "@/components/tools/productivity/habit-planner-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Weekly Habit & Routine Planner | Toolzium",
  description: "Track your habits and routines weekly. Build streaks and improve productivity.",
  path: "/tools/productivity/habit-planner",
  keywords: ["habit tracker", "routine planner", "weekly habits"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/productivity/habit-planner";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Weekly Habit Planner", url: toolUrl, description: "Track your habits and routines", applicationCategory: "ProductivityApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Productivity Tools", item: siteURL + "/tools#cat-productivity" }, { "@type": "ListItem", position: 3, name: "Weekly Habit Planner", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How do I add a habit?", acceptedAnswer: { "@type": "Answer", text: "Enter the habit name and click add." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><HabitPlannerClient />
      <RelatedTools currentToolUrl="/tools/productivity/habit-planner" />
</div>);
}
