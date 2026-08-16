import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import MrrChurnClient from "@/components/tools/finance/mrr-churn-client";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "SaaS Monthly Recurring Revenue (MRR) & Churn Rate Calculator",
  description: "Calculate SaaS metrics: Net MRR Growth, ARR, Churn Rate %, ARPU, and LTV metrics.",
  path: "/tools/finance/mrr-churn-calc",
  keywords: ["calculate", "arpu", "rate", "saas", "churn", "growth", "metrics"],
});

export default function MrrChurnPage() {
  return (
    <><MrrChurnClient />
      <RelatedTools currentToolUrl="/tools/finance/mrr-churn-calc" />
    </>
  );
}
