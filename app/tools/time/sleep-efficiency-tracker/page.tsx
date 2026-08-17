import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import SleepEfficiencyTrackerClient from "@/components/tools/time/sleep-efficiency-tracker-client";

const TITLE = "Sleep Efficiency & Quality Tracker | Toolzium";
const DESCRIPTION = "Calculate your sleep efficiency percentage, score, and get recommendations for better sleep hygiene.";
const PATH = "/tools/time/sleep-efficiency-tracker";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Sleep Efficiency & Quality Tracker",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <SleepEfficiencyTrackerClient />
    </>
  );
}
