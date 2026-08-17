import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import EisenhowerPlannerClient from "@/components/tools/productivity/eisenhower-planner-client";

const TITLE = "Eisenhower Matrix Planner | Toolzium";
const DESCRIPTION = "Organize your tasks by urgency and importance with the Eisenhower Matrix planner.";
const PATH = "/tools/productivity/eisenhower-planner";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Eisenhower Matrix Planner",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <EisenhowerPlannerClient />
    </>
  );
}
