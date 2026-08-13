"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { Calculator, DollarSign, PieChart, ShieldCheck, Wallet, ArrowUpRight } from"lucide-react";
import toast from "react-hot-toast";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { GridPattern } from "@/components/magicui/grid-pattern";

type PayFrequency = "weekly" | "biweekly" | "semimonthly" | "monthly";

export default function NetPayCalcClient() {
  const [grossAnnualSalary, setGrossAnnualSalary] = useState<string>("85000");
  const [payFrequency, setPayFrequency] = useState<PayFrequency>("biweekly");
  const [k401Contribution, setK401Contribution] = useState<string>("5");
  const [healthInsurance, setHealthInsurance] = useState<string>("150");

  const grossAnnual = parseFloat(grossAnnualSalary) || 0;
  const k401Percent = parseFloat(k401Contribution) || 0;
  const monthlyHealth = parseFloat(healthInsurance) || 0;

  const periodsPerYearMap: Record<PayFrequency, number> = {
    weekly: 52,
    biweekly: 26,
    semimonthly: 24,
    monthly: 12,
  };

  const periods = periodsPerYearMap[payFrequency];
  const grossPaycheck = grossAnnual / periods;

  // Deductions
  const annual401k = grossAnnual * (k401Percent / 100);
  const paycheck401k = annual401k / periods;

  const annualHealth = monthlyHealth * 12;
  const paycheckHealth = annualHealth / periods;

  // Simplified FICA (Social Security 6.2% + Medicare 1.45% = 7.65%)
  const annualFICA = grossAnnual * 0.0765;
  const paycheckFICA = annualFICA / periods;

  // Estimated Federal Income Tax (simplified ~14% effective rate for average bracket)
  const taxableAnnual = Math.max(0, grossAnnual - 14600 - annual401k - annualHealth);
  const estimatedFederalTax = taxableAnnual * 0.15;
  const paycheckFederalTax = estimatedFederalTax / periods;

  const totalDeductionsPerPaycheck = paycheck401k + paycheckHealth + paycheckFICA + paycheckFederalTax;
  const netPaycheck = Math.max(0, grossPaycheck - totalDeductionsPerPaycheck);
  const netAnnual = netPaycheck * periods;

  const handleReset = () => {
    setGrossAnnualSalary("85000");
    setPayFrequency("biweekly");
    setK401Contribution("5");
    setHealthInsurance("150");
    toast.success("Form reset to default values.");
  };

  const summaryText = `Gross Annual Salary: $${grossAnnual.toLocaleString()}
Paycheck Frequency: ${payFrequency}
Gross Pay Per Paycheck: $${grossPaycheck.toFixed(2)}
Net Take-Home Pay Per Paycheck: $${netPaycheck.toFixed(2)}
Estimated Annual Net Income: $${netAnnual.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

  return (
    <div className="relative max-w-6xl mx-auto space-y-8">
      <GridPattern />

      <ToolPageHeader
        icon={Wallet}
        title="Salary / Net Pay Calculator"
        description="Calculate your net take-home paycheck after federal taxes, FICA (Social Security & Medicare), 401(k) retirement savings, and health insurance."
        actions={<ResetButton onClick={handleReset} label="Reset" />}
      />

      <div className="grid md:grid-cols-2 gap-6">
        <GlassCard>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <DollarSign className="h-5 w-5 text-primary" />
              Salary & Benefits Breakdown
            </CardTitle>
            <CardDescription>Enter gross salary and payroll deductions.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="gross-salary">Annual Gross Salary ($)</Label>
              <Input
                id="gross-salary"
                type="number"
                value={grossAnnualSalary}
                onChange={(e) => setGrossAnnualSalary(e.target.value)}
                placeholder="85000"
              />
            </div>

            <div className="space-y-2">
              <Label>Pay Frequency</Label>
              <Select value={payFrequency} onValueChange={(val) => setPayFrequency(val as PayFrequency)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select pay frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly (52 paychecks/yr)</SelectItem>
                  <SelectItem value="biweekly">Bi-weekly (26 paychecks/yr)</SelectItem>
                  <SelectItem value="semimonthly">Semi-monthly (24 paychecks/yr)</SelectItem>
                  <SelectItem value="monthly">Monthly (12 paychecks/yr)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="k401">401(k) Retirement Savings (% of salary)</Label>
              <Input
                id="k401"
                type="number"
                value={k401Contribution}
                onChange={(e) => setK401Contribution(e.target.value)}
                placeholder="5"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="health">Monthly Health Insurance Premium ($)</Label>
              <Input
                id="health"
                type="number"
                value={healthInsurance}
                onChange={(e) => setHealthInsurance(e.target.value)}
                placeholder="150"
              />
            </div>
          </CardContent>
        </GlassCard>

        <GlassCard>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg">
                <PieChart className="h-5 w-5 text-primary" />
                Paycheck Take-Home Summary
              </CardTitle>
              <CopyButton getText={() => summaryText} label="Copy Summary" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 text-center">
              <div className="text-xs text-muted-foreground uppercase font-semibold">Net Take-Home Paycheck</div>
              <div className="text-3xl font-extrabold text-primary mt-1">${netPaycheck.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
              <div className="text-xs text-muted-foreground mt-0.5">per {payFrequency} pay period</div>
            </div>

            <div className="space-y-2 text-sm border-t border-border pt-3">
              <div className="flex justify-between py-1">
                <span className="text-muted-foreground">Gross Paycheck:</span>
                <span className="font-semibold">${grossPaycheck.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-muted-foreground">Federal Income Tax:</span>
                <span className="font-semibold text-rose-500">-${paycheckFederalTax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-muted-foreground">FICA (Social Security & Medicare):</span>
                <span className="font-semibold text-rose-500">-${paycheckFICA.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-muted-foreground">401(k) Savings Contribution:</span>
                <span className="font-semibold text-emerald-500">-${paycheck401k.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-muted-foreground">Health Insurance Premium:</span>
                <span className="font-semibold text-rose-500">-${paycheckHealth.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2 border-t border-border font-bold">
                <span>Estimated Annual Take-Home:</span>
                <span className="text-primary">${netAnnual.toLocaleString("en-US", { maximumFractionDigits: 0 })}</span>
              </div>
            </div>
          </CardContent>
        </GlassCard>
      </div>

      <ToolHowItWorks
        steps={[
          {
            step: "01",
            title: "Enter Annual Salary",
            description: "Input your gross annual compensation and select your pay distribution schedule.",
            icon: DollarSign,
          },
          {
            step: "02",
            title: "Input Pre-Tax Deductions",
            description: "Specify your 401(k) percentage contribution and monthly health insurance premium.",
            icon: Calculator,
          },
          {
            step: "03",
            title: "View Take-Home Salary",
            description: "Instantly inspect itemized paycheck deductions and net annual take-home salary.",
            icon: Wallet,
          },
        ]}
        badges={["FICA Included", "401(k) Deductions", "Client-Side Private"]}
      />

      <ToolFeatureGuides
        features={[
          {
            icon: DollarSign,
            title: "Itemized Paycheck Deductions",
            description: "Break down federal income tax, Social Security (6.2%), Medicare (1.45%), and pre-tax health savings.",
          },
          {
            icon: Wallet,
            title: "Pre-Tax 401(k) Savings Modeling",
            description: "See how increasing your 401(k) contribution reduces your taxable income bracket.",
          },
          {
            icon: ShieldCheck,
            title: "100% Free & Private",
            description: "Calculations run entirely in local browser memory without storing or transmitting personal payroll figures.",
          },
        ]}
      />

      <ToolFaqAccordion
        faqs={[
          {
            question: "What is FICA tax on my paycheck?",
            answer: "FICA stands for Federal Insurance Contributions Act. It includes Social Security tax (6.2%) and Medicare tax (1.45%) totaling 7.65% withheld from gross earnings.",
          },
          {
            question: "How do pre-tax deductions save money on taxes?",
            answer: "Pre-tax contributions (like 401k or HSA) reduce your gross taxable income before federal income tax rates are applied.",
          },
        ]}
      />

      <RelatedTools currentToolUrl="/tools/finance/net-pay-calc" max={6} />
    </div>
  );
}
