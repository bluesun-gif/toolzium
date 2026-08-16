"use client";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Textarea } from"@/components/ui/textarea";
import { AiOutputDisplay } from"@/components/shared/ai-output-display";
import { Briefcase, FileCheck2, FileText, RefreshCw, Scale, Wand2 } from"lucide-react";
import toast from"react-hot-toast";

export default function AiRetainerGeneratorClient() {
  const [retainerTier, setRetainerTier] = useState("Growth Maintenance ($3,500/mo)");
  const [model, setModel] = useState("gpt4o");
  const [servicesIncluded, setServicesIncluded] = useState("Weekly SEO audits, 2 high-converting landing page designs, 10 hours on-demand web development, priority SLA support response.");
  const [overageRate, setOverageRate] = useState("$125/hr for additional out-of-scope requests");
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const generateProposal = async () => {
    if (!servicesIncluded.trim()) return;
    setLoading(true);
    try {
      const prompt = `Write a client Monthly Retainer Package Proposal: Tier Name & Price: '${retainerTier}', Included Services: '${servicesIncluded}', Overage Billing Rate: '${overageRate}'. Format into 3 distinct proposal cards: Card 1: Included Monthly Services & Deliverable Allocation, Card 2: Rollover Hours & SLA Response Guarantees, Card 3: Overage Pricing & Billing Terms. No markdown asterisks.`;
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
        toast.success("AI Retainer Proposal generated!");
      } else {
        throw new Error("No results");
      }
    } catch (err) {
      toast.error("AI generation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return <div className="relative space-y-6 max-w-4xl mx-auto px-4"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={Briefcase} title="AI Client Retainer & Scope Proposal Generator" description="Craft recurring monthly client retainer proposals, service allocation tiers, SLA guarantees, and overage terms with live AI." />

 <div className="mb-4">


   <ModelSelector value={model} onChange={setModel} />


 </div>


 <GlassCard className="p-6 space-y-4">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div className="space-y-2">
 <label className="text-xs font-bold text-foreground block">Retainer Package Tier & Pricing:</label>
 <Input type="text" value={retainerTier} onChange={e => setRetainerTier(e.target.value)} placeholder="e.g. Starter Maintenance ($1,500/mo)" className="h-11 font-medium" />
 </div>

 <div className="space-y-2">
 <label className="text-xs font-bold text-foreground block">Overage Billing Rate:</label>
 <Input type="text" value={overageRate} onChange={e => setOverageRate(e.target.value)} placeholder="e.g. $100/hr for extra work" className="h-11" />
 </div>
 </div>

 <div className="space-y-2">
 <label className="text-xs font-bold text-foreground block">Included Monthly Services & Deliverable Allocation:</label>
 <Textarea value={servicesIncluded} onChange={e => setServicesIncluded(e.target.value)} placeholder="List recurring tasks, hours included, monthly deliverables..." className="min-h-[110px]" />
 </div>

 <div className="flex justify-end pt-2">
 <Button onClick={generateProposal} disabled={loading || !servicesIncluded.trim()} className="gap-2 font-bold h-11 px-6 shadow-md">
 <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
 {loading ? "AI Building Retainer Proposal..." : "AI Generate Retainer Proposal"}
 </Button>
 </div>
 </GlassCard>

 {/* Output */}
 {results.length > 0 && (
 <AiOutputDisplay
 title="Generated Monthly Retainer Proposal"
 subtitle="Service allocations, SLA terms, and overage billing rules"
 content={results}
 loading={loading}
 onRegenerate={generateProposal}
 variant="cards"
 />
 )}
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Describe Work",
    description:"Summarize the engagement.",
    icon: FileText,
  },
{
    step:"02",
    title:"Set Fee",
    description:"Define retainer and scope.",
    icon: Scale,
  },
{
    step:"03",
    title:"Generate",
    description:"Create the proposal.",
    icon: FileCheck2,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: FileText,
    title:"Scope Input",
    description:"Describe deliverables.",
  },
{
    icon: Scale,
    title:"Fee Terms",
    description:"Retainer and limits.",
  },
{
    icon: FileCheck2,
    title:"Proposal",
    description:"Client-ready draft.",
  },
{
    icon: Wand2,
    title:"AI Assist",
    description:"Polished language.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>An AI retainer generator crafts a client proposal with clear recurring fees and scope boundaries, the foundation of predictable client work. Ambiguous retainers lead to scope creep; this tool forces explicit limits on hours and deliverables.</p>
  <p>Fee structure matters. Defining the retainer amount, what is included, and overage handling protects both sides. The AI polishes the language so the proposal reads professionally.</p>
  <p>Review with counsel before sending. The tool's value is a polished, scoped proposal draft that sets expectations and reduces friction.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"What is a retainer?",
    answer:"Recurring fee for availability or work.",
  },
{
    question:"Scope limits?",
    answer:"Yes, define included hours.",
  },
{
    question:"Binding?",
    answer:"Draft; review legally.",
  },
{
    question:"Free?",
    answer:"Yes.",
  },
{
    question:"Use case?",
    answer:"Agencies and consultants.",
  }
  ]}
/>
</div>
 );
}
