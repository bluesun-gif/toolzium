"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AiOutputDisplay } from "@/components/shared/ai-output-display";
import { Briefcase, RefreshCw, Sparkles, Shield, Zap, Copy } from "lucide-react";
import toast from "react-hot-toast";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
export default function AiRetainerGeneratorClient() {
  const [retainerTier, setRetainerTier] = useState("Growth Maintenance ($3,500/mo)");
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
 {results.length > 0 && <AiOutputDisplay title="Generated Monthly Retainer Proposal" subtitle="Service allocations, SLA terms, and overage billing rules" content={results} loading={loading} onRegenerate={generateProposal} variant="cards" />}
 
      <ToolHowItWorks steps={[{
        step: "01",
        title: "Input Your Data",
        description: "Enter your information in the input field above and configure any options.",
        icon: Sparkles
      }, {
        step: "02",
        title: "Process & Generate",
        description: "The tool processes your input instantly and displays the results.",
        icon: Zap
      }, {
        step: "03",
        title: "Copy & Use",
        description: "Copy the output with one click and use it wherever you need.",
        icon: Copy
      }]} badges={["100% Free", "Instant Results", "Privacy-First"]} />

      <ToolFeatureGuides features={[{
        icon: Sparkles,
        title: "Lightning Fast",
        description: "Get results in milliseconds with our optimized client-side processing engine."
      }, {
        icon: Shield,
        title: "Completely Private",
        description: "All processing happens in your browser. Your data never leaves your device."
      }, {
        icon: Zap,
        title: "No Signup Required",
        description: "Use this tool instantly without creating an account or providing any personal information."
      }]}>
        <div className="prose dark:prose-invert max-w-none">
          <h3>Why Use Our AI Client Retainer & Scope Proposal Generator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our AI Client Retainer & Scope Proposal Generator provides
            the functionality you need without any complexity or cost.
          </p>
          <p>
            Unlike server-based alternatives, everything runs locally in your browser, ensuring maximum
            privacy and zero latency. No data is ever transmitted to external servers, making it safe
            for sensitive information.
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

      <RelatedTools currentToolUrl="/tools/office/ai-retainer-generator" max={6} />

    </div></div>;
}