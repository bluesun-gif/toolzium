import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import SleepEfficiencyClient from "@/components/tools/time/sleep-efficiency-client";

const TITLE = "Sleep Efficiency & Quality Score Calculator | Toolzium";
const DESCRIPTION = "Calculate your Sleep Efficiency Percentage and Quality Score based on time in bed and actual time asleep.";
const PATH = "/tools/time/sleep-efficiency";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Sleep Efficiency & Quality Score Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <SleepEfficiencyClient />
    </>
  );
}
