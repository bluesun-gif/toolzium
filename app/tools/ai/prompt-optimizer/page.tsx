import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import PromptOptimizerClient from "@/components/tools/ai/prompt-optimizer-client";

const TITLE = "AI Prompt Optimizer [Free] — Better Prompts for ChatGPT, Claude, Gemini";
const DESCRIPTION =
  "✅ Free forever • No signup • Instant results • Rewrite vague ideas into high-performing prompts for ChatGPT-4o, Claude, Gemini & Midjourney with proven frameworks.";
const PATH = "/tools/ai/prompt-optimizer";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "ai prompt optimizer",
    "prompt engineering",
    "chatgpt prompts",
    "prompt generator",
    "claude prompts",
    "midjourney prompts",
  ],
});

const FAQS = [
  { question: "Is this AI prompt optimizer really free?",
    answer: "Yes, 100% free forever. No credit card, no signup, no hidden fees. Optimize unlimited prompts for ChatGPT, Claude, Gemini, and Midjourney." },
  { question: "Do you store my prompts?",
    answer: "No. Your prompts are processed and returned without being logged or tied to your identity. You can use the studio anonymously." },
  { question: "What makes an optimized AI prompt?",
    answer: "Clear role assignment, task specification, output format constraints, examples, and context boundaries. The studio rewrites your draft using these frameworks so models produce dramatically better answers." },
  { question: "Which AI models does it work with?",
    answer: "All major models: GPT-4o, GPT-5, Claude, Gemini, Llama, Midjourney, and DALL-E. Each output is tuned to the model family you select." },
  ];

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "AI Prompt Optimizer & Engineering Studio",
    description: DESCRIPTION,
    path: PATH,
    faqs: FAQS,
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <PromptOptimizerClient />
    </>
  );
}
