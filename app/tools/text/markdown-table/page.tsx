import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import MarkdownTableClient from "@/components/tools/text/markdown-table-client";

const TITLE = "Markdown Table | Toolzium";
const DESCRIPTION = "Free online markdown table tool with instant calculation and privacy.";
const PATH = "/tools/text/markdown-table";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Markdown Table",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <MarkdownTableClient />
    </>
  );
}
