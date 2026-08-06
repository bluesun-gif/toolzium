import Metadata from "next";
import PromptOptimizerClient from "@/components/tools/ai/prompt-optimizer-client";

export const metadata = {
  title: "AI Prompt Engineering & Optimizer Studio | Toolzium",
  description: "Transform simple ideas into master-grade prompts for ChatGPT, Claude 3.5, Gemini, and Midjourney with 1-click persona framing.",
};

export default function PromptOptimizerPage() {
  return <PromptOptimizerClient />;
}
