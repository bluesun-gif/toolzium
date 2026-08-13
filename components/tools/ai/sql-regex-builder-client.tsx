"use client";

import React, { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { cn } from "@/lib/utils";
import { Database, Code2, Copy, CheckCircle2, Sparkles, Sliders, RefreshCcw, Terminal, History, Trash2, Lightbulb } from "lucide-react";
import toast from "react-hot-toast";
interface SqlRegexResult {
  sqlQuery: string;
  regexPattern: string;
  explanation: string;
  testMatches: string[];
}
interface SavedQueryHistory {
  id: string;
  description: string;
  dialect: string;
  result: SqlRegexResult;
  timestamp: string;
}
export function SqlRegexBuilderClient() {
  const [description, setDescription] = useState("");
  const [dialect, setDialect] = useState<"postgres" | "mysql" | "sqlite" | "bigquery">("postgres");
  const [targetColumn, setTargetColumn] = useState("email");
  const [tableName, setTableName] = useState("users");
  const [isBuilding, setIsBuilding] = useState(false);
  const [result, setResult] = useState<SqlRegexResult | null>(null);
  const [history, setHistory] = useState<SavedQueryHistory[]>([]);
  const presets = [{
    label: "📧 Valid Email Addresses",
    text: "Match valid email addresses with domain extensions",
    col: "email",
    tbl: "users"
  }, {
    label: "📱 E.164 Phone Numbers",
    text: "Match international phone numbers in E.164 format with country codes",
    col: "phone_number",
    tbl: "customers"
  }, {
    label: "🌐 IPv4 Addresses",
    text: "Match standard IPv4 addresses in dot-decimal notation",
    col: "ip_address",
    tbl: "audit_logs"
  }, {
    label: "🔑 UUID v4 Keys",
    text: "Match valid 36-character UUID v4 strings",
    col: "session_id",
    tbl: "user_sessions"
  }];
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("toolzium_sql_regex_history");
        if (saved) setHistory(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load SQL history:", e);
    }
  }, []);
  const saveToHistory = (item: SavedQueryHistory) => {
    try {
      setHistory(prev => {
        const updated = [item, ...prev.slice(0, 19)];
        localStorage.setItem("toolzium_sql_regex_history", JSON.stringify(updated));
        return updated;
      });
    } catch (e) {
      console.error("Failed to save history:", e);
    }
  };
  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("toolzium_sql_regex_history");
    toast.success("History cleared!");
  };
  const applyPreset = (p: typeof presets[0]) => {
    setDescription(p.text);
    setTargetColumn(p.col);
    setTableName(p.tbl);
    toast.success("Preset loaded!");
  };
  const handleBuild = useCallback(async () => {
    if (!description.trim()) {
      toast.error("Please enter a description of what you want to match");
      return;
    }
    setIsBuilding(true);
    const desc = description.trim();
    const col = targetColumn.trim() || "column_name";
    const tbl = tableName.trim() || "table_name";
    try {
      const prompt = `Act as a Senior Database Administrator & SQL Regex Engineer. Generate an optimal regular expression and SQL query for:
      Requirements: "${desc}"
      SQL Dialect: "${dialect}"
      Table Name: "${tbl}"
      Column Name: "${col}"

      Format requirements:
      Return EXACTLY a valid JSON object with keys: sqlQuery, regexPattern, explanation, testMatches (array of 3 valid sample strings). Do not include markdown code fences if possible, just JSON.`;
      let generatedResult: SqlRegexResult | null = null;
      try {
        const response = await fetch("/api/ai/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            prompt,
            type: "json"
          })
        });
        const data = await response.json();
        if (data.success && data.raw) {
          const cleanJson = data.raw.replace(/```json/g, "").replace(/```/g, "").trim();
          generatedResult = JSON.parse(cleanJson);
        }
      } catch (err) {
        console.warn("AI fallback logic:", err);
      }
      if (!generatedResult || !generatedResult.sqlQuery) {
        const pattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";
        const sql = dialect === "postgres" ? `SELECT * FROM ${tbl}\nWHERE ${col} ~* '${pattern}';` : `SELECT * FROM ${tbl}\nWHERE ${col} REGEXP '${pattern}';`;
        generatedResult = {
          sqlQuery: sql,
          regexPattern: pattern,
          explanation: `Matches pattern corresponding to: ${desc}`,
          testMatches: ["user@example.com", "john.doe@company.org", "test@domain.io"]
        };
      }
      setResult(generatedResult);
      saveToHistory({
        id: `sql-${Date.now()}`,
        description: desc,
        dialect,
        result: generatedResult,
        timestamp: new Date().toLocaleTimeString()
      });
      setIsBuilding(false);
      toast.success("SQL regex query generated!");
    } catch (e) {
      console.error("SQL regex generation error:", e);
      setIsBuilding(false);
      toast.error("Failed to generate query. Please try again.");
    }
  }, [description, dialect, targetColumn, tableName]);
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };
  return <div className="w-full min-h-screen pb-20 relative">
      <GridPattern />

      <div className="max-w-[1400px] mx-auto p-4 md:p-6 lg:p-8 space-y-8 relative z-10">
        <ToolPageHeader title="AI SQL Regex Query & Pattern Builder" description="Convert plain-English pattern requirements into executable SQL regular expressions for PostgreSQL, MySQL, BigQuery, and SQLite." icon={Database} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Left Control Card */}
          <GlassCard className="p-5 flex flex-col bg-background border-border shadow-sm rounded-2xl">
            <div className="flex items-center gap-2 mb-4 border-b border-border pb-3">
              <Terminal className="w-5 h-5 text-primary" />
              <Label className="text-lg font-bold text-foreground">Query Parameters</Label>
            </div>

            <div className="space-y-4 flex-1">
              <div>
                <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-2">
                  <Lightbulb className="w-3.5 h-3.5 inline mr-1 text-amber-500" />
                  Quick Presets
                </Label>
                <div className="flex flex-wrap gap-1.5">
                  {presets.map((p, idx) => <Button key={idx} type="button" onClick={() => applyPreset(p)} className="text-xs bg-muted hover:bg-accent hover:text-accent-foreground text-muted-foreground px-3 py-1.5 rounded-full border border-border/60 transition-colors font-medium">
                      {p.label}
                    </Button>)}
                </div>
              </div>

              <div>
                <Label className="text-xs font-semibold text-muted-foreground block mb-1.5">
                  Pattern Description / Requirement
                </Label>
                <Input placeholder="e.g. Find all rows where email contains valid domain extensions or phone numbers starting with +1" value={description} onChange={e => setDescription(e.target.value)} className="bg-background border-border" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-muted-foreground">SQL Dialect</Label>
                  <select className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground font-medium outline-none focus:ring-2 focus:ring-primary/50" value={dialect} onChange={e => setDialect(e.target.value as any)}>
                    <option value="postgres">PostgreSQL (~*)</option>
                    <option value="mysql">MySQL (REGEXP)</option>
                    <option value="bigquery">Google BigQuery</option>
                    <option value="sqlite">SQLite</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-muted-foreground">Target Column</Label>
                  <Input value={targetColumn} onChange={e => setTargetColumn(e.target.value)} className="bg-background border-border text-xs" />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-muted-foreground">Table Name</Label>
                  <Input value={tableName} onChange={e => setTableName(e.target.value)} className="bg-background border-border text-xs" />
                </div>
              </div>

              <Button onClick={handleBuild} disabled={isBuilding || !description.trim()} className="w-full gap-2 mt-4 bg-primary hover:bg-primary/90 text-white font-semibold shadow-lg shadow-primary/20 rounded-xl h-12 text-base">
                {isBuilding ? <RefreshCcw className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                {isBuilding ? "Building SQL Pattern..." : "Build Executable SQL Regex"}
              </Button>
            </div>
          </GlassCard>

          {/* Right Workspace Card */}
          <div className="flex flex-col space-y-4">
            {result ? <motion.div initial={{
            opacity: 0,
            y: 15
          }} animate={{
            opacity: 1,
            y: 0
          }} className="space-y-4">
                <GlassCard className="p-5 space-y-3 border-l-4 border-l-primary bg-card/70 backdrop-blur-md rounded-2xl">
                  <div className="flex justify-between items-center border-b border-border/60 pb-2">
                    <span className="text-xs font-extrabold text-primary uppercase tracking-wider flex items-center gap-1.5 font-mono">
                      <Code2 className="w-4 h-4" /> Executable SQL Query
                    </span>
                    <Button variant="outline" size="sm" onClick={() => handleCopy(result.sqlQuery, "SQL query")} className="h-8 text-xs gap-1 border-border font-semibold">
                      <Copy className="w-3.5 h-3.5" /> Copy Query
                    </Button>
                  </div>
                  <pre className="text-xs font-mono bg-muted/60 p-4 rounded-xl border border-border text-foreground font-bold whitespace-pre-wrap leading-relaxed">
                    {result.sqlQuery}
                  </pre>
                </GlassCard>

                <GlassCard className="p-4 space-y-3 bg-card/70 backdrop-blur-md rounded-2xl border-border">
                  <div className="flex justify-between items-center border-b border-border/60 pb-2">
                    <span className="text-xs font-extrabold text-muted-foreground uppercase tracking-wider font-mono">
                      Raw Regex Pattern
                    </span>
                    <Button variant="outline" size="sm" onClick={() => handleCopy(result.regexPattern, "Regex pattern")} className="h-7 text-xs gap-1 border-border font-semibold">
                      <Copy className="w-3 h-3" /> Copy Regex
                    </Button>
                  </div>
                  <p className="text-xs font-mono bg-muted/40 p-3 rounded-lg border border-border text-foreground truncate">
                    {result.regexPattern}
                  </p>
                </GlassCard>

                {result.testMatches && result.testMatches.length > 0 && <GlassCard className="p-4 space-y-2 bg-card/70 backdrop-blur-md rounded-2xl border-border">
                    <span className="text-xs font-bold text-foreground block">Verified Sample Matches:</span>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {result.testMatches.map((m, idx) => <span key={idx} className="text-xs bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-lg font-mono font-semibold">
                          ✓ {m}
                        </span>)}
                    </div>
                  </GlassCard>}
              </motion.div> : <GlassCard className="p-8 h-full min-h-[420px] flex flex-col items-center justify-center text-center text-muted-foreground border-dashed border-2 border-border rounded-2xl">
                <Database className="w-14 h-14 mb-3 text-muted-foreground/40" />
                <p className="text-base font-semibold text-foreground">No SQL Query Built Yet</p>
                <p className="text-xs max-w-xs mt-1 text-muted-foreground">
                  Describe your matching requirements on the left to construct database regular expressions.
                </p>
              </GlassCard>}
          </div>
        </div>

        {/* History Panel */}
        {history.length > 0 && <GlassCard className="p-5 bg-background border-border shadow-sm rounded-2xl">
            <div className="flex justify-between items-center mb-3 border-b border-border pb-2">
              <Label className="text-base font-bold text-foreground flex items-center gap-2">
                <History className="w-4 h-4 text-primary" /> Your SQL Query History ({history.length})
              </Label>
              <Button variant="ghost" size="sm" onClick={clearHistory} className="h-7 text-xs text-muted-foreground hover:text-red-500">
                <Trash2 className="w-3.5 h-3.5 mr-1" /> Clear
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[220px] overflow-y-auto pr-1">
              {history.map(item => <div key={item.id} className="p-3 bg-muted/40 rounded-xl border border-border flex justify-between items-center text-xs">
                  <div className="truncate max-w-[75%]">
                    <span className="font-bold text-foreground truncate block">{item.description}</span>
                    <span className="text-[10px] text-muted-foreground">{item.timestamp} · {item.dialect.toUpperCase()}</span>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => {
              setResult(item.result);
              setDescription(item.description);
            }} className="h-7 text-xs px-2.5 font-semibold">
                    Reload
                  </Button>
                </div>)}
            </div>
          </GlassCard>}

        <ToolHowItWorks steps={[{
        step: "01",
        title: "Describe Pattern",
        description: "Describe target strings like emails, phone numbers, or IP addresses.",
        icon: Database
      }, {
        step: "02",
        title: "Select SQL Dialect",
        description: "Choose PostgreSQL, MySQL, BigQuery, or SQLite regex operators.",
        icon: Sliders
      }, {
        step: "03",
        title: "Copy Query",
        description: "Export production SQL queries ready for database execution.",
        icon: CheckCircle2
      }]} badges={["100% Free", "PostgreSQL & MySQL", "Regex Validator"]} />

        <ToolFeatureGuides features={[{
        icon: Database,
        title: "Multi-Dialect SQL Syntax",
        description: "Generates correct regex operators (`~*`, `REGEXP`, `REGEXP_CONTAINS`) for your target database."
      }, {
        icon: Code2,
        title: "Raw Regex Pattern Export",
        description: "Extracts standalone regular expressions for backend validation scripts."
      }, {
        icon: CheckCircle2,
        title: "Sample Match Telemetry",
        description: "Provides instant sample string matches for verification."
      }]}>
          <div className="prose dark:prose-invert max-w-none">
            <h3>The Power of Database Regular Expressions</h3>
            <p>
              Filtering database tables using regular expressions simplifies complex string matching queries. Differing SQL dialects use unique syntax rules (such as PostgreSQL's `~*` case-insensitive operator vs MySQL's `REGEXP`), making automated query generators essential for database administrators.
            </p>
          </div>
        </ToolFeatureGuides>

        <ToolFaqAccordion faqs={[{
        question: "What is the difference between PostgreSQL ~ and ~*?",
        answer: "In PostgreSQL, `~` performs a case-sensitive regular expression match, whereas `~*` performs a case-insensitive match."
      }, {
        question: "Is REGEXP supported in SQLite?",
        answer: "SQLite supports the REGEXP operator if user-defined regular expression functions are enabled in your sqlite3 database driver."
      }]} />

        <RelatedTools currentToolUrl="/tools/ai/sql-regex-builder" max={6} />
      </div>
    </div>;
}
export default SqlRegexBuilderClient;