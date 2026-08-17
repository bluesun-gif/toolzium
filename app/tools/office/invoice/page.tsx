import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CommercialInvoiceClient from "@/components/tools/office/commercial-invoice-client";

const TITLE = "Invoice | Toolzium";
const DESCRIPTION = "Free online invoice tool with instant calculation and privacy.";
const PATH = "/tools/office/invoice";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Invoice",
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
