import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import HabitPlannerClient from "@/components/tools/productivity/habit-planner-client";

const TITLE = "Weekly Habit & Routine Planner | Toolzium";
const DESCRIPTION = "Track your habits and routines weekly. Build streaks and improve productivity.";
const PATH = "/tools/productivity/habit-planner";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Weekly Habit & Routine Planner",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <HabitPlannerClient />
    </>
  );
}
