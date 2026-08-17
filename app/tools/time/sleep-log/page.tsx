import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import SleepLogClient from "@/components/tools/time/sleep-log-client";

const TITLE = "Sleep Log & Circadian Rhythm Tracker | Toolzium";
const DESCRIPTION = "Log and analyze daily sleep patterns, calculate average sleep duration, and track sleep consistency.";
const PATH = "/tools/time/sleep-log";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Sleep Log & Circadian Rhythm Tracker",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <SleepLogClient />
    </>
  );
}
