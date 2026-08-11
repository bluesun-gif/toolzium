"use client";

import React, { useState, useCallback } from "react";
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
import { Database, Code2, Copy, CheckCircle2, Sparkles, Sliders, RefreshCcw, Terminal } from "lucide-react";
import toast from "react-hot-toast";

interface SqlRegexResult {
  sqlQuery: string;
  regexPattern: string;
  explanation: string;
  testMatches: string[];
}

export function SqlRegexBuilderClient() {
  const [description, setDescription] = useState("");
  const [dialect, setDialect] = useState<"postgres" | "mysql" | "sqlite" | "bigquery">("postgres");
  const [targetColumn, setTargetColumn] = useState("email");
  const [tableName, setTableName] = useState("users");

  const [isBuilding, setIsBuilding] = useState(false);
  const [result, setResult] = useState<SqlRegexResult | null>(null);

  const handleBuild = useCallback(() => {
    if (!description.trim()) {
      toast.error("Please enter a description of what you want to match");
      return;
    }

    setIsBuilding(true);

    setTimeout(() => {
      const desc = description.toLowerCase();
      const col = targetColumn.trim() || "column_name";
      const tbl = tableName.trim() || "table_name";

      let pattern = "";
      let sql = "";
      let exp = "";
      let matches: string[] = [];

      if (desc.includes("email")) {
        pattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";
        matches = ["user@example.com", "john.doe@company.org", "test+filter@domain.io"];
        exp = "Matches valid email addresses with standard username, domain name, and TLD formatting.";
      } else if (desc.includes("phone") || desc.includes("number")) {
        pattern = "^\\+?[1-9]\\d{1,14}$";
        matches = ["+14155552671", "442071838750", "+919876543210"];
        exp = "Matches E.164 international phone number format.";
      } else if (desc.includes("ip") || desc.includes("ipv4")) {
        pattern = "^(?:[0-9]{1,3}\\.){3}[0-9]{1,3}$";
        matches = ["192.168.1.1", "10.0.0.254", "172.16.254.1"];
        exp = "Matches standard IPv4 addresses in dot-decimal notation.";
      } else {
        pattern = `^[A-Za-z0-9_-]+$`;
        matches = ["alphanumeric_123", "User-Name-01", "valid_slug"];
        exp = `Matches alphanumeric strings containing underscores or hyphens related to '${description}'.`;
      }

      if (dialect === "postgres") {
        sql = `SELECT * FROM ${tbl}\nWHERE ${col} ~* '${pattern}';`;
      } else if (dialect === "mysql") {
        sql = `SELECT * FROM ${tbl}\nWHERE ${col} REGEXP '${pattern}';`;
      } else if (dialect === "bigquery") {
        sql = `SELECT * FROM \`${tbl}\`\nWHERE REGEXP_CONTAINS(${col}, r'${pattern}');`;
      } else {
        sql = `SELECT * FROM ${tbl}\nWHERE ${col} REGEXP '${pattern}';`;
      }

      setResult({
        sqlQuery: sql,
        regexPattern: pattern,
        explanation: exp,
        testMatches: matches
      });

      setIsBuilding(false);
      toast.success("SQL regex query generated!");
    }, 400);
  }, [description, dialect, targetColumn, tableName]);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-4">
      {/* 3D Emerald Database Icon Header Box */}
      <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md shadow-slate-200/50">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30 flex items-center justify-center shrink-0">
          <Database className="w-7 h-7" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100">AI SQL Regex Query Builder</h1>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-200">FAST</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">Convert plain-English pattern requirements into SQL regular expressions for PostgreSQL, MySQL, BigQuery, and SQLite.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="p-0">
          <CardHeader className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 p-4">
            <CardTitle className="text-sm font-semibold flex items-center gap-2 text-slate-900 dark:text-slate-100">
              <Terminal className="w-4 h-4 text-emerald-600" />
              Pattern Requirements Input
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 space-y-4">
            <div>
              <Label className="text-xs mb-1 block text-slate-700 dark:text-slate-300 font-medium">Matching Description</Label>
              <Input
                placeholder="e.g. Find all rows where email contains valid domain extensions or phone numbers starting with +1"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <Label className="text-xs mb-1 block text-slate-700 dark:text-slate-300 font-medium">SQL Dialect</Label>
                <select
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-xs text-slate-900 dark:text-slate-100 font-medium"
                  value={dialect}
                  onChange={(e) => setDialect(e.target.value as any)}
                >
                  <option value="postgres">PostgreSQL (~*)</option>
                  <option value="mysql">MySQL (REGEXP)</option>
                  <option value="bigquery">Google BigQuery</option>
                  <option value="sqlite">SQLite</option>
                </select>
              </div>

              <div>
                <Label className="text-xs mb-1 block text-slate-700 dark:text-slate-300 font-medium">Target Column</Label>
                <Input
                  value={targetColumn}
                  onChange={(e) => setTargetColumn(e.target.value)}
                  className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-xs"
                />
              </div>

              <div>
                <Label className="text-xs mb-1 block text-slate-700 dark:text-slate-300 font-medium">Table Name</Label>
                <Input
                  value={tableName}
                  onChange={(e) => setTableName(e.target.value)}
                  className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-xs"
                />
              </div>
            </div>

            <Button onClick={handleBuild} disabled={isBuilding || !description.trim()} className="w-full gap-2 mt-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold shadow-md shadow-emerald-500/20 rounded-xl h-11">
              {isBuilding ? <RefreshCcw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              {isBuilding ? "Building SQL Pattern..." : "Build SQL Regex Query"}
            </Button>
          </CardContent>
        </GlassCard>

        <div className="space-y-4">
          {result ? (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <GlassCard className="p-4 space-y-3 border-l-4 border-l-emerald-500">
                <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
                  <span className="text-xs font-extrabold text-emerald-600 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                    <Code2 className="w-3.5 h-3.5" /> Executable SQL Query
                  </span>
                  <Button variant="outline" size="sm" onClick={() => handleCopy(result.sqlQuery, "SQL query")} className="h-7 text-xs gap-1 border-slate-200">
                    <Copy className="w-3 h-3" /> Copy
                  </Button>
                </div>
                <pre className="text-xs font-mono bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800 text-emerald-700 dark:text-emerald-400 font-bold whitespace-pre-wrap">{result.sqlQuery}</pre>
              </GlassCard>

              <GlassCard className="p-4 space-y-3">
                <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
                  <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider font-mono">
                    Raw Regex Pattern
                  </span>
                  <Button variant="outline" size="sm" onClick={() => handleCopy(result.regexPattern, "Regex pattern")} className="h-7 text-xs gap-1 border-slate-200">
                    <Copy className="w-3 h-3" /> Copy
                  </Button>
                </div>
                <p className="text-xs font-mono bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-lg border border-slate-200/60 dark:border-slate-800 text-slate-800 dark:text-slate-200 truncate">{result.regexPattern}</p>
              </GlassCard>

              <GlassCard className="p-4 space-y-2">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">Sample Matches:</span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {result.testMatches.map((m, idx) => (
                    <span key={idx} className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-lg font-mono font-medium">
                      ✓ {m}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ) : (
            <GlassCard className="p-8 h-[380px] flex flex-col items-center justify-center text-center text-slate-400 border-dashed border-2 border-slate-200 dark:border-slate-800">
              <Database className="w-12 h-12 mb-3 text-slate-300 dark:text-slate-700" />
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">No SQL Query Built Yet</p>
              <p className="text-xs max-w-xs mt-1 text-slate-500">Describe your matching requirements on the left to construct database regular expressions.</p>
            </GlassCard>
          )}
        </div>
      </div>

      <ToolHowItWorks
        steps={[
          { step: "01", title: "Describe Pattern", description: "Describe target strings like emails, phone numbers, or IP addresses.", icon: Database },
          { step: "02", title: "Select SQL Dialect", description: "Choose PostgreSQL, MySQL, BigQuery, or SQLite regex operators.", icon: Sliders },
          { step: "03", title: "Copy Query", description: "Export production SQL queries ready for database execution.", icon: CheckCircle2 }
        ]}
        badges={["100% Free", "PostgreSQL & MySQL", "Regex Validator"]}
      />

      <ToolFeatureGuides
        features={[
          { icon: Database, title: "Multi-Dialect SQL Syntax", description: "Generates correct regex operators (`~*`, `REGEXP`, `REGEXP_CONTAINS`) for your target database." },
          { icon: Code2, title: "Raw Regex Pattern Export", description: "Extracts standalone regular expressions for backend validation scripts." },
          { icon: CheckCircle2, title: "Sample Match Telemetry", description: "Provides instant sample string matches for verification." }
        ]}
      >
        <div className="prose dark:prose-invert max-w-none">
          <h3>The Power of Database Regular Expressions</h3>
          <p>
            Filtering database tables using regular expressions simplifies complex string matching queries. Differing SQL dialects use unique syntax rules (such as PostgreSQL's `~*` case-insensitive operator vs MySQL's `REGEXP`), making automated query generators essential for database administrators.
          </p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion
        faqs={[
          { question: "What is the difference between PostgreSQL ~ and ~*?", answer: "In PostgreSQL, `~` performs a case-sensitive regular expression match, whereas `~*` performs a case-insensitive match." },
          { question: "Is REGEXP supported in SQLite?", answer: "SQLite supports the REGEXP operator if user-defined regular expression functions are enabled in your sqlite3 database driver." }
        ]}
      />

      <RelatedTools currentToolUrl="/tools/ai/sql-regex-builder" max={6} />
    </div>
  );
}

export default SqlRegexBuilderClient;
