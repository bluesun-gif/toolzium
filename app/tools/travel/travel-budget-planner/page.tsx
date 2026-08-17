import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import TravelBudgetPlannerClient from "@/components/tools/travel/travel-budget-planner-client";

const TITLE = "Travel Multi-Currency Budget Planner | Toolzium";
const DESCRIPTION = "Plan multi-country travel budgets and convert everything back to your base currency.";
const PATH = "/tools/travel/travel-budget-planner";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Travel Multi-Currency Budget Planner",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <TravelBudgetPlannerClient />
    </>
  );
}
