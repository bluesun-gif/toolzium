import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import RowingCalorieClient from "@/components/tools/health/rowing-calorie-client";

const TITLE = "Rowing Machine Calorie Calculator | Toolzium";
const DESCRIPTION = "Calculate calories burned and average split pace during rowing machine (ergometer) workouts.";
const PATH = "/tools/health/rowing-calorie";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Rowing Machine Calorie Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <RowingCalorieClient />
    </>
  );
}
