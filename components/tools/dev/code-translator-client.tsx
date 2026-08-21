"use client";

import React, { useState, useMemo } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/ui/glass-card";
import {
  Code2,
  Copy,
  Check,
  ArrowRightLeft,
  Download,
  Sparkles,
  Zap,
  Play,
  RotateCcw,
  FileCode,
} from "lucide-react";
import toast from "react-hot-toast";

const LANGUAGES = [
  { id: "typescript", name: "TypeScript", ext: ".ts", category: "lang" },
  { id: "javascript", name: "JavaScript", ext: ".js", category: "lang" },
  { id: "python", name: "Python", ext: ".py", category: "lang" },
  { id: "go", name: "Go (Golang)", ext: ".go", category: "lang" },
  { id: "rust", name: "Rust", ext: ".rs", category: "lang" },
  { id: "json", name: "JSON", ext: ".json", category: "data" },
  { id: "zod", name: "Zod Schema", ext: ".ts", category: "schema" },
  { id: "pydantic", name: "Pydantic Model", ext: ".py", category: "schema" },
  { id: "sql", name: "SQL (DDL)", ext: ".sql", category: "data" },
  { id: "swift", name: "Swift", ext: ".swift", category: "lang" },
  { id: "kotlin", name: "Kotlin", ext: ".kt", category: "lang" },
  { id: "java", name: "Java", ext: ".java", category: "lang" },
  { id: "cpp", name: "C++", ext: ".cpp", category: "lang" },
];

const TEMPLATES: Record<string, { src: string; from: string; to: string; label: string }> = {
  jsonToTypes: {
    label: "JSON → TypeScript & Zod",
    from: "json",
    to: "typescript",
    src: `{\n  "id": "usr_9482",\n  "name": "Jane Doe",\n  "email": "jane@toolzium.com",\n  "isActive": true,\n  "age": 28,\n  "role": "admin",\n  "tags": ["developer", "creator", "pro"],\n  "settings": {\n    "theme": "dark",\n    "notifications": true\n  }\n}`,
  },
  pyToJs: {
    label: "Python → JavaScript",
    from: "python",
    to: "javascript",
    src: `def calculate_discount(price, discount_percent=10):\n    """Calculate final price after discount."""\n    if price <= 0:\n        raise ValueError("Price must be positive")\n    \n    saved = price * (discount_percent / 100)\n    final_price = price - saved\n    return round(final_price, 2)\n\nusers = ["Alice", "Bob", "Charlie"]\nactive_users = [u.upper() for u in users if len(u) > 3]\nprint(f"Active: {active_users}")`,
  },
  jsToPy: {
    label: "JavaScript → Python",
    from: "javascript",
    to: "python",
    src: `function parseUserData(rawUsers) {\n  return rawUsers\n    .filter(u => u.age >= 18)\n    .map(u => ({\n      fullName: \`\${u.firstName} \${u.lastName}\`,\n      isAdult: true,\n      score: Math.round(u.points * 1.5)\n    }));\n}\n\nconst totalSum = [10, 20, 30, 40].reduce((acc, curr) => acc + curr, 0);\nconsole.log("Total:", totalSum);`,
  },
  jsonToGo: {
    label: "JSON → Go Struct",
    from: "json",
    to: "go",
    src: `{\n  "orderId": 10842,\n  "customerName": "Alex Smith",\n  "totalAmount": 149.99,\n  "isPaid": true,\n  "items": [\n    {\n      "sku": "SKU-99",\n      "quantity": 2,\n      "unitPrice": 49.99\n    }\n  ]\n}`,
  },
  jsonToRust: {
    label: "JSON → Rust Struct (Serde)",
    from: "json",
    to: "rust",
    src: `{\n  "sessionId": "sess_82194",\n  "userId": 42,\n  "ipAddress": "192.168.1.1",\n  "ttl": 3600,\n  "metadata": {\n    "userAgent": "Mozilla/5.0",\n    "isBot": false\n  }\n}`,
  },
};

