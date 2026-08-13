import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import TextDiffClient from "@/components/tools/text/text-diff-client";

export const metadata = buildMetadata({
  title: "Text Diff Viewer",
  description: "Compare two texts side-by-side with highlighted additions, deletions, and unchanged lines. Line numbers, stats, swap, and unified diff mode. Copy diff output.",
  path: "/tools/text/text-diff",
  keywords: ["numbers", "with", "lines", "additions", "side", "line", "highlighted", "texts", "unchanged", "deletions", "compare"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Text Diff Viewer",
    description: "Compare two texts side-by-side with highlighted additions, deletions, and unchanged lines. Line numbers, stats, swap, and unified diff mode. Copy diff output.",
    path: "/tools/text/text-diff",
    categoryName: "Text",
    categoryPath: "/tools/text",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <TextDiffClient />
    </div>
  );
}
