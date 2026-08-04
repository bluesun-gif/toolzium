"use client";

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
import { Database, Code, Copy, Trash2, FileCode } from "lucide-react";
import toast from "react-hot-toast";

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
    
    let sql = rawSql.replace(/\s+/g, " ");
    const keywords = [
      "SELECT", "FROM", "WHERE", "AND", "OR", "INSERT INTO", "VALUES", 
      "UPDATE", "SET", "DELETE FROM", "CREATE TABLE", "ALTER TABLE", 
      "DROP TABLE", "INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "ON", 
      "GROUP BY", "ORDER BY", "HAVING", "LIMIT", "DESC", "ASC"
    ];

    const indent = " ".repeat(parseInt(indentSize));
    
    keywords.forEach(kw => {
      const regex = new RegExp("\\b" + kw + "\\b", "gi");
      sql = sql.replace(regex, (match) => {
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
    <div className="space-y-6">
      <ToolPageHeader
        icon={Database}
        title="SQL Formatter"
        description="Format and beautify your SQL queries."
        actions={
          <React.Fragment>
            <ActionButton onClick={loadSample} icon={FileCode} label="Sample SQL" variant="outline" size="default" />
            <ResetButton onClick={clearAll} label="Clear" />
          </React.Fragment>
        }
      />
      
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
              <textarea
                value={rawSql}
                onChange={(e) => setRawSql(e.target.value)}
                className="w-full h-40 p-3 rounded-md border bg-background text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="SELECT * FROM table..."
              />
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
    </div>
  );
}
