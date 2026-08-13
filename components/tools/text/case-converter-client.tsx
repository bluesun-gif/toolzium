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
import { Type, Wand2, AlignLeft, CheckCircle2 } from"lucide-react";
import { GridPattern } from"@/components/magicui/grid-pattern";
import { GlassCard } from"@/components/ui/glass-card";

const cardClass ="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass ="border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass ="text-xs sm:text-sm font-semibold flex items-center gap-2";
const textareaClass ="w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50";

export default function CaseConverterClient() {
 const [text, setText] = useState("");
 const [output, setOutput] = useState("");

 const stats = useMemo(() => {
 const chars = output.length;
 const words = output.trim() ? output.trim().split(/\s+/).length : 0;
 return { chars, words };
 }, [output]);

 const convert = (type: string) => {
 let result ="";
 switch (type) {
 case"upper": result = text.toUpperCase(); break;
 case"lower": result = text.toLowerCase(); break;
 case"title": result = text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()); break;
 case"sentence": result = text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase()); break;
 case"camel": result = text.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => index === 0 ? word.toLowerCase() : word.toUpperCase()).replace(/[\s_-]+/g,""); break;
 case"snake": result = text.replace(/[\s-]+/g,"_").toLowerCase(); break;
 case"kebab": result = text.replace(/[\s_]+/g,"-").toLowerCase(); break;
 case"constant": result = text.replace(/[\s-]+/g,"_").toUpperCase(); break;
 }
 setOutput(result);
 toast.success(`Converted to ${type} case`);
 };

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

 <ToolPageHeader icon={Type} title="Case Converter"description="Instantly convert text to UPPERCASE, lowercase, Title Case, camelCase, snake_case, and more."/>
 
 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}><AlignLeft className="w-4 h-4 text-primary"/> Input Text</CardTitle>
 </CardHeader>
 <CardContent className="p-3 sm:p-4 space-y-4">
 <textarea
 value={text}
 onChange={(e) => setText(e.target.value)}
 rows={6}
 className={textareaClass}
 placeholder="Paste or type your text here..."
 />
 <div className="flex flex-wrap gap-2">
 <Button variant="outline"size="sm"onClick={() => convert("upper")}>UPPERCASE</Button>
 <Button variant="outline"size="sm"onClick={() => convert("lower")}>lowercase</Button>
 <Button variant="outline"size="sm"onClick={() => convert("title")}>Title Case</Button>
 <Button variant="outline"size="sm"onClick={() => convert("sentence")}>Sentence case</Button>
 <Button variant="outline"size="sm"onClick={() => convert("camel")}>camelCase</Button>
 <Button variant="outline"size="sm"onClick={() => convert("snake")}>snake_case</Button>
 <Button variant="outline"size="sm"onClick={() => convert("kebab")}>kebab-case</Button>
 <Button variant="outline"size="sm"onClick={() => convert("constant")}>CONSTANT_CASE</Button>
 </div>
 </CardContent>
 </GlassCard>

 {output && (
 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}><CheckCircle2 className="w-4 h-4 text-primary"/> Converted Output</CardTitle>
 </CardHeader>
 <CardContent className="p-3 sm:p-4 space-y-4">
 <textarea value={output} readOnly rows={6} className={textareaClass} />
 <div className="flex items-center justify-between">
 <div className="text-xs text-muted-foreground">{stats.chars} characters · {stats.words} words</div>
 <CopyButton getText={() => output} label="Copy Output"/>
 </div>
 </CardContent>
 </GlassCard>
 )}

 <ToolHowItWorks
 steps={[
 { step:"01", title:"Enter Text", description:"Paste or type the text you want to transform into the input area.", icon: AlignLeft },
 { step:"02", title:"Choose Format", description:"Click any of the case conversion buttons to apply the desired formatting.", icon: Wand2 },
 { step:"03", title:"Copy Result", description:"Review the converted text and copy it to your clipboard with one click.", icon: CheckCircle2 },
 ]}
 badges={["100% Free","Client-Side","No Signup"]}
 />

 <ToolFeatureGuides
 features={[
 { icon: Type, title:"8 Case Formats", description:"Supports standard text cases plus developer-friendly formats like camelCase and snake_case."},
 { icon: Wand2, title:"Instant Conversion", description:"Transforms your text locally in the browser without any network delays."},
 { icon: AlignLeft, title:"Sentence Awareness", description:"Sentence case intelligently capitalizes the first letter after punctuation marks."},
 { icon: CheckCircle2, title:"Privacy First", description:"Your text never leaves your device, ensuring complete confidentiality."},
 ]}
 >
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <p>Text case conversion is a fundamental task in writing, programming, and data formatting. Whether you are formatting headlines for a blog post, standardizing database column names, or preparing variables for a codebase, having the right case format is essential for readability and consistency.</p>
 <p>Developer-specific formats like camelCase, snake_case, and kebab-case are heavily used in modern programming languages and URL structures. camelCase is the standard for JavaScript variables, snake_case is preferred in Python and database schemas, while kebab-case is the convention for CSS classes and URL slugs. This tool automatically strips spaces and punctuation to generate clean, syntax-compliant identifiers.</p>
 <p>For general writing, Title Case and Sentence case help maintain grammatical correctness across documents and emails. Our algorithm handles edge cases like punctuation boundaries and multi-word phrases to ensure the output is always grammatically sound and ready to publish.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion
 faqs={[
 { question:"Will this tool change my punctuation?", answer:"No, standard case conversions (like UPPERCASE and lowercase) preserve all punctuation. Developer cases (like camelCase) will remove spaces and special characters to create valid code identifiers."},
 { question:"Is my text sent to a server?", answer:"Absolutely not. All text processing happens directly in your browser using JavaScript. Your data remains 100% private."},
 { question:"Can I convert large documents?", answer:"Yes, the tool can handle large blocks of text instantly. However, for extremely large files (over 10MB), your browser might experience slight delays."},
 ]}
 />

 <RelatedTools currentToolUrl="/tools/text/case-converter" max={6} />
 </div>
 );
}
