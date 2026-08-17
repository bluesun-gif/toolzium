import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import PdfSignFillClient from "@/components/tools/pdf/pdf-sign-fill-client";

const TITLE = "Sign & Fill PDF";
const DESCRIPTION = "Fill forms and add digital signatures to PDF files.";
const PATH = "/tools/pdf/sign-fill";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Sign & Fill PDF",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <PdfSignFillClient />
    </>
  );
}
