import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import TravelBudgetCalcSheetClient from "@/components/tools/travel/travel-budget-calc-sheet-client";

const TITLE = "Multi-Currency Travel Budget Calculator | Toolzium";
const DESCRIPTION = "Multi-currency travel expense comparison and trip budgeting sheet.";
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
