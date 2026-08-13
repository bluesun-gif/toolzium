import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import AiMealPlannerClient from "@/components/tools/health/ai-meal-planner-client";

export const metadata = buildMetadata({
  title: "AI Daily Meal Plan & Macro Targets Generator",
  description: "Custom 1-day meal plans mapped to your exact target calories, diet style (High Protein, Keto, Vegan), and dietary restrictions powered by live AI.",
  path: "/tools/health/ai-meal-planner",
  keywords: ["meal", "your", "style", "protein", "exact", "diet", "high", "calories", "plans", "custom", "mapped", "target"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "AI Daily Meal Plan & Macro Targets Generator",
    description: "Custom 1-day meal plans mapped to your exact target calories, diet style (High Protein, Keto, Vegan), and dietary restrictions powered by live AI.",
    path: "/tools/health/ai-meal-planner",
    categoryName: "Health",
    categoryPath: "/tools/health",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <AiMealPlannerClient />
    </div>
  );
}
