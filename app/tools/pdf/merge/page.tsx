import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import PdfMergeClient from "@/components/tools/pdf/pdf-merge-client";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "PDF Merge",
  description: "Combine multiple PDF files into one online for free.",
  path: "/tools/pdf/merge",
  keywords: ["combine", "into", "files", "online", "free", "multiple"],
});

<<<<<<< HEAD
export default function PdfMergePage() {
  return (
    <><PdfMergeClient />
      <RelatedTools currentToolUrl="/tools/pdf/merge" />
    </>
=======
export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "PDF Merge",
    description: "Combine multiple PDF files into one online for free.",
    path: "/tools/pdf/merge",
    categoryName: "Pdf",
    categoryPath: "/tools/pdf",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <PdfMergeClient />
    </div>
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
  );
}
