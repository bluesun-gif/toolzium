import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import EmergencyGoalCalcClient from "@/components/tools/finance/emergency-goal-calc-client";

const TITLE = "Emergency Savings Goal Calculator | Toolzium";
const DESCRIPTION = "Calculate how much you need to save to reach your emergency savings goal. Track interest and milestones.";
const PATH = "/tools/finance/emergency-goal-calc";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Emergency Savings Goal Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <EmergencyGoalCalcClient />
    </>
  );
}
