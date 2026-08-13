"use client";

import React, { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import RelatedTools from "@/components/shared/related-tools";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResetButton, CopyButton } from "@/components/shared/action-buttons";
import { DollarSign, Calculator, Home, AlertTriangle, CheckCircle2, Sliders, ShieldAlert, Award } from "lucide-react";

export function LtvCalculatorClient() {
  const [homeValue, setHomeValue] = useState("400000");
  const [primaryMortgage, setPrimaryMortgage] = useState("280000");
  const [secondMortgage, setSecondMortgage] = useState("0");

  const [ltv, setLtv] = useState(0);
  const [cltv, setCltv] = useState(0);
  const [equity, setEquity] = useState(0);
  const [maxCashOut, setMaxCashOut] = useState(0);
  const [pmiRisk, setPmiRisk] = useState(false);

  useEffect(() => {
    calculateLTV();
  }, [homeValue, primaryMortgage, secondMortgage]);

  const calculateLTV = () => {
    const value = parseFloat(homeValue) || 0;
    const mortgage1 = parseFloat(primaryMortgage) || 0;
    const mortgage2 = parseFloat(secondMortgage) || 0;

    if (value <= 0) {
      setLtv(0);
      setCltv(0);
      setEquity(0);
      setMaxCashOut(0);
      setPmiRisk(false);
      return;
    }

    const calculatedLtv = (mortgage1 / value) * 100;
    const calculatedCltv = ((mortgage1 + mortgage2) / value) * 100;

    setLtv(calculatedLtv);
    setCltv(calculatedCltv);

    const currentEquity = value - (mortgage1 + mortgage2);
    setEquity(Math.max(0, currentEquity));

    const maxLoans80Percent = value * 0.80;
    const cashOut = maxLoans80Percent - (mortgage1 + mortgage2);
    setMaxCashOut(Math.max(0, cashOut));

    setPmiRisk(calculatedCltv > 80);
  };

  const handleReset = () => {
    setHomeValue("400000");
    setPrimaryMortgage("280000");
    setSecondMortgage("0");
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(val);
  };

  const getResultsText = () => {
    return (
      "Home Value: " + formatCurrency(parseFloat(homeValue) || 0) + "\n" +
      "LTV: " + ltv.toFixed(2) + "%\n" +
      "CLTV: " + cltv.toFixed(2) + "%\n" +
      "Equity: " + formatCurrency(equity) + "\n" +
      "Max Cash-out (at 80% LTV): " + formatCurrency(maxCashOut)
    );
  };

  const steps = [
    {
      step: "01",
      title: "Enter Home Appraised Value",
      description: "Input the current estimated or appraised market value of your property.",
      icon: Home,
    },
    {
      step: "02",
      title: "Input Mortgage Balances",
      description: "Enter your primary mortgage remaining balance and any 2nd mortgage or HELOC line.",
      icon: DollarSign,
    },
    {
      step: "03",
      title: "Analyze LTV & Equity",
      description: "Instantly see your Loan-to-Value (LTV), Combined LTV (CLTV), total equity, and PMI requirement status.",
      icon: Calculator,
    },
  ];

  const faqs = [
    {
      question: "What is a Loan-to-Value (LTV) Ratio?",
      answer: "The Loan-to-Value (LTV) ratio is a financial term used by lenders to express the ratio of a loan to the value of an asset purchased or refinanced. For example, if you borrow $280,000 to buy a $400,000 home, your LTV ratio is 70%."
    },
    {
      question: "What is the difference between LTV and CLTV?",
      answer: "LTV calculates the ratio using only your primary mortgage debt. Combined Loan-to-Value (CLTV) includes all secured loans on the property, such as a 2nd mortgage, home equity loan, or Home Equity Line of Credit (HELOC)."
    },
    {
      question: "Why is 80% LTV an important threshold?",
      answer: "An LTV of 80% or lower is usually required to avoid paying Private Mortgage Insurance (PMI) on conventional loans. Having an LTV at or below 80% also qualifies borrowers for better interest rates and higher approval limits."
    },
    {
      question: "How can I lower my LTV ratio?",
      answer: "You can lower your LTV ratio by making a larger down payment when buying a home, paying down your mortgage principal balance faster, or increasing your home value through renovations and market appreciation."
    },
    {
      question: "How much cash can I cash-out refinance at 80% LTV?",
      answer: "Most conventional cash-out refinance guidelines cap maximum borrowing at 80% of your home's total appraised value minus your existing mortgage balances."
    }
  ];

  return (
    <div className="space-y-12">
      <ToolPageHeader
        icon={Calculator}
        title="Loan-to-Value (LTV) Calculator"
        description="Calculate your LTV, CLTV, and available home equity for refinancing, HELOCs, or mortgage approval."
        actions={
          <>
            <ResetButton onClick={handleReset} label="Reset" />
            <CopyButton getText={getResultsText} label="Copy Results" />
          </>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard>
          <CardHeader>
            <CardTitle>Property & Loan Inputs</CardTitle>
            <CardDescription>Enter appraised market value and existing loan balances</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Home Appraised Value ($)</Label>
              <div className="relative">
                <Home className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="number"
                  min="0"
                  value={homeValue}
                  onChange={(e) => setHomeValue(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Primary Mortgage Balance ($)</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="number"
                  min="0"
                  value={primaryMortgage}
                  onChange={(e) => setPrimaryMortgage(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Second Mortgage / HELOC Balance ($)</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="number"
                  min="0"
                  value={secondMortgage}
                  onChange={(e) => setSecondMortgage(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
          </CardContent>
        </GlassCard>

        <div className="space-y-6">
          <GlassCard className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-primary">LTV & CLTV Ratios</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label>Loan-to-Value (LTV)</Label>
                  <span className="font-bold text-2xl">{ltv.toFixed(2)}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div
                    className={"h-full " + (ltv > 80 ? "bg-red-500" : "bg-primary")}
                    style={{ width: Math.min(100, ltv) + "%" }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label>Combined LTV (CLTV)</Label>
                  <span className="font-bold text-xl">{cltv.toFixed(2)}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div
                    className={"h-full " + (cltv > 80 ? "bg-red-500" : "bg-primary")}
                    style={{ width: Math.min(100, cltv) + "%" }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </GlassCard>

          <GlassCard>
            <CardHeader>
              <CardTitle>Equity Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-muted-foreground">Current Dollar Equity</span>
                <span className="font-semibold text-lg text-green-600 dark:text-green-400">
                  {formatCurrency(equity)}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-muted-foreground">Max Cash-Out (at 80% LTV)</span>
                <span className="font-semibold text-lg">{formatCurrency(maxCashOut)}</span>
              </div>

              <div
                className={
                  "mt-4 p-4 rounded-lg flex items-start gap-3 " +
                  (pmiRisk
                    ? "bg-red-50 dark:bg-red-950/20 text-red-800 dark:text-red-200"
                    : "bg-green-50 dark:bg-green-950/20 text-green-800 dark:text-green-200")
                }
              >
                {pmiRisk ? (
                  <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" />
                )}
                <div>
                  <h4 className="font-semibold">{pmiRisk ? "PMI Required" : "No PMI Required"}</h4>
                  <p className="text-sm opacity-90">
                    {pmiRisk
                      ? "Your CLTV is above 80%. Lenders typically require Private Mortgage Insurance (PMI)."
                      : "Your CLTV is 80% or below. You generally will not need Private Mortgage Insurance (PMI)."}
                  </p>
                </div>
              </div>
            </CardContent>
          </GlassCard>
        </div>
      </div>

      <ToolHowItWorks steps={steps} />

      <ToolFeatureGuides
        features={[
          {
            icon: Home,
            title: "Appraised Market Value Assessment",
            description: "Calculates total borrowing ratio against current home market value.",
          },
          {
            icon: Calculator,
            title: "Combined Loan-to-Value (CLTV)",
            description: "Includes second mortgages, HELOC lines, and junior liens in overall debt coverage.",
          },
          {
            icon: DollarSign,
            title: "Cash-Out Refinance Estimator",
            description: "Shows maximum equity cash-out potential at standard 80% LTV underwriting limit.",
          },
        ]}
      >
        <div className="space-y-6 text-muted-foreground leading-relaxed">
          <p>
            Understanding your <strong>Loan-to-Value (LTV)</strong> ratio is essential whenever you buy a home, refinance your existing mortgage, or apply for a <strong>Home Equity Line of Credit (HELOC)</strong>. Lenders use LTV to assess risk before extending credit secured by residential real estate.
          </p>

          <h3 className="text-xl font-bold text-foreground mt-6">How to Calculate Loan-to-Value Ratio</h3>
          <p>
            The mathematical formula for calculating your LTV ratio is simple:
          </p>
          <div className="p-4 bg-muted rounded-xl font-mono text-sm text-foreground border">
            LTV = (Total Outstanding Principal Balance ÷ Appraised Property Market Value) × 100
          </div>
          <p>
            For example, if your home is appraised at <strong>$400,000</strong> and your remaining mortgage principal balance is <strong>$280,000</strong>, your LTV is calculated as <code>($280,000 / $400,000) × 100 = 70%</code>.
          </p>

          <h3 className="text-xl font-bold text-foreground mt-6">What is Combined Loan-to-Value (CLTV)?</h3>
          <p>
            While standard LTV considers only your first primary mortgage, <strong>Combined Loan-to-Value (CLTV)</strong> accounts for all outstanding liens against the property. This includes second mortgages, home equity loans, and open HELOC balances. Lenders examine CLTV to determine overall debt coverage on the property.
          </p>

          <h3 className="text-xl font-bold text-foreground mt-6">Why the 80% LTV Benchmark Matters</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Avoiding Private Mortgage Insurance (PMI):</strong> Conventional mortgage guidelines require borrowers with LTV ratios above 80% to purchase PMI, adding $100–$300+ to monthly payments.</li>
            <li><strong>Refinancing & Cash-Out Limits:</strong> Most standard cash-out refinance loans limit borrowing to a maximum 80% LTV to ensure home equity reserves remain intact.</li>
            <li><strong>Interest Rate Tiering:</strong> Borrowers with lower LTV ratios (e.g. 60%–70%) receive lower mortgage interest rate offers due to reduced lender default risk.</li>
          </ul>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion faqs={faqs} />

      <RelatedTools currentToolUrl="/tools/finance/ltv-calculator" max={6} />
    </div>
  );
}
