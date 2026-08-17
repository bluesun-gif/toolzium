import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ProformaInvoiceClient from "@/components/tools/office/proforma-invoice-client";

const TITLE = "Proforma Invoice Generator | Toolzium";
const DESCRIPTION = "Generate preliminary Proforma Invoices for trade proposals with itemized tables, taxes, and shipping estimates.";
const PATH = "/tools/office/proforma-invoice";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Proforma Invoice Generator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <ProformaInvoiceClient />
    </>
  );
}
