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

<<<<<<< HEAD
export default function PdfSignFillPage() {
  return (
    <><PdfSignFillClient />
      <RelatedTools currentToolUrl="/tools/pdf/sign-fill" />
    </>
=======
export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Sign & Fill PDF",
    description: "Fill forms and add digital signatures to PDF files.",
    path: "/tools/pdf/sign-fill",
    categoryName: "Pdf",
    categoryPath: "/tools/pdf",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <PdfSignFillClient />
    </div>
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
  );
}
