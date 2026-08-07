import { Metadata } from "next";
import AiSowGeneratorClient from "@/components/tools/office/ai-sow-generator-client";

export const metadata: Metadata = {
  title: "AI Statement of Work (SOW) Deliverables Generator | Toolzium",
  description:
    "Generate professional client Statement of Work (SOW) documents with phased milestone deliverables, acceptance criteria, and out-of-scope boundaries using live AI.",
};

export default function AiSowGeneratorPage() {
  return <AiSowGeneratorClient />;
}
