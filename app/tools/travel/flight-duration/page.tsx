import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import FlightDurationClient from "@/components/tools/travel/flight-duration-client";

const TITLE = "Flight Duration & Time Difference Calculator | Toolzium";
const DESCRIPTION = "Calculate actual flight duration accounting for time zone shifts.";
const PATH = "/tools/travel/flight-duration";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Flight Duration & Time Difference Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <FlightDurationClient />
    </>
  );
}
