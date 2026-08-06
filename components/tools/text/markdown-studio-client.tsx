"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";
import { FileText, Copy, Check, Download, Eye, Edit3, Sparkles } from "lucide-react";

const INITIAL_MARKDOWN = `# Welcome to Toolzium Markdown Studio\n\nWrite, format, and preview **Markdown** documents in real-time with instant word counts and live rendering.\n\n## Core Features:\n- 🚀 **Real-time Live Preview**\n- 📝 **Word & Character Stats**\n- 💾 **1-Click Markdown & HTML Export**\n\n> "Simplicity is the ultimate sophistication." — Leonardo da Vinci\n\n\`\`\`ts\nfunction helloWorld() {\n  console.log("Hello from Toolzium Studio!");\n}\n\`\`\``;

export default function MarkdownStudioClient() {
  const [markdown, setMarkdown] = useState<string>(INITIAL_MARKDOWN);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const wordCount = markdown.trim() ? markdown.trim().split(/\s+/).length : 0;
  const charCount = markdown.length;
  const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

  const renderSimpleHtml = (md: string) => {
    return md
      .replace(/^### (.*$)/gim, '<h3 class="text-sm font-bold text-foreground mt-3 mb-1">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-base font-bold text-foreground mt-4 mb-1.5 border-b pb-1">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-lg font-bold text-primary mb-2">$1</h1>')
      .replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-primary pl-3 italic my-2 text-muted-foreground">$1</blockquote>')
      .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*)\*/gim, '<em>$1</em>')
      .replace(/\n\n/g, '<br/><br/>');
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(label);
    toast.success(`Copied ${label} to clipboard!`);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const handleDownloadMd = () => {
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "document.md";
    a.click();
    toast.success("Downloaded document.md!");
  };

  return (
    <div className="mx-auto max-w-6xl px-2 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6 max-w-full overflow-hidden">
      <ToolPageHeader
        title="Interactive Markdown Editor & Live Preview Studio"
        description="Write, format, and render Markdown documents in real-time with live HTML preview, reading time statistics, and 1-click export."
      />

      {/* SINGLE VIEWPORT MARKDOWN STUDIO WORKSPACE */}
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-12 min-h-[500px] max-w-full">
        {/* Left Column: Markdown Input (6 Cols) */}
        <div className="lg:col-span-6 flex flex-col max-w-full min-w-0">
          <Card className="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl flex-1 flex flex-col justify-between overflow-hidden max-w-full min-w-0">
            <CardHeader className="border-b border-border/40 bg-muted/20 p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xs sm:text-sm font-semibold flex items-center gap-2 tracking-tight">
                  <Edit3 className="h-4 w-4 text-primary shrink-0" />
                  Markdown Input Editor
                </CardTitle>
                <div className="flex items-center gap-2 text-[11px] text-muted-foreground shrink-0">
                  <span>{wordCount} Words</span> • <span>{readingTimeMinutes} Min Read</span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-3 sm:p-4 space-y-3 flex-1 flex flex-col justify-between max-w-full min-w-0">
              <Textarea
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                placeholder="Type your markdown here..."
                className="font-mono text-xs flex-1 min-h-[300px] bg-muted/20 resize-none p-3 rounded-xl max-w-full min-w-0"
              />

              <div className="flex items-center gap-2 pt-1">
                <Button
                  onClick={handleDownloadMd}
                  size="sm"
                  variant="outline"
                  className="w-full gap-1.5 text-xs rounded-xl font-semibold h-9"
                >
                  <Download className="h-3.5 w-3.5" /> Download .md
                </Button>
                <Button
                  onClick={() => handleCopy(markdown, "Raw Markdown")}
                  size="sm"
                  className="w-full gap-1.5 text-xs rounded-xl font-semibold h-9"
                >
                  {copiedSection === "Raw Markdown" ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  {copiedSection === "Raw Markdown" ? "Copied" : "Copy Markdown"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Live HTML Render (6 Cols) */}
        <div className="lg:col-span-6 flex flex-col max-w-full min-w-0">
          <Card className="border border-primary/30 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl flex-1 flex flex-col justify-between overflow-hidden max-w-full min-w-0">
            <CardHeader className="border-b border-border/40 bg-muted/20 p-3 sm:p-4">
              <div className="flex items-center justify-between gap-2 max-w-full min-w-0">
                <CardTitle className="text-xs sm:text-sm font-semibold flex items-center gap-2 text-primary tracking-tight truncate min-w-0">
                  <Eye className="h-4 w-4 shrink-0" />
                  <span>Live Rendered Preview</span>
                </CardTitle>
                <Badge variant="outline" className="text-[10px] text-emerald-500 border-emerald-500/30 shrink-0">
                  Live HTML
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="p-3 sm:p-4 flex-1 flex flex-col justify-between max-w-full min-w-0 overflow-hidden">
              <div
                className="p-3.5 rounded-xl border bg-background text-xs leading-relaxed text-foreground max-w-full min-w-0 overflow-y-auto max-h-[360px] flex-1 break-words"
                dangerouslySetInnerHTML={{ __html: renderSimpleHtml(markdown) }}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
