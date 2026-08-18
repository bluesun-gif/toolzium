"use client";

import { ToolBackground } from "@/components/shared/tool-background";
import { RelatedTools } from "@/components/shared/related-tools";
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
import { Activity, Copy, FileCheck2, FileText, Printer, ShieldCheck, Target } from"lucide-react";
import { toast } from"react-hot-toast";
import { cn } from"@/lib/utils";

export function SlaGeneratorClient() {
  const [providerName, setProviderName] = useState("");
  const [clientName, setClientName] = useState("");
  const [effectiveDate, setEffectiveDate] = useState("");
  const [uptimeTarget, setUptimeTarget] = useState("99.9");
  const [maintenanceWindow, setMaintenanceWindow] = useState("Sundays 2:00 AM - 4:00 AM UTC");
  const [penaltyTerms, setPenaltyTerms] = useState("5% service credit for every 1% below uptime target");
  const generateDocument = () => {
    return "SERVICE LEVEL AGREEMENT (SLA)\n\n" + "This Service Level Agreement is entered into on" + (effectiveDate || "[Date]") + "by and between:\n" + "Service Provider:" + (providerName || "[Provider Name]") + "\n" + "Client:" + (clientName || "[Client Name]") + "\n\n" + "1. SERVICE AVAILABILITY\n" + "The Service Provider guarantees a monthly uptime target of" + uptimeTarget + "%." + "Uptime is calculated based on the total number of minutes in a month minus any scheduled maintenance.\n\n" + "2. SCHEDULED MAINTENANCE\n" + "The agreed maintenance window is:" + maintenanceWindow + ".\n\n" + "3. SUPPORT RESPONSE TIMES\n" + "- P1 (Critical): Response within 1 hour.\n" + "- P2 (High): Response within 4 hours.\n" + "- P3 (Medium/Low): Response within 24 hours.\n\n" + "4. SERVICE CREDITS & PENALTIES\n" + "In the event the uptime target is not met, the following penalty applies:" + penaltyTerms + ".\n\n" + "IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first above written.\n\n" + "Provider Signature: __________________\n" + "Client Signature: __________________";
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
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

 <ToolPageHeader icon={ShieldCheck} title="SLA Document Generator" description="Generate formal Service Level Agreement contracts with customizable terms." actions={<>
 <CopyButton getText={() => docText} label="Copy SLA" />
 <ActionButton onClick={handlePrint} icon={Printer} label="Print" variant="outline" />
 <ResetButton onClick={handleReset} label="Reset" />
 </>} />

 <div className="grid md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Agreement Details</CardTitle>
 <CardDescription>Enter the basic terms of the SLA.</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label htmlFor="provider">Service Provider Name</Label>
 <Input id="provider" value={providerName} onChange={e => setProviderName(e.target.value)} placeholder="e.g., CloudHost Inc." />
 </div>
 <div className="space-y-2">
 <Label htmlFor="client">Client Name</Label>
 <Input id="client" value={clientName} onChange={e => setClientName(e.target.value)} placeholder="e.g., Acme Corp." />
 </div>
 <div className="space-y-2">
 <Label htmlFor="date">Effective Date</Label>
 <Input id="date" type="date" value={effectiveDate} onChange={e => setEffectiveDate(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Uptime Target</Label>
 <Select value={uptimeTarget} onValueChange={setUptimeTarget}>
 <SelectTrigger>
 <SelectValue placeholder="Select target" />
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
 <Input id="maintenance" value={maintenanceWindow} onChange={e => setMaintenanceWindow(e.target.value)} placeholder="e.g., Sundays 2:00 AM - 4:00 AM UTC" />
 </div>
 <div className="space-y-2">
 <Label htmlFor="penalty">Service Credit Penalty Terms</Label>
 <Input id="penalty" value={penaltyTerms} onChange={e => setPenaltyTerms(e.target.value)} placeholder="e.g., 5% credit per 1% below target" />
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
    step:"01",
    title:"Enter Service",
    description:"Define the service and metrics.",
    icon: Activity,
  },
{
    step:"02",
    title:"Set Targets",
    description:"Uptime and response goals.",
    icon: Target,
  },
{
    step:"03",
    title:"Generate",
    description:"Build the SLA.",
    icon: FileCheck2,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Activity,
    title:"Service",
    description:"What is covered.",
  },
{
    icon: Target,
    title:"Metrics",
    description:"Uptime, response.",
  },
{
    icon: FileCheck2,
    title:"Draft",
    description:"Ready document.",
  },
{
    icon: ShieldCheck,
    title:"Remedies",
    description:"Credits and penalties.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>An SLA generator creates the service-level agreement defining committed performance — uptime, response times, and remedies for shortfalls. SLAs set accountability between provider and client. This tool structures metrics and consequences.</p>
  <p>Measurable targets are the core. Defining uptime percentages and response windows makes performance auditable. Remedies like service credits incentivize meeting them.</p>
  <p>Review with counsel. The tool's value is a clear SLA draft that aligns expectations and accountability.</p>
  </div>
</ToolFeatureGuides>
      <RelatedTools currentToolUrl="/tools/office/sla-generator" max={6} />

<ToolFaqAccordion
  faqs={[
{
    question:"What is an SLA?",
    answer:"Commitment on service levels.",
  },
{
    question:"Metrics?",
    answer:"Uptime, response, resolution.",
  },
{
    question:"Remedies?",
    answer:"Service credits for misses.",
  },
{
    question:"Free?",
    answer:"Yes.",
  },
{
    question:"Binding?",
    answer:"Draft; review.",
  }
  ]}
/>
    </div>
    </div>
);
}

export default SlaGeneratorClient;
