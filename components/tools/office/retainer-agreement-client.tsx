"use client";

import { ToolBackground } from "@/components/shared/tool-background";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { FileCheck2, FileText, Printer, Scale, ShieldCheck, Copy } from "lucide-react";
import { RelatedTools } from "@/components/shared/related-tools";
import { Button } from"@/components/ui/button";

export function RetainerAgreementClient() {
  const [providerName, setProviderName] = useState("Acme Agency");
  const [clientName, setClientName] = useState("Globex Corp");
  const [retainerAmount, setRetainerAmount] = useState("2000");
  const [includedHours, setIncludedHours] = useState("20");
  const [overageRate, setOverageRate] = useState("120");
  const [scope, setScope] = useState("Web maintenance, SEO, and graphic design.");
  const [rollover, setRollover] = useState("Expire");
  const [terminationNotice, setTerminationNotice] = useState("30");
  const generateAgreement = () => {
    return "PROFESSIONAL SERVICE RETAINER AGREEMENT\n\n" + "This Retainer Agreement is entered into between" + providerName + "(\"Service Provider\") and" + clientName + "(\"Client\").\n\n" + "1. SERVICES RENDERED\n" + "The Service Provider agrees to perform the following services:" + scope + "\n\n" + "2. RETAINER FEE AND ALLOCATION\n" + "The Client agrees to pay a monthly retainer fee of $" + retainerAmount + "." + "This fee includes up to" + includedHours + "hours of service per month.\n\n" + "3. OVERAGE RATE\n" + "Any hours worked beyond the included" + includedHours + "hours will be billed at a rate of $" + overageRate + "per hour.\n\n" + "4. UNUSED HOURS\n" + "Any unused hours at the end of the month will" + (rollover === "Expire" ? "expire and not carry over" : "roll over") + "to the following month.\n\n" + "5. TERMINATION\n" + "Either party may terminate this agreement with" + terminationNotice + "days written notice.\n\n" + "IN WITNESS WHEREOF, the parties hereto have executed this Agreement:\n\n" + "Service Provider: ______________________ Date: ________\n" + "Client: ______________________ Date: ________";
  };
  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write("<pre>" + generateAgreement() + "</pre>");
      printWindow.document.close();
      printWindow.print();
    }
  };
  const handleReset = () => {
    setProviderName("Acme Agency");
    setClientName("Globex Corp");
    setRetainerAmount("2000");
    setIncludedHours("20");
    setOverageRate("120");
    setScope("Web maintenance, SEO, and graphic design.");
    setRollover("Expire");
    setTerminationNotice("30");
  };
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

 <ToolPageHeader title="Professional Service Retainer Agreement Generator" description="Generate formal Monthly Service Retainer Contracts for freelancers & agencies." icon={FileText} actions={<>
 <CopyButton getText={generateAgreement} label="Copy Text" />
 <Button variant="outline" size="sm" onClick={handlePrint} className="h-8 gap-1.5"><Printer className="h-3.5 w-3.5" />Print</Button>
 <ResetButton onClick={handleReset} label="Reset" />
 </>} />

 <div className="grid md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2"><ShieldCheck className="w-5 h-5" /> Agreement Details</CardTitle>
 <CardDescription>Enter the contract information.</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Service Provider Name</Label>
 <Input value={providerName} onChange={e => setProviderName(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Client Name</Label>
 <Input value={clientName} onChange={e => setClientName(e.target.value)} />
 </div>
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Retainer Amount ($/mo)</Label>
 <Input type="number" value={retainerAmount} onChange={e => setRetainerAmount(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Included Hours</Label>
 <Input type="number" value={includedHours} onChange={e => setIncludedHours(e.target.value)} />
 </div>
 </div>
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Overage Rate ($/hr)</Label>
 <Input type="number" value={overageRate} onChange={e => setOverageRate(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Notice Period (Days)</Label>
 <Input type="number" value={terminationNotice} onChange={e => setTerminationNotice(e.target.value)} />
 </div>
 </div>
 <div className="space-y-2">
 <Label>Scope of Services</Label>
 <Input value={scope} onChange={e => setScope(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Unused Hours Clause</Label>
 <Select value={rollover} onValueChange={setRollover}>
 <SelectTrigger>
 <SelectValue />
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="Expire">Expire each month</SelectItem>
 <SelectItem value="Rollover">Rollover to next month</SelectItem>
 </SelectContent>
 </Select>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Generated Agreement</CardTitle>
 <CardDescription>Preview your contract</CardDescription>
 </CardHeader>
 <CardContent>
 <pre className="whitespace-pre-wrap font-mono text-sm p-4 bg-muted/50 rounded-md border min-h-[400px]">
 {generateAgreement()}
 </pre>
 </CardContent>
 </GlassCard>
 </div>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Enter Parties",
    description:"Add provider and client.",
    icon: FileText,
  },
{
    step:"02",
    title:"Set Retainer",
    description:"Define fee and scope.",
    icon: Scale,
  },
{
    step:"03",
    title:"Generate",
    description:"Build the agreement.",
    icon: FileCheck2,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: FileText,
    title:"Parties",
    description:"Identities.",
  },
{
    icon: Scale,
    title:"Fee Terms",
    description:"Recurring and limits.",
  },
{
    icon: FileCheck2,
    title:"Draft",
    description:"Ready document.",
  },
{
    icon: ShieldCheck,
    title:"Clauses",
    description:"Termination included.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A retainer agreement generator builds the contract for ongoing advisory relationships, defining a recurring fee and the work it covers. Clear retainers prevent scope creep and ensure steady engagement. This tool structures fee and scope.</p>
  <p>Termination and limit clauses protect both sides. The generator includes them so expectations are explicit from the start.</p>
  <p>Review with counsel. The tool's value is a complete retainer draft that supports predictable client work.</p>
  </div>
</ToolFeatureGuides>
      <RelatedTools currentToolUrl="/tools/office/retainer-agreement" max={6} />

<ToolFaqAccordion
  faqs={[
{
    question:"What is a retainer?",
    answer:"Ongoing fee for availability.",
  },
{
    question:"Scope limits?",
    answer:"Yes, define included work.",
  },
{
    question:"Binding?",
    answer:"Draft; legal review.",
  },
{
    question:"Free?",
    answer:"Yes.",
  },
{
    question:"Use case?",
    answer:"Agencies, lawyers, consultants.",
  }
  ]}
/>
    </div>
    </div>
);
}

export default RetainerAgreementClient;
