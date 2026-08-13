import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import MarkdownStudioClient from "@/components/tools/text/markdown-studio-client";

export const metadata = buildMetadata({
  title: "Interactive Markdown Editor & Live Preview Studio | Toolzium",
  description: "Write, format, and render Markdown documents in real-time with live HTML preview, reading time statistics, and 1-click export.",
  path: "/tools/text/markdown-studio",
  keywords: ["preview", "render", "format", "with", "live", "time", "real", "markdown", "reading", "documents", "html", "write"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Interactive Markdown Editor & Live Preview Studio",
    description: "Write, format, and render Markdown documents in real-time with live HTML preview, reading time statistics, and 1-click export.",
    path: "/tools/text/markdown-studio",
    categoryName: "Text",
    categoryPath: "/tools/text",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <MarkdownStudioClient />
    </div>
  );
}
