import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import WordScrambleClient from "@/components/tools/fun/word-scramble-client";

export const metadata = buildMetadata({
  title: "Word Scramble Game",
  description: "Unscramble scrambled letters word game. Categories, timer per word, letter hint, score counter, streak tracker, sound effects.",
  path: "/tools/fun/word-scramble",
  keywords: ["score", "categories", "letter", "hint", "scrambled", "letters", "unscramble", "word", "game", "counter", "timer"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Word Scramble Game",
    description: "Unscramble scrambled letters word game. Categories, timer per word, letter hint, score counter, streak tracker, sound effects.",
    path: "/tools/fun/word-scramble",
    categoryName: "Fun",
    categoryPath: "/tools/fun",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <WordScrambleClient />
    </div>
  );
}
