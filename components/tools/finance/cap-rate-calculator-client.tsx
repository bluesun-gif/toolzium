"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AiOutputDisplay } from "@/components/shared/ai-output-display";
import { Building, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

export default function CapRateCalculatorClient() {
  const [price, setPrice] = useState(450000);
  const [rent, setRent] = useState(3800);
  const [expenses, setExpenses] = useState(1200);
  const [aiAnalysis, setAiAnalysis] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const noiMonthly = rent - expenses;
  const noiAnnual = noiMonthly * 12;
  const capRate = price > 0 ? ((noiAnnual / price) * 100).toFixed(2) : "0.00";

  const auditInvestmentWithAi = async () => {
    if (!price || !rent) return;

    setLoading(true);

    try {
      const prompt = `Analyze this real estate investment property financial profile: Purchase Price: $${price}, Gross Monthly Rent: $${rent}, Monthly Operating Expenses: $${expenses}, Calculated NOI: $${noiAnnual}/yr, Calculated Cap Rate: ${capRate}%. Provide 4 bullet points analyzing return quality, risk factors, 1% rule compliance, and cash flow improvement strategies. No markdown asterisks.`;

      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, type: "prose" }),
      });

      if (!res.ok) throw new Error("AI API failed");

      const data = await res.json();
      if (data.results && data.results.length > 0) {
        setAiAnalysis(data.results);
        toast.success("AI Real Estate Investment audit complete!");
      } else {
        throw new Error("No results");
      }
    } catch (err) {
      toast.error("AI audit failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4">
      <ToolPageHeader
        icon={Building}
        title="AI Real Estate Cap Rate & Cash-on-Cash Investment Auditor"
        description="Calculate capitalization rate (Cap Rate), Net Operating Income (NOI), and audit rental property return quality with live AI."
      />

      <GlassCard className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground block">Property Purchase Price ($):</label>
            <Input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="h-11 font-bold"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground block">Gross Monthly Rental Income ($):</label>
            <Input
              type="number"
              value={rent}
              onChange={(e) => setRent(Number(e.target.value))}
              className="h-11 font-bold"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground block">Monthly Operating Expenses ($):</label>
            <Input
              type="number"
              value={expenses}
              onChange={(e) => setExpenses(Number(e.target.value))}
              className="h-11 font-bold"
            />
          </div>
        </div>

        {/* Calculated Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-2">
          <div className="p-4 rounded-xl bg-slate-950/80 border text-center">
            <span className="text-xs text-muted-foreground block font-medium">Monthly NOI</span>
            <span className="text-lg font-black text-emerald-400">${noiMonthly.toLocaleString()}</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border text-center">
            <span className="text-xs text-muted-foreground block font-medium">Annual NOI</span>
            <span className="text-lg font-black text-emerald-400">${noiAnnual.toLocaleString()}</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border text-center col-span-2 md:col-span-1">
            <span className="text-xs text-muted-foreground block font-medium">Capitalization Rate</span>
            <span className="text-2xl font-black text-cyan-400">{capRate}%</span>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button
            onClick={auditInvestmentWithAi}
            disabled={loading}
            className="gap-2 font-bold h-11 px-6 shadow-md"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            {loading ? "AI Auditing Investment..." : "AI Real Estate Risk & Return Audit"}
          </Button>
        </div>
      </GlassCard>

      {/* AI Analysis */}
      {aiAnalysis.length > 0 && (
        <AiOutputDisplay
          title="AI Real Estate Investment Analysis & Risk Rating"
          subtitle="Cap rate benchmark rating and property yield optimization tips"
          content={aiAnalysis}
          loading={loading}
          onRegenerate={auditInvestmentWithAi}
          variant="prose"
        />
      )}
    </div>
  );
}
