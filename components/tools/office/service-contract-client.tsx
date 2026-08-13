"use client";

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
import { FileText, ShieldCheck, Copy, Printer, Sparkles, Shield, Zap } from"lucide-react";
import { toast } from"react-hot-toast";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

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
 return"PROFESSIONAL SERVICE CONTRACT\n\n"+
"This Professional Service Contract (the \"Agreement\") is entered into as of"+ (effectiveDate ||"[Date]") +"(the \"Effective Date\"), by and between:\n\n"+
"Service Provider:"+ (providerName ||"[Provider Name]") +", located at"+ (providerAddress ||"[Provider Address]") +"\n"+
"Client:"+ (clientName ||"[Client Name]") +", located at"+ (clientAddress ||"[Client Address]") +"\n\n"+
"1. SERVICES RENDERED\n"+
"The Service Provider agrees to provide the following services (the \"Services\"):"+ (servicesScope ||"[Scope of Services]") +".\n\n"+
"2. COMPENSATION\n"+
"In consideration for the Services, the Client agrees to pay the Service Provider as follows:"+ (compensationTerms ||"[Compensation Terms]") +".\n\n"+
"3. TERM AND TERMINATION\n"+
"Either party may terminate this Agreement at any time upon"+ noticePeriod +"days written notice to the other party.\n\n"+
 (ipAssignment ?"4. INTELLECTUAL PROPERTY\nThe Service Provider agrees that any intellectual property created during the performance of the Services shall be the sole property of the Client.\n\n":"") +
 (confidentiality ?"5. CONFIDENTIALITY\nThe Service Provider agrees to keep confidential any proprietary information provided by the Client.\n\n":"") +
"IN WITNESS WHEREOF, the parties hereto have executed this Agreement as of the Effective Date.\n\n"+
"Service Provider Signature: __________________\n"+
"Client Signature: __________________";
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
 <div className={"space-y-6"}>
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
 title="Professional Service Contract Generator"
 description="Generate formal Professional Service Contracts & Independent Contractor Agreements."
 actions={
 <div className={"flex space-x-2"}>
 <ResetButton onClick={handleReset} label="Reset"/>
 </div>
 }
 />
 
 <div className={"grid gap-6 md:grid-cols-2"}>
 <GlassCard>
 <CardHeader>
 <CardTitle>Contract Details</CardTitle>
 <CardDescription>Enter the parties and terms</CardDescription>
 </CardHeader>
 <CardContent className={"space-y-4"}>
 <div className={"space-y-2"}>
 <Label>Service Provider Name</Label>
 <Input value={providerName} onChange={(e) => setProviderName(e.target.value)} placeholder="e.g. John Doe Consulting"/>
 </div>
 <div className={"space-y-2"}>
 <Label>Provider Address</Label>
 <Input value={providerAddress} onChange={(e) => setProviderAddress(e.target.value)} placeholder="123 Main St..."/>
 </div>
 <div className={"space-y-2"}>
 <Label>Client Name</Label>
 <Input value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="e.g. Acme Corp"/>
 </div>
 <div className={"space-y-2"}>
 <Label>Client Address</Label>
 <Input value={clientAddress} onChange={(e) => setClientAddress(e.target.value)} placeholder="456 Market St..."/>
 </div>
 <div className={"space-y-2"}>
 <Label>Effective Date</Label>
 <Input type="date"value={effectiveDate} onChange={(e) => setEffectiveDate(e.target.value)} />
 </div>
 <div className={"space-y-2"}>
 <Label>Services Scope Description</Label>
 <Input value={servicesScope} onChange={(e) => setServicesScope(e.target.value)} placeholder="Web development, consulting..."/>
 </div>
 <div className={"space-y-2"}>
 <Label>Compensation Terms</Label>
 <Input value={compensationTerms} onChange={(e) => setCompensationTerms(e.target.value)} placeholder="$50/hour, or $5000 fixed fee..."/>
 </div>
 <div className={"space-y-2"}>
 <Label>Termination Notice Period (days)</Label>
 <Input type="number"value={noticePeriod} onChange={(e) => setNoticePeriod(e.target.value)} />
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
 <CopyButton getText={generateContract} label="Copy"/>
 <ActionButton onClick={handlePrint} icon={Printer} label="Print"variant="outline"size="default"/>
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
          <h3>Why Use Our Professional Service Contract Generator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Professional Service Contract Generator provides
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

      <RelatedTools currentToolUrl="/tools/office/service-contract" max={6} />

</div>
 );
}
