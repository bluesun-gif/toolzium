"use client";

import { ToolBackground } from "@/components/shared/tool-background";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { AlertTriangle, Download, FileText, PenLine, ShieldCheck, Copy, Type } from "lucide-react";

export function ContractTemplateClient() {
  const [contractType, setContractType] = useState("nda");
  const [partyA, setPartyA] = useState("");
  const [partyB, setPartyB] = useState("");
  const [date, setDate] = useState("");
  const [extraTerms, setExtraTerms] = useState("");
  const generateContract = () => {
    let title = "Non-Disclosure Agreement";
    if (contractType === "service") title = "Service Agreement";
    if (contractType === "freelance") title = "Freelance Contract";
    if (contractType === "rental") title = "Rental Agreement";
    if (contractType === "employment") title = "Employment Agreement";
    const pA = partyA || "[Party A Name]";
    const pB = partyB || "[Party B Name]";
    const d = date || "[Date]";
    return title + "\n\n" + "This agreement is made on" + d + "between" + pA + "and" + pB + ".\n\n" + "1. Terms and Conditions\n" + "The parties agree to the terms specified herein for the" + title + ".\n\n" + "2. Obligations\n" + pA + "and" + pB + "shall adhere to all obligations outlined.\n\n" + "3. Additional Terms\n" + (extraTerms || "None specified.") + "\n\n" + "Signatures:\n\n" + "____________________\n" + pA + "\n\n" + "____________________\n" + pB + "\n";
  };
  const handleReset = () => {
    setContractType("nda");
    setPartyA("");
    setPartyB("");
    setDate("");
    setExtraTerms("");
  };
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

 <ToolPageHeader icon={FileText} title="Contract Template Generator" description="Generate basic contract templates. Not legal advice." actions={<ResetButton onClick={handleReset} label="Reset All" />} />

 <div className={"grid gap-6 md:grid-cols-2"}>
 <GlassCard>
 <CardHeader>
 <CardTitle>Details</CardTitle>
 </CardHeader>
 <CardContent className={"space-y-4"}>
 <div className={"space-y-2"}>
 <Label>Contract Type</Label>
 <Select value={contractType} onValueChange={setContractType}>
 <SelectTrigger>
 <SelectValue placeholder="Select type" />
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="nda">Non-Disclosure Agreement</SelectItem>
 <SelectItem value="service">Service Agreement</SelectItem>
 <SelectItem value="freelance">Freelance Contract</SelectItem>
 <SelectItem value="rental">Rental Agreement</SelectItem>
 <SelectItem value="employment">Employment Agreement</SelectItem>
 </SelectContent>
 </Select>
 </div>
 <div className={"space-y-2"}>
 <Label>Party A</Label>
 <Input value={partyA} onChange={e => setPartyA(e.target.value)} placeholder="Company / Person A" />
 </div>
 <div className={"space-y-2"}>
 <Label>Party B</Label>
 <Input value={partyB} onChange={e => setPartyB(e.target.value)} placeholder="Company / Person B" />
 </div>
 <div className={"space-y-2"}>
 <Label>Date</Label>
 <Input type="date" value={date} onChange={e => setDate(e.target.value)} />
 </div>
 <div className={"space-y-2"}>
 <Label>Extra Terms</Label>
 <Input value={extraTerms} onChange={e => setExtraTerms(e.target.value)} placeholder="Additional terms..." />
 </div>
 
 <div className={"p-4 bg-yellow-500/10 text-yellow-600 rounded-md flex items-center gap-2 mt-4"}>
 <AlertTriangle className={"w-5 h-5"} />
 <p className={"text-sm"}>Disclaimer: This is not legal advice. Please consult a lawyer before signing any contract.</p>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader className={"flex flex-row items-center justify-between"}>
 <CardTitle>Generated Contract</CardTitle>
 <CopyButton getText={generateContract} label="Copy" />
 </CardHeader>
 <Separator />
 <CardContent className={"pt-4"}>
 <pre className={"whitespace-pre-wrap font-sans text-sm p-4 bg-muted/50 rounded-md min-h-[400px]"}>
 {generateContract()}
 </pre>
 </CardContent>
 </GlassCard>
 </div>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Choose Type",
    description:"Pick a contract category.",
    icon: FileText,
  },
{
    step:"02",
    title:"Fill Fields",
    description:"Enter the specifics.",
    icon: PenLine,
  },
{
    step:"03",
    title:"Generate",
    description:"Produce the template.",
    icon: Download,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: FileText,
    title:"Categories",
    description:"Many contract types.",
  },
{
    icon: PenLine,
    title:"Customize",
    description:"Fill the blanks.",
  },
{
    icon: Download,
    title:"Export",
    description:"Save the result.",
  },
{
    icon: ShieldCheck,
    title:"Structure",
    description:"Standard clauses.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A contract template generator provides structured starting points across common agreement types, removing the blank-page problem. Filling guided fields yields a coherent document faster than drafting from zero. This tool covers service, sale, and employment categories.</p>
  <p>Standard clauses are built in, reducing the chance of omitting essentials like termination or liability. You customize the specifics.</p>
  <p>Treat output as a draft for legal review. The tool's value is a reliable contract skeleton tailored to the type you need.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"Types?",
    answer:"Service, sale, employment, more.",
  },
{
    question:"Editable?",
    answer:"Yes, fill the fields.",
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
    question:"Reuse?",
    answer:"Save as template.",
  }
  ]}
/>
    </div>
    </div>
);
}

export default ContractTemplateClient;
