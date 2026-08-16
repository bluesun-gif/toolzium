import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import HangmanClient from "@/components/tools/fun/hangman-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "Hangman Word Game",
  description: "Classic Hangman word guessing game. 5 categories, SVG drawing, keyboard support, win streak counter, hinting, localStorage stats.",
  path: "/tools/fun/hangman",
  keywords: ["categories", "drawing", "support", "hangman", "streak", "hinting", "guessing", "word", "game", "counter", "keyboard", "classic"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Hangman Word Game",
    description: "Classic Hangman word guessing game. 5 categories, SVG drawing, keyboard support, win streak counter, hinting, localStorage stats.",
    path: "/tools/fun/hangman",
    categoryName: "Fun",
    categoryPath: "/tools/fun",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <HangmanClient />
    
      <RelatedTools currentToolUrl="/tools/fun/hangman" />
</div>
  );
}
