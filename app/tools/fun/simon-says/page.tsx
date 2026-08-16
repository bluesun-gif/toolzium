import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import SimonSaysClient from "@/components/tools/fun/simon-says-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "Simon Says",
  description: "Classic Simon Says memory game. 4 colored panels with sound. Increasing difficulty. High score tracking. Speed increases every 5 levels.",
  path: "/tools/fun/simon-says",
  keywords: ["simon", "memory", "with", "says", "panels", "sound", "colored", "increasing", "difficulty", "game", "high", "classic"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Simon Says",
    description: "Classic Simon Says memory game. 4 colored panels with sound. Increasing difficulty. High score tracking. Speed increases every 5 levels.",
    path: "/tools/fun/simon-says",
    categoryName: "Fun",
    categoryPath: "/tools/fun",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <SimonSaysClient />
    
      <RelatedTools currentToolUrl="/tools/fun/simon-says" />
</div>
  );
}
