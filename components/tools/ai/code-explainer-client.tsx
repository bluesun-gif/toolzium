"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { 
  Code2, Sparkles, Copy, CheckCircle2, RefreshCcw, Terminal, 
  Trash2, History, Wand2, FileCode, Cpu, Bug, Settings, ChevronRight
} from "lucide-react";
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
  const [mounted, setMounted] = useState(false);
  const [code, setCode] = useState("");
  const [aiModel, setAiModel] = useState("llama-3.3-70b-versatile");
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
    setMounted(true);
    const saved = localStorage.getItem("toolflux_code_explainer_history");
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
    localStorage.setItem("toolflux_code_explainer_history", JSON.stringify(updated));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("toolflux_code_explainer_history");
    toast.success("History cleared");
  };

  const lineCount = useMemo(() => (code.trim() ? code.trim().split("\n").length : 0), [code]);

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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: promptText,
          type: "text", // Signals to our API that we want raw text back, not a list
          model: aiModel
        }),
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

  if (!mounted) return null;

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-4">
      {/* Required for Syntax Highlighting */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css" />

      {/* 3D Cyan Code Icon Header Box */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md shadow-slate-200/50">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-600 text-white shadow-lg shadow-cyan-500/30 flex items-center justify-center shrink-0">
          <Code2 className="w-8 h-8" />
        </div>
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">AI Code Explainer & Converter</h1>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-cyan-100 dark:bg-cyan-950/50 text-cyan-700 dark:text-cyan-300 px-2.5 py-1 rounded-full border border-cyan-200">POWERED BY LLMs</span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">Instantly decode complex algorithms, convert languages, generate unit tests, and audit Big-O complexity using top-tier AI models.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Editor & Settings */}
        <div className="lg:col-span-5 space-y-4">
          <GlassCard className="p-0 overflow-hidden">
            <CardHeader className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 p-4">
              <div className="flex justify-between items-center">
                <CardTitle className="text-sm font-semibold flex items-center gap-2 text-slate-900 dark:text-slate-100">
                  <Terminal className="w-4 h-4 text-cyan-600" />
                  Source Code Editor
                </CardTitle>
                <span className="text-[11px] font-mono text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">{lineCount} lines</span>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <textarea
                className="w-full bg-white dark:bg-slate-900 p-4 text-sm outline-none resize-none min-h-[300px] font-mono leading-relaxed text-slate-900 dark:text-slate-100 focus:ring-0 border-0"
                placeholder="// Paste JavaScript, Python, Rust, Go, C++, or SQL code snippet here..."
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </CardContent>
          </GlassCard>

          <GlassCard className="p-5 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Settings className="w-4 h-4 text-slate-400" />
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">Configuration</h3>
            </div>
            
            <div className="space-y-3">
              <div>
                <Label className="text-xs mb-1.5 block text-slate-600 dark:text-slate-400 font-semibold">AI Model</Label>
                <select
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 px-3 py-2.5 text-sm text-slate-900 dark:text-slate-100 font-medium focus:ring-2 focus:ring-cyan-500 outline-none"
                  value={aiModel}
                  onChange={(e) => setAiModel(e.target.value)}
                >
                  <option value="llama-3.3-70b-versatile">Groq Llama 3.3 70B (Fastest)</option>
                  <option value="gpt-4o">OpenAI GPT-4o (Premium)</option>
                  <option value="claude-3-5-sonnet-20241022">Claude 3.5 Sonnet (Best Logic)</option>
                  <option value="gemini-1.5-pro">Gemini 1.5 Pro</option>
                </select>
              </div>

              <div>
                <Label className="text-xs mb-1.5 block text-slate-600 dark:text-slate-400 font-semibold">Core Task</Label>
                <select
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 px-3 py-2.5 text-sm text-slate-900 dark:text-slate-100 font-medium focus:ring-2 focus:ring-cyan-500 outline-none"
                  value={actionType}
                  onChange={(e) => setActionType(e.target.value)}
                >
                  <option value="explain">Plain English Explanation</option>
                  <option value="complexity">Big-O Complexity Audit</option>
                  <option value="review">Find Bugs & Code Review</option>
                  <option value="convert">Convert to Another Language</option>
                  <option value="test">Generate Unit Tests</option>
                </select>
              </div>

              {actionType === "convert" && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
                  <Label className="text-xs mb-1.5 block text-slate-600 dark:text-slate-400 font-semibold">Target Language</Label>
                  <select
                    className="w-full rounded-xl border border-cyan-200 dark:border-cyan-800/50 bg-cyan-50/30 dark:bg-cyan-950/20 px-3 py-2.5 text-sm text-cyan-900 dark:text-cyan-100 font-medium focus:ring-2 focus:ring-cyan-500 outline-none"
                    value={targetLanguage}
                    onChange={(e) => setTargetLanguage(e.target.value)}
                  >
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
                </motion.div>
              )}

              <div className="pt-2">
                <Label className="text-xs mb-2 block text-slate-600 dark:text-slate-400 font-semibold">Advanced Prompt Toggles</Label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" checked={includeComments} onChange={(e) => setIncludeComments(e.target.checked)} className="rounded text-cyan-600 focus:ring-cyan-500 bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 cursor-pointer" />
                    <span className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-cyan-600 transition-colors">Include Detailed Code Comments</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" checked={optimizePerformance} onChange={(e) => setOptimizePerformance(e.target.checked)} className="rounded text-cyan-600 focus:ring-cyan-500 bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 cursor-pointer" />
                    <span className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-cyan-600 transition-colors">Optimize for Performance</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" checked={edgeCases} onChange={(e) => setEdgeCases(e.target.checked)} className="rounded text-cyan-600 focus:ring-cyan-500 bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 cursor-pointer" />
                    <span className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-cyan-600 transition-colors">Handle Edge Cases / Vulnerabilities</span>
                  </label>
                </div>
              </div>
            </div>

            <Button onClick={handleGenerate} disabled={isProcessing || !code.trim()} className="w-full gap-2 mt-4 bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white font-bold shadow-lg shadow-cyan-500/25 rounded-xl h-12 text-sm transition-all hover:scale-[1.02] active:scale-95">
              {isProcessing ? <RefreshCcw className="w-5 h-5 animate-spin" /> : <Wand2 className="w-5 h-5" />}
              {isProcessing ? "AI Engine Running..." : "Execute Analysis"}
            </Button>
          </GlassCard>

          {/* History Section */}
          {history.length > 0 && (
            <GlassCard className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <History className="w-4 h-4 text-slate-500" />
                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">Recent Executions</h3>
                </div>
                <button onClick={clearHistory} className="text-xs text-red-500 hover:text-red-600 font-semibold flex items-center gap-1">
                  <Trash2 className="w-3 h-3" /> Clear
                </button>
              </div>
              <div className="space-y-2">
                {history.map((item) => (
                  <div key={item.id} onClick={() => loadHistoryItem(item)} className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 hover:bg-cyan-50 dark:bg-slate-900/50 dark:hover:bg-cyan-950/30 cursor-pointer transition-colors group">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200 capitalize">{item.actionType}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{new Date(item.timestamp).toLocaleTimeString()}</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-mono truncate">{item.inputCodeSnippet}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[10px] font-medium text-cyan-600 dark:text-cyan-400 px-2 py-0.5 bg-cyan-100 dark:bg-cyan-900/30 rounded">{item.model.split("-")[0].toUpperCase()}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-cyan-500 transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          )}
        </div>

        {/* Right Column: Output */}
        <div className="lg:col-span-7">
          <GlassCard className="h-full min-h-[600px] flex flex-col p-0 overflow-hidden">
            <CardHeader className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 p-4 shrink-0">
              <div className="flex justify-between items-center">
                <CardTitle className="text-sm font-semibold flex items-center gap-2 text-slate-900 dark:text-slate-100">
                  <Sparkles className="w-4 h-4 text-teal-600" />
                  AI Output Terminal
                </CardTitle>
                {result && (
                  <Button variant="outline" size="sm" onClick={handleCopy} className="h-8 text-xs gap-1.5 border-slate-200 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800">
                    <Copy className="w-3.5 h-3.5" /> Copy Output
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-0 flex-1 overflow-auto bg-slate-50/30 dark:bg-slate-900/20">
              {isProcessing ? (
                <div className="h-full flex flex-col items-center justify-center space-y-4 p-8">
                  <div className="relative w-16 h-16">
                    <div className="absolute inset-0 border-4 border-slate-100 dark:border-slate-800 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-cyan-500 rounded-full border-t-transparent animate-spin"></div>
                  </div>
                  <p className="text-sm font-bold text-slate-600 dark:text-slate-400 animate-pulse">Running advanced AI models...</p>
                  <p className="text-xs text-slate-400 font-mono text-center max-w-xs">Connecting to {aiModel} via API stream</p>
                </div>
              ) : result ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-5 sm:p-8">
                  <div className="prose prose-sm sm:prose-base dark:prose-invert prose-pre:bg-[#0d1117] prose-pre:border prose-pre:border-slate-800 prose-pre:shadow-xl max-w-none prose-headings:text-slate-800 dark:prose-headings:text-slate-200 prose-a:text-cyan-600">
                    <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                      {result}
                    </ReactMarkdown>
                  </div>
                </motion.div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-400">
                  <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800/50 rounded-full flex items-center justify-center mb-4">
                    <Code2 className="w-10 h-10 text-slate-300 dark:text-slate-600" />
                  </div>
                  <p className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-2">Awaiting Instructions</p>
                  <p className="text-sm max-w-md mt-1 text-slate-500 leading-relaxed">
                    Paste your source code, configure the AI model and prompt options, and hit execute to see the magic happen right here.
                  </p>
                </div>
              )}
            </CardContent>
          </GlassCard>
        </div>
      </div>

      <ToolHowItWorks
        steps={[
          { step: "01", title: "Paste Source Code", description: "Input functions, loops, or complex architectures in any language.", icon: Terminal },
          { step: "02", title: "Select Operation", description: "Choose to Explain, Analyze Complexity, Find Bugs, Convert, or Write Tests.", icon: Settings },
          { step: "03", title: "Execute AI Engine", description: "Receive perfectly formatted markdown and syntax-highlighted code blocks.", icon: Wand2 }
        ]}
        badges={["LLM Powered", "Syntax Highlighting", "4+ AI Models"]}
      />

      <ToolFeatureGuides
        features={[
          { icon: Code2, title: "Multi-Language Conversion", description: "Port legacy logic into modern frameworks instantly with context-aware language translation." },
          { icon: Cpu, title: "Algorithmic Big-O Auditing", description: "Identifies hidden nested loops and recursive bottlenecks, calculating precise Time & Space complexity." },
          { icon: Bug, title: "Automated Code Review", description: "Acts as a Senior Engineer reviewing your PR, catching null-pointer exceptions and security flaws." }
        ]}
      >
        <div className="prose dark:prose-invert max-w-none">
          <h3>Why use AI for Code Analysis?</h3>
          <p>
            Reading legacy or unfamiliar codebases consumes significant developer time. By leveraging massive LLMs like GPT-4o and Llama 3.3, you can decompose complex functions into plain-English steps, rapidly onboard onto new repositories, audit algorithmic complexity, and instantly port algorithms between languages without losing logic fidelity.
          </p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion
        faqs={[
          { question: "Which AI models can I use?", answer: "We support Groq Llama 3.3 70B for maximum speed, OpenAI GPT-4o for premium logic reasoning, Anthropic Claude 3.5 Sonnet, and Google Gemini 1.5 Pro." },
          { question: "Can I convert code to a language not listed?", answer: "Currently, we provide dropdowns for the most popular languages (Python, TS, JS, Rust, Go, C++, Java, C#, SQL). The AI is capable of others, but we optimize prompts for these specific targets." },
          { question: "Are my generated results saved?", answer: "Yes, your recent execution history is safely stored in your browser's local storage so you can retrieve previous audits instantly." }
        ]}
      />

      <RelatedTools currentToolUrl="/tools/ai/code-explainer" max={6} />
    </div>
  );
}

export default CodeExplainerClient;
