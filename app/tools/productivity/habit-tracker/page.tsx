import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import HabitTrackerClient from "@/components/tools/productivity/habit-tracker-client";

const TITLE = "Habit Tracker — Build Good Habits Daily | Toolzium";
const DESCRIPTION = "Track your daily habits, build streaks, and stay motivated with our interactive habit tracker. Completely free and runs in your browser.";
const PATH = "/tools/productivity/habit-tracker";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Habit Tracker",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <HabitTrackerClient />
    </>
  );
}
