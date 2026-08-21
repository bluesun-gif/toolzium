import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import AiParaphraserClient from "@/components/tools/writing/ai-paraphraser-client";

const TITLE = "Free AI Paraphrasing Tool - Rephrase Sentences & Rewrite Text Online";
const DESCRIPTION =
  "Free AI paraphraser & sentence rewriter. Rewrite essays, articles, and sentences in Standard, Fluency, Formal, Creative, Shorten, and Expand modes with zero plagiarism.";
const PATH = "/tools/writing/ai-paraphraser";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "ai paraphraser",
    "paraphrasing tool",
    "rephrase sentences",
    "quillbot alternative free",
    "rewrite text online",
    "sentence rewriter",
    "ai rewriting tool",
    "paraphrase tool free online",
    "essay rewriter",
  ],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Free AI Paraphraser & Multi-Mode Sentence Rewriter Studio",
    description: DESCRIPTION,
    path: PATH,
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <AiParaphraserClient />
    </>
  );
}
