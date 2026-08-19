import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import TravelBudgetSheetClient from "@/components/tools/travel/travel-budget-sheet-client";

const TITLE = "Travel Budget Sheet | Toolzium";
const DESCRIPTION = "Track your travel budget with planned vs actual spending by category. Log expenses on the go and see your remaining balance. Free.";
const PATH = "/tools/travel/travel-budget-sheet";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Travel Budget Multi-Currency Comparison Sheet",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <TravelBudgetSheetClient />
    </>
  );
}
