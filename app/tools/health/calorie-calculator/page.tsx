import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CalorieCalculatorClient from "@/components/tools/health/calorie-calculator-client";

const TITLE = "Calorie Calculator | Toolzium";
const DESCRIPTION = "Free online calorie calculator tool with instant calculation and privacy.";
const PATH = "/tools/health/calorie-calculator";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Calorie Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <CalorieCalculatorClient />
    </>
  );
}
