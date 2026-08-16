import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import DiffCheckerClient from "@/components/tools/dev/diff-checker-client";
<<<<<<< HEAD
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
=======

>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
export const metadata = buildMetadata({
  title: "Diff Checker",
  description: "Compare two text files and find differences line-by-line. Text diff tool with syntax highlighting for code comparison. Find changes, additions, and deletions between versions.",
  path: "/tools/dev/diff-checker",
  keywords: ["with", "files", "line", "differences", "find", "syntax", "diff", "text", "compare", "tool"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Diff Checker",
    description: "Compare two text files and find differences line-by-line. Text diff tool with syntax highlighting for code comparison. Find changes, additions, and deletions between versions.",
    path: "/tools/dev/diff-checker",
    categoryName: "Dev",
    categoryPath: "/tools/dev",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <DiffCheckerClient />
    
      <RelatedTools currentToolUrl="/tools/dev/diff-checker" />
</div>
  );
}
