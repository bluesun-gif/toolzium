import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import AiParaphraserClient from "@/components/tools/writing/ai-paraphraser-client";
<<<<<<< HEAD
export const metadata: Metadata = {
  title: "AI Content Paraphraser & Tone Transformer Studio | Toolzium",
  description:
    "Rewrite sentences, paragraphs, and articles into professional, concise, or creative tones with live AI.",
};

export default function AiParaphraserPage() {
  return (
    <><AiParaphraserClient />
      <RelatedTools currentToolUrl="/tools/writing/ai-paraphraser" />
    </>
=======

export const metadata = buildMetadata({
  title: "AI Content Paraphraser & Tone Transformer Studio",
  description: "Rewrite sentences, paragraphs, and articles into professional, concise, or creative tones with live AI.",
  path: "/tools/writing/ai-paraphraser",
  keywords: ["with", "tones", "into", "professional", "articles", "creative", "concise", "paragraphs", "live", "rewrite", "sentences"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "AI Content Paraphraser & Tone Transformer Studio",
    description: "Rewrite sentences, paragraphs, and articles into professional, concise, or creative tones with live AI.",
    path: "/tools/writing/ai-paraphraser",
    categoryName: "Writing",
    categoryPath: "/tools/writing",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <AiParaphraserClient />
    </div>
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
  );
}
