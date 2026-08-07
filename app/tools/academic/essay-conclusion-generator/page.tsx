import { Metadata } from "next";
import EssayConclusionGeneratorClient from "@/components/tools/academic/essay-conclusion-generator-client";

export const metadata: Metadata = {
  title: "AI Essay Conclusion & Summary Generator | Toolzium",
  description:
    "Synthesize main arguments, restate thesis statements powerfully, and craft memorable closing paragraphs for academic papers with live AI.",
};

export default function EssayConclusionGeneratorPage() {
  return <EssayConclusionGeneratorClient />;
}
