import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import WaterIntakeClient from "@/components/tools/health/water-intake-client";

const TITLE = "Water Intake Calculator — Daily Hydration Goal | Toolzium";
const DESCRIPTION = "Calculate your daily water intake needs based on weight, activity level, and climate. Track your hydration and get personalized drinking schedules.";
const PATH = "/tools/health/water-intake";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Water Intake Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <WaterIntakeClient />
    </>
  );
}
