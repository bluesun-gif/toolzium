import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import TaxWithholdingClient from "@/components/tools/finance/tax-withholding-client";

const TITLE = "Tax Withholding Estimator | Toolzium";
const DESCRIPTION = "Estimate US federal tax withholding and effective tax rates based on income and filing status.";
const PATH = "/tools/finance/tax-withholding";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Tax Withholding Estimator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <TaxWithholdingClient />
    </>
  );
}
