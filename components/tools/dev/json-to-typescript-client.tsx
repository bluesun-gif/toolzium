"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";
import { Code2, Sparkles, Copy, Check, RefreshCw, Zap, Terminal, FileCode } from "lucide-react";

const SAMPLE_JSON = `{\n  "id": 101,\n  "name": "Jane Doe",\n  "email": "jane@example.com",\n  "isActive": true,\n  "role": "admin",\n  "skills": ["React", "TypeScript", "Node.js"],\n  "metadata": {\n    "loginCount": 42,\n    "lastLogin": "2026-08-07T05:00:00Z"\n  }\n}`;

export default function JsonToTypescriptClient() {
  const [jsonInput, setJsonInput] = useState<string>(SAMPLE_JSON);
  const [tsInterface, setTsInterface] = useState<string>(
    `export interface RootObject {\n  id: number;\n  name: string;\n  email: string;\n  isActive: boolean;\n  role: string;\n  skills: string[];\n  metadata: {\n    loginCount: number;\n    lastLogin: string;\n  };\n}`
  );
  const [zodSchema, setZodSchema] = useState<string>(
    `import { z } from "zod";\n\nexport const RootObjectSchema = z.object({\n  id: z.number(),\n  name: z.string(),\n  email: z.string().email(),\n  isActive: z.boolean(),\n  role: z.string(),\n  skills: z.array(z.string()),\n  metadata: z.object({\n    loginCount: z.number(),\n    lastLogin: z.string(),\n  }),\n});`
  );
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const handleConvertJson = () => {
    if (!jsonInput.trim()) {
      toast.error("Please paste valid JSON.");
      return;
    }

    setIsConverting(true);

    setTimeout(() => {
      try {
        const parsed = JSON.parse(jsonInput);
        let ts = "export interface RootObject {\n";
        let zod = 'import { z } from "zod";\n\nexport const RootObjectSchema = z.object({\n';

        Object.keys(parsed).forEach((key) => {
          const val = parsed[key];
          const valType = typeof val;

          if (val === null) {
            ts += `  ${key}: any;\n`;
            zod += `  ${key}: z.any(),\n`;
          } else if (Array.isArray(val)) {
            const elemType = val.length > 0 ? typeof val[0] : "any";
            ts += `  ${key}: ${elemType}[];\n`;
            zod += `  ${key}: z.array(z.${elemType}()),\n`;
          } else if (valType === "object") {
            ts += `  ${key}: Record<string, any>;\n`;
            zod += `  ${key}: z.record(z.any()),\n`;
          } else {
            ts += `  ${key}: ${valType};\n`;
            zod += `  ${key}: z.${valType}(),\n`;
          }
        });

        ts += "}";
        zod += "});";

        setTsInterface(ts);
        setZodSchema(zod);
        setIsConverting(false);
        toast.success("Converted JSON to TypeScript & Zod Schema!");
      } catch {
        setIsConverting(false);
        toast.error("Invalid JSON input. Please check your syntax.");
      }
    }, 400);
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(label);
    toast.success(`Copied ${label} to clipboard!`);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  return (
    <div className="mx-auto max-w-6xl px-2 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6 max-w-full overflow-hidden">
      <ToolPageHeader
        title="JSON to TypeScript Interface & Zod Schema Studio"
        description="Convert raw JSON objects into strict TypeScript interfaces, type aliases, and Zod validation schemas instantly."
      />

      {/* SINGLE VIEWPORT JSON STUDIO WORKSPACE */}
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-12 min-h-[500px] max-w-full">
        {/* Left Column: Raw JSON Input (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col max-w-full min-w-0">
          <Card className="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl flex-1 flex flex-col justify-between overflow-hidden max-w-full min-w-0">
            <CardHeader className="border-b border-border/40 bg-muted/20 p-3 sm:p-4">
              <CardTitle className="text-xs sm:text-sm font-semibold flex items-center gap-2 tracking-tight">
                <Code2 className="h-4 w-4 text-primary shrink-0" />
                Raw JSON Input
              </CardTitle>
            </CardHeader>

            <CardContent className="p-3 sm:p-4 space-y-3 flex-1 flex flex-col justify-between max-w-full min-w-0">
              <div className="space-y-1 flex-1 flex flex-col max-w-full min-w-0">
                <label className="text-xs font-semibold text-muted-foreground">Paste JSON Object:</label>
                <Textarea
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                  placeholder="{...}"
                  className="font-mono text-xs min-h-[220px] bg-muted/20 resize-none p-3 rounded-xl max-w-full min-w-0"
                />
              </div>

              <Button
                onClick={handleConvertJson}
                disabled={isConverting || !jsonInput.trim()}
                className="w-full gap-2 shadow-md rounded-xl font-semibold h-10 justify-center text-xs sm:text-sm mt-2 max-w-full min-w-0"
              >
                {isConverting ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin shrink-0" />
                    <span>Inferring Types...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 shrink-0" />
                    <span>Generate TypeScript & Zod Types</span>
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Generated TS & Zod (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col max-w-full min-w-0">
          <Card className="border border-primary/30 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl flex-1 flex flex-col justify-between overflow-hidden max-w-full min-w-0">
            <CardHeader className="border-b border-border/40 bg-muted/20 p-3 sm:p-4">
              <CardTitle className="text-xs sm:text-sm font-semibold flex items-center gap-2 text-primary tracking-tight truncate min-w-0">
                <Terminal className="h-4 w-4 shrink-0" />
                <span>Generated TypeScript & Zod Output</span>
              </CardTitle>
            </CardHeader>

            <CardContent className="p-3 sm:p-4 flex-1 flex flex-col justify-between max-w-full min-w-0 overflow-hidden space-y-3">
              {/* TypeScript Interface */}
              <div className="space-y-1 max-w-full min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-muted-foreground">TypeScript Interface:</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(tsInterface, "TS Interface")}
                    className="text-[11px] text-primary hover:underline flex items-center gap-1 font-medium"
                  >
                    {copiedSection === "TS Interface" ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                    {copiedSection === "TS Interface" ? "Copied" : "Copy TS"}
                  </button>
                </div>
                <div className="p-3 rounded-xl border bg-slate-950 font-mono text-[11px] text-blue-300 max-w-full min-w-0 overflow-x-auto max-h-[140px]">
                  <pre className="whitespace-pre-wrap break-all">{tsInterface}</pre>
                </div>
              </div>

              {/* Zod Schema */}
              <div className="space-y-1 max-w-full min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-muted-foreground">Zod Validation Schema:</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(zodSchema, "Zod Schema")}
                    className="text-[11px] text-primary hover:underline flex items-center gap-1 font-medium"
                  >
                    {copiedSection === "Zod Schema" ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                    {copiedSection === "Zod Schema" ? "Copied" : "Copy Zod"}
                  </button>
                </div>
                <div className="p-3 rounded-xl border bg-slate-950 font-mono text-[11px] text-purple-300 max-w-full min-w-0 overflow-x-auto max-h-[140px]">
                  <pre className="whitespace-pre-wrap break-all">{zodSchema}</pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
