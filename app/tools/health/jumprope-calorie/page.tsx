import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import JumpropeCalorieClient from "@/components/tools/health/jumprope-calorie-client";

const TITLE = "Jump Rope & HIIT Calorie Calculator | Toolzium";
const DESCRIPTION = "Calculate total calories burned during jump rope and High-Intensity Interval Training (HIIT) workouts.";
const PATH = "/tools/health/jumprope-calorie";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Jump Rope & HIIT Calorie Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <JumpropeCalorieClient />
    </>
  );
}
