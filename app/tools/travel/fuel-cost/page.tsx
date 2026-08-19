import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import FuelCostClient from "@/components/tools/travel/fuel-cost-client";

const TITLE = "Fuel Cost Calculator | Toolzium";
const DESCRIPTION = "Calculate road trip fuel costs based on distance, fuel efficiency, and current fuel price. Supports mpg and L/100km. Free.";
const PATH = "/tools/travel/fuel-cost";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Fuel Cost Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <FuelCostClient />
    </>
  );
}
