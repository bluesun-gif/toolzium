import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import TaxWithholdingCalcClient from "@/components/tools/finance/tax-withholding-calc-client";

export const metadata = buildMetadata({
  title: "Tax Withholding Calculator — Free Federal Paycheck Tax Calculator",
  description:
    "Estimate your paycheck federal tax withholding, net take-home pay, and effective tax rate based on W-4 filing parameters.",
  path: "/tools/finance/tax-withholding-calc",
  keywords: [
    "tax withholding calculator",
    "paycheck tax calculator",
    "w4 tax withholding calculator",
    "federal income tax withholding",
    "take home pay calculator",
    "payroll tax estimator",
  ],
});

export default function TaxWithholdingCalcPage() {
  const jsonLd = buildToolJsonLd({
    name: "Tax Withholding Calculator",
    description:
      "Estimate your paycheck federal tax withholding, net take-home pay, and effective tax rate based on W-4 filing parameters.",
    path: "/tools/finance/tax-withholding-calc",
    categoryName: "Finance",
    categoryPath: "/tools/finance",
    faqs: [
      {
        question: "How does IRS Form W-4 affect paycheck withholding?",
        answer:
          "Form W-4 tells your employer how much federal income tax to withhold from your paycheck based on your filing status, dependents, and extra withholding requested.",
      },
      {
        question: "What is the difference between marginal tax rate and effective tax rate?",
        answer:
          "Your marginal tax rate is the highest bracket applied to your top dollar of income, whereas your effective tax rate is your total tax paid divided by total gross income.",
      },
      {
        question: "Is state income tax included in this calculation?",
        answer:
          "This tool focuses specifically on Federal Income Tax withholding. State tax rates vary by jurisdiction (0% in states like TX/FL up to 13%+ in CA).",
      },
    ],
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TaxWithholdingCalcClient />
    </>
  );
}
