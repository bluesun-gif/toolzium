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

export default function PdfMergePage() {
  return (
    <><PdfMergeClient />
      <RelatedTools currentToolUrl="/tools/pdf/merge" />
    </>
  );
}
