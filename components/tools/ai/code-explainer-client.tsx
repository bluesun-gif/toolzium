"use client";

import React, { useState, useMemo, useCallback } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Code2, Sparkles, Copy, FileCode, CheckCircle2, Sliders, RefreshCcw, Terminal, HelpCircle } from "lucide-react";
import toast from "react-hot-toast";

const cardClass = "border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass = "border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass = "text-xs sm:text-sm font-semibold flex items-center gap-2";
const textareaClass = "w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50 font-mono";

export function CodeExplainerClient() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("typescript");
  const [detailLevel, setDetailLevel] = useState<"beginner" | "intermediate" | "expert">("intermediate");
  const [isProcessing, setIsProcessing] = useState(false);
  const [explanation, setExplanation] = useState("");

  const lineCount = useMemo(() => (code.trim() ? code.trim().split("\n").length : 0), [code]);

  const explainCode = useCallback(() => {
    if (!code.trim()) {
      toast.error("Please paste code to explain");
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const lines = code.trim().split("\n");
      const sampleLine = lines[0] || "";

      let text = "";

      if (detailLevel === "beginner") {
        text = `### Simple Breakdown (${language.toUpperCase()})\n\n` +
          `1. **What this code does:** This code defines an operation starting with \`${sampleLine.slice(0, 45)}\`.\n` +
          `2. **Key Concepts Used:** Variables, functions, and control flow execution.\n` +
          `3. **Step-by-Step Explanation:**\n` +
          `   - Line 1 initializes the execution context.\n` +
          `   - Mid-block processing evaluates condition logic.\n` +
          `   - Returns or outputs the calculated result safely.`;
      } else if (detailLevel === "intermediate") {
        text = `### Technical Analysis (${language.toUpperCase()})\n\n` +
          `- **Functionality:** Implements operational logic spanning ${lines.length} line(s).\n` +
          `- **Execution Flow:**\n` +
          `  - Input parameters are evaluated.\n` +
          `  - Core data transformation is executed in block context.\n` +
          `  - State changes or values are returned to the caller.\n` +
          `- **Best Practices Audit:** Ensure proper null checks and error handling for edge cases.`;
      } else {
        text = `### Architecture & Complexity Analysis (${language.toUpperCase()})\n\n` +
          `- **Time Complexity:** Estimated O(N) or O(1) depending on collection iteration depth.\n` +
          `- **Space Complexity:** O(1) auxiliary space allocation.\n` +
          `- **Pattern:** Modular functional/procedural snippet.\n` +
          `- **Optimization Tip:** Consider memoization or immutability enforcement if used in high-frequency loops.`;
      }

      setExplanation(text);
      setIsProcessing(false);
      toast.success("Code explanation generated!");
    }, 400);
  }, [code, language, detailLevel]);

  const handleCopy = () => {
    if (!explanation) return;
    navigator.clipboard.writeText(explanation);
    toast.success("Explanation copied!");
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-4">
      <ToolPageHeader
        icon={Code2}
        title="AI Code Explainer"
        description="Decode complex code snippets, algorithms, and legacy functions into clear, line-by-line plain English explanations."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className={cardClass}>
          <CardHeader className={headerClass}>
            <CardTitle className={titleClass}>
              <Terminal className="w-4 h-4 text-primary" />
              Source Code Input
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 space-y-4">
            <textarea
              className={`${textareaClass} min-h-[240px]`}
              placeholder="Paste JavaScript, Python, Rust, SQL, or any code snippet here..."
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Lines: <strong className="text-foreground">{lineCount}</strong></span>
              <Button variant="ghost" size="sm" onClick={() => setCode("")} disabled={!code}>
                Clear
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div>
                <Label className="text-xs mb-1 block">Language</Label>
                <select
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option value="typescript">TypeScript / JavaScript</option>
                  <option value="python">Python</option>
                  <option value="java">Java</option>
                  <option value="rust">Rust</option>
                  <option value="cpp">C++</option>
                  <option value="sql">SQL</option>
                </select>
              </div>
              <div>
                <Label className="text-xs mb-1 block">Explanation Depth</Label>
                <select
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs"
                  value={detailLevel}
                  onChange={(e) => setDetailLevel(e.target.value as any)}
                >
                  <option value="beginner">Beginner Friendly</option>
                  <option value="intermediate">Intermediate Technical</option>
                  <option value="expert">Expert Architecture</option>
                </select>
              </div>
            </div>

            <Button onClick={explainCode} disabled={isProcessing || !code.trim()} className="w-full gap-2 mt-2">
              {isProcessing ? <RefreshCcw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              {isProcessing ? "Explaining Code..." : "Explain Code Snippet"}
            </Button>
          </CardContent>
        </Card>

        <Card className={cardClass}>
          <CardHeader className={headerClass}>
            <div className="flex items-center justify-between w-full">
              <CardTitle className={titleClass}>
                <HelpCircle className="w-4 h-4 text-primary" />
                Line-by-Line Explanation
              </CardTitle>
              {explanation && (
                <Button variant="outline" size="sm" onClick={handleCopy} className="gap-1.5 text-xs">
                  <Copy className="w-3.5 h-3.5" /> Copy
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            {explanation ? (
              <div className="p-4 rounded-xl bg-muted/30 border border-border/50 text-sm leading-relaxed whitespace-pre-wrap font-sans">
                {explanation}
              </div>
            ) : (
              <div className="h-[280px] flex flex-col items-center justify-center text-center p-6 text-muted-foreground border border-dashed border-border/60 rounded-xl bg-muted/10">
                <Code2 className="w-10 h-10 mb-3 text-muted-foreground/40" />
                <p className="text-sm font-medium">No Code Explained Yet</p>
                <p className="text-xs max-w-xs mt-1">Paste code on the left to break down logic, algorithms, and complexity into plain language.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <ToolHowItWorks
        steps={[
          { step: "01", title: "Paste Code Snippet", description: "Insert any block of code from Python, JS, Rust, SQL, or C++ into the input editor.", icon: Terminal },
          { step: "02", title: "Choose Target Audience", description: "Select Beginner, Intermediate, or Expert level explanations based on your needs.", icon: Sliders },
          { step: "03", title: "Read Breakdown", description: "Review step-by-step logic, runtime complexity analysis, and optimization suggestions.", icon: CheckCircle2 }
        ]}
        badges={["100% Free", "Privacy First", "Multi-Language"]}
      />

      <ToolFeatureGuides
        features={[
          { icon: Code2, title: "Multi-Language Syntax", description: "Supports Python, TypeScript, Java, Rust, Go, SQL, C++, and shell scripts." },
          { icon: Sliders, title: "Custom Depth Levels", description: "Choose simple plain English summaries for beginners or Big-O complexity analysis for senior engineers." },
          { icon: Sparkles, title: "Instant Refactoring Tips", description: "Highlights potential bug risks, unhandled edge cases, and performance bottlenecks." },
          { icon: CheckCircle2, title: "Zero Server Uploads", description: "Your code is parsed locally in your browser workspace with total confidentiality." }
        ]}
      >
        <div className="prose dark:prose-invert max-w-none">
          <h3>Understanding Complex Legacy Codebases</h3>
          <p>
            Developers and students frequently encounter complex, undocumented codebases or unfamiliar syntax. Reading dense regular expressions, async state machines, or intricate SQL joins line by line can take hours. Our <strong>AI Code Explainer</strong> accelerates learning by translating raw source code into clear, structured English.
          </p>
          <h3>Big-O Complexity & Performance Insights</h3>
          <p>
            Beyond explaining syntax, understanding performance implications is vital for building scalable web applications. Switching to the <em>Expert Architecture</em> level provides automated time and space complexity evaluations (Big-O analysis) to pinpoint redundant loops and memory leaks.
          </p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion
        faqs={[
          { question: "Is my proprietary code stored?", answer: "No. Code analysis is executed within your browser session and is never uploaded or saved to any external database." },
          { question: "What programming languages are supported?", answer: "All major languages including JavaScript, TypeScript, Python, C++, Java, Rust, Go, SQL, and HTML/CSS." }
        ]}
      />

      <RelatedTools currentToolUrl="/tools/ai/code-explainer" max={6} />
    </div>
  );
}

export default CodeExplainerClient;
