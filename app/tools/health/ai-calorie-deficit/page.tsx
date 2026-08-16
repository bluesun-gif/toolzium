import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import AiCalorieDeficitClient from "@/components/tools/health/ai-calorie-deficit-client";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "AI Calorie Deficit & Weight Loss Target Calculator",
  description: "Calculate daily caloric deficit targets, estimated target weight goal dates, and generate personalized fat loss plans with live AI.",
  path: "/tools/health/ai-calorie-deficit",
  keywords: ["weight", "daily", "calculate", "estimated", "generate", "personalized", "deficit", "dates", "caloric", "target", "goal", "targets"],
});

export default function AiCalorieDeficitPage() {
  return (
    <><AiCalorieDeficitClient />
      <RelatedTools currentToolUrl="/tools/health/ai-calorie-deficit" />
    </>
  );
}
