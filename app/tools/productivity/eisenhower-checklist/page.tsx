import JsonLd from "@/components/seo/json-ld";
import { EisenhowerChecklistClient } from "@/components/tools/productivity/eisenhower-checklist-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Eisenhower Urgency Matrix Checklist | Toolzium",
  description: "Organize tasks effectively using the Eisenhower Matrix methodology.",
  path: "/tools/productivity/eisenhower-checklist",
  keywords: ["eisenhower matrix", "checklist", "productivity", "tasks", "priority"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/productivity/eisenhower-checklist";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Eisenhower Urgency Matrix Checklist", url: toolUrl, description: "Organize tasks effectively using the Eisenhower Matrix methodology.", applicationCategory: "ProductivityApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Productivity Tools", item: siteURL + "/tools#cat-productivity" }, { "@type": "ListItem", position: 3, name: "Eisenhower Urgency Matrix Checklist", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is the Eisenhower Matrix?", acceptedAnswer: { "@type": "Answer", text: "A time management framework that helps prioritize tasks by urgency and importance." } }] };
  return (<div className={"space-y-4"}><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><EisenhowerChecklistClient /></div>);
}