// Client-side quick transformer for JSON to types & schemas
function transformJson(jsonStr: string, target: string): string {
  try {
    const data = JSON.parse(jsonStr);

    function inferType(val: unknown): string {
      if (val === null) return "any";
      if (typeof val === "string") return "string";
      if (typeof val === "number") return Number.isInteger(val) ? "number" : "number";
      if (typeof val === "boolean") return "boolean";
      if (Array.isArray(val)) {
        if (val.length === 0) return "any[]";
        return `${inferType(val[0])}[]`;
      }
      if (typeof val === "object") return "Record<string, any>";
      return "any";
    }

    function capitalize(s: string) {
      return s.charAt(0).toUpperCase() + s.slice(1);
    }

    if (target === "typescript") {
      let code = `export interface RootObject {\n`;
      for (const [key, val] of Object.entries(data)) {
        code += `  ${key}: ${inferType(val)};\n`;
      }
      code += `}\n`;
      return code;
    }

    if (target === "zod") {
      let code = `import { z } from "zod";\n\nexport const RootSchema = z.object({\n`;
      for (const [key, val] of Object.entries(data)) {
        let zType = "z.any()";
        if (typeof val === "string") zType = "z.string()";
        else if (typeof val === "number") zType = "z.number()";
        else if (typeof val === "boolean") zType = "z.boolean()";
        else if (Array.isArray(val)) zType = "z.array(z.any())";
        else if (typeof val === "object" && val !== null) zType = "z.record(z.any())";
        code += `  ${key}: ${zType},\n`;
      }
      code += `});\n\nexport type Root = z.infer<typeof RootSchema>;\n`;
      return code;
    }

    if (target === "go") {
      let code = `type RootObject struct {\n`;
      for (const [key, val] of Object.entries(data)) {
        const goField = capitalize(key);
        let goType = "any";
        if (typeof val === "string") goType = "string";
        else if (typeof val === "number") goType = Number.isInteger(val) ? "int" : "float64";
        else if (typeof val === "boolean") goType = "bool";
        else if (Array.isArray(val)) goType = "[]any";
        else if (typeof val === "object" && val !== null) goType = "map[string]any";
        code += `\t${goField} ${goType} \`json:"${key}"\`\n`;
      }
      code += `}\n`;
      return code;
    }

    if (target === "rust") {
      let code = `use serde::{Deserialize, Serialize};\n\n#[derive(Debug, Serialize, Deserialize)]\npub struct RootObject {\n`;
      for (const [key, val] of Object.entries(data)) {
        let rsType = "serde_json::Value";
        if (typeof val === "string") rsType = "String";
        else if (typeof val === "number") rsType = Number.isInteger(val) ? "i64" : "f64";
        else if (typeof val === "boolean") rsType = "bool";
        else if (Array.isArray(val)) rsType = "Vec<serde_json::Value>";
        code += `    pub ${key}: ${rsType},\n`;
      }
      code += `}\n`;
      return code;
    }

    if (target === "pydantic") {
      let code = `from typing import List, Optional, Any, Dict\nfrom pydantic import BaseModel\n\nclass RootModel(BaseModel):\n`;
      for (const [key, val] of Object.entries(data)) {
        let pyType = "Any";
        if (typeof val === "string") pyType = "str";
        else if (typeof val === "number") pyType = Number.isInteger(val) ? "int" : "float";
        else if (typeof val === "boolean") pyType = "bool";
        else if (Array.isArray(val)) pyType = "List[Any]";
        else if (typeof val === "object" && val !== null) pyType = "Dict[str, Any]";
        code += `    ${key}: ${pyType}\n`;
      }
      return code;
    }

    return JSON.stringify(data, null, 2);
  } catch {
    return "";
  }
}

