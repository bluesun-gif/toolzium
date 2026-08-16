import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import LineToolsClient from "@/components/tools/text/line-tools-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "Line Tools",
  description: "Sort, deduplicate, trim, and manipulate text lines. Remove duplicate lines, sort alphabetically, add line numbers, find and replace across multiple lines. Bulk text processing made easy.",
  path: "/tools/text/line-tools",
  keywords: ["trim", "alphabetically", "manipulate", "line", "remove", "sort", "text", "lines", "deduplicate", "duplicate"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Line Tools",
    description: "Sort, deduplicate, trim, and manipulate text lines. Remove duplicate lines, sort alphabetically, add line numbers, find and replace across multiple lines. Bulk text processing made easy.",
    path: "/tools/text/line-tools",
    categoryName: "Text",
    categoryPath: "/tools/text",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <LineToolsClient />
    
      <RelatedTools currentToolUrl="/tools/text/line-tools" />
</div>
  );
}
