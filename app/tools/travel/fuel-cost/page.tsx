import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import FuelCostClient from "@/components/tools/travel/fuel-cost-client";

const TITLE = "Fuel Cost Calculator | Toolzium";
const DESCRIPTION = "Calculate and compare fuel costs for your trips across multiple vehicles. Supports metric and imperial units.";
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
