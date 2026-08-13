"use client";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { CopyButton } from"@/components/shared/action-buttons";
import toast from"react-hot-toast";
import { Mail, Sparkles, RefreshCw, Inbox, TrendingUp } from"lucide-react";
import { GridPattern } from"@/components/magicui/grid-pattern";
import { GlassCard } from"@/components/ui/glass-card";

interface EmailSubject {
 subject: string;
 score: number;
 reasoning: string;
}

const cardClass =
"border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass ="border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass ="text-xs sm:text-sm font-semibold flex items-center gap-2";
const inputClass =
"w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50";

export default function EmailSubjectGeneratorClient() {
 const [purpose, setPurpose] = useState("");
 const [audience, setAudience] = useState("");
 const [loading, setLoading] = useState(false);
 const [subjects, setSubjects] = useState<EmailSubject[]>([]);

 const handleGenerate = async () => {
 if (!purpose.trim()) {
 toast.error("Enter the email purpose.");
 return;
 }

 setLoading(true);

 try {
 const prompt = `You are an email marketing expert.
Email purpose: ${purpose}
Audience: ${audience ||"general recipients"}

Generate 10 email subject lines.
For each one, estimate open-rate potential from 1 to 10 and explain why.

Return EXACTLY 10 lines in this format:
SUBJECT | SCORE | REASONING`;

 const res = await fetch("/api/ai/generate", {
 method:"POST",
 headers: {"Content-Type":"application/json"},
 body: JSON.stringify({ prompt }),
 });

 const data = await res.json();

 if (data.success && data.raw) {
 const lines = String(data.raw)
 .replace(/```[a-z]*\n?/gi,"")
 .split("\n")
 .map((line: string) => line.trim())
 .filter(Boolean);

 const parsed: EmailSubject[] = [];

 for (const line of lines) {
 const parts = line.split("|").map((part: string) => part.trim());
 if (parts.length >= 3) {
 const rawScore = Number(parts[1]);
 parsed.push({
 subject: parts[0],
 score: Number.isFinite(rawScore) ? Math.min(10, Math.max(1, rawScore)) : 5,
 reasoning: parts.slice(2).join("|"),
 });
 }
 }

 if (parsed.length === 0) {
 throw new Error("Invalid AI output.");
 }

 setSubjects(parsed.slice(0, 10));
 toast.success("Subject lines generated.");
 } else {
 throw new Error("API error.");
 }
 } catch {
 setSubjects([
 { subject: `Quick update about ${purpose}`, score: 7, reasoning:"Simple and direct."},
 { subject: `You may be missing this with ${purpose}`, score: 8, reasoning:"Creates curiosity."},
 { subject: `The faster way to handle ${purpose}`, score: 7, reasoning:"Promises efficiency."},
 { subject: `A better approach to ${purpose}`, score: 6, reasoning:"Clear but less urgent."},
 { subject: `Don't ignore this if you care about ${purpose}`, score: 8, reasoning:"Uses urgency."},
 { subject: `${purpose}: what you should know today`, score: 6, reasoning:"Informative tone."},
 { subject: `How top teams handle ${purpose}`, score: 7, reasoning:"Uses social proof."},
 { subject: `Your next step for ${purpose}`, score: 6, reasoning:"Action-oriented."},
 { subject: `The ${purpose} checklist you need`, score: 7, reasoning:"Checklist framing performs well."},
 { subject: `Still struggling with ${purpose}?`, score: 8, reasoning:"Pain-point question hook."},
 ]);
 toast.error("AI offline. Loaded template fallback.");
 } finally {
 setLoading(false);
 }
 };

 return (
      <div className="relative max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6">
      <GridPattern />

 <ToolPageHeader
 icon={Mail}
 title="Email Subject Line Generator"
 description="Generate 10 subject lines scored by open-rate potential with reasoning."
 />

 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <Inbox className="w-4 h-4 text-primary"/> Email Details
 </CardTitle>
 </CardHeader>
 <CardContent className="p-3 sm:p-4 space-y-4">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div className="space-y-2">
 <label className="text-xs font-medium text-muted-foreground">Email Purpose</label>
 <input
 value={purpose}
 onChange={(e) => setPurpose(e.target.value)}
 className={inputClass}
 placeholder="e.g. announcing a new feature"
 />
 </div>
 <div className="space-y-2">
 <label className="text-xs font-medium text-muted-foreground">Audience</label>
 <input
 value={audience}
 onChange={(e) => setAudience(e.target.value)}
 className={inputClass}
 placeholder="e.g. SaaS founders"
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
 <Sparkles className="w-4 h-4"/> Generate Subject Lines
 </>
 )}
 </Button>
 </CardContent>
 </GlassCard>

 {subjects.length > 0 && (
 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <TrendingUp className="w-4 h-4 text-primary"/> Scored Subject Lines
 </CardTitle>
 </CardHeader>
 <CardContent className="p-3 sm:p-4 space-y-3">
 {subjects.map((item, index) => (
 <div
 key={`${item.subject}-${index}`}
 className="rounded-xl border border-border/60 bg-background/60 p-3 sm:p-4"
 >
 <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
 <div className="space-y-1">
 <p className="text-sm font-medium">{item.subject}</p>
 <p className="text-xs text-muted-foreground">{item.reasoning}</p>
 </div>
 <div className="flex items-center gap-3">
 <span className="rounded-full border border-border/60 px-2.5 py-1 text-xs font-semibold">
 Score: {item.score}/10
 </span>
 <CopyButton getText={() => item.subject} label="Copy"/>
 </div>
 </div>
 </div>
 ))}
 </CardContent>
 </GlassCard>
 )}

 <ToolHowItWorks
 steps={[
 {
 step:"01",
 title:"Define Purpose",
 description:"Enter what the email is about and who will receive it.",
 icon: Inbox,
 },
 {
 step:"02",
 title:"Generate Options",
 description:"The AI creates 10 subject lines with estimated performance scores.",
 icon: Sparkles,
 },
 {
 step:"03",
 title:"Pick the Best",
 description:"Choose the strongest line and test it in your campaign.",
 icon: TrendingUp,
 },
 ]}
 badges={["100% Free","Scored Output","No Signup"]}
 />

 <ToolFeatureGuides
 features={[
 {
 icon: Mail,
 title:"High-Open Framing",
 description:"Creates subject lines designed to attract attention in crowded inboxes.",
 },
 {
 icon: TrendingUp,
 title:"Performance Scoring",
 description:"Each suggestion includes a score from 1 to 10.",
 },
 {
 icon: Inbox,
 title:"Audience Awareness",
 description:"Uses the target audience to make the subject lines more relevant.",
 },
 {
 icon: Sparkles,
 title:"Campaign Ready",
 description:"Useful for newsletters, launches, follow-ups, and promotions.",
 },
 ]}
 >
 <h3 className="text-lg font-semibold mb-3">Why subject lines matter</h3>
 <p className="mb-3 text-muted-foreground">
 Your email content only matters if people open the email. The subject line is the first filter between your
 message and your audience. A weak subject line can cause even a great email to be ignored.
 </p>
 <p className="mb-3 text-muted-foreground">
 Strong subject lines usually combine clarity, curiosity, relevance, and urgency. The best option depends on
 your audience and the goal of the email. That is why generating multiple options and comparing them is often
 more effective than choosing the first idea.
 </p>
 <p className="text-muted-foreground">
 Use the scores as guidance, not absolute truth. Real performance depends on list quality, sender reputation,
 timing, and offer strength. Whenever possible, A/B test the top subject lines.
 </p>
 </ToolFeatureGuides>

 <ToolFaqAccordion
 faqs={[
 {
 question:"Are the scores guaranteed open rates?",
 answer:"No. They are estimated quality scores, not exact predictions.",
 },
 {
 question:"How many subject lines should I test?",
 answer:"Start with 2 or 3 strong options and run an A/B test if your email platform supports it.",
 },
 {
 question:"Should subject lines be short?",
 answer:"Usually yes, but clarity matters more than length. Aim for concise and specific.",
 },
 ]}
 />

 <RelatedTools currentToolUrl="/tools/writing/email-subject-generator" max={6} />
 </div>
 );
}
