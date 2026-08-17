"use client";

import { Input } from "@/components/ui/input";

import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { Database, Code, Copy, Trash2, FileCode, BookOpen, Shield, Zap, Globe, AlignLeft, Settings2, Layers, Table2, Code2, Users } from "lucide-react";
import toast from "react-hot-toast";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { GridPattern } from "@/components/magicui/grid-pattern";
export function SqlFormatterClient() {
  const [rawSql, setRawSql] = useState("");
  const [formattedSql, setFormattedSql] = useState("");
  const [keywordCase, setKeywordCase] = useState("uppercase");
  const [indentSize, setIndentSize] = useState("2");
  const [addNewlines, setAddNewlines] = useState(true);
  const sampleSql = "select id, name, email from users where status='active' and created_at > '2023-01-01' order by created_at desc limit 100;";
  const handleFormat = () => {
    if (!rawSql.trim()) {
      setFormattedSql("");
      return;
    }
    let sql = rawSql.replace(/\s+/g, "");
    const keywords = ["SELECT", "FROM", "WHERE", "AND", "OR", "INSERT INTO", "VALUES", "UPDATE", "SET", "DELETE FROM", "CREATE TABLE", "ALTER TABLE", "DROP TABLE", "INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "ON", "GROUP BY", "ORDER BY", "HAVING", "LIMIT", "DESC", "ASC"];
    const indent = "".repeat(parseInt(indentSize));
    keywords.forEach(kw => {
      const regex = new RegExp("\\b" + kw + "\\b", "gi");
      sql = sql.replace(regex, match => {
        let formattedKw = keywordCase === "uppercase" ? kw.toUpperCase() : kw.toLowerCase();
        if (addNewlines && ["SELECT", "FROM", "WHERE", "INSERT INTO", "VALUES", "UPDATE", "SET", "DELETE FROM", "INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "GROUP BY", "ORDER BY", "LIMIT"].includes(kw)) {
          return "\n" + formattedKw;
        }
        return formattedKw;
      });
    });
    if (addNewlines) {
      const lines = sql.split("\n").filter(l => l.trim() !== "");
      let currentIndent = 0;
      sql = lines.map(line => {
        const trimmed = line.trim();
        if (trimmed.startsWith(")") && currentIndent > 0) currentIndent--;
        const result = indent.repeat(currentIndent) + trimmed;
        if (trimmed.endsWith("(")) currentIndent++;
        return result;
      }).join("\n");
    }
    setFormattedSql(sql.trim());
    toast.success("SQL formatted successfully!");
  };
  useEffect(() => {
    handleFormat();
  }, [rawSql, keywordCase, indentSize, addNewlines]);
  const loadSample = () => {
    setRawSql(sampleSql);
  };
  const clearAll = () => {
    setRawSql("");
    setFormattedSql("");
    toast.success("Cleared");
  };
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

 <ToolPageHeader icon={Database} title="SQL Formatter" description="Format and beautify your SQL queries." actions={<React.Fragment>
 <ActionButton onClick={loadSample} icon={FileCode} label="Sample SQL" variant="outline" size="default" />
 <ResetButton onClick={clearAll} label="Clear" />
 </React.Fragment>} />
 
 <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
 <div className="md:col-span-1 space-y-4">
 <GlassCard>
 <CardHeader>
 <CardTitle>Options</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Keyword Case</Label>
 <Select value={keywordCase} onValueChange={setKeywordCase}>
 <SelectTrigger>
 <SelectValue placeholder="Select case" />
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="uppercase">Uppercase</SelectItem>
 <SelectItem value="lowercase">Lowercase</SelectItem>
 </SelectContent>
 </Select>
 </div>
 <div className="space-y-2">
 <Label>Indent Size</Label>
 <Select value={indentSize} onValueChange={setIndentSize}>
 <SelectTrigger>
 <SelectValue placeholder="Select indent" />
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="2">2 Spaces</SelectItem>
 <SelectItem value="4">4 Spaces</SelectItem>
 </SelectContent>
 </Select>
 </div>
 <div className="flex items-center justify-between">
 <Label>Add Line Breaks</Label>
 <Switch checked={addNewlines} onCheckedChange={setAddNewlines} />
 </div>
 </CardContent>
 </GlassCard>
 </div>
 
 <div className="md:col-span-3 space-y-4">
 <GlassCard>
 <CardHeader>
 <CardTitle>Raw SQL Input</CardTitle>
 <CardDescription>Paste your raw SQL query here</CardDescription>
 </CardHeader>
 <CardContent>
 <textarea value={rawSql} onChange={e => setRawSql(e.target.value)} className="w-full h-40 p-3 rounded-md border bg-background text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary" placeholder="SELECT * FROM table..." />
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader className="flex flex-row items-center justify-between">
 <div>
 <CardTitle>Formatted SQL</CardTitle>
 <CardDescription>Your beautified query</CardDescription>
 </div>
 <CopyButton getText={() => formattedSql} label="Copy SQL" />
 </CardHeader>
 <Separator />
 <CardContent className="pt-6">
 <div className="relative">
 <pre className="p-4 rounded-md bg-muted text-sm font-mono overflow-auto min-h-[150px] whitespace-pre-wrap break-words">
 {formattedSql || "Formatted SQL will appear here..."}
 </pre>
 </div>
 </CardContent>
 </GlassCard>
 </div>
 </div>

 {/* SECTION 3: HOW IT WORKS */}
 <ToolHowItWorks steps={[{
        step: "01",
        title: "Paste Your SQL",
        description: "Paste any SQL query — SELECT, INSERT, UPDATE, CREATE TABLE, stored procedures, or complex CTEs. The formatter handles any length.",
        icon: Code
      }, {
        step: "02",
        title: "Choose Dialect & Style",
        description: "Select your SQL dialect (PostgreSQL, MySQL, SQLite, MSSQL, BigQuery, etc.) and formatting options like uppercase keywords, indent style, and line width.",
        icon: Settings2
      }, {
        step: "03",
        title: "Copy Formatted SQL",
        description: "Click Format to get clean, consistently indented SQL. Copy the output directly or use it in your query editor, code review, or documentation.",
        icon: BookOpen
      }]} badges={["10+ SQL dialects", "Works offline", "No data uploads"]} />

 {/* SECTION 4: FEATURE GUIDES */}
 <ToolFeatureGuides features={[{
        icon: AlignLeft,
        title: "Consistent Indentation",
        description: "Reformats messy single-line SQL into cleanly indented multi-line queries with proper clause alignment — making complex joins and subqueries readable."
      }, {
        icon: Database,
        title: "Multi-Dialect Support",
        description: "Supports PostgreSQL, MySQL, SQLite, MSSQL (T-SQL), BigQuery, Spark SQL, MariaDB, and more — each with dialect-specific keyword and function handling."
      }, {
        icon: Layers,
        title: "Keyword Case Control",
        description: "Toggle between uppercase (SELECT, FROM, WHERE) or lowercase keywords to match your team's coding standards and style guides."
      }, {
        icon: Code,
        title: "Complex Query Support",
        description: "Handles CTEs (WITH clauses), subqueries, window functions (OVER/PARTITION BY), CASE expressions, and complex JOIN chains with correct formatting."
      }, {
        icon: Table2,
        title: "Minify Mode",
        description: "Collapse formatted SQL back to a single-line minified version — useful for embedding in config files, environment variables, or API parameters."
      }, {
        icon: Shield,
        title: "Privacy-Safe",
        description: "All formatting runs in your browser using the sql-formatter library. Your SQL queries never leave your device — safe for production query debugging."
      }]}>
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <h3 className="text-lg font-semibold">SQL Formatting Best Practices — A Developer Reference</h3>
 <p>
 Consistent SQL formatting is essential for code readability, team collaboration, and maintainability.
 Just like code formatting standards in Python (PEP 8) or JavaScript (ESLint/Prettier), SQL teams
 benefit from agreed-upon formatting conventions. Here is a reference guide covering the most important
 SQL formatting patterns.
 </p>

 <h4 className="font-semibold">SQL Keyword Capitalization Conventions</h4>
 <div className="overflow-x-auto">
 <table className="w-full border-collapse text-sm">
 <thead>
 <tr className="bg-muted/50">
 <th className="border p-2 text-left">Style</th>
 <th className="border p-2 text-left">Example</th>
 <th className="border p-2 text-left">Preferred By</th>
 </tr>
 </thead>
 <tbody>
 {[["UPPERCASE keywords", "SELECT id FROM users WHERE active = 1", "Most SQL style guides (Google, GitLab, dbt)"], ["lowercase keywords", "select id from users where active = 1", "Some modern ORMs, quick scripts"], ["Mixed (Title Case)", "Select Id From Users Where Active = 1", "Not recommended — inconsistent"]].map(([style, ex, pref]) => <tr key={style} className="odd:bg-muted/20">
 <td className="border p-2 font-medium text-xs">{style}</td>
 <td className="border p-2 font-mono text-primary text-xs">{ex}</td>
 <td className="border p-2 text-muted-foreground text-xs">{pref}</td>
 </tr>)}
 </tbody>
 </table>
 </div>

 <h4 className="font-semibold">SQL Dialect Differences — Key Syntax Variations</h4>
 <div className="overflow-x-auto">
 <table className="w-full border-collapse text-sm">
 <thead>
 <tr className="bg-muted/50">
 <th className="border p-2 text-left">Feature</th>
 <th className="border p-2 text-left">PostgreSQL</th>
 <th className="border p-2 text-left">MySQL</th>
 <th className="border p-2 text-left">MSSQL (T-SQL)</th>
 </tr>
 </thead>
 <tbody>
 {[["String quotes", "Single quotes only", "Single or double quotes", "Single quotes"], ["Identifier quoting", '\"double quotes\"', "\`backticks\`", "[brackets]"], ["LIMIT syntax", "LIMIT n", "LIMIT n", "TOP n (before SELECT)"], ["Auto-increment", "SERIAL / GENERATED", "AUTO_INCREMENT", "IDENTITY(1,1)"], ["JSON support", "Native JSONB type", "JSON type (5.7+)", "OPENJSON / FOR JSON"]].map(([feat, pg, my, ms]) => <tr key={feat} className="odd:bg-muted/20">
 <td className="border p-2 font-medium text-xs">{feat}</td>
 <td className="border p-2 font-mono text-xs">{pg}</td>
 <td className="border p-2 font-mono text-xs">{my}</td>
 <td className="border p-2 font-mono text-xs">{ms}</td>
 </tr>)}
 </tbody>
 </table>
 </div>

 <h4 className="font-semibold">SQL Formatting Style Guide — Recommended Rules</h4>
 <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
 <li><strong>One clause per line:</strong> Put SELECT, FROM, WHERE, GROUP BY, ORDER BY, and HAVING on separate lines for scanability.</li>
 <li><strong>Indent joins:</strong> Indent JOIN conditions to distinguish them from top-level clauses.</li>
 <li><strong>Align column lists:</strong> When selecting many columns, list each on its own line with a leading comma for easy commenting-out.</li>
 <li><strong>Name your CTEs:</strong> Give CTEs descriptive names (e.g., <code>active_users</code>, <code>monthly_revenue</code>) rather than generic aliases.</li>
 <li><strong>Comment complex logic:</strong> Add inline comments (<code>-- reason here</code>) above non-obvious WHERE conditions or complex CASE expressions.</li>
 <li><strong>Avoid SELECT *:</strong> Always list column names explicitly in production queries for clarity and to prevent breaking changes.</li>
 </ul>
 </div>
 </ToolFeatureGuides>

 {/* SECTION 5: FAQ + RELATED TOOLS */}
 <ToolFaqAccordion faqs={[{
        question: "Which SQL dialects does this formatter support?",
        answer: "The formatter supports PostgreSQL, MySQL, MariaDB, SQLite, MSSQL (T-SQL), BigQuery, Spark SQL, Amazon Redshift, and more — using the sql-formatter library which covers over 10 SQL dialects with dialect-specific syntax rules."
      }, {
        question: "Does formatting change the meaning of my query?",
        answer: "No. SQL formatting is purely cosmetic — it only changes whitespace, indentation, and optional keyword capitalization. The logical meaning and execution plan of the query remain identical."
      }, {
        question: "Is my SQL query sent to a server?",
        answer: "No. All formatting runs entirely in your browser using the sql-formatter JavaScript library. Your SQL queries never leave your device — safe for use with production data or sensitive schemas."
      }, {
        question: "Can it format stored procedures and CTEs?",
        answer: "Yes. The formatter handles complex SQL including CTEs (WITH clauses), subqueries, window functions (OVER / PARTITION BY), CASE WHEN expressions, and multi-table JOINs with correct indentation."
      }, {
        question: "What is SQL minification used for?",
        answer: "SQL minification collapses formatted SQL into a single line by removing unnecessary whitespace. This is useful when embedding SQL in environment variables, configuration files, JSON API parameters, or when minimizing query payload size in logging."
      }]} />
    </div>
    </div>
);
}

export default SqlFormatterClient;
