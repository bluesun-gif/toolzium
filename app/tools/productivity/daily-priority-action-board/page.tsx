import JsonLd from "@/components/seo/json-ld";
import { DailyPriorityActionBoardClient } from "@/components/tools/productivity/daily-priority-action-board-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Daily Priority Task Action Board | Toolzium",
  description: "Manage your daily tasks using the Eisenhower Matrix methodology with this structured priority board.",
  path: "/tools/productivity/daily-priority-action-board",
  keywords: ["eisenhower matrix", "task board", "daily planner", "priority matrix", "productivity tool"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/productivity/daily-priority-action-board";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Daily Priority Task Action Board", url: toolUrl, description: "Manage your daily tasks using the Eisenhower Matrix methodology with this structured priority board.", applicationCategory: "ProductivityApplication", operatingSystem: "All" };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Productivity Tools", item: siteURL + "/tools#cat-productivity" }, { "@type": "ListItem", position: 3, name: "Daily Priority Action Board", item: toolUrl }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><DailyPriorityActionBoardClient /></div>);
}
