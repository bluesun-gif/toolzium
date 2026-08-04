import JsonLd from "@/components/seo/json-ld";
import { MeetingPlannerClient } from "@/components/tools/time/meeting-planner-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Time Zone Meeting Planner | Toolzium",
  description: "Find the best meeting time across different time zones. Compare availability and schedule international meetings easily.",
  path: "/tools/time/meeting-planner",
  keywords: ["time zone converter", "meeting planner", "international meeting time", "timezone scheduler"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/time/meeting-planner`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Time Zone Meeting Planner", url: toolUrl, description: "Find the best meeting time across different time zones.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Date & Time Tools", item: `${siteURL}/tools#cat-time` }, { "@type": "ListItem", position: 3, name: "Meeting Planner", item: toolUrl }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><MeetingPlannerClient /></div>);
}
