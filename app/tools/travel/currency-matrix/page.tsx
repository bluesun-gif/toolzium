import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CurrencyMatrixClient from "@/components/tools/travel/currency-matrix-client";

const TITLE = "Multi-Currency Exchange Matrix | Toolzium";
const DESCRIPTION = "View cross-rate exchange matrix for multiple currencies simultaneously. Great for multi-country travel planning.";
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
