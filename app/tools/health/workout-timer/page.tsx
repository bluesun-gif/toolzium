import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import WorkoutTimerClient from "@/components/tools/health/workout-timer-client";

const TITLE = "Workout Timer | Toolzium";
const DESCRIPTION = "Interval training timer for Tabata, HIIT, and EMOM workouts. Customizable work and rest durations.";
const PATH = "/tools/health/workout-timer";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Workout Timer",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <WorkoutTimerClient />
    </>
  );
}
