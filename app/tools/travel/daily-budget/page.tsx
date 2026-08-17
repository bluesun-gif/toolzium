import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import DailyBudgetClient from "@/components/tools/travel/daily-budget-client";

const TITLE = "Daily Travel Budget Planner | Toolzium";
const DESCRIPTION = "Plan and track daily vacation spending across multiple categories.";
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
