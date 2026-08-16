import JsonLd from "@/components/seo/json-ld";
import { WeeklyGoalsClient } from "@/components/tools/productivity/weekly-goals-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Weekly Goals & Milestone Planner | Toolzium",
  description: "Set primary weekly focus goals, break them down into daily tasks, and track your progress.",
  path: "/tools/productivity/weekly-goals",
  keywords: ["weekly goals", "planner", "productivity", "task manager", "milestones"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/productivity/weekly-goals";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Weekly Goals Planner", url: toolUrl, description: "Set primary weekly focus goals, break them down into daily tasks, and track your progress.", applicationCategory: "ProductivityApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Productivity Tools", item: siteURL + "/tools#cat-productivity" }, { "@type": "ListItem", position: 3, name: "Weekly Goals Planner", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How do I use this tool?", acceptedAnswer: { "@type": "Answer", text: "Create up to 3 weekly goals, assign a category, and break each one down into smaller actionable tasks to track progress." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><WeeklyGoalsClient />
      <RelatedTools currentToolUrl="/tools/productivity/weekly-goals" />
</div>);
}
