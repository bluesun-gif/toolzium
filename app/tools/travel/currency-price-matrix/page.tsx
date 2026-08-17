import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CurrencyPriceMatrixClient from "@/components/tools/travel/currency-price-matrix-client";

const TITLE = "Currency Price Matrix | Toolzium";
const DESCRIPTION = "Multi-item travel cost converter and comparison sheet.";
const PATH = "/tools/travel/currency-price-matrix";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Currency Price Matrix",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <CurrencyPriceMatrixClient />
    </>
  );
}
