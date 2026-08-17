import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import MrrChurnClient from "@/components/tools/finance/mrr-churn-client";

const TITLE = "SaaS Monthly Recurring Revenue (MRR) & Churn Rate Calculator";
const DESCRIPTION = "Calculate SaaS metrics: Net MRR Growth, ARR, Churn Rate %, ARPU, and LTV metrics.";
const PATH = "/tools/finance/mrr-churn-calc";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "SaaS Monthly Recurring Revenue (MRR) & Churn Rate Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <MrrChurnClient />
    </>
  );
}
