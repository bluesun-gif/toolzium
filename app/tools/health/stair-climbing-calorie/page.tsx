import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import StairClimbingCalorieClient from "@/components/tools/health/stair-climbing-calorie-client";

const TITLE = "Stair Climbing & Step Workout Calorie Calculator | Toolzium";
const DESCRIPTION = "Calculate calories burned during stair climbing and step workouts based on weight, duration, flights of stairs, and intensity.";
const PATH = "/tools/health/stair-climbing-calorie";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Stair Climbing & Step Workout Calorie Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <StairClimbingCalorieClient />
    </>
  );
}
