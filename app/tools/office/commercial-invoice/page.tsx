import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CommercialInvoiceClient from "@/components/tools/office/commercial-invoice-client";

const TITLE = "Commercial Invoice Generator | Toolzium";
const DESCRIPTION = "Generate international trade Commercial Invoices with ease.";
const PATH = "/tools/office/commercial-invoice";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Commercial Invoice Generator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <CommercialInvoiceClient />
    </>
  );
}
