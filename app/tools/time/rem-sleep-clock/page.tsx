import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import RemSleepClockClient from "@/components/tools/time/rem-sleep-clock-client";

const TITLE = "REM Sleep Cycle & Optimal Bedtime Clock | Toolzium";
const DESCRIPTION = "Calculate optimal sleep & wake times based on 90-minute REM sleep cycles.";
const PATH = "/tools/time/rem-sleep-clock";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "REM Sleep Cycle & Optimal Bedtime Clock",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <RemSleepClockClient />
    </>
  );
}
