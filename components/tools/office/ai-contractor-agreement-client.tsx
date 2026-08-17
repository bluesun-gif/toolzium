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
import { Textarea } from"@/components/ui/textarea";
import { AiOutputDisplay } from"@/components/shared/ai-output-display";
import { FileCheck2, FileText, RefreshCw, Scale, ShieldCheck, Type } from "lucide-react";
import toast from"react-hot-toast";

export default function AiContractorAgreementClient() {
  const [clientName, setClientName] = useState("Acme Technologies Inc.");
  const [model, setModel] = useState("gpt4o");
  const [contractorName, setContractorName] = useState("Nexus Digital LLC");
  const [services, setServices] = useState("Full-Stack Web Development & Cloud Infrastructure Maintenance");
  const [paymentTerms, setPaymentTerms] = useState("$75/hr billed bi-weekly, Net 15 payment terms");
  const [jurisdiction, setJurisdiction] = useState("State of California, USA");
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const generateAgreement = async () => {
    if (!clientName.trim() || !contractorName.trim()) return;
    setLoading(true);
    try {
      const prompt = `Draft a standard Independent Contractor Agreement clause structure: Client: '${clientName}', Contractor: '${contractorName}', Services: '${services}', Payment Terms: '${paymentTerms}', Jurisdiction: '${jurisdiction}'. Structure into 4 core contract clauses: Clause 1: Scope of Services & Deliverables, Clause 2: Payment Structure & Invoicing Rules, Clause 3: Intellectual Property (IP) Work-for-Hire Assignment, Clause 4: Non-Disclosure (NDA) & Termination Notice. Format as 4 distinct agreement clause cards. Disclaimer: Educational draft template. No markdown asterisks.`;
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
        toast.success("AI Contractor Agreement drafted!");
      } else {
        throw new Error("No results");
      }
    } catch (err) {
      toast.error("AI drafting failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

 <ToolPageHeader icon={ShieldCheck} title="AI Independent Contractor Agreement Studio" description="Draft custom contractor agreements, IP work-for-hire clauses, payment terms, and confidentiality terms powered by live AI." />

 <div className="mb-4">


   <ModelSelector value={model} onChange={setModel} />


 </div>


 <GlassCard className="p-6 space-y-4">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div className="space-y-2">
 <label className="text-xs font-bold text-foreground block">Client Company Name:</label>
 <Input type="text" value={clientName} onChange={e => setClientName(e.target.value)} placeholder="e.g. Apex Software Inc." className="h-11 font-medium" />
 </div>

 <div className="space-y-2">
 <label className="text-xs font-bold text-foreground block">Contractor / Freelancer Name:</label>
 <Input type="text" value={contractorName} onChange={e => setContractorName(e.target.value)} placeholder="e.g. John Doe Consulting" className="h-11 font-medium" />
 </div>
 </div>

 <div className="space-y-2">
 <label className="text-xs font-bold text-foreground block">Services & Work Description:</label>
 <Textarea value={services} onChange={e => setServices(e.target.value)} placeholder="Describe contractor duties, milestones, and deliverables..." className="min-h-[90px]" />
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div className="space-y-2">
 <label className="text-xs font-bold text-foreground block">Payment Rate & Terms:</label>
 <Input type="text" value={paymentTerms} onChange={e => setPaymentTerms(e.target.value)} placeholder="e.g. $5,000 fixed milestone, Net 30" className="h-11" />
 </div>

 <div className="space-y-2">
 <label className="text-xs font-bold text-foreground block">Governing Jurisdiction / State:</label>
 <Input type="text" value={jurisdiction} onChange={e => setJurisdiction(e.target.value)} placeholder="e.g. State of Delaware, USA" className="h-11" />
 </div>
 </div>

 <div className="flex justify-end pt-2">
 <Button onClick={generateAgreement} disabled={loading || !clientName.trim() || !contractorName.trim()} className="gap-2 font-bold h-11 px-6 shadow-md">
 <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
 {loading ? "AI Drafting Agreement..." : "AI Draft Contractor Agreement"}
 </Button>
 </div>
 </GlassCard>

 {/* Output */}
 {results.length > 0 && (
 <AiOutputDisplay
 title="Generated Contractor Agreement Draft Clauses"
 subtitle="Scope of work, IP ownership, payment terms, and non-disclosure clauses"
 content={results}
 loading={loading}
 onRegenerate={generateAgreement}
 variant="cards"
 />
 )}
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Enter Details",
    description:"Add parties and scope.",
    icon: FileText,
  },
{
    step:"02",
    title:"Set Terms",
    description:"Define payment and IP.",
    icon: Scale,
  },
{
    step:"03",
    title:"Generate",
    description:"Produce the agreement.",
    icon: FileCheck2,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: FileText,
    title:"Guided Input",
    description:"Structured questions.",
  },
{
    icon: Scale,
    title:"Terms",
    description:"Payment, IP, duration.",
  },
{
    icon: FileCheck2,
    title:"Draft",
    description:"Ready-to-review document.",
  },
{
    icon: ShieldCheck,
    title:"Clarity",
    description:"Plain-language clauses.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>An AI contractor agreement studio builds a clean independent-contractor contract from structured inputs, saving the blank-page problem. It covers the essentials — parties, scope, payment, IP, and term — in plain language. This tool produces a draft you can refine.</p>
  <p>Clarity prevents disputes. Vague scope and undefined IP ownership cause most contractor conflicts; the generator prompts for specifics so those points are explicit. Plain-language clauses reduce misunderstanding.</p>
  <p>This is a starting draft, not legal advice; have counsel review before signing. The tool's value is a complete, structured agreement skeleton in minutes instead of hours.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"What is it?",
    answer:"A contract between a company and a non-employee.",
  },
{
    question:"Legally binding?",
    answer:"Aid only; have a lawyer review.",
  },
{
    question:"Covers IP?",
    answer:"Yes, assignment clauses included.",
  },
{
    question:"Free?",
    answer:"Yes, generates a draft.",
  },
{
    question:"Jurisdiction?",
    answer:"Customize to your region.",
  }
  ]}
/>
    </div>
    </div>
);
}
