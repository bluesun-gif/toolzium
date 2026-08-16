import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import MarkdownPreviewerClient from "@/components/tools/dev/markdown-previewer-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Markdown Previewer",
  description: "Preview Markdown syntax and convert to HTML in real-time. Markdown editor with GitHub-flavored markdown support, syntax highlighting, and export options. Live markdown renderer.",
  path: "/tools/dev/markdown-previewer",
  keywords: ["preview", "with", "convert", "time", "flavored", "real", "syntax", "markdown", "github", "html", "editor"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Markdown Previewer",
    description: "Preview Markdown syntax and convert to HTML in real-time. Markdown editor with GitHub-flavored markdown support, syntax highlighting, and export options. Live markdown renderer.",
    path: "/tools/dev/markdown-previewer",
    categoryName: "Dev",
    categoryPath: "/tools/dev",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <MarkdownPreviewerClient />
    
      <RelatedTools currentToolUrl="/tools/dev/markdown-previewer" />
</div>
  );
}
