import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CreditPayoffClient from "@/components/tools/finance/credit-payoff-client";

const TITLE = "Credit Card Payoff Calculator | Toolzium";
const DESCRIPTION = "Calculate time and interest required to pay off credit card debt.";
const PATH = "/tools/finance/credit-payoff";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Credit Card Payoff Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <CreditPayoffClient />
    </>
  );
}
