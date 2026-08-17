import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import EisenhowerGoalsClient from "@/components/tools/productivity/eisenhower-goals-client";

const TITLE = "Eisenhower Goal & Action Planner | Toolzium";
const DESCRIPTION = "Map goals to 4 actionable buckets: Do Now, Schedule, Delegate, Delete. Manage your productivity effectively.";
const PATH = "/tools/productivity/eisenhower-goals";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Eisenhower Goal & Action Planner",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <EisenhowerGoalsClient />
    </>
  );
}
