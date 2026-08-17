import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CapRateCalculatorClient from "@/components/tools/finance/cap-rate-calculator-client";

const TITLE = "AI Real Estate Cap Rate & Cash-on-Cash Investment Auditor";
const DESCRIPTION = "Calculate capitalization rate (Cap Rate), Net Operating Income (NOI), and audit rental property return quality with live AI.";
const PATH = "/tools/finance/cap-rate-calculator";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "AI Real Estate Cap Rate & Cash-on-Cash Investment Auditor",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <CapRateCalculatorClient />
    </>
  );
}
