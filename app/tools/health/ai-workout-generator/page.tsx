import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import AiWorkoutGeneratorClient from "@/components/tools/health/ai-workout-generator-client";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "AI Personal Workout Routine & Training Split Generator",
  description: "Generate custom 3, 4, 5, or 6-day workout splits (Push-Pull-Legs, Upper-Lower, Full Body) with rep ranges and progressive overload rules using live AI.",
  path: "/tools/health/ai-workout-generator",
  keywords: ["with", "splits", "generate", "full", "legs", "push", "workout", "upper", "body", "lower", "custom", "pull"],
});

export default function AiWorkoutGeneratorPage() {
  return (
    <><AiWorkoutGeneratorClient />
      <RelatedTools currentToolUrl="/tools/health/ai-workout-generator" />
    </>
  );
}
