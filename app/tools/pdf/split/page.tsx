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

export default function PdfSplitPage() {
  return (
    <><PdfSplitClient />
      <RelatedTools currentToolUrl="/tools/pdf/split" />
    </>
  );
}
