import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ReceiptScannerClient from "@/components/tools/office/receipt-scanner-client";

const TITLE = "Receipt Tracker | Toolzium";
const DESCRIPTION = "Track your receipts, categorize expenses, and export to CSV easily.";
const PATH = "/tools/office/receipt-scanner";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Receipt Tracker",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <ReceiptScannerClient />
    </>
  );
}
