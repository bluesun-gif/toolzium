import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import PdfRotateClient from "@/components/tools/pdf/pdf-rotate-client";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "PDF Page Rotate",
  description: "Rotate selected PDF pages clockwise or counter-clockwise.",
  path: "/tools/pdf/rotate",
  keywords: ["rotate", "pages", "selected", "clockwise", "counter"],
});

<<<<<<< HEAD
export default function PdfRotatePage() {
  return (
    <><PdfRotateClient />
      <RelatedTools currentToolUrl="/tools/pdf/rotate" />
    </>
=======
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
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
  );
}
