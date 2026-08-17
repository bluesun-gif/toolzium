import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import SleepPlannerClient from "@/components/tools/health/sleep-planner-client";

const TITLE = "Sleep Cycle & Bedtime Calculator | Toolzium";
const DESCRIPTION = "Calculate optimal bedtime or wake-up times based on 90-minute REM sleep cycles.";
const PATH = "/tools/health/sleep-planner";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Sleep Cycle & Bedtime Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <SleepPlannerClient />
    </>
  );
}
