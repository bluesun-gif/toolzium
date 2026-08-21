import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import BmiCalculatorClient from "@/components/tools/calc/bmi-calculator-client";

const TITLE = "Free Online BMI Calculator - Body Mass Index & Ideal Weight Range";
const DESCRIPTION =
  "Calculate your Body Mass Index (BMI) instantly. Free online BMI calculator with Metric (kg/cm) and Imperial (lbs/ft) support, WHO health categories, and ideal weight targets.";
const PATH = "/tools/calc/bmi";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "bmi calculator",
    "body mass index calculator",
    "calculate bmi",
    "ideal weight calculator",
    "healthy weight range",
    "bmi chart",
    "who bmi categories",
    "metric bmi calculator",
    "imperial bmi calculator",
  ],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Free Online BMI Calculator & Ideal Weight Suite",
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
