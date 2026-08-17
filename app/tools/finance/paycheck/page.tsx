import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import PaycheckCalculatorClient from "@/components/tools/finance/paycheck-client";

const TITLE = "Paycheck Calculator | Toolzium";
const DESCRIPTION = "Calculate your take-home pay with taxes and deductions.";
const PATH = "/tools/finance/paycheck";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Paycheck Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <PaycheckCalculatorClient />
    </>
  );
}
