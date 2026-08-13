import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import PdfSplitClient from "@/components/tools/pdf/pdf-split-client";

export const metadata = buildMetadata({
  title: "PDF Split",
  description: "Split PDFs into individual pages or page ranges.",
  path: "/tools/pdf/split",
  keywords: ["split", "pages", "into", "ranges", "page", "individual", "pdfs"],
});

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
  );
}
