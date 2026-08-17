import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import LiteratureSummarizerClient from "@/components/tools/academic/literature-summarizer-client";

const TITLE = "AI Literature Review & Academic Paper Summarizer | Toolzium";
const DESCRIPTION = "Extract core research objectives, methodologies, sample sizes, empirical findings, and limitations from academic papers with live AI.";
const PATH = "/tools/academic/literature-summarizer";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "AI Literature Review & Academic Paper Summarizer",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <LiteratureSummarizerClient />
    </>
  );
}
