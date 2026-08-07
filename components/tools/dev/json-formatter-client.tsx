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
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AiOutputDisplay } from "@/components/shared/ai-output-display";
import {
  trackConversionValue,
  trackError,
  trackFeatureUsage,
  trackProcessingTime,
  trackToolCompletion,
  trackToolConversion,
  trackToolUsage,
  trackUserEngagement,
} from "@/lib/gtm";
import {
  AlignLeft,
  Braces,
  Download,
  FileJson,
  Hash,
  Link2,
  Minimize2,
  RotateCcw,
  Search,
  SortAsc,
  Trash2,
  Type as TypeIcon,
  Wand2,
  Sparkles,
  RefreshCw,
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

  // Tools tab state
  const [pathQuery, setPathQuery] = useState<string>("");
  const [pathResult, setPathResult] = useState<string>("");

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
    try {
      const json = parseSafe(input);
      const value = sortKeys ? sortObjectDeep(json) : json;
      const pretty = JSON.stringify(value, null, getIndentValue());
      setOutput(pretty);
      setError("");
      toast.success("Prettified JSON!");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Invalid JSON";
      setError(msg);
      setOutput("");
    }
  }

  function minify() {
    try {
      const json = parseSafe(input);
      const value = sortKeys ? sortObjectDeep(json) : json;
      const compact = JSON.stringify(value);
      setOutput(compact);
      setError("");
      toast.success("Minified JSON!");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Invalid JSON";
      setError(msg);
      setOutput("");
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

  function clearAll() {
    setInput("");
    setOutput("");
    setError("");
    setPathResult("");
    setAiAnalysis([]);
  }

  return (
    <TooltipProvider>
      <ToolPageHeader
        icon={FileJson}
        title="JSON Formatter & AI Schema Auditor Studio"
        description="Pretty print, minify, validate JSON data, infer TypeScript interfaces, and audit schemas with live AI inference."
        actions={
          <>
            <ResetButton onClick={clearAll} />
            <CopyButton
              variant="default"
              getText={() => output || ""}
              disabled={!output}
            />
          </>
        }
      />

      <GlassCard className="mb-4 p-5 space-y-4">
        <div className="grid gap-3 md:grid-cols-3">
          <SelectField
            label="Indent"
            options={[
              { value: "2", label: "2 spaces" },
              { value: "4", label: "4 spaces" },
              { value: "tab", label: "Tabs" },
            ]}
            value={indent}
            onValueChange={(v) => setIndent(v as IndentOpt)}
          />
          <SwitchRow
            label="Sort keys"
            hint="Sort object keys alphabetically (deep)."
            checked={sortKeys}
            onCheckedChange={(v) => setSortKeys(Boolean(v))}
          />
          <SwitchRow
            label="Auto-format on paste"
            checked={autoOnPaste}
            onCheckedChange={(v) => setAutoOnPaste(Boolean(v))}
          />
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <GlassCard className="p-5 space-y-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Input JSON</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setInput("")}
              className="text-xs text-destructive"
            >
              Clear
            </Button>
          </div>

          <TextareaField
            ref={inputRef}
            value={input}
            onValueChange={setInput}
            placeholder='{"hello": "world"}'
            textareaClassName="min-h-[320px] font-mono text-xs"
          />

          <div className="flex items-center gap-2 flex-wrap pt-2">
            <Button size="sm" onClick={prettify} className="gap-1.5 font-bold">
              <Wand2 className="h-3.5 w-3.5" /> Prettify
            </Button>
            <Button size="sm" variant="secondary" onClick={minify} className="gap-1.5 font-bold">
              <Minimize2 className="h-3.5 w-3.5" /> Minify
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={explainWithAi}
              disabled={aiLoading || !input}
              className="gap-1.5 font-bold shadow-xs ml-auto"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${aiLoading ? "animate-spin" : ""}`} />
              {aiLoading ? "AI Auditing..." : "AI JSON Audit & Schema Explainer"}
            </Button>
          </div>
        </GlassCard>

        <GlassCard className="p-5 space-y-3">
          <div className="flex items-center justify-between border-b pb-2">
            <CardTitle className="text-base">Output</CardTitle>
            <CopyButton size="sm" getText={() => output || ""} disabled={!output} />
          </div>

          <TextareaField
            readOnly
            value={output}
            onValueChange={() => {}}
            placeholder="Your formatted JSON will appear here..."
            textareaClassName="min-h-[340px] font-mono text-xs bg-slate-950 text-emerald-400"
          />
        </GlassCard>
      </div>

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
    </TooltipProvider>
  );
}
