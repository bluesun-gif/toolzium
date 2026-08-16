import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import PdfSignFillClient from "@/components/tools/pdf/pdf-sign-fill-client";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Sign & Fill PDF",
  description: "Fill forms and add digital signatures to PDF files.",
  path: "/tools/pdf/sign-fill",
  keywords: ["forms", "fill", "files", "signatures", "digital"],
});

export default function PdfSignFillPage() {
  return (
    <><PdfSignFillClient />
      <RelatedTools currentToolUrl="/tools/pdf/sign-fill" />
    </>
  );
}
