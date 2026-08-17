import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CyclingCalorieClient from "@/components/tools/health/cycling-calorie-client";

const TITLE = "Cycling & Biking Calorie & Power Calculator | Toolzium";
const DESCRIPTION = "Calculate calories burned and estimated mechanical power output (Watts) during your cycling sessions based on intensity and terrain.";
const PATH = "/tools/health/cycling-calorie";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Cycling & Biking Calorie & Power Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <CyclingCalorieClient />
    </>
  );
}
