import JsonLd from "@/components/seo/json-ld";
import { EisenhowerGoalsClient } from "@/components/tools/productivity/eisenhower-goals-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Eisenhower Goal & Action Planner | Toolzium",
  description: "Map goals to 4 actionable buckets: Do Now, Schedule, Delegate, Delete. Manage your productivity effectively.",
  path: "/tools/productivity/eisenhower-goals",
  keywords: ["eisenhower matrix", "goal planner", "action planner", "productivity tool", "task management"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/productivity/eisenhower-goals`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Eisenhower Goal & Action Planner", url: toolUrl, description: "Map goals to 4 actionable buckets: Do Now, Schedule, Delegate, Delete.", applicationCategory: "ProductivityApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Productivity Tools", item: `${siteURL}/tools#cat-productivity` }, { "@type": "ListItem", position: 3, name: "Eisenhower Planner", item: toolUrl }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><EisenhowerGoalsClient /></div>);
}
