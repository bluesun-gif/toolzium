import JsonLd from "@/components/seo/json-ld";
import { PriorityMatrixClient } from "@/components/tools/productivity/priority-matrix-2x2-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Priority Matrix 2x2 Task Tracker | Toolzium",
  description: "Organize tasks using a 2x2 Impact vs Effort Matrix to prioritize your work efficiently.",
  path: "/tools/productivity/priority-matrix-2x2",
  keywords: ["priority matrix", "2x2 matrix", "eisenhower matrix", "task prioritization", "impact vs effort"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/productivity/priority-matrix-2x2`;
  
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Priority Matrix 2x2 Task Tracker",
    url: toolUrl,
    description: "Organize tasks using a 2x2 Impact vs Effort Matrix to prioritize your work efficiently.",
    applicationCategory: "BusinessApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
  };
  
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL },
      { "@type": "ListItem", position: 2, name: "Productivity Tools", item: `${siteURL}/tools#cat-productivity` },
      { "@type": "ListItem", position: 3, name: "Priority Matrix", item: toolUrl }
    ]
  };
  

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "How does the Priority Matrix 2x2 Task Tracker work?", acceptedAnswer: { "@type": "Answer", text: "Toolzium's Priority Matrix 2x2 Task Tracker runs instantly in your browser. Organize tasks using a 2x2 Impact vs Effort Matrix to prioritize your work efficiently. No sign-up or software installation required." } },
      { "@type": "Question", name: "Is the Priority Matrix 2x2 Task Tracker 100% free to use?", acceptedAnswer: { "@type": "Answer", text: "Yes, the Priority Matrix 2x2 Task Tracker is 100% free with unlimited usage and no account required." } },
      { "@type": "Question", name: "Is my data secure when using the Priority Matrix 2x2 Task Tracker?", acceptedAnswer: { "@type": "Answer", text: "Yes, all processing occurs locally in your browser. Your data never leaves your device." } }
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
