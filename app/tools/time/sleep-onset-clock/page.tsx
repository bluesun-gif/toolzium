import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import SleepOnsetClockClient from "@/components/tools/time/sleep-onset-clock-client";

const TITLE = "Sleep Onset Latency & Bedtime Clock | Toolzium";
const DESCRIPTION = "Calculate optimal bedtime and wake-up times accounting for personal sleep latency and 90-minute REM cycles.";
const PATH = "/tools/time/sleep-onset-clock";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Sleep Onset Latency & Bedtime Clock",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <SleepOnsetClockClient />
    </>
  );
}
