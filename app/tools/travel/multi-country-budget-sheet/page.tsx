import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import MultiCountryBudgetSheetClient from "@/components/tools/travel/multi-country-budget-sheet-client";

const TITLE = "Multi-Country Travel Budget & Currency Converter Sheet | Toolzium";
const DESCRIPTION = "Multi-country travel budget planner and currency converter for international trips.";
const PATH = "/tools/travel/multi-country-budget-sheet";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Multi-Country Travel Budget & Currency Converter Sheet",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <MultiCountryBudgetSheetClient />
    </>
  );
}
