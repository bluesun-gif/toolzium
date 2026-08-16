import { Metadata } from "next";
import ThesisGeneratorClient from "@/components/tools/academic/thesis-generator-client";
export const metadata: Metadata = {
  title: "AI Essay Outline & Thesis Statement Generator | Toolzium",
  description:
    "Generate strong, academic-grade thesis statements and structured 3-part essay outlines for research papers with live AI inference.",
};

export default function ThesisGeneratorPage() {
  return (
    <><ThesisGeneratorClient />
      <RelatedTools currentToolUrl="/tools/academic/thesis-generator" />
    </>
  );
}
