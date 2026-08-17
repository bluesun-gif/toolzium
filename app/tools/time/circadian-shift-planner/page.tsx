import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CircadianShiftPlannerClient from "@/components/tools/time/circadian-shift-planner-client";

const TITLE = "Circadian Shift Planner | Toolzium";
const DESCRIPTION = "Calculate optimal sleep schedules and light exposure windows for night shift workers.";
const PATH = "/tools/time/circadian-shift-planner";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Circadian Shift Planner",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <CircadianShiftPlannerClient />
    </>
  );
}
