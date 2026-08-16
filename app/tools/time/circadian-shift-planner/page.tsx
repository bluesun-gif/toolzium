import JsonLd from "@/components/seo/json-ld";
import { CircadianShiftPlannerClient } from "@/components/tools/time/circadian-shift-planner-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Circadian Shift Planner | Toolzium",
  description: "Calculate optimal sleep schedules and light exposure windows for night shift workers.",
  path: "/tools/time/circadian-shift-planner",
  keywords: ["circadian rhythm", "shift work", "sleep schedule", "night shift", "time tools"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/time/circadian-shift-planner";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Circadian Shift Planner", url: toolUrl, description: "Calculate optimal sleep schedules and light exposure windows for night shift workers.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Time Tools", item: siteURL + "/tools#cat-time" }, { "@type": "ListItem", position: 3, name: "Circadian Shift Planner", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How to adjust to night shift?", acceptedAnswer: { "@type": "Answer", text: "Manage light exposure and adhere to a strict sleep schedule." } }] };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <CircadianShiftPlannerClient />
    
      <RelatedTools currentToolUrl="/tools/time/circadian-shift-planner" />
</div>
  );
}
