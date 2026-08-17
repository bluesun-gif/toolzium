"use client";

import React, { useState, useMemo } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToolBackground } from "@/components/shared/tool-background";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { Calculator, DollarSign, TrendingUp, Percent, Clock, Download, Sparkles, Shield } from "lucide-react";
import toast from "react-hot-toast";

interface YearData {
  year: number;
  startBalance: number;
  interestEarned: number;
  contributions: number;
  endBalance: number;
}

export function DebtPayoffClient() {
  const [principal, setPrincipal] = useState("10000");
  const [rate, setRate] = useState("7");
  const [frequency, setFrequency] = useState("12");
  const [years, setYears] = useState("10");
  const [contribution, setContribution] = useState("200");

  const results = useMemo(() => {
    const p = parseFloat(principal) || 0;
    const r = (parseFloat(rate) || 0) / 100;
    const n = parseInt(frequency, 10) || 12;
    const t = parseInt(years, 10) || 0;
    const pmt = parseFloat(contribution) || 0;

    let currentBalance = p;
    let totalContributions = 0;
    const yearByYear: YearData[] = [];
    const monthlyRate = r / 12;

    for (let year = 1; year <= t; year++) {
      const startBalance = currentBalance;
      let yearInterest = 0;
      let yearContrib = 0;

      for (let month = 1; month <= 12; month++) {
        const interestThisMonth = currentBalance * monthlyRate;
        yearInterest += interestThisMonth;
        currentBalance += interestThisMonth + pmt;
        yearContrib += pmt;
        totalContributions += pmt;
      }

      yearByYear.push({
        year,
        startBalance,
        interestEarned: yearInterest,
        contributions: yearContrib,
        endBalance: currentBalance
      });
    }

    const totalInterest = currentBalance - p - totalContributions;

    return {
      finalBalance: currentBalance,
      totalInterest,
      totalContributions,
      principal: p,
      yearByYear
    };
  }, [principal, rate, frequency, years, contribution]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0
    }).format(val);
  };

  const exportCSV = () => {
    const headers = "Year,Start Balance,Contributions,Interest Earned,End Balance\n";
    const rows = results.yearByYear
      .map(y => `${y.year},${y.startBalance.toFixed(2)},${y.contributions.toFixed(2)},${y.interestEarned.toFixed(2)},${y.endBalance.toFixed(2)}`)
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "compound_interest_schedule.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded CSV schedule!");
  };

  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
        <ToolPageHeader
          icon={TrendingUp}
          title="Debt Snowball & Avalanche Payoff Calculator"
          description="Simulate long-term wealth accumulation, recurring monthly contributions, and compound interest growth curves."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Inputs */}
          <div className="lg:col-span-5">
            <GlassCard>
              <CardHeader>
                <CardTitle>Investment Parameters</CardTitle>
                <CardDescription>Configure starting balance, annual rate, and horizon</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Initial Principal ($)</Label>
                  <Input type="number" value={principal} onChange={e => setPrincipal(e.target.value)} placeholder="10000" />
                </div>
                <div>
                  <Label>Annual Interest Rate (%)</Label>
                  <Input type="number" step="0.1" value={rate} onChange={e => setRate(e.target.value)} placeholder="7.0" />
                </div>
                <div>
                  <Label>Monthly Contribution ($)</Label>
                  <Input type="number" value={contribution} onChange={e => setContribution(e.target.value)} placeholder="200" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Years to Grow</Label>
                    <Input type="number" value={years} onChange={e => setYears(e.target.value)} placeholder="10" />
                  </div>
                  <div>
                    <Label>Compounding</Label>
                    <Select value={frequency} onValueChange={setFrequency}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="12">Monthly (12/yr)</SelectItem>
                        <SelectItem value="1">Annually (1/yr)</SelectItem>
                        <SelectItem value="4">Quarterly (4/yr)</SelectItem>
                        <SelectItem value="365">Daily (365/yr)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </GlassCard>
          </div>

          {/* Key Metrics */}
          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <GlassCard className="p-4 bg-primary/10 border-primary/30">
                <div className="text-xs text-muted-foreground font-semibold uppercase">Total Balance</div>
                <div className="text-2xl font-bold text-primary mt-1">{formatCurrency(results.finalBalance)}</div>
              </GlassCard>
              <GlassCard className="p-4">
                <div className="text-xs text-muted-foreground font-semibold uppercase">Total Interest</div>
                <div className="text-2xl font-bold text-green-500 mt-1">+{formatCurrency(results.totalInterest)}</div>
              </GlassCard>
              <GlassCard className="p-4">
                <div className="text-xs text-muted-foreground font-semibold uppercase">Principal + Contrib</div>
                <div className="text-2xl font-bold text-foreground mt-1">{formatCurrency(results.principal + results.totalContributions)}</div>
              </GlassCard>
            </div>

            {/* Breakdown Table */}
            <GlassCard>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-base">Year-by-Year Growth Table</CardTitle>
                    <CardDescription>Annual balance trajectory</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={exportCSV}>
                    <Download className="w-4 h-4 mr-2" /> Export CSV
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="overflow-x-auto max-h-72">
                <table className="w-full text-xs text-left">
                  <thead className="text-muted-foreground uppercase bg-muted/40 sticky top-0">
                    <tr>
                      <th className="p-2">Year</th>
                      <th className="p-2">Start</th>
                      <th className="p-2">Contrib</th>
                      <th className="p-2 text-green-500">Interest</th>
                      <th className="p-2 font-bold">End Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.yearByYear.map(row => (
                      <tr key={row.year} className="border-b last:border-0 hover:bg-muted/20">
                        <td className="p-2 font-medium">Year {row.year}</td>
                        <td className="p-2">{formatCurrency(row.startBalance)}</td>
                        <td className="p-2">{formatCurrency(row.contributions)}</td>
                        <td className="p-2 text-green-500">+{formatCurrency(row.interestEarned)}</td>
                        <td className="p-2 font-bold">{formatCurrency(row.endBalance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </GlassCard>
          </div>
        </div>

        <ToolHowItWorks
          steps={[
            { step: "01", title: "Input Starting Assets", description: "Set your initial deposit and regular monthly savings amount.", icon: DollarSign },
            { step: "02", title: "Set Rate & Horizon", description: "Input your expected annual return and investment duration in years.", icon: Percent },
            { step: "03", title: "Harness Exponential Growth", description: "See how interest earning interest accelerates portfolio wealth.", icon: TrendingUp }
          ]}
          badges={["100% Free Forever", "CSV Export Ready", "Compound Interest Formula"]}
        />

        <ToolFeatureGuides
          features={[
            { icon: TrendingUp, title: "Exponential Wealth Curves", description: "Visualize the snowball effect as earned interest generates secondary returns." },
            { icon: DollarSign, title: "Recurring Contributions", description: "Simulate dollar-cost averaging with continuous monthly savings additions." },
            { icon: Download, title: "Exportable CSV Schedules", description: "Download full amortization tables for spreadsheet modeling." },
            { icon: Shield, title: "100% Client-Side Privacy", description: "Financial projections run locally without storing personal portfolio balances." }
          ]}
        >
          <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
            <h3>The Power of Compound Interest in Wealth Building</h3>
            <p>
              Compound interest represents interest calculated on both the initial principal and the accumulated interest from prior periods. Over a multi-decade horizon, the compounding effect outpaces regular contributions, enabling substantial portfolio growth even with modest monthly deposits.
            </p>
          </div>
        </ToolFeatureGuides>

        <ToolFaqAccordion
          faqs={[
            { question: "What is the compound interest formula?", answer: "The formula is A = P(1 + r/n)^(nt), where A is final balance, P is principal, r is annual interest rate, n is compounding frequency per year, and t is time in years." },
            { question: "How does monthly contribution affect compounding?", answer: "Regular monthly contributions accelerate the principal base each month, multiplying the interest earned in all subsequent periods." }
          ]}
        />

        <RelatedTools currentToolUrl="/tools/finance/debt-payoff" max={6} />
      </div>
    </div>
  );
}

export default DebtPayoffClient;
