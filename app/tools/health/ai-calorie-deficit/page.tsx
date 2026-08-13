import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import AiCalorieDeficitClient from "@/components/tools/health/ai-calorie-deficit-client";

export const metadata = buildMetadata({
  title: "AI Calorie Deficit & Weight Loss Target Calculator",
  description: "Calculate daily caloric deficit targets, estimated target weight goal dates, and generate personalized fat loss plans with live AI.",
  path: "/tools/health/ai-calorie-deficit",
  keywords: ["weight", "daily", "calculate", "estimated", "generate", "personalized", "deficit", "dates", "caloric", "target", "goal", "targets"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "AI Calorie Deficit & Weight Loss Target Calculator",
    description: "Calculate daily caloric deficit targets, estimated target weight goal dates, and generate personalized fat loss plans with live AI.",
    path: "/tools/health/ai-calorie-deficit",
    categoryName: "Health",
    categoryPath: "/tools/health",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <AiCalorieDeficitClient />
    </div>
  );
}
