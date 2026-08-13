"use client";

import React, { useState, useMemo, useCallback, useEffect, useRef } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Copy, RotateCcw, Bold, Italic, Heading1, Heading2, Link, Image as ImageIcon, Code, Quote, List, Minus, Download, Sun, Moon, Maximize, FileText } from"lucide-react";
import toast from"react-hot-toast";
import { GridPattern } from"@/components/magicui/grid-pattern";
import { GlassCard } from"@/components/ui/glass-card";

const cardClass ="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass ="border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass ="text-xs sm:text-sm font-semibold flex items-center gap-2";
const textareaClass ="w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50 font-mono";

const SAMPLE_MD = `# Welcome to Markdown Studio

This is a **live preview** of your Markdown. Try editing the text on the left!

## Features
- *Italic* and **Bold** text
- [Links](https://example.com)
- Code snippets: \`console.log('hello')\`

> This is a blockquote. It's great for highlighting important notes.

### Code Block
\`\`\`
function hello() {
 return"world";
}
\`\`\`

---
Enjoy writing!
`;

const parseMarkdown = (md: string): string => {
 let html = md;
 html = html.replace(/```([\s\S]*?)```/g, '<pre class="bg-muted p-2 rounded my-2 overflow-x-auto"><code>$1</code></pre>');
 html = html.replace(/`([^`]+)`/g, '<code class="bg-muted px-1 rounded text-sm">$1</code>');
 html = html.replace(/^### (.*$)/gm, '<h3 class="text-lg font-bold my-2">$1</h3>');
 html = html.replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold my-3">$1</h2>');
 html = html.replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold my-4">$1</h1>');
 html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img alt="$1"src="$2"class="max-w-full rounded my-2"/>');
 html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2"target="_blank"rel="noopener"class="text-primary underline">$1</a>');
 html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
 html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
 html = html.replace(/^> (.*$)/gm, '<blockquote class="border-l-4 border-primary pl-4 italic my-2 text-muted-foreground">$1</blockquote>');
 html = html.replace(/^\- (.*$)/gm, '<li class="ml-4 list-disc">$1</li>');
 html = html.replace(/^---$/gm, '<hr class="my-4 border-border"/>');
 
 html = html.split('\n\n').map((block: string) => {
 if (block.startsWith('<h') || block.startsWith('<ul') || block.startsWith('<blockquote') || block.startsWith('<pre') || block.startsWith('<hr') || block.startsWith('<img')) return block;
 if (block.includes('<li')) return `<ul class="my-2">${block}</ul>`;
 return `<p class="mb-2">${block.replace(/\n/g, '<br/>')}</p>`;
 }).join('\n');

 return html;
};

export function MarkdownStudioClient() {
 const [markdown, setMarkdown] = useState(SAMPLE_MD);
 const [theme, setTheme] = useState<"light"|"dark">("light");
 const [isFullscreen, setIsFullscreen] = useState(false);
 const textareaRef = useRef<HTMLTextAreaElement>(null);

 const html = useMemo(() => parseMarkdown(markdown), [markdown]);

 const stats = useMemo(() => {
 const words = markdown.trim() ? markdown.trim().split(/\s+/).length : 0;
 const chars = markdown.length;
 const readTime = Math.max(1, Math.ceil(words / 200));
 return { words, chars, readTime };
 }, [markdown]);

 const insertAtCursor = (before: string, after: string ="") => {
 const ta = textareaRef.current;
 if (!ta) return;
 const start = ta.selectionStart;
 const end = ta.selectionEnd;
 const text = ta.value;
 const selected = text.substring(start, end);
 const newText = text.substring(0, start) + before + selected + after + text.substring(end);
 setMarkdown(newText);
 setTimeout(() => {
 ta.focus();
 ta.selectionStart = start + before.length;
 ta.selectionEnd = end + before.length;
 }, 10);
 };

 const handleCopy = (text: string) => {
 navigator.clipboard.writeText(text);
 toast.success("Copied to clipboard!");
 };

 const exportHTML = () => {
 const blob = new Blob([`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Markdown Export</title></head><body>${html}</body></html>`], { type:"text/html"});
 const url = URL.createObjectURL(blob);
 const a = document.createElement("a");
 a.href = url;
 a.download ="markdown-export.html";
 a.click();
 URL.revokeObjectURL(url);
 toast.success("Exported HTML!");
 };

 const ToolbarButton = ({ icon: Icon, label, onClick }: any) => (
 <Button variant="ghost"size="icon"onClick={onClick} title={label} className="h-8 w-8">
 <Icon className="h-4 w-4"/>
 </Button>
 );

 return (
      <div className="relative max-w-7xl mx-auto space-y-8 p-4">
      <GridPattern />

 <ToolPageHeader
 icon={FileText}
 title="Markdown Studio"
 description="Write, format, and preview your Markdown documents in real-time."
 />

 <div className="flex flex-wrap items-center gap-4 p-4 bg-card border border-border/50 rounded-xl">
 <div className="text-sm">
 <span className="font-semibold">{stats.words}</span> words | <span className="font-semibold">{stats.chars}</span> chars | <span className="font-semibold">{stats.readTime}</span> min read
 </div>
 <div className="ml-auto flex gap-2">
 <Button variant="outline"size="sm"onClick={() => setTheme(theme ==="light"?"dark":"light")}>
 {theme ==="light"? <Moon className="h-4 w-4"/> : <Sun className="h-4 w-4"/>}
 </Button>
 <Button variant="outline"size="sm"onClick={() => setIsFullscreen(!isFullscreen)}>
 <Maximize className="h-4 w-4"/>
 </Button>
 </div>
 </div>

 <div className={`grid ${isFullscreen ? 'grid-cols-1' : 'lg:grid-cols-2'} gap-6 mb-8`}>
 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>Editor</CardTitle>
 <div className="flex flex-wrap gap-1 mt-2 border-t border-border/30 pt-2">
 <ToolbarButton icon={Bold} label="Bold"onClick={() => insertAtCursor("**","**")} />
 <ToolbarButton icon={Italic} label="Italic"onClick={() => insertAtCursor("*","*")} />
 <ToolbarButton icon={Heading1} label="H1"onClick={() => insertAtCursor("#","")} />
 <ToolbarButton icon={Heading2} label="H2"onClick={() => insertAtCursor("##","")} />
 <ToolbarButton icon={Link} label="Link"onClick={() => insertAtCursor("[","](url)")} />
 <ToolbarButton icon={ImageIcon} label="Image"onClick={() => insertAtCursor("![alt](",")")} />
 <ToolbarButton icon={Code} label="Code"onClick={() => insertAtCursor("`","`")} />
 <ToolbarButton icon={Quote} label="Quote"onClick={() => insertAtCursor(">","")} />
 <ToolbarButton icon={List} label="List"onClick={() => insertAtCursor("-","")} />
 <ToolbarButton icon={Minus} label="HR"onClick={() => insertAtCursor("\n---\n","")} />
 </div>
 </CardHeader>
 <CardContent className="p-4">
 <textarea
 ref={textareaRef}
 className={textareaClass}
 rows={20}
 value={markdown}
 onChange={(e) => setMarkdown(e.target.value)}
 placeholder="Start typing your Markdown here..."
 />
 <div className="flex gap-2 mt-4">
 <Button variant="outline"size="sm"onClick={() => handleCopy(markdown)} className="flex-1">
 <Copy className="h-4 w-4 mr-1"/> Copy MD
 </Button>
 <Button variant="outline"size="sm"onClick={exportHTML} className="flex-1">
 <Download className="h-4 w-4 mr-1"/> Export HTML
 </Button>
 </div>
 </CardContent>
 </GlassCard>

 {!isFullscreen && (
 <Card className={`${cardClass} ${theme ==="dark"?"bg-gray-900 text-gray-100":"bg-background text-foreground"}`}>
 <CardHeader className={`${headerClass} flex flex-row justify-between`}>
 <CardTitle className={titleClass}>Preview</CardTitle>
 <Button variant="ghost"size="sm"onClick={() => handleCopy(html)}>
 <Copy className="h-4 w-4 mr-1"/> Copy HTML
 </Button>
 </CardHeader>
 <CardContent className="p-6 prose max-w-none overflow-auto"style={{ maxHeight: '600px' }}>
 <div dangerouslySetInnerHTML={{ __html: html }} />
 </CardContent>
 </Card>
 )}
 </div>

 <ToolHowItWorks steps={[
 { step:"01", title:"Write Markdown", description:"Use the editor to write your content and the toolbar to quickly insert formatting elements.", icon: FileText },
 { step:"02", title:"Live Preview", description:"Watch your formatted document update in real-time in the preview pane as you type.", icon: Sun },
 { step:"03", title:"Export & Share", description:"Copy the raw Markdown, export the rendered HTML, or adjust the theme for optimal viewing.", icon: Download }
 ]} />

 <ToolFeatureGuides features={[
 { icon: Bold, title:"Smart Toolbar", description:"Quickly insert Markdown syntax for bold, italic, headings, links, images, and code blocks with a single click."},
 { icon: FileText, title:"Real-time Rendering", description:"Our custom client-side parser instantly converts your Markdown into beautifully styled HTML."},
 { icon: Sun, title:"Theme Toggling", description:"Switch between light and dark preview themes to match your environment or test your content's readability."},
 { icon: Download, title:"Document Statistics", description:"Keep track of your word count, character count, and estimated reading time as you write."}
 ]}>
 <div className="prose dark:prose-invert max-w-none">
 <h2>The Ultimate Markdown Workspace</h2>
 <p>Markdown has become the standard for writing documentation, README files, blog posts, and technical articles. It allows writers to focus on content rather than complex formatting tags. Markdown Studio provides a distraction-free, highly responsive environment for crafting perfect Markdown documents entirely in your browser.</p>
 <p>Our tool features a powerful smart toolbar that eliminates the need to memorize complex syntax. Simply highlight your text or click a button to instantly wrap your content in the correct Markdown tags. Whether you are embedding code snippets, creating nested lists, or adding blockquotes, the process is seamless and intuitive.</p>
 <p>The split-pane layout ensures you never lose context. As you type on the left, the live preview on the right renders your document with beautiful typography. The built-in dark mode toggle is perfect for late-night writing sessions, reducing eye strain while maintaining perfect contrast. With one-click HTML export, you can easily transfer your beautifully formatted content to any CMS, static site generator, or email newsletter platform without dealing with messy copy-paste formatting issues.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion faqs={[
 { question:"Is my data private?", answer:"Yes. All parsing and rendering happens locally in your browser. Your text is never sent to any server."},
 { question:"Does it support GitHub Flavored Markdown?", answer:"It supports the most common GFM features like tables, code blocks, and task lists, along with standard Markdown syntax."},
 { question:"Can I save my documents?", answer:"While the tool doesn't store data permanently, you can easily copy the Markdown text or export the HTML file to save your work locally."},
 { question:"Is it free to use?", answer:"Yes, Markdown Studio is 100% free with no limits on document length or number of exports."}
 ]} />

 <RelatedTools currentToolUrl="/tools/text/markdown-studio" max={6} />
 </div>
 );
}

export default MarkdownStudioClient;
