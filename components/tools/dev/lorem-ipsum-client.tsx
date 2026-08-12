"use client";

import {
 ActionButton,
 CopyButton,
 ExportTextButton,
 ResetButton,
} from"@/components/shared/action-buttons";
import InputField from"@/components/shared/form-fields/input-field";
import SwitchRow from"@/components/shared/form-fields/switch-row";
import TextareaField from"@/components/shared/form-fields/textarea-field";
import Stat from"@/components/shared/stat";
import ToolPageHeader from"@/components/shared/tool-page-header";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import {
 CardContent,
 CardDescription,
 CardFooter,
 CardHeader,
 CardTitle,
} from"@/components/ui/card";
import { GlassCard } from"@/components/ui/glass-card";
import { Separator } from"@/components/ui/separator";
import { generateParagraph, mulberry32 } from"@/lib/utils/dev/lorem-ipsum";
import { AlignLeft, BookOpen, Shield, FileText, Type, Layers, Code2, Zap, Globe } from"lucide-react";
import { useCallback, useEffect, useMemo, useState } from"react";

export default function LoremIpsumClient() {
 const [paragraphs, setParagraphs] = useState<number>(3);
 const [words, setWords] = useState<number>(50);
 const [startWithClassic, setStartWithClassic] = useState<boolean>(true);
 const [punctuation, setPunctuation] = useState<boolean>(true);
 const [deterministic, setDeterministic] = useState<boolean>(false);
 const [seed, setSeed] = useState<number>(() => Math.floor(Math.random() * 1_000_000));
 const [autoRun, setAutoRun] = useState<boolean>(true);
 const [separatorBlankLine, setSeparatorBlankLine] = useState<boolean>(true);
 const [output, setOutput] = useState<string[]>([]);

 const run = useCallback(() => {
 const localRng = deterministic ? mulberry32(seed) : Math.random;
 const paras: string[] = [];
 for (let p = 0; p < Math.max(1, paragraphs); p++) {
 paras.push(
 generateParagraph({
 wordsPerParagraph: Math.max(5, words),
 startWithClassic: startWithClassic && p === 0,
 punctuation,
 rng: localRng,
 }),
 );
 }
 setOutput(paras);
 }, [paragraphs, words, startWithClassic, punctuation, deterministic, seed]);

 useEffect(() => {
 if (autoRun) {
 // eslint-disable-next-line react-hooks/set-state-in-effect
 run();
 }
 }, [autoRun, run]);

 function resetAll() {
 setParagraphs(3);
 setWords(50);
 setStartWithClassic(true);
 setPunctuation(true);
 setDeterministic(false);
 setSeed(Math.floor(Math.random() * 1_000_000));
 setSeparatorBlankLine(true);
 setOutput([]);
 setAutoRun(true);
 }

 const outputText = useMemo(
 () => (separatorBlankLine ? output.join("\n\n") : output.join("\n")),
 [output, separatorBlankLine],
 );

 const stats = useMemo(() => {
 const chars = outputText.length;
 const wordsCount = outputText.trim() ? outputText.trim().split(/\s+/).length : 0;
 return { paras: output.length, words: wordsCount, chars };
 }, [outputText, output.length]);

 return (
 <div className="max-w-6xl mx-auto space-y-8">
 <ToolPageHeader
 icon={AlignLeft}
 title="Lorem Ipsum Generator"
 description="Fast, tweakable filler text for mockups, layouts, and testing."
 actions={
 <>
 <ResetButton onClick={resetAll} />
 <CopyButton getText={() => outputText} disabled={!outputText} />
 <ExportTextButton
 variant="default"
 filename="lorem-ipsum.txt"
 getText={() => outputText ||""}
 disabled={!outputText}
 />
 </>
 }
 />

 {/* Top stats */}
 <div className="mb-4 grid gap-3 sm:grid-cols-3">
 <Stat label="Paragraphs"value={stats.paras} hint="Generated"/>
 <Stat label="Words"value={stats.words} />
 <Stat label="Characters"value={stats.chars} />
 </div>

 <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
 {/* Left: Settings */}
 <GlassCard>
 <CardHeader>
 <CardTitle className="text-base">Settings</CardTitle>
 <CardDescription>Adjust paragraphs and words per paragraph.</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
 <InputField
 label="Paragraphs"
 type="number"
 min={1}
 max={50}
 value={String(paragraphs)}
 onChange={(e) => setParagraphs(Math.max(1, Number(e.target.value) || 1))}
 />
 <InputField
 label="Words / paragraph"
 type="number"
 min={5}
 max={400}
 value={String(words)}
 onChange={(e) => setWords(Math.max(5, Number(e.target.value) || 5))}
 />
 </div>

 <SwitchRow
 label="Start with ‘Lorem ipsum…’"
 checked={startWithClassic}
 onCheckedChange={(v) => setStartWithClassic(Boolean(v))}
 />
 <SwitchRow
 label="Add punctuation"
 hint="Sprinkle commas and end with a period"
 checked={punctuation}
 onCheckedChange={(v) => setPunctuation(Boolean(v))}
 />
 <SwitchRow
 label="Blank line between paragraphs"
 checked={separatorBlankLine}
 onCheckedChange={(v) => setSeparatorBlankLine(Boolean(v))}
 />

 <Separator />

 <SwitchRow
 label="Deterministic"
 hint="Enable seeded generation for reproducible output"
 checked={deterministic}
 onCheckedChange={(v) => setDeterministic(Boolean(v))}
 />
 <InputField
 label="Seed"
 type="number"
 value={String(seed)}
 onChange={(e) => setSeed(Number(e.target.value) || 0)}
 disabled={!deterministic}
 />
 </CardContent>
 <CardFooter className="flex gap-2 flex-wrap">
 <ActionButton label="Generate"icon={AlignLeft} onClick={run} />
 <ActionButton
 label="1 para"
 variant="outline"
 onClick={() => {
 setParagraphs(1);
 setWords(80);
 if (!autoRun) run();
 }}
 />
 <ActionButton
 label="3 para"
 variant="outline"
 onClick={() => {
 setParagraphs(3);
 setWords(60);
 if (!autoRun) run();
 }}
 />
 <ActionButton
 label="5 para"
 variant="outline"
 onClick={() => {
 setParagraphs(5);
 setWords(50);
 if (!autoRun) run();
 }}
 />
 <SwitchRow
 label="Auto‑generate"
 checked={autoRun}
 onCheckedChange={(v) => setAutoRun(Boolean(v))}
 />
 </CardFooter>
 </GlassCard>

 {/* Right: Output */}
 <GlassCard className="shadow-sm lg:col-span-2">
 <CardHeader className="flex items-end justify-between flex-wrap">
 <div>
 <CardTitle className="text-base">Output</CardTitle>
 <CardDescription>Your generated Lorem Ipsum text.</CardDescription>
 </div>
 <div className="flex items-center gap-2">
 <CopyButton getText={() => outputText} disabled={!outputText} />
 <ExportTextButton
 variant="default"
 filename="lorem-ipsum.txt"
 getText={() => outputText}
 disabled={!outputText}
 />
 </div>
 </CardHeader>
 <CardContent className="space-y-4">
 {output.length === 0 ? (
 <div className="rounded-md border p-3 text-sm text-muted-foreground">
 No text yet. Click <em>Generate</em> or enable Auto‑generate.
 </div>
 ) : (
 <TextareaField
 readOnly
 value={outputText}
 onValueChange={() => {}}
 textareaClassName="min-h-[530px] font-mono"
 />
 )}
 </CardContent>
 </GlassCard>
 </div>

 {/* SECTION 3: HOW IT WORKS */}
 <ToolHowItWorks
 steps={[
 {
 step:"01",
 title:"Choose Output Type",
 description:"Select whether you want paragraphs, sentences, words, or characters. Each mode gives you exactly the amount of placeholder text you need.",
 icon: FileText,
 },
 {
 step:"02",
 title:"Set the Count",
 description:"Enter how many paragraphs, sentences, or words to generate. Toggle HTML output to get properly wrapped <p> tags ready to paste into your markup.",
 icon: Type,
 },
 {
 step:"03",
 title:"Copy & Use",
 description:"Click Copy to grab the generated text. Paste directly into Figma, your CMS, HTML templates, or anywhere you need realistic-looking placeholder content.",
 icon: BookOpen,
 },
 ]}
 badges={[
"Paragraphs, words & chars",
"HTML output mode",
"Instant generation",
 ]}
 />

 {/* SECTION 4: FEATURE GUIDES */}
 <ToolFeatureGuides
 features={[
 {
 icon: FileText,
 title:"Paragraph Generator",
 description:"Generate 1–100 paragraphs of Lorem Ipsum. Each paragraph is 3–8 sentences of realistic length — ideal for testing typographic layouts and text-heavy UI designs.",
 },
 {
 icon: AlignLeft,
 title:"Sentence & Word Mode",
 description:"Generate a precise number of sentences or words when you need exact content volume — useful for testing character limits, tooltip copy, or button labels.",
 },
 {
 icon: Code2,
 title:"HTML Output",
 description:"Toggle HTML mode to wrap paragraphs in <p> tags. Copy directly into your HTML template, React JSX, CMS editor, or email template.",
 },
 {
 icon: Layers,
 title:"Starts with Classic Intro",
 description:"The first paragraph always begins with the classic \"Lorem ipsum dolor sit amet...\"for visual authenticity in design mockups and client presentations.",
 },
 {
 icon: Zap,
 title:"Instant & Offline",
 description:"Text is generated instantly in your browser using a precompiled Lorem Ipsum word pool. No API calls, no latency, works fully offline.",
 },
 {
 icon: Shield,
 title:"Completely Private",
 description:"Nothing is sent to any server. Pure client-side generation using JavaScript — your preferences and generated text stay entirely in your browser.",
 },
 ]}
 >
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <h3 className="text-lg font-semibold">Lorem Ipsum — A History of the World's Most Famous Placeholder Text</h3>
 <p>
 <strong>Lorem ipsum</strong> is the de facto standard placeholder text used by designers, developers,
 and publishers worldwide. It has been used since the 1500s when an unknown printer scrambled a passage
 of Latin to create a type specimen book. It was popularised in the 1960s with Letraset sheets and
 later adopted by desktop publishing software like Aldus PageMaker.
 </p>

 <h4 className="font-semibold">Where Does"Lorem Ipsum"Come From?</h4>
 <p>
 The text originates from sections 1.10.32 and 1.10.33 of
 <em>"de Finibus Bonorum et Malorum"</em> (On the Ends of Good and Evil) by Marcus Tullius Cicero,
 written in 45 BC. The Lorem Ipsum passage is a scrambled excerpt beginning:
 <em>"Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet..."</em>
 ("There is no one who loves pain itself, who seeks after it and wants to have it simply because it is pain...")
 </p>

 <h4 className="font-semibold">Lorem Ipsum Use Cases by Design Tool</h4>
 <div className="overflow-x-auto">
 <table className="w-full border-collapse text-sm">
 <thead>
 <tr className="bg-muted/50">
 <th className="border p-2 text-left">Tool / Context</th>
 <th className="border p-2 text-left">Best Format</th>
 <th className="border p-2 text-left">Typical Amount</th>
 </tr>
 </thead>
 <tbody>
 {[
 ["Figma / Sketch mockups","Plain text paragraphs","1–3 paragraphs"],
 ["HTML/CSS templates","HTML output (<p> tags)","3–5 paragraphs"],
 ["Email templates","Plain text or HTML","2–4 paragraphs"],
 ["CMS editors (WordPress)","Plain text paragraphs","3–5 paragraphs"],
 ["Button/label copy","Words mode: 2–6 words","N/A"],
 ["Card/tooltip copy","Sentences mode: 1–2 sentences","N/A"],
 ["Performance testing","Character mode","Exact byte count needed"],
 ].map(([tool, format, amount]) => (
 <tr key={tool} className="odd:bg-muted/20">
 <td className="border p-2 font-medium text-xs">{tool}</td>
 <td className="border p-2 text-xs">{format}</td>
 <td className="border p-2 text-muted-foreground text-xs">{amount}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>

 <h4 className="font-semibold">Lorem Ipsum vs Alternatives</h4>
 <div className="overflow-x-auto">
 <table className="w-full border-collapse text-sm">
 <thead>
 <tr className="bg-muted/50">
 <th className="border p-2 text-left">Type</th>
 <th className="border p-2 text-left">Example</th>
 <th className="border p-2 text-left">When to Use</th>
 </tr>
 </thead>
 <tbody>
 {[
 ["Lorem Ipsum","Lorem ipsum dolor sit amet...","UI prototypes, design mockups — neutral, internationally recognized"],
 ["Real content","Actual article or product copy","Final design reviews, client presentations, usability testing"],
 ["Blind text","Foo bar baz qux...","Technical testing where content is irrelevant"],
 ["Repeated text","Content content content...","Quick layout tests; avoid in final mockups"],
 ].map(([type, ex, when]) => (
 <tr key={type} className="odd:bg-muted/20">
 <td className="border p-2 font-medium text-xs">{type}</td>
 <td className="border p-2 font-mono text-xs text-muted-foreground">{ex}</td>
 <td className="border p-2 text-xs">{when}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>

 <h4 className="font-semibold">Why Designers Prefer Lorem Ipsum Over Real Text</h4>
 <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
 <li><strong>Focus on layout:</strong> Reviewers focus on design decisions rather than reading and critiquing the content.</li>
 <li><strong>Neutral meaning:</strong> Unlike repeated real words, Lorem Ipsum looks like natural text without distracting meaning.</li>
 <li><strong>Realistic line breaks:</strong> The varied word lengths create natural typography with realistic widows, orphans, and line breaks.</li>
 <li><strong>Client expectations:</strong> Using real content in early mockups can mislead clients into approving layout based on content they recognize.</li>
 </ul>
 </div>
 </ToolFeatureGuides>

 {/* SECTION 5: FAQ + RELATED TOOLS */}
 <ToolFaqAccordion
 faqs={[
 {
 question:"What is Lorem Ipsum and why is it used?",
 answer:"Lorem ipsum is scrambled Latin placeholder text used by designers and developers since the 1500s. It is used because its natural-looking word length variation creates realistic text layouts, while being meaningless enough that reviewers focus on design rather than content.",
 },
 {
 question:"Is Lorem Ipsum actual Latin?",
 answer:"Not exactly. It is derived from Cicero's 45 BC philosophical work de Finibus Bonorum et Malorum, but the text has been deliberately scrambled and is not coherent Latin. The passage starting \"Lorem ipsum dolor sit amet...\"has no meaningful translation.",
 },
 {
 question:"How many words is a standard Lorem Ipsum paragraph?",
 answer:"A typical Lorem ipsum paragraph contains 50–100 words, or about 3–8 sentences. This generator creates paragraphs in this natural range. You can also use word mode to generate exactly the number of words you need.",
 },
 {
 question:"When should I use HTML output mode?",
 answer:"Use HTML output mode when you need the text wrapped in <p> tags — for pasting into HTML templates, React/JSX components, email builders, or CMS editors that accept HTML. Plain text mode is better for Figma, design tools, or anywhere HTML tags would be visible.",
 },
 {
 question:"Can I use Lorem Ipsum in production?",
 answer:"No. Lorem ipsum is strictly for design mockups and development placeholders. Always replace it with real, meaningful content before publishing. Leaving placeholder text in production looks unprofessional and can harm SEO.",
 },
 ]}
 />
 <RelatedTools currentToolUrl="/tools/dev/lorem-ipsum"max={6} />
 </div>
 );
}
