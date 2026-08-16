import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import AiParaphraserClient from "@/components/tools/writing/ai-paraphraser-client";
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
  );
}
