import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import PdfRotateClient from "@/components/tools/pdf/pdf-rotate-client";

export const metadata = buildMetadata({
  title: "PDF Page Rotate",
  description: "Rotate selected PDF pages clockwise or counter-clockwise.",
  path: "/tools/pdf/rotate",
  keywords: ["rotate", "pages", "selected", "clockwise", "counter"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "PDF Page Rotate",
    description: "Rotate selected PDF pages clockwise or counter-clockwise.",
    path: "/tools/pdf/rotate",
    categoryName: "Pdf",
    categoryPath: "/tools/pdf",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <PdfRotateClient />
    </div>
  );
}
