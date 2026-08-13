import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import AnagramSolverClient from "@/components/tools/fun/anagram-solver-client";

export const metadata = buildMetadata({
  title: "Anagram Finder & Solver",
  description: "Find all possible valid English anagram words from input letters. Length filters, wildcards, Scrabble letter scores.",
  path: "/tools/fun/anagram-solver",
  keywords: ["from", "filters", "english", "length", "letters", "valid", "find", "anagram", "words", "input", "possible", "wildcards"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Anagram Finder & Solver",
    description: "Find all possible valid English anagram words from input letters. Length filters, wildcards, Scrabble letter scores.",
    path: "/tools/fun/anagram-solver",
    categoryName: "Fun",
    categoryPath: "/tools/fun",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <AnagramSolverClient />
    </div>
  );
}
