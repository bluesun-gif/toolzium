import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import RemSleepAlarmClient from "@/components/tools/time/rem-sleep-alarm-client";

const TITLE = "REM Sleep Cycle & Wakeup Alarm Calculator | Toolzium";
const DESCRIPTION = "Calculate optimal bedtime and wake-up alarm times based on 90-minute REM sleep cycles.";
const PATH = "/tools/time/rem-sleep-alarm";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "REM Sleep Cycle & Wakeup Alarm Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <RemSleepAlarmClient />
    </>
  );
}
