import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import TwoTruthsClient from "@/components/tools/fun/two-truths-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "Two Truths and a Lie",
  description: "Party game with 50 sets of fun facts. Spot the lie. Score tracking. Timer mode. Categories: Science, History, Animals, Geography, Food.",
  path: "/tools/fun/two-truths",
  keywords: ["mode", "sets", "with", "score", "categories", "science", "tracking", "facts", "spot", "game", "timer", "party"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Two Truths and a Lie",
    description: "Party game with 50 sets of fun facts. Spot the lie. Score tracking. Timer mode. Categories: Science, History, Animals, Geography, Food.",
    path: "/tools/fun/two-truths",
    categoryName: "Fun",
    categoryPath: "/tools/fun",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <TwoTruthsClient />
    
      <RelatedTools currentToolUrl="/tools/fun/two-truths" />
</div>
  );
}
