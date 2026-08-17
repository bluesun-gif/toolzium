import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import BmrCalculatorClient from "@/components/tools/health/bmr-calculator-client";

const TITLE = "BMR Calculator | Basal Metabolic Rate Tool | Toolzium";
const DESCRIPTION = "Calculate your Basal Metabolic Rate (BMR) and daily calorie needs using the Mifflin-St Jeor and Harris-Benedict equations.";
const PATH = "/tools/health/bmr-calculator";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "BMR Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <BmrCalculatorClient />
    </>
  );
}
