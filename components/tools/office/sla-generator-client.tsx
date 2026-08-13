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
import { ShieldCheck, FileText, Copy, Printer, Sparkles, Shield, Zap } from"lucide-react";
import { toast } from"react-hot-toast";
import { cn } from"@/lib/utils";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

export function SlaGeneratorClient() {
 const [providerName, setProviderName] = useState("");
 const [clientName, setClientName] = useState("");
 const [effectiveDate, setEffectiveDate] = useState("");
 const [uptimeTarget, setUptimeTarget] = useState("99.9");
 const [maintenanceWindow, setMaintenanceWindow] = useState("Sundays 2:00 AM - 4:00 AM UTC");
 const [penaltyTerms, setPenaltyTerms] = useState("5% service credit for every 1% below uptime target");

 const generateDocument = () => {
 return (
"SERVICE LEVEL AGREEMENT (SLA)\n\n"+
"This Service Level Agreement is entered into on"+ (effectiveDate ||"[Date]") +"by and between:\n"+
"Service Provider:"+ (providerName ||"[Provider Name]") +"\n"+
"Client:"+ (clientName ||"[Client Name]") +"\n\n"+
"1. SERVICE AVAILABILITY\n"+
"The Service Provider guarantees a monthly uptime target of"+ uptimeTarget +"%."+
"Uptime is calculated based on the total number of minutes in a month minus any scheduled maintenance.\n\n"+
"2. SCHEDULED MAINTENANCE\n"+
"The agreed maintenance window is:"+ maintenanceWindow +".\n\n"+
"3. SUPPORT RESPONSE TIMES\n"+
"- P1 (Critical): Response within 1 hour.\n"+
"- P2 (High): Response within 4 hours.\n"+
"- P3 (Medium/Low): Response within 24 hours.\n\n"+
"4. SERVICE CREDITS & PENALTIES\n"+
"In the event the uptime target is not met, the following penalty applies:"+ penaltyTerms +".\n\n"+
"IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first above written.\n\n"+
"Provider Signature: __________________\n"+
"Client Signature: __________________"
 );
 };

 const docText = generateDocument();

 const handlePrint = () => {
 window.print();
 };

 const handleReset = () => {
 setProviderName("");
 setClientName("");
 setEffectiveDate("");
 setUptimeTarget("99.9");
 setMaintenanceWindow("Sundays 2:00 AM - 4:00 AM UTC");
 setPenaltyTerms("5% service credit for every 1% below uptime target");
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
 icon={ShieldCheck}
 title="SLA Document Generator"
 description="Generate formal Service Level Agreement contracts with customizable terms."
 actions={
 <>
 <CopyButton getText={() => docText} label="Copy SLA"/>
 <ActionButton onClick={handlePrint} icon={Printer} label="Print"variant="outline"/>
 <ResetButton onClick={handleReset} label="Reset"/>
 </>
 }
 />

 <div className="grid md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Agreement Details</CardTitle>
 <CardDescription>Enter the basic terms of the SLA.</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label htmlFor="provider">Service Provider Name</Label>
 <Input
 id="provider"
 value={providerName}
 onChange={(e) => setProviderName(e.target.value)}
 placeholder="e.g., CloudHost Inc."
 />
 </div>
 <div className="space-y-2">
 <Label htmlFor="client">Client Name</Label>
 <Input
 id="client"
 value={clientName}
 onChange={(e) => setClientName(e.target.value)}
 placeholder="e.g., Acme Corp."
 />
 </div>
 <div className="space-y-2">
 <Label htmlFor="date">Effective Date</Label>
 <Input
 id="date"
 type="date"
 value={effectiveDate}
 onChange={(e) => setEffectiveDate(e.target.value)}
 />
 </div>
 <div className="space-y-2">
 <Label>Uptime Target</Label>
 <Select value={uptimeTarget} onValueChange={setUptimeTarget}>
 <SelectTrigger>
 <SelectValue placeholder="Select target"/>
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="99.9">99.9% (Three Nines)</SelectItem>
 <SelectItem value="99.99">99.99% (Four Nines)</SelectItem>
 <SelectItem value="99.5">99.5%</SelectItem>
 </SelectContent>
 </Select>
 </div>
 <div className="space-y-2">
 <Label htmlFor="maintenance">Maintenance Window Schedule</Label>
 <Input
 id="maintenance"
 value={maintenanceWindow}
 onChange={(e) => setMaintenanceWindow(e.target.value)}
 placeholder="e.g., Sundays 2:00 AM - 4:00 AM UTC"
 />
 </div>
 <div className="space-y-2">
 <Label htmlFor="penalty">Service Credit Penalty Terms</Label>
 <Input
 id="penalty"
 value={penaltyTerms}
 onChange={(e) => setPenaltyTerms(e.target.value)}
 placeholder="e.g., 5% credit per 1% below target"
 />
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Generated Document</CardTitle>
 <CardDescription>Preview of your SLA.</CardDescription>
 </CardHeader>
 <CardContent>
 <pre className="whitespace-pre-wrap p-4 bg-muted/50 rounded-md text-sm font-mono border">
 {docText}
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
          <h3>Why Use Our SLA Document Generator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our SLA Document Generator provides
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

      <RelatedTools currentToolUrl="/tools/office/sla-generator" max={6} />

</div>
 );
}
