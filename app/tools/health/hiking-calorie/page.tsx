import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import HikingCalorieClient from "@/components/tools/health/hiking-calorie-client";

const TITLE = "Hiking & Elevation Gain Calorie Calculator | Toolzium";
const DESCRIPTION = "Calculate calories burned during hiking based on body weight, pack weight, distance, and elevation gain.";
const PATH = "/tools/health/hiking-calorie";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Hiking & Elevation Gain Calorie Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <HikingCalorieClient />
    </>
  );
}
