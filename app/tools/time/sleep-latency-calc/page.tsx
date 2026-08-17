import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import SleepLatencyClient from "@/components/tools/time/sleep-latency-calc-client";

const TITLE = "Sleep Latency & Sleep Onset Calculator | Toolzium";
const DESCRIPTION = "Calculate optimal bedtimes based on sleep latency and 90-minute REM sleep cycles.";
const PATH = "/tools/time/sleep-latency-calc";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Sleep Latency & Sleep Onset Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <SleepLatencyClient />
    </>
  );
}
