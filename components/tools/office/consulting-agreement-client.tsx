"use client";

import { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { ActionButton, CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { FileText, ShieldCheck, Copy, Printer, Sparkles, Shield, Zap } from"lucide-react";
import toast from"react-hot-toast";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

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
      <div className="relative space-y-6">
      <GridPattern />

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
          <h3>Why Use Our Consulting Services Agreement Generator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Consulting Services Agreement Generator provides
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

      <RelatedTools currentToolUrl="/tools/office/consulting-agreement" max={6} />

</div>
 );
}
