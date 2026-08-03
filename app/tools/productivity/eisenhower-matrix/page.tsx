import JsonLd from "@/components/seo/json-ld";
import { EisenhowerMatrixClient } from "@/components/tools/productivity/eisenhower-matrix-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Eisenhower Matrix | Toolzium",
  description: "Prioritize your tasks using the Eisenhower Matrix methodology. Interactive 2x2 priority matrix for better time management.",
  path: "/tools/productivity/eisenhower-matrix",
  keywords: ["eisenhower matrix", "task prioritization", "time management", "productivity"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/productivity/eisenhower-matrix`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Eisenhower Matrix", url: toolUrl, description: "Prioritize your tasks using the Eisenhower Matrix methodology.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Productivity Tools", item: `${siteURL}/tools#cat-productivity` }, { "@type": "ListItem", position: 3, name: "Eisenhower Matrix", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is the Eisenhower Matrix?", acceptedAnswer: { "@type": "Answer", text: "The Eisenhower Matrix is a productivity, prioritization, and time-management framework designed to help you prioritize a list of tasks by categorizing them according to their urgency and importance." } }] };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <EisenhowerMatrixClient />
    </div>
  );
}
