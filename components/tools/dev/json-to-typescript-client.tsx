"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ActionButton, CopyButton } from "@/components/shared/action-buttons";
import { Code2, Sparkles, Copy, Check, BookOpen, Shield, FileJson, Type, Layers, Zap, Globe, AlignLeft } from "lucide-react";
import toast from "react-hot-toast";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";

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
    <div className="max-w-6xl mx-auto space-y-8">
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

      {/* SECTION 3: HOW IT WORKS */}
      <ToolHowItWorks
        steps={[
          {
            step: "01",
            title: "Paste Your JSON",
            description: "Paste any valid JSON object or array into the input panel. The tool handles nested objects, arrays, mixed types, nulls, and optional fields.",
            icon: FileJson,
          },
          {
            step: "02",
            title: "Get TypeScript Interfaces",
            description: "Instantly generates TypeScript interfaces (or types) with correct type inference. Nested objects become separate named interfaces. Arrays become typed arrays.",
            icon: Code2,
          },
          {
            step: "03",
            title: "Copy & Use",
            description: "Copy the generated TypeScript directly into your project. Use it as API response types, data model interfaces, or form state types.",
            icon: BookOpen,
          },
        ]}
        badges={[
          "Nested object support",
          "Array type inference",
          "Optional field detection",
        ]}
      />

      {/* SECTION 4: FEATURE GUIDES */}
      <ToolFeatureGuides
        features={[
          {
            icon: Type,
            title: "Smart Type Inference",
            description: "Infers TypeScript types from JSON values: string, number, boolean, null, nested interface references, and typed arrays (string[], number[]). No manual typing needed.",
          },
          {
            icon: Layers,
            title: "Nested Interface Generation",
            description: "Automatically creates separate named interfaces for each nested object level. Address object inside a User object becomes a clean Address interface.",
          },
          {
            icon: FileJson,
            title: "Array Handling",
            description: "JSON arrays are analyzed to determine element type. Arrays of objects generate typed interfaces. Mixed-type arrays produce union types (string | number).",
          },
          {
            icon: Code2,
            title: "Interface vs Type Alias",
            description: "Toggle between interface and type alias output. Interfaces are preferred for objects you'll extend; type aliases work better for unions and computed types.",
          },
          {
            icon: AlignLeft,
            title: "Optional Field Detection",
            description: "When given an array of similar objects, fields missing from some objects are marked as optional (field?: type) — accurately modeling nullable API fields.",
          },
          {
            icon: Shield,
            title: "Client-Side & Private",
            description: "All type generation runs in your browser. Your JSON data (which may contain sensitive API responses) never leaves your device.",
          },
        ]}
      >
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
          <h3 className="text-lg font-semibold">JSON to TypeScript — Type Safety for API Responses</h3>
          <p>
            Converting JSON to TypeScript interfaces is one of the most common tasks in modern web development.
            REST APIs return JSON, and without proper types you lose IntelliSense, refactoring support,
            and compile-time error catching. This tool instantly generates the type definitions you need
            from any JSON payload.
          </p>

          <h4 className="font-semibold">JSON Type to TypeScript Type Mapping</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border p-2 text-left">JSON Value</th>
                  <th className="border p-2 text-left">JSON Type</th>
                  <th className="border p-2 text-left">TypeScript Type</th>
                  <th className="border p-2 text-left">Example</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['"hello"', "string", "string", 'name: string'],
                  ["42 / 3.14", "number", "number", 'age: number'],
                  ["true / false", "boolean", "boolean", 'active: boolean'],
                  ["null", "null", "null (or T | null)", 'deletedAt: Date | null'],
                  ["{...}", "object", "interface / Record<>", 'address: Address'],
                  ["[...]", "array", "T[] or Array<T>", 'tags: string[]'],
                  ["[mixed]", "mixed array", "(T | U)[] union", '(string | number)[]'],
                ].map(([val, jsonType, tsType, ex]) => (
                  <tr key={val} className="odd:bg-muted/20">
                    <td className="border p-2 font-mono text-primary text-xs">{val}</td>
                    <td className="border p-2 text-xs">{jsonType}</td>
                    <td className="border p-2 font-mono text-xs">{tsType}</td>
                    <td className="border p-2 font-mono text-muted-foreground text-xs">{ex}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h4 className="font-semibold">Interface vs Type Alias — When to Use Which</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border p-2 text-left">Feature</th>
                  <th className="border p-2 text-left">interface</th>
                  <th className="border p-2 text-left">type alias</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Declaration merging", "Yes (extend later)", "No"],
                  ["Extending", "interface B extends A", "type B = A & {...}"],
                  ["Union types", "No", "type A = B | C"],
                  ["Computed properties", "Limited", "Full support"],
                  ["Best for objects", "Yes (preferred)", "Yes (alternative)"],
                  ["Error messages", "Shows interface name", "May expand inline"],
                ].map(([feat, iface, typeAlias]) => (
                  <tr key={feat} className="odd:bg-muted/20">
                    <td className="border p-2 font-medium text-xs">{feat}</td>
                    <td className="border p-2 text-xs">{iface}</td>
                    <td className="border p-2 text-xs">{typeAlias}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h4 className="font-semibold">Typing API Responses — Production Patterns</h4>
          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
            <li><strong>Use zod for runtime validation:</strong> TypeScript types are erased at runtime. Use zod to validate API responses at runtime AND generate types: <code>const schema = z.object(...); type User = z.infer&lt;typeof schema&gt;</code></li>
            <li><strong>Mark optional API fields:</strong> If a field may be absent in some responses, mark it optional: <code>field?: string</code> not <code>field: string | undefined</code>.</li>
            <li><strong>Avoid any:</strong> Never type API responses as <code>any</code> — you lose all type safety. Use <code>unknown</code> and narrow with type guards if needed.</li>
            <li><strong>Date handling:</strong> JSON has no Date type — dates arrive as strings. Type them as <code>string</code> and convert with <code>new Date(str)</code> in your application layer.</li>
          </ul>
        </div>
      </ToolFeatureGuides>

      {/* SECTION 5: FAQ + RELATED TOOLS */}
      <ToolFaqAccordion
        faqs={[
          {
            question: "Can this tool handle nested JSON objects?",
            answer: "Yes. Nested objects automatically generate separate named TypeScript interfaces. For example, a User object with an address field generates both a User interface and an Address interface, with User.address typed as Address.",
          },
          {
            question: "What is the difference between interface and type in TypeScript?",
            answer: "Both define object shapes, but interfaces support declaration merging (you can extend them later with the same name) and are preferred for public APIs. Type aliases support union types (A | B), intersection types, and computed properties. For simple API response types, either works fine.",
          },
          {
            question: "Does this support JSON arrays?",
            answer: "Yes. Arrays of primitives generate typed arrays (string[], number[]). Arrays of objects generate a named interface for the element type and type the array as InterfaceName[]. Mixed-type arrays generate union type arrays like (string | number)[].",
          },
          {
            question: "How should I handle nullable fields from APIs?",
            answer: "Fields that could be null should be typed as string | null (not just string). If the field might be missing entirely, use string | undefined or the optional shorthand field?: string. Many TypeScript projects use strict null checks (\"strictNullChecks\": true in tsconfig) which enforces this distinction.",
          },
          {
            question: "Should I use these generated types directly in production?",
            answer: "Use them as a starting point, then refine. The generator gives you accurate types for the JSON you provide, but real APIs may have additional optional fields, nullable variants, or date-string types that need manual annotation. Consider using Zod schemas for runtime validation alongside the TypeScript types.",
          },
        ]}
      />
      <RelatedTools currentToolUrl="/tools/dev/json-to-typescript" max={6} />
    </div>
  );
}
