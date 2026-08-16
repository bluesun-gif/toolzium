"use client";
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
import { ActionButton, CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { CheckCircle, CheckCircle2, Download, FileOutput, FileText, Printer, ShieldCheck } from"lucide-react";
import { Textarea } from"@/components/ui/textarea";

export function CompletionLetterClient() {
 const [projectName, setProjectName] = useState("");
 const [completionDate, setCompletionDate] = useState("");
 const [clientName, setClientName] = useState("");
 const [clientOrg, setClientOrg] = useState("");
 const [contractorName, setContractorName] = useState("");
 const [scope, setScope] = useState("");
 const [deliverables, setDeliverables] = useState("");
 const [warranty, setWarranty] = useState("");
 const [signatoryName, setSignatoryName] = useState("");
 const [signatoryTitle, setSignatoryTitle] = useState("");

 const handleReset = () => {
 setProjectName("");
 setCompletionDate("");
 setClientName("");
 setClientOrg("");
 setContractorName("");
 setScope("");
 setDeliverables("");
 setWarranty("");
 setSignatoryName("");
 setSignatoryTitle("");
 };

 const getLetterText = () => {
 return"WORK COMPLETION CERTIFICATE\n\n"+
"Date:"+ completionDate +"\n\n"+
"To:"+ clientName + (clientOrg ?","+ clientOrg :"") +"\n"+
"From:"+ contractorName +"\n\n"+
"Subject: Project Completion Sign-off -"+ projectName +"\n\n"+
"Dear"+ clientName +",\n\n"+
"This letter serves as formal notification that the project '"+ projectName +"' has been successfully completed in accordance with our agreement.\n\n"+
"Scope of Work Summary:\n"+ scope +"\n\n"+
"Final Deliverables:\n"+ deliverables +"\n\n"+
 (warranty ?"Warranty Terms:\nA warranty period of"+ warranty +"months applies from the date of completion.\n\n":"") +
"Please sign below to acknowledge acceptance of the completed work.\n\n"+
"Sincerely,\n\n"+
"______________________\n"+
 signatoryName +"\n"+
 signatoryTitle +"\n"+
 contractorName +"\n\n\n"+
"Client Acceptance:\n\n"+
"______________________\n"+
 clientName +"\n"+
"Date: _______________";
 };

 const handlePrint = () => {
 const printWindow = window.open("","_blank");
 if (printWindow) {
 printWindow.document.write("<html><head><title>Print Letter</title><style>body { font-family: serif; line-height: 1.5; margin: 2rem; white-space: pre-wrap; }</style></head><body>"+ getLetterText() +"</body></html>");
 printWindow.document.close();
 printWindow.print();
 }
 };

 return (
 <div className="space-y-6">
 <ToolPageHeader
 icon={CheckCircle}
 title="Work Completion Letter Generator"
 description="Generate formal Work Completion Certificates & Project Sign-off Letters."
 actions={
 <React.Fragment>
 <ResetButton onClick={handleReset} label="Clear"/>
 </React.Fragment>
 }
 />

 <div className={"grid grid-cols-1 md:grid-cols-2 gap-6"}>
 <GlassCard>
 <CardHeader>
 <CardTitle>Project Details</CardTitle>
 <CardDescription>Enter the information for the completion letter.</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Project Name</Label>
 <Input value={projectName} onChange={(e) => setProjectName(e.target.value)} placeholder="e.g. Website Redesign"/>
 </div>
 <div className="space-y-2">
 <Label>Completion Date</Label>
 <Input type="date"value={completionDate} onChange={(e) => setCompletionDate(e.target.value)} />
 </div>
 </div>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Client Name</Label>
 <Input value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="e.g. John Doe"/>
 </div>
 <div className="space-y-2">
 <Label>Client Organization</Label>
 <Input value={clientOrg} onChange={(e) => setClientOrg(e.target.value)} placeholder="e.g. Acme Corp"/>
 </div>
 </div>
 <div className="space-y-2">
 <Label>Contractor / Agency Name</Label>
 <Input value={contractorName} onChange={(e) => setContractorName(e.target.value)} placeholder="e.g. Creative Solutions LLC"/>
 </div>
 <div className="space-y-2">
 <Label>Scope of Work Summary</Label>
 <Textarea value={scope} onChange={(e) => setScope(e.target.value)} placeholder="Brief description of work done..."rows={3} />
 </div>
 <div className="space-y-2">
 <Label>Final Deliverables</Label>
 <Textarea value={deliverables} onChange={(e) => setDeliverables(e.target.value)} placeholder="- Design files\n- Source code"rows={3} />
 </div>
 <div className="space-y-2">
 <Label>Warranty Terms (Months)</Label>
 <Input type="number"value={warranty} onChange={(e) => setWarranty(e.target.value)} placeholder="e.g. 12"/>
 </div>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Signatory Name</Label>
 <Input value={signatoryName} onChange={(e) => setSignatoryName(e.target.value)} placeholder="e.g. Jane Smith"/>
 </div>
 <div className="space-y-2">
 <Label>Signatory Title</Label>
 <Input value={signatoryTitle} onChange={(e) => setSignatoryTitle(e.target.value)} placeholder="e.g. Project Manager"/>
 </div>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Letter Preview</CardTitle>
 <CardDescription>Review and copy the generated letter.</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className={"bg-muted p-4 rounded-md whitespace-pre-wrap font-serif text-sm border min-h-[400px]"}>
 {getLetterText()}
 </div>
 <div className={"flex gap-2 justify-end"}>
 <CopyButton getText={getLetterText} label="Copy Text"/>
 <ActionButton onClick={handlePrint} icon={Printer} label="Print"/>
 </div>
 </CardContent>
 </GlassCard>
 </div>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Enter Project",
    description:"Add work and parties.",
    icon: FileText,
  },
{
    step:"02",
    title:"Confirm",
    description:"State completion and handover.",
    icon: CheckCircle2,
  },
{
    step:"03",
    title:"Generate",
    description:"Produce the letter.",
    icon: Download,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: FileText,
    title:"Project Info",
    description:"Scope and dates.",
  },
{
    icon: CheckCircle2,
    title:"Acceptance",
    description:"Confirms done.",
  },
{
    icon: Download,
    title:"Export",
    description:"Ready letter.",
  },
{
    icon: ShieldCheck,
    title:"Record",
    description:"Useful for disputes.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A work completion letter generator produces the document that confirms a job is done and accepted — important for triggering final payment and limiting ongoing liability. Ambiguity about completion invites disputes; this tool states it clearly.</p>
  <p>Acceptance language matters. Explicitly confirming handover protects both sides. The letter also serves as a record if questions arise later.</p>
  <p>Use it at project closeout. The tool's value is a clear completion record that supports payment and closure.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"What is it?",
    answer:"Confirms work finished and accepted.",
  },
{
    question:"Why use one?",
    answer:"Triggers payment, limits liability.",
  },
{
    question:"Binding?",
    answer:"Draft; review as needed.",
  },
{
    question:"Free?",
    answer:"Yes.",
  },
{
    question:"Keep copy?",
    answer:"Yes, for records.",
  }
  ]}
/>
</div>
 );
}