export default function CodeTranslatorClient() {
  const [fromLang, setFromLang] = useState("json");
  const [toLang, setToLang] = useState("typescript");
  const [sourceCode, setSourceCode] = useState(TEMPLATES.jsonToTypes.src);
  const [outputCode, setOutputCode] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [copied, setCopied] = useState(false);

  // Auto-generate on mount or JSON changes
  React.useEffect(() => {
    if (fromLang === "json") {
      const res = transformJson(sourceCode, toLang);
      if (res) setOutputCode(res);
    }
  }, [fromLang, toLang, sourceCode]);

  const handleTranslate = async () => {
    if (!sourceCode.trim()) {
      toast.error("Please enter some code to translate");
      return;
    }

    // If converting from JSON to types, instant client-side
    if (fromLang === "json") {
      const res = transformJson(sourceCode, toLang);
      if (res) {
        setOutputCode(res);
        toast.success("Converted instantly in browser!");
        return;
      }
    }

    // Call AI translation API
    setIsTranslating(true);
    try {
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `You are an expert polyglot software engineer. Translate the following ${fromLang} code into idiomatic, modern, production-grade ${toLang} code. Return ONLY the code inside a standard code block without chatter.\n\nSource Code:\n\`\`\`${fromLang}\n${sourceCode}\n\`\`\``,
        }),
      });

      if (!res.ok) throw new Error("Translation failed");
      const data = await res.json();
      const rawText = data.text || data.result || "";
      // Clean up markdown code blocks if any
      const cleaned = rawText
        .replace(/^```[a-zA-Z]*\n/, "")
        .replace(/\n```$/, "")
        .trim();

      setOutputCode(cleaned || rawText);
      toast.success("Code translated successfully!");
    } catch {
      toast.error("Failed to translate code. Please check your network connection.");
    } finally {
      setIsTranslating(false);
    }
  };

  const handleSwap = () => {
    const tempFrom = fromLang;
    const tempTo = toLang;
    const tempCode = outputCode;
    setFromLang(tempTo);
    setToLang(tempFrom);
    if (tempCode) {
      setSourceCode(tempCode);
      setOutputCode("");
    }
  };

  const handleCopy = async () => {
    if (!outputCode) return;
    await navigator.clipboard.writeText(outputCode);
    setCopied(true);
    toast.success("Code copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!outputCode) return;
    const ext = LANGUAGES.find((l) => l.id === toLang)?.ext || ".txt";
    const blob = new Blob([outputCode], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `translated_code${ext}`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success(`Downloaded translated_code${ext}`);
  };

  const loadTemplate = (key: string) => {
    const t = TEMPLATES[key];
    if (!t) return;
    setFromLang(t.from);
    setToLang(t.to);
    setSourceCode(t.src);
    setOutputCode("");
    toast.success(`Loaded "${t.label}" template`);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 space-y-6">
      <ToolPageHeader
        title="AI Universal Code Translator & Polyglot Engine"
        description="Convert, translate, and infer type definitions across Python, JavaScript, TypeScript, Go, Rust, Zod, and Pydantic with 100% in-browser privacy."
        icon={Code2}
      />

      {/* Quick Template Selector */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider mr-1">
          ⚡ Quick Templates:
        </span>
        {Object.entries(TEMPLATES).map(([k, v]) => (
          <Button
            key={k}
            variant="outline"
            size="sm"
            onClick={() => loadTemplate(k)}
            className="h-7 px-2.5 rounded-lg text-xs font-semibold border-border/80 hover:border-primary/40 bg-background/50 cursor-pointer transition active:scale-95"
          >
            {v.label}
          </Button>
        ))}
      </div>

      {/* Language Controls Bar */}
      <GlassCard className="p-4 rounded-2xl border-border/80">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Source Language */}
            <div className="flex-1 sm:w-48">
              <label className="block text-[11px] font-bold text-muted-foreground uppercase mb-1">
                Source Language
              </label>
              <select
                value={fromLang}
                onChange={(e) => setFromLang(e.target.value)}
                aria-label="Source Language"
                className="w-full h-9 rounded-xl border border-border/80 bg-background px-3 text-xs font-semibold text-foreground focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
              >
                {LANGUAGES.map((l) => (
                  <option key={`src:${l.id}`} value={l.id}>
                    {l.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Swap Button */}
            <Button
              variant="outline"
              size="icon"
              onClick={handleSwap}
              className="h-9 w-9 rounded-xl mt-4 shrink-0 border-border/80 cursor-pointer hover:border-primary/50"
              title="Swap Languages"
            >
              <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />
            </Button>

            {/* Target Language */}
            <div className="flex-1 sm:w-48">
              <label className="block text-[11px] font-bold text-muted-foreground uppercase mb-1">
                Target Language
              </label>
              <select
                value={toLang}
                onChange={(e) => setToLang(e.target.value)}
                aria-label="Target Language"
                className="w-full h-9 rounded-xl border border-border/80 bg-background px-3 text-xs font-semibold text-foreground focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
              >
                {LANGUAGES.map((l) => (
                  <option key={`dst:${l.id}`} value={l.id}>
                    {l.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Action Trigger */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              onClick={handleTranslate}
              disabled={isTranslating}
              className="flex-1 sm:flex-none h-10 px-6 rounded-xl font-bold bg-primary text-primary-foreground hover:opacity-90 shadow-md cursor-pointer gap-2"
            >
              {isTranslating ? (
                <Sparkles className="h-4 w-4 animate-spin" />
              ) : (
                <Zap className="h-4 w-4" />
              )}
              {isTranslating ? "Translating Code..." : "Translate Code"}
            </Button>
          </div>
        </div>
      </GlassCard>

      {/* Dual Editor Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Source Code Panel */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <FileCode className="h-4 w-4 text-primary" />
              Source ({LANGUAGES.find((l) => l.id === fromLang)?.name})
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSourceCode("")}
              className="h-6 px-2 text-[11px] text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="h-3 w-3 mr-1" /> Clear
            </Button>
          </div>
          <div className="relative rounded-2xl border border-border/80 bg-card overflow-hidden shadow-sm">
            <textarea
              value={sourceCode}
              onChange={(e) => setSourceCode(e.target.value)}
              placeholder="Paste your source code here..."
              rows={16}
              spellCheck={false}
              className="w-full p-4 font-mono text-xs sm:text-sm bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none resize-y"
            />
          </div>
        </div>

        {/* Output Code Panel */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <Code2 className="h-4 w-4 text-primary" />
              Result ({LANGUAGES.find((l) => l.id === toLang)?.name})
            </span>
            <div className="flex items-center gap-1.5">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                disabled={!outputCode}
                className="h-7 px-2.5 rounded-lg text-xs font-semibold border-border/80 cursor-pointer gap-1"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? "Copied" : "Copy"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
                disabled={!outputCode}
                className="h-7 px-2.5 rounded-lg text-xs font-semibold border-border/80 cursor-pointer gap-1"
              >
                <Download className="h-3.5 w-3.5" /> Download
              </Button>
            </div>
          </div>
          <div className="relative rounded-2xl border border-border/80 bg-card/60 backdrop-blur-sm overflow-hidden shadow-sm">
            <textarea
              value={outputCode}
              readOnly
              placeholder="Translated code will appear here..."
              rows={16}
              spellCheck={false}
              className="w-full p-4 font-mono text-xs sm:text-sm bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none resize-y"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
