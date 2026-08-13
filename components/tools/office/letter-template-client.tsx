"use client";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { ActionButton, CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { FileText, Edit, Copy, Printer, Sparkles, Shield, Zap } from"lucide-react";
import { toast } from"react-hot-toast";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

const TEMPLATES = {
 resignation:"Please accept this letter as formal notification that I am resigning from my position. My last day will be in two weeks.",
 recommendation:"It is my absolute pleasure to recommend this individual. They have been a valuable asset to our team and consistently exceeded expectations.",
 complaint:"I am writing to formally lodge a complaint regarding the recent service I received. I expect a prompt resolution to this matter.",
 thank_you:"Thank you so much for your time and consideration. I truly appreciate your support and guidance.",
 apology:"Please accept my sincerest apologies for the recent oversight. I take full responsibility and have taken steps to ensure it does not happen again.",
 request:"I am writing to formally request approval for the upcoming project initiative.",
 authorization:"I hereby authorize the designated representative to act on my behalf in this matter.",
};

export function LetterTemplateClient() {
 const [templateType, setTemplateType] = useState("resignation");
 const [senderName, setSenderName] = useState("John Doe");
 const [senderAddress, setSenderAddress] = useState("123 Main St, City, State");
 const [recipientName, setRecipientName] = useState("Jane Smith");
 const [recipientCompany, setRecipientCompany] = useState("Acme Corp");
 const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
 const [subject, setSubject] = useState("Formal Resignation");
 const [body, setBody] = useState(TEMPLATES.resignation);

 const handleTemplateChange = (val: string) => {
 setTemplateType(val);
 setBody(TEMPLATES[val as keyof typeof TEMPLATES] ||"");
 toast.success("Template applied");
 };

 const getLetterText = () => {
 return [
 senderName,
 senderAddress,
"",
 date,
"",
 recipientName,
 recipientCompany,
"",
"Subject:"+ subject,
"",
"Dear"+ recipientName +",",
"",
 body,
"",
"Sincerely,",
 senderName
 ].join("\n");
 };

 const handlePrint = () => {
 const printWindow = window.open("","_blank");
 if (!printWindow) return;
 printWindow.document.write("<pre style='font-family: sans-serif; padding: 2rem;'>"+ getLetterText() +"</pre>");
 printWindow.document.close();
 printWindow.focus();
 printWindow.print();
 printWindow.close();
 };

 const resetForm = () => {
 setSenderName("");
 setSenderAddress("");
 setRecipientName("");
 setRecipientCompany("");
 setSubject("");
 setBody("");
 toast.success("Form reset");
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
 title="Letter Template Generator"
 description="Generate and format formal letters quickly and easily."
 icon={FileText}
 actions={
 <div className="flex gap-2">
 <CopyButton getText={getLetterText} label="Copy Letter"/>
 <ActionButton onClick={handlePrint} icon={Printer} label="Print"variant="outline"/>
 <ResetButton onClick={resetForm} label="Reset"/>
 </div>
 }
 />

 <div className={"grid gap-6 md:grid-cols-2"}>
 <GlassCard>
 <CardHeader>
 <CardTitle>Letter Details</CardTitle>
 <CardDescription>Fill in the information to generate your letter.</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Template Type</Label>
 <Select value={templateType} onValueChange={handleTemplateChange}>
 <SelectTrigger>
 <SelectValue placeholder="Select a template"/>
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="resignation">Resignation</SelectItem>
 <SelectItem value="recommendation">Recommendation</SelectItem>
 <SelectItem value="complaint">Complaint</SelectItem>
 <SelectItem value="thank_you">Thank You</SelectItem>
 <SelectItem value="apology">Apology</SelectItem>
 <SelectItem value="request">Request</SelectItem>
 <SelectItem value="authorization">Authorization</SelectItem>
 </SelectContent>
 </Select>
 </div>
 <Separator />
 <div className={"grid grid-cols-2 gap-4"}>
 <div className="space-y-2">
 <Label>Sender Name</Label>
 <Input value={senderName} onChange={(e) => setSenderName(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Date</Label>
 <Input type="date"value={date} onChange={(e) => setDate(e.target.value)} />
 </div>
 </div>
 <div className="space-y-2">
 <Label>Sender Address</Label>
 <Input value={senderAddress} onChange={(e) => setSenderAddress(e.target.value)} />
 </div>
 <Separator />
 <div className={"grid grid-cols-2 gap-4"}>
 <div className="space-y-2">
 <Label>Recipient Name</Label>
 <Input value={recipientName} onChange={(e) => setRecipientName(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Company</Label>
 <Input value={recipientCompany} onChange={(e) => setRecipientCompany(e.target.value)} />
 </div>
 </div>
 <div className="space-y-2">
 <Label>Subject</Label>
 <Input value={subject} onChange={(e) => setSubject(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Body Text</Label>
 <textarea 
 className={"flex min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"}
 value={body}
 onChange={(e) => setBody(e.target.value)}
 />
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Preview</CardTitle>
 <CardDescription>Review your formatted letter.</CardDescription>
 </CardHeader>
 <CardContent>
 <div className={"whitespace-pre-wrap rounded-md border p-6 text-sm leading-relaxed min-h-[400px] bg-muted/30"}>
 {getLetterText()}
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
          <h3>Why Use Our Letter Template Generator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Letter Template Generator provides
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

      <RelatedTools currentToolUrl="/tools/office/letter-template" max={6} />

</div>
 );
}
