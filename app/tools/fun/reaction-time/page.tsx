import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ReactionTimeClient from "@/components/tools/fun/reaction-time-client";
<<<<<<< HEAD
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
=======

>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
export const metadata = buildMetadata({
  title: "Reaction Time Test",
  description: "Measure your reaction time in milliseconds. Screen turns green at random intervals. Track best score and average. Fun ratings from Superhuman to Slow.",
  path: "/tools/fun/reaction-time",
  keywords: ["best", "your", "reaction", "random", "time", "milliseconds", "turns", "screen", "track", "measure", "intervals", "green"],
});

export default function Page() {
<<<<<<< HEAD
  const toolUrl = `${siteURL}/tools/fun/reaction-time`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Reaction Time Test", url: toolUrl, description: "Measure your reaction time.", applicationCategory: "GameApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Fun Tools", item: `${siteURL}/tools#cat-fun` }, { "@type": "ListItem", position: 3, name: "Reaction Time Test", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is a good reaction time?", acceptedAnswer: { "@type": "Answer", text: "Average is around 250-300ms. Under 200ms is superhuman!" } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><ReactionTimeClient />
      <RelatedTools currentToolUrl="/tools/fun/reaction-time" />
</div>);
=======
  const jsonLd = buildToolJsonLd({
    name: "Reaction Time Test",
    description: "Measure your reaction time in milliseconds. Screen turns green at random intervals. Track best score and average. Fun ratings from Superhuman to Slow.",
    path: "/tools/fun/reaction-time",
    categoryName: "Fun",
    categoryPath: "/tools/fun",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <ReactionTimeClient />
    </div>
  );
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
}
