import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import EssayConclusionGeneratorClient from "@/components/tools/academic/essay-conclusion-generator-client";
<<<<<<< HEAD
export const metadata: Metadata = {
  title: "AI Essay Conclusion & Summary Generator | Toolzium",
  description:
    "Synthesize main arguments, restate thesis statements powerfully, and craft memorable closing paragraphs for academic papers with live AI.",
};

export default function EssayConclusionGeneratorPage() {
  return (
    <><EssayConclusionGeneratorClient />
      <RelatedTools currentToolUrl="/tools/academic/essay-conclusion-generator" />
    </>
=======

export const metadata = buildMetadata({
  title: "AI Essay Conclusion & Summary Generator",
  description: "Synthesize main arguments, restate thesis statements powerfully, and craft memorable closing paragraphs for academic papers with live AI.",
  path: "/tools/academic/essay-conclusion-generator",
  keywords: ["memorable", "thesis", "main", "craft", "academic", "statements", "closing", "synthesize", "restate", "paragraphs", "arguments", "powerfully"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "AI Essay Conclusion & Summary Generator",
    description: "Synthesize main arguments, restate thesis statements powerfully, and craft memorable closing paragraphs for academic papers with live AI.",
    path: "/tools/academic/essay-conclusion-generator",
    categoryName: "Academic",
    categoryPath: "/tools/academic",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <EssayConclusionGeneratorClient />
    </div>
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
  );
}
