import JsonLd from "@/components/seo/json-ld";
import { WeeklyPlannerClient } from "@/components/tools/productivity/weekly-planner-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Weekly Planner | Toolzium",
  description: "Plan your week with a visual calendar grid.",
  path: "/tools/productivity/weekly-planner",
  keywords: ["weekly planner", "calendar", "productivity"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/productivity/weekly-planner`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Weekly Planner", url: toolUrl, description: "Plan your week with a visual calendar grid.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Productivity Tools", item: `${siteURL}/tools#cat-productivity` }, { "@type": "ListItem", position: 3, name: "Weekly Planner", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is this tool?", acceptedAnswer: { "@type": "Answer", text: "It is a weekly planner tool." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><WeeklyPlannerClient /></div>);
}
