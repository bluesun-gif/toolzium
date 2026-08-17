import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import TravelBudgetSheetClient from "@/components/tools/travel/travel-budget-sheet-client";

const TITLE = "Travel Budget Multi-Currency Comparison Sheet | Toolzium";
const DESCRIPTION = "Multi-currency travel expense comparison and trip budgeting sheet.";
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
