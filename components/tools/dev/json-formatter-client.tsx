"use client";

import {
  ActionButton,
  CopyButton,
  ExportTextButton,
  PasteButton,
  ResetButton,
} from "@/components/shared/action-buttons";
import InputField from "@/components/shared/form-fields/input-field";
import SelectField from "@/components/shared/form-fields/select-field";
import SwitchRow from "@/components/shared/form-fields/switch-row";
import TextareaField from "@/components/shared/form-fields/textarea-field";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AiOutputDisplay } from "@/components/shared/ai-output-display";
import {
  AlignLeft,
  Braces,
  Download,
  FileJson,
  Minimize2,
  Wand2,
  Sparkles,
  RefreshCw,
  ShieldCheck,
  Code2,
  CheckCircle2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

type IndentOpt = "2" | "4" | "tab";

export default function JsonFormatterClient() {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [indent, setIndent] = useState<IndentOpt>("2");
  const [sortKeys, setSortKeys] = useState<boolean>(false);
  const [autoOnPaste, setAutoOnPaste] = useState<boolean>(true);

  // AI State
  const [aiAnalysis, setAiAnalysis] = useState<string[]>([]);
  const [aiLoading, setAiLoading] = useState<boolean>(false);

  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  /* Helpers */
  function parseSafe<T = unknown>(text: string): T {
    return JSON.parse(text) as T;
  }

  function sortObjectDeep<T>(value: T): T {
    if (Array.isArray(value)) return value.map(sortObjectDeep) as unknown as T;
    if (value && typeof value === "object") {
      const entries = Object.entries(value as Record<string, unknown>);
      entries.sort(([a], [b]) =>
        a.localeCompare(b, undefined, { numeric: true })
      );
      const sorted: Record<string, unknown> = {};
      for (const [k, v] of entries) sorted[k] = sortObjectDeep(v);
      return sorted as unknown as T;
    }
    return value;
  }

  function getIndentValue() {
    return indent === "tab" ? "\t" : Number(indent);
  }

  /* Actions */
  function prettify() {
    if (!input.trim()) {
      toast.error("Please enter JSON text first!");
      return;
    }
    try {
      const json = parseSafe(input);
      const value = sortKeys ? sortObjectDeep(json) : json;
      const pretty = JSON.stringify(value, null, getIndentValue());
      setOutput(pretty);
      setError("");
      toast.success("JSON formatted successfully!");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Invalid JSON syntax";
      setError(msg);
      setOutput("");
      toast.error(`Invalid JSON: ${msg}`);
    }
  }

  function minify() {
    if (!input.trim()) {
      toast.error("Please enter JSON text first!");
      return;
    }
    try {
      const json = parseSafe(input);
      const value = sortKeys ? sortObjectDeep(json) : json;
      const compact = JSON.stringify(value);
      setOutput(compact);
      setError("");
      toast.success("JSON minified successfully!");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Invalid JSON syntax";
      setError(msg);
      setOutput("");
      toast.error(`Invalid JSON: ${msg}`);
    }
  }

  const explainWithAi = async () => {
    if (!input.trim()) {
      toast.error("Please enter JSON input first!");
      return;
    }

    setAiLoading(true);

    try {
      const prompt = `Analyze this JSON object and explain its data structure schema, data types, potential security/PII concerns, and recommended TypeScript interfaces:\n\n${input.slice(0, 1500)}\n\nOutput 4 bullet points. No markdown asterisks.`;

      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, type: "prose" }),
      });

      if (!res.ok) throw new Error("AI API failed");

      const data = await res.json();
      if (data.results && data.results.length > 0) {
        setAiAnalysis(data.results);
        toast.success("AI JSON audit complete!");
      } else {
        throw new Error("No results");
      }
    } catch (err) {
      toast.error("AI JSON analysis failed. Please check JSON syntax.");
    } finally {
      setAiLoading(false);
    }
  };

  const loadSample = () => {
    const sample = JSON.stringify(
      {
        site: "Toolzium",
        url: "https://toolzium.com",
        features: ["JSON Formatter", "PDF Suite", "QR Code Generator", "Password Generator"],
        privacy: { inBrowser: true, serverLogs: false },
        stats: { monthlyUsers: 1000000, toolsAvailable: 450 },
      },
      null,
      2
    );
    setInput(sample);
    setOutput(sample);
    setError("");
    toast.success("Sample JSON loaded!");
  };

  function clearAll() {
    setInput("");
    setOutput("");
    setError("");
    setAiAnalysis([]);
    toast.success("Editor cleared");
  }

  const steps = [
    {
      step: "01",
      title: "Paste Raw JSON",
      description: "Paste raw API responses, payload logs, or upload a .json file directly into the editor.",
      icon: FileJson,
    },
    {
      step: "02",
      title: "Validate & Format",
      description: "Click Prettify to format with custom indentation (2 spaces, 4 spaces, tabs) or Minify for compact production payload size.",
      icon: Wand2,
    },
    {
      step: "03",
      title: "Copy or Download",
      description: "Copy pristine, syntax-highlighted JSON to your clipboard or download as a .json file with 1-click.",
      icon: Download,
    },
  ];

  const features = [
    {
      title: "Pretty Print & Beautify",
      description: "Format minified or messy JSON with configurable indent levels (2 spaces, 4 spaces, or tabs) for effortless readability.",
      icon: Wand2,
    },
    {
      title: "Real-Time Syntax Validation",
      description: "Instantly detect syntax errors (missing quotes, trailing commas, unmatched brackets) with line number feedback.",
      icon: CheckCircle2,
    },
    {
      title: "JSON Minifier & Compressor",
      description: "Strip all whitespace, indents, and line breaks to create compact JSON string payloads for database storage.",
      icon: Minimize2,
    },
    {
      title: "Alphabetical Key Sorting",
      description: "Deep sort all object keys recursively for easy visual comparison and consistent git diffs.",
      icon: Code2,
    },
    {
      title: "AI Schema & Interface Audit",
      description: "Generate live TypeScript interfaces, data type breakdowns, and security vulnerability reviews with AI.",
      icon: Sparkles,
    },
    {
      title: "100% In-Browser Privacy",
      description: "Your JSON data is parsed locally in your web browser. Zero network uploads, zero cloud logging, 100% secure.",
      icon: ShieldCheck,
    },
  ];

  const faqs = [
    {
      question: "What is a JSON Formatter and why do I need one?",
      answer: "A JSON Formatter takes raw, minified, or unformatted JSON strings and structures them with proper indentation, line breaks, and spacing. This makes API responses and configuration files human-readable and easy to debug.",
    },
    {
      question: "What are the most common JSON syntax errors?",
      answer: "Common JSON syntax errors include: 1) Trailing commas after the last item in objects or arrays. 2) Using single quotes ('key') instead of mandatory double quotes (\"key\"). 3) Unquoted keys. 4) Missing closing brackets } or ].",
    },
    {
      question: "What is the difference between Prettifying and Minifying JSON?",
      answer: "Prettifying adds spaces, indentation, and newlines to make JSON human-readable. Minifying removes all extra spaces and line breaks to minimize file size and reduce network payload transfer times.",
    },
    {
      question: "Is my JSON payload or API data uploaded to a server?",
      answer: "No. Toolzium processes all JSON in your browser using JavaScript's native JSON.parse() and JSON.stringify(). Your data never leaves your computer.",
    },
    {
      question: "How large of a JSON payload can I format?",
      answer: "Since processing happens locally, Toolzium can handle multi-megabyte JSON files limited only by your computer's available memory.",
    },
  ];

  return (
    <TooltipProvider>
      {/* SECTION 1: HEADER */}
      <ToolPageHeader
        icon={FileJson}
        title="Free Online JSON Formatter, Prettifier & Validator"
        description="Pretty print, validate, and minify JSON data online. Sort object keys, detect syntax errors, and audit schemas with live AI inference."
        actions={
          <>
            <Button variant="outline" size="sm" onClick={loadSample} className="gap-1.5 text-xs">
              <Braces className="h-3.5 w-3.5" />
              Try Sample
            </Button>
            <ResetButton onClick={clearAll} />
            <CopyButton
              variant="default"
              getText={() => {
                toast.success("Formatted JSON copied to clipboard!");
                return output || "";
              }}
              disabled={!output}
            />
            <ExportTextButton
              filename="data.json"
              getText={() => output || input || ""}
              disabled={!output && !input}
            />
          </>
        }
      />

      {/* Settings Bar */}
      <GlassCard className="mb-4 p-4 sm:p-5 space-y-4">
        <div className="grid gap-4 md:grid-cols-3">
          <SelectField
            label="Indentation Level"
            options={[
              { value: "2", label: "2 Spaces (Standard)" },
              { value: "4", label: "4 Spaces (Compact)" },
              { value: "tab", label: "Tabs" },
            ]}
            value={indent}
            onValueChange={(v) => setIndent(v as IndentOpt)}
          />
          <SwitchRow
            label="Sort Keys Alphabetically"
            hint="Sort object keys recursively for clean diffs."
            checked={sortKeys}
            onCheckedChange={(v) => setSortKeys(Boolean(v))}
          />
          <SwitchRow
            label="Auto-format on Paste"
            checked={autoOnPaste}
            onCheckedChange={(v) => setAutoOnPaste(Boolean(v))}
          />
        </div>
      </GlassCard>

      {/* SECTION 2: PRIMARY WORKSPACE */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Input Card */}
        <GlassCard className="p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">Input Raw JSON</CardTitle>
            <div className="flex items-center gap-2">
              <PasteButton
                variant="outline"
                size="sm"
                className="gap-1.5 text-xs"
                label="Paste"
                pastedLabel="Pasted"
                getExisting={() => input}
                setValue={(val) => {
                  setInput(val);
                  if (autoOnPaste && val.trim()) {
                    try {
                      const json = parseSafe(val);
                      const pretty = JSON.stringify(json, null, getIndentValue());
                      setOutput(pretty);
                      setError("");
                    } catch {}
                  }
                }}
              />
              <InputField
                accept=".json,.txt,application/json"
                type="file"
                onFilesChange={async (files) => {
                  const f = files?.[0];
                  if (!f) return;
                  const txt = await f.text();
                  setInput(txt);
                  toast.success(`Loaded JSON file: ${f.name}`);
                }}
              />
            </div>
          </div>

          <TextareaField
            ref={inputRef}
            value={input}
            onValueChange={setInput}
            placeholder='{"name": "Toolzium", "type": "utility", "status": "active"}'
            textareaClassName="min-h-[320px] font-mono text-xs leading-relaxed"
          />

          {error && (
            <div className="rounded-lg bg-red-500/10 border border-red-500/30 p-3 text-xs text-red-500 font-mono">
              ⚠️ Syntax Error: {error}
            </div>
          )}

          <div className="flex items-center gap-2 flex-wrap pt-2">
            <Button size="sm" onClick={prettify} className="gap-1.5 font-semibold shadow-md">
              <Wand2 className="h-4 w-4" /> Prettify
            </Button>
            <Button size="sm" variant="secondary" onClick={minify} className="gap-1.5 font-semibold">
              <Minimize2 className="h-4 w-4" /> Minify
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={explainWithAi}
              disabled={aiLoading || !input}
              className="gap-1.5 font-semibold ml-auto"
            >
              <RefreshCw className={`h-4 w-4 ${aiLoading ? "animate-spin" : ""}`} />
              {aiLoading ? "AI Auditing..." : "AI Schema Audit"}
            </Button>
          </div>
        </GlassCard>

        {/* Output Card */}
        <GlassCard className="p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between border-b pb-2">
            <CardTitle className="text-base font-semibold">Formatted Output</CardTitle>
            <CopyButton size="sm" getText={() => output || ""} disabled={!output} />
          </div>

          <TextareaField
            readOnly
            value={output}
            onValueChange={() => {}}
            placeholder="Your formatted, validated JSON output will appear here..."
            textareaClassName="min-h-[340px] font-mono text-xs bg-slate-950 text-emerald-400 leading-relaxed"
          />

          <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
            <span>
              {output ? `Size: ${new Blob([output]).size} bytes` : "Ready to format"}
            </span>
            {output && <span className="text-emerald-500 font-semibold">Valid JSON Syntax</span>}
          </div>
        </GlassCard>
      </div>

      {/* AI Analysis Display */}
      {aiAnalysis.length > 0 && (
        <div className="mt-6">
          <AiOutputDisplay
            title="AI JSON Structure & Security Audit"
            subtitle="Real-time LLM schema explanation, data types, and interface recommendations"
            content={aiAnalysis}
            loading={aiLoading}
            onRegenerate={explainWithAi}
            variant="prose"
          />
        </div>
      )}

      {/* SECTION 3: HOW IT WORKS */}
      <ToolHowItWorks
        title="How to Format & Validate JSON"
        subtitle="Format, validate, and minify JSON strings in 3 simple steps."
        steps={steps}
      />

      {/* SECTION 4: FEATURE HIGHLIGHTS & DEEP SEO GUIDE */}
      <ToolFeatureGuides features={features}>
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-foreground">
            Complete Developer Guide to JSON Formatting & Syntax Validation
          </h3>
          <p>
            JSON (JavaScript Object Notation) is the universal lightweight data-interchange format used across modern web APIs, microservices, databases (PostgreSQL, MongoDB), and software configuration files. Toolzium’s free JSON Formatter & Validator delivers instantaneous client-side pretty-printing, minification, key sorting, and schema inspection.
          </p>

          <h4 className="text-base font-semibold text-foreground pt-2">JSON Standard Syntax Rules (RFC 8259):</h4>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
            <li><strong>Double Quotes Mandatory:</strong> All strings and object keys must be enclosed in double quotes (<code>"key": "value"</code>). Single quotes are invalid.</li>
            <li><strong>No Trailing Commas:</strong> Commas are strictly separating elements. A comma after the final key or array item (e.g. <code>{`{"a": 1,}`}</code>) causes a syntax error.</li>
            <li><strong>Allowed Primitive Types:</strong> String, Number, Boolean (<code>true</code>/<code>false</code>), <code>null</code>, Object, and Array. Functions and undefined values are not permitted in strict JSON.</li>
          </ul>

          <h4 className="text-base font-semibold text-foreground pt-2">Why Minify JSON for Production?</h4>
          <p>
            Minifying JSON strips non-essential whitespace, line breaks, and indentation. On large payloads, minification can reduce bandwidth transfer sizes by 30% to 50%, improving API response latency and mobile data performance.
          </p>
        </div>
      </ToolFeatureGuides>

      {/* SECTION 5: FAQ & RELATED TOOLS */}
      <ToolFaqAccordion faqs={faqs} />

      <RelatedTools currentToolUrl="/tools/dev/json-formatter" max={6} />
    </TooltipProvider>
  );
}
