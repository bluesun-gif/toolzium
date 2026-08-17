import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import RemBedtimeClockClient from "@/components/tools/time/rem-bedtime-clock-client";

const TITLE = "REM Sleep Cycle & Bedtime Alarm Clock | Toolzium";
const DESCRIPTION = "Calculate optimal bedtime and wake-up alarm times based on 90-minute REM sleep cycles.";
const PATH = "/tools/time/rem-bedtime-clock";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "REM Sleep Cycle & Bedtime Alarm Clock",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <RemBedtimeClockClient />
    </>
  );
}
