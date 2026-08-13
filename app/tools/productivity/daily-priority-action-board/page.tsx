import JsonLd from "@/components/seo/json-ld";
import { DailyPriorityActionBoardClient } from "@/components/tools/productivity/daily-priority-action-board-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Daily Priority Task Action Board | Toolzium",
  description: "Manage your daily tasks using the Eisenhower Matrix methodology with this structured priority board.",
  path: "/tools/productivity/daily-priority-action-board",
  keywords: ["eisenhower matrix", "task board", "daily planner", "priority matrix", "productivity tool"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/productivity/daily-priority-action-board";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Daily Priority Task Action Board", url: toolUrl, description: "Manage your daily tasks using the Eisenhower Matrix methodology with this structured priority board.", applicationCategory: "ProductivityApplication", operatingSystem: "All" };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Productivity Tools", item: siteURL + "/tools#cat-productivity" }, { "@type": "ListItem", position: 3, name: "Daily Priority Action Board", item: toolUrl }] };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "How does the Daily Priority Task Action Board work?", acceptedAnswer: { "@type": "Answer", text: "Toolzium's Daily Priority Task Action Board runs instantly in your browser. Manage your daily tasks using the Eisenhower Matrix methodology with this structured priority board. No sign-up or software installation required." } },
      { "@type": "Question", name: "Is the Daily Priority Task Action Board 100% free to use?", acceptedAnswer: { "@type": "Answer", text: "Yes, the Daily Priority Task Action Board is 100% free with unlimited usage and no account required." } },
      { "@type": "Question", name: "Is my data secure when using the Daily Priority Task Action Board?", acceptedAnswer: { "@type": "Answer", text: "Yes, all processing occurs locally in your browser. Your data never leaves your device." } }
    ]
  };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} /><DailyPriorityActionBoardClient /></div>);
}
