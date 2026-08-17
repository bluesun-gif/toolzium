import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import StartupRunwayCalcClient from "@/components/tools/finance/startup-runway-calc-client";

const TITLE = "AI Startup Runway & Net Burn Rate Calculator";
const DESCRIPTION = "Calculate startup cash runway months, net burn rate, fundraising urgency timelines, and audit Default Alive vs Default Dead status with live AI.";
const PATH = "/tools/finance/startup-runway-calc";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "AI Startup Runway & Net Burn Rate Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <StartupRunwayCalcClient />
    </>
  );
}
