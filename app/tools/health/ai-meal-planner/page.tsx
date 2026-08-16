import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import AiMealPlannerClient from "@/components/tools/health/ai-meal-planner-client";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "AI Daily Meal Plan & Macro Targets Generator",
  description: "Custom 1-day meal plans mapped to your exact target calories, diet style (High Protein, Keto, Vegan), and dietary restrictions powered by live AI.",
  path: "/tools/health/ai-meal-planner",
  keywords: ["meal", "your", "style", "protein", "exact", "diet", "high", "calories", "plans", "custom", "mapped", "target"],
});

export default function AiMealPlannerPage() {
  return (
    <><AiMealPlannerClient />
      <RelatedTools currentToolUrl="/tools/health/ai-meal-planner" />
    </>
  );
}
