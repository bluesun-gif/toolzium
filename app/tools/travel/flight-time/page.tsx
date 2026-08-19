import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import FlightTimeClient from "@/components/tools/travel/flight-time-client";

const TITLE = "Flight Time Calculator | Toolzium";
const DESCRIPTION = "Calculate exact local arrival time for any flight route. Accounts for timezones, date changes, and international date line crossings. Free.";
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
