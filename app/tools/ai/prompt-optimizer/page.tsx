import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import PromptOptimizerClient from "@/components/tools/ai/prompt-optimizer-client";

const TITLE = "AI Prompt Engineering & Optimizer Studio | Toolzium";
const DESCRIPTION = "Transform simple ideas into master-grade prompts for ChatGPT, Claude 3.5, Gemini, and Midjourney with 1-click persona framing.";
const PATH = "/tools/ai/prompt-optimizer";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "AI Prompt Engineering & Optimizer Studio",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <PromptOptimizerClient />
    </>
  );
}
