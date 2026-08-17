import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import EllipticalCalorieClient from "@/components/tools/health/elliptical-calorie-client";

const TITLE = "Elliptical Trainer Calorie Calculator | Toolzium";
const DESCRIPTION = "Calculate calories burned during Elliptical Cross-Trainer workouts based on effort, weight, and duration.";
const PATH = "/tools/health/elliptical-calorie";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Elliptical Trainer Calorie Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <EllipticalCalorieClient />
    </>
  );
}
