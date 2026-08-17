import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import PdfProtectClient from "@/components/tools/pdf/pdf-protect-client";

const TITLE = "Protect & Lock PDF";
const DESCRIPTION = "Add password protection and permissions to PDF documents.";
const PATH = "/tools/pdf/protect";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Protect & Lock PDF",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <PdfProtectClient />
    </>
  );
}
