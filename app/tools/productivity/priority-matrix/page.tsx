import JsonLd from "@/components/seo/json-ld";
import { PriorityMatrixClient } from "@/components/tools/productivity/priority-matrix-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Priority Matrix | Toolzium",
  description: "Organize tasks by impact and effort using an Eisenhower-style priority matrix.",
  path: "/tools/productivity/priority-matrix",
  keywords: ["priority matrix", "eisenhower matrix", "impact effort matrix", "task prioritization"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/productivity/priority-matrix`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Priority Matrix", url: toolUrl, description: "Organize tasks by impact and effort using an Eisenhower-style priority matrix.", applicationCategory: "ProductivityApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Productivity Tools", item: `${siteURL}/tools#cat-productivity` }, { "@type": "ListItem", position: 3, name: "Priority Matrix", item: toolUrl }] };
  

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "How does the Priority Matrix work?", acceptedAnswer: { "@type": "Answer", text: "Toolzium's Priority Matrix runs instantly in your browser. Organize tasks by impact and effort using an Eisenhower-style priority matrix. No sign-up or software installation required." } },
      { "@type": "Question", name: "Is the Priority Matrix 100% free to use?", acceptedAnswer: { "@type": "Answer", text: "Yes, the Priority Matrix is 100% free with unlimited usage and no account required." } },
      { "@type": "Question", name: "Is my data secure when using the Priority Matrix?", acceptedAnswer: { "@type": "Answer", text: "Yes, all processing occurs locally in your browser. Your data never leaves your device." } }
    ]
  };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <PriorityMatrixClient />
    </div>
  );
}
