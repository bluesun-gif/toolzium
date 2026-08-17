import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import AiMealPlannerClient from "@/components/tools/health/ai-meal-planner-client";

const TITLE = "AI Daily Meal Plan & Macro Targets Generator";
const DESCRIPTION = "Custom 1-day meal plans mapped to your exact target calories, diet style (High Protein, Keto, Vegan), and dietary restrictions powered by live AI.";
const PATH = "/tools/health/ai-meal-planner";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "AI Daily Meal Plan & Macro Targets Generator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <AiMealPlannerClient />
    </>
  );
}
