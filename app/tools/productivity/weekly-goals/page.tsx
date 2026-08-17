import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import WeeklyGoalsClient from "@/components/tools/productivity/weekly-goals-client";

const TITLE = "Weekly Goals & Milestone Planner | Toolzium";
const DESCRIPTION = "Set primary weekly focus goals, break them down into daily tasks, and track your progress.";
const PATH = "/tools/productivity/weekly-goals";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Weekly Goals & Milestone Planner",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <WeeklyGoalsClient />
    </>
  );
}
