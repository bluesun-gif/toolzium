import { Metadata } from "next";
import CitationGeneratorClient from "@/components/tools/academic/citation-generator-client";

export const metadata: Metadata = {
  title: "APA / MLA / Chicago Citation & Bibliography Generator | Toolzium",
  description:
    "Generate formatted APA 7th, MLA 9th, and Chicago style citations and bibliography entries for academic papers.",
};

export default function CitationGeneratorPage() {
  return <CitationGeneratorClient />;
}
