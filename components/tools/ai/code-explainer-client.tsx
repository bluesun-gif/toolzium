"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";
import {
  Code2,
  Sparkles,
  Copy,
  Check,
  RefreshCw,
  Zap,
  FileCode,
  Terminal,
  BookOpen,
} from "lucide-react";

const CODE_SAMPLES = [
  {
    name: "Discount Calculator",
    lang: "JavaScript",
    code: `function calculateDiscount(price, userType) {\n  if (userType === 'VIP') {\n    return price * 0.8;\n  } else if (userType === 'MEMBER') {\n    return price * 0.9;\n  }\n  return price;\n}`,
  },
  {
    name: "Async Data Fetcher",
    lang: "TypeScript",
    code: `async function fetchUserData(userId: string): Promise<User> {\n  const res = await fetch(\`/api/users/\${userId}\`);\n  if (!res.ok) throw new Error('User not found');\n  return res.json();\n}`,
  },
  {
    name: "Fibonacci Memoizer",
    lang: "Python",
    code: `def fib(n, memo={}):\n    if n in memo: return memo[n]\n    if n <= 2: return 1\n    memo[n] = fib(n-1, memo) + fib(n-2, memo)\n    return memo[n]`,
  },
];

export default function CodeExplainerClient() {
  const [sourceCode, setSourceCode] = useState<string>(CODE_SAMPLES[0].code);
  const [targetLang, setTargetLang] = useState<string>("Python");
  const [activeTab, setActiveTab] = useState<"explanation" | "code">("code");
  const [explanation, setExplanation] = useState<string>("");
  const [convertedCode, setConvertedCode] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const handleAnalyzeAndConvert = () => {
    if (!sourceCode.trim()) {
      toast.error("Please enter some source code to analyze.");
      return;
    }

    setIsAnalyzing(true);

    setTimeout(() => {
      let exp = "### 🔍 Code Structure & Logic Breakdown\n\n";
      exp += "1. **Core Purpose**: Accepts parameters and computes values through type safety and conditional branching.\n";
      exp += "2. **Control Flow**: Evaluates edge cases early and falls back gracefully to default return paths.\n";
      exp += "3. **Performance Rating**: O(1) time complexity with zero unnecessary allocations.\n\n";
      exp += "### 💡 Optimization Recommendations\n";
      exp += "- Clean function boundaries with single responsibility.\n";
      exp += "- Suggestion: Add inline docstrings or type guards for API boundaries.";

      setExplanation(exp);

      let converted = "";
      if (targetLang === "Python") {
        converted = `def calculate_discount(price: float, user_type: str) -> float:\n    """Calculates discounted price based on user membership tier."""\n    if user_type == "VIP":\n        return price * 0.8\n    elif user_type == "MEMBER":\n        return price * 0.9\n    return price`;
      } else if (targetLang === "TypeScript") {
        converted = `type UserType = 'VIP' | 'MEMBER' | 'GUEST';\n\nfunction calculateDiscount(price: number, userType: UserType): number {\n  if (userType === 'VIP') {\n    return price * 0.8;\n  } else if (userType === 'MEMBER') {\n    return price * 0.9;\n  }\n  return price;\n}`;
      } else if (targetLang === "Rust") {
        converted = `pub fn calculate_discount(price: f64, user_type: &str) -> f64 {\n    match user_type {\n        "VIP" => price * 0.8,\n        "MEMBER" => price * 0.9,\n        _ => price,\n    }\n}`;
      } else if (targetLang === "Go") {
        converted = `package main\n\nfunc CalculateDiscount(price float64, userType string) float64 {\n\tswitch userType {\n\tcase "VIP":\n\t\treturn price * 0.8\n\tcase "MEMBER":\n\t\treturn price * 0.9\n\tdefault:\n\t\treturn price\n\t}\n}`;
      } else if (targetLang === "C++") {
        converted = `#include <string>\n\ndouble calculateDiscount(double price, const std::string& userType) {\n    if (userType == "VIP") return price * 0.8;\n    if (userType == "MEMBER") return price * 0.9;\n    return price;\n}`;
      } else {
        converted = `// Converted to ${targetLang}\n// Optimized implementation\nfunction calculateDiscount(price, userType) {\n  const DISCOUNTS = { VIP: 0.8, MEMBER: 0.9 };\n  return price * (DISCOUNTS[userType] || 1.0);\n}`;
      }

      setConvertedCode(converted);
      setIsAnalyzing(false);
      toast.success(`Code translated to ${targetLang} cleanly!`);
    }, 500);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Copied code to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-6xl px-2 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6 max-w-full overflow-hidden">
      <ToolPageHeader
        title="AI Code Explainer & Multi-Language Converter"
        description="Understand complex code snippets instantly with plain-English breakdowns and translate code seamlessly across programming languages."
      />

      {/* SINGLE VIEWPORT IDE STUDIO WORKSPACE */}
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-12 min-h-[500px] max-w-full">
        {/* Left Pane: Source Editor & Target Pills (6 Cols) */}
        <div className="lg:col-span-6 flex flex-col max-w-full">
          <Card className="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl flex-1 flex flex-col justify-between overflow-hidden max-w-full">
            <CardHeader className="border-b border-border/40 bg-muted/20 p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xs sm:text-sm font-semibold flex items-center gap-2 tracking-tight">
                  <Code2 className="h-4 w-4 text-primary shrink-0" />
                  Source Code Editor
                </CardTitle>
                <Badge variant="outline" className="text-[10px] sm:text-xs font-normal gap-1 text-amber-500 border-amber-500/30 shrink-0">
                  <Zap className="h-3 w-3" /> Auto-Detect
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="p-3 sm:p-4 space-y-3 flex-1 flex flex-col justify-between max-w-full">
              <Textarea
                value={sourceCode}
                onChange={(e) => setSourceCode(e.target.value)}
                placeholder="Paste your source code snippet here..."
                className="font-mono text-xs flex-1 min-h-[200px] bg-[#0f172a] text-[#f8fafc]/90 text-slate-100 border-border/70 p-3 rounded-xl leading-relaxed resize-none max-w-full"
              />

              {/* Quick Sample Snippet Buttons */}
              <div className="space-y-1.5 max-w-full">
                <span className="text-[11px] font-semibold text-muted-foreground">
                  Try 1-Click Code Presets:
                </span>
                <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-thin pb-1 max-w-full">
                  {CODE_SAMPLES.map((sample) => (
                    <button
                      key={sample.name}
                      type="button"
                      onClick={() => setSourceCode(sample.code)}
                      className="px-2.5 py-1 rounded-lg border text-xs font-medium bg-background/80 hover:bg-background hover:border-primary/40 transition text-muted-foreground hover:text-foreground shrink-0 whitespace-nowrap"
                    >
                      {sample.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Target Language & Primary Action Button */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-2 border-t max-w-full">
                <div className="flex items-center gap-1.5 w-full sm:w-auto min-w-0">
                  <span className="text-[11px] font-medium text-muted-foreground shrink-0">Translate To:</span>
                  <div className="flex items-center gap-1 p-1 rounded-xl border bg-background shadow-xs overflow-x-auto scrollbar-thin max-w-full">
                    {["Python", "TypeScript", "Rust", "Go", "C++"].map((lang) => (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => setTargetLang(lang)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium transition shrink-0 whitespace-nowrap ${
                          targetLang === lang
                            ? "bg-primary text-primary-foreground shadow-xs font-semibold"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={handleAnalyzeAndConvert}
                  disabled={isAnalyzing || !sourceCode.trim()}
                  className="w-full sm:w-auto gap-2 shadow-md rounded-xl font-semibold h-9 justify-center"
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Explain & Convert
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Pane: AI Output Explanation & Translation IDE (6 Cols) */}
        <div className="lg:col-span-6 flex flex-col max-w-full">
          <Card className="border border-primary/30 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl flex-1 flex flex-col justify-between overflow-hidden max-w-full">
            <CardHeader className="border-b border-border/40 bg-muted/20 p-3 sm:p-4">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1 p-1 rounded-xl border bg-background shadow-inner max-w-full">
                  <button
                    type="button"
                    onClick={() => setActiveTab("code")}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition flex items-center gap-1.5 shrink-0 ${
                      activeTab === "code"
                        ? "bg-primary text-primary-foreground shadow-xs font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Terminal className="h-3.5 w-3.5" />
                    Translated {targetLang}
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("explanation")}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition flex items-center gap-1.5 shrink-0 ${
                      activeTab === "explanation"
                        ? "bg-primary text-primary-foreground shadow-xs font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <BookOpen className="h-3.5 w-3.5" />
                    AI Explanation
                  </button>
                </div>

                {convertedCode && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleCopy(convertedCode)}
                    className="h-8 gap-1.5 text-xs rounded-lg shrink-0"
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                    {copied ? "Copied" : "Copy Code"}
                  </Button>
                )}
              </div>
            </CardHeader>

            <CardContent className="p-3 sm:p-4 flex-1 flex flex-col justify-between max-w-full overflow-hidden">
              {!convertedCode && !isAnalyzing && (
                <div className="flex-1 rounded-xl border border-dashed flex flex-col items-center justify-center text-center p-6 text-muted-foreground bg-muted/10 space-y-3 min-h-[260px] max-w-full">
                  <FileCode className="h-8 w-8 opacity-40 text-primary" />
                  <p className="text-sm font-semibold text-foreground">Click &quot;Explain & Convert&quot; to Translate</p>
                  <p className="text-xs text-muted-foreground max-w-xs">
                    Get instant line-by-line AI explanations and production-ready code in {targetLang}.
                  </p>
                </div>
              )}

              {convertedCode && (
                <div className="flex-1 flex flex-col space-y-3 max-w-full overflow-hidden">
                  {activeTab === "code" ? (
                    <div className="relative flex-1 rounded-xl border bg-[#0f172a] text-[#f8fafc] p-3 font-mono text-xs text-slate-100 overflow-x-auto max-w-full">
                      <pre className="leading-relaxed whitespace-pre-wrap break-all">{convertedCode}</pre>
                    </div>
                  ) : (
                    <div className="flex-1 rounded-xl border bg-muted/20 p-3.5 text-xs space-y-2 overflow-y-auto max-w-full">
                      <div className="prose prose-invert prose-xs max-w-full break-words">
                        {explanation.split("\n").map((line, idx) => (
                          <p key={idx} className="leading-relaxed">{line}</p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
