"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ActionButton, CopyButton } from "@/components/shared/action-buttons";
import { Code2, Sparkles, Copy, Check } from "lucide-react";
import toast from "react-hot-toast";

const SAMPLE_JSON = `{
  "id": 101,
  "name": "Alex Rivera",
  "email": "alex@toolzium.com",
  "role": "admin",
  "preferences": {
    "theme": "dark",
    "notifications": true,
    "languages": ["en", "es"]
  },
  "stats": {
    "loginCount": 42,
    "lastActive": "2026-08-08T00:00:00Z"
  }
}`;

export default function JsonToTypescriptClient() {
  const [jsonInput, setJsonInput] = useState(SAMPLE_JSON);
  const [tsOutput, setTsOutput] = useState("");
  const [interfaceName, setInterfaceName] = useState("RootObject");

  const convertJsonToTs = () => {
    try {
      const parsed = JSON.parse(jsonInput);

      function generateType(obj: any, name: string): string {
        if (typeof obj !== "object" || obj === null) return typeof obj;
        if (Array.isArray(obj)) {
          if (obj.length === 0) return "any[]";
          const elemType = typeof obj[0] === "object" ? "any" : typeof obj[0];
          return `${elemType}[]`;
        }

        let result = `export interface ${name} {\n`;
        let subInterfaces = "";

        for (const [key, val] of Object.entries(obj)) {
          if (val !== null && typeof val === "object" && !Array.isArray(val)) {
            const subName = key.charAt(0).toUpperCase() + key.slice(1);
            subInterfaces += generateType(val, subName) + "\n\n";
            result += `  ${key}: ${subName};\n`;
          } else if (Array.isArray(val)) {
            if (val.length > 0 && typeof val[0] === "object") {
              const subName = key.charAt(0).toUpperCase() + key.slice(1) + "Item";
              subInterfaces += generateType(val[0], subName) + "\n\n";
              result += `  ${key}: ${subName}[];\n`;
            } else {
              const elemType = val.length > 0 ? typeof val[0] : "any";
              result += `  ${key}: ${elemType}[];\n`;
            }
          } else {
            result += `  ${key}: ${typeof val};\n`;
          }
        }

        result += "}";
        return subInterfaces + result;
      }

      const generated = generateType(parsed, interfaceName || "RootObject");
      setTsOutput(generated);
      toast.success("Converted JSON to TypeScript Interfaces!");
    } catch (err: any) {
      toast.error("Invalid JSON input. Please check your syntax.");
    }
  };

  React.useEffect(() => {
    convertJsonToTs();
  }, [jsonInput, interfaceName]);

  return (
    <div className="space-y-6 max-w-5xl mx-auto px-4">
      <ToolPageHeader
        icon={Code2}
        title="JSON to TypeScript Type & Interface Converter Studio"
        description="Convert raw JSON objects instantly into clean, nested TypeScript interfaces and type definitions."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Card */}
        <GlassCard className="p-5 space-y-3">
          <div className="flex items-center justify-between border-b pb-2">
            <h2 className="text-sm font-bold text-foreground">JSON Input</h2>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground font-medium">Root Name:</span>
              <input
                type="text"
                value={interfaceName}
                onChange={(e) => setInterfaceName(e.target.value)}
                className="h-7 w-28 px-2 text-xs rounded border bg-background font-mono"
              />
            </div>
          </div>

          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            rows={14}
            className="w-full p-3 font-mono text-xs bg-slate-950 text-slate-100 rounded-xl border focus:outline-hidden focus:ring-1 focus:ring-primary"
            placeholder="Paste your JSON here..."
          />
        </GlassCard>

        {/* Output Card */}
        <GlassCard className="p-5 space-y-3">
          <div className="flex items-center justify-between border-b pb-2">
            <h2 className="text-sm font-bold text-foreground">TypeScript Output</h2>
            <CopyButton getText={() => tsOutput} label="Copy TS Code" />
          </div>

          <pre className="p-4 font-mono text-xs bg-slate-950 text-emerald-400 rounded-xl border overflow-x-auto h-80 leading-relaxed">
            {tsOutput || "// TypeScript interfaces will appear here..."}
          </pre>
        </GlassCard>
      </div>
    </div>
  );
}
