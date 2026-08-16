import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import EMICalculatorClient from "@/components/tools/calc/emi-calculator-client";
<<<<<<< HEAD
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";
=======
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7

export const metadata = buildMetadata({
  title: "Loan EMI Calculator",
  description: "Calculate monthly EMI payments for home loans, car loans, and personal loans. EMI calculator with interest rate, loan amount, tenure, and amortization schedule. Plan your loan repayment effectively.",
  path: "/tools/calc/emi",
  keywords: ["calculate", "with", "interest", "rate", "payments", "calculator", "home", "monthly", "personal", "loans"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Loan EMI Calculator",
    description: "Calculate monthly EMI payments for home loans, car loans, and personal loans. EMI calculator with interest rate, loan amount, tenure, and amortization schedule. Plan your loan repayment effectively.",
    path: "/tools/calc/emi",
    categoryName: "Calc",
    categoryPath: "/tools/calc",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <EMICalculatorClient />
    
      <RelatedTools currentToolUrl="/tools/calc/emi" />
</div>
  );
}
