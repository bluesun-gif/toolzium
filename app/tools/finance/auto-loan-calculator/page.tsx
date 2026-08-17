import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import AutoLoanCalculatorClient from "@/components/tools/finance/auto-loan-calculator-client";

const TITLE = "Auto Loan Monthly Payment & Amortization Calculator | Toolzium";
const DESCRIPTION = "Calculate auto loan monthly payments, total interest, sales tax, and trade-in value deductions.";
const PATH = "/tools/finance/auto-loan-calculator";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Auto Loan Monthly Payment & Amortization Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <AutoLoanCalculatorClient />
    </>
  );
}
