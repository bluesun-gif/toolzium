"use client";

import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";

import { ToolBackground } from"@/components/shared/tool-background";

import { useState, useMemo } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import InputField from "@/components/shared/form-fields/input-field";
import TextareaField from "@/components/shared/form-fields/textarea-field";
import SwitchRow from "@/components/shared/form-fields/switch-row";
import Stat from "@/components/shared/stat";
import { ResetButton, CopyButton, ActionButton } from "@/components/shared/action-buttons";
import { Button } from "@/components/ui/button";
import { AlignLeft, RefreshCw, Copy, FileText, Settings2, Shield, Zap, BookOpen, Type, Globe, Settings } from "lucide-react";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { GridPattern } from "@/components/magicui/grid-pattern";
const LOREM_WORDS = ["lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud", "exercitation", "ullamco", "laboris", "nisi", "ut", "aliquip", "ex", "ea", "commodo", "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate", "velit", "esse", "cillum", "dolore", "eu", "fugiat", "nulla", "pariatur", "excepteur", "sint", "occaecat", "cupidatat", "non", "proident", "sunt", "in", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id", "est", "laborum"];
export default function LoremIpsumClient() {
  const [count, setCount] = useState<number>(5);
  const [unit, setUnit] = useState<"paragraphs" | "sentences" | "words" | "list">("paragraphs");
  const [startWithLorem, setStartWithLorem] = useState<boolean>(true);
  const [includeHtml, setIncludeHtml] = useState<boolean>(false);
  const [seed, setSeed] = useState<number>(1);
  const generatedText = useMemo(() => {
    let result = "";
    const getRandomWord = () => LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)];
    const generateSentence = (minWords = 6, maxWords = 14) => {
      const len = Math.floor(Math.random() * (maxWords - minWords + 1)) + minWords;
      const words: string[] = [];
      for (let i = 0; i < len; i++) {
        words.push(getRandomWord());
      }
      let sentence = words.join("");
      return sentence.charAt(0).toUpperCase() + sentence.slice(1) + ".";
    };
    const generateParagraph = (minSentences = 3, maxSentences = 6) => {
      const len = Math.floor(Math.random() * (maxSentences - minSentences + 1)) + minSentences;
      const sents: string[] = [];
      for (let i = 0; i < len; i++) {
        sents.push(generateSentence());
      }
      return sents.join("");
    };
    if (unit === "words") {
      const words: string[] = [];
      for (let i = 0; i < count; i++) {
        words.push(getRandomWord());
      }
      if (startWithLorem && words.length >= 5) {
        words[0] = "lorem";
        words[1] = "ipsum";
        words[2] = "dolor";
        words[3] = "sit";
        words[4] = "amet";
      }
      result = words.join("");
    } else if (unit === "sentences") {
      const sentences: string[] = [];
      for (let i = 0; i < count; i++) {
        sentences.push(generateSentence());
      }
      if (startWithLorem && sentences.length > 0) {
        sentences[0] = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
      }
      result = sentences.join("");
    } else if (unit === "list") {
      const items: string[] = [];
      for (let i = 0; i < count; i++) {
        const itemText = generateSentence(4, 10);
        items.push(includeHtml ? ` <li>${itemText}</li>` : `• ${itemText}`);
      }
      result = includeHtml ? `<ul>\n${items.join("\n")}\n</ul>` : items.join("\n");
    } else {
      // Paragraphs
      const paras: string[] = [];
      for (let i = 0; i < count; i++) {
        let p = generateParagraph();
        if (i === 0 && startWithLorem) {
          p = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." + p;
        }
        paras.push(includeHtml ? `<p>${p}</p>` : p);
      }
      result = includeHtml ? paras.join("\n\n") : paras.join("\n\n");
    }
    return result;
  }, [count, unit, startWithLorem, includeHtml, seed]);
  const wordCount = generatedText.trim() ? generatedText.trim().split(/\s+/).length : 0;
  const charCount = generatedText.length;
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

 <ToolPageHeader title="Lorem Ipsum Generator" description="Generate custom placeholder dummy text for design mockups, wireframes, and layouts. Choose paragraphs, sentences, words, or lists with optional HTML tags." icon={AlignLeft} />

 <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
 {/* Controls */}
 <div className="lg:col-span-5 space-y-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Generator Settings</CardTitle>
 </CardHeader>
 <CardContent className="space-y-5">
 <div className="space-y-2">
 <label className="text-sm font-medium">Type of Content</label>
 <div className="grid grid-cols-2 gap-2">
 {[{
                    id: "paragraphs",
                    label: "Paragraphs"
                  }, {
                    id: "sentences",
                    label: "Sentences"
                  }, {
                    id: "words",
                    label: "Words"
                  }, {
                    id: "list",
                    label: "Bullet List"
                  }].map(item => <Button key={item.id} type="button" variant={unit === item.id ? "default" : "outline"} size="sm" onClick={() => setUnit(item.id as any)}>
 {item.label}
 </Button>)}
 </div>
 </div>

 <div className="space-y-2">
 <div className="flex justify-between text-sm font-medium">
 <span>Quantity ({unit})</span>
 <span>{count}</span>
 </div>
 <input type="range" min="1" max="50" value={count} onChange={e => setCount(Number(e.target.value))} className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary" />
 </div>

 <SwitchRow label="Start with 'Lorem ipsum...'" hint="Begin text with classic Latin phrase" checked={startWithLorem} onCheckedChange={setStartWithLorem} />

 <SwitchRow label="Include HTML Tags" hint="Wrap output with <p> or <ul><li> tags" checked={includeHtml} onCheckedChange={setIncludeHtml} />

 <div className="flex gap-3 pt-2">
 <ActionButton icon={RefreshCw} label="Regenerate Text" onClick={() => setSeed(s => s + 1)} variant="default" className="flex-1" />
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardContent className="p-6">
 <div className="grid grid-cols-2 gap-4">
 <Stat label="Total Words" value={wordCount.toLocaleString()} />
 <Stat label="Total Characters" value={charCount.toLocaleString()} />
 </div>
 </CardContent>
 </GlassCard>
 </div>

 {/* Generated Result */}
 <div className="lg:col-span-7 space-y-6">
 <GlassCard className="h-full flex flex-col">
 <CardHeader className="flex flex-row items-center justify-between pb-4 border-b">
 <div>
 <CardTitle>Generated Text</CardTitle>
 <CardDescription>Instant copy-ready placeholder text</CardDescription>
 </div>
 <CopyButton getText={generatedText} label="Copy Text" />
 </CardHeader>
 <CardContent className="pt-6 flex-1 flex flex-col">
 <TextareaField value={generatedText} readOnly rows={16} className="font-sans text-sm flex-1 leading-relaxed" />
 </CardContent>
 </GlassCard>
 </div>
 </div>

 {/* SECTION 3: HOW IT WORKS */}
 <ToolHowItWorks steps={[{
        step: "01",
        title: "Choose Your Format",
        description: "Select the output type: paragraphs, sentences, or words. Set the count (e.g., 3 paragraphs, 10 sentences, 50 words). Choose between classic Lorem Ipsum or randomized Latin-style placeholder text.",
        icon: Settings2
      }, {
        step: "02",
        title: "Customize Options",
        description: "Toggle whether to start with the classic 'Lorem ipsum dolor sit amet...' opening. Enable HTML output to wrap paragraphs in p tags for direct use in code editors and CMS platforms.",
        icon: Type
      }, {
        step: "03",
        title: "Copy and Use",
        description: "Click Generate to produce your placeholder text, then copy with one click. Paste directly into Figma, Adobe XD, WordPress, HTML files, Word documents, or any design and development tool.",
        icon: Copy
      }]} badges={["Paragraphs, sentences, words", "HTML output", "Classic and random modes"]} />

 {/* SECTION 4: FEATURE GUIDES */}
 <ToolFeatureGuides features={[{
        icon: FileText,
        title: "Multiple Output Formats",
        description: "Generate placeholder text as paragraphs (with natural line breaks), individual sentences, or a word count. Each format suits different design contexts from full page mockups to button labels."
      }, {
        icon: Type,
        title: "Classic and Random Modes",
        description: "Classic mode starts with the authentic Lorem ipsum dolor sit amet opening from Cicero. Random mode generates varied Latin-derived placeholder text for variety across multiple sections."
      }, {
        icon: Globe,
        title: "HTML Paragraph Output",
        description: "Enable HTML mode to wrap each paragraph in p tags. Output is ready to paste directly into HTML files, WordPress editors, React JSX, or any CMS that accepts HTML content."
      }, {
        icon: Zap,
        title: "Instant Generation",
        description: "Text is generated instantly in your browser with no API calls. Generate as many paragraphs, sentences, or words as needed with zero latency."
      }, {
        icon: BookOpen,
        title: "Authentic Latin Text",
        description: "Classic Lorem Ipsum derives from Cicero's De Finibus Bonorum et Malorum (45 BC). The standard passage starting with Lorem ipsum dolor sit amet has been used in typesetting since the 1500s."
      }, {
        icon: Shield,
        title: "Client-Side and Private",
        description: "All generation happens in your browser. Nothing is sent to a server. Works fully offline once the page is loaded."
      }]}>
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <h3 className="text-lg font-semibold">Lorem Ipsum Complete Guide</h3>
 <p>Lorem Ipsum is dummy text used in typesetting and graphic design to fill space when the actual content is not yet available. Its purpose is to allow designers, developers, and clients to focus on visual layout and typography without being distracted by readable content. The words are deliberately meaningless to the reader, preventing the content from influencing design decisions.</p>
 <p>The standard Lorem Ipsum passage originates from Cicero's <em>De Finibus Bonorum et Malorum</em> (On the Ends of Good and Evil), written in 45 BC. The text was scrambled and altered to be unrecognizable, but the Latin origin gives it a natural word-length distribution similar to English, making it ideal for realistic layout mockups.</p>
 
 <h3 className="text-lg font-semibold">When to Use Each Output Format</h3>
 <div className="overflow-x-auto">
 <table className="w-full border-collapse text-sm">
 <thead>
 <tr className="bg-muted/50">
 <th className="border p-2 text-left">Format</th>
 <th className="border p-2 text-left">Best For</th>
 <th className="border p-2 text-left">Typical Count</th>
 </tr>
 </thead>
 <tbody>
 {[["Paragraphs", "Page layouts, article mockups, blog designs", "3-5 paragraphs"], ["Sentences", "Card components, tooltips, sidebar content", "2-4 sentences"], ["Words", "Button labels, nav items, short UI text", "3-8 words"], ["HTML output", "CMS editors, HTML templates, React/JSX", "Any"]].map(([fmt, best, count]) => <tr key={fmt} className="odd:bg-muted/20">
 <td className="border p-2 font-medium text-xs">{fmt}</td>
 <td className="border p-2 text-xs">{best}</td>
 <td className="border p-2 text-muted-foreground text-xs">{count}</td>
 </tr>)}
 </tbody>
 </table>
 </div>

 <h3 className="text-lg font-semibold">Lorem Ipsum in Design Workflows</h3>
 <ul className="list-disc pl-5 space-y-1 text-sm">
 <li><strong>Figma and Adobe XD</strong>: Paste Lorem Ipsum into text layers to simulate real content density. Use word-count mode for headlines and paragraph mode for body text areas.</li>
 <li><strong>WordPress and CMS</strong>: Paste in classic or HTML mode directly into the block editor. HTML mode ensures correct paragraph formatting.</li>
 <li><strong>Email templates</strong>: Use 2-3 sentences per section to simulate newsletter content. Avoid full paragraphs in email mockups as line wrapping differs across email clients.</li>
 <li><strong>React and Next.js</strong>: Use HTML output and parse it as dangerouslySetInnerHTML, or use word/sentence mode and assign text directly to string props.</li>
 <li><strong>Print design</strong>: For brochures and books, use 5-8 paragraphs in classic mode to fill realistic page space. Random mode avoids repetition across multiple pages.</li>
 </ul>

 <h3 className="text-lg font-semibold">Alternatives to Lorem Ipsum</h3>
 <div className="overflow-x-auto">
 <table className="w-full border-collapse text-sm">
 <thead>
 <tr className="bg-muted/50">
 <th className="border p-2 text-left">Alternative</th>
 <th className="border p-2 text-left">Description</th>
 <th className="border p-2 text-left">When to Use</th>
 </tr>
 </thead>
 <tbody>
 {[["Cupcake Ipsum", "Food-themed placeholder text", "Fun or food-related projects"], ["Hipster Ipsum", "Trendy buzzword-filled text", "Tech startup mockups"], ["Samuel L. Ipsum", "Movie quote-based text", "Entertainment projects"], ["Bacon Ipsum", "Meat-themed placeholder", "Restaurant or food sites"], ["Real content", "Actual project copy", "Final design review stages"]].map(([alt, desc, when]) => <tr key={alt} className="odd:bg-muted/20">
 <td className="border p-2 font-medium text-xs">{alt}</td>
 <td className="border p-2 text-xs">{desc}</td>
 <td className="border p-2 text-muted-foreground text-xs">{when}</td>
 </tr>)}
 </tbody>
 </table>
 </div>
 </div>
 </ToolFeatureGuides>

 {/* SECTION 5: FAQ + RELATED TOOLS */}
 <ToolFaqAccordion faqs={[{
        question: "What is Lorem Ipsum and where does it come from?",
        answer: "Lorem Ipsum is placeholder text derived from Cicero's De Finibus Bonorum et Malorum, written in 45 BC. The standard Lorem ipsum dolor sit amet passage is a scrambled, altered version of the original Latin. It has been used in typesetting since the 1500s when an unknown printer scrambled a passage of Cicero to create a type specimen book. It became the standard placeholder text for the desktop publishing industry."
      }, {
        question: "Should I use Lorem Ipsum or real content for mockups?",
        answer: "Use Lorem Ipsum in early design stages to focus on layout and typography decisions without content bias. Switch to real content before final client review, because stakeholders often approve incorrect layouts when using placeholder text. The final design should always be validated with actual content, as real text has different lengths and patterns that may reveal layout issues not apparent with Lorem Ipsum."
      }, {
        question: "What is the difference between paragraphs, sentences, and words mode?",
        answer: "Paragraphs mode generates full blocks of text with 4-8 sentences each, suitable for article body and page layout mockups. Sentences mode generates individual sentences without grouping, suitable for card components, tooltips, and captions. Words mode generates a specific number of words without sentence structure, suitable for headlines, button labels, and short UI text elements."
      }, {
        question: "What does the HTML output option do?",
        answer: "HTML output wraps each paragraph in p tags: the text becomes paragraph content paragraph. This lets you paste directly into HTML files, CMS editors like WordPress, or React components without manually adding markup. Without HTML mode, the output is plain text with line breaks between paragraphs."
      }, {
        question: "Is Lorem Ipsum Latin? Does it mean anything?",
        answer: "Lorem Ipsum is derived from Latin but is deliberately scrambled to be meaningless. The original Cicero passage discusses the nature of good and evil in philosophy. The standard Lorem ipsum passage starting text was extracted, altered, and randomized so it reads as authentic-looking Latin while conveying no actual meaning, preventing readers from being influenced by the content during design review."
      }]} />
    </div>
    </div>
);
}
