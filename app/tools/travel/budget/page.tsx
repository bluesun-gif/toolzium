import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import TravelBudgetClient from "@/components/tools/travel/budget-client";

const TITLE = "Travel Budget Planner | Toolzium";
const DESCRIPTION = "Plan travel budget with expense categories and daily cost breakdown.";
const PATH = "/tools/travel/budget";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Travel Budget Planner",
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
