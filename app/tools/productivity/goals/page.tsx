import JsonLd from "@/components/seo/json-ld";
import { GoalsClient } from "@/components/tools/productivity/goals-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Goal Tracker | Toolzium",
  description: "Set and track goals with milestones.",
  path: "/tools/productivity/goals",
  keywords: ["goals", "tracker", "milestones", "productivity"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/productivity/goals`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Goal Tracker", url: toolUrl, description: "Track your personal and professional goals.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Productivity Tools", item: `${siteURL}/tools#cat-productivity` }, { "@type": "ListItem", position: 3, name: "Goal Tracker", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How do I add a milestone?", acceptedAnswer: { "@type": "Answer", text: "Click the add milestone button inside a goal card." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><GoalsClient />
      <RelatedTools currentToolUrl="/tools/productivity/goals" />
</div>);
}
