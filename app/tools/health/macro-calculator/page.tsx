import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import MacroCalculatorClient from "@/components/tools/health/macro-calculator-client";

const TITLE = "Macro Calculator | Toolzium";
const DESCRIPTION = "Calculate your daily macronutrient targets (protein, carbs, fats) based on your fitness goals.";
const PATH = "/tools/health/macro-calculator";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Macro Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <MacroCalculatorClient />
    </>
  );
}
