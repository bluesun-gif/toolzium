import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import PdfProtectClient from "@/components/tools/pdf/pdf-protect-client";

export const metadata = buildMetadata({
  title: "Protect & Lock PDF",
  description: "Add password protection and permissions to PDF documents.",
  path: "/tools/pdf/protect",
  keywords: ["permissions", "password", "protection", "documents"],
});

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
  );
}
