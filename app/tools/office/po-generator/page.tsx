import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import PurchaseOrderClient from "@/components/tools/office/po-generator-client";

const TITLE = "Purchase Order Generator | Toolzium";
const DESCRIPTION = "Generate formal Purchase Orders (PO) online.";
const PATH = "/tools/office/po-generator";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Purchase Order Generator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <PurchaseOrderClient />
    </>
  );
}
