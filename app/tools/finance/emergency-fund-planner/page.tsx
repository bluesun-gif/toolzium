import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import EmergencyFundPlannerClient from "@/components/tools/finance/emergency-fund-planner-client";

const TITLE = "Emergency Fund Savings & Target Planner | Toolzium";
const DESCRIPTION = "Calculate your recommended safety net emergency fund size and monthly savings target timeline based on essential expenses.";
const PATH = "/tools/finance/emergency-fund-planner";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Emergency Fund Savings & Target Planner",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <EmergencyFundPlannerClient />
    </>
  );
}
