"use client";

import React, { useState, useRef, useEffect, ChangeEvent, UIEvent } from"react";
import { FileText, Bold, Italic, Heading1, Heading2, Heading3, Link as LinkIcon, Image as ImageIcon, Code, List, ListOrdered, Quote, Minus, Download, Copy, Trash2, Maximize, Minimize, BookOpen, Shield, Code2, Eye, Type, AlignLeft, Layers, Globe } from"lucide-react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Separator } from"@/components/ui/separator";
import SwitchRow from"@/components/shared/form-fields/switch-row";
import Stat from"@/components/shared/stat";
import { ActionButton } from"@/components/shared/action-buttons";

import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

// Basic markdown parser
const parseMarkdown = (text: string) => {
 if (!text) return"";

 // Escape HTML
 let html = text.replace(/</g,"&lt;").replace(/>/g,"&gt;");

 // Code blocks (extract to prevent parsing inside them)
 const codeBlocks: string[] = [];
 html = html.replace(/```([\s\S]*?)```/gim, (match, p1) => {
 codeBlocks.push("<pre class='bg-muted p-4 rounded-md overflow-x-auto my-4 text-sm'><code>"+ p1.trim() +"</code></pre>");
 return"___CODEBLOCK_"+ (codeBlocks.length - 1) +"___";
 });

 // Inline code
 const inlineCodes: string[] = [];
 html = html.replace(/`(.*?)`/gim, (match, p1) => {
 inlineCodes.push("<code class='bg-muted px-1.5 py-0.5 rounded text-sm font-mono'>"+ p1 +"</code>");
 return"___INLINECODE_"+ (inlineCodes.length - 1) +"___";
 });

 // Block level elements
 html = html.replace(/^###### (.*$)/gim,"<h6 class='text-base font-semibold mt-4 mb-2'>$1</h6>");
 html = html.replace(/^##### (.*$)/gim,"<h5 class='text-lg font-semibold mt-4 mb-2'>$1</h5>");
 html = html.replace(/^#### (.*$)/gim,"<h4 class='text-xl font-semibold mt-4 mb-2'>$1</h4>");
 html = html.replace(/^### (.*$)/gim,"<h3 class='text-2xl font-semibold mt-6 mb-3'>$1</h3>");
 html = html.replace(/^## (.*$)/gim,"<h2 class='text-3xl font-bold mt-8 mb-4 pb-2 border-b'>$1</h2>");
 html = html.replace(/^# (.*$)/gim,"<h1 class='text-4xl font-extrabold mt-8 mb-6 pb-2 border-b'>$1</h1>");

 html = html.replace(/^\> (.*$)/gim,"<blockquote class='border-l-4 border-primary pl-4 italic text-muted-foreground my-4'>$1</blockquote>");
 html = html.replace(/^---$/gim,"<hr class='my-8 border-t border-border' />");

 // Lists
 html = html.replace(/^(?:-|\*|\+)\s+(.*)/gim,"<ul class='list-disc pl-6 my-2 space-y-1'><li>$1</li></ul>");
 html = html.replace(/<\/ul>\n*<ul[^>]*>/gim,"");
 
 html = html.replace(/^\d+\.\s+(.*)/gim,"<ol class='list-decimal pl-6 my-2 space-y-1'><li>$1</li></ol>");
 html = html.replace(/<\/ol>\n*<ol[^>]*>/gim,"");

 // Inline formatting
 html = html.replace(/\*\*(.*?)\*\*/gim,"<strong>$1</strong>");
 html = html.replace(/\*(.*?)\*/gim,"<em>$1</em>");
 html = html.replace(/!\[(.*?)\]\((.*?)\)/gim,"<img alt='$1' src='$2' class='max-w-full h-auto rounded-md my-4' />");
 html = html.replace(/\[(.*?)\]\((.*?)\)/gim,"<a href='$2' target='_blank' rel='noopener noreferrer' class='text-primary hover:underline'>$1</a>");

 // Paragraphs
 const blocks = html.split(/\n\s*\n/);
 html = blocks.map(block => {
 if (block.match(/^(<h[1-6]|<ul|<ol|<blockquote|<hr|___CODEBLOCK_)/)) {
 return block;
 }
 return"<p class='my-4 leading-7'>"+ block.replace(/\n/g,"<br />") +"</p>";
 }).join("\n");

 // Restore code blocks
 html = html.replace(/___CODEBLOCK_(\d+)___/g, (match, p1) => codeBlocks[parseInt(p1, 10)]);
 html = html.replace(/___INLINECODE_(\d+)___/g, (match, p1) => inlineCodes[parseInt(p1, 10)]);

 return html;
};

const DEFAULT_MARKDOWN = `# Welcome to Markdown Editor

This is a **live preview** markdown editor. You can use it to write and preview markdown in real time.

## Features
- Split-pane editor
- Live HTML preview
- Basic syntax highlighting
- Export to \`.md\` file

### Typography
You can use *italic*, **bold**, or \`inline code\`.

> Blockquotes are great for emphasizing quotes.

### Lists

Unordered list:
- Item 1
- Item 2
 - Subitem

Ordered list:
1. First step
2. Second step

### Code Block

\`\`\`javascript
function sayHello() {
 console.log("Hello, World!");
}
sayHello();
\`\`\`

---

[Visit Toolzium](https://toolzium.com) for more tools.`;

export default function MarkdownEditorClient() {
 const [markdown, setMarkdown] = useState(DEFAULT_MARKDOWN);
 const [htmlPreview, setHtmlPreview] = useState("");
 const [isFullscreen, setIsFullscreen] = useState(false);
 const [lineNumbers, setLineNumbers] = useState(true);
 const [wordWrap, setWordWrap] = useState(true);
 const [darkTheme, setDarkTheme] = useState(false);
 
 const textareaRef = useRef<HTMLTextAreaElement>(null);
 const lineNumbersRef = useRef<HTMLDivElement>(null);

 useEffect(() => {
 setHtmlPreview(parseMarkdown(markdown));
 }, [markdown]);

 const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
 setMarkdown(e.target.value);
 };

 const handleScroll = (e: UIEvent<HTMLTextAreaElement>) => {
 if (lineNumbersRef.current) {
 lineNumbersRef.current.scrollTop = e.currentTarget.scrollTop;
 }
 };

 const insertSyntax = (before: string, after: string ="", defaultText: string ="text") => {
 const textarea = textareaRef.current;
 if (!textarea) return;

 const start = textarea.selectionStart;
 const end = textarea.selectionEnd;
 const selectedText = textarea.value.substring(start, end);
 
 const textToInsert = selectedText || defaultText;
 const newValue = textarea.value.substring(0, start) + before + textToInsert + after + textarea.value.substring(end);
 
 setMarkdown(newValue);
 
 setTimeout(() => {
 textarea.focus();
 if (selectedText) {
 textarea.setSelectionRange(start, start + before.length + selectedText.length + after.length);
 } else {
 textarea.setSelectionRange(start + before.length, start + before.length + defaultText.length);
 }
 }, 0);
 };

 const downloadFile = () => {
 const blob = new Blob([markdown], { type:"text/markdown"});
 const url = URL.createObjectURL(blob);
 const a = document.createElement("a");
 a.href = url;
 a.download ="document.md";
 document.body.appendChild(a);
 a.click();
 document.body.removeChild(a);
 URL.revokeObjectURL(url);
 };

 const copyHtml = () => {
 navigator.clipboard.writeText(htmlPreview);
 };

 const lineCount = markdown.split("\n").length;
 const linesArray = Array.from({ length: Math.max(lineCount, 1) }, (_, i) => i + 1);

 // Stats
 const words = markdown.trim().split(/\s+/).filter(w => w.length > 0).length;
 const chars = markdown.length;
 const readingTime = Math.ceil(words / 200); // 200 WPM

 const editorBgClass = darkTheme ?"bg-[#0f172a] text-[#f8fafc] text-foreground":"bg-background text-foreground";
 const wrapClass = wordWrap ?"whitespace-pre-wrap":"whitespace-pre";

 return (
 <div className="max-w-6xl mx-auto space-y-8">
 <ToolPageHeader
 title="Markdown Editor"
 description="Write and preview Markdown in real time with export options and stats."
 icon={FileText}
 />

 <div className={"flex flex-col md:flex-row gap-8"+ (isFullscreen ?"fixed inset-0 z-50 bg-background p-4 md:p-8 m-0 max-w-none overflow-y-auto":"")}>
 <div className="flex-1 space-y-4 flex flex-col h-[70vh] min-h-[500px]">
 {/* Toolbar */}
 <GlassCard className="p-2 flex flex-wrap gap-1 shrink-0 items-center justify-between">
 <div className="flex flex-wrap gap-1 items-center">
 <Button variant="ghost"size="sm"onClick={() => insertSyntax("**","**","bold text")} title="Bold">
 <Bold className="h-4 w-4"/>
 </Button>
 <Button variant="ghost"size="sm"onClick={() => insertSyntax("*","*","italic text")} title="Italic">
 <Italic className="h-4 w-4"/>
 </Button>
 <Button variant="ghost"size="sm"onClick={() => insertSyntax("#","","Heading 1")} title="Heading 1">
 <Heading1 className="h-4 w-4"/>
 </Button>
 <Button variant="ghost"size="sm"onClick={() => insertSyntax("##","","Heading 2")} title="Heading 2">
 <Heading2 className="h-4 w-4"/>
 </Button>
 <Button variant="ghost"size="sm"onClick={() => insertSyntax("###","","Heading 3")} title="Heading 3">
 <Heading3 className="h-4 w-4"/>
 </Button>
 <Button variant="ghost"size="sm"onClick={() => insertSyntax("[","](url)","link text")} title="Link">
 <LinkIcon className="h-4 w-4"/>
 </Button>
 <Button variant="ghost"size="sm"onClick={() => insertSyntax("![","](url)","alt text")} title="Image">
 <ImageIcon className="h-4 w-4"/>
 </Button>
 <Button variant="ghost"size="sm"onClick={() => insertSyntax("`","`","code")} title="Inline Code">
 <Code className="h-4 w-4"/>
 </Button>
 <Button variant="ghost"size="sm"onClick={() => insertSyntax("```\n","\n```","code block")} title="Code Block">
 <Code className="h-4 w-4 text-primary"/>
 </Button>
 <Button variant="ghost"size="sm"onClick={() => insertSyntax("-","","list item")} title="Unordered List">
 <List className="h-4 w-4"/>
 </Button>
 <Button variant="ghost"size="sm"onClick={() => insertSyntax("1.","","list item")} title="Ordered List">
 <ListOrdered className="h-4 w-4"/>
 </Button>
 <Button variant="ghost"size="sm"onClick={() => insertSyntax(">","","quote")} title="Blockquote">
 <Quote className="h-4 w-4"/>
 </Button>
 <Button variant="ghost"size="sm"onClick={() => insertSyntax("---\n","","")} title="Horizontal Rule">
 <Minus className="h-4 w-4"/>
 </Button>
 </div>
 <div className="flex gap-1 items-center">
 <Button variant="ghost"size="sm"onClick={() => setIsFullscreen(!isFullscreen)} title={isFullscreen ?"Exit Fullscreen":"Fullscreen"}>
 {isFullscreen ? <Minimize className="h-4 w-4"/> : <Maximize className="h-4 w-4"/>}
 </Button>
 </div>
 </GlassCard>

 {/* Editor & Preview */}
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 min-h-0">
 {/* Left: Editor */}
 <GlassCard className="flex flex-col overflow-hidden p-0">
 <div className="bg-muted px-4 py-2 text-xs font-semibold text-muted-foreground border-b flex justify-between items-center">
 <span>MARKDOWN</span>
 <span>{chars} chars</span>
 </div>
 <div className="flex-1 flex min-h-0 relative">
 {lineNumbers && (
 <div className={"w-10 select-none py-3 text-right pr-2 text-xs font-mono text-muted-foreground border-r overflow-hidden shrink-0"+ editorBgClass}>
 {linesArray.map((_, i) => (
 <div key={i}>{i + 1}</div>
 ))}
 </div>
 )}
 <textarea
 ref={textareaRef}
 value={markdown}
 onChange={(e) => setMarkdown(e.target.value)}
 onScroll={handleScroll}
 placeholder="Type your markdown here..."
 className={"flex-1 p-3 font-mono text-sm resize-none focus:outline-none"+ editorBgClass +""+ wrapClass}
 />
 </div>
 </GlassCard>

 {/* Right: Preview */}
 <GlassCard className="flex flex-col overflow-hidden p-0">
 <div className="bg-muted px-4 py-2 text-xs font-semibold text-muted-foreground border-b flex justify-between items-center">
 <span>PREVIEW</span>
 </div>
 <div 
 className={"flex-1 p-4 overflow-y-auto prose dark:prose-invert max-w-none text-sm"+ (darkTheme ?"bg-[#0f172a] text-[#f8fafc] text-foreground":"bg-background text-foreground")}
 dangerouslySetInnerHTML={{ __html: htmlPreview }}
 />
 </GlassCard>
 </div>

 {/* Bottom Bar */}
 <GlassCard className="p-3 flex flex-wrap gap-4 items-center justify-between shrink-0 text-sm text-muted-foreground">
 <div className="flex gap-4">
 <span>{words} words</span>
 <span>{chars} chars</span>
 <span>{lineCount} lines</span>
 <span>~{readingTime} min read</span>
 </div>
 <div className="flex flex-wrap gap-2">
 <ActionButton
 icon={Trash2}
 label="Clear"
 onClick={() => setMarkdown("")}
 variant="destructive"
 />
 <ActionButton
 icon={Copy}
 label="Copy MD"
 onClick={() => navigator.clipboard.writeText(markdown)}
 />
 <ActionButton
 icon={Copy}
 label="Copy HTML"
 onClick={copyHtml}
 />
 <ActionButton
 icon={Download}
 label="Download"
 onClick={downloadFile}
 />
 </div>
 </GlassCard>
 </div>
 </div>
 
 {!isFullscreen && (
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <GlassCard>
 <CardContent className="p-6 space-y-4">
 <h3 className="font-semibold mb-4">Editor Settings</h3>
 <SwitchRow
 label="Line Numbers"
 hint="Show line numbers in the editor"
 checked={lineNumbers}
 onCheckedChange={setLineNumbers}
 />
 <SwitchRow
 label="Word Wrap"
 hint="Wrap long lines of text"
 checked={wordWrap}
 onCheckedChange={setWordWrap}
 />
 <SwitchRow
 label="Dark Editor Theme"
 hint="Use a dark background for the editor"
 checked={darkTheme}
 onCheckedChange={setDarkTheme}
 />
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardContent className="p-6">
 <h3 className="font-semibold mb-4">Markdown Stats</h3>
 <div className="grid grid-cols-2 gap-4">
 <Stat label="Words"value={words} />
 <Stat label="Characters"value={chars} />
 <Stat label="Lines"value={lineCount} />
 <Stat label="Read Time"value={readingTime +"min"} />
 </div>
 </CardContent>
 </GlassCard>
 </div>
 )}

 {/* SECTION 3: HOW IT WORKS */}
 <ToolHowItWorks
 steps={[
 {
 step:"01",
 title:"Write Markdown",
 description:"Type or paste Markdown in the left editor panel. Use headings (#), bold (**text**), links ([text](url)), tables, and code blocks with full GFM support.",
 icon: FileText,
 },
 {
 step:"02",
 title:"Preview in Real Time",
 description:"The right panel renders your Markdown into HTML instantly as you type. See exactly how it will look when published — no manual refresh needed.",
 icon: Eye,
 },
 {
 step:"03",
 title:"Export or Copy",
 description:"Copy the raw Markdown or the rendered HTML. Export as a .md file for GitHub, documentation platforms, blogs, or static site generators.",
 icon: BookOpen,
 },
 ]}
 badges={[
"Live preview",
"GFM syntax support",
"Export to .md",
 ]}
 />

 {/* SECTION 4: FEATURE GUIDES */}
 <ToolFeatureGuides
 features={[
 {
 icon: Eye,
 title:"Live Split Preview",
 description:"Side-by-side editor and preview panels update in real time. No switching between \"edit\"and \"preview\"modes — write and see the output simultaneously.",
 },
 {
 icon: Code2,
 title:"Syntax Highlighting",
 description:"Fenced code blocks (```language) render with syntax highlighting for dozens of languages — JavaScript, Python, SQL, Bash, JSON, YAML, and more.",
 },
 {
 icon: AlignLeft,
 title:"GFM Table Support",
 description:"GitHub Flavored Markdown tables render correctly with left/center/right column alignment controlled by colons in the separator row.",
 },
 {
 icon: FileText,
 title:"Toolbar Shortcuts",
 description:"Quick-insert toolbar buttons for Bold, Italic, Heading, Link, Image, Code Block, Table, and Horizontal Rule — no need to memorize syntax.",
 },
 {
 icon: Layers,
 title:"Full HTML Export",
 description:"Copy the rendered HTML output to use in email templates, static HTML pages, or CMS platforms that accept HTML but not Markdown directly.",
 },
 {
 icon: Shield,
 title:"Client-Side & Private",
 description:"All rendering runs in your browser. Your Markdown content never leaves your device — safe for writing internal documentation or proprietary content.",
 },
 ]}
 >
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <h3 className="text-lg font-semibold">Markdown Syntax Reference — Complete Cheatsheet</h3>
 <p>
 <strong>Markdown</strong> is a lightweight markup language created by John Gruber in 2004 to allow
 writing formatted text using plain text syntax. It is the native language of GitHub READMEs,
 documentation sites (Docusaurus, MkDocs), blogs (Jekyll, Hugo), and note-taking apps (Obsidian, Notion).
 </p>

 <h4 className="font-semibold">Core Markdown Syntax Reference</h4>
 <div className="overflow-x-auto">
 <table className="w-full border-collapse text-sm">
 <thead>
 <tr className="bg-muted/50">
 <th className="border p-2 text-left">Element</th>
 <th className="border p-2 text-left">Syntax</th>
 <th className="border p-2 text-left">Renders As</th>
 </tr>
 </thead>
 <tbody>
 {[
 ["Heading 1","# Heading","<h1>Heading</h1>"],
 ["Heading 2","## Heading","<h2>Heading</h2>"],
 ["Bold","**bold text**","<strong>bold text</strong>"],
 ["Italic","*italic* or _italic_","<em>italic</em>"],
 ["Inline code","`code`","<code>code</code>"],
 ["Code block","```js\\ncode\\n```","<pre><code class=js>..."],
 ["Link","[text](url)","<a href=url>text</a>"],
 ["Image","![alt](url)","<img alt=alt src=url>"],
 ["Blockquote","> quote","<blockquote>quote</blockquote>"],
 ["Unordered list","- item","<ul><li>item</li></ul>"],
 ["Ordered list","1. item","<ol><li>item</li></ol>"],
 ["Horizontal rule","--- or ***","<hr />"],
 ].map(([el, syn, ren]) => (
 <tr key={el} className="odd:bg-muted/20">
 <td className="border p-2 font-medium text-xs">{el}</td>
 <td className="border p-2 font-mono text-primary text-xs">{syn}</td>
 <td className="border p-2 font-mono text-muted-foreground text-xs">{ren}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>

 <h4 className="font-semibold">GitHub Flavored Markdown (GFM) Extensions</h4>
 <div className="overflow-x-auto">
 <table className="w-full border-collapse text-sm">
 <thead>
 <tr className="bg-muted/50">
 <th className="border p-2 text-left">Feature</th>
 <th className="border p-2 text-left">Syntax</th>
 <th className="border p-2 text-left">Support</th>
 </tr>
 </thead>
 <tbody>
 {[
 ["Tables","| col | col |\\n| --- | --- |","GitHub, GitLab, most MDX"],
 ["Task lists","- [x] Done\\n- [ ] Todo","GitHub, Obsidian, Linear"],
 ["Strikethrough","~~text~~","GitHub, Discord, Slack"],
 ["Footnotes","Text[^1]\\n[^1]: Note","GitHub, Pandoc, some SSGs"],
 ["Autolinks","https://example.com","Most GFM parsers"],
 ].map(([feat, syn, support]) => (
 <tr key={feat} className="odd:bg-muted/20">
 <td className="border p-2 font-medium text-xs">{feat}</td>
 <td className="border p-2 font-mono text-primary text-xs">{syn}</td>
 <td className="border p-2 text-muted-foreground text-xs">{support}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>

 <h4 className="font-semibold">Markdown vs Other Markup Languages</h4>
 <div className="overflow-x-auto">
 <table className="w-full border-collapse text-sm">
 <thead>
 <tr className="bg-muted/50">
 <th className="border p-2 text-left">Format</th>
 <th className="border p-2 text-left">Best For</th>
 <th className="border p-2 text-left">Learning Curve</th>
 </tr>
 </thead>
 <tbody>
 {[
 ["Markdown","README, docs, blogs, notes","Very easy — 5 min to basics"],
 ["HTML","Full web pages, email templates","Medium — many tags to learn"],
 ["AsciiDoc","Technical manuals, books","Medium — more features than MD"],
 ["reStructuredText","Python docs (Sphinx)","Medium — RST-specific syntax"],
 ["LaTeX","Academic papers, equations","Hard — complex but powerful"],
 ].map(([fmt, best, curve]) => (
 <tr key={fmt} className="odd:bg-muted/20">
 <td className="border p-2 font-medium text-xs">{fmt}</td>
 <td className="border p-2 text-muted-foreground text-xs">{best}</td>
 <td className="border p-2 text-xs">{curve}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </div>
 </ToolFeatureGuides>

 {/* SECTION 5: FAQ + RELATED TOOLS */}
 <ToolFaqAccordion
 faqs={[
 {
 question:"What Markdown features does this editor support?",
 answer:"The editor supports full GitHub Flavored Markdown (GFM): headings, bold, italic, links, images, tables, task lists, strikethrough, code blocks with syntax highlighting, blockquotes, ordered/unordered lists, horizontal rules, and footnotes.",
 },
 {
 question:"Can I export my Markdown as a file?",
 answer:"Yes. Use the Export button to download your Markdown as a .md file. You can also copy the raw Markdown text or the rendered HTML output using the copy buttons.",
 },
 {
 question:"Does this support syntax highlighting in code blocks?",
 answer:"Yes. Fenced code blocks with a language identifier (e.g., ```javascript) render with syntax highlighting. Supported languages include JavaScript, TypeScript, Python, SQL, Bash, JSON, YAML, HTML, CSS, and many more.",
 },
 {
 question:"How do I create a table in Markdown?",
 answer:"Use pipe characters to define columns and a separator row with dashes: | Header 1 | Header 2 | on the first line, | --- | --- | on the second line, then | Cell 1 | Cell 2 | for each row. Use :--- for left-align, :---: for center, ---: for right.",
 },
 {
 question:"Is my content saved anywhere?",
 answer:"Content is not automatically saved to a server. Your Markdown stays in your browser. Some editors persist content to localStorage for session recovery, but nothing is uploaded or stored externally.",
 },
 ]}
 />
 <RelatedTools currentToolUrl="/tools/dev/markdown-editor"max={6} />
 </div>
 );
}
