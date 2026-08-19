import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import TravelBudgetClient from "@/components/tools/travel/travel-daily-budget-client";

const TITLE = "Daily Travel Budget Calculator | Toolzium";
const DESCRIPTION = "Calculate your daily spending budget for any trip after fixed costs. Track daily allowance and get alerts when overspending. Free.";
const PATH = "/tools/travel/travel-daily-budget";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Travel Daily Expense Budget Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <TravelBudgetClient />
    </>
  );
}
