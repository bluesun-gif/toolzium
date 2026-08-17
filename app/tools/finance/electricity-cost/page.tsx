import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ElectricityCostClient from "@/components/tools/finance/electricity-cost-client";

const TITLE = "Electricity Cost Calculator | Toolzium";
const DESCRIPTION = "Calculate electricity cost for appliances. Estimate monthly and yearly electricity bills.";
const PATH = "/tools/finance/electricity-cost";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Electricity Cost Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <ElectricityCostClient />
    </>
  );
}
