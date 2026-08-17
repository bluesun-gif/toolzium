import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import TaxWithholdingCalcClient from "@/components/tools/finance/tax-withholding-calc-client";

const TITLE = "Tax Withholding Calculator — Free Federal Paycheck Tax Calculator";
const DESCRIPTION = "Estimate your paycheck federal tax withholding, net take-home pay, and effective tax rate based on W-4 filing parameters.";
const PATH = "/tools/finance/tax-withholding-calc";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Tax Withholding Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <TaxWithholdingCalcClient />
    </>
  );
}
