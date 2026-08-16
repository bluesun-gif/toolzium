import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import SavingsGoalClient from "@/components/tools/finance/savings-goal-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "Savings Goal Calculator",
  description: "Calculate how much to save monthly to reach your financial goals. Savings calculator with compound interest and target date. Plan your savings strategy effectively.",
  path: "/tools/finance/savings-goal",
  keywords: ["compound", "calculate", "your", "with", "financial", "reach", "savings", "calculator", "much", "save", "monthly", "goals"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Savings Goal Calculator",
    description: "Calculate how much to save monthly to reach your financial goals. Savings calculator with compound interest and target date. Plan your savings strategy effectively.",
    path: "/tools/finance/savings-goal",
    categoryName: "Finance",
    categoryPath: "/tools/finance",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <SavingsGoalClient />
    
      <RelatedTools currentToolUrl="/tools/finance/savings-goal" />
</div>
  );
}
