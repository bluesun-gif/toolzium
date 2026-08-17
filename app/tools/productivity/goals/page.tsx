import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import GoalsClient from "@/components/tools/productivity/goals-client";

const TITLE = "Goal Tracker | Toolzium";
const DESCRIPTION = "Set and track goals with milestones.";
const PATH = "/tools/productivity/goals";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Goal Tracker",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <GoalsClient />
    </>
  );
}
