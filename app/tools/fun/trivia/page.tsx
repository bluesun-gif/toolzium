import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import TriviaGeneratorClient from "@/components/tools/fun/trivia-client";

export const metadata = buildMetadata({
  title: "Trivia Generator",
  description: "100 fun facts across Science, History, Geography, Animals, Food, Space, Sports, Technology. Filter by category. Save favorites.",
  path: "/tools/fun/trivia",
  keywords: ["across", "science", "sports", "category", "space", "filter", "animals", "facts", "geography", "history", "technology", "food"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Trivia Generator",
    description: "100 fun facts across Science, History, Geography, Animals, Food, Space, Sports, Technology. Filter by category. Save favorites.",
    path: "/tools/fun/trivia",
    categoryName: "Fun",
    categoryPath: "/tools/fun",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <TriviaGeneratorClient />
    </div>
  );
}
