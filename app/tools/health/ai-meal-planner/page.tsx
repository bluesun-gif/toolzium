import { Metadata } from "next";
import AiMealPlannerClient from "@/components/tools/health/ai-meal-planner-client";

export const metadata: Metadata = {
  title: "AI Daily Meal Plan & Macro Targets Generator | Toolzium",
  description:
    "Custom 1-day meal plans mapped to your exact target calories, diet style (High Protein, Keto, Vegan), and dietary restrictions powered by live AI.",
};

export default function AiMealPlannerPage() {
  return <AiMealPlannerClient />;
}
