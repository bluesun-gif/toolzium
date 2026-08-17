import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ThesisGeneratorClient from "@/components/tools/academic/thesis-generator-client";

const TITLE = "AI Essay Outline & Thesis Statement Generator | Toolzium";
const DESCRIPTION = "Generate strong, academic-grade thesis statements and structured 3-part essay outlines for research papers with live AI inference.";
const PATH = "/tools/academic/thesis-generator";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "AI Essay Outline & Thesis Statement Generator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <ThesisGeneratorClient />
    </>
  );
}
