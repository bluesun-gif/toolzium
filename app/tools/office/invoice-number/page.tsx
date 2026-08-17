import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import InvoiceNumberClient from "@/components/tools/office/invoice-number-client";

const TITLE = "Invoice Number Generator | Toolzium";
const DESCRIPTION = "Generate and format sequential invoice numbers in batches.";
const PATH = "/tools/office/invoice-number";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Invoice Number Generator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <InvoiceNumberClient />
    </>
  );
}
