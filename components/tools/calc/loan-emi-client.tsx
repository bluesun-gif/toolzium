"use client";

import React, { useState, useMemo } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Landmark } from "lucide-react";

const cardClass = "border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass = "border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass = "text-xs sm:text-sm font-semibold flex items-center gap-2";

export default function LoanEmiClient() {
  const [principal, setPrincipal] = useState("200000");
  const [rate, setRate] = useState("6.5");
  const [tenure, setTenure] = useState("240");

  const emiData = useMemo(() => {
    const p = parseFloat(principal) || 0;
    const r = (parseFloat(rate) || 0) / 100 / 12;
    const n = parseInt(tenure) || 0;

    if (p <= 0 || n <= 0) return { emi: 0, total: 0, interest: 0 };

    let emi = 0;
    if (r === 0) {
      emi = p / n;
    } else {
      emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }
    
    const total = emi * n;
    const interest = total - p;
    return { emi, total, interest };
  }, [principal, rate, tenure]);

  return (
    <div className="max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6">
      <ToolPageHeader icon={Landmark} title="Loan EMI Calculator" description="Calculate your Equated Monthly Installment, total interest, and overall payment for any loan." />
      
      <Card className={cardClass}>
        <CardHeader className={headerClass}>
          <CardTitle className={titleClass}>Loan Parameters</CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Loan Amount ($)</label>
              <Input type="number" value={principal} onChange={e => setPrincipal(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Annual Interest Rate (%)</label>
              <Input type="number" step="0.1" value={rate} onChange={e => setRate(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Tenure (Months)</label>
              <Input type="number" value={tenure} onChange={e => setTenure(e.target.value)} />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <div className="p-5 rounded-xl bg-primary/10 border border-primary/20 text-center">
              <div className="text-sm text-muted-foreground mb-1">Monthly EMI</div>
              <div className="text-3xl font-bold text-primary">${emiData.emi.toFixed(2)}</div>
            </div>
            <div className="p-5 rounded-xl bg-muted/30 border border-border/50 text-center">
              <div className="text-sm text-muted-foreground mb-1">Total Interest</div>
              <div className="text-3xl font-bold">${emiData.interest.toFixed(2)}</div>
            </div>
            <div className="p-5 rounded-xl bg-muted/30 border border-border/50 text-center">
              <div className="text-sm text-muted-foreground mb-1">Total Payment</div>
              <div className="text-3xl font-bold">${emiData.total.toFixed(2)}</div>
            </div>
          </div>

          {emiData.total > 0 && (
            <div className="mt-6 space-y-2">
              <div className="text-sm font-medium">Amortization Breakdown</div>
              <div className="w-full h-4 bg-muted rounded-full overflow-hidden flex">
                <div 
                  className="h-full bg-primary" 
                  style={{ width: `${(parseFloat(principal) / emiData.total) * 100}%` }}
                  title="Principal"
                />
                <div 
                  className="h-full bg-destructive" 
                  style={{ width: `${(emiData.interest / emiData.total) * 100}%` }}
                  title="Interest"
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Principal: ${parseFloat(principal).toFixed(2)}</span>
                <span>Interest: ${emiData.interest.toFixed(2)}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <ToolHowItWorks 
        steps={[
          { step: "01", title: "Enter Loan Amount", description: "Input the total principal amount you intend to borrow.", icon: Landmark },
          { step: "02", title: "Set Rate & Tenure", description: "Provide the annual interest rate and the loan duration in months.", icon: Landmark },
          { step: "03", title: "View Breakdown", description: "Instantly see your monthly EMI, total interest paid, and visual amortization chart.", icon: Landmark }
        ]} 
        badges={["100% Free", "Client-Side", "Instant"]} 
      />

      <ToolFeatureGuides features={[
        { icon: Landmark, title: "Standard EMI Formula", description: "Uses the industry-standard reducing balance formula for precise calculations." },
        { icon: Landmark, title: "Visual Amortization", description: "See a color-coded bar chart comparing your principal vs. total interest paid." },
        { icon: Landmark, title: "Flexible Tenure", description: "Input your loan term in months to accommodate any loan structure." },
        { icon: Landmark, title: "Zero Data Retention", description: "Your financial figures are processed locally and never saved on our servers." }
      ]}>
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
          <p>Understanding your Equated Monthly Installment (EMI) is crucial before committing to a mortgage, auto loan, or personal loan. This calculator helps you forecast your monthly obligations accurately.</p>
          <p>The tool employs the standard amortization formula where interest is calculated on the outstanding principal. This reflects how real-world bank loans operate, giving you a realistic picture of your financial commitment.</p>
          <p>By visualizing the ratio of principal to interest, you can better understand the true cost of borrowing and make informed decisions about loan tenure and prepayments.</p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion faqs={[
        { question: "What is the formula for EMI?", answer: "EMI = [P x R x (1+R)^N] / [(1+R)^N - 1], where P is Principal, R is the monthly interest rate, and N is the number of months." },
        { question: "Does this include property tax or insurance?", answer: "No, this calculator only computes principal and interest. For mortgages, you must separately add property taxes, homeowners insurance, and PMI to your monthly budget." },
        { question: "Can I calculate for a car loan?", answer: "Yes, the formula applies to any amortizing loan, including auto loans, personal loans, and student loans." }
      ]} />

      <RelatedTools currentToolUrl="/tools/calc/loan-emi" max={6} />
    </div>
  );
}
