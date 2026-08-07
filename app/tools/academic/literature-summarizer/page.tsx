import { Metadata } from "next";
import LiteratureSummarizerClient from "@/components/tools/academic/literature-summarizer-client";

export const metadata: Metadata = {
  title: "AI Literature Review & Academic Paper Summarizer | Toolzium",
  description:
    "Extract core research objectives, methodologies, sample sizes, empirical findings, and limitations from academic papers with live AI.",
};

export default function LiteratureSummarizerPage() {
  return <LiteratureSummarizerClient />;
}
