import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import TypingChallengeClient from "@/components/tools/fun/typing-challenge-client";

export const metadata = buildMetadata({
  title: "Speed Typing Challenge",
  description: "Interactive speed typing test and WPM meter. 15s-120s tests, general English, code, quotes. Accuracy %, WPM score rating.",
  path: "/tools/fun/typing-challenge",
  keywords: ["meter", "interactive", "english", "score", "general", "quotes", "typing", "test", "speed", "tests", "code", "accuracy"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Speed Typing Challenge",
    description: "Interactive speed typing test and WPM meter. 15s-120s tests, general English, code, quotes. Accuracy %, WPM score rating.",
    path: "/tools/fun/typing-challenge",
    categoryName: "Fun",
    categoryPath: "/tools/fun",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <TypingChallengeClient />
    </div>
  );
}
