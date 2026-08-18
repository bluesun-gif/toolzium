import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import BmiCalculatorClient from "@/components/tools/calc/bmi-calculator-client";

const TITLE = "BMI Calculator — Free Body Mass Index Calculator | Toolzium";
const DESCRIPTION =
  "Calculate your BMI instantly with our free online BMI calculator. Enter your height and weight to get your Body Mass Index, WHO health category (underweight, normal, overweight, obese), ideal weight range, and personalized health advice. Supports metric (kg/cm) and imperial (lbs/ft). 100% private — runs entirely in your browser.";
const PATH = "/tools/calc/bmi-calculator";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "BMI Calculator",
    description: DESCRIPTION,
    path: PATH,
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <BmiCalculatorClient />
    </>
  );
}
