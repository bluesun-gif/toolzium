"use client";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { ActionButton, CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { CheckCircle, FileText, Printer, FileOutput, Sparkles, Shield, Zap, Copy } from"lucide-react";
import { Textarea } from"@/components/ui/textarea";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

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
      <div className="relative space-y-6">
      <GridPattern />

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
            step: "01",
            title: "Input Your Data",
            description: "Enter your information in the input field above and configure any options.",
            icon: Sparkles,
          },
          {
            step: "02",
            title: "Process & Generate",
            description: "The tool processes your input instantly and displays the results.",
            icon: Zap,
          },
          {
            step: "03",
            title: "Copy & Use",
            description: "Copy the output with one click and use it wherever you need.",
            icon: Copy,
          },
        ]}
        badges={["100% Free", "Instant Results", "Privacy-First"]}
      />

      <ToolFeatureGuides
        features={[
          {
            icon: Sparkles,
            title: "Lightning Fast",
            description: "Get results in milliseconds with our optimized client-side processing engine.",
          },
          {
            icon: Shield,
            title: "Completely Private",
            description: "All processing happens in your browser. Your data never leaves your device.",
          },
          {
            icon: Zap,
            title: "No Signup Required",
            description: "Use this tool instantly without creating an account or providing any personal information.",
          },
        ]}
      >
        <div className="prose dark:prose-invert max-w-none">
          <h3>Why Use Our Work Completion Letter Generator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Work Completion Letter Generator provides
            the functionality you need without any complexity or cost.
          </p>
          <p>
            Unlike server-based alternatives, everything runs locally in your browser, ensuring maximum
            privacy and zero latency. No data is ever transmitted to external servers, making it safe
            for sensitive information.
          </p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion
        faqs={[
          {
            question: "Is this tool free to use?",
            answer: "Yes, this tool is 100% free with no hidden costs, subscriptions, or usage limits.",
          },
          {
            question: "Is my data secure?",
            answer: "Absolutely. All processing happens locally in your browser. Your input data never leaves your device or gets sent to any server.",
          },
          {
            question: "Do I need to create an account?",
            answer: "No account or registration is required. Simply open the tool and start using it immediately.",
          },
        ]}
      />

      <RelatedTools currentToolUrl="/tools/office/completion-letter" max={6} />

</div>
 );
}
