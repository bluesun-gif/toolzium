import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import AiBmrCalculatorClient from "@/components/tools/health/ai-bmr-calculator-client";

const TITLE = "AI BMR & TDEE Metabolism Calculator Studio";
const DESCRIPTION = "Calculate Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE) with Mifflin-St Jeor equation and AI metabolic optimization.";
const PATH = "/tools/health/ai-bmr-calculator";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "AI BMR & TDEE Metabolism Calculator Studio",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <AiBmrCalculatorClient />
    </>
  );
}
