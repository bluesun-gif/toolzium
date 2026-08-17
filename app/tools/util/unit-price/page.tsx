import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import UnitPriceClient from "@/components/tools/util/unit-price-client";

const TITLE = "Unit Price | Toolzium";
const DESCRIPTION = "Free online unit price tool with instant calculation and privacy.";
const PATH = "/tools/util/unit-price";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Unit Price",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <UnitPriceClient />
    </>
  );
}
