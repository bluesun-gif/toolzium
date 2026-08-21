"use client";

import React, { useState, useMemo } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToolBackground } from "@/components/shared/tool-background";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { ShareResultButton } from "@/components/shared/share-result-modal";
import { EmbedButton } from "@/components/shared/embed-modal";
import { cn } from "@/lib/utils";
import {
  TrendingUp, DollarSign, Calendar, Percent, Sparkles,
  Download, Copy, Check, Table, PieChart, ShieldCheck, ArrowRight
} from "lucide-react";
import toast from "react-hot-toast";

type CompoundingFrequency = 1 | 2 | 4 | 12 | 365;

interface YearRow {
  year: number;
  startBalance: number;
  contributions: number;
  interestEarned: number;
  endBalance: number;
  totalContributions: number;
  totalInterest: number;
}

export default function CompoundInterestClient() {
  const [initialDeposit, setInitialDeposit] = useState<number>(10000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(500);
  const [interestRate, setInterestRate] = useState<number>(8.0);
  const [years, setYears] = useState<number>(20);
  const [frequency, setFrequency] = useState<CompoundingFrequency>(12); // Monthly
  const [inflationRate, setInflationRate] = useState<number>(2.5);
  const [showInflation, setShowInflation] = useState<boolean>(false);

  // Calculation Engine
  const { yearlyData, finalBalance, totalDeposits, totalInterest, realPurchasingPower } = useMemo(() => {
    const p = Math.max(0, initialDeposit);
    const pmt = Math.max(0, monthlyContribution);
    const r = Math.max(0, interestRate) / 100;
    const t = Math.max(1, Math.min(60, years));
    const n = frequency;

    const rows: YearRow[] = [];
    let currentBalance = p;
    let runningDeposits = p;
    let runningInterest = 0;

    for (let yr = 1; yr <= t; yr++) {
      const startOfYr = currentBalance;
      let yrContributions = 0;
      let yrInterest = 0;

      // Simulate month-by-month for smooth compounding
      for (let m = 1; m <= 12; m++) {
        currentBalance += pmt;
        yrContributions += pmt;
        runningDeposits += pmt;

        // Apply interest based on frequency
        const monthlyRate = r / n;
        const compoundCyclesPerMonth = n / 12;
        const interestForMonth = currentBalance * (Math.pow(1 + monthlyRate, compoundCyclesPerMonth) - 1);
        currentBalance += interestForMonth;
        yrInterest += interestForMonth;
        runningInterest += interestForMonth;
      }

      rows.push({
        year: yr,
        startBalance: Math.round(startOfYr),
        contributions: Math.round(yrContributions),
        interestEarned: Math.round(yrInterest),
        endBalance: Math.round(currentBalance),
        totalContributions: Math.round(runningDeposits),
        totalInterest: Math.round(runningInterest),
      });
    }

    const futureValue = currentBalance;
    const inflationDiscount = Math.pow(1 + inflationRate / 100, t);
    const purchasingPower = futureValue / inflationDiscount;

    return {
      yearlyData: rows,
      finalBalance: Math.round(futureValue),
      totalDeposits: Math.round(runningDeposits),
      totalInterest: Math.round(runningInterest),
      realPurchasingPower: Math.round(purchasingPower),
    };
  }, [initialDeposit, monthlyContribution, interestRate, years, frequency, inflationRate]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleExportCsv = () => {
    let csv = "Year,Start Balance,Annual Contribution,Interest Earned,Total Deposited,Total Interest,End Balance\n";
    yearlyData.forEach((row) => {
      csv += `${row.year},${row.startBalance},${row.contributions},${row.interestEarned},${row.totalContributions},${row.totalInterest},${row.endBalance}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `compound-interest-schedule-${years}yr.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Amortization schedule exported as CSV!");
  };

  const interestPercentage = Math.round((totalInterest / (finalBalance || 1)) * 100);
  const depositPercentage = 100 - interestPercentage;

  return (
    <div className="min-h-screen relative pb-20">
      <ToolBackground />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 space-y-8">
        
        {/* Header */}
        <ToolPageHeader
          title="Compound Interest & Investment Growth Visualizer"
          description="Calculate future investment growth with monthly contributions, annual compounding, and visual interest vs principal breakdown charts."
          icon={TrendingUp}
          badgeText="📈 Real-Time Wealth Visualizer • Interactive Growth Curves • Year-by-Year Table"
        />

        {/* Input Parameters & Key Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Controls Panel */}
          <GlassCard className="p-6 lg:col-span-5 space-y-5">
            <div className="flex items-center gap-2 border-b border-border/60 pb-3">
              <DollarSign className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-bold text-foreground">Investment Parameters</h3>
            </div>

            {/* Initial Deposit */}
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-muted-foreground uppercase">Initial Principal Deposit ($)</Label>
              <Input
                type="number"
                value={initialDeposit}
                onChange={(e) => setInitialDeposit(Number(e.target.value))}
                min={0}
                step={500}
                className="font-mono text-sm font-bold"
              />
            </div>

            {/* Monthly Contribution */}
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-muted-foreground uppercase">Monthly Contribution ($)</Label>
              <Input
                type="number"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                min={0}
                step={50}
                className="font-mono text-sm font-bold"
              />
            </div>

            {/* Annual Rate of Return */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold text-muted-foreground">
                <span className="uppercase">Estimated Annual Return (%)</span>
                <span className="font-mono text-primary font-extrabold">{interestRate}%</span>
              </div>
              <Input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                min={0}
                max={50}
                step={0.5}
                className="font-mono text-sm font-bold"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>Conservative (5%)</span>
                <span>S&amp;P 500 Avg (8-10%)</span>
                <span>Aggressive (12%+)</span>
              </div>
            </div>

            {/* Investment Duration Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-muted-foreground">
                <span className="uppercase">Investment Period</span>
                <span className="font-mono text-primary font-extrabold">{years} Years</span>
              </div>
              <input
                type="range"
                min={1}
                max={50}
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>5 Yrs</span>
                <span>15 Yrs</span>
                <span>30 Yrs</span>
                <span>50 Yrs</span>
              </div>
            </div>

            {/* Compounding Frequency */}
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-muted-foreground uppercase">Compounding Frequency</Label>
              <select
                value={frequency}
                onChange={(e) => setFrequency(Number(e.target.value) as CompoundingFrequency)}
                className="w-full bg-background/80 border border-border/80 rounded-xl px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-primary/50 outline-none"
              >
                <option value={12}>Compounded Monthly (Standard)</option>
                <option value={1}>Compounded Annually</option>
                <option value={4}>Compounded Quarterly</option>
                <option value={365}>Compounded Daily</option>
              </select>
            </div>

            {/* Inflation Toggle */}
            <div className="pt-2 border-t border-border/60 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Adjust for Inflation ({inflationRate}%)</span>
              <button
                type="button"
                onClick={() => setShowInflation(!showInflation)}
                className={cn(
                  "text-xs px-2.5 py-1 rounded-lg font-bold transition-colors cursor-pointer",
                  showInflation ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                )}
              >
                {showInflation ? "Enabled" : "Disabled"}
              </button>
            </div>

          </GlassCard>

          {/* Results Visualizer Cards */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              <GlassCard className="p-4 bg-primary/10 border-primary/30">
                <span className="text-[11px] font-bold text-muted-foreground uppercase">Total Future Value</span>
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-primary mt-1">
                  {formatCurrency(finalBalance)}
                </div>
                {showInflation && (
                  <p className="text-[10px] text-muted-foreground mt-1 font-mono">
                    Real Power: {formatCurrency(realPurchasingPower)}
                  </p>
                )}
              </GlassCard>

              <GlassCard className="p-4 bg-blue-500/10 border-blue-500/30">
                <span className="text-[11px] font-bold text-muted-foreground uppercase">Total Contributions</span>
                <div className="text-xl sm:text-2xl font-extrabold font-mono text-blue-500 mt-1">
                  {formatCurrency(totalDeposits)}
                </div>
                <p className="text-[10px] text-muted-foreground mt-1 font-mono">
                  {depositPercentage}% of total portfolio
                </p>
              </GlassCard>

              <GlassCard className="p-4 bg-emerald-500/10 border-emerald-500/30">
                <span className="text-[11px] font-bold text-muted-foreground uppercase">Total Interest Earned</span>
                <div className="text-xl sm:text-2xl font-extrabold font-mono text-emerald-500 mt-1">
                  {formatCurrency(totalInterest)}
                </div>
                <p className="text-[10px] text-emerald-500 font-bold mt-1 font-mono">
                  +{interestPercentage}% free growth
                </p>
              </GlassCard>

            </div>

            {/* Visual Portfolio Ratio Bar */}
            <GlassCard className="p-5 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-foreground">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-blue-500 inline-block" />
                  Your Cash Deposits ({depositPercentage}%)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                  Compound Interest Growth ({interestPercentage}%)
                </span>
              </div>

              <div className="w-full h-4 rounded-full overflow-hidden flex bg-muted">
                <div style={{ width: `${depositPercentage}%` }} className="bg-blue-500 h-full transition-all duration-500" />
                <div style={{ width: `${interestPercentage}%` }} className="bg-emerald-500 h-full transition-all duration-500" />
              </div>

              <p className="text-xs text-muted-foreground text-center font-medium">
                💡 Over {years} years, compound interest generates{" "}
                <span className="text-emerald-500 font-bold">
                  {(totalInterest / (totalDeposits || 1)).toFixed(1)}x
                </span>{" "}
                more money than your original cash deposits!
              </p>
            </GlassCard>

            {/* Growth Curve Chart (SVG) */}
            <GlassCard className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-foreground uppercase">Portfolio Growth Timeline (Years 1–{years})</h4>
                <span className="text-[10px] text-muted-foreground font-mono">Exponential Trajectory</span>
              </div>

              <div className="h-44 w-full flex items-end gap-1 pt-4 pb-2 border-b border-border/60">
                {yearlyData.filter((_, idx) => idx % Math.max(1, Math.floor(years / 20)) === 0 || idx === years - 1).map((row) => {
                  const maxBal = finalBalance || 1;
                  const totalH = Math.max(8, (row.endBalance / maxBal) * 100);
                  const depH = Math.max(4, (row.totalContributions / maxBal) * 100);
                  const intH = Math.max(0, totalH - depH);

                  return (
                    <div key={row.year} className="flex-1 flex flex-col items-center gap-1 group relative h-full justify-end">
                      
                      {/* Tooltip on hover */}
                      <div className="absolute -top-12 bg-popover/90 text-popover-foreground border border-border px-2 py-1 rounded text-[10px] font-mono shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
                        Yr {row.year}: {formatCurrency(row.endBalance)}
                      </div>

                      <div className="w-full flex flex-col justify-end items-center rounded-t-sm overflow-hidden" style={{ height: `${totalH}%` }}>
                        <div className="w-full bg-emerald-500" style={{ height: `${(intH / totalH) * 100}%` }} />
                        <div className="w-full bg-blue-500" style={{ height: `${(depH / totalH) * 100}%` }} />
                      </div>

                      <span className="text-[9px] text-muted-foreground font-mono">{row.year}</span>
                    </div>
                  );
                })}
              </div>
            </GlassCard>

          </div>

        </div>

        {/* Year-by-Year Amortization Schedule */}
        <GlassCard className="p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-3">
            <div className="flex items-center gap-2">
              <Table className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-bold text-foreground">Annual Amortization & Growth Breakdown</h3>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleExportCsv}
              className="text-xs font-bold gap-1.5 h-8 px-3 rounded-lg"
            >
              <Download className="w-3.5 h-3.5 text-primary" /> Export Schedule (.CSV)
            </Button>
          </div>

          <div className="max-h-72 overflow-y-auto rounded-xl border border-border/60">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-muted/60 sticky top-0 text-[11px] uppercase text-muted-foreground">
                <tr>
                  <th className="p-2.5">Year</th>
                  <th className="p-2.5">Start Balance</th>
                  <th className="p-2.5">Annual Deposit</th>
                  <th className="p-2.5">Interest Earned</th>
                  <th className="p-2.5">Total Deposits</th>
                  <th className="p-2.5 text-right">End Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {yearlyData.map((row) => (
                  <tr key={row.year} className="hover:bg-muted/30">
                    <td className="p-2.5 font-bold text-foreground">Year {row.year}</td>
                    <td className="p-2.5 text-muted-foreground">{formatCurrency(row.startBalance)}</td>
                    <td className="p-2.5 text-blue-500">+{formatCurrency(row.contributions)}</td>
                    <td className="p-2.5 text-emerald-500 font-semibold">+{formatCurrency(row.interestEarned)}</td>
                    <td className="p-2.5 text-muted-foreground">{formatCurrency(row.totalContributions)}</td>
                    <td className="p-2.5 font-bold text-primary text-right">{formatCurrency(row.endBalance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>

        {/* Share & Embed Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-muted/20 rounded-2xl border border-border/60">
          <span className="text-xs text-muted-foreground font-mono">
            {years}-Year Simulation: {formatCurrency(finalBalance)} Future Portfolio
          </span>
          <div className="flex items-center gap-2">
            <ShareResultButton
              toolTitle="Compound Interest Calculator"
              resultTitle="Investment Growth Projection"
              resultSummary={`Calculated ${years}-year compound interest growth of ${formatCurrency(finalBalance)} on Toolzium.`}
              resultMetrics={[
                { label: "Final Balance", value: formatCurrency(finalBalance) },
                { label: "Total Interest", value: formatCurrency(totalInterest) },
                { label: "Cash Deposits", value: formatCurrency(totalDeposits) },
              ]}
            />
            <EmbedButton toolPath="/tools/finance/compound-interest" toolTitle="Compound Interest Calculator" />
          </div>
        </div>

        {/* How It Works & Guides */}
        <ToolHowItWorks
          steps={[
            { step: "1", title: "Enter Principal & Deposits", description: "Input your starting investment amount and regular monthly contributions." },
            { step: "2", title: "Set Rate & Timeline", description: "Choose your expected annual return rate and target investment duration in years." },
            { step: "3", title: "Analyze Wealth Trajectory", description: "Review visual exponential growth curves and export the complete annual breakdown table." }
          ]}
        />

        <ToolFeatureGuides
          features={[
            { title: "Exponential Growth Visualization", description: "Witness the snowball effect of compound interest as earnings begin generating their own returns." },
            { title: "Amortization CSV Export", description: "Download full year-by-year financial accounting tables for retirement planning and spreadsheets." },
            { title: "Inflation-Adjusted Purchasing Power", description: "Estimate what your future portfolio will actually buy in today's inflation-discounted dollars." }
          ]}
        />

        <ToolFaqAccordion
          faqs={[
            { question: "What is the formula for compound interest?", answer: "The compound interest formula is A = P(1 + r/n)^(nt), where A is the final amount, P is the initial principal balance, r is the annual interest rate, n is the number of times interest compounds per year, and t is the time in years." },
            { question: "What is the difference between simple interest and compound interest?", answer: "Simple interest is only calculated on the original principal deposit. Compound interest calculates interest on both the initial principal and the accumulated interest from prior periods, leading to exponential growth over time." },
            { question: "What is an average rate of return for stock market investments?", answer: "Historically, the S&P 500 index has delivered an average annual return of approximately 10% before inflation (or roughly 7% to 8% after adjusting for historical inflation) over long multi-decade horizons." }
          ]}
        />

        <RelatedTools currentToolUrl="/tools/finance/compound-interest" />

      </div>
    </div>
  );
}
