import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import PriorityActionPlannerClient from "@/components/tools/productivity/priority-action-planner-client";

const TITLE = "Priority Matrix Action Planner | Toolzium";
const DESCRIPTION = "Eisenhower Priority Matrix action planner for daily workflows. Organize tasks by urgency and importance.";
const PATH = "/tools/productivity/priority-action-planner";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Priority Matrix Action Planner",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <PriorityActionPlannerClient />
    </>
  );
}
