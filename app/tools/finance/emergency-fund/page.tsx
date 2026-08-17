import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import EmergencyFundClient from "@/components/tools/finance/emergency-fund-client";

const TITLE = "Emergency Fund Calculator | Toolzium";
const DESCRIPTION = "Calculate required safety net and emergency fund goals based on monthly expenses.";
const PATH = "/tools/finance/emergency-fund";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Emergency Fund Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <EmergencyFundClient />
    </>
  );
}
