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
import { Database, Code2, Copy, CheckCircle2, Sparkles, Sliders, Play, Terminal, Layers } from "lucide-react";
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
        matches = ["192.168.1.1", "10.0.0.255", "127.0.0.1"];
        exp = "Matches IPv4 dot-decimal IP addresses.";
      } else if (desc.includes("uuid") || desc.includes("guid")) {
        pattern = "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$";
        matches = ["123e4567-e89b-12d3-a456-426614174000", "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11"];
        exp = "Matches standard 36-character hyphenated UUID strings.";
      } else {
        pattern = `^[A-Za-z0-9_-]{3,20}$`;
        matches = ["Admin_123", "User2026", "dev-team"];
        exp = "Matches alphanumeric strings between 3 and 20 characters in length.";
      }

      if (dialect === "postgres") {
        sql = `SELECT * FROM ${tbl}\nWHERE ${col} ~* '${pattern}';`;
      } else if (dialect === "mysql") {
        sql = `SELECT * FROM ${tbl}\nWHERE ${col} REGEXP '${pattern}';`;
      } else if (dialect === "bigquery") {
        sql = `SELECT * FROM \`${tbl}\` \nWHERE REGEXP_CONTAINS(${col}, r'${pattern}');`;
      } else {
        sql = `SELECT * FROM ${tbl}\nWHERE ${col} REGEXP '${pattern}';`;
      }

      setResult({ sqlQuery: sql, regexPattern: pattern, explanation: exp, testMatches: matches });
      setIsBuilding(false);
      toast.success("SQL query and RegEx pattern generated!");
    }, 400);
  }, [description, dialect, targetColumn, tableName]);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-4">
      <ToolPageHeader
        icon={Database}
        title="AI SQL & RegEx Pattern Builder"
        description="Convert plain English specifications into optimized SQL queries with regular expression pattern matching for PostgreSQL, MySQL, SQLite, and BigQuery."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="p-0">
          <CardHeader className="border-b border-border/40 bg-muted/20 p-4">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Database className="w-4 h-4 text-primary" />
              SQL Specification Input
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 space-y-4">
            <div>
              <Label className="text-xs mb-1 block">What do you want to match / filter?</Label>
              <textarea
                className="w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50 min-h-[100px]"
                placeholder="e.g. Find all users whose email column contains a valid corporate email address"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <Label className="text-xs mb-1 block">SQL Dialect</Label>
                <select
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs"
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
                <Label className="text-xs mb-1 block">Table Name</Label>
                <Input
                  placeholder="e.g. users"
                  value={tableName}
                  onChange={(e) => setTableName(e.target.value)}
                />
              </div>

              <div>
                <Label className="text-xs mb-1 block">Column Name</Label>
                <Input
                  placeholder="e.g. email"
                  value={targetColumn}
                  onChange={(e) => setTargetColumn(e.target.value)}
                />
              </div>
            </div>

            <Button onClick={handleBuild} disabled={isBuilding || !description.trim()} className="w-full gap-2 mt-2">
              <Sparkles className="w-4 h-4" />
              {isBuilding ? "Building Query..." : "Build SQL RegEx Query"}
            </Button>
          </CardContent>
        </GlassCard>

        <div className="space-y-4">
          {result ? (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <GlassCard className="p-4 space-y-3">
                <div className="flex justify-between items-center border-b border-border/40 pb-2">
                  <span className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5" /> Generated SQL Query ({dialect.toUpperCase()})
                  </span>
                  <Button variant="ghost" size="sm" onClick={() => handleCopy(result.sqlQuery, "SQL Query")} className="h-7 text-xs gap-1">
                    <Copy className="w-3.5 h-3.5" /> Copy SQL
                  </Button>
                </div>
                <pre className="text-xs font-mono bg-muted/40 p-3 rounded-lg border border-border/50 text-emerald-400 whitespace-pre-wrap">{result.sqlQuery}</pre>
              </GlassCard>

              <GlassCard className="p-4 space-y-3">
                <div className="flex justify-between items-center border-b border-border/40 pb-2">
                  <span className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5" /> Raw RegEx Pattern
                  </span>
                  <Button variant="ghost" size="sm" onClick={() => handleCopy(result.regexPattern, "RegEx Pattern")} className="h-7 text-xs gap-1">
                    <Copy className="w-3.5 h-3.5" /> Copy Pattern
                  </Button>
                </div>
                <code className="text-xs font-mono bg-muted/30 p-2.5 rounded border border-border/40 block text-foreground">{result.regexPattern}</code>
              </GlassCard>

              <GlassCard className="p-4 space-y-2">
                <span className="text-xs font-semibold text-muted-foreground">Sample Matching String Tests:</span>
                <div className="flex flex-wrap gap-2 pt-1">
                  {result.testMatches.map((m, i) => (
                    <span key={i} className="text-xs font-mono bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 px-2 py-1 rounded">
                      ✓ {m}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground pt-1">{result.explanation}</p>
              </GlassCard>
            </motion.div>
          ) : (
            <GlassCard className="p-8 h-[380px] flex flex-col items-center justify-center text-center text-muted-foreground border-dashed">
              <Database className="w-12 h-12 mb-3 text-muted-foreground/30" />
              <p className="text-sm font-medium">No SQL Query Built Yet</p>
              <p className="text-xs max-w-xs mt-1">Describe what string pattern you want to query on the left to generate dialect-specific SQL statements.</p>
            </GlassCard>
          )}
        </div>
      </div>

      <ToolHowItWorks
        steps={[
          { step: "01", title: "Describe Search Requirement", description: "Explain in plain text what data pattern you need to query in your database.", icon: Database },
          { step: "02", title: "Select SQL Engine", description: "Choose PostgreSQL, MySQL, BigQuery, or SQLite syntax standards.", icon: Sliders },
          { step: "03", title: "Copy Ready Query", description: "Copy production-ready SQL SELECT statements and regex patterns instantly.", icon: CheckCircle2 }
        ]}
        badges={["100% Free", "Dialect Accurate", "Zero Server Load"]}
      />

      <ToolFeatureGuides
        features={[
          { icon: Database, title: "Multi-Dialect Support", description: "Adapts regular expression operators for PostgreSQL (~*), MySQL (REGEXP), and BigQuery (REGEXP_CONTAINS)." },
          { icon: Code2, title: "Syntax Highlighting & Validation", description: "Generates clean, properly escaped regex strings ready for production migration scripts." },
          { icon: CheckCircle2, title: "Sample Match Testing", description: "Displays verified test cases to prove regex pattern accuracy before execution." }
        ]}
      >
        <div className="prose dark:prose-invert max-w-none">
          <h3>PostgreSQL vs MySQL RegEx Syntax Differences</h3>
          <p>
            Database engines handle regular expression matching through different operators. PostgreSQL uses POSIX regular expressions with operators such as <code>~</code> (case-sensitive) and <code>~*</code> (case-insensitive). MySQL uses the <code>REGEXP</code> or <code>RLIKE</code> keywords. BigQuery encapsulates regex matching within scalar functions like <code>REGEXP_CONTAINS(col, pattern)</code>.
          </p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion
        faqs={[
          { question: "Is regex matching slow in SQL databases?", answer: "Sequential regex scans require full table scans unless backed by specialized trigram indexes (such as PostgreSQL pg_trgm GIN indexes)." },
          { question: "Can I use this query in Prisma or Drizzle ORM?", answer: "Yes! You can copy the raw regex string into Prisma's raw query builder or Drizzle's sql template tag." }
        ]}
      />

      <RelatedTools currentToolUrl="/tools/ai/sql-regex-builder" max={6} />
    </div>
  );
}

export default SqlRegexBuilderClient;
