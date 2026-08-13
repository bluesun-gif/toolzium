import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import NetPayCalcClient from "@/components/tools/finance/net-pay-calc-client";

export const metadata = buildMetadata({
  title: "Salary / Net Pay Calculator — Free Take-Home Paycheck Calculator",
  description:
    "Calculate your net take-home paycheck after federal taxes, FICA (Social Security & Medicare), 401(k) retirement savings, and health insurance.",
  path: "/tools/finance/net-pay-calc",
  keywords: [
    "salary net pay calculator",
    "take home pay calculator",
    "paycheck net calculator",
    "net income calculator",
    "after tax salary calculator",
    "payroll net pay estimator",
  ],
});

export default function NetPayCalcPage() {
  const jsonLd = buildToolJsonLd({
    name: "Salary / Net Pay Calculator",
    description:
      "Calculate your net take-home paycheck after federal taxes, FICA (Social Security & Medicare), 401(k) retirement savings, and health insurance.",
    path: "/tools/finance/net-pay-calc",
    categoryName: "Finance",
    categoryPath: "/tools/finance",
    faqs: [
      {
        question: "What is FICA tax on my paycheck?",
        answer:
          "FICA stands for Federal Insurance Contributions Act. It includes Social Security tax (6.2%) and Medicare tax (1.45%) totaling 7.65% withheld from gross earnings.",
      },
      {
        question: "How do pre-tax deductions save money on taxes?",
        answer:
          "Pre-tax contributions (like 401k or HSA) reduce your gross taxable income before federal income tax rates are applied.",
      },
    ],
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <NetPayCalcClient />
    </>
  );
}
