import JsonLd from "@/components/seo/json-ld";
import { EisenhowerGoalsClient } from "@/components/tools/productivity/eisenhower-goals-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Eisenhower Goal & Action Planner | Toolzium",
  description: "Map goals to 4 actionable buckets: Do Now, Schedule, Delegate, Delete. Manage your productivity effectively.",
  path: "/tools/productivity/eisenhower-goals",
  keywords: ["eisenhower matrix", "goal planner", "action planner", "productivity tool", "task management"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/productivity/eisenhower-goals`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Eisenhower Goal & Action Planner", url: toolUrl, description: "Map goals to 4 actionable buckets: Do Now, Schedule, Delegate, Delete.", applicationCategory: "ProductivityApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Productivity Tools", item: `${siteURL}/tools#cat-productivity` }, { "@type": "ListItem", position: 3, name: "Eisenhower Planner", item: toolUrl }] };
<<<<<<< HEAD
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><EisenhowerGoalsClient />
      <RelatedTools currentToolUrl="/tools/productivity/eisenhower-goals" />
</div>);
=======

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "How does the Eisenhower Goal & Action Planner work?", acceptedAnswer: { "@type": "Answer", text: "Toolzium's Eisenhower Goal & Action Planner runs instantly in your browser. Map goals to 4 actionable buckets: Do Now, Schedule, Delegate, Delete. Manage your productivity effectively. No sign-up or software installation required." } },
      { "@type": "Question", name: "Is the Eisenhower Goal & Action Planner 100% free to use?", acceptedAnswer: { "@type": "Answer", text: "Yes, the Eisenhower Goal & Action Planner is 100% free with unlimited usage and no account required." } },
      { "@type": "Question", name: "Is my data secure when using the Eisenhower Goal & Action Planner?", acceptedAnswer: { "@type": "Answer", text: "Yes, all processing occurs locally in your browser. Your data never leaves your device." } }
    ]
  };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} /><EisenhowerGoalsClient /></div>);
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
}
