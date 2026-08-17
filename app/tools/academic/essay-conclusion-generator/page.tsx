import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import EssayConclusionGeneratorClient from "@/components/tools/academic/essay-conclusion-generator-client";

const TITLE = "AI Essay Conclusion & Summary Generator | Toolzium";
const DESCRIPTION = "Synthesize main arguments, restate thesis statements powerfully, and craft memorable closing paragraphs for academic papers with live AI.";
const PATH = "/tools/academic/essay-conclusion-generator";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "AI Essay Conclusion & Summary Generator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <EssayConclusionGeneratorClient />
    </>
  );
}
