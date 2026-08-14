"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AiOutputDisplay } from "@/components/shared/ai-output-display";
import { Building, RefreshCw, Sparkles, Shield, Zap, Copy } from "lucide-react";
import toast from "react-hot-toast";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { ModelSelector } from "@/components/shared/model-selector";
export default function CapRateCalculatorClient() {
  const [price, setPrice] = useState(450000);
  const [model, setModel] = useState("gpt4o");
  const [rent, setRent] = useState(3800);
  const [expenses, setExpenses] = useState(1200);
  const [aiAnalysis, setAiAnalysis] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const noiMonthly = rent - expenses;
  const noiAnnual = noiMonthly * 12;
  const capRate = price > 0 ? (noiAnnual / price * 100).toFixed(2) : "0.00";
  const auditInvestmentWithAi = async () => {
    if (!price || !rent) return;
    setLoading(true);
    try {
      const prompt = `Analyze this real estate investment property financial profile: Purchase Price: $${price}, Gross Monthly Rent: $${rent}, Monthly Operating Expenses: $${expenses}, Calculated NOI: $${noiAnnual}/yr, Calculated Cap Rate: ${capRate}%. Provide 4 bullet points analyzing return quality, risk factors, 1% rule compliance, and cash flow improvement strategies. No markdown asterisks.`;
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          prompt,
            model,
          type: "prose"
        })
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
  return <div className="relative space-y-6 max-w-4xl mx-auto px-4"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={Building} title="AI Real Estate Cap Rate & Cash-on-Cash Investment Auditor" description="Calculate capitalization rate (Cap Rate), Net Operating Income (NOI), and audit rental property return quality with live AI." />

 <div className="mb-4">


   <ModelSelector value={model} onChange={setModel} />


 </div>


 <GlassCard className="p-6 space-y-4">
 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
 <div className="space-y-2">
 <label className="text-xs font-bold text-foreground block">Property Purchase Price ($):</label>
 <Input type="number" value={price} onChange={e => setPrice(Number(e.target.value))} className="h-11 font-bold" />
 </div>

 <div className="space-y-2">
 <label className="text-xs font-bold text-foreground block">Gross Monthly Rental Income ($):</label>
 <Input type="number" value={rent} onChange={e => setRent(Number(e.target.value))} className="h-11 font-bold" />
 </div>

 <div className="space-y-2">
 <label className="text-xs font-bold text-foreground block">Monthly Operating Expenses ($):</label>
 <Input type="number" value={expenses} onChange={e => setExpenses(Number(e.target.value))} className="h-11 font-bold" />
 </div>
 </div>

 {/* Calculated Stats Grid */}
 <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-2">
 <div className="p-4 rounded-xl bg-background/80 border text-center">
 <span className="text-xs text-muted-foreground block font-medium">Monthly NOI</span>
 <span className="text-lg font-black text-emerald-400">${noiMonthly.toLocaleString()}</span>
 </div>

 <div className="p-4 rounded-xl bg-background/80 border text-center">
 <span className="text-xs text-muted-foreground block font-medium">Annual NOI</span>
 <span className="text-lg font-black text-emerald-400">${noiAnnual.toLocaleString()}</span>
 </div>

 <div className="p-4 rounded-xl bg-background/80 border text-center col-span-2 md:col-span-1">
 <span className="text-xs text-muted-foreground block font-medium">Capitalization Rate</span>
 <span className="text-2xl font-black text-cyan-400">{capRate}%</span>
 </div>
 </div>

 <div className="flex justify-end pt-2">
 <Button onClick={auditInvestmentWithAi} disabled={loading} className="gap-2 font-bold h-11 px-6 shadow-md">
 <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
 {loading ? "AI Auditing Investment..." : "AI Real Estate Risk & Return Audit"}
 </Button>
 </div>
 </GlassCard>

 {/* AI Analysis */}
 {aiAnalysis.length > 0 && <AiOutputDisplay title="AI Real Estate Investment Analysis & Risk Rating" subtitle="Cap rate benchmark rating and property yield optimization tips" content={aiAnalysis} loading={loading} onRegenerate={auditInvestmentWithAi} variant="prose" />}
 
      <ToolHowItWorks steps={[{
        step: "01",
        title: "Enter Your Numbers",
        description: "Enter purchase price, rent, and operating costs in the fields above — everything calculates live as you type.",
        icon: Sparkles
      }, {
        step: "02",
        title: "Review the Result",
        description: "Instantly see your cap rate, NOI, and an AI investment-quality read, with breakdowns and visual cues.",
        icon: Zap
      }, {
        step: "03",
        title: "Copy or Export",
        description: "Copy any figure or export the full breakdown to use in a plan, invoice, or report.",
        icon: Copy
      }]} badges={["100% Free", "Private & Local", "No Signup"]} />

            <ToolFeatureGuides features={[{
        icon: Sparkles,
        title: "NOI and cap rate in seconds",
        description: "NOI and cap rate in seconds"
      }, {
        icon: Shield,
        title: "Private & On-Device",
        description: "Every calculation runs in your browser. Your financial inputs never leave your device or touch a server."
      }, {
        icon: Zap,
        title: "No Signup, Ever",
        description: "Open the tool and get an answer in seconds — no account, no paywall, no usage cap."
      }]}>
        <div className="prose dark:prose-invert max-w-none">
          <h3>Why Use the AI Real Estate Cap Rate & Cash-on-Cash Investment Auditor?</h3>
          <p>
            Real-estate investors screen rental deals on cap rate — the single number that tells you yield at a glance — then run an AI audit on return quality.
          </p>
          <p>
            Like all Toolzium calculators, it is free, private, and built to give you a paid-product experience without the subscription.
          </p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion faqs={[{
        question: "Is this tool free to use?",
        answer: "Yes, this tool is 100% free with no hidden costs, subscriptions, or usage limits."
      }, {
        question: "Is my data secure?",
        answer: "Absolutely. All processing happens locally in your browser. Your input data never leaves your device or gets sent to any server."
      }, {
        question: "Do I need to create an account?",
        answer: "No account or registration is required. Simply open the tool and start using it immediately."
      }]} />

      <RelatedTools currentToolUrl="/tools/finance/cap-rate-calculator" max={6} />

    </div></div>;
}