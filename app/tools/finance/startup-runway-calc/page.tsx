import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import StartupRunwayCalcClient from "@/components/tools/finance/startup-runway-calc-client";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "AI Startup Runway & Net Burn Rate Calculator",
  description: "Calculate startup cash runway months, net burn rate, fundraising urgency timelines, and audit Default Alive vs Default Dead status with live AI.",
  path: "/tools/finance/startup-runway-calc",
  keywords: ["default", "calculate", "timelines", "rate", "cash", "fundraising", "runway", "audit", "burn", "urgency", "startup", "months"],
});

<<<<<<< HEAD
export default function StartupRunwayCalcPage() {
  return (
    <><StartupRunwayCalcClient />
      <RelatedTools currentToolUrl="/tools/finance/startup-runway-calc" />
    </>
=======
export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "AI Startup Runway & Net Burn Rate Calculator",
    description: "Calculate startup cash runway months, net burn rate, fundraising urgency timelines, and audit Default Alive vs Default Dead status with live AI.",
    path: "/tools/finance/startup-runway-calc",
    categoryName: "Finance",
    categoryPath: "/tools/finance",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <StartupRunwayCalcClient />
    </div>
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
  );
}
