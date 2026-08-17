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
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Switch } from"@/components/ui/switch";
import { ActionButton, CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { Copy, FileCheck2, FileText, ListChecks, Printer, ShieldCheck } from"lucide-react";
import { toast } from"react-hot-toast";

export function ServiceContractClient() {
  const [providerName, setProviderName] = useState("");
  const [providerAddress, setProviderAddress] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [effectiveDate, setEffectiveDate] = useState("");
  const [servicesScope, setServicesScope] = useState("");
  const [compensationTerms, setCompensationTerms] = useState("");
  const [noticePeriod, setNoticePeriod] = useState("30");
  const [ipAssignment, setIpAssignment] = useState(true);
  const [confidentiality, setConfidentiality] = useState(true);
  const generateContract = () => {
    return "PROFESSIONAL SERVICE CONTRACT\n\n" + "This Professional Service Contract (the \"Agreement\") is entered into as of" + (effectiveDate || "[Date]") + "(the \"Effective Date\"), by and between:\n\n" + "Service Provider:" + (providerName || "[Provider Name]") + ", located at" + (providerAddress || "[Provider Address]") + "\n" + "Client:" + (clientName || "[Client Name]") + ", located at" + (clientAddress || "[Client Address]") + "\n\n" + "1. SERVICES RENDERED\n" + "The Service Provider agrees to provide the following services (the \"Services\"):" + (servicesScope || "[Scope of Services]") + ".\n\n" + "2. COMPENSATION\n" + "In consideration for the Services, the Client agrees to pay the Service Provider as follows:" + (compensationTerms || "[Compensation Terms]") + ".\n\n" + "3. TERM AND TERMINATION\n" + "Either party may terminate this Agreement at any time upon" + noticePeriod + "days written notice to the other party.\n\n" + (ipAssignment ? "4. INTELLECTUAL PROPERTY\nThe Service Provider agrees that any intellectual property created during the performance of the Services shall be the sole property of the Client.\n\n" : "") + (confidentiality ? "5. CONFIDENTIALITY\nThe Service Provider agrees to keep confidential any proprietary information provided by the Client.\n\n" : "") + "IN WITNESS WHEREOF, the parties hereto have executed this Agreement as of the Effective Date.\n\n" + "Service Provider Signature: __________________\n" + "Client Signature: __________________";
  };
  const handlePrint = () => {
    window.print();
  };
  const handleReset = () => {
    setProviderName("");
    setProviderAddress("");
    setClientName("");
    setClientAddress("");
    setEffectiveDate("");
    setServicesScope("");
    setCompensationTerms("");
    setNoticePeriod("30");
    setIpAssignment(true);
    setConfidentiality(true);
    toast.success("Form reset");
  };
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

 <ToolPageHeader icon={FileText} title="Professional Service Contract Generator" description="Generate formal Professional Service Contracts & Independent Contractor Agreements." actions={<div className={"flex space-x-2"}>
 <ResetButton onClick={handleReset} label="Reset" />
 </div>} />
 
 <div className={"grid gap-6 md:grid-cols-2"}>
 <GlassCard>
 <CardHeader>
 <CardTitle>Contract Details</CardTitle>
 <CardDescription>Enter the parties and terms</CardDescription>
 </CardHeader>
 <CardContent className={"space-y-4"}>
 <div className={"space-y-2"}>
 <Label>Service Provider Name</Label>
 <Input value={providerName} onChange={e => setProviderName(e.target.value)} placeholder="e.g. John Doe Consulting" />
 </div>
 <div className={"space-y-2"}>
 <Label>Provider Address</Label>
 <Input value={providerAddress} onChange={e => setProviderAddress(e.target.value)} placeholder="123 Main St..." />
 </div>
 <div className={"space-y-2"}>
 <Label>Client Name</Label>
 <Input value={clientName} onChange={e => setClientName(e.target.value)} placeholder="e.g. Acme Corp" />
 </div>
 <div className={"space-y-2"}>
 <Label>Client Address</Label>
 <Input value={clientAddress} onChange={e => setClientAddress(e.target.value)} placeholder="456 Market St..." />
 </div>
 <div className={"space-y-2"}>
 <Label>Effective Date</Label>
 <Input type="date" value={effectiveDate} onChange={e => setEffectiveDate(e.target.value)} />
 </div>
 <div className={"space-y-2"}>
 <Label>Services Scope Description</Label>
 <Input value={servicesScope} onChange={e => setServicesScope(e.target.value)} placeholder="Web development, consulting..." />
 </div>
 <div className={"space-y-2"}>
 <Label>Compensation Terms</Label>
 <Input value={compensationTerms} onChange={e => setCompensationTerms(e.target.value)} placeholder="$50/hour, or $5000 fixed fee..." />
 </div>
 <div className={"space-y-2"}>
 <Label>Termination Notice Period (days)</Label>
 <Input type="number" value={noticePeriod} onChange={e => setNoticePeriod(e.target.value)} />
 </div>
 
 <Separator />
 <div className={"flex items-center justify-between"}>
 <Label className={"cursor-pointer"} onClick={() => setIpAssignment(!ipAssignment)}>Intellectual Property Assignment</Label>
 <Switch checked={ipAssignment} onCheckedChange={setIpAssignment} />
 </div>
 <div className={"flex items-center justify-between"}>
 <Label className={"cursor-pointer"} onClick={() => setConfidentiality(!confidentiality)}>Confidentiality Clause</Label>
 <Switch checked={confidentiality} onCheckedChange={setConfidentiality} />
 </div>
 </CardContent>
 </GlassCard>
 
 <GlassCard>
 <CardHeader>
 <div className={"flex items-center justify-between"}>
 <div>
 <CardTitle>Document Preview</CardTitle>
 <CardDescription>Review and export your contract</CardDescription>
 </div>
 <div className={"flex space-x-2"}>
 <CopyButton getText={generateContract} label="Copy" />
 <ActionButton onClick={handlePrint} icon={Printer} label="Print" variant="outline" size="default" />
 </div>
 </div>
 </CardHeader>
 <CardContent>
 <div className={"bg-background p-6 rounded border text-black text-sm whitespace-pre-wrap font-serif"}>
 {generateContract()}
 </div>
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
    title:"Define Work",
    description:"Scope, deliverables, fees.",
    icon: ListChecks,
  },
{
    step:"03",
    title:"Generate",
    description:"Build the contract.",
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
    icon: ListChecks,
    title:"Scope",
    description:"Deliverables.",
  },
{
    icon: FileCheck2,
    title:"Draft",
    description:"Ready document.",
  },
{
    icon: ShieldCheck,
    title:"Terms",
    description:"Payment and IP.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A service contract generator builds the agreement governing professional engagements, covering scope, deliverables, fees, and IP. Detailed contracts prevent the misunderstandings that derail projects. This tool assembles the essentials.</p>
  <p>IP and payment terms are the frequent flashpoints; the generator includes explicit clauses so ownership and timing are clear.</p>
  <p>Review with counsel before signing. The tool's value is a structured service contract draft that reduces project risk.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"What is it?",
    answer:"Contract for professional services.",
  },
{
    question:"Covers IP?",
    answer:"Yes, assignment clause.",
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
    answer:"Consultants and agencies.",
  }
  ]}
/>
    </div>
    </div>
);
}

export default ServiceContractClient;
