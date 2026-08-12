"use client";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { CopyButton } from"@/components/shared/action-buttons";
import toast from"react-hot-toast";
import { Mail, Sparkles, RefreshCw, Target } from"lucide-react";

const cardClass =
"border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass ="border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass ="text-xs sm:text-sm font-semibold flex items-center gap-2";

interface ColdEmail {
 label: string;
 subject: string;
 body: string;
}

function extractBetween(raw: string, startMarker: string, endMarker: string): string {
 const startIndex = raw.indexOf(startMarker);
 if (startIndex === -1) return"";
 const contentStart = startIndex + startMarker.length;
 const endIndex = raw.indexOf(endMarker, contentStart);
 if (endIndex === -1) return raw.slice(contentStart).trim();
 return raw.slice(contentStart, endIndex).trim();
}

function extractAfter(raw: string, marker: string): string {
 const startIndex = raw.indexOf(marker);
 if (startIndex === -1) return"";
 return raw.slice(startIndex + marker.length).trim();
}

export default function ColdEmailGeneratorClient() {
 const [product, setProduct] = useState("");
 const [recipientRole, setRecipientRole] = useState("");
 const [painPoint, setPainPoint] = useState("");
 const [cta, setCta] = useState("");
 const [loading, setLoading] = useState(false);
 const [emails, setEmails] = useState<ColdEmail[]>([]);

 const handleGenerate = async () => {
 if (!product.trim()) {
 toast.error("Enter your product or service.");
 return;
 }

 setLoading(true);

 try {
 const prompt = `You are a B2B cold email expert.
Product/service: ${product}
Target recipient role: ${recipientRole ||"Not provided"}
Pain point: ${painPoint ||"Not provided"}
Desired CTA: ${cta ||"Book a call"}

Generate 3 cold emails:
1. Formal
2. Friendly
3. AIDA Framework

Each email must include a subject line and body.
Return ONLY the 3 emails separated by |||.
Each email must use this exact structure:
SUBJECT:
...
BODY:
...`;

 const res = await fetch("/api/ai/generate", {
 method:"POST",
 headers: {"Content-Type":"application/json"},
 body: JSON.stringify({ prompt }),
 });

 const data = await res.json();

 if (data.success && data.raw) {
 const parts = String(data.raw)
 .replace(/```[a-z]*\n?/gi,"")
 .split("|||")
 .map((part: string) => part.trim())
 .filter(Boolean);

 if (parts.length >= 3) {
 const parsed = parts.slice(0, 3).map((part, index) => ({
 label: ["Formal","Friendly","AIDA Framework"][index],
 subject: extractBetween(part,"SUBJECT:","BODY:") || `Cold email about ${product}`,
 body: extractAfter(part,"BODY:") || part,
 }));

 setEmails(parsed);
 toast.success("Cold emails generated.");
 } else {
 throw new Error("Invalid AI output.");
 }
 } else {
 throw new Error("API error");
 }
 } catch {
 setEmails([
 {
 label:"Formal",
 subject: `A more efficient approach to ${painPoint ||"your current workflow"}`,
 body: `Hello,\n\nI understand that ${
 painPoint ||"operational efficiency"
 } is a priority for teams like yours. ${product} was designed to help ${
 recipientRole ||"teams"
 } solve this more effectively.\n\nWould you be open to a brief conversation?\n\nBest regards,\nYour Name`,
 },
 {
 label:"Friendly",
 subject: `Quick idea for ${recipientRole ||"your team"}`,
 body: `Hi there,\n\nI came across your work and thought ${product} could be useful for ${
 painPoint ||"improving your workflow"
 }.\n\nIf you're open to it, I'd love to share a quick idea.\n\nCheers,\nYour Name`,
 },
 {
 label:"AIDA Framework",
 subject: `Reduce ${painPoint ||"friction"} with ${product}`,
 body: `Attention: If ${
 painPoint ||"slow processes"
 } are holding your team back, this is relevant.\n\nInterest: ${product} helps ${
 recipientRole ||"businesses"
 } streamline the work that matters most.\n\nDesire: Teams can save time, reduce errors, and move faster.\n\nAction: ${
 cta ||"Book a call"
 } and see whether it fits your needs.\n\nYour Name`,
 },
 ]);
 toast.error("AI offline. Loaded template fallback.");
 } finally {
 setLoading(false);
 }
 };

 return (
 <div className="max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6">
 <ToolPageHeader
 icon={Mail}
 title="Cold Email Generator"
 description="Generate Formal, Friendly, and AIDA cold email variants with subject lines."
 />

 <Card className={cardClass}>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <Target className="w-4 h-4 text-primary"/> Campaign Details
 </CardTitle>
 </CardHeader>
 <CardContent className="p-3 sm:p-4 space-y-4">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div className="space-y-2">
 <label className="text-xs font-medium text-muted-foreground">Product / Service</label>
 <Input
 value={product}
 onChange={(e) => setProduct(e.target.value)}
 placeholder="e.g. AI-powered CRM"
 />
 </div>
 <div className="space-y-2">
 <label className="text-xs font-medium text-muted-foreground">Recipient Role</label>
 <Input
 value={recipientRole}
 onChange={(e) => setRecipientRole(e.target.value)}
 placeholder="e.g. Marketing Director"
 />
 </div>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div className="space-y-2">
 <label className="text-xs font-medium text-muted-foreground">Pain Point</label>
 <Input
 value={painPoint}
 onChange={(e) => setPainPoint(e.target.value)}
 placeholder="e.g. slow reporting"
 />
 </div>
 <div className="space-y-2">
 <label className="text-xs font-medium text-muted-foreground">Desired CTA</label>
 <Input
 value={cta}
 onChange={(e) => setCta(e.target.value)}
 placeholder="e.g. book a demo"
 />
 </div>
 </div>

 <Button onClick={() => void handleGenerate()} disabled={loading} className="w-full">
 {loading ? (
 <>
 <RefreshCw className="w-4 h-4 animate-spin"/> Generating...
 </>
 ) : (
 <>
 <Sparkles className="w-4 h-4"/> Generate Emails
 </>
 )}
 </Button>
 </CardContent>
 </Card>

 {emails.length > 0 && (
 <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
 {emails.map((email, index) => (
 <Card key={`${email.label}-${index}`} className={cardClass}>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <Mail className="w-4 h-4 text-primary"/> {email.label}
 </CardTitle>
 </CardHeader>
 <CardContent className="p-3 sm:p-4 space-y-3">
 <div className="space-y-1">
 <p className="text-xs font-medium text-muted-foreground">Subject</p>
 <p className="text-sm font-semibold">{email.subject}</p>
 </div>

 <div className="space-y-1">
 <p className="text-xs font-medium text-muted-foreground">Body</p>
 <p className="text-sm whitespace-pre-wrap leading-relaxed">{email.body}</p>
 </div>

 <CopyButton
 getText={() => `Subject: ${email.subject}\n\n${email.body}`}
 label="Copy Email"
 />
 </CardContent>
 </Card>
 ))}
 </div>
 )}

 <ToolHowItWorks
 steps={[
 {
 step:"01",
 title:"Define the Offer",
 description:"Add product, recipient, pain point, and call to action.",
 icon: Target,
 },
 {
 step:"02",
 title:"Generate Variants",
 description:"Get three email styles with subject lines.",
 icon: Sparkles,
 },
 {
 step:"03",
 title:"Send and Test",
 description:"Copy the best version and start outreach testing.",
 icon: Mail,
 },
 ]}
 badges={["AI-Powered","3 Variants","No Signup"]}
 />

 <ToolFeatureGuides
 features={[
 {
 icon: Mail,
 title:"Outreach-Focused",
 description:"Creates cold emails designed for first-touch communication.",
 },
 {
 icon: Target,
 title:"Pain-Point Driven",
 description:"Builds the message around the recipient's problem.",
 },
 {
 icon: Sparkles,
 title:"Multiple Styles",
 description:"Includes formal, friendly, and AIDA framework approaches.",
 },
 {
 icon: Mail,
 title:"Subject Lines Included",
 description:"Generates subject lines alongside each email body.",
 },
 ]}
 >
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <p>
 Cold email remains one of the most effective outbound channels when done well. The best cold emails are not
 generic blasts. They are concise, relevant, and focused on a real problem the recipient cares about.
 </p>
 <p>
 A strong cold email usually has a clear subject line, a personalized opening, a specific pain point, a
 credible solution, and a low-friction call to action. Different audiences respond to different tones, which
 is why testing formal, friendly, and framework-based variants can improve results.
 </p>
 <p>
 Use the generated drafts as a foundation. Personalize the first line, keep the email short, and make the
 next step easy. Avoid overpromising or using spammy language that can hurt deliverability.
 </p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion
 faqs={[
 {
 question:"How long should a cold email be?",
 answer:
"Short is usually better. Aim for clarity and a single clear call to action.",
 },
 {
 question:"Should I A/B test subject lines?",
 answer:"Yes. Subject lines can strongly affect open rates, so testing is recommended.",
 },
 {
 question:"Can I use these emails for sales outreach?",
 answer:
"Yes. Personalize each email and make sure the message matches the recipient's context.",
 },
 ]}
 />

 <RelatedTools currentToolUrl="/tools/marketing/cold-email-generator"max={6} />
 </div>
 );
}
