"use client";

import React, { useState, useMemo } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { CopyButton } from"@/components/shared/action-buttons";
import toast from"react-hot-toast";
import { AlignLeft, FileText, Clock, RefreshCw } from"lucide-react";
import { GridPattern } from"@/components/magicui/grid-pattern";
import { GlassCard } from"@/components/ui/glass-card";

const cardClass ="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass ="border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass ="text-xs sm:text-sm font-semibold flex items-center gap-2";

type UnitType ="words"|"sentences"|"paragraphs";

const SOURCE_TEXT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra. Erat ipsum fringilla ante, id posuere eros dolor sit amet lacus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae. Morbi lacinia molestie dui. Praesent blandit dolor. Sed non quam. In vel mi sit amet augue congue elementum. Morbi in ipsum sit amet pede facilisis laoreet. Donec lacus nunc, viverra nec, blandit vel, egestas et, augue. Vestibulum tincidunt malesuada tellus. Ut ultrices ultrices enim. Curabitur sit amet mauris. Morbi in dui quis est pulvinar ullamcorper. Nulla facilisi. Integer lacinia sollicitudin massa. Cras metus. Sed aliquet risus a tortor. Integer id quam. Morbi mi. Quisque nisl felis, venenatis tristique, dignissim in, ultrices sit amet, augue. Proin sodales libero eget ante. Nulla quam. Aenean laoreet. Vestibulum nisi lectus, commodo ac, facilisis nec, lobortis id, libero.`;

const SENTENCES = SOURCE_TEXT.match(/[^.!?]+[.!?]+/g)?.map((s) => s.trim()) ?? [SOURCE_TEXT];
const WORDS = SOURCE_TEXT.split(/\s+/);

export default function LoremIpsumClient() {
 const [count, setCount] = useState(3);
 const [unit, setUnit] = useState<UnitType>("paragraphs");
 const [output, setOutput] = useState("");

 const generate = () => {
 let result ="";
 if (unit ==="words") {
 const pool: string[] = [];
 for (let i = 0; i < count; i++) pool.push(WORDS[i % WORDS.length]);
 result = pool.join("") +".";
 } else if (unit ==="sentences") {
 const pool: string[] = [];
 for (let i = 0; i < count; i++) pool.push(SENTENCES[i % SENTENCES.length]);
 result = pool.join("");
 } else {
 const paragraphs: string[] = [];
 for (let p = 0; p < count; p++) {
 const para: string[] = [];
 const sentenceCount = 4 + (p % 3);
 for (let s = 0; s < sentenceCount; s++) {
 para.push(SENTENCES[(p * 5 + s) % SENTENCES.length]);
 }
 paragraphs.push(para.join(""));
 }
 result = paragraphs.join("\n\n");
 }
 setOutput(result);
 toast.success(`Generated ${count} ${unit}`);
 };

 const stats = useMemo(() => {
 if (!output) return null;
 const words = output.trim().split(/\s+/).filter(Boolean).length;
 const chars = output.length;
 const paragraphs = output.split(/\n\n+/).filter(Boolean).length;
 return { words, chars, paragraphs };
 }, [output]);

 return (
 <div className="max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6">
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray="4 2"
        className="absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
      />

 <ToolPageHeader
 icon={AlignLeft}
 title="Lorem Ipsum Generator"
 description="Generate placeholder text in words, sentences, or paragraphs for mockups and layouts."
 />

 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <FileText className="w-4 h-4 text-primary"/> Generator Settings
 </CardTitle>
 </CardHeader>
 <CardContent className="p-3 sm:p-4 space-y-4">
 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
 <div className="space-y-2">
 <label className="text-xs font-medium text-muted-foreground">Amount</label>
 <select
 value={count}
 onChange={(e) => setCount(parseInt(e.target.value, 10))}
 className="w-full rounded-lg border border-border/70 bg-background/80 p-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/50"
 >
 {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
 <option key={n} value={n}>
 {n}
 </option>
 ))}
 </select>
 </div>
 <div className="space-y-2">
 <label className="text-xs font-medium text-muted-foreground">Unit</label>
 <select
 value={unit}
 onChange={(e) => setUnit(e.target.value as UnitType)}
 className="w-full rounded-lg border border-border/70 bg-background/80 p-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/50"
 >
 <option value="words">Words</option>
 <option value="sentences">Sentences</option>
 <option value="paragraphs">Paragraphs</option>
 </select>
 </div>
 <div className="space-y-2 flex items-end">
 <Button onClick={generate} className="w-full">
 <RefreshCw className="w-4 h-4 mr-2"/> Generate
 </Button>
 </div>
 </div>
 </CardContent>
 </GlassCard>

 {output && (
 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <AlignLeft className="w-4 h-4 text-primary"/> Generated Text
 </CardTitle>
 </CardHeader>
 <CardContent className="p-3 sm:p-4 space-y-3">
 <div className="max-h-96 overflow-y-auto rounded-lg border border-border/60 bg-background/60 p-4 text-sm leading-relaxed whitespace-pre-wrap">
 {output}
 </div>
 {stats && (
 <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
 <span>{stats.words} words</span>
 <span>{stats.chars} characters</span>
 <span>{stats.paragraphs} paragraphs</span>
 </div>
 )}
 <CopyButton getText={() => output} label="Copy Text"/>
 </CardContent>
 </GlassCard>
 )}

 <ToolHowItWorks
 steps={[
 { step:"01", title:"Choose Amount", description:"Select how many units of text you need, from 1 to 10.", icon: FileText },
 { step:"02", title:"Pick the Unit", description:"Decide whether you want individual words, sentences, or full paragraphs.", icon: AlignLeft },
 { step:"03", title:"Generate & Copy", description:"Click generate and copy the placeholder text directly into your design or draft.", icon: RefreshCw },
 ]}
 badges={["100% Free","Client-Side","No Signup"]}
 />

 <ToolFeatureGuides
 features={[
 { icon: AlignLeft, title:"Three Units", description:"Generate placeholder text as words, sentences, or paragraphs depending on your layout needs."},
 { icon: FileText, title:"Classic Source", description:"Uses the traditional Lorem Ipsum passage dating back to Cicero's writings in 45 BC."},
 { icon: Clock, title:"Instant Generation", description:"No network calls or waiting — output is produced the moment you click."},
 { icon: RefreshCw, title:"Live Stats", description:"Shows word, character, and paragraph counts so you know exactly how much text you have."},
 ]}
 >
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <p>Lorem ipsum has been the printing and typesetting industry&apos;s standard dummy text since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It survived not only five centuries but also the leap into electronic typesetting, remaining essentially unchanged. Its endurance is no accident — the pseudo-Latin text distributes letters in a pattern that looks like readable English without actually distracting the reader with meaning.</p>
 <p>Placeholder text serves a critical role in design and development. When reviewing a layout, the human brain naturally focuses on content rather than structure. If real content is used, reviewers will critique the copy instead of the typography, spacing, and visual hierarchy. Lorem ipsum short-circuits this tendency, letting designers evaluate the shape of text blocks, the rhythm of line breaks, and the balance of whitespace without semantic interference.</p>
 <p>Modern alternatives like Hipster Ipsum, Cat Ipsum, and Bacon Ipsum add flavor to mockups, but classic Lorem ipsum remains the safest choice for professional deliverables. Clients and stakeholders universally recognize it as placeholder text, so there is no risk of anyone mistaking the mockup copy for final content. When moving from mockup to production, always replace Lorem ipsum with real, reviewed, and edited content before launch.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion
 faqs={[
 { question:"Where does Lorem Ipsum come from?", answer:"It comes from sections 1.10.32 and 1.10.33 of 'de Finibus Bonorum et Malorum' (The Extremes of Good and Evil) by Cicero, written in 45 BC. The passage was discovered by Richard McClintock in 1914."},
 { question:"Is it safe to use Lorem Ipsum in client mockups?", answer:"Yes, it is universally recognized as placeholder text. Just make sure you replace it with real content before the final release."},
 { question:"Can I use this for production content?", answer:"No. Lorem Ipsum is meaningless text intended only for design placeholders. Always use real content for published material."},
 ]}
 />

 <RelatedTools currentToolUrl="/tools/developer/lorem-ipsum" max={6} />
 </div>
 );
}
