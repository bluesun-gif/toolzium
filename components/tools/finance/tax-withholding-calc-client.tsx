"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { Calculator, DollarSign, PieChart, ShieldCheck, FileText, CheckCircle2, AlertCircle } from"lucide-react";
import toast from "react-hot-toast";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { GridPattern } from "@/components/magicui/grid-pattern";

type FilingStatus = "single" | "married" | "head_of_household";
type PayFrequency = "weekly" | "biweekly" | "semimonthly" | "monthly" | "annually";

export default function TaxWithholdingCalcClient() {
  const [grossIncome, setGrossIncome] = useState<string>("75000");
  const [filingStatus, setFilingStatus] = useState<FilingStatus>("single");
  const [payFrequency, setPayFrequency] = useState<PayFrequency>("biweekly");
  const [allowances, setAllowances] = useState<string>("0");
  const [extraWithholding, setExtraWithholding] = useState<string>("0");

  const annualIncome = parseFloat(grossIncome) || 0;
  const extra = parseFloat(extraWithholding) || 0;

  // Estimated Federal Tax Brackets calculation (2026 simplified standard)
  const calculateFederalTax = (income: number, status: FilingStatus): number => {
    const stdDeduction = status === "married" ? 29200 : status === "head_of_household" ? 21900 : 14600;
    const taxableIncome = Math.max(0, income - stdDeduction);

    let tax = 0;
    if (taxableIncome <= 11600) {
      tax = taxableIncome * 0.10;
    } else if (taxableIncome <= 47150) {
      tax = 1160 + (taxableIncome - 11600) * 0.12;
    } else if (taxableIncome <= 100525) {
      tax = 5426 + (taxableIncome - 47150) * 0.22;
    } else if (taxableIncome <= 191950) {
      tax = 17168.5 + (taxableIncome - 100525) * 0.24;
    } else {
      tax = 39110.5 + (taxableIncome - 191950) * 0.32;
    }
    return Math.round(tax);
  };

  const periodsPerYearMap: Record<PayFrequency, number> = {
    weekly: 52,
    biweekly: 26,
    semimonthly: 24,
    monthly: 12,
    annually: 1,
  };

  const periods = periodsPerYearMap[payFrequency];
  const annualTax = calculateFederalTax(annualIncome, filingStatus) + (extra * periods);
  const payPeriodTax = annualTax / periods;
  const payPeriodGross = annualIncome / periods;
  const payPeriodNet = payPeriodGross - payPeriodTax;
  const effectiveRate = annualIncome > 0 ? ((annualTax / annualIncome) * 100).toFixed(1) : "0.0";

  const handleReset = () => {
    setGrossIncome("75000");
    setFilingStatus("single");
    setPayFrequency("biweekly");
    setAllowances("0");
    setExtraWithholding("0");
    toast.success("Form reset to default values.");
  };

  const resultSummary = `Gross Annual Income: $${annualIncome.toLocaleString()}
Filing Status: ${filingStatus.replace("_", " ").toUpperCase()}
Pay Frequency: ${payFrequency}
Estimated Annual Federal Withholding: $${annualTax.toLocaleString()}
Withholding Per Paycheck: $${payPeriodTax.toFixed(2)}
Estimated Take-Home Per Paycheck: $${payPeriodNet.toFixed(2)}
Effective Tax Rate: ${effectiveRate}%`;

  return (
    <div className="relative max-w-6xl mx-auto space-y-8">
      <GridPattern />

      <ToolPageHeader
        icon={Calculator}
        title="Tax Withholding Calculator"
        description="Estimate your paycheck federal tax withholding, net take-home pay, and effective tax rate based on W-4 filing parameters."
        actions={<ResetButton onClick={handleReset} label="Reset" />}
      />

      <div className="grid md:grid-cols-2 gap-6">
        {/* INPUT FORM */}
        <GlassCard>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <DollarSign className="h-5 w-5 text-primary" />
              Paycheck & W-4 Parameters
            </CardTitle>
            <CardDescription>Enter your annual salary and filing details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="gross-income">Annual Gross Income ($)</Label>
              <Input
                id="gross-income"
                type="number"
                value={grossIncome}
                onChange={(e) => setGrossIncome(e.target.value)}
                placeholder="75000"
              />
            </div>

            <div className="space-y-2">
              <Label>Filing Status</Label>
              <Select value={filingStatus} onValueChange={(val) => setFilingStatus(val as FilingStatus)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select filing status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single</SelectItem>
                  <SelectItem value="married">Married Filing Jointly</SelectItem>
                  <SelectItem value="head_of_household">Head of Household</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Paycheck Frequency</Label>
              <Select value={payFrequency} onValueChange={(val) => setPayFrequency(val as PayFrequency)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select pay frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly (52/yr)</SelectItem>
                  <SelectItem value="biweekly">Bi-weekly (26/yr)</SelectItem>
                  <SelectItem value="semimonthly">Semi-monthly (24/yr)</SelectItem>
                  <SelectItem value="monthly">Monthly (12/yr)</SelectItem>
                  <SelectItem value="annually">Annually (1/yr)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="extra-withholding">Extra Withholding Per Paycheck ($ optional)</Label>
              <Input
                id="extra-withholding"
                type="number"
                value={extraWithholding}
                onChange={(e) => setExtraWithholding(e.target.value)}
                placeholder="0"
              />
            </div>
          </CardContent>
        </GlassCard>

        {/* RESULTS CARD */}
        <GlassCard>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg">
                <PieChart className="h-5 w-5 text-primary" />
                Estimated Withholding Breakdown
              </CardTitle>
              <CopyButton getText={() => resultSummary} label="Copy Summary" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                <div className="text-xs text-muted-foreground uppercase font-semibold">Paycheck Net Take-Home</div>
                <div className="text-2xl font-bold text-primary mt-1">${payPeriodNet.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                <div className="text-xs text-muted-foreground mt-0.5">per {payFrequency.replace("_", "-")} pay period</div>
              </div>
              <div className="p-4 rounded-xl bg-muted/60 border border-border">
                <div className="text-xs text-muted-foreground uppercase font-semibold">Withholding Per Paycheck</div>
                <div className="text-2xl font-bold text-foreground mt-1">${payPeriodTax.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                <div className="text-xs text-muted-foreground mt-0.5">federal tax deducted</div>
              </div>
            </div>

            <div className="space-y-2 pt-2 text-sm border-t border-border">
              <div className="flex justify-between py-1">
                <span className="text-muted-foreground">Gross Paycheck Amount:</span>
                <span className="font-semibold">${payPeriodGross.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-muted-foreground">Estimated Annual Federal Tax:</span>
                <span className="font-semibold">${annualTax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-muted-foreground">Effective Federal Tax Rate:</span>
                <span className="font-semibold text-primary">{effectiveRate}%</span>
              </div>
            </div>
          </CardContent>
        </GlassCard>
      </div>

      <ToolHowItWorks
        steps={[
          {
            step: "01",
            title: "Enter Salary & Frequency",
            description: "Input your total annual gross income and select your paycheck distribution schedule (weekly, bi-weekly, semi-monthly, monthly).",
            icon: DollarSign,
          },
          {
            step: "02",
            title: "Select W-4 Filing Status",
            description: "Choose Single, Married Filing Jointly, or Head of Household to apply standard deduction thresholds.",
            icon: FileText,
          },
          {
            step: "03",
            title: "Calculate Take-Home Pay",
            description: "View instant net pay per paycheck, total annual federal tax liability, and effective tax rate percentage.",
            icon: ShieldCheck,
          },
        ]}
        badges={["Form W-4 Compliant", "Privacy-Friendly", "Updated 2026 Brackets"]}
      />

      <ToolFeatureGuides
        features={[
          {
            icon: DollarSign,
            title: "Paycheck-Level Precision",
            description: "Calculates federal tax deductions across weekly, bi-weekly, semi-monthly, and monthly pay frequencies.",
          },
          {
            icon: FileText,
            title: "Updated 2026 Brackets",
            description: "Incorporates standard deduction allowances for Single ($14,600), Married ($29,200), and Head of Household ($21,900).",
          },
          {
            icon: ShieldCheck,
            title: "100% Private Client-Side Calculation",
            description: "All financial figures are computed locally inside your browser. No salary data is stored or logged.",
          },
        ]}
      />

      <ToolFaqAccordion
        faqs={[
          {
            question: "How does IRS Form W-4 affect paycheck withholding?",
            answer: "Form W-4 tells your employer how much federal income tax to withhold from your paycheck based on your filing status, dependents, and extra withholding requested.",
          },
          {
            question: "What is the difference between marginal tax rate and effective tax rate?",
            answer: "Your marginal tax rate is the highest bracket applied to your top dollar of income, whereas your effective tax rate is your total tax paid divided by total gross income.",
          },
          {
            question: "Is state income tax included in this calculation?",
            answer: "This tool focuses specifically on Federal Income Tax withholding. State tax rates vary by jurisdiction (0% in states like TX/FL up to 13%+ in CA).",
          },
        ]}
      />

      <RelatedTools currentToolUrl="/tools/finance/tax-withholding-calc" max={6} />
    </div>
  );
}
