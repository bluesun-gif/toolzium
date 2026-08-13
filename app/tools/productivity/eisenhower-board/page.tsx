import JsonLd from "@/components/seo/json-ld";
import { EisenhowerBoardClient } from "@/components/tools/productivity/eisenhower-board-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Eisenhower Matrix Board | Toolzium",
  description: "Prioritize your tasks using the Eisenhower Matrix methodology. Interactive board for task management.",
  path: "/tools/productivity/eisenhower-board",
  keywords: ["eisenhower matrix", "productivity", "task management", "priority board"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/productivity/eisenhower-board";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Eisenhower Matrix Board", url: toolUrl, description: "Prioritize your tasks using the Eisenhower Matrix methodology.", applicationCategory: "ProductivityApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Productivity Tools", item: siteURL + "/tools#cat-productivity" }, { "@type": "ListItem", position: 3, name: "Eisenhower Board", item: toolUrl }] };
  

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "How does the Eisenhower Matrix Board work?", acceptedAnswer: { "@type": "Answer", text: "Toolzium's Eisenhower Matrix Board runs instantly in your browser. Prioritize your tasks using the Eisenhower Matrix methodology. Interactive board for task management. No sign-up or software installation required." } },
      { "@type": "Question", name: "Is the Eisenhower Matrix Board 100% free to use?", acceptedAnswer: { "@type": "Answer", text: "Yes, the Eisenhower Matrix Board is 100% free with unlimited usage and no account required." } },
      { "@type": "Question", name: "Is my data secure when using the Eisenhower Matrix Board?", acceptedAnswer: { "@type": "Answer", text: "Yes, all processing occurs locally in your browser. Your data never leaves your device." } }
    ]
  };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} /><EisenhowerBoardClient /></div>);
}
