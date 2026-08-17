import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import TripBudgetMatrixClient from "@/components/tools/travel/trip-budget-matrix-client";

const TITLE = "Currency Trip Budget & Spending Matrix | Toolzium";
const DESCRIPTION = "Comprehensive multi-destination travel budget converter matrix.";
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
