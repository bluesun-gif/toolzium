import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import MarkdownEditorClient from "@/components/tools/dev/markdown-editor-client";

export const metadata = buildMetadata({
  title: "Markdown Editor",
  description: "Write and preview Markdown in real time. Free online Markdown editor with live HTML preview, toolbar, word count, and export to .md file. No signup required.",
  path: "/tools/dev/markdown-editor",
  keywords: ["preview", "with", "time", "online", "free", "editor", "real", "markdown", "live", "html", "write"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Markdown Editor",
    description: "Write and preview Markdown in real time. Free online Markdown editor with live HTML preview, toolbar, word count, and export to .md file. No signup required.",
    path: "/tools/dev/markdown-editor",
    categoryName: "Dev",
    categoryPath: "/tools/dev",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <MarkdownEditorClient />
    </div>
  );
}
