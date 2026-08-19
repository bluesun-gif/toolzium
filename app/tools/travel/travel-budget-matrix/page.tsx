import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import TravelBudgetMatrixClient from "@/components/tools/travel/travel-budget-matrix-client";

const TITLE = "Travel Budget Matrix | Toolzium";
const DESCRIPTION = "Compare travel costs across multiple destinations. Find which trips fit your budget with a side-by-side cost matrix. Free.";
const PATH = "/tools/travel/travel-budget-matrix";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Travel Budget Currency Comparison Matrix",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <TravelBudgetMatrixClient />
    </>
  );
}
