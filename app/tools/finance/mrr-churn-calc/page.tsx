import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import MrrChurnClient from "@/components/tools/finance/mrr-churn-client";

export const metadata = buildMetadata({
  title: "SaaS Monthly Recurring Revenue (MRR) & Churn Rate Calculator",
  description: "Calculate SaaS metrics: Net MRR Growth, ARR, Churn Rate %, ARPU, and LTV metrics.",
  path: "/tools/finance/mrr-churn-calc",
  keywords: ["calculate", "arpu", "rate", "saas", "churn", "growth", "metrics"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "SaaS Monthly Recurring Revenue (MRR) & Churn Rate Calculator",
    description: "Calculate SaaS metrics: Net MRR Growth, ARR, Churn Rate %, ARPU, and LTV metrics.",
    path: "/tools/finance/mrr-churn-calc",
    categoryName: "Finance",
    categoryPath: "/tools/finance",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <MrrChurnClient />
    </div>
  );
}
