import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import LoanAmortizationClient from "@/components/tools/finance/loan-amortization-client";

const TITLE = "Loan Amortization Schedule & Calculator | Toolzium";
const DESCRIPTION = "Calculate your monthly loan payment and view a full itemized amortization schedule. See the impact of extra monthly principal payments.";
const PATH = "/tools/finance/loan-amortization";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Loan Amortization Schedule & Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <LoanAmortizationClient />
    </>
  );
}
