import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CurrencyPriceMatrixClient from "@/components/tools/travel/currency-price-matrix-client";

const TITLE = "Currency Price Matrix | Toolzium";
const DESCRIPTION = "Convert any price into 40+ currencies simultaneously. See international costs at live exchange rates. Perfect for travel budgeting. Free.";
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
