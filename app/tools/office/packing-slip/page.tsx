import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import PackingSlipClient from "@/components/tools/office/packing-slip-client";

const TITLE = "Packing Slip Generator | Toolzium";
const DESCRIPTION = "Generate professional ecommerce and warehouse packing slips easily.";
const PATH = "/tools/office/packing-slip";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Packing Slip Generator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <PackingSlipClient />
    </>
  );
}
