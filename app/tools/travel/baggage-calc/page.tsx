import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import BaggageCalcClient from "@/components/tools/travel/baggage-calc-client";

const TITLE = "Airline Baggage Allowance & Fee Calculator | Toolzium";
const DESCRIPTION = "Calculate total checked bag weight & potential excess baggage fee.";
const PATH = "/tools/travel/baggage-calc";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Airline Baggage Allowance & Fee Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <BaggageCalcClient />
    </>
  );
}
