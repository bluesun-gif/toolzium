import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import Magic8BallClient from "@/components/tools/fun/magic-8-ball-client";

export const metadata = buildMetadata({
  title: "Magic 8 Ball",
  description: "Ask the Magic 8 Ball any yes-or-no question and get a mystical answer! Classic billiard-style 8-ball with 20 authentic responses, shake animation, and question history.",
  path: "/tools/fun/magic-8-ball",
  keywords: ["mystical", "magic", "style", "with", "billiard", "question", "ball", "answer", "responses", "classic", "authentic"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Magic 8 Ball",
    description: "Ask the Magic 8 Ball any yes-or-no question and get a mystical answer! Classic billiard-style 8-ball with 20 authentic responses, shake animation, and question history.",
    path: "/tools/fun/magic-8-ball",
    categoryName: "Fun",
    categoryPath: "/tools/fun",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <Magic8BallClient />
    </div>
  );
}
