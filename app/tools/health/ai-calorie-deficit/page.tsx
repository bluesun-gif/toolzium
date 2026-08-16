import { Metadata } from "next";
import AiCalorieDeficitClient from "@/components/tools/health/ai-calorie-deficit-client";
import RelatedTools from "@/components/shared/related-tools";

export const metadata: Metadata = {
  title: "AI Calorie Deficit & Weight Loss Target Calculator | Toolzium",
  description:
    "Calculate daily caloric deficit targets, estimated target weight goal dates, and generate personalized fat loss plans with live AI.",
};

export default function AiCalorieDeficitPage() {
  return (
    <><AiCalorieDeficitClient />
      <RelatedTools currentToolUrl="/tools/health/ai-calorie-deficit" />
    </>
  );
}
