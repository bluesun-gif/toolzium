import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import TravelBudgetCalcSheetClient from "@/components/tools/travel/travel-budget-calc-sheet-client";

const TITLE = "Travel Budget Calculator Sheet | Toolzium";
const DESCRIPTION = "Plan your complete trip budget in a spreadsheet — flights, hotels, food, and activities. Split costs for group travel. Export to Excel. Free.";
const PATH = "/tools/travel/travel-budget-calc-sheet";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Multi-Currency Travel Budget Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <TravelBudgetCalcSheetClient />
    </>
  );
}
