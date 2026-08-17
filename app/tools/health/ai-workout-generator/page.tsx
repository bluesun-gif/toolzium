import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import AiWorkoutGeneratorClient from "@/components/tools/health/ai-workout-generator-client";

const TITLE = "AI Personal Workout Routine & Training Split Generator";
const DESCRIPTION = "Generate custom 3, 4, 5, or 6-day workout splits (Push-Pull-Legs, Upper-Lower, Full Body) with rep ranges and progressive overload rules using live AI.";
const PATH = "/tools/health/ai-workout-generator";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "AI Personal Workout Routine & Training Split Generator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <AiWorkoutGeneratorClient />
    </>
  );
}
