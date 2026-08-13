"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { FileText, ShieldCheck, Printer, Sparkles, Shield, Zap, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
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
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

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
 
      <ToolHowItWorks steps={[{
        step: "01",
        title: "Input Your Data",
        description: "Enter your information in the input field above and configure any options.",
        icon: Sparkles
      }, {
        step: "02",
        title: "Process & Generate",
        description: "The tool processes your input instantly and displays the results.",
        icon: Zap
      }, {
        step: "03",
        title: "Copy & Use",
        description: "Copy the output with one click and use it wherever you need.",
        icon: Copy
      }]} badges={["100% Free", "Instant Results", "Privacy-First"]} />

      <ToolFeatureGuides features={[{
        icon: Sparkles,
        title: "Lightning Fast",
        description: "Get results in milliseconds with our optimized client-side processing engine."
      }, {
        icon: Shield,
        title: "Completely Private",
        description: "All processing happens in your browser. Your data never leaves your device."
      }, {
        icon: Zap,
        title: "No Signup Required",
        description: "Use this tool instantly without creating an account or providing any personal information."
      }]}>
        <div className="prose dark:prose-invert max-w-none">
          <h3>Why Use Our Professional Service Retainer Agreement Generator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Professional Service Retainer Agreement Generator provides
            the functionality you need without any complexity or cost.
          </p>
          <p>
            Unlike server-based alternatives, everything runs locally in your browser, ensuring maximum
            privacy and zero latency. No data is ever transmitted to external servers, making it safe
            for sensitive information.
          </p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion faqs={[{
        question: "Is this tool free to use?",
        answer: "Yes, this tool is 100% free with no hidden costs, subscriptions, or usage limits."
      }, {
        question: "Is my data secure?",
        answer: "Absolutely. All processing happens locally in your browser. Your input data never leaves your device or gets sent to any server."
      }, {
        question: "Do I need to create an account?",
        answer: "No account or registration is required. Simply open the tool and start using it immediately."
      }]} />

      <RelatedTools currentToolUrl="/tools/office/retainer-agreement" max={6} />

    </div></div>;
}