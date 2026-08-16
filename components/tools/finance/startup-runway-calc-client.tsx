"use client";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { AiOutputDisplay } from"@/components/shared/ai-output-display";
import { CalendarClock, RefreshCw, TrendingDown, TrendingUp, Wallet } from"lucide-react";
import toast from"react-hot-toast";

export default function StartupRunwayCalcClient() {
  const [cash, setCash] = useState(350000);
  const [model, setModel] = useState("gpt4o");
  const [monthlyBurn, setMonthlyBurn] = useState(28000);
  const [monthlyRevenue, setMonthlyRevenue] = useState(12000);
  const [aiAnalysis, setAiAnalysis] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const netBurn = monthlyBurn - monthlyRevenue;
  const runwayMonths = netBurn > 0 ? (cash / netBurn).toFixed(1) : "Infinity (Profitable!)";
  const auditRunwayWithAi = async () => {
    if (!cash || !monthlyBurn) return;
    setLoading(true);
    try {
      const prompt = `Audit this startup financial cash runway profile: Cash in Bank: $${cash}, Monthly Gross Burn: $${monthlyBurn}, Monthly Revenue: $${monthlyRevenue}, Net Monthly Burn: $${netBurn}, Calculated Runway: ${runwayMonths} Months. Output 4 strategic finance bullet points on fundraising timeline, expense optimization, and default alive milestones. No markdown asterisks.`;
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
        toast.success("AI Startup Runway audit complete!");
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
      

 <ToolPageHeader icon={TrendingDown} title="AI Startup Runway & Net Burn Rate Calculator" description="Calculate startup cash runway months, net burn rate, fundraising urgency timelines, and audit Default Alive vs Default Dead status with live AI." />

 <div className="mb-4">


   <ModelSelector value={model} onChange={setModel} />


 </div>


 <GlassCard className="p-6 space-y-4">
 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
 <div className="space-y-2">
 <label className="text-xs font-bold text-foreground block">Cash Balance in Bank ($):</label>
 <Input type="number" value={cash} onChange={e => setCash(Number(e.target.value))} className="h-11 font-bold" />
 </div>

 <div className="space-y-2">
 <label className="text-xs font-bold text-foreground block">Gross Monthly Expenses ($):</label>
 <Input type="number" value={monthlyBurn} onChange={e => setMonthlyBurn(Number(e.target.value))} className="h-11 font-bold" />
 </div>

 <div className="space-y-2">
 <label className="text-xs font-bold text-foreground block">Gross Monthly Revenue ($):</label>
 <Input type="number" value={monthlyRevenue} onChange={e => setMonthlyRevenue(Number(e.target.value))} className="h-11 font-bold" />
 </div>
 </div>

 {/* Calculated Runway Banner */}
 <div className="p-5 rounded-2xl bg-background border flex flex-col md:flex-row items-center justify-between gap-4">
 <div>
 <span className="text-xs text-muted-foreground block font-bold uppercase tracking-wider">
 Net Monthly Cash Burn
 </span>
 <span className="text-xl font-black text-rose-400">
 ${netBurn > 0 ? netBurn.toLocaleString() : "0 (Net Positive)"} / mo
 </span>
 </div>

 <div className="text-right">
 <span className="text-xs text-muted-foreground block font-bold uppercase tracking-wider">
 Calculated Zero Cash Runway
 </span>
 <span className="text-3xl font-black text-cyan-400">
 {runwayMonths} {typeof runwayMonths === "number" || !isNaN(Number(runwayMonths)) ? "Months" : ""}
 </span>
 </div>
 </div>

 <div className="flex justify-end pt-2">
 <Button onClick={auditRunwayWithAi} disabled={loading} className="gap-2 font-bold h-11 px-6 shadow-md">
 <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
 {loading ? "AI Auditing Runway..." : "AI Audit Runway & Fundraising Timeline"}
 </Button>
 </div>
 </GlassCard>

 {/* AI Analysis */}
 {aiAnalysis.length > 0 && (
 <AiOutputDisplay
 title="AI Startup Runway & Cash Burn Audit"
 subtitle="Fundraising lead time recommendations & Default Alive milestone strategies"
 content={aiAnalysis}
 loading={loading}
 onRegenerate={auditRunwayWithAi}
 variant="prose"
 />
 )}
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Enter Cash",
    description:"Input current bank balance.",
    icon: Wallet,
  },
{
    step:"02",
    title:"Enter Burn",
    description:"Add monthly net cash outflow.",
    icon: TrendingDown,
  },
{
    step:"03",
    title:"Calculate",
    description:"See months of runway left.",
    icon: CalendarClock,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Wallet,
    title:"Cash Position",
    description:"Starting balance.",
  },
{
    icon: TrendingDown,
    title:"Burn Rate",
    description:"Net monthly cash outflow.",
  },
{
    icon: CalendarClock,
    title:"Runway",
    description:"Months until funds deplete.",
  },
{
    icon: TrendingUp,
    title:"Scenario",
    description:"Models raising or cutting burn.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A runway calculator is mission-critical for any funded startup: it answers the one question that determines survival — how many months until the money runs out. Runway equals cash on hand divided by monthly net burn. This tool computes it and models how spending or funding changes the clock, turning anxiety into a number you can plan against.</p>
  <p>Burn rate is the speed of the clock. Net burn is cash out minus cash in; gross burn is total spend. The calculator uses net burn because revenue offsets cost and extends life. A high burn with thin cash is dangerous; the tool makes the deadline explicit so founders act before panic forces bad deals.</p>
  <p>Extending runway has two levers: cut costs or raise capital. The calculator shows how each month of reduced burn adds months of life, quantifying the trade-off between growth spending and survival. Many startups over-spend on growth that does not yet pay back, shortening runway fatally. Modeling scenarios prevents that.</p>
  <p>Healthy runway is typically 12 to 18 months, giving room to hit milestones that justify the next raise. Use the calculator continuously, not just at fundraising. The value is discipline: a live countdown that keeps spending honest and ensures the company reaches its next milestone before the clock expires.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"What is runway?",
    answer:"Months a startup survives at current burn before running out.",
  },
{
    question:"What is burn rate?",
    answer:"Net cash spent per month.",
  },
{
    question:"How to extend runway?",
    answer:"Cut costs or raise capital.",
  },
{
    question:"What is a healthy runway?",
    answer:"Often 12 to 18 months to reduce fundraising pressure.",
  },
{
    question:"Does revenue help?",
    answer:"Yes, it lowers net burn and extends runway.",
  }
  ]}
/>
</div>
 );
}
