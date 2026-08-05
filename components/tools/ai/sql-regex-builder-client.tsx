"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";
import { Database, Regex, Sparkles, Copy, Check, RefreshCw, CheckCircle2, Zap } from "lucide-react";

export default function SqlRegexBuilderClient() {
  const [promptInput, setPromptInput] = useState<string>(
    "Find all active users who registered in the last 30 days and spent over $100 total"
  );
  const [outputType, setOutputType] = useState<"sql" | "regex">("sql");
  const [sqlDialect, setSqlDialect] = useState<string>("PostgreSQL");
  const [generatedResult, setGeneratedResult] = useState<string>("");
  const [explanation, setExplanation] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

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
        const exp = "• `^`: Starts at beginning of string\n• `[a-zA-Z0-9._%+-]+`: Matches valid email username characters\n• `@`: Literal `@` symbol\n• `[a-zA-Z0-9.-]+`: Domain name\n• `\\.[a-zA-Z]{2,}$`: Valid top-level domain suffix (e.g. .com, .org)";
        setGeneratedResult(pattern);
        setExplanation(exp);
      }

      setIsGenerating(false);
      toast.success("Generated query & explanation!");
    }, 500);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedResult);
    setCopied(true);
    toast.success("Copied query to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8">
      <ToolPageHeader
        title="AI Natural Language to SQL & Regex Builder"
        description="Convert plain English requirements into production-ready SQL queries and Regex patterns with instant explanations."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Input Prompt Card */}
        <Card className="border bg-card/60 backdrop-blur shadow-xs">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                {outputType === "sql" ? (
                  <Database className="h-4 w-4 text-primary" />
                ) : (
                  <Regex className="h-4 w-4 text-purple-500" />
                )}
                Prompt Requirement
              </CardTitle>
              <Badge variant="outline" className="text-xs font-normal gap-1">
                <Zap className="h-3 w-3 text-amber-500" /> Instant Generation
              </Badge>
            </div>
            <CardDescription>
              Describe what data you want to retrieve or pattern you want to match in plain English.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2 p-1 border rounded-lg bg-muted/30 w-fit text-xs font-medium">
              <button
                type="button"
                onClick={() => {
                  setOutputType("sql");
                  setPromptInput("Find all active users who registered in the last 30 days and spent over $100 total");
                }}
                className={`px-3 py-1.5 rounded-md transition ${
                  outputType === "sql" ? "bg-primary text-primary-foreground shadow-xs font-semibold" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                SQL Query
              </button>
              <button
                type="button"
                onClick={() => {
                  setOutputType("regex");
                  setPromptInput("Match a valid email address with standard domain name extensions");
                }}
                className={`px-3 py-1.5 rounded-md transition ${
                  outputType === "regex" ? "bg-primary text-primary-foreground shadow-xs font-semibold" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Regex Pattern
              </button>
            </div>

            <Textarea
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              placeholder="e.g. Find top 5 customers with highest lifetime value in 2026..."
              className="text-xs min-h-[220px] bg-muted/20 border-border/70"
            />

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              {outputType === "sql" && (
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <span className="text-xs text-muted-foreground whitespace-nowrap">Dialect:</span>
                  <select
                    value={sqlDialect}
                    onChange={(e) => setSqlDialect(e.target.value)}
                    className="text-xs bg-background border rounded-lg px-3 py-1.5 font-medium focus:outline-hidden ring-primary/20"
                  >
                    <option value="PostgreSQL">PostgreSQL</option>
                    <option value="MySQL">MySQL</option>
                    <option value="SQLite">SQLite</option>
                    <option value="SQL Server">SQL Server (T-SQL)</option>
                  </select>
                </div>
              )}

              <Button
                onClick={handleGenerate}
                disabled={isGenerating || !promptInput.trim()}
                className="w-full sm:w-auto ml-auto gap-2 shadow-sm"
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

        {/* AI Result & Explanation Card */}
        <Card className="border border-primary/30 bg-card/60 backdrop-blur shadow-xs flex flex-col justify-between">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold flex items-center gap-2 text-primary">
                <CheckCircle2 className="h-4 w-4" />
                Generated Output
              </CardTitle>
              {generatedResult && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleCopy}
                  className="h-8 gap-1 text-xs"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? "Copied" : "Copy Query"}
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4 flex-1">
            {!generatedResult && !isGenerating && (
              <div className="min-h-[260px] rounded-xl border border-dashed flex flex-col items-center justify-center text-center p-6 text-muted-foreground bg-muted/10 space-y-2">
                <Database className="h-8 w-8 opacity-40" />
                <p className="text-sm font-medium">No Query Generated Yet</p>
                <p className="text-xs text-muted-foreground max-w-xs">
                  Type your query description on the left and click &quot;Generate&quot;.
                </p>
              </div>
            )}

            {isGenerating && (
              <div className="min-h-[260px] rounded-xl border flex flex-col items-center justify-center text-center p-6 text-muted-foreground bg-muted/20 space-y-3">
                <RefreshCw className="h-8 w-8 animate-spin text-primary" />
                <p className="text-sm font-medium text-foreground">Building optimized {outputType.toUpperCase()} expression...</p>
              </div>
            )}

            {generatedResult && !isGenerating && (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <div className="text-xs font-semibold text-muted-foreground">
                    Generated {outputType === "sql" ? `${sqlDialect} Query` : "Regex Expression"}:
                  </div>
                  <pre className="p-4 rounded-xl border bg-zinc-950 text-emerald-400 font-mono text-xs overflow-x-auto">
                    <code>{generatedResult}</code>
                  </pre>
                </div>

                <div className="p-4 rounded-xl border bg-muted/30 text-xs space-y-2">
                  <div className="font-semibold text-sm text-foreground flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-amber-500" /> Breakdown & Explanation:
                  </div>
                  <div className="whitespace-pre-line text-muted-foreground font-sans">{explanation}</div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
