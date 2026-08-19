import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import DailyBudgetClient from "@/components/tools/travel/daily-budget-client";

const TITLE = "Daily Travel Budget Tracker | Toolzium";
const DESCRIPTION = "Split your total travel budget into daily allowances and track spending day by day. Never overspend on a trip. Free, works offline.";
const PATH = "/tools/travel/daily-budget";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Daily Travel Budget Planner",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <DailyBudgetClient />
    </>
  );
}
