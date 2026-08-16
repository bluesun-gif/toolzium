import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import PdfSplitClient from "@/components/tools/pdf/pdf-split-client";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "PDF Split",
  description: "Split PDFs into individual pages or page ranges.",
  path: "/tools/pdf/split",
  keywords: ["split", "pages", "into", "ranges", "page", "individual", "pdfs"],
});

<<<<<<< HEAD
export default function PdfSplitPage() {
  return (
    <><PdfSplitClient />
      <RelatedTools currentToolUrl="/tools/pdf/split" />
    </>
=======
export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "PDF Split",
    description: "Split PDFs into individual pages or page ranges.",
    path: "/tools/pdf/split",
    categoryName: "Pdf",
    categoryPath: "/tools/pdf",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <PdfSplitClient />
    </div>
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
  );
}
