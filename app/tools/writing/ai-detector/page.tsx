import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import AiDetectorClient from "@/components/tools/writing/ai-detector-client";

const TITLE = "AI Detector [Free] — Check ChatGPT & GPT Content Instantly";
const DESCRIPTION =
  "✅ 100% free • No signup • Sentence-by-sentence heatmap • Detect ChatGPT, Claude & Gemini text with perplexity and burstiness analysis for accuracy.";
const PATH = "/tools/writing/ai-detector";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "ai detector",
    "chatgpt detector",
    "ai content checker",
    "detect ai writing",
    "gpt zero alternative",
  ],
});

const FAQS = [
  { question: "Is this AI detector really free?",
    answer: "Yes, 100% free forever. No credit card, no signup, unlimited checks." },
  { question: "Do you store my text or reports?",
    answer: "No. Analysis runs in-browser and detections are never logged or shared with anyone." },
  { question: "Which AI models can it catch?",
    answer: "ChatGPT (GPT-4o/5), Claude, Gemini, DeepSeek and similar LLMs, using perplexity, burstiness, and stylistic pattern signals per sentence." },
  { question: "How accurate is AI detection?",
    answer: "Strong on longer, edited-free text — but no detector is perfect. Use the per-sentence heatmap plus human judgment for final calls." },
  ];

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Free AI Content Detector & Authenticity Checker",
    description: DESCRIPTION,
    path: PATH,
    faqs: FAQS,
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <AiDetectorClient />
    </>
  );
}
