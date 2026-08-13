import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import MarkdownTableClient from "@/components/tools/text/markdown-table-client";

export const metadata = buildMetadata({
  title: "Markdown Table Generator",
  description: "Create markdown tables visually. Set rows and columns up to 10x10. Edit cells inline. Column alignment options. Live markdown preview. Import from CSV. Copy output.",
  path: "/tools/text/markdown-table",
  keywords: ["columns", "alignment", "markdown", "inline", "rows", "column", "create", "options", "tables", "visually", "cells", "edit"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Markdown Table Generator",
    description: "Create markdown tables visually. Set rows and columns up to 10x10. Edit cells inline. Column alignment options. Live markdown preview. Import from CSV. Copy output.",
    path: "/tools/text/markdown-table",
    categoryName: "Text",
    categoryPath: "/tools/text",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <MarkdownTableClient />
    </div>
  );
}
