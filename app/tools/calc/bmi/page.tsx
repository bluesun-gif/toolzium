import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import BmiCalculatorClient from "@/components/tools/calc/bmi-calculator-client";

const TITLE = "Bmi | Toolzium";
const DESCRIPTION = "Free online bmi tool with instant calculation and privacy.";
const PATH = "/tools/calc/bmi";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Bmi",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <BmiCalculatorClient />
    </>
  );
}
