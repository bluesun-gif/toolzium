import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import HtmlMarkdownClient from "@/components/tools/dev/html-markdown-client";

const TITLE = "HTML to Markdown Converter — Free Online Tool | Toolzium";
const DESCRIPTION = "Free online HTML to Markdown converter and vice versa. Instantly convert code with live preview, preserving formatting, tables, lists, and images.";
const PATH = "/tools/dev/html-markdown";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "HTML to Markdown Converter",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <HtmlMarkdownClient />
    </>
  );
}
