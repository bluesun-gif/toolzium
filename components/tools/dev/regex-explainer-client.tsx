"use client";

import React, { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { Code, Search, FileText, Copy, Play } from "lucide-react";
import toast from "react-hot-toast";

const PRESETS = [
  { label: "Email", value: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$" },
  { label: "Phone (US)", value: "^\\(?([0-9]{3})\\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$" },
  { label: "URL", value: "^https?:\\/\\/[\\w\\-]+(\\.[\\w\\-]+)+[/#?]?.*$" },
  { label: "Date (YYYY-MM-DD)", value: "^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$" },
  { label: "IPv4", value: "^(?:[0-9]{1,3}\\.){3}[0-9]{1,3}$" }
];

export function RegexExplainerClient() {
  const [regex, setRegex] = useState("");
  const [testString, setTestString] = useState("");
  const [explanation, setExplanation] = useState<string[]>([]);
  const [matchResult, setMatchResult] = useState<string>("");

  const analyzeRegex = () => {
    if (!regex) {
      setExplanation([]);
      setMatchResult("");
      return;
    }
    
    const exp = [];
    if (regex.includes("^")) exp.push("'^' matches the start of the string.");
    if (regex.includes("$")) exp.push("'$' matches the end of the string.");
    if (regex.includes("\\d")) exp.push("'\\d' matches any digit.");
    if (regex.includes("\\w")) exp.push("'\\w' matches any word character.");
    if (regex.includes("\\s")) exp.push("'\\s' matches any whitespace character.");
    if (regex.includes("+")) exp.push("'+' matches 1 or more of the preceding token.");
    if (regex.includes("*")) exp.push("'*' matches 0 or more of the preceding token.");
    if (regex.includes("?")) exp.push("'?' matches 0 or 1 of the preceding token.");
    if (regex.includes("|")) exp.push("'|' acts as an OR operator.");
    if (exp.length === 0) exp.push("Literal characters matching.");
    
    setExplanation(exp);

    try {
      const re = new RegExp(regex, 'g');
      const matches = testString.match(re);
      if (matches) {
        setMatchResult("Matches found: " + matches.length);
      } else {
        setMatchResult("No matches found.");
      }
    } catch (e) {
      setMatchResult("Invalid Regular Expression");
    }
  };

  useEffect(() => {
    analyzeRegex();
  }, [regex, testString]);

  const handleReset = () => {
    setRegex("");
    setTestString("");
    setExplanation([]);
    setMatchResult("");
    toast.success("Reset successfully");
  };

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={Code}
        title="Regex Visualizer & Explainer"
        description="Breakdown and explain regular expressions in plain English."
        actions={
          <React.Fragment>
            <ResetButton onClick={handleReset} label="Reset" />
          </React.Fragment>
        }
      />
      <div className="grid md:grid-cols-2 gap-6">
        <GlassCard>
          <CardHeader>
            <CardTitle>Input</CardTitle>
            <CardDescription>Enter regex and test string</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Presets</Label>
              <Select onValueChange={setRegex}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a common regex" />
                </SelectTrigger>
                <SelectContent>
                  {PRESETS.map((p, i) => (
                    <SelectItem key={i + ""} value={p.value}>{p.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Regex Pattern</Label>
              <Input value={regex} onChange={(e) => setRegex(e.target.value)} placeholder="e.g. ^\d+$" />
            </div>
            <div className="space-y-2">
              <Label>Test String</Label>
              <Input value={testString} onChange={(e) => setTestString(e.target.value)} placeholder="Enter string to test..." />
            </div>
          </CardContent>
        </GlassCard>

        <GlassCard>
          <CardHeader>
            <CardTitle>Analysis & Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Explanation</h3>
              {explanation.length > 0 ? (
                <ul className="list-disc pl-5 space-y-1">
                  {explanation.map((exp, i) => (
                    <li key={i + ""}>{exp}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">Enter a regex pattern to see explanation.</p>
              )}
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold mb-2">Match Result</h3>
              <p className={"p-3 rounded-md " + (matchResult.includes("found") && !matchResult.includes("No") ? "bg-green-100 dark:bg-green-900" : "bg-red-100 dark:bg-red-900")}>
                {matchResult || "Waiting for input..."}
              </p>
            </div>
            <CopyButton getText={() => regex} label="Copy Pattern" />
          </CardContent>
        </GlassCard>
      </div>
    </div>
  );
}
