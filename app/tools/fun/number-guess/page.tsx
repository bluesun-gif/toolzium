import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import NumberGuessClient from "@/components/tools/fun/number-guess-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "Number Guessing Game",
  description: "Classic number guessing game with Higher/Lower hints. Easy, Medium, Hard difficulty. Timer, best scores, streak counter.",
  path: "/tools/fun/number-guess",
  keywords: ["easy", "with", "hints", "medium", "number", "higher", "guessing", "lower", "hard", "difficulty", "game", "classic"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Number Guessing Game",
    description: "Classic number guessing game with Higher/Lower hints. Easy, Medium, Hard difficulty. Timer, best scores, streak counter.",
    path: "/tools/fun/number-guess",
    categoryName: "Fun",
    categoryPath: "/tools/fun",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <NumberGuessClient />
    
      <RelatedTools currentToolUrl="/tools/fun/number-guess" />
</div>
  );
}
