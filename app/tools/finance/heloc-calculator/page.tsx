import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import HelocCalculatorClient from "@/components/tools/finance/heloc-calculator-client";

const TITLE = "HELOC Payment Calculator | Toolzium";
const DESCRIPTION = "Calculate interest-only draw period and principal + interest repayment period monthly payments for HELOC.";
const PATH = "/tools/finance/heloc-calculator";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "HELOC Payment Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <HelocCalculatorClient />
    </>
  );
}
