import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import PaceCalorieClient from "@/components/tools/health/pace-calorie-client";

const TITLE = "Running vs Walking Pace & Calorie Calculator | Toolzium";
const DESCRIPTION = "Compare calories burned running vs walking the same distance. Calculate time saved and METs.";
const PATH = "/tools/health/pace-calorie";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Running vs Walking Pace & Calorie Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <PaceCalorieClient />
    </>
  );
}
