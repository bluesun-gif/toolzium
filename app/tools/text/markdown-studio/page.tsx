import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import MarkdownStudioClient from "@/components/tools/text/markdown-studio-client";

const TITLE = "Markdown Studio | Toolzium";
const DESCRIPTION = "Free online markdown studio tool with instant calculation and privacy.";
const PATH = "/tools/text/markdown-studio";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Markdown Studio",
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
