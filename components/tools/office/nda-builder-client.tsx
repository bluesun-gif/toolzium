"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { ShieldCheck, FileText, Copy, Printer, Sparkles, Shield, Zap } from "lucide-react";
import toast from "react-hot-toast";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
export function NdaBuilderClient() {
  const [ndaType, setNdaType] = useState("mutual");
  const [partyA, setPartyA] = useState("");
  const [partyAAddress, setPartyAAddress] = useState("");
  const [partyB, setPartyB] = useState("");
  const [partyBAddress, setPartyBAddress] = useState("");
  const [effectiveDate, setEffectiveDate] = useState("");
  const [purpose, setPurpose] = useState("");
  const [duration, setDuration] = useState("1 year");
  const [jurisdiction, setJurisdiction] = useState("");
  const handleReset = () => {
    setNdaType("mutual");
    setPartyA("");
    setPartyAAddress("");
    setPartyB("");
    setPartyBAddress("");
    setEffectiveDate("");
    setPurpose("");
    setDuration("1 year");
    setJurisdiction("");
    toast.success("Form reset");
  };
  const getDocumentText = () => {
    const isMutual = ndaType === "mutual";
    const typeLabel = isMutual ? "MUTUAL NON-DISCLOSURE AGREEMENT" : "NON-DISCLOSURE AGREEMENT";
    const disclosingDesc = isMutual ? "Each party may disclose and receive confidential information." : "The Disclosing Party may disclose confidential information to the Receiving Party.";
    return typeLabel + "\n\n" + "This Agreement is made effective as of" + effectiveDate + "by and between:\n\n" + (isMutual ? "Party A:" : "Disclosing Party:") + partyA + "\nLocated at" + partyAAddress + "\n\nAND\n\n" + (isMutual ? "Party B:" : "Receiving Party:") + partyB + "\nLocated at" + partyBAddress + "\n\n" + "1. Purpose\nThe parties are exploring a potential business relationship in connection with:" + purpose + ".\n\n" + "2. Confidential Information\n" + disclosingDesc + "All such information shall be deemed confidential.\n\n" + "3. Term\nThis Agreement shall govern all communications between the parties for a period of" + duration + ".\n\n" + "4. Jurisdiction\nThis Agreement shall be governed by the laws of" + jurisdiction + ".\n\n" + "Signatures:\n\n_______________________\n" + partyA + "\n\n_______________________\n" + partyB;
  };
  const handlePrint = () => {
    window.print();
  };
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={ShieldCheck} title="NDA Generator" description="Generate formal Mutual or One-Way Non-Disclosure Agreements." actions={<>
 <ResetButton onClick={handleReset} label="Reset" />
 </>} />
 <div className={"grid gap-6 md:grid-cols-2"}>
 <div className="space-y-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Agreement Details</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>NDA Type</Label>
 <Select value={ndaType} onValueChange={setNdaType}>
 <SelectTrigger>
 <SelectValue placeholder="Select type" />
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="mutual">Mutual (Both Disclosing)</SelectItem>
 <SelectItem value="oneway">One-Way (One Disclosing)</SelectItem>
 </SelectContent>
 </Select>
 </div>
 <div className="space-y-2">
 <Label>{ndaType === "mutual" ? "Party A Name" : "Disclosing Party Name"}</Label>
 <Input value={partyA} onChange={e => setPartyA(e.target.value)} placeholder="Company or Individual" />
 </div>
 <div className="space-y-2">
 <Label>{ndaType === "mutual" ? "Party A Address" : "Disclosing Party Address"}</Label>
 <Input value={partyAAddress} onChange={e => setPartyAAddress(e.target.value)} placeholder="Full Address" />
 </div>
 <div className="space-y-2">
 <Label>{ndaType === "mutual" ? "Party B Name" : "Receiving Party Name"}</Label>
 <Input value={partyB} onChange={e => setPartyB(e.target.value)} placeholder="Company or Individual" />
 </div>
 <div className="space-y-2">
 <Label>{ndaType === "mutual" ? "Party B Address" : "Receiving Party Address"}</Label>
 <Input value={partyBAddress} onChange={e => setPartyBAddress(e.target.value)} placeholder="Full Address" />
 </div>
 <div className="space-y-2">
 <Label>Effective Date</Label>
 <Input type="date" value={effectiveDate} onChange={e => setEffectiveDate(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Purpose of Disclosure</Label>
 <Input value={purpose} onChange={e => setPurpose(e.target.value)} placeholder="e.g. discussing a potential partnership" />
 </div>
 <div className="space-y-2">
 <Label>Term Duration</Label>
 <Select value={duration} onValueChange={setDuration}>
 <SelectTrigger>
 <SelectValue placeholder="Select duration" />
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="1 year">1 Year</SelectItem>
 <SelectItem value="2 years">2 Years</SelectItem>
 <SelectItem value="3 years">3 Years</SelectItem>
 <SelectItem value="5 years">5 Years</SelectItem>
 <SelectItem value="perpetual">Perpetual</SelectItem>
 </SelectContent>
 </Select>
 </div>
 <div className="space-y-2">
 <Label>Governing State/Jurisdiction</Label>
 <Input value={jurisdiction} onChange={e => setJurisdiction(e.target.value)} placeholder="e.g. California" />
 </div>
 </CardContent>
 </GlassCard>
 </div>
 <div className="space-y-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Generated Document</CardTitle>
 </CardHeader>
 <CardContent>
 <div className={"bg-muted p-6 rounded-md min-h-[400px] whitespace-pre-wrap font-mono text-sm border"}>
 {getDocumentText()}
 </div>
 <Separator className="my-4" />
 <div className="flex gap-2 justify-end">
 <Button variant="outline" onClick={handlePrint} className="flex items-center gap-2">
 <Printer className="w-4 h-4" />
 Print
 </Button>
 <CopyButton getText={getDocumentText} label="Copy text" />
 </div>
 </CardContent>
 </GlassCard>
 </div>
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
          <h3>Why Use Our NDA Generator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our NDA Generator provides
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

      <RelatedTools currentToolUrl="/tools/office/nda-builder" max={6} />

    </div></div>;
}