import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import InvoiceTrackerClient from "@/components/tools/finance/invoice-tracker-client";

const TITLE = "Invoice Payment Tracker | Toolzium";
const DESCRIPTION = "Track your invoices, payments, and outstanding balances.";
const PATH = "/tools/finance/invoice-tracker";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Invoice Payment Tracker",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <InvoiceTrackerClient />
    </>
  );
}
