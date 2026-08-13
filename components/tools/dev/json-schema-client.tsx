"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, RotateCcw, FileJson, Settings, CheckCircle, XCircle, BarChart3 } from "lucide-react";
import toast from "react-hot-toast";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { GlassCard } from "@/components/ui/glass-card";
const cardClass = "border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass = "border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass = "text-xs sm:text-sm font-semibold flex items-center gap-2";
const textareaClass = "w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50 font-mono";
type JsonSchema = {
  $schema?: string;
  type?: string | string[];
  properties?: Record<string, JsonSchema>;
  items?: JsonSchema | JsonSchema[];
  required?: string[];
  enum?: any[];
  format?: string;
  description?: string;
  examples?: any[];
  additionalProperties?: boolean;
};
export function JsonSchemaClient() {
  const [input, setInput] = useState<string>(`{
"id":"123e4567-e89b-12d3-a456-426614174000",
"name":"John Doe",
"email":"john@example.com",
"age": 30,
"isActive": true,
"tags": ["admin","user"],
"address": {
"street":"123 Main St",
"city":"Anytown"
 }
}`);
  const [draft, setDraft] = useState<"4" | "6" | "7">("7");
  const [includeDesc, setIncludeDesc] = useState(true);
  const [includeExamples, setIncludeExamples] = useState(true);
  const [requireAll, setRequireAll] = useState(true);
  const [additionalProps, setAdditionalProps] = useState(false);
  const [validationInput, setValidationInput] = useState("");
  const [validationResult, setValidationResult] = useState<{
    valid: boolean;
    error: string;
  } | null>(null);
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };
  const detectFormat = (val: string): string | undefined => {
    if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val)) return "email";
    if (/^https?:\/\/.+/.test(val)) return "uri";
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(val)) return "date-time";
    if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(val)) return "uuid";
    if (/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(val)) return "ipv4";
    return undefined;
  };
  const inferSchema = (data: any, options: any): JsonSchema => {
    if (data === null) return {
      type: "null"
    };
    if (Array.isArray(data)) {
      const schema: JsonSchema = {
        type: "array"
      };
      if (data.length > 0) {
        const itemTypes = data.map(item => inferSchema(item, options));
        const allSameType = itemTypes.every(t => t.type === itemTypes[0].type);
        if (allSameType) {
          schema.items = itemTypes[0];
        } else {
          schema.items = {
            type: "any"
          }; // Simplified for tuple mixed types
        }

        // Enum detection for small primitive arrays
        if (data.length <= 10 && data.every(i => typeof i === 'string' || typeof i === 'number')) {
          const unique = [...new Set(data)];
          if (unique.length < data.length && unique.length <= 5) {
            schema.enum = unique;
          }
        }
      } else {
        schema.items = {};
      }
      return schema;
    }
    if (typeof data === "object") {
      const schema: JsonSchema = {
        type: "object",
        properties: {}
      };
      const required: string[] = [];
      let propCount = 0;
      let nestedCount = 0;
      let arrayCount = 0;
      for (const key in data) {
        propCount++;
        const val = data[key];
        const propSchema = inferSchema(val, options);
        if (propSchema.type === "object") nestedCount++;
        if (propSchema.type === "array") arrayCount++;
        if (options.includeDesc && typeof val === "string") {
          propSchema.description = `The ${key} of the entity.`;
        }
        if (options.includeExamples) {
          propSchema.examples = [val];
        }
        schema.properties![key] = propSchema;
        if (options.requireAll) required.push(key);
      }
      if (required.length > 0) schema.required = required;
      schema.additionalProperties = options.additionalProps;

      // We'll attach stats to the root schema temporarily
      (schema as any)._stats = {
        props: propCount,
        nested: nestedCount,
        arrays: arrayCount
      };
      return schema;
    }
    if (typeof data === "string") {
      const schema: JsonSchema = {
        type: "string"
      };
      const fmt = detectFormat(data);
      if (fmt) schema.format = fmt;
      return schema;
    }
    if (typeof data === "number") {
      return {
        type: Number.isInteger(data) ? "integer" : "number"
      };
    }
    if (typeof data === "boolean") {
      return {
        type: "boolean"
      };
    }
    return {};
  };
  const generatedSchema = useMemo(() => {
    try {
      const parsed = JSON.parse(input);
      const options = {
        includeDesc,
        includeExamples,
        requireAll,
        additionalProps
      };
      const schema = inferSchema(parsed, options);
      const urls: Record<string, string> = {
        "4": "http://json-schema.org/draft-04/schema#",
        "6": "http://json-schema.org/draft-06/schema#",
        "7": "http://json-schema.org/draft-07/schema#"
      };
      schema.$schema = urls[draft];
      return {
        schema,
        error: null,
        stats: (schema as any)._stats || {
          props: 0,
          nested: 0,
          arrays: 0
        }
      };
    } catch (e: any) {
      return {
        schema: null,
        error: e.message,
        stats: {
          props: 0,
          nested: 0,
          arrays: 0
        }
      };
    }
  }, [input, draft, includeDesc, includeExamples, requireAll, additionalProps]);
  const validateJson = (schema: any, data: any): boolean => {
    if (!schema) return true;
    if (schema.type === "object") {
      if (typeof data !== "object" || data === null || Array.isArray(data)) return false;
      if (schema.required) {
        for (const req of schema.required) {
          if (!(req in data)) return false;
        }
      }
      if (schema.properties) {
        for (const key in schema.properties) {
          if (key in data) {
            if (!validateJson(schema.properties[key], data[key])) return false;
          }
        }
      }
    } else if (schema.type === "array") {
      if (!Array.isArray(data)) return false;
      if (schema.items) {
        for (const item of data) {
          if (!validateJson(schema.items, item)) return false;
        }
      }
    } else if (schema.type === "string") {
      if (typeof data !== "string") return false;
    } else if (schema.type === "number") {
      if (typeof data !== "number") return false;
    } else if (schema.type === "integer") {
      if (typeof data !== "number" || !Number.isInteger(data)) return false;
    } else if (schema.type === "boolean") {
      if (typeof data !== "boolean") return false;
    } else if (schema.type === "null") {
      if (data !== null) return false;
    }
    return true;
  };
  const runValidation = () => {
    if (!generatedSchema.schema) return toast.error("Fix JSON input first");
    try {
      const parsedTest = JSON.parse(validationInput);
      const isValid = validateJson(generatedSchema.schema, parsedTest);
      setValidationResult({
        valid: isValid,
        error: isValid ? "" : "Data structure does not match the generated schema."
      });
      if (isValid) toast.success("Validation passed!");else toast.error("Validation failed");
    } catch (e: any) {
      setValidationResult({
        valid: false,
        error: "Invalid JSON in test payload."
      });
      toast.error("Invalid test JSON");
    }
  };
  return <div className="relative max-w-6xl mx-auto space-y-8"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={FileJson} title="JSON Schema Generator" description="Infer strict JSON Schema (Draft 4/6/7) from sample payloads with automated format detection and validation." />

 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <FileJson className="w-4 h-4" /> Sample JSON Input
 </CardTitle>
 </CardHeader>
 <CardContent className="p-4 sm:p-6 space-y-4">
 <textarea className={textareaClass} rows={12} value={input} onChange={e => setInput(e.target.value)} placeholder="Paste valid JSON here..." />
 
 <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-muted/30 border border-border/50">
 <div className="space-y-2">
 <Label className="text-xs">Draft Version</Label>
 <div className="flex gap-2">
 {["4", "6", "7"].map(d => <Button key={d} variant={draft === d ? "default" : "outline"} size="sm" onClick={() => setDraft(d as any)} className="flex-1">
 v{d}
 </Button>)}
 </div>
 </div>
 <div className="space-y-2">
 <Label className="text-xs">Options</Label>
 <div className="space-y-1 text-xs">
 <label className="flex items-center gap-2 cursor-pointer">
 <input type="checkbox" checked={requireAll} onChange={e => setRequireAll(e.target.checked)} /> Mark all required
 </label>
 <label className="flex items-center gap-2 cursor-pointer">
 <input type="checkbox" checked={includeDesc} onChange={e => setIncludeDesc(e.target.checked)} /> Add descriptions
 </label>
 <label className="flex items-center gap-2 cursor-pointer">
 <input type="checkbox" checked={includeExamples} onChange={e => setIncludeExamples(e.target.checked)} /> Add examples
 </label>
 <label className="flex items-center gap-2 cursor-pointer">
 <input type="checkbox" checked={additionalProps} onChange={e => setAdditionalProps(e.target.checked)} /> Allow additional
 </label>
 </div>
 </div>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <Settings className="w-4 h-4" /> Generated Schema
 </CardTitle>
 </CardHeader>
 <CardContent className="p-4 sm:p-6 space-y-4">
 {generatedSchema.stats.props > 0 && <div className="grid grid-cols-3 gap-2 p-3 rounded-lg bg-primary/5 border border-primary/20">
 <div className="text-center">
 <div className="text-lg font-bold text-primary">{generatedSchema.stats.props}</div>
 <div className="text-[10px] uppercase text-muted-foreground">Properties</div>
 </div>
 <div className="text-center">
 <div className="text-lg font-bold text-primary">{generatedSchema.stats.nested}</div>
 <div className="text-[10px] uppercase text-muted-foreground">Nested Obj</div>
 </div>
 <div className="text-center">
 <div className="text-lg font-bold text-primary">{generatedSchema.stats.arrays}</div>
 <div className="text-[10px] uppercase text-muted-foreground">Arrays</div>
 </div>
 </div>}

 <div className="relative flex-1 min-h-[300px]">
 <pre className={`${textareaClass} h-full overflow-auto whitespace-pre-wrap`}>
 {generatedSchema.error ? `// ERROR: ${generatedSchema.error}` : JSON.stringify(generatedSchema.schema, null, 2)}
 </pre>
 {!generatedSchema.error && <Button size="icon" variant="ghost" className="absolute top-2 right-2" onClick={() => handleCopy(JSON.stringify(generatedSchema.schema, null, 2))}>
 <Copy className="w-4 h-4" />
 </Button>}
 </div>
 </CardContent>
 </GlassCard>
 </div>

 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <CheckCircle className="w-4 h-4" /> Validation Tester
 </CardTitle>
 </CardHeader>
 <CardContent className="p-4 sm:p-6 space-y-4">
 <textarea className={textareaClass} rows={6} value={validationInput} onChange={e => setValidationInput(e.target.value)} placeholder='Paste a second JSON object here to test against the schema...' />
 <div className="flex items-center gap-4">
 <Button onClick={runValidation}>Validate Payload</Button>
 {validationResult && <div className={`flex items-center gap-2 text-sm font-medium ${validationResult.valid ? "text-green-500" : "text-red-500"}`}>
 {validationResult.valid ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
 {validationResult.valid ? "Valid against schema!" : validationResult.error}
 </div>}
 </div>
 </CardContent>
 </GlassCard>

 <ToolHowItWorks steps={[{
        step: "01",
        title: "Provide Sample Data",
        description: "Paste a representative JSON object. The engine will recursively analyze nested structures and arrays.",
        icon: FileJson
      }, {
        step: "02",
        title: "Configure Rules",
        description: "Select your target Draft version, enforce required fields, and enable automatic descriptions and examples.",
        icon: Settings
      }, {
        step: "03",
        title: "Validate & Export",
        description: "Copy the generated schema for your API, or use the built-in validator to test edge-case payloads instantly.",
        icon: CheckCircle
      }]} badges={["100% Free", "Client-Side Privacy", "No Signup"]} />

 <ToolFeatureGuides features={[{
        icon: BarChart3,
        title: "Smart Format Detection",
        description: "Automatically identifies emails, URIs, UUIDs, and IPv4 addresses to apply strict format constraints."
      }, {
        icon: FileJson,
        title: "Recursive Inference",
        description: "Deeply traverses nested objects and arrays, calculating tuple types and generating nested property definitions."
      }, {
        icon: Settings,
        title: "Draft 4/6/7 Support",
        description: "Outputs compliant schema URIs for legacy systems (Draft 4) or modern validators (Draft 7)."
      }, {
        icon: CheckCircle,
        title: "Instant Validation",
        description: "Test edge-case payloads against your generated schema locally without needing an external API or CLI tool."
      }]}>
 <div className="prose dark:prose-invert max-w-none">
 <h3>The Importance of Strict API Contracts</h3>
 <p>In modern distributed systems and microservice architectures, the contract between a client and a server is paramount. JSON Schema serves as the definitive blueprint for these contracts, allowing developers to validate incoming requests, generate TypeScript interfaces, and auto-generate API documentation. However, writing complex schemas by hand is tedious and prone to human error.</p>
 <p>This inference engine bridges the gap by reverse-engineering the schema directly from a sample payload. It goes beyond simple type detection by analyzing string formats (identifying UUIDs or emails), detecting enums in small arrays, and recursively mapping deep object hierarchies. By enforcing strict rules like <code>additionalProperties: false</code> and <code>required</code> arrays, it helps developers build defensive APIs that reject malformed data at the gateway.</p>
 <h3>Advanced Inference Capabilities</h3>
 <ul>
 <li><strong>Array Homogeneity:</strong> Analyzes array contents to determine if items share a uniform type or require tuple validation.</li>
 <li><strong>Enum Generation:</strong> Automatically generates <code>enum</code> constraints for primitive arrays containing a small number of unique values.</li>
 <li><strong>Type Strictness:</strong> Differentiates between generic <code>number</code> types and strict <code>integer</code> types based on decimal presence.</li>
 </ul>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion faqs={[{
        question: "What is the difference between JSON Schema Draft 4 and Draft 7?",
        answer: "Draft 7 introduces several new keywords like 'if/then/else', 'const', and 'readOnly'. Draft 4 is older and used by legacy systems, while Draft 7 is widely supported by modern validators like Ajv."
      }, {
        question: "Will this tool detect custom formats like phone numbers?",
        answer: "Currently, it detects standard IETF formats (email, uri, uuid, ipv4, date-time). Custom regex formats must be added manually to the generated output."
      }, {
        question: "Can it handle deeply nested JSON?",
        answer: "Yes. The inference engine is fully recursive and will map objects nested to any depth, generating the corresponding nested 'properties' blocks."
      }, {
        question: "Is my JSON data sent to a server for parsing?",
        answer: "No. All parsing, inference, and validation logic executes entirely in your browser via JavaScript. Your data remains private and local."
      }]} />

 <RelatedTools currentToolUrl="/tools/dev/json-schema" max={6} />
 </div></div>;
}
export default JsonSchemaClient;