import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import LtvCalculatorClient from "@/components/tools/finance/ltv-calculator-client";

const TITLE = "Free LTV Calculator (2026) — Calculate Loan-to-Value & CLTV Ratio";
const DESCRIPTION = "Free Loan-to-Value (LTV) and Combined LTV (CLTV) calculator. Estimate home equity, cash-out refinance limits, and PMI requirements instantly.";
const PATH = "/tools/finance/ltv-calculator";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Free LTV Calculator (2026)",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <LtvCalculatorClient />
    </>
  );
}
