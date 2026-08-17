import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import FlightTimeClient from "@/components/tools/travel/flight-time-client";

const TITLE = "Flight Time Calculator | Toolzium";
const DESCRIPTION = "Estimate flight duration and distances between major global cities.";
const PATH = "/tools/travel/flight-time";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Flight Time Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <FlightTimeClient />
    </>
  );
}
