"use client";

import React, { useState, useEffect } from "react";
import { FileCode, ArrowRightLeft, ClipboardPaste } from "lucide-react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { ActionButton, CopyButton, ResetButton, ExportTextButton } from "@/components/shared/action-buttons";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GlassCard } from "@/components/ui/glass-card";

export function HtmlMarkdownClient() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"html-to-md" | "md-to-html">("html-to-md");
  const [error, setError] = useState<string | null>(null);

  // Markdown to HTML conversion
  const mdToHtml = (md: string): string => {
    let html = md;
    
    // Escape HTML tags to prevent injection (basic)
    html = html.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    // Code blocks
    html = html.replace(/```([\s\S]*?)```/g, "<pre><code>$1</code></pre>");
    
    // Inline code
    html = html.replace(/`([^`]+)`/g, "<code>$1</code>");

    // Headings
    html = html.replace(/^###### (.*$)/gim, "<h6>$1</h6>");
    html = html.replace(/^##### (.*$)/gim, "<h5>$1</h5>");
    html = html.replace(/^#### (.*$)/gim, "<h4>$1</h4>");
    html = html.replace(/^### (.*$)/gim, "<h3>$1</h3>");
    html = html.replace(/^## (.*$)/gim, "<h2>$1</h2>");
    html = html.replace(/^# (.*$)/gim, "<h1>$1</h1>");

    // Blockquotes
    html = html.replace(/^> (.*$)/gim, "<blockquote>$1</blockquote>");

    // Horizontal Rules
    html = html.replace(/^(---|\*\*\*|___)$/gim, "<hr />");

    // Images
    html = html.replace(/!\[([^\]]+)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />');

    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

    // Bold
    html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/__([^_]+)__/g, "<strong>$1</strong>");

    // Italic
    html = html.replace(/\*([^*]+)\*/g, "<em>$1</em>");
    html = html.replace(/_([^_]+)_/g, "<em>$1</em>");

    // Unordered Lists
    html = html.replace(/^\s*\n\*/gm, "<ul>\n*");
    html = html.replace(/^(\*|\-|\+) (.*)$/gim, "<li>$2</li>");
    html = html.replace(/<\/li>\n<ul>/g, "<ul>");
    html = html.replace(/<\/li>\n(?!<li>|<ul|<ol)/g, "</li>\n</ul>\n");

    // Ordered Lists (simplified)
    html = html.replace(/^\d+\. (.*)$/gim, "<li>$1</li>");

    // Paragraphs
    html = html.split('\n\n').map(para => {
      if (para.trim() && !para.trim().match(/^(<h|<pre|<ul|<ol|<li|<blockquote|<hr|<table)/)) {
        return `<p>${para.replace(/\n/g, '<br />')}</p>`;
      }
      return para;
    }).join('\n\n');

    return html;
  };

  // HTML to Markdown conversion using DOM parser
  const htmlToMd = (htmlStr: string): string => {
    if (typeof window === 'undefined') return '';
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlStr, "text/html");
      let md = walkDOM(doc.body);
      return md.replace(/\n{3,}/g, '\n\n').trim();
    } catch (e) {
      console.error(e);
      return "Error parsing HTML";
    }
  };

  const walkDOM = (node: Node): string => {
    let result = "";
    
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent || "";
    }
    
    if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as HTMLElement;
      const tagName = el.tagName.toLowerCase();
      
      let innerText = "";
      for (const child of Array.from(el.childNodes)) {
        innerText += walkDOM(child);
      }
      
      switch (tagName) {
        case "h1": return `\n# ${innerText}\n\n`;
        case "h2": return `\n## ${innerText}\n\n`;
        case "h3": return `\n### ${innerText}\n\n`;
        case "h4": return `\n#### ${innerText}\n\n`;
        case "h5": return `\n##### ${innerText}\n\n`;
        case "h6": return `\n###### ${innerText}\n\n`;
        case "p": return `\n${innerText}\n\n`;
        case "strong":
        case "b": return `**${innerText}**`;
        case "em":
        case "i": return `*${innerText}*`;
        case "code": 
          if (el.parentNode?.nodeName.toLowerCase() === "pre") {
            return innerText;
          }
          return `\`${innerText}\``;
        case "pre": return `\n\`\`\`\n${innerText}\n\`\`\`\n\n`;
        case "blockquote": return `\n> ${innerText.split('\n').join('\n> ')}\n\n`;
        case "a": return `[${innerText}](${el.getAttribute("href") || ""})`;
        case "img": return `![${el.getAttribute("alt") || ""}](${el.getAttribute("src") || ""})`;
        case "ul": return `\n${innerText}\n`;
        case "ol": 
          let olItems = "";
          let idx = 1;
          for (const child of Array.from(el.childNodes)) {
            if (child.nodeName.toLowerCase() === "li") {
              olItems += `${idx}. ${walkDOM(child)}\n`;
              idx++;
            }
          }
          return `\n${olItems}\n`;
        case "li": 
          if (el.parentNode?.nodeName.toLowerCase() === "ul") {
            return `- ${innerText}\n`;
          }
          return innerText;
        case "br": return `\n`;
        case "hr": return `\n---\n\n`;
        case "div": return `\n${innerText}\n`;
        case "table": return `\n${innerText}\n`;
        case "tr": return `| ${innerText.replace(/\n/g, ' ')}\n`;
        case "td":
        case "th": return `${innerText} | `;
        default: return innerText;
      }
    }
    
    return result;
  };

  useEffect(() => {
    if (input.trim() === "") {
      setOutput("");
      return;
    }

    const timer = setTimeout(() => {
      try {
        setError(null);
        if (mode === "html-to-md") {
          setOutput(htmlToMd(input));
        } else {
          setOutput(mdToHtml(input));
        }
      } catch (err: any) {
        setError(err.message || "An error occurred during conversion.");
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [input, mode]);

  const toggleMode = () => {
    setMode((prev) => (prev === "html-to-md" ? "md-to-html" : "html-to-md"));
    setInput(output);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInput(text);
    } catch (err) {
      console.error("Failed to read clipboard text: ", err);
    }
  };

  const fileExtension = mode === "html-to-md" ? "md" : "html";

  return (
    <div className="space-y-6">
      <ToolPageHeader
        title="HTML to Markdown Converter"
        description="Convert HTML to Markdown and vice versa, with live preview and complete support for formatting."
        icon={FileCode}
      />

      <GlassCard>
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-lg font-medium flex items-center space-x-2">
            <span>{mode === "html-to-md" ? "HTML" : "Markdown"}</span>
            <button
              onClick={toggleMode}
              className="p-1 rounded-full hover:bg-secondary/50 transition-colors"
              title="Switch Conversion Direction"
            >
              <ArrowRightLeft className="h-5 w-5 text-muted-foreground" />
            </button>
            <span>{mode === "html-to-md" ? "Markdown" : "HTML"}</span>
          </CardTitle>
          <div className="flex space-x-2">
            <ActionButton
              onClick={handlePaste}
              icon={ClipboardPaste}
              label="Paste"
              variant="outline"
            />
            <ResetButton onClick={() => setInput("")} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium">Input</label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={mode === "html-to-md" ? "<h1>Hello World</h1>..." : "# Hello World..."}
                className="w-full min-h-[400px] p-4 rounded-md border bg-background font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">Output</label>
                <div className="flex space-x-2">
                  <CopyButton getText={() => output} />
                  <ExportTextButton 
                    getText={() => output} 
                    filename={`converted.${fileExtension}`} 
                  />
                </div>
              </div>
              <textarea
                value={output}
                readOnly
                placeholder="Result..."
                className="w-full min-h-[400px] p-4 rounded-md border bg-muted/50 font-mono text-sm resize-y focus:outline-none"
              />
            </div>
          </div>
          {error && <p className="text-destructive text-sm mt-2">{error}</p>}
        </CardContent>
      </GlassCard>
    </div>
  );
}
