import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import EmojiStoryClient from "@/components/tools/fun/emoji-story-client";

export const metadata = buildMetadata({
  title: "Emoji Story Generator",
  description: "Generate random emoji stories by category. Adventure, Romance, Mystery, Comedy, Sci-Fi, Horror. Silly text translations. Rate and share.",
  path: "/tools/fun/emoji-story",
  keywords: ["random", "comedy", "generate", "category", "adventure", "emoji", "mystery", "romance", "silly", "stories", "text", "horror"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Emoji Story Generator",
    description: "Generate random emoji stories by category. Adventure, Romance, Mystery, Comedy, Sci-Fi, Horror. Silly text translations. Rate and share.",
    path: "/tools/fun/emoji-story",
    categoryName: "Fun",
    categoryPath: "/tools/fun",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <EmojiStoryClient />
    </div>
  );
}
