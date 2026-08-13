import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import WordSearchClient from "@/components/tools/fun/word-search-client";

export const metadata = buildMetadata({
  title: "Word Search Puzzle Generator",
  description: "Interactive Word Search puzzle grid generator and player. 10x10 to 15x15 grids, coding/animal/planet topics, printable PDF mode.",
  path: "/tools/fun/word-search",
  keywords: ["interactive", "topics", "planet", "puzzle", "generator", "coding", "search", "word", "grid", "grids", "player", "animal"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Word Search Puzzle Generator",
    description: "Interactive Word Search puzzle grid generator and player. 10x10 to 15x15 grids, coding/animal/planet topics, printable PDF mode.",
    path: "/tools/fun/word-search",
    categoryName: "Fun",
    categoryPath: "/tools/fun",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <WordSearchClient />
    </div>
  );
}
