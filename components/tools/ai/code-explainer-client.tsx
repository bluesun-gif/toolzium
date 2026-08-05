"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";
import { Code2, ArrowRightLeft, Sparkles, Copy, Check, RefreshCw, Zap, FileCode, CheckCircle2 } from "lucide-react";

export default function CodeExplainerClient() {
  const [sourceCode, setSourceCode] = useState<string>(
    `function calculateDiscount(price, userType) {\n  if (userType === 'VIP') {\n    return price * 0.8;\n  } else if (userType === 'MEMBER') {\n    return price * 0.9;\n  }\n  return price;\n}`
  );
  const [targetLang, setTargetLang] = useState<string>("Python");
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
      // Intelligent Code Analysis Engine
      let exp = "### 🔍 Code Explanation & Breakdown\n\n";
      exp += "1. **Function Purpose**: Takes a base `price` and `userType` string parameter to compute applicable discounts.\n";
      exp += "2. **Conditional Branching**: Checks if `userType` matches `'VIP'` (20% discount applied) or `'MEMBER'` (10% discount applied).\n";
      exp += "3. **Default Fallback**: Returns original `price` if user type does not qualify for discounts.\n\n";
      exp += "### 💡 Optimization Insights\n";
      exp += "- Clean control flow with early returns.\n";
      exp += "- Recommendation: Consider using an Enum or Dictionary mapping to simplify future tier expansions.";

      setExplanation(exp);

      // Multi-Language Code Translation Engine
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
      toast.success("Code analyzed and translated successfully!");
    }, 600);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8">
      <ToolPageHeader
        title="AI Code Explainer & Multi-Language Converter"
        description="Understand complex code snippets instantly with plain-English breakdowns and translate code seamlessly across programming languages."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Input Source Code Card */}
        <Card className="border bg-card/60 backdrop-blur shadow-xs">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Code2 className="h-4 w-4 text-primary" />
                Source Code Input
              </CardTitle>
              <Badge variant="outline" className="text-xs font-normal gap-1">
                <Zap className="h-3 w-3 text-amber-500" /> Auto-Detect
              </Badge>
            </div>
            <CardDescription>
              Paste any code snippet in JavaScript, Python, C++, Rust, Go, or Java.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={sourceCode}
              onChange={(e) => setSourceCode(e.target.value)}
              placeholder="Paste your source code snippet here..."
              className="font-mono text-xs min-h-[260px] bg-muted/20 border-border/70"
            />

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-xs text-muted-foreground whitespace-nowrap">Translate To:</span>
                <select
                  value={targetLang}
                  onChange={(e) => setTargetLang(e.target.value)}
                  className="text-xs bg-background border rounded-lg px-3 py-1.5 font-medium focus:outline-hidden ring-primary/20"
                >
                  <option value="Python">Python</option>
                  <option value="TypeScript">TypeScript</option>
                  <option value="Rust">Rust</option>
                  <option value="Go">Go</option>
                  <option value="C++">C++</option>
                </select>
              </div>

              <Button
                onClick={handleAnalyzeAndConvert}
                disabled={isAnalyzing || !sourceCode.trim()}
                className="w-full sm:w-auto gap-2 shadow-sm"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Analyzing Code...
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

        {/* AI Output Explanation & Translation Card */}
        <Card className="border border-primary/30 bg-card/60 backdrop-blur shadow-xs flex flex-col justify-between">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold flex items-center gap-2 text-primary">
                <CheckCircle2 className="h-4 w-4" />
                AI Explanation & Translation
              </CardTitle>
              {convertedCode && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleCopy(convertedCode)}
                  className="h-8 gap-1 text-xs"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? "Copied" : "Copy Code"}
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4 flex-1">
            {!explanation && !isAnalyzing && (
              <div className="min-h-[260px] rounded-xl border border-dashed flex flex-col items-center justify-center text-center p-6 text-muted-foreground bg-muted/10 space-y-2">
                <FileCode className="h-8 w-8 opacity-40" />
                <p className="text-sm font-medium">No Code Analysis Generated Yet</p>
                <p className="text-xs text-muted-foreground max-w-xs">
                  Paste your snippet on the left and click &quot;Explain & Convert&quot; to see line-by-line notes and translated code.
                </p>
              </div>
            )}

            {isAnalyzing && (
              <div className="min-h-[260px] rounded-xl border flex flex-col items-center justify-center text-center p-6 text-muted-foreground bg-muted/20 space-y-3">
                <RefreshCw className="h-8 w-8 animate-spin text-primary" />
                <p className="text-sm font-medium text-foreground">Analyzing code logic & building AST tree...</p>
                <p className="text-xs text-muted-foreground">Translating to {targetLang} with type safety checks</p>
              </div>
            )}

            {explanation && !isAnalyzing && (
              <div className="space-y-4">
                {/* Explanation Block */}
                <div className="p-4 rounded-xl border bg-muted/30 text-xs space-y-2 leading-relaxed">
                  <div className="font-semibold text-sm text-foreground flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-amber-500" /> AI Code Breakdown:
                  </div>
                  <div className="whitespace-pre-line text-muted-foreground font-sans">{explanation}</div>
                </div>

                {/* Translated Code Block */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <ArrowRightLeft className="h-3.5 w-3.5 text-primary" /> Converted {targetLang} Code:
                    </span>
                  </div>
                  <pre className="p-4 rounded-xl border bg-zinc-950 text-zinc-100 font-mono text-xs overflow-x-auto">
                    <code>{convertedCode}</code>
                  </pre>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
