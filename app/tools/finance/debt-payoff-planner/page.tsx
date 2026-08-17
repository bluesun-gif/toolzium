import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import DebtPayoffPlannerClient from "@/components/tools/finance/debt-payoff-planner-client";

const TITLE = "Debt Snowball vs Avalanche Calculator | Toolzium";
const DESCRIPTION = "Compare Debt Snowball and Avalanche payoff strategies. Calculate debt-free dates and total interest paid.";
const PATH = "/tools/finance/debt-payoff-planner";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Debt Snowball vs Avalanche Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <DebtPayoffPlannerClient />
    </>
  );
}
