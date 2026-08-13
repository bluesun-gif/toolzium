import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import RpsClient from "@/components/tools/fun/rps-client";

export const metadata = buildMetadata({
  title: "Rock Paper Scissors",
  description: "Play Rock Paper Scissors vs computer. Score tracker. Best of 3/5/7 mode. Win streak counter. Match history. Emoji buttons.",
  path: "/tools/fun/rps",
  keywords: ["rock", "best", "mode", "score", "tracker", "scissors", "streak", "play", "computer", "match", "paper", "counter"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Rock Paper Scissors",
    description: "Play Rock Paper Scissors vs computer. Score tracker. Best of 3/5/7 mode. Win streak counter. Match history. Emoji buttons.",
    path: "/tools/fun/rps",
    categoryName: "Fun",
    categoryPath: "/tools/fun",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <RpsClient />
    </div>
  );
}
