import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CalorieActivityClient from "@/components/tools/health/calorie-activity-client";

const TITLE = "Calorie Burn by Activity Calculator | Toolzium";
const DESCRIPTION = "Calculate calories burned for over 40 physical activities and sports based on your body weight and duration.";
const PATH = "/tools/health/calorie-activity";

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
      <CalorieActivityClient />
    </>
  );
}
