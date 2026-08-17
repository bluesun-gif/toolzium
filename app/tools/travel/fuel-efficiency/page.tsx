import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import FuelEfficiencyClient from "@/components/tools/travel/fuel-efficiency-client";

const TITLE = "Fuel Efficiency Converter | Toolzium";
const DESCRIPTION = "Convert between fuel efficiency units: MPG (US), MPG (UK), L/100km, km/L instantly.";
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
