"use client";

import React, { useState, useMemo } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CopyButton } from "@/components/shared/action-buttons";
import toast from "react-hot-toast";
import { FileCode, Eye, Code, Zap } from "lucide-react";

const cardClass = "border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass = "border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass = "text-xs sm:text-sm font-semibold flex items-center gap-2";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function markdownToHtml(md: string): string {
  const lines = md.split("\n");
  const htmlLines: string[] = [];
  let inList = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (/^\s*-\s+/.test(line)) {
      if (!inList) {
        htmlLines.push("<ul>");
        inList = true;
      }
      const content = line.replace(/^\s*-\s+/, "");
      htmlLines.push(`<li>${inlineFormat(content)}</li>`);
      continue;
    }

    if (inList) {
      htmlLines.push("</ul>");
      inList = false;
    }

    if (/^###\s+/.test(line)) {
      htmlLines.push(`<h3>${inlineFormat(line.replace(/^###\s+/, ""))}</h3>`);
    } else if (/^##\s+/.test(line)) {
      htmlLines.push(`<h2>${inlineFormat(line.replace(/^##\s+/, ""))}</h2>`);
    } else if (/^#\s+/.test(line)) {
      htmlLines.push(`<h1>${inlineFormat(line.replace(/^#\s+/, ""))}</h1>`);
    } else if (line.trim() === "") {
      htmlLines.push("");
    } else {
      htmlLines.push(`<p>${inlineFormat(line)}</p>`);
    }
  }

  if (inList) htmlLines.push("</ul>");

  return htmlLines.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

function inlineFormat(text: string): string {
  let out = escapeHtml(text);
  out = out.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/\*(.+?)\*/g, "<em>$1</em>");
  out = out.replace(/`([^`]+)`/g, "<code>$1</code>");
  out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  return out;
}

export default function MarkdownHtmlClient() {
  const [input, setInput] = useState(
    "# Welcome\n\nThis is a **bold** statement with *italic* emphasis.\n\n## Features\n\n- Convert markdown to HTML\n- Supports `inline code`\n- Visit [Toolzium](https://toolzium.com)\n\n### Enjoy!"
  );

  const html = useMemo(() => markdownToHtml(input), [input]);

  return (
    <div className="max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6">
      <ToolPageHeader
        icon={FileCode}
        title="Markdown to HTML Converter"
        description="Convert Markdown syntax to clean HTML with live preview. No external libraries required."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className={cardClass}>
          <CardHeader className={headerClass}>
            <CardTitle className={titleClass}>
              <Code className="w-4 h-4 text-primary" /> Markdown Input
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 space-y-3">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={14}
              className="w-full rounded-lg border border-border/70 bg-background/80 p-3 font-mono text-sm outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="# Heading&#10;&#10;**bold** and *italic*"
            />
            <div className="text-xs text-muted-foreground">{input.length} characters</div>
          </CardContent>
        </Card>

        <Card className={cardClass}>
          <CardHeader className={headerClass}>
            <CardTitle className={titleClass}>
              <Eye className="w-4 h-4 text-primary" /> Live HTML Preview
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 space-y-3">
            <div
              className="prose prose-sm dark:prose-invert max-h-80 overflow-y-auto rounded-lg border border-border/60 bg-background/60 p-4"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </CardContent>
        </Card>
      </div>

      <Card className={cardClass}>
        <CardHeader className={headerClass}>
          <CardTitle className={titleClass}>
            <FileCode className="w-4 h-4 text-primary" /> Generated HTML Source
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 sm:p-4 space-y-3">
          <pre className="max-h-64 overflow-auto rounded-lg border border-border/60 bg-muted/30 p-3 font-mono text-xs whitespace-pre-wrap">
            {html}
          </pre>
          <CopyButton getText={() => html} label="Copy HTML" />
        </CardContent>
      </Card>

      <ToolHowItWorks
        steps={[
          { step: "01", title: "Write Markdown", description: "Type or paste any markdown text into the input area.", icon: Code },
          { step: "02", title: "See Live HTML", description: "The converter parses headings, lists, bold, italic, code, and links instantly.", icon: Eye },
          { step: "03", title: "Copy the Source", description: "Copy the generated HTML and paste it into your website, email, or CMS.", icon: FileCode },
        ]}
        badges={["100% Free", "Client-Side", "No Signup"]}
      />

      <ToolFeatureGuides
        features={[
          { icon: FileCode, title: "Headings & Lists", description: "Supports H1, H2, H3 headings and unordered lists using the dash syntax." },
          { icon: Code, title: "Inline Formatting", description: "Converts **bold**, *italic*, `code`, and [link](url) syntax into proper HTML." },
          { icon: Eye, title: "Live Preview", description: "See the rendered HTML alongside the raw source so you can verify output immediately." },
          { icon: Zap, title: "No Dependencies", description: "Runs entirely with native JavaScript — no external markdown libraries required." },
        ]}
      >
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
          <p>Markdown was created by John Gruber in 2004 as a lightweight markup language that is easy to write and easy to read in its raw form. It has since become the default authoring format for technical documentation, README files, blog posts, and notes in tools like GitHub, Obsidian, Notion, and countless static site generators. Most publishing pipelines eventually need to convert Markdown into HTML for rendering in browsers.</p>
          <p>This converter implements a focused subset of the Markdown specification: headings (H1–H3), unordered lists, bold and italic emphasis, inline code spans, and standard link syntax. It first escapes any HTML in the input to prevent injection, then applies regex-based transformations for each syntax element. Lists are handled line by line, wrapping consecutive list items in <code>&lt;ul&gt;</code> tags automatically.</p>
          <p>For production use cases where you need full CommonMark compliance — including tables, blockquotes, fenced code blocks with language hints, and footnotes — consider a dedicated library like <code>marked</code> or <code>markdown-it</code>. This tool is ideal for quick conversions, small snippets, emails, and situations where keeping the dependency footprint small matters more than exhaustive syntax support.</p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion
        faqs={[
          { question: "Is this converter safe against XSS?", answer: "Yes. The input is HTML-escaped before any transformations are applied, so injected tags cannot break out of the rendered output." },
          { question: "Does it support tables or blockquotes?", answer: "This converter focuses on core syntax. Tables, blockquotes, and fenced code blocks are not supported. Use a full CommonMark library for those." },
          { question: "Can I use this in production?", answer: "Absolutely, for small snippets and controlled inputs. For full user-generated content, combine it with a sanitizer like DOMPurify." },
        ]}
      />

      <RelatedTools currentToolUrl="/tools/developer/markdown-html" max={6} />
    </div>
  );
}
