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

export default function PdfProtectPage() {
  return (
    <><PdfProtectClient />
      <RelatedTools currentToolUrl="/tools/pdf/protect" />
    </>
  );
}
