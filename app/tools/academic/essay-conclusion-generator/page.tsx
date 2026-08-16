import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import EssayConclusionGeneratorClient from "@/components/tools/academic/essay-conclusion-generator-client";
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
  );
}
