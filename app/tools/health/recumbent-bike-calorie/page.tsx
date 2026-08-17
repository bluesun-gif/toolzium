import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import RecumbentBikeCalorieClient from "@/components/tools/health/recumbent-bike-calorie-client";

const TITLE = "Recumbent Exercise Bike Calorie Calculator | Toolzium";
const DESCRIPTION = "Calculate calories burned on a recumbent stationary bike based on weight, duration, intensity, and cadence.";
const PATH = "/tools/health/recumbent-bike-calorie";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Recumbent Exercise Bike Calorie Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <RecumbentBikeCalorieClient />
    </>
  );
}
