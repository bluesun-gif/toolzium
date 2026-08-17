"use client";

import { ModelSelector } from "@/components/shared/model-selector";

import { ToolBackground } from "@/components/shared/tool-background";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { AiOutputDisplay } from"@/components/shared/ai-output-display";
import { DollarSign, Layers, Receipt, RefreshCw, Target, TrendingUp, Users, Calculator, Type } from "lucide-react";
import toast from"react-hot-toast";

export default function SaasPricingCalculatorClient() {
  const [productName, setProductName] = useState("FlowPulse API Monitor");
  const [model, setModel] = useState("gpt4o");
  const [targetCustomer, setTargetCustomer] = useState("DevOps Teams & Mid-Market Engineering Depts");
  const [valueMetric, setValueMetric] = useState("API Endpoints Monitored & Alert Channels");
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const generatePricing = async () => {
    if (!productName.trim()) return;
    setLoading(true);
    try {
      const prompt = `Design a 3-tier SaaS pricing strategy (Starter, Pro, Enterprise) for '${productName}'. Target Customer: '${targetCustomer}'. Core Value Metric: '${valueMetric}'. Include monthly/annual price points, featured limits, add-ons, and revenue optimization recommendations. Format as 3 distinct pricing tier cards. No markdown asterisks.`;
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          prompt,
            model,
          type: "cards"
        })
      });
      if (!res.ok) throw new Error("AI API failed");
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        setResults(data.results);
        toast.success("AI SaaS Pricing model generated!");
      } else {
        throw new Error("No results");
      }
    } catch (err) {
      toast.error("AI generation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

 <ToolPageHeader icon={DollarSign} title="AI SaaS Pricing Strategy & Tier Matrix Calculator" description="Design optimal 3-tier SaaS pricing models (Starter, Pro, Enterprise), value metric limits, and expansion revenue strategies powered by live AI." />

 <div className="mb-4">


   <ModelSelector value={model} onChange={setModel} />


 </div>


 <GlassCard className="p-6 space-y-4">
 <div className="space-y-2">
 <label className="text-xs font-bold text-foreground block">SaaS Product Name:</label>
 <Input type="text" value={productName} onChange={e => setProductName(e.target.value)} placeholder="e.g. MetricTrack AI" className="h-11" />
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div className="space-y-2">
 <label className="text-xs font-bold text-foreground block">Target Customer Segment:</label>
 <Input type="text" value={targetCustomer} onChange={e => setTargetCustomer(e.target.value)} placeholder="e.g. Solopreneurs, SMBs, Enterprises" className="h-11" />
 </div>

 <div className="space-y-2">
 <label className="text-xs font-bold text-foreground block">Primary Value Metric (Scaling Axis):</label>
 <Input type="text" value={valueMetric} onChange={e => setValueMetric(e.target.value)} placeholder="e.g. Monthly Active Users, Storage GB" className="h-11" />
 </div>
 </div>

 <div className="flex justify-end pt-2">
 <Button onClick={generatePricing} disabled={loading || !productName} className="gap-2 font-bold h-11 px-6 shadow-md">
 <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
 {loading ? "AI Modeling Tiers..." : "AI Generate SaaS Pricing Strategy"}
 </Button>
 </div>
 </GlassCard>

 {/* Output */}
 {results.length > 0 && (
 <AiOutputDisplay
 title="Generated 3-Tier SaaS Pricing Architecture"
 subtitle="Tier limits, feature gating, and expansion revenue levers"
 content={results}
 loading={loading}
 onRegenerate={generatePricing}
 variant="cards"
 />
 )}
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Enter Costs",
    description:"Input build, support, and overhead.",
    icon: Receipt,
  },
{
    step:"02",
    title:"Set Value",
    description:"Estimate customer value delivered.",
    icon: Target,
  },
{
    step:"03",
    title:"Model Tiers",
    description:"See revenue per plan and segment.",
    icon: Layers,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Receipt,
    title:"Cost Base",
    description:"Anchors minimum viable price.",
  },
{
    icon: Target,
    title:"Value Anchor",
    description:"Prices relative to delivered value.",
  },
{
    icon: Layers,
    title:"Tier Modeling",
    description:"Compares plan structures.",
  },
{
    icon: TrendingUp,
    title:"Revenue View",
    description:"Projects per-customer revenue.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A SaaS pricing calculator turns one of the hardest startup decisions into a structured model. Price too low and you leave money on the table; too high and you repel customers. This tool balances cost, delivered value, and tier structure to suggest defensible prices rather than guesses.</p>
  <p>Cost sets the floor, not the target. Covering build, support, and overhead is necessary, but cost-plus pricing usually underprices because it ignores the value customers receive. The calculator layers value-based thinking on top, anchoring price to the outcome you deliver, which often justifies a multiple of cost.</p>
  <p>Tiers capture segmentation. Different customers have different willingness to pay; a single price forces a compromise. Three tiers — entry, standard, premium — let small users start cheap and heavy users pay more, increasing total revenue without alienating either. The tool models how each tier contributes, revealing where revenue concentrates.</p>
  <p>Revisit pricing as value and costs evolve. A price set at launch rarely stays optimal as the product matures and competition shifts. Use the calculator to test scenarios before changing, and to explain decisions internally. Its value is replacing pricing anxiety with a model grounded in economics, so you capture the worth you create.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"How to price a SaaS?",
    answer:"Above cost, near value delivered, with tiered plans.",
  },
{
    question:"Why tiers?",
    answer:"Capture different willingness to pay across segments.",
  },
{
    question:"Cost-plus vs value?",
    answer:"Value pricing usually earns more than cost-plus.",
  },
{
    question:"How many tiers?",
    answer:"Three is a common, easy-to-compare structure.",
  },
{
    question:"When to change price?",
    answer:"When value or costs shift materially.",
  }
  ]}
/>
    </div>
    </div>
);
}
