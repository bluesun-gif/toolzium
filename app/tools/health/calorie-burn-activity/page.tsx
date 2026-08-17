import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CalorieBurnActivityClient from "@/components/tools/health/calorie-burn-activity-client";

const TITLE = "Calorie Burn by Activity Calculator — Free Exercise Burn Estimator";
const DESCRIPTION = "Calculate exact calories burned across 30+ physical activities, sports, and exercise routines based on body weight and duration.";
const PATH = "/tools/health/calorie-burn-activity";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Calorie Burn by Activity Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <CalorieBurnActivityClient />
    </>
  );
}
