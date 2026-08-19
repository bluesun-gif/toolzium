import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import TripBudgetMatrixClient from "@/components/tools/travel/trip-budget-matrix-client";

const TITLE = "Trip Budget Comparison Matrix | Toolzium";
const DESCRIPTION = "Compare multiple trip options by cost, value, and your personal priorities. Make the best travel decision with a weighted budget matrix. Free.";
const PATH = "/tools/travel/trip-budget-matrix";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Currency Trip Budget & Spending Matrix",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <TripBudgetMatrixClient />
    </>
  );
}
