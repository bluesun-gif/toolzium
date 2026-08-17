import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CurrencyConverterClient from "@/components/tools/calc/currency-converter-client";

const TITLE = "Currency | Toolzium";
const DESCRIPTION = "Free online currency tool with instant calculation and privacy.";
const PATH = "/tools/calc/currency";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Currency",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <CurrencyConverterClient />
    </>
  );
}
