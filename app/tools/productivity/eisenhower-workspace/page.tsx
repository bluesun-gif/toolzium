import JsonLd from "@/components/seo/json-ld";
import { EisenhowerWorkspaceClient } from "@/components/tools/productivity/eisenhower-workspace-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Eisenhower Matrix Workspace | Toolzium",
  description: "Prioritize your tasks efficiently using the Eisenhower Matrix. Add, categorize, and export your tasks by urgency and importance.",
  path: "/tools/productivity/eisenhower-workspace",
  keywords: ["eisenhower matrix", "task prioritization", "productivity tool", "urgent important matrix", "task manager"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/productivity/eisenhower-workspace`;
  
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Eisenhower Matrix Workspace",
    url: toolUrl,
    description: "Prioritize your tasks efficiently using the Eisenhower Matrix.",
    applicationCategory: "BusinessApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
  };

  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL },
      { "@type": "ListItem", position: 2, name: "Productivity Tools", item: siteURL + "/tools#cat-productivity" },
      { "@type": "ListItem", position: 3, name: "Eisenhower Matrix", item: toolUrl }
    ]
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the Eisenhower Matrix?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Eisenhower Matrix is a productivity framework that helps you organize tasks by urgency and importance into four quadrants: Do First, Schedule, Delegate, and Eliminate."
        }
      }
    ]
  };

  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <EisenhowerWorkspaceClient />
    
      <RelatedTools currentToolUrl="/tools/productivity/eisenhower-workspace" />
</div>
  );
}
