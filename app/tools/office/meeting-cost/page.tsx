import JsonLd from "@/components/seo/json-ld";
import { MeetingCostClient } from "@/components/tools/office/meeting-cost-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Meeting Cost Calculator | Toolzium",
  description: "Calculate how much a meeting costs based on attendees' salaries.",
  path: "/tools/office/meeting-cost",
  keywords: ["meeting cost", "cost calculator", "office tools", "efficiency"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/office/meeting-cost`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Meeting Cost Calculator", url: toolUrl, description: "Calculate meeting costs.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Office Tools", item: `${siteURL}/tools#cat-office` }, { "@type": "ListItem", position: 3, name: "Meeting Cost Calculator", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How is it calculated?", acceptedAnswer: { "@type": "Answer", text: "Based on the average hourly rate of attendees multiplied by duration." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><MeetingCostClient />
      <RelatedTools currentToolUrl="/tools/office/meeting-cost" />
</div>);
}
