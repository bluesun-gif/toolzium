import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import VatCalculatorClient from "@/components/tools/finance/vat-calculator-client";

const TITLE = "Vat | Toolzium";
const DESCRIPTION = "Free online vat tool with instant calculation and privacy.";
const PATH = "/tools/finance/vat";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Vat",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <VatCalculatorClient />
    </>
  );
}
