import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import TravelBudgetClient from "@/components/tools/travel/travel-daily-budget-client";

const TITLE = "Travel Daily Expense Budget Calculator | Toolzium";
const DESCRIPTION = "Calculate daily travel expense budgets for domestic or international trips.";
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
