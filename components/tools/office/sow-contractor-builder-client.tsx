"use client";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { ActionButton, CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { FileText, ShieldCheck, Copy, Printer, Sparkles, Shield, Zap } from"lucide-react";
import toast from"react-hot-toast";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

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
 return"STATEMENT OF WORK (SOW)\n\n"+
"Client:"+ clientName +"\n"+
"Contractor:"+ contractorName +"\n"+
"Project:"+ projectTitle +"\n"+
"Effective Date:"+ effectiveDate +"\n"+
"Target Completion Date:"+ completionDate +"\n\n"+
"1. DELIVERABLES\n"+ deliverables +"\n\n"+
"2. MILESTONE PAYMENT SCHEDULE\n"+ paymentSchedule +"\n\n"+
"3. ACCEPTANCE CRITERIA & SIGN-OFF TERMS\n"+ acceptanceCriteria;
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

 return (
 <div className="space-y-6">
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray="4 2"
        className="absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
      />

 <ToolPageHeader
 icon={FileText}
 title="Independent Contractor SOW Builder"
 description="Generate Independent Contractor Statements of Work (SOW)."
 actions={
 <React.Fragment>
 <ResetButton onClick={handleReset} label="Reset"/>
 </React.Fragment>
 }
 />
 
 <div className="grid md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>SOW Details</CardTitle>
 <CardDescription>Enter project information</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Client Name</Label>
 <Input value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="Client Corp"/>
 </div>
 <div className="space-y-2">
 <Label>Contractor Name</Label>
 <Input value={contractorName} onChange={(e) => setContractorName(e.target.value)} placeholder="Jane Doe"/>
 </div>
 <div className="space-y-2">
 <Label>Project Title</Label>
 <Input value={projectTitle} onChange={(e) => setProjectTitle(e.target.value)} placeholder="Website Redesign"/>
 </div>
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Effective Date</Label>
 <Input type="date"value={effectiveDate} onChange={(e) => setEffectiveDate(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Target Completion</Label>
 <Input type="date"value={completionDate} onChange={(e) => setCompletionDate(e.target.value)} />
 </div>
 </div>
 <div className="space-y-2">
 <Label>Deliverables List</Label>
 <Input value={deliverables} onChange={(e) => setDeliverables(e.target.value)} placeholder="1. Design mockups"/>
 </div>
 <div className="space-y-2">
 <Label>Payment Schedule</Label>
 <Input value={paymentSchedule} onChange={(e) => setPaymentSchedule(e.target.value)} placeholder="50% upfront"/>
 </div>
 <div className="space-y-2">
 <Label>Acceptance Criteria</Label>
 <Input value={acceptanceCriteria} onChange={(e) => setAcceptanceCriteria(e.target.value)} placeholder="Client approval"/>
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
 <ActionButton onClick={handlePrint} icon={Printer} label="Print"variant="outline"size="default"/>
 <CopyButton getText={generateSow} label="Copy"/>
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
          <h3>Why Use Our Independent Contractor SOW Builder?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Independent Contractor SOW Builder provides
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

      <RelatedTools currentToolUrl="/tools/office/sow-contractor-builder" max={6} />

</div>
 );
}
