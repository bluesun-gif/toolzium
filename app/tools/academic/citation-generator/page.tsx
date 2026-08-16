import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CitationGeneratorClient from "@/components/tools/academic/citation-generator-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "APA / MLA / Chicago Citation & Bibliography Generator",
  description: "Generate formatted APA 7th, MLA 9th, and Chicago style citations and bibliography entries for academic papers.",
  path: "/tools/academic/citation-generator",
  keywords: ["style", "citations", "generate", "chicago", "bibliography", "entries", "formatted", "papers", "academic"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "APA / MLA / Chicago Citation & Bibliography Generator",
    description: "Generate formatted APA 7th, MLA 9th, and Chicago style citations and bibliography entries for academic papers.",
    path: "/tools/academic/citation-generator",
    categoryName: "Academic",
    categoryPath: "/tools/academic",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <CitationGeneratorClient />
    
      <RelatedTools currentToolUrl="/tools/academic/citation-generator" />
</div>
  );
}
