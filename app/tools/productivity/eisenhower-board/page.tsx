import JsonLd from "@/components/seo/json-ld";
import { EisenhowerBoardClient } from "@/components/tools/productivity/eisenhower-board-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Eisenhower Matrix Board | Toolzium",
  description: "Prioritize your tasks using the Eisenhower Matrix methodology. Interactive board for task management.",
  path: "/tools/productivity/eisenhower-board",
  keywords: ["eisenhower matrix", "productivity", "task management", "priority board"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/productivity/eisenhower-board";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Eisenhower Matrix Board", url: toolUrl, description: "Prioritize your tasks using the Eisenhower Matrix methodology.", applicationCategory: "ProductivityApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Productivity Tools", item: siteURL + "/tools#cat-productivity" }, { "@type": "ListItem", position: 3, name: "Eisenhower Board", item: toolUrl }] };
  
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><EisenhowerBoardClient /></div>);
}
