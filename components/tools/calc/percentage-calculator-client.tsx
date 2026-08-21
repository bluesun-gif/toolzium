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
  Percent, Calculator, TrendingUp, TrendingDown, Tag,
  Copy, Check, ArrowRight, Sparkles, HelpCircle, History
} from "lucide-react";
import toast from "react-hot-toast";

export default function PercentageCalculatorClient() {
  // Mode 1: What is X% of Y?
  const [val1A, setVal1A] = useState<string>("15");
  const [val1B, setVal1B] = useState<string>("240");

  // Mode 2: X is what % of Y?
  const [val2A, setVal2A] = useState<string>("45");
  const [val2B, setVal2B] = useState<string>("180");

  // Mode 3: Percentage Change (from X to Y)
  const [val3A, setVal3A] = useState<string>("50");
  const [val3B, setVal3B] = useState<string>("75");

  // Mode 4: Discount & Sale Price
  const [val4Price, setVal4Price] = useState<string>("120");
  const [val4Discount, setVal4Discount] = useState<string>("25");

  // Calculations
  const res1 = useMemo(() => {
    const a = parseFloat(val1A);
    const b = parseFloat(val1B);
    if (isNaN(a) || isNaN(b)) return null;
    const ans = (a / 100) * b;
    return {
      result: Math.round(ans * 1000) / 1000,
      formula: `(${a} ÷ 100) × ${b} = ${Math.round(ans * 100) / 100}`,
    };
  }, [val1A, val1B]);

  const res2 = useMemo(() => {
    const a = parseFloat(val2A);
    const b = parseFloat(val2B);
    if (isNaN(a) || isNaN(b) || b === 0) return null;
    const ans = (a / b) * 100;
    return {
      result: Math.round(ans * 1000) / 1000,
      formula: `(${a} ÷ ${b}) × 100 = ${Math.round(ans * 100) / 100}%`,
    };
  }, [val2A, val2B]);

  const res3 = useMemo(() => {
    const a = parseFloat(val3A);
    const b = parseFloat(val3B);
    if (isNaN(a) || isNaN(b) || a === 0) return null;
    const diff = b - a;
    const percentChange = (diff / a) * 100;
    const isIncrease = diff >= 0;
    return {
      percentChange: Math.round(Math.abs(percentChange) * 100) / 100,
      difference: Math.round(diff * 100) / 100,
      isIncrease,
      formula: `((${b} - ${a}) ÷ ${a}) × 100 = ${isIncrease ? "+" : "-"}${Math.abs(Math.round(percentChange * 100) / 100)}%`,
    };
  }, [val3A, val3B]);

  const res4 = useMemo(() => {
    const price = parseFloat(val4Price);
    const discount = parseFloat(val4Discount);
    if (isNaN(price) || isNaN(discount)) return null;
    const saved = (discount / 100) * price;
    const finalPrice = Math.max(0, price - saved);
    return {
      finalPrice: Math.round(finalPrice * 100) / 100,
      saved: Math.round(saved * 100) / 100,
      formula: `${price} - (${discount}% × ${price}) = $${Math.round(finalPrice * 100) / 100}`,
    };
  }, [val4Price, val4Discount]);

  const copyVal = (val: string | number, label: string) => {
    navigator.clipboard.writeText(val.toString());
    toast.success(`${label} copied!`);
  };

  return (
    <div className="relative pb-8 sm:pb-12">
      <ToolBackground />
      <div className="max-w-6xl mx-auto px-3 sm:px-6 pt-2 sm:pt-4 space-y-6 sm:space-y-8">
        
        {/* Header */}
        <ToolPageHeader
          title="Free Online Percentage Calculator"
          description="Calculate percentages, percent change, discount sales, fractions, and percentage differences with step-by-step mathematical formula breakdowns."
          icon={Percent}
          badgeText="🔢 Fast Interactive Math • 4 Calculators in 1 • Instant Formula Explanations"
        />

        {/* 4 Interactive Calculator Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          
          {/* 1. What is X% of Y? */}
          <GlassCard className="p-4 sm:p-6 space-y-4">
            <div className="flex items-center gap-2 border-b border-border/60 pb-2">
              <Calculator className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-bold text-foreground">1. What is X% of Y?</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-end">
              <div className="space-y-1">
                <Label className="text-[11px] text-muted-foreground uppercase font-bold">Percentage (%)</Label>
                <Input
                  type="number"
                  value={val1A}
                  onChange={(e) => setVal1A(e.target.value)}
                  placeholder="15"
                  className="font-mono text-base sm:text-sm font-bold h-11 sm:h-10"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-[11px] text-muted-foreground uppercase font-bold">Number (Y)</Label>
                <Input
                  type="number"
                  value={val1B}
                  onChange={(e) => setVal1B(e.target.value)}
                  placeholder="240"
                  className="font-mono text-base sm:text-sm font-bold h-11 sm:h-10"
                />
              </div>
            </div>

            {res1 && (
              <div className="p-3.5 bg-primary/10 rounded-xl border border-primary/20 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase font-bold">Answer:</span>
                  <div className="text-2xl font-extrabold font-mono text-primary">{res1.result}</div>
                  <p className="text-[10px] text-muted-foreground font-mono">{res1.formula}</p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => copyVal(res1.result, "Result")}
                  className="text-xs font-semibold gap-1"
                >
                  <Copy className="w-3.5 h-3.5" /> Copy
                </Button>
              </div>
            )}
          </GlassCard>

          {/* 2. X is what % of Y? */}
          <GlassCard className="p-4 sm:p-6 space-y-4">
            <div className="flex items-center gap-2 border-b border-border/60 pb-2">
              <Percent className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-bold text-foreground">2. X is what % of Y?</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-end">
              <div className="space-y-1">
                <Label className="text-[11px] text-muted-foreground uppercase font-bold">Part (X)</Label>
                <Input
                  type="number"
                  value={val2A}
                  onChange={(e) => setVal2A(e.target.value)}
                  placeholder="45"
                  className="font-mono text-base sm:text-sm font-bold h-11 sm:h-10"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-[11px] text-muted-foreground uppercase font-bold">Whole (Y)</Label>
                <Input
                  type="number"
                  value={val2B}
                  onChange={(e) => setVal2B(e.target.value)}
                  placeholder="180"
                  className="font-mono text-base sm:text-sm font-bold h-11 sm:h-10"
                />
              </div>
            </div>

            {res2 && (
              <div className="p-3.5 bg-emerald-500/10 rounded-xl border border-emerald-500/20 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase font-bold">Percentage:</span>
                  <div className="text-2xl font-extrabold font-mono text-emerald-500">{res2.result}%</div>
                  <p className="text-[10px] text-muted-foreground font-mono">{res2.formula}</p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => copyVal(`${res2.result}%`, "Percentage")}
                  className="text-xs font-semibold gap-1 min-h-[36px]"
                >
                  <Copy className="w-3.5 h-3.5" /> Copy
                </Button>
              </div>
            )}
          </GlassCard>

          {/* 3. Percentage Increase / Decrease */}
          <GlassCard className="p-4 sm:p-6 space-y-4">
            <div className="flex items-center gap-2 border-b border-border/60 pb-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-bold text-foreground">3. Percentage Increase / Decrease</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-end">
              <div className="space-y-1">
                <Label className="text-[11px] text-muted-foreground uppercase font-bold">Initial Value</Label>
                <Input
                  type="number"
                  value={val3A}
                  onChange={(e) => setVal3A(e.target.value)}
                  placeholder="50"
                  className="font-mono text-base sm:text-sm font-bold h-11 sm:h-10"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-[11px] text-muted-foreground uppercase font-bold">Final Value</Label>
                <Input
                  type="number"
                  value={val3B}
                  onChange={(e) => setVal3B(e.target.value)}
                  placeholder="75"
                  className="font-mono text-base sm:text-sm font-bold h-11 sm:h-10"
                />
              </div>
            </div>

            {res3 && (
              <div
                className={cn(
                  "p-3.5 rounded-xl border flex items-center justify-between",
                  res3.isIncrease
                    ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500"
                    : "bg-red-500/10 border-red-500/20 text-red-500"
                )}
              >
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase font-bold">
                    {res3.isIncrease ? "Percentage Increase:" : "Percentage Decrease:"}
                  </span>
                  <div className="text-2xl font-extrabold font-mono flex items-center gap-1">
                    {res3.isIncrease ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                    {res3.isIncrease ? "+" : "-"}{res3.percentChange}%
                  </div>
                  <p className="text-[10px] text-muted-foreground font-mono">{res3.formula}</p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => copyVal(`${res3.isIncrease ? "+" : "-"}${res3.percentChange}%`, "Percent change")}
                  className="text-xs font-semibold gap-1 min-h-[36px]"
                >
                  <Copy className="w-3.5 h-3.5" /> Copy
                </Button>
              </div>
            )}
          </GlassCard>

          {/* 4. Discount & Sale Price Calculator */}
          <GlassCard className="p-4 sm:p-6 space-y-4">
            <div className="flex items-center gap-2 border-b border-border/60 pb-2">
              <Tag className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-bold text-foreground">4. Sale Discount Calculator</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-end">
              <div className="space-y-1">
                <Label className="text-[11px] text-muted-foreground uppercase font-bold">Original Price ($)</Label>
                <Input
                  type="number"
                  value={val4Price}
                  onChange={(e) => setVal4Price(e.target.value)}
                  placeholder="120"
                  className="font-mono text-base sm:text-sm font-bold h-11 sm:h-10"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-[11px] text-muted-foreground uppercase font-bold">Discount (%)</Label>
                <Input
                  type="number"
                  value={val4Discount}
                  onChange={(e) => setVal4Discount(e.target.value)}
                  placeholder="25"
                  className="font-mono text-base sm:text-sm font-bold h-11 sm:h-10"
                />
              </div>
            </div>

            {res4 && (
              <div className="p-3.5 bg-primary/10 rounded-xl border border-primary/20 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase font-bold">Final Sale Price:</span>
                  <div className="text-2xl font-extrabold font-mono text-primary">${res4.finalPrice}</div>
                  <p className="text-[10px] text-emerald-500 font-semibold font-mono">
                    You save: ${res4.saved} ({val4Discount}% off)
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => copyVal(`$${res4.finalPrice}`, "Final price")}
                  className="text-xs font-semibold gap-1"
                >
                  <Copy className="w-3.5 h-3.5" /> Copy
                </Button>
              </div>
            )}
          </GlassCard>

        </div>

        {/* Share & Embed */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-muted/20 rounded-2xl border border-border/60">
          <span className="text-xs text-muted-foreground font-mono">
            Reactive mathematical calculations with sub-millisecond precision
          </span>
          <div className="flex items-center gap-2">
            <ShareResultButton
              toolTitle="Percentage Calculator"
              resultTitle="Percentage Calculation"
              resultSummary="Calculated with Toolzium's precision online percentage suite."
              resultMetrics={[
                { label: "Mode 1 (X% of Y)", value: res1 ? `${res1.result}` : "N/A" },
                { label: "Mode 2 (% of Whole)", value: res2 ? `${res2.result}%` : "N/A" },
              ]}
            />
            <EmbedButton toolPath="/tools/calc/percentage-calculator" toolTitle="Percentage Calculator" />
          </div>
        </div>

        {/* How It Works & Guides */}
        <ToolHowItWorks
          steps={[
            { step: "1", title: "Select Calculation Mode", description: "Choose whether you need a basic percentage of a number, percentage change, or discount." },
            { step: "2", title: "Enter Numbers", description: "Type any positive or decimal numbers into the input boxes." },
            { step: "3", title: "View Step-by-Step Formula", description: "Instantly see the exact answer and the mathematical equation explaining how it was solved." }
          ]}
        />

        <ToolFeatureGuides
          features={[
            { title: "Instant Reactive Calculation", description: "Results update in real-time as you type with zero page reload delays." },
            { title: "Formulas & Educational Explanations", description: "Provides exact algebraic steps to help students and professionals understand the math." },
            { title: "Discount & Grocery Savings", description: "Calculate final checkout prices after coupons, sales tags, and markdowns." }
          ]}
        />

        <ToolFaqAccordion
          faqs={[
            { question: "How do you calculate percentage increase?", answer: "To find percentage increase: Subtract the initial value from the final value, divide that difference by the absolute value of the initial value, and then multiply by 100. Formula: ((Final - Initial) / Initial) * 100." },
            { question: "What is the formula for calculating X% of Y?", answer: "Divide the percentage by 100, then multiply by the total number. For example, 15% of 200 is (15 / 100) * 200 = 30." },
            { question: "How do I calculate a sale price with a 20% discount?", answer: "Multiply the original price by 0.20 to find how much money you save, then subtract that amount from the original price. Alternatively, multiply the original price by 0.80." }
          ]}
        />

        <RelatedTools currentToolUrl="/tools/calc/percentage-calculator" />

      </div>
    </div>
  );
}
