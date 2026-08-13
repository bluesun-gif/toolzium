import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ClientComponent from "@/components/tools/text/character-counter-client";

export const metadata = buildMetadata({
  title: "Character Counter",
  description: "Count characters, words, sentences, and paragraphs in real-time. Check social media character limits for Twitter/X, Instagram, LinkedIn, TikTok. Free character counter with keyword density analysis.",
  path: "/tools/text/character-counter",
  keywords: ["character", "words", "check", "time", "characters", "social", "real", "count", "media", "paragraphs", "limits", "sentences"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Character Counter",
    description: "Count characters, words, sentences, and paragraphs in real-time. Check social media character limits for Twitter/X, Instagram, LinkedIn, TikTok. Free character counter with keyword density analysis.",
    path: "/tools/text/character-counter",
    categoryName: "Text",
    categoryPath: "/tools/text",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <ClientComponent />
    </div>
  );
}
