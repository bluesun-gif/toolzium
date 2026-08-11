import { Metadata } from "next";
import PromptOptimizerClient from "@/components/tools/ai/prompt-optimizer-client";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import JsonLd from "@/components/seo/json-ld";

const TITLE = "AI Prompt Engineering & Optimizer Studio | Toolzium";
const DESCRIPTION = "Transform simple ideas into master-grade prompts for ChatGPT, Claude 3.5, Gemini, and Midjourney with 1-click persona framing.";
const PATH = "/tools/ai/prompt-optimizer";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "AI prompt optimizer",
    "prompt engineering tool",
    "ChatGPT prompt generator",
    "Midjourney prompt expander",
    "Claude XML prompt generator",
  ],
});

export default function PromptOptimizerPage() {
  const jsonLdData = buildToolJsonLd({
    name: "AI Prompt Optimizer",
    description: DESCRIPTION,
    path: PATH,
    categoryName: "AI Tools",
    categoryPath: "/tools/ai",
    faqs: [
      {
        question: "What does the AI Prompt Optimizer do?",
        answer: "It expands short idea drafts into structured, high-yield system prompts tailored for ChatGPT, Claude 3.5, Midjourney, and DeepSeek.",
      },
    ],
  });

  return (
    <>
      <JsonLd data={jsonLdData as any} />
      <PromptOptimizerClient />
    </>
  );
}
