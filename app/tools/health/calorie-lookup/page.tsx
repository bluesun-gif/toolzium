import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CalorieLookupClient from "@/components/tools/health/calorie-lookup-client";

const TITLE = "Calorie Lookup & Meal Planner | Toolzium";
const DESCRIPTION = "Look up calories and macros for common foods and build a daily meal plan.";
const PATH = "/tools/health/calorie-lookup";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Calorie Lookup & Meal Planner",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <CalorieLookupClient />
    </>
  );
}
