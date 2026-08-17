import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import NetPayCalcClient from "@/components/tools/finance/net-pay-calc-client";

const TITLE = "Salary / Net Pay Calculator — Free Take-Home Paycheck Calculator";
const DESCRIPTION = "Calculate your net take-home paycheck after federal taxes, FICA (Social Security & Medicare), 401(k) retirement savings, and health insurance.";
const PATH = "/tools/finance/net-pay-calc";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Salary / Net Pay Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <NetPayCalcClient />
    </>
  );
}
