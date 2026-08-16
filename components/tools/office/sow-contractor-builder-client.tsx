"use client";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { ActionButton, CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { CalendarRange, Copy, FileCheck2, FileText, ListChecks, Printer, Scale, ShieldCheck } from"lucide-react";
import toast from"react-hot-toast";

export function SowContractorBuilderClient() {
  const [clientName, setClientName] = useState("");
  const [contractorName, setContractorName] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [effectiveDate, setEffectiveDate] = useState("");
  const [completionDate, setCompletionDate] = useState("");
  const [deliverables, setDeliverables] = useState("");
  const [paymentSchedule, setPaymentSchedule] = useState("");
  const [acceptanceCriteria, setAcceptanceCriteria] = useState("");
  const generateSow = () => {
    return "STATEMENT OF WORK (SOW)\n\n" + "Client:" + clientName + "\n" + "Contractor:" + contractorName + "\n" + "Project:" + projectTitle + "\n" + "Effective Date:" + effectiveDate + "\n" + "Target Completion Date:" + completionDate + "\n\n" + "1. DELIVERABLES\n" + deliverables + "\n\n" + "2. MILESTONE PAYMENT SCHEDULE\n" + paymentSchedule + "\n\n" + "3. ACCEPTANCE CRITERIA & SIGN-OFF TERMS\n" + acceptanceCriteria;
  };
  const handlePrint = () => {
    window.print();
  };
  const handleReset = () => {
    setClientName("");
    setContractorName("");
    setProjectTitle("");
    setEffectiveDate("");
    setCompletionDate("");
    setDeliverables("");
    setPaymentSchedule("");
    setAcceptanceCriteria("");
    toast.success("Reset successfully");
  };
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={FileText} title="Independent Contractor SOW Builder" description="Generate Independent Contractor Statements of Work (SOW)." actions={<React.Fragment>
 <ResetButton onClick={handleReset} label="Reset" />
 </React.Fragment>} />
 
 <div className="grid md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>SOW Details</CardTitle>
 <CardDescription>Enter project information</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Client Name</Label>
 <Input value={clientName} onChange={e => setClientName(e.target.value)} placeholder="Client Corp" />
 </div>
 <div className="space-y-2">
 <Label>Contractor Name</Label>
 <Input value={contractorName} onChange={e => setContractorName(e.target.value)} placeholder="Jane Doe" />
 </div>
 <div className="space-y-2">
 <Label>Project Title</Label>
 <Input value={projectTitle} onChange={e => setProjectTitle(e.target.value)} placeholder="Website Redesign" />
 </div>
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Effective Date</Label>
 <Input type="date" value={effectiveDate} onChange={e => setEffectiveDate(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Target Completion</Label>
 <Input type="date" value={completionDate} onChange={e => setCompletionDate(e.target.value)} />
 </div>
 </div>
 <div className="space-y-2">
 <Label>Deliverables List</Label>
 <Input value={deliverables} onChange={e => setDeliverables(e.target.value)} placeholder="1. Design mockups" />
 </div>
 <div className="space-y-2">
 <Label>Payment Schedule</Label>
 <Input value={paymentSchedule} onChange={e => setPaymentSchedule(e.target.value)} placeholder="50% upfront" />
 </div>
 <div className="space-y-2">
 <Label>Acceptance Criteria</Label>
 <Input value={acceptanceCriteria} onChange={e => setAcceptanceCriteria(e.target.value)} placeholder="Client approval" />
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader className="flex flex-row items-center justify-between">
 <div>
 <CardTitle>Document Preview</CardTitle>
 <CardDescription>Generated SOW text</CardDescription>
 </div>
 <div className="flex gap-2">
 <ActionButton onClick={handlePrint} icon={Printer} label="Print" variant="outline" size="default" />
 <CopyButton getText={generateSow} label="Copy" />
 </div>
 </CardHeader>
 <CardContent>
 <pre className="whitespace-pre-wrap p-4 bg-muted rounded-md border text-sm min-h-[400px]">
 {generateSow()}
 </pre>
 </CardContent>
 </GlassCard>
 </div>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Define Work",
    description:"List contractor deliverables.",
    icon: ListChecks,
  },
{
    step:"02",
    title:"Set Schedule",
    description:"Milestones and payment.",
    icon: CalendarRange,
  },
{
    step:"03",
    title:"Build",
    description:"Create the SOW.",
    icon: FileCheck2,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: ListChecks,
    title:"Deliverables",
    description:"Itemized.",
  },
{
    icon: CalendarRange,
    title:"Timeline",
    description:"Milestones.",
  },
{
    icon: FileCheck2,
    title:"SOW",
    description:"Ready document.",
  },
{
    icon: Scale,
    title:"Payment",
    description:"Terms and rates.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>An independent contractor SOW builder defines the specific work a freelancer delivers, attaching to their agreement. Detailed SOWs prevent &quot;that wasn't included&quot; conflicts by making deliverables explicit. This tool itemizes work and schedule.</p>
  <p>Milestones tied to payment clarify when and how the contractor is paid. The builder structures both for alignment.</p>
  <p>Use as a draft with legal review. The tool's value is a precise contractor SOW that limits ambiguity.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"What is a contractor SOW?",
    answer:"Scope for an independent worker.",
  },
{
    question:"Why use?",
    answer:"Prevents scope disputes.",
  },
{
    question:"Binding?",
    answer:"Draft; review.",
  },
{
    question:"Free?",
    answer:"Yes.",
  },
{
    question:"Attach to?",
    answer:"Contractor agreement.",
  }
  ]}
/>
</div>
 );
}
