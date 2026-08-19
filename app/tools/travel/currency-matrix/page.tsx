import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CurrencyMatrixClient from "@/components/tools/travel/currency-matrix-client";

const TITLE = "Currency Comparison Matrix | Toolzium";
const DESCRIPTION = "Compare exchange rates across 40+ currencies in a matrix grid. All pairs shown simultaneously with live rates. Export to CSV. Free.";
const PATH = "/tools/travel/currency-matrix";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Multi-Currency Exchange Matrix",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <CurrencyMatrixClient />
    </>
  );
}
