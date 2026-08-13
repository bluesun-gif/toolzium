import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import PdfSignFillClient from "@/components/tools/pdf/pdf-sign-fill-client";

export const metadata = buildMetadata({
  title: "Sign & Fill PDF",
  description: "Fill forms and add digital signatures to PDF files.",
  path: "/tools/pdf/sign-fill",
  keywords: ["forms", "fill", "files", "signatures", "digital"],
});

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
  );
}
