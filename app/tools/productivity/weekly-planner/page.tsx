import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import WeeklyPlannerClient from "@/components/tools/productivity/weekly-planner-client";

const TITLE = "Weekly Planner | Toolzium";
const DESCRIPTION = "Plan your week with a visual calendar grid.";
const PATH = "/tools/productivity/weekly-planner";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Weekly Planner",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <WeeklyPlannerClient />
    </>
  );
}
