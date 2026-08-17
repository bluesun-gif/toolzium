import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import PaycheckDeductionsClient from "@/components/tools/finance/paycheck-deductions-client";

const TITLE = "Paycheck Deductions & Take-Home Calculator | Toolzium";
const DESCRIPTION = "Calculate your net paycheck take-home pay after itemized taxes and voluntary deductions.";
const PATH = "/tools/finance/paycheck-deductions";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Paycheck Deductions & Take-Home Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <PaycheckDeductionsClient />
    </>
  );
}
