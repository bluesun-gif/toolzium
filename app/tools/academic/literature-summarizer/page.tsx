import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import LiteratureSummarizerClient from "@/components/tools/academic/literature-summarizer-client";

export const metadata = buildMetadata({
  title: "AI Literature Review & Academic Paper Summarizer",
  description: "Extract core research objectives, methodologies, sample sizes, empirical findings, and limitations from academic papers with live AI.",
  path: "/tools/academic/literature-summarizer",
  keywords: ["core", "sizes", "empirical", "from", "sample", "objectives", "extract", "findings", "research", "methodologies", "limitations", "academic"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "AI Literature Review & Academic Paper Summarizer",
    description: "Extract core research objectives, methodologies, sample sizes, empirical findings, and limitations from academic papers with live AI.",
    path: "/tools/academic/literature-summarizer",
    categoryName: "Academic",
    categoryPath: "/tools/academic",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <LiteratureSummarizerClient />
    </div>
  );
}
