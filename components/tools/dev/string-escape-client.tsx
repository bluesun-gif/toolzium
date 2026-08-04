"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { Code, ArrowRight, ArrowLeft, Trash2, ArrowLeftRight } from "lucide-react";
import { toast } from "react-hot-toast";

type Format = "html" | "url" | "js" | "json" | "xml" | "sql" | "css" | "base64";

export function StringEscapeClient() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [format, setFormat] = useState<Format>("html");

  const handleEscape = () => {
    try {
      let result = "";
      switch (format) {
        case "html":
          result = input.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
          break;
        case "url":
          result = encodeURIComponent(input);
          break;
        case "js":
          result = input.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/"/g, '\\"').replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t");
          break;
        case "json":
          result = JSON.stringify(input).slice(1, -1);
          break;
        case "xml":
          result = input.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
          break;
        case "sql":
          result = input.replace(/'/g, "''");
          break;
        case "css":
          result = input.replace(/[^\w]/g, (c) => "\\" + c.charCodeAt(0).toString(16) + " ");
          break;
        case "base64":
          result = btoa(unescape(encodeURIComponent(input)));
          break;
      }
      setOutput(result);
      toast.success("Escaped successfully");
    } catch (e) {
      toast.error("Error escaping string");
    }
  };

  const handleUnescape = () => {
    try {
      let result = "";
      switch (format) {
        case "html":
          const txt = document.createElement("textarea");
          txt.innerHTML = input;
          result = txt.value;
          break;
        case "url":
          result = decodeURIComponent(input);
          break;
        case "js":
          result = input.replace(/\\'/g, "'").replace(/\\"/g, '"').replace(/\\n/g, "\n").replace(/\\r/g, "\r").replace(/\\t/g, "\t").replace(/\\\\/g, "\\");
          break;
        case "json":
          result = JSON.parse('"' + input + '"');
          break;
        case "xml":
          result = input.replace(/&apos;/g, "'").replace(/&quot;/g, '"').replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&amp;/g, "&");
          break;
        case "sql":
          result = input.replace(/''/g, "'");
          break;
        case "css":
          result = input.replace(/\\([0-9a-fA-F]+)\s?/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
          break;
        case "base64":
          result = decodeURIComponent(escape(atob(input)));
          break;
      }
      setOutput(result);
      toast.success("Unescaped successfully");
    } catch (e) {
      toast.error("Error unescaping string. Ensure format is correct.");
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={Code}
        title="String Escape/Unescape"
        description="Escape and unescape strings for various formats and programming languages."
        actions={
          <>
            <ResetButton onClick={handleClear} label="Clear All" />
          </>
        }
      />

      <GlassCard>
        <CardHeader>
          <CardTitle>String Conversion</CardTitle>
          <CardDescription>Select a format and convert your string</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 w-full">
              <label className="text-sm font-medium mb-2 block">Format</label>
              <Select value={format} onValueChange={(val) => setFormat(val as Format)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="html">HTML Entities</SelectItem>
                  <SelectItem value="url">URL Encoding</SelectItem>
                  <SelectItem value="js">JavaScript String</SelectItem>
                  <SelectItem value="json">JSON String</SelectItem>
                  <SelectItem value="xml">XML</SelectItem>
                  <SelectItem value="sql">SQL</SelectItem>
                  <SelectItem value="css">CSS String</SelectItem>
                  <SelectItem value="base64">Base64</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2 mt-6">
              <Button onClick={handleEscape} variant="default"><ArrowRight className="w-4 h-4 mr-2"/> Escape</Button>
              <Button onClick={handleUnescape} variant="outline"><ArrowLeft className="w-4 h-4 mr-2"/> Unescape</Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium flex justify-between">
                <span>Input</span>
                <span className="text-muted-foreground">{input.length} chars</span>
              </label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full h-64 p-3 bg-background border rounded-md font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter string here..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium flex justify-between items-center">
                <span>Output</span>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span>{output.length} chars</span>
                  <CopyButton getText={() => output} label="Copy" />
                </div>
              </label>
              <textarea
                value={output}
                readOnly
                className="w-full h-64 p-3 bg-muted border rounded-md font-mono text-sm resize-none"
                placeholder="Output will appear here..."
              />
            </div>
          </div>
        </CardContent>
      </GlassCard>
    </div>
  );
}
