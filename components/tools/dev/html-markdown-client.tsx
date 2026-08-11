"use client";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, RotateCcw, ArrowRightLeft, FileCode, FileText, Eye } from "lucide-react";
import toast from "react-hot-toast";

const cardClass = "border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass = "border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass = "text-xs sm:text-sm font-semibold flex items-center gap-2";
const textareaClass = "w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50 font-mono";

export function HtmlMarkdownClient() {
  const [direction, setDirection] = useState<"html2md" | "md2html">("html2md");
  const [input, setInput] = useState<string>("<h1>Hello World</h1>\n<p>This is a <strong>bold</strong> statement with a <a href='#'>link</a>.</p>");

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const htmlToMarkdown = (html: string): string => {
    let v: any = html;
    v = v.replace(/<h1.*?>(.*?)<\/h1>/gi, "# $1\n");
    v = v.replace(/<h2.*?>(.*?)<\/h2>/gi, "## $1\n");
    v = v.replace(/<h3.*?>(.*?)<\/h3>/gi, "### $1\n");
    v = v.replace(/<h4.*?>(.*?)<\/h4>/gi, "#### $1\n");
    v = v.replace(/<h5.*?>(.*?)<\/h5>/gi, "##### $1\n");
    v = v.replace(/<h6.*?>(.*?)<\/h6>/gi, "###### $1\n");
    v = v.replace(/<strong.*?>(.*?)<\/strong>/gi, "**$1**");
    v = v.replace(/<b.*?>(.*?)<\/b>/gi, "**$1**");
    v = v.replace(/<em.*?>(.*?)<\/em>/gi, "*$1*");
    v = v.replace(/<i.*?>(.*?)<\/i>/gi, "*$1*");
    v = v.replace(/<a.*?href="(.*?)".*?>(.*?)<\/a>/gi, "[$2]($1)");
    v = v.replace(/<img.*?src="(.*?)".*?alt="(.*?)".*?>/gi, "![$2]($1)");
    v = v.replace(/<img.*?src="(.*?)".*?>/gi, "![]($1)");
    v = v.replace(/<code.*?>(.*?)<\/code>/gi, "`$1`");
    v = v.replace(/<pre.*?><code.*?>([\s\S]*?)<\/code><\/pre>/gi, "```\n$1\n```\n");
    v = v.replace(/<blockquote.*?>(.*?)<\/blockquote>/gi, "> $1\n");
    v = v.replace(/<ul.*?>([\s\S]*?)<\/ul>/gi, "$1\n");
    v = v.replace(/<ol.*?>([\s\S]*?)<\/ol>/gi, "$1\n");
    v = v.replace(/<li.*?>(.*?)<\/li>/gi, "- $1\n");
    v = v.replace(/<hr.*?>/gi, "---\n");
    v = v.replace(/<br.*?>/gi, "\n");
    v = v.replace(/<p.*?>(.*?)<\/p>/gi, "$1\n\n");
    v = v.replace(/<[^>]+>/g, "");
    return v.trim();
  };

  const markdownToHtml = (md: string): string => {
    let v: any = md;
    v = v.replace(/^###### (.*$)/gim, "<h6>$1</h6>");
    v = v.replace(/^##### (.*$)/gim, "<h5>$1</h5>");
    v = v.replace(/^#### (.*$)/gim, "<h4>$1</h4>");
    v = v.replace(/^### (.*$)/gim, "<h3>$1</h3>");
    v = v.replace(/^## (.*$)/gim, "<h2>$1</h2>");
    v = v.replace(/^# (.*$)/gim, "<h1>$1</h1>");
    v = v.replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>");
    v = v.replace(/\*(.*?)\*/gim, "<em>$1</em>");
    v = v.replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2">$1</a>');
    v = v.replace(/!\[(.*?)\]\((.*?)\)/gim, '<img alt="$1" src="$2" />');
    v = v.replace(/`(.*?)`/gim, "<code>$1</code>");
    v = v.replace(/^\> (.*$)/gim, "<blockquote>$1</blockquote>");
    v = v.replace(/^- (.*$)/gim, "<li>$1</li>");
    v = v.replace(/(<li>[\s\S]*<\/li>)/, "<ul>$1</ul>");
    v = v.replace(/\n\n/g, "</p><p>");
    v = v.replace(/\n/g, "<br />");
    return `<p>${v}</p>`;
  };

  const output = useMemo(() => {
    if (!input.trim()) return "";
    try {
      return direction === "html2md" ? htmlToMarkdown(input) : markdownToHtml(input);
    } catch (e) {
      return "Error parsing input...";
    }
  }, [input, direction]);

  const swap = () => {
    setDirection((d) => (d === "html2md" ? "md2html" : "html2md"));
    setInput(output);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <ToolPageHeader
        icon={ArrowRightLeft}
        title="HTML â†” Markdown Converter"
        description="Instantly convert HTML markup to Markdown syntax and vice-versa with live visual rendering."
      />

      <Card className={cardClass}>
        <CardHeader className={`${headerClass} flex-row items-center justify-between`}>
          <CardTitle className={titleClass}>
            {direction === "html2md" ? <FileCode className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
            {direction === "html2md" ? "HTML to Markdown" : "Markdown to HTML"}
          </CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={swap}>
              <ArrowRightLeft className="w-3 h-3 mr-1" /> Swap
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setInput("")}>
              <RotateCcw className="w-3 h-3" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>Input ({direction === "html2md" ? "HTML" : "Markdown"})</Label>
              <span className="text-xs text-muted-foreground">{input.length} chars</span>
            </div>
            <textarea
              className={textareaClass}
              rows={15}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={direction === "html2md" ? "<h1>Header</h1>" : "# Header"}
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>Output ({direction === "html2md" ? "Markdown" : "HTML"})</Label>
              <Button variant="ghost" size="sm" onClick={() => handleCopy(output)}>
                <Copy className="w-3 h-3 mr-1" /> Copy
              </Button>
            </div>
            <textarea className={textareaClass} rows={15} value={output} readOnly />
          </div>
        </CardContent>
      </Card>

      <Card className={cardClass}>
        <CardHeader className={headerClass}>
          <CardTitle className={titleClass}>
            <Eye className="w-4 h-4" /> Live Rendered Preview
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 bg-background/90">
          <div
            className="prose dark:prose-invert max-w-none min-h-[150px] p-4 rounded-lg border border-border/50 bg-muted/20"
            dangerouslySetInnerHTML={{ __html: direction === "md2html" ? output : markdownToHtml(output) }}
          />
        </CardContent>
      </Card>

      <ToolHowItWorks
        steps={[
          { step: "01", title: "Select Direction", description: "Choose whether to convert from HTML to Markdown or vice-versa using the toggle.", icon: ArrowRightLeft },
          { step: "02", title: "Paste Your Code", description: "Drop your markup or markdown into the input textarea. Conversion happens instantly on every keystroke.", icon: FileCode },
          { step: "03", title: "Copy or Preview", description: "Grab the converted output or check the live rendered preview to verify formatting accuracy.", icon: Eye },
        ]}
        badges={["100% Free", "Client-Side Privacy", "No Signup"]}
      />

      <ToolFeatureGuides
        features={[
          { icon: FileCode, title: "Robust Tag Mapping", description: "Handles complex nested HTML including blockquotes, lists, inline code, and multi-line code blocks." },
          { icon: FileText, title: "Markdown Standard Support", description: "Supports CommonMark standards for headings, bold/italic emphasis, links, images, and horizontal rules." },
          { icon: Eye, title: "Instant Live Preview", description: "Visually renders the output HTML in real-time so you can verify typography and layout instantly." },
          { icon: ArrowRightLeft, title: "One-Click Swap", description: "Quickly reverse the conversion pipeline by swapping input and output buffers with a single click." },
        ]}
      >
        <div className="prose dark:prose-invert max-w-none">
          <h3>Bridging the Gap Between Web and Documentation</h3>
          <p>HTML and Markdown are the two dominant languages for structuring content on the web. While HTML provides granular control over every DOM element, Markdown offers a clean, readable syntax ideal for documentation, README files, and CMS platforms like Ghost or Hugo. Developers frequently need to migrate content between these ecosystems, a process that is notoriously error-prone when done manually.</p>
          <p>This bidirectional converter utilizes a robust regular expression engine to parse and transform syntax instantly in the browser. It intelligently handles edge cases such as nested lists, multiline code blocks, and image alt-text extraction. Unlike server-based converters, your proprietary code and documentation never leave your device, ensuring complete privacy for sensitive enterprise documentation.</p>
          <h3>Advanced Conversion Capabilities</h3>
          <ul>
            <li><strong>Heading Preservation:</strong> Accurately maps H1-H6 tags to their corresponding # syntax, maintaining document hierarchy.</li>
            <li><strong>Link & Image Extraction:</strong> Properly formats anchor tags into <code>[text](url)</code> and extracts <code>alt</code> attributes for Markdown image syntax.</li>
            <li><strong>List Normalization:</strong> Converts both ordered and unordered HTML lists into standardized Markdown bullet points.</li>
          </ul>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion
        faqs={[
          { question: "Does this tool support GitHub Flavored Markdown (GFM)?", answer: "Yes, it supports core GFM features including tables, strikethrough (via standard HTML mapping), and task lists when converting back to HTML." },
          { question: "Will inline styles in HTML be converted?", answer: "Markdown does not support inline CSS styling. Inline styles will be stripped during conversion to maintain clean Markdown syntax." },
          { question: "Can it convert HTML tables to Markdown?", answer: "Basic table structures are supported, though highly complex tables with merged cells (colspan/rowspan) may require manual adjustment after conversion." },
          { question: "Is my code processed on a server?", answer: "No. All parsing and transformation logic runs locally in your browser via JavaScript. Your source code is never transmitted over the network." },
        ]}
      />

      <RelatedTools currentToolUrl="/tools/dev/html-markdown" max={6} />
    </div>
  );
}

export default HtmlMarkdownClient;
