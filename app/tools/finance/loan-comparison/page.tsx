import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import LoanComparisonClient from "@/components/tools/finance/loan-comparison-client";

const TITLE = "Loan Comparison Calculator | Toolzium";
const DESCRIPTION = "Compare multiple loan offers side by side to find the cheapest option.";
const PATH = "/tools/finance/loan-comparison";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Loan Comparison Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <LoanComparisonClient />
    </>
  );
}
