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

export default function PdfRotatePage() {
  return (
    <><PdfRotateClient />
      <RelatedTools currentToolUrl="/tools/pdf/rotate" />
    </>
  );
}
