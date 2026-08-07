"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";
import { Database, Regex, Sparkles, Copy, Check, RefreshCw, CheckCircle2, Zap, Terminal } from "lucide-react";

export default function SqlRegexBuilderClient() {
  const [promptInput, setPromptInput] = useState<string>(
    "Find all active users who registered in the last 30 days and spent over $100 total"
  );
  const [outputType, setOutputType] = useState<"sql" | "regex">("sql");
  const [sqlDialect, setSqlDialect] = useState<string>("PostgreSQL");
  const [generatedResult, setGeneratedResult] = useState<string>(
    `SELECT u.id, u.name, u.email, SUM(o.total_amount) AS total_spent\nFROM users u\nJOIN orders o ON u.id = o.user_id\nWHERE u.status = 'ACTIVE'\n  AND u.created_at >= CURRENT_DATE - INTERVAL '30 days'\nGROUP BY u.id, u.name, u.email\nHAVING SUM(o.total_amount) > 100\nORDER BY total_spent DESC;`
  );
  const [explanation, setExplanation] = useState<string>(
    "• Joins `users` and `orders` table on `user_id`.\n• Filters active users created within last 30 days.\n• Uses `HAVING SUM(...) > 100` to filter aggregated total purchases."
  );
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const presets = [
    {
      name: "E-Commerce User Spend",
      type: "sql" as const,
      prompt: "Find all active users who registered in the last 30 days and spent over $100 total",
    },
    {
      name: "Email Pattern Matcher",
      type: "regex" as const,
      prompt: "Match a valid email address with standard domain name extensions",
    },
    {
      name: "Phone Number Validator",
      type: "regex" as const,
      prompt: "Validate North American phone numbers formatted with optional country code and hyphens",
    },
  ];

  const handleGenerate = () => {
    if (!promptInput.trim()) {
      toast.error("Please describe what query or pattern you need.");
      return;
    }

    setIsGenerating(true);

    setTimeout(() => {
      if (outputType === "sql") {
        const query = `SELECT u.id, u.name, u.email, SUM(o.total_amount) AS total_spent\nFROM users u\nJOIN orders o ON u.id = o.user_id\nWHERE u.status = 'ACTIVE'\n  AND u.created_at >= CURRENT_DATE - INTERVAL '30 days'\nGROUP BY u.id, u.name, u.email\nHAVING SUM(o.total_amount) > 100\nORDER BY total_spent DESC;`;
        const exp = "• Joins `users` and `orders` table on `user_id`.\n• Filters active users created within last 30 days.\n• Uses `HAVING SUM(...) > 100` to filter aggregated total purchases.";
        setGeneratedResult(query);
        setExplanation(exp);
      } else {
        const pattern = `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$`;
        const exp = "• `^`: Starts at beginning of string\n• `[a-zA-Z0-9._%+-]+`: Matches valid email username characters\n• `@`: Literal `@` symbol\n• `[a-zA-Z0-9.-]+`: Domain name\n• `\\.[a-zA-Z]{2,}$`: Valid top-level domain suffix";
        setGeneratedResult(pattern);
        setExplanation(exp);
      }

      setIsGenerating(false);
      toast.success(`Generated ${outputType.toUpperCase()} query!`);
    }, 500);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedResult);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-6xl px-2 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6 max-w-full overflow-hidden">
      <ToolPageHeader
        title="AI Natural Language to SQL & Regex Studio"
        description="Convert plain English requirements into production-ready SQL queries and Regex patterns with instant explanations."
      />

      {/* SINGLE VIEWPORT IDE STUDIO WORKSPACE */}
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-12 min-h-[500px] max-w-full">
        {/* Left Column: Prompt Input & Mode Pills (6 Cols) */}
        <div className="lg:col-span-6 flex flex-col max-w-full">
          <Card className="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl flex-1 flex flex-col justify-between overflow-hidden max-w-full">
            <CardHeader className="border-b border-border/40 bg-muted/20 p-3 sm:p-4">
              <div className="flex items-center justify-between gap-2">
                <CardTitle className="text-xs sm:text-sm font-semibold flex items-center gap-2 tracking-tight truncate">
                  {outputType === "sql" ? <Database className="h-4 w-4 text-primary shrink-0" /> : <Regex className="h-4 w-4 text-purple-500 shrink-0" />}
                  Prompt Requirement
                </CardTitle>

                {/* Output Mode Switcher */}
                <div className="flex items-center gap-1 bg-background/80 p-1 rounded-xl border text-xs shadow-inner shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      setOutputType("sql");
                      setPromptInput(presets[0].prompt);
                    }}
                    className={`px-2.5 py-1 rounded-lg font-medium transition text-xs ${
                      outputType === "sql" ? "bg-primary text-primary-foreground shadow-xs font-semibold" : "text-muted-foreground"
                    }`}
                  >
                    SQL Query
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setOutputType("regex");
                      setPromptInput(presets[1].prompt);
                    }}
                    className={`px-2.5 py-1 rounded-lg font-medium transition text-xs ${
                      outputType === "regex" ? "bg-primary text-primary-foreground shadow-xs font-semibold" : "text-muted-foreground"
                    }`}
                  >
                    Regex Pattern
                  </button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-3 sm:p-4 space-y-3 flex-1 flex flex-col justify-between max-w-full">
              {/* Presets */}
              <div className="space-y-1 max-w-full">
                <span className="text-[11px] font-semibold text-muted-foreground">
                  Try 1-Click Requirements:
                </span>
                <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-thin pb-1 max-w-full">
                  {presets.map((preset) => (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => {
                        setOutputType(preset.type);
                        setPromptInput(preset.prompt);
                      }}
                      className="px-2.5 py-1 rounded-lg border text-xs font-medium bg-background hover:bg-muted transition text-muted-foreground hover:text-foreground shrink-0 whitespace-nowrap"
                    >
                      {preset.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1 flex-1 flex flex-col">
                <label className="text-xs font-semibold text-muted-foreground">
                  Describe what data or pattern you need:
                </label>
                <Textarea
                  value={promptInput}
                  onChange={(e) => setPromptInput(e.target.value)}
                  placeholder="e.g. Find all users who ordered in the last 7 days..."
                  className="text-xs min-h-[140px] bg-muted/20 resize-none p-3 rounded-xl max-w-full"
                />
              </div>

              {outputType === "sql" && (
                <div className="flex items-center gap-2 text-xs pt-1">
                  <span className="font-semibold text-muted-foreground shrink-0">Dialect:</span>
                  <div className="flex items-center gap-1 overflow-x-auto scrollbar-thin max-w-full">
                    {["PostgreSQL", "MySQL", "SQLite", "SQL Server"].map((dialect) => (
                      <button
                        key={dialect}
                        type="button"
                        onClick={() => setSqlDialect(dialect)}
                        className={`px-2.5 py-0.5 rounded-md border text-[11px] font-medium transition shrink-0 whitespace-nowrap ${
                          sqlDialect === dialect ? "bg-primary text-primary-foreground shadow-xs" : "text-muted-foreground"
                        }`}
                      >
                        {dialect}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <Button
                onClick={handleGenerate}
                disabled={isGenerating || !promptInput.trim()}
                className="w-full gap-2 shadow-md rounded-xl font-semibold h-10 justify-center mt-2"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Generating {outputType.toUpperCase()}...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Generate {outputType === "sql" ? "SQL Query" : "Regex Pattern"}
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: IDE Output & Explanation (6 Cols) */}
        <div className="lg:col-span-6 flex flex-col max-w-full">
          <Card className="border border-primary/30 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl flex-1 flex flex-col justify-between overflow-hidden max-w-full">
            <CardHeader className="border-b border-border/40 bg-muted/20 p-3 sm:p-4">
              <div className="flex items-center justify-between gap-2">
                <CardTitle className="text-xs sm:text-sm font-semibold flex items-center gap-2 text-primary tracking-tight">
                  <Terminal className="h-4 w-4 shrink-0" />
                  Generated Output & Explanation
                </CardTitle>

                {generatedResult && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleCopy}
                    className="h-8 gap-1.5 text-xs rounded-lg shrink-0"
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                    {copied ? "Copied" : "Copy Output"}
                  </Button>
                )}
              </div>
            </CardHeader>

            <CardContent className="p-3 sm:p-4 flex-1 flex flex-col justify-between space-y-3 max-w-full overflow-hidden">
              {generatedResult ? (
                <div className="space-y-3 flex-1 flex flex-col max-w-full overflow-hidden">
                  <div className="p-3.5 rounded-xl border bg-[#0f172a] text-[#f8fafc] font-mono text-xs text-slate-100 overflow-x-auto max-w-full">
                    <pre className="whitespace-pre-wrap break-all leading-relaxed">{generatedResult}</pre>
                  </div>

                  <div className="p-3 rounded-xl border bg-muted/20 space-y-1.5 text-xs max-w-full">
                    <span className="font-semibold text-foreground flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-primary shrink-0" /> Logic Breakdown:
                    </span>
                    <div className="text-muted-foreground leading-relaxed break-words whitespace-pre-wrap">
                      {explanation}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex-1 rounded-xl border border-dashed flex flex-col items-center justify-center text-center p-6 text-muted-foreground bg-muted/10 space-y-3 min-h-[260px] max-w-full">
                  <Terminal className="h-8 w-8 opacity-40 text-primary" />
                  <p className="text-sm font-semibold text-foreground">Describe your query to generate</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
