import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import IndoorCyclingCalorieClient from "@/components/tools/health/indoor-cycling-calorie-client";

const TITLE = "Indoor Cycling & Spin Bike Calorie Calculator — Calories Burned (2026) | Toolzium";
const DESCRIPTION = "Calculate exact calories burned during indoor bike, stationary cycle, Peloton, and spin workouts based on body weight, duration, and MET intensity level.";
const PATH = "/tools/health/indoor-cycling-calorie";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Indoor Cycling & Spin Bike Calorie Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <IndoorCyclingCalorieClient />
    </>
  );
}
