import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import SunCalculatorClient from "@/components/tools/time/sun-calculator-client";

const TITLE = "Sunrise & Sunset Calculator | Toolzium";
const DESCRIPTION = "Calculate sunrise, sunset, dawn, dusk, golden hour, and day length for any date and city.";
const PATH = "/tools/time/sun-calculator";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Sunrise & Sunset Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <SunCalculatorClient />
    </>
  );
}
