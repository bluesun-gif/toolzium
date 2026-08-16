import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import PdfProtectClient from "@/components/tools/pdf/pdf-protect-client";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Protect & Lock PDF",
  description: "Add password protection and permissions to PDF documents.",
  path: "/tools/pdf/protect",
  keywords: ["permissions", "password", "protection", "documents"],
});

<<<<<<< HEAD
export default function PdfProtectPage() {
  return (
    <><PdfProtectClient />
      <RelatedTools currentToolUrl="/tools/pdf/protect" />
    </>
=======
export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Protect & Lock PDF",
    description: "Add password protection and permissions to PDF documents.",
    path: "/tools/pdf/protect",
    categoryName: "Pdf",
    categoryPath: "/tools/pdf",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <PdfProtectClient />
    </div>
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
  );
}
