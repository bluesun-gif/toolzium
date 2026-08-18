import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import MarkdownStudioClient from "@/components/tools/dev/markdown-previewer-client";

const TITLE = "Markdown Previewer | Toolzium";
const DESCRIPTION = "Free online markdown previewer tool with instant calculation and privacy.";
const PATH = "/tools/dev/markdown-previewer";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Markdown Previewer",
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
