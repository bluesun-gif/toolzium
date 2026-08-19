import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import FuelEfficiencyClient from "@/components/tools/travel/fuel-efficiency-client";

const TITLE = "Fuel Efficiency Calculator | Toolzium";
const DESCRIPTION = "Calculate your vehicle's fuel efficiency in mpg, km/L, and L/100km from fuel used and distance driven. Instant results. Free.";
const PATH = "/tools/travel/fuel-efficiency";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Fuel Efficiency Converter",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <FuelEfficiencyClient />
    </>
  );
}
