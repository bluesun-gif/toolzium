import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import MarkdownStudioClient from "@/components/tools/dev/markdown-editor-client";

const TITLE = "Markdown Editor";
const DESCRIPTION = "Write and preview Markdown in real time. Free online Markdown editor with live HTML preview, toolbar, word count, and export to .md file. No signup required.";
const PATH = "/tools/dev/markdown-editor";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Markdown Editor",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <MarkdownStudioClient />
    </>
  );
}
