import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ThesisGeneratorClient from "@/components/tools/academic/thesis-generator-client";

export const metadata = buildMetadata({
  title: "AI Essay Outline & Thesis Statement Generator",
  description: "Generate strong, academic-grade thesis statements and structured 3-part essay outlines for research papers with live AI inference.",
  path: "/tools/academic/thesis-generator",
  keywords: ["thesis", "generate", "research", "grade", "essay", "part", "papers", "structured", "outlines", "statements", "strong", "academic"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "AI Essay Outline & Thesis Statement Generator",
    description: "Generate strong, academic-grade thesis statements and structured 3-part essay outlines for research papers with live AI inference.",
    path: "/tools/academic/thesis-generator",
    categoryName: "Academic",
    categoryPath: "/tools/academic",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <ThesisGeneratorClient />
    </div>
  );
}
