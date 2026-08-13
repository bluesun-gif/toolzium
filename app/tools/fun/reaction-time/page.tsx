import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ReactionTimeClient from "@/components/tools/fun/reaction-time-client";

export const metadata = buildMetadata({
  title: "Reaction Time Test",
  description: "Measure your reaction time in milliseconds. Screen turns green at random intervals. Track best score and average. Fun ratings from Superhuman to Slow.",
  path: "/tools/fun/reaction-time",
  keywords: ["best", "your", "reaction", "random", "time", "milliseconds", "turns", "screen", "track", "measure", "intervals", "green"],
});

export default function Page() {
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
}
