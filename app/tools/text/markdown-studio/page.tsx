import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import MarkdownStudioClient from "@/components/tools/text/markdown-studio-client";
export const metadata = {
  title: "Interactive Markdown Editor & Live Preview Studio | Toolzium",
  description: "Write, format, and render Markdown documents in real-time with live HTML preview, reading time statistics, and 1-click export.",
  path: "/tools/text/markdown-studio",
  keywords: ["preview", "render", "format", "with", "live", "time", "real", "markdown", "reading", "documents", "html", "write"],
});

export default function MarkdownStudioPage() {
  return (
    <><MarkdownStudioClient />
      <RelatedTools currentToolUrl="/tools/text/markdown-studio" />
    </>
  );
}
