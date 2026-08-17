import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import DebtPayoffClient from "@/components/tools/finance/debt-payoff-client";

const TITLE = "Debt Payoff Calculator | Toolzium";
const DESCRIPTION = "Calculate how long it takes to pay off your debt and how extra payments can help.";
const PATH = "/tools/finance/debt-payoff";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Debt Payoff Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <DebtPayoffClient />
    </>
  );
}
