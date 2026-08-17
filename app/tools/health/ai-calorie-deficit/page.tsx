import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import AiCalorieDeficitClient from "@/components/tools/health/ai-calorie-deficit-client";

const TITLE = "AI Calorie Deficit & Weight Loss Target Calculator";
const DESCRIPTION = "Calculate daily caloric deficit targets, estimated target weight goal dates, and generate personalized fat loss plans with live AI.";
const PATH = "/tools/health/ai-calorie-deficit";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "AI Calorie Deficit & Weight Loss Target Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <AiCalorieDeficitClient />
    </>
  );
}
