import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import HabitScoreClient from "@/components/tools/health/habit-score-client";

const TITLE = "Habit Score Calculator | Toolzium";
const DESCRIPTION = "Rate your daily habits and get a wellness score.";
const PATH = "/tools/health/habit-score";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Habit Score Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <HabitScoreClient />
    </>
  );
}
