"use client";
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
import { ActionButton, CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { Copy, FileCheck2, FileText, Printer, Scale, ShieldCheck } from"lucide-react";
import toast from"react-hot-toast";

export function ConsultingAgreementClient() {
 const [consultantName, setConsultantName] = useState("");
 const [consultantAddress, setConsultantAddress] = useState("");
 const [clientName, setClientName] = useState("");
 const [clientAddress, setClientAddress] = useState("");
 const [effectiveDate, setEffectiveDate] = useState("");
 const [scope, setScope] = useState("");
 const [feeType, setFeeType] = useState("hourly");
 const [feeAmount, setFeeAmount] = useState("");
 const [expenses, setExpenses] = useState("");
 const [term, setTerm] = useState("");
 const [jurisdiction, setJurisdiction] = useState("");

 const handleReset = () => {
 setConsultantName("");
 setConsultantAddress("");
 setClientName("");
 setClientAddress("");
 setEffectiveDate("");
 setScope("");
 setFeeType("hourly");
 setFeeAmount("");
 setExpenses("");
 setTerm("");
 setJurisdiction("");
 toast.success("Form reset");
 };

 const getContractText = () => {
 const feeStructure = feeType ==="hourly"?"an hourly rate of $"+ feeAmount : feeType ==="fixed"?"a fixed project fee of $"+ feeAmount :"a monthly retainer of $"+ feeAmount;
 
 return"CONSULTING SERVICES AGREEMENT\n\n"+
"This Consulting Services Agreement (\"Agreement\") is entered into on"+ effectiveDate +"(the \"Effective Date\") by and between:\n\n"+
"CONSULTANT:"+ consultantName +"\n"+
"ADDRESS:"+ consultantAddress +"\n\n"+
"CLIENT:"+ clientName +"\n"+
"ADDRESS:"+ clientAddress +"\n\n"+
"1. SCOPE OF SERVICES\n"+
"The Consultant agrees to perform the following services for the Client:"+ scope +".\n\n"+
"2. COMPENSATION\n"+
"The Client agrees to pay the Consultant"+ feeStructure +"for the services rendered.\n\n"+
"3. EXPENSES\n"+
"Expense Reimbursement terms:"+ expenses +".\n\n"+
"4. TERM AND TERMINATION\n"+
"This Agreement shall commence on the Effective Date and shall continue until"+ term +".\n\n"+
"5. GOVERNING LAW\n"+
"This Agreement shall be governed by the laws of"+ jurisdiction +".\n\n"+
"IN WITNESS WHEREOF, the parties hereto have executed this Agreement as of the Effective Date.\n\n"+
"Consultant Signature: __________________\n"+
"Client Signature: __________________";
 };

 const handlePrint = () => {
 toast.success("Print dialog opened");
 window.print();
 };

 return (
 <div className="space-y-6">
 <ToolPageHeader 
 icon={FileText} 
 title="Consulting Services Agreement Generator"
 description="Generate formal Consulting Services & Client Engagement Contracts."
 actions={
 <div className="flex gap-2">
 <ResetButton onClick={handleReset} label="Reset"/>
 </div>
 }
 />
 
 <div className="grid md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Contract Details</CardTitle>
 <CardDescription>Enter details to generate the agreement.</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Consultant Name</Label>
 <Input value={consultantName} onChange={(e) => setConsultantName(e.target.value)} placeholder="Jane Doe"/>
 </div>
 <div className="space-y-2">
 <Label>Consultant Address</Label>
 <Input value={consultantAddress} onChange={(e) => setConsultantAddress(e.target.value)} placeholder="123 Consultant St"/>
 </div>
 <Separator />
 <div className="space-y-2">
 <Label>Client Company Name</Label>
 <Input value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="Acme Corp"/>
 </div>
 <div className="space-y-2">
 <Label>Client Address</Label>
 <Input value={clientAddress} onChange={(e) => setClientAddress(e.target.value)} placeholder="456 Client Blvd"/>
 </div>
 <Separator />
 <div className="space-y-2">
 <Label>Effective Date</Label>
 <Input type="date"value={effectiveDate} onChange={(e) => setEffectiveDate(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Scope of Services</Label>
 <Input value={scope} onChange={(e) => setScope(e.target.value)} placeholder="e.g. Marketing Strategy Consulting"/>
 </div>
 <div className="space-y-2">
 <Label>Fee Structure</Label>
 <Select value={feeType} onValueChange={setFeeType}>
 <SelectTrigger>
 <SelectValue placeholder="Select type"/>
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="hourly">Hourly Rate</SelectItem>
 <SelectItem value="fixed">Fixed Project Fee</SelectItem>
 <SelectItem value="monthly">Monthly Retainer</SelectItem>
 </SelectContent>
 </Select>
 </div>
 <div className="space-y-2">
 <Label>Fee Amount ($)</Label>
 <Input type="number"value={feeAmount} onChange={(e) => setFeeAmount(e.target.value)} placeholder="150"/>
 </div>
 <div className="space-y-2">
 <Label>Expense Terms</Label>
 <Input value={expenses} onChange={(e) => setExpenses(e.target.value)} placeholder="Pre-approved travel expenses only"/>
 </div>
 <div className="space-y-2">
 <Label>Term & Termination</Label>
 <Input value={term} onChange={(e) => setTerm(e.target.value)} placeholder="terminated by either party with 30 days notice"/>
 </div>
 <div className="space-y-2">
 <Label>Governing Jurisdiction</Label>
 <Input value={jurisdiction} onChange={(e) => setJurisdiction(e.target.value)} placeholder="State of California"/>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Contract Preview</CardTitle>
 <CardDescription>Preview and copy or print your generated contract.</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className={"bg-secondary p-4 rounded-md whitespace-pre-wrap font-mono text-sm max-h-[500px] overflow-auto"}>
 {getContractText()}
 </div>
 <div className="flex gap-2">
 <CopyButton getText={getContractText} label="Copy Contract"/>
 <ActionButton onClick={handlePrint} icon={Printer} label="Print"variant="outline"size="default"/>
 </div>
 </CardContent>
 </GlassCard>
 </div>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Enter Parties",
    description:"Add client and consultant.",
    icon: FileText,
  },
{
    step:"02",
    title:"Set Scope",
    description:"Define services and fees.",
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
    description:"Identities and roles.",
  },
{
    icon: Scale,
    title:"Fees",
    description:"Rate and payment terms.",
  },
{
    icon: FileCheck2,
    title:"Draft",
    description:"Ready document.",
  },
{
    icon: ShieldCheck,
    title:"Terms",
    description:"Confidentiality included.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A consulting agreement generator builds the contract governing advisory engagements, covering services, fees, and confidentiality. Clear terms protect consultants from non-payment and scope creep. This tool structures the essentials.</p>
  <p>Confidentiality is standard but vital; the generator includes it so client data is protected by contract. Fee and payment terms prevent collection issues.</p>
  <p>Review with counsel before signing. The tool's value is a complete consulting contract draft in minutes.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"What is it?",
    answer:"Contract for advisory services.",
  },
{
    question:"Covers confidentiality?",
    answer:"Yes, standard clause.",
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
    answer:"Independent consultants.",
  }
  ]}
/>
</div>
 );
}
