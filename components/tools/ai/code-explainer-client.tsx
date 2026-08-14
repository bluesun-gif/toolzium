"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { ModelSelector } from "@/components/shared/model-selector";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { cn } from "@/lib/utils";
import { Code2, Sparkles, Copy, CheckCircle2, RefreshCcw, Terminal, Trash2, History, Wand2, FileCode, Cpu, Bug, Settings, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
interface AnalysisHistoryItem {
  id: string;
  timestamp: number;
  actionType: string;
  model: string;
  inputCodeSnippet: string;
  resultMarkdown: string;
}
export function CodeExplainerClient() {
  const [code, setCode] = useState("");
  const [model, setModel] = useState("gpt4o");
  const [aiModel, setAiModel] = useState("groq-llama-3.3");
  const [actionType, setActionType] = useState("explain");
  const [targetLanguage, setTargetLanguage] = useState("python");

  // Advanced Toggles
  const [includeComments, setIncludeComments] = useState(false);
  const [optimizePerformance, setOptimizePerformance] = useState(false);
  const [edgeCases, setEdgeCases] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [history, setHistory] = useState<AnalysisHistoryItem[]>([]);
  useEffect(() => {
    const saved = localStorage.getItem("toolzium_code_explainer_history");
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse code explainer history");
      }
    }
  }, []);
  const saveToHistory = (item: AnalysisHistoryItem) => {
    const updated = [item, ...history].slice(0, 10);
    setHistory(updated);
    localStorage.setItem("toolzium_code_explainer_history", JSON.stringify(updated));
  };
  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("toolzium_code_explainer_history");
    toast.success("History cleared");
  };
  const lineCount = useMemo(() => code.trim() ? code.trim().split("\n").length : 0, [code]);
  const generatePrompt = () => {
    let prompt = `You are an elite Staff Software Engineer and AI code assistant. Please process the following code strictly according to the requested action.\n\n`;
    switch (actionType) {
      case "explain":
        prompt += `Task: Provide a highly clear, structured, plain-English breakdown of what this code does. Explain the core logic, purpose, and flow step-by-step.\n`;
        break;
      case "complexity":
        prompt += `Task: Perform a rigorous algorithmic audit. State the Big-O Time Complexity and Space Complexity upfront. Break down the bottlenecks, memory allocations, and loop iterations.\n`;
        break;
      case "review":
        prompt += `Task: Conduct a thorough code review. Identify potential bugs, security vulnerabilities, anti-patterns, and bad practices. Provide actionable fixes and improved code blocks.\n`;
        break;
      case "convert":
        prompt += `Task: Convert the provided source code accurately into **${targetLanguage}**. Ensure idiomatic patterns, standard libraries, and best practices for ${targetLanguage} are utilized. Provide the converted code and briefly explain any syntax changes made.\n`;
        break;
      case "test":
        prompt += `Task: Generate a comprehensive suite of unit tests for the provided code. Use a popular testing framework (like Jest, PyTest, or native testing libraries depending on the language).\n`;
        break;
      default:
        prompt += `Task: Explain the code.\n`;
    }
    if (includeComments) prompt += `- Include detailed inline comments in any code blocks you provide to explain the logic.\n`;
    if (optimizePerformance) prompt += `- Provide performance optimizations and refactor the code to be faster and more memory-efficient.\n`;
    if (edgeCases) prompt += `- Strictly address edge cases (e.g., null inputs, out-of-bounds, invalid types, empty arrays) and explain how they are handled or should be handled.\n`;
    prompt += `\nEnsure your response is formatted purely in Markdown. Wrap code in standard Markdown code blocks with appropriate language tags.\n\n[USER SOURCE CODE]:\n\`\`\`\n${code}\n\`\`\``;
    return prompt;
  };
  const handleGenerate = async () => {
    if (!code.trim()) {
      toast.error("Please paste source code to analyze");
      return;
    }
    setIsProcessing(true);
    setResult(null);
    try {
      const promptText = generatePrompt();
      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          prompt: promptText,
          type: "text"
        })
      });
      const data = await response.json();
      if (!data.success || !data.raw) {
        throw new Error(data.error || "Failed to generate AI response.");
      }
      const rawResult = data.raw;
      setResult(rawResult);
      const newItem: AnalysisHistoryItem = {
        id: Date.now().toString(),
        timestamp: Date.now(),
        actionType,
        model: aiModel,
        inputCodeSnippet: code.substring(0, 100) + (code.length > 100 ? "..." : ""),
        resultMarkdown: rawResult
      };
      saveToHistory(newItem);
      toast.success("Analysis complete!");
    } catch (error: any) {
      toast.error(error.message || "An error occurred during analysis.");
    } finally {
      setIsProcessing(false);
    }
  };
  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      toast.success("Copied to clipboard!");
    }
  };
  const loadHistoryItem = (item: AnalysisHistoryItem) => {
    setResult(item.resultMarkdown);
    toast.success("Loaded from history");
  };
  return <div className="w-full min-h-screen pb-20 relative"><ToolBackground /><div className="relative z-10">
      

      {/* Required for Syntax Highlighting */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css" />

      <div className="max-w-[1400px] mx-auto p-4 md:p-6 lg:p-8 space-y-8 relative z-10">
        <ToolPageHeader title="AI Code Explainer & Multi-Language Converter Studio" description="Decode complex algorithms, convert languages, generate unit tests, and audit Big-O complexity with high-speed AI models." icon={Code2} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Editor & Settings */}
          <div className="lg:col-span-5 space-y-4">
            <div className="mb-4">

              <ModelSelector value={model} onChange={setModel} />

            </div>

            <GlassCard className="p-0 overflow-hidden bg-background border-border shadow-sm rounded-2xl">
              <CardHeader className="border-b border-border bg-muted/40 p-4">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-sm font-bold flex items-center gap-2 text-foreground">
                    <Terminal className="w-4 h-4 text-primary" />
                    Source Code Editor
                  </CardTitle>
                  <span className="text-[11px] font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded font-semibold">{lineCount} lines</span>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <textarea className="w-full bg-background p-4 text-xs sm:text-sm outline-none resize-none min-h-[300px] font-mono leading-relaxed text-foreground focus:ring-0 border-0" placeholder="// Paste JavaScript, Python, Rust, Go, C++, or SQL code snippet here..." value={code} onChange={e => setCode(e.target.value)} />
              </CardContent>
            </GlassCard>

            <GlassCard className="p-5 space-y-4 bg-background border-border shadow-sm rounded-2xl">
              <div className="flex items-center gap-2 mb-1">
                <Settings className="w-4 h-4 text-primary" />
                <Label className="text-base font-bold text-foreground">Configuration Settings</Label>
              </div>
              
              <div className="space-y-3">
                <div>
                  <Label className="text-xs mb-1.5 block text-muted-foreground font-semibold">Core Task</Label>
                  <select className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground font-medium outline-none focus:ring-2 focus:ring-primary/50" value={actionType} onChange={e => setActionType(e.target.value)}>
                    <option value="explain">Plain English Explanation</option>
                    <option value="complexity">Big-O Complexity Audit</option>
                    <option value="review">Find Bugs & Code Review</option>
                    <option value="convert">Convert to Another Language</option>
                    <option value="test">Generate Unit Tests</option>
                  </select>
                </div>

                {actionType === "convert" && <motion.div initial={{
                  opacity: 0,
                  height: 0
                }} animate={{
                  opacity: 1,
                  height: "auto"
                }}>
                    <Label className="text-xs mb-1.5 block text-muted-foreground font-semibold">Target Language</Label>
                    <select className="w-full rounded-lg border border-primary/40 bg-primary/5 px-3 py-2 text-xs text-foreground font-medium outline-none focus:ring-2 focus:ring-primary/50" value={targetLanguage} onChange={e => setTargetLanguage(e.target.value)}>
                      <option value="python">Python</option>
                      <option value="typescript">TypeScript</option>
                      <option value="javascript">JavaScript</option>
                      <option value="rust">Rust</option>
                      <option value="golang">Go (Golang)</option>
                      <option value="cpp">C++</option>
                      <option value="java">Java</option>
                      <option value="csharp">C#</option>
                      <option value="sql">SQL</option>
                    </select>
                  </motion.div>}

                <div className="pt-2">
                  <Label className="text-xs mb-2 block text-muted-foreground font-semibold">Advanced Options</Label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input type="checkbox" checked={includeComments} onChange={e => setIncludeComments(e.target.checked)} className="rounded text-primary focus:ring-primary cursor-pointer" />
                      <span className="text-xs text-foreground font-medium">Include Detailed Code Comments</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input type="checkbox" checked={optimizePerformance} onChange={e => setOptimizePerformance(e.target.checked)} className="rounded text-primary focus:ring-primary cursor-pointer" />
                      <span className="text-xs text-foreground font-medium">Optimize for Maximum Performance</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input type="checkbox" checked={edgeCases} onChange={e => setEdgeCases(e.target.checked)} className="rounded text-primary focus:ring-primary cursor-pointer" />
                      <span className="text-xs text-foreground font-medium">Handle Edge Cases / Security Bugs</span>
                    </label>
                  </div>
                </div>
              </div>

              <Button onClick={handleGenerate} disabled={isProcessing || !code.trim()} className="w-full gap-2 mt-4 bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-lg shadow-primary/20 rounded-xl h-12 text-sm">
                {isProcessing ? <RefreshCcw className="w-5 h-5 animate-spin" /> : <Wand2 className="w-5 h-5" />}
                {isProcessing ? "AI Engine Running..." : "Execute Code Analysis"}
              </Button>
            </GlassCard>

            {/* History Section */}
            {history.length > 0 && <GlassCard className="p-4 bg-background border-border shadow-sm rounded-2xl">
                <div className="flex items-center justify-between mb-3 border-b border-border pb-2">
                  <div className="flex items-center gap-2">
                    <History className="w-4 h-4 text-primary" />
                    <Label className="text-xs font-bold text-foreground">Recent Executions ({history.length})</Label>
                  </div>
                  <Button onClick={clearHistory} className="text-xs text-red-500 hover:underline font-semibold flex items-center gap-1">
                    <Trash2 className="w-3 h-3" /> Clear
                  </Button>
                </div>
                <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
                  {history.map(item => <div key={item.id} onClick={() => loadHistoryItem(item)} className="p-2.5 rounded-xl border border-border bg-muted/30 hover:bg-accent cursor-pointer transition-colors group">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-bold text-foreground capitalize">{item.actionType}</span>
                        <span className="text-[10px] text-muted-foreground font-mono">{new Date(item.timestamp).toLocaleTimeString()}</span>
                      </div>
                      <p className="text-xs text-muted-foreground font-mono truncate">{item.inputCodeSnippet}</p>
                    </div>)}
                </div>
              </GlassCard>}
          </div>

          {/* Right Column: Output */}
          <div className="lg:col-span-7">
            <GlassCard className="h-full min-h-[600px] flex flex-col p-0 overflow-hidden bg-background border-border shadow-sm rounded-2xl">
              <CardHeader className="border-b border-border bg-muted/40 p-4 shrink-0">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-sm font-bold flex items-center gap-2 text-foreground">
                    <Sparkles className="w-4 h-4 text-primary" />
                    AI Output Terminal
                  </CardTitle>
                  {result && <Button variant="outline" size="sm" onClick={handleCopy} className="h-8 text-xs gap-1.5 border-border font-semibold">
                      <Copy className="w-3.5 h-3.5" /> Copy Markdown
                    </Button>}
                </div>
              </CardHeader>
              <CardContent className="p-0 flex-1 overflow-auto bg-card/40">
                {isProcessing ? <div className="h-full flex flex-col items-center justify-center space-y-4 p-8 min-h-[400px]">
                    <RefreshCcw className="w-10 h-10 text-primary animate-spin" />
                    <p className="text-sm font-bold text-foreground animate-pulse">Running advanced AI engine...</p>
                  </div> : result ? <motion.div initial={{
                  opacity: 0
                }} animate={{
                  opacity: 1
                }} className="p-5 sm:p-8">
                    <div className="prose prose-sm sm:prose-base dark:prose-invert prose-pre:bg-[#0d1117] prose-pre:border prose-pre:border-border prose-pre:shadow-xl max-w-none prose-headings:text-foreground dark:prose-headings:text-slate-200 prose-a:text-primary">
                      <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                        {result}
                      </ReactMarkdown>
                    </div>
                  </motion.div> : <div className="h-full flex flex-col items-center justify-center text-center p-8 text-muted-foreground min-h-[400px]">
                    <Code2 className="w-14 h-14 mb-3 text-muted-foreground/40" />
                    <p className="text-base font-semibold text-foreground">Awaiting Instructions</p>
                    <p className="text-xs max-w-md mt-1 text-muted-foreground leading-relaxed">
                      Paste your source code on the left, select your task, and hit execute to analyze logic, convert syntax, or generate unit tests.
                    </p>
                  </div>}
              </CardContent>
            </GlassCard>
          </div>
        </div>

        <ToolHowItWorks steps={[{
          step: "01",
          title: "Paste Source Code",
          description: "Input functions, loops, or complex architectures in any language.",
          icon: Terminal
        }, {
          step: "02",
          title: "Select Operation",
          description: "Choose to Explain, Analyze Complexity, Find Bugs, Convert, or Write Tests.",
          icon: Settings
        }, {
          step: "03",
          title: "Execute AI Engine",
          description: "Receive perfectly formatted markdown and syntax-highlighted code blocks.",
          icon: Wand2
        }]} badges={["LLM Powered", "Syntax Highlighting", "Groq AI Engine"]} />

        <ToolFeatureGuides features={[{
          icon: Code2,
          title: "Multi-Language Conversion",
          description: "Port legacy logic into modern frameworks instantly with context-aware language translation."
        }, {
          icon: Cpu,
          title: "Algorithmic Big-O Auditing",
          description: "Identifies hidden nested loops and recursive bottlenecks, calculating precise Time & Space complexity."
        }, {
          icon: Bug,
          title: "Automated Code Review",
          description: "Acts as a Senior Engineer reviewing your PR, catching null-pointer exceptions and security flaws."
        }]}>
          <div className="prose dark:prose-invert max-w-none">
            <h3>Why use AI for Code Analysis?</h3>
            <p>
              Reading legacy or unfamiliar codebases consumes significant developer time. By leveraging massive LLMs like Groq Llama 3.3, you can decompose complex functions into plain-English steps, rapidly onboard onto new repositories, audit algorithmic complexity, and instantly port algorithms between languages without losing logic fidelity.
            </p>
          </div>
        </ToolFeatureGuides>

        <ToolFaqAccordion faqs={[{
          question: "Which languages are supported?",
          answer: "We support Python, TypeScript, JavaScript, Rust, Go, C++, Java, C#, and SQL."
        }, {
          question: "Are my code snippets saved or shared?",
          answer: "No, your code is processed in real time and stored only locally in your browser's history."
        }]} />

        <RelatedTools currentToolUrl="/tools/ai/code-explainer" max={6} />
      </div>
    </div></div>;
}
export default CodeExplainerClient;