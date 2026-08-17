import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import BmiCalculatorClient from "@/components/tools/calc/bmi-calculator-client";

const TITLE = "BMI Calculator";
const DESCRIPTION = "Calculate Body Mass Index (BMI) instantly from height and weight. Free BMI calculator with health category classification. Check if you";
const PATH = "/tools/calc/bmi-calculator";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "BMI Calculator",
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
