import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import TextDiffClient from "@/components/tools/text/text-diff-client";
<<<<<<< HEAD
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
=======

>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
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
    
      <RelatedTools currentToolUrl="/tools/text/text-diff" />
</div>
  );
}
