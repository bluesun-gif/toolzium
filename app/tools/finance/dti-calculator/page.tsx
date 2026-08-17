import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import DtiCalculatorClient from "@/components/tools/finance/dti-calculator-client";

const TITLE = "Debt-to-Income (DTI) Ratio Calculator | Toolzium";
const DESCRIPTION = "Calculate your front-end and back-end debt-to-income ratio for mortgage and loan eligibility.";
const PATH = "/tools/finance/dti-calculator";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Debt-to-Income (DTI) Ratio Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <DtiCalculatorClient />
    </>
  );
}
