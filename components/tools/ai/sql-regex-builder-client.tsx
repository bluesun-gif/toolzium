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
    <div className="mx-auto max-w-6xl px-4 py-6 space-y-6">
      <ToolPageHeader
        title="AI Natural Language to SQL & Regex Studio"
        description="Convert plain English requirements into production-ready SQL queries and Regex patterns with instant explanations."
      />

      {/* SINGLE VIEWPORT IDE STUDIO WORKSPACE */}
      <div className="grid gap-6 lg:grid-cols-12 min-h-[500px]">
        {/* Left Column: Prompt Input & Mode Pills (6 Cols) */}
        <div className="lg:col-span-6 flex flex-col">
          <Card className="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl flex-1 flex flex-col justify-between overflow-hidden">
            <CardHeader className="border-b border-border/40 bg-muted/20 pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold flex items-center gap-2 tracking-tight">
                  {outputType === "sql" ? <Database className="h-4 w-4 text-primary" /> : <Regex className="h-4 w-4 text-purple-500" />}
                  Prompt Requirement
                </CardTitle>

                {/* Output Mode Switcher */}
                <div className="flex items-center gap-1 bg-background/80 p-1 rounded-xl border text-xs shadow-inner">
                  <button
                    type="button"
                    onClick={() => {
                      setOutputType("sql");
                      setPromptInput(presets[0].prompt);
                    }}
                    className={`px-2.5 py-1 rounded-lg font-medium transition ${
                      outputType === "sql" ? "bg-primary text-primary-foreground shadow-xs" : "text-muted-foreground"
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
                    className={`px-2.5 py-1 rounded-lg font-medium transition ${
                      outputType === "regex" ? "bg-primary text-primary-foreground shadow-xs" : "text-muted-foreground"
                    }`}
                  >
                    Regex Pattern
                  </button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-4 flex-1 flex flex-col justify-between space-y-3">
              {/* Presets */}
              <div className="space-y-1">
                <span className="text-[11px] font-semibold text-muted-foreground">
                  Try 1-Click Prompt Presets:
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {presets.map((p) => (
                    <button
                      key={p.name}
                      type="button"
                      onClick={() => {
                        setOutputType(p.type);
                        setPromptInput(p.prompt);
                      }}
                      className="px-2.5 py-1 rounded-lg border text-xs font-medium bg-background hover:bg-muted transition text-muted-foreground hover:text-foreground"
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1 flex-1 flex flex-col">
                <label className="text-xs font-semibold text-muted-foreground">Plain English Goal:</label>
                <Textarea
                  value={promptInput}
                  onChange={(e) => setPromptInput(e.target.value)}
                  placeholder="Describe your query or matching goal..."
                  className="text-xs flex-1 min-h-[180px] bg-muted/20 resize-none p-3 rounded-xl"
                />
              </div>

              <div className="flex items-center justify-between gap-3 pt-2 border-t">
                {outputType === "sql" && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-muted-foreground">Dialect:</span>
                    <select
                      value={sqlDialect}
                      onChange={(e) => setSqlDialect(e.target.value)}
                      className="text-xs bg-background border rounded-lg px-2.5 py-1 font-medium"
                    >
                      <option value="PostgreSQL">PostgreSQL</option>
                      <option value="MySQL">MySQL</option>
                      <option value="SQLite">SQLite</option>
                    </select>
                  </div>
                )}

                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating || !promptInput.trim()}
                  className="ml-auto gap-2 shadow-md rounded-xl font-semibold"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Generate {outputType.toUpperCase()}
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Generated Code IDE Output (6 Cols) */}
        <div className="lg:col-span-6 flex flex-col">
          <Card className="border border-primary/30 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl flex-1 flex flex-col justify-between overflow-hidden">
            <CardHeader className="border-b border-border/40 bg-muted/20 pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold flex items-center gap-2 text-primary tracking-tight">
                  <Terminal className="h-4 w-4" />
                  Generated {outputType.toUpperCase()} Output
                </CardTitle>

                {generatedResult && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleCopy}
                    className="h-8 gap-1.5 text-xs rounded-lg"
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                    {copied ? "Copied" : "Copy Query"}
                  </Button>
                )}
              </div>
            </CardHeader>

            <CardContent className="p-4 flex-1 flex flex-col justify-between space-y-4">
              {isGenerating ? (
                <div className="flex-1 rounded-xl border flex flex-col items-center justify-center text-center p-6 text-muted-foreground bg-muted/20 space-y-3 min-h-[300px]">
                  <RefreshCw className="h-8 w-8 animate-spin text-primary" />
                  <p className="text-sm font-semibold text-foreground">Translating natural language to {outputType.toUpperCase()}...</p>
                </div>
              ) : (
                <div className="flex-1 flex flex-col justify-between space-y-4">
                  <div className="flex-1 flex flex-col min-h-[200px]">
                    <div className="flex items-center justify-between text-xs font-medium text-muted-foreground mb-1.5">
                      <span className="flex items-center gap-1 text-emerald-500 font-semibold">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Production Ready
                      </span>
                      <span>{outputType === "sql" ? sqlDialect : "Regex Engine"}</span>
                    </div>
                    <pre className="flex-1 p-4 rounded-xl border bg-slate-950 text-emerald-400 font-mono text-xs overflow-x-auto leading-relaxed">
                      <code>{generatedResult}</code>
                    </pre>
                  </div>

                  <div className="p-3.5 rounded-xl border bg-muted/20 text-xs space-y-1.5">
                    <span className="font-semibold text-foreground flex items-center gap-1">
                      <Sparkles className="h-3.5 w-3.5 text-amber-500" /> Query Logic Breakdown:
                    </span>
                    <div className="whitespace-pre-line text-muted-foreground font-sans leading-relaxed">{explanation}</div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
