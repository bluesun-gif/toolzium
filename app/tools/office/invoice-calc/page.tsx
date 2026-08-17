import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import InvoiceCalcClient from "@/components/tools/office/invoice-calc-client";

const TITLE = "Invoice Line Item Calculator | Toolzium";
const DESCRIPTION = "Quick invoice total & tax breakdown calculator with multiple line items.";
const PATH = "/tools/office/invoice-calc";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Invoice Line Item Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <InvoiceCalcClient />
    </>
  );
}
