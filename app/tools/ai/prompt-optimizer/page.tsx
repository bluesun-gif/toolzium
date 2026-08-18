import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import PromptOptimizerClient from "@/components/tools/ai/prompt-optimizer-client";

const TITLE = "AI Prompt Optimizer & Generator — ChatGPT, Claude & Midjourney | Toolzium";
const DESCRIPTION = "Free AI prompt optimizer and meta-prompt generator. Enhance prompts for ChatGPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro, DeepSeek, and Midjourney with 1-click persona framing, chain-of-thought, and XML tags.";
const PATH = "/tools/ai/prompt-optimizer";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "AI Prompt Optimizer & Generator",
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
