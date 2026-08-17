import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import EmergencyLoanClient from "@/components/tools/finance/emergency-loan-client";

const TITLE = "Emergency Loan vs Savings Comparison | Toolzium";
const DESCRIPTION = "Compare the financial impact of using emergency savings versus taking a loan.";
const PATH = "/tools/finance/emergency-loan";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Emergency Loan vs Savings Comparison",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <EmergencyLoanClient />
    </>
  );
}
