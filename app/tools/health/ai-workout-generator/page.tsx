import { Metadata } from "next";
import AiWorkoutGeneratorClient from "@/components/tools/health/ai-workout-generator-client";
import RelatedTools from "@/components/shared/related-tools";

export const metadata: Metadata = {
  title: "AI Personal Workout Routine & Training Split Generator | Toolzium",
  description:
    "Generate custom 3, 4, 5, or 6-day workout splits (Push-Pull-Legs, Upper-Lower, Full Body) with rep ranges and progressive overload rules using live AI.",
};

export default function AiWorkoutGeneratorPage() {
  return (
    <><AiWorkoutGeneratorClient />
      <RelatedTools currentToolUrl="/tools/health/ai-workout-generator" />
    </>
  );
}
