import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import PomodoroAnalyticsClient from "@/components/tools/productivity/pomodoro-analytics-client";

const TITLE = "Pomodoro Tracker & Log | Toolzium";
const DESCRIPTION = "Advanced Pomodoro timer with daily productivity logging, task tagging, and focus analytics.";
const PATH = "/tools/productivity/pomodoro-analytics";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Pomodoro Tracker & Log",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <PomodoroAnalyticsClient />
    </>
  );
}
