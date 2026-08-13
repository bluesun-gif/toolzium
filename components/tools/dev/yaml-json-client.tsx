"use client";

import { 
 Braces, Code2, Download, Info, Settings2, 
 BookOpen, Shield, FileJson, Layers, ArrowLeftRight, Globe, Zap, AlignLeft 
} from"lucide-react";
import React from"react";
import {
 ActionButton,
 CopyButton,
 ExportTextButton,
 ResetButton,
} from"@/components/shared/action-buttons";
import InputField from"@/components/shared/form-fields/input-field";
import SelectField from"@/components/shared/form-fields/select-field";
import SwitchRow from"@/components/shared/form-fields/switch-row";
import TextareaField from"@/components/shared/form-fields/textarea-field";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { GlassCard } from"@/components/ui/glass-card";
import { Separator } from"@/components/ui/separator";

/* Types */
type Direction ="auto"|"yaml-to-json"|"json-to-yaml";

type YamlLib = {
 load: (src: string) => unknown;
 dump: (obj: unknown, opts?: Record<string, unknown>) => string;
 loadAll?: (src: string, iter?: (doc: unknown) => void) => unknown;
};

export default function YamlJsonClient() {
 const [yamlLib, setYamlLib] = React.useState<YamlLib | null>(null);
 React.useEffect(() => {
 let mounted = true;
 (async () => {
 const mod = await import("js-yaml");
 if (typeof window !== "undefined") {
 setYamlLib({
 load: mod.load as YamlLib["load"],
 dump: mod.dump as YamlLib["dump"],
 loadAll: mod.loadAll as YamlLib["loadAll"],
 });
 }
 })();
 return () => {
 mounted = false;
 };
 }, []);

 // IO
 const [input, setInput] = React.useState("");
 const [output, setOutput] = React.useState("");

 // Options
 const [direction, setDirection] = React.useState<Direction>("auto");
 const [autoRun, setAutoRun] = React.useState(true);

 // JSON formatting
 const [jsonSpaces, setJsonSpaces] = React.useState(2);
 const [jsonSortKeys, setJsonSortKeys] = React.useState(false);

 // YAML formatting
 const [yamlFlow, setYamlFlow] = React.useState(false);
 const [yamlLineWidth, setYamlLineWidth] = React.useState(80);
 const [yamlSortKeys, setYamlSortKeys] = React.useState(false);
 const [yamlMultiDocs, setYamlMultiDocs] = React.useState(false);

 const [error, setError] = React.useState<string | null>(null);

 // Helpers
 const detectDirection = React.useCallback((s: string): Direction => {
 const t = s.trim();
 if (!t) return"auto";
 if (/^[\s\n]*[{[]/.test(t)) return"json-to-yaml";
 if (/^---\s|:\s|-\s/.test(t)) return"yaml-to-json";
 try {
 JSON.parse(t);
 return"json-to-yaml";
 } catch {
 return"yaml-to-json";
 }
 }, []);

 const normalizeKeys = React.useCallback(
 (val: unknown): unknown => {
 if (!jsonSortKeys && !yamlSortKeys) return val;
 const sort = (x: unknown): unknown => {
 if (Array.isArray(x)) return x.map(sort);
 if (x && typeof x ==="object") {
 const obj = x as Record<string, unknown>;
 return Object.fromEntries(
 Object.keys(obj)
 .sort((a, b) => a.localeCompare(b))
 .map((k) => [k, sort(obj[k])]),
 );
 }
 return x;
 };
 return sort(val);
 },
 [jsonSortKeys, yamlSortKeys],
 );

 const toYaml = React.useCallback(
 (obj: unknown): string => {
 if (!yamlLib) return"";
 return yamlLib.dump(normalizeKeys(obj), {
 noRefs: true,
 lineWidth: yamlLineWidth || 80,
 flowLevel: yamlFlow ? 0 : -1,
 sortKeys: yamlSortKeys,
 });
 },
 [yamlLib, normalizeKeys, yamlLineWidth, yamlFlow, yamlSortKeys],
 );

 const toJson = React.useCallback(
 (obj: unknown): string => JSON.stringify(normalizeKeys(obj), null, Math.max(0, jsonSpaces)),
 [normalizeKeys, jsonSpaces],
 );

 const doConvert = React.useCallback(() => {
 const txt = input.trim();
 if (!txt) {
 setError(null);
 setOutput("");
 return;
 }
 setError(null);
 try {
 const dir: Direction = direction ==="auto"? detectDirection(txt) : direction;
 if (dir ==="yaml-to-json") {
 if (!yamlLib) return;
 if (yamlMultiDocs && yamlLib.loadAll) {
 const docs: unknown[] = [];
 yamlLib.loadAll(txt, (doc: unknown) => docs.push(doc));
 setOutput(toJson(docs));
 } else {
 const obj = yamlLib.load(txt);
 setOutput(toJson(obj));
 }
 } else {
 const obj = JSON.parse(txt);
 setOutput(toYaml(obj));
 }
 } catch (e) {
 setOutput("");
 setError(e instanceof Error ? e.message : String(e));
 }
 }, [input, direction, detectDirection, yamlLib, yamlMultiDocs, toJson, toYaml]);

 // Simple debounce for auto-run
 React.useEffect(() => {
 if (!autoRun || !yamlLib) return;
 const t = window.setTimeout(() => doConvert(), 250);
 return () => window.clearTimeout(t);
 }, [autoRun, yamlLib, doConvert]);

 // Samples
 const sampleYaml = `---
app: Toolzium
version: 1.0
active: true
tags:
 - dev
 - utils
 - converter
config:
 theme: dark
 options:
 autoSave: true
 lineWidth: 120
users:
 - id: 1
 name: Alice
 roles: [admin, editor]
 - id: 2
 name: Bob
 roles:
 - viewer
 - tester
---
# Another YAML document
service: API
endpoints:
 - path: /login
 method: POST
 - path: /logout
 method: GET
`;

 const sampleJSON = `[
 {
"id": 1,
"name":"Alice",
"active": true,
"roles": ["admin","editor"],
"profile": {"email":"alice@example.com","age": 30 }
 },
 {
"id": 2,
"name":"Bob",
"active": false,
"roles": ["viewer","tester"],
"profile": {"email":"bob@example.com","age": 25 }
 }
]`;

 const exportPayload = React.useMemo(
 () => ({
 input,
 direction,
 options: {
 jsonSpaces,
 jsonSortKeys,
 yamlFlow,
 yamlLineWidth,
 yamlSortKeys,
 yamlMultiDocs,
 },
 output,
 generatedAt: new Date().toISOString(),
 }),
 [
 input,
 direction,
 jsonSpaces,
 jsonSortKeys,
 yamlFlow,
 yamlLineWidth,
 yamlSortKeys,
 yamlMultiDocs,
 output,
 ],
 );

 const resetAll = () => {
 setInput("");
 setOutput("");
 setDirection("auto");
 setAutoRun(true);
 setJsonSpaces(2);
 setJsonSortKeys(false);
 setYamlFlow(false);
 setYamlLineWidth(80);
 setYamlSortKeys(false);
 setYamlMultiDocs(false);
 setError(null);
 };

 return (
 <div className="max-w-6xl mx-auto space-y-8">
 <ToolPageHeader
 title="YAML ⇄ JSON"
 description="Convert YAML to JSON and back. Multi-doc YAML, pretty/minified JSON, sorting, and YAML flow style."
 icon={Code2}
 actions={
 <>
 <ResetButton onClick={resetAll} />
 <ExportTextButton
 variant="default"
 icon={Download}
 label="Export Session"
 filename="yaml-json-session.json"
 getText={() => JSON.stringify(exportPayload, null, 2)}
 />
 </>
 }
 />

 <GlassCard>
 <CardContent className="grid gap-4 lg:grid-cols-3">
 {/* Left: input & controls */}
 <div className="lg:col-span-2 space-y-3">
 <TextareaField
 id="input"
 placeholder="Paste YAML or JSON here…"
 value={input}
 onChange={(e) => setInput(e.target.value)}
 textareaClassName="min-h-[320px]"
 />

 <div className="flex items-center gap-2 flex-wrap">
 <InputField
 fileButtonSize="sm"
 type="file"
 fileButtonLabel="Import JSON"
 accept="application/json"
 onFilesChange={async (files) => {
 const f = files?.[0];
 if (!f) return;
 const txt = await f.text();
 setDirection("json-to-yaml");
 setInput(txt);
 }}
 />
 <InputField
 fileButtonSize="sm"
 type="file"
 fileButtonLabel="Import YAML"
 accept=".yaml,.yml,text/yaml,text/plain"
 onFilesChange={async (files) => {
 const f = files?.[0];
 if (!f) return;
 const txt = await f.text();
 setDirection("yaml-to-json");
 setInput(txt);
 }}
 />
 <ActionButton
 size="sm"
 label="Sample YAML"
 icon={Braces}
 onClick={() => {
 setInput(sampleYaml);
 setDirection("yaml-to-json");
 }}
 />
 <ActionButton
 size="sm"
 label="Sample JSON"
 icon={Braces}
 onClick={() => {
 setInput(sampleJSON);
 setDirection("json-to-yaml");
 }}
 />
 </div>

 <div className="grid gap-3 sm:grid-cols-2 items-end">
 <SelectField
 id="direction"
 label="Direction"
 value={direction}
 onValueChange={(v) => setDirection(v as Direction)}
 options={[
 { value:"auto", label:"Auto-detect"},
 { value:"yaml-to-json", label:"YAML → JSON"},
 { value:"json-to-yaml", label:"JSON → YAML"},
 ]}
 />
 <SwitchRow
 className="h-fit"
 label="Auto-run"
 checked={autoRun}
 onCheckedChange={setAutoRun}
 />
 </div>

 {error && (
 <div className="mt-2 flex items-start gap-2 rounded-md border border-destructive/40 bg-destructive/10 p-2 text-destructive">
 <Info className="mt-0.5 h-4 w-4"/>
 <div className="text-sm">{error}</div>
 </div>
 )}
 </div>

 {/* Right: options */}
 <div className="rounded-lg border p-3 space-y-3">
 <div className="flex items-center gap-2">
 <Settings2 className="h-4 w-4"/>
 <div className="text-sm font-medium">Options</div>
 </div>

 <div className="grid gap-2">
 <div className="text-xs font-medium opacity-80">JSON Output</div>
 <InputField
 id="jsonSpaces"
 type="number"
 label="Spaces"
 min={0}
 max={8}
 value={String(jsonSpaces)}
 onChange={(e) => setJsonSpaces(Math.max(0, Number(e.target.value) || 0))}
 />
 <SwitchRow
 label="Sort keys (JSON)"
 checked={jsonSortKeys}
 onCheckedChange={setJsonSortKeys}
 />
 </div>

 <Separator className="my-2"/>

 <div className="grid gap-2">
 <div className="text-xs font-medium opacity-80">YAML Output</div>
 <SwitchRow label="Flow style"checked={yamlFlow} onCheckedChange={setYamlFlow} />
 <InputField
 id="yamlWidth"
 type="number"
 label="Line width"
 min={40}
 max={200}
 value={String(yamlLineWidth)}
 onChange={(e) =>
 setYamlLineWidth(Math.min(200, Math.max(40, Number(e.target.value) || 80)))
 }
 />
 <SwitchRow
 label="Sort keys (YAML)"
 checked={yamlSortKeys}
 onCheckedChange={setYamlSortKeys}
 />
 <SwitchRow
 label="Allow multi-doc YAML (---)"
 checked={yamlMultiDocs}
 onCheckedChange={setYamlMultiDocs}
 />
 </div>
 </div>
 </CardContent>
 </GlassCard>

 <Separator className="my-4"/>

 {/* Output */}
 <GlassCard>
 <CardHeader className="flex items-center justify-between">
 <CardTitle>Output</CardTitle>
 <div className="flex gap-2">
 <CopyButton getText={output} />
 <ExportTextButton
 variant="default"
 icon={Download}
 label="Download"
 filename="converted.txt"
 getText={() => output}
 disabled={!output}
 />
 </div>
 </CardHeader>
 <CardContent>
 <TextareaField
 id="output"
 value={output}
 readOnly
 autoResize
 textareaClassName="min-h-[220px]"
 />
 </CardContent>
 </GlassCard>

 {/* SECTION 3: HOW IT WORKS */}
 <ToolHowItWorks
 steps={[
 {
 step:"01",
 title:"Paste YAML or JSON",
 description:"Paste your YAML configuration file or JSON data into the input panel. The tool auto-detects the format based on the input structure.",
 icon: Code2,
 },
 {
 step:"02",
 title:"Convert Instantly",
 description:"Click YAML→JSON to get formatted JSON output, or JSON→YAML to get clean YAML. Both directions support nested objects, arrays, and all data types.",
 icon: ArrowLeftRight,
 },
 {
 step:"03",
 title:"Copy & Use",
 description:"Copy the converted output. Use YAML in config files and CI/CD pipelines; use JSON for APIs, databases, and JavaScript applications.",
 icon: BookOpen,
 },
 ]}
 badges={[
"Bidirectional conversion",
"Nested structure support",
"Works offline",
 ]}
 />

 {/* SECTION 4: FEATURE GUIDES */}
 <ToolFeatureGuides
 features={[
 {
 icon: ArrowLeftRight,
 title:"YAML ↔ JSON Both Directions",
 description:"Convert YAML to JSON and JSON to YAML with equal accuracy. Switch between the two most popular data serialization formats without losing any structure or data types.",
 },
 {
 icon: Layers,
 title:"Nested Structure Support",
 description:"Handles deeply nested objects, arrays, mixed types, null values, multi-line strings (block scalars), and YAML anchors & aliases. Complex configs convert faithfully.",
 },
 {
 icon: Code2,
 title:"Syntax Validation",
 description:"Invalid YAML or JSON produces a clear error message pointing to the problem. Catches indentation errors (the most common YAML mistake) before they reach production.",
 },
 {
 icon: FileJson,
 title:"Pretty Printed Output",
 description:"JSON output is formatted with 2-space indentation for readability. YAML output uses proper block style with clean indentation — not the inline/flow style.",
 },
 {
 icon: AlignLeft,
 title:"All Data Types Preserved",
 description:"Strings, numbers, booleans, nulls, arrays, and nested objects all convert correctly. No type coercion or data loss between formats.",
 },
 {
 icon: Shield,
 title:"Client-Side & Private",
 description:"All conversion runs in your browser. Your configuration files and data never leave your device — safe for sensitive environment configs and secrets.",
 },
 ]}
 >
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <h3 className="text-lg font-semibold">YAML vs JSON — Complete Format Comparison</h3>
 <p>
 Both <strong>YAML</strong> (YAML Ain't Markup Language) and <strong>JSON</strong> (JavaScript Object
 Notation) are human-readable data serialization formats widely used in software development.
 YAML is a superset of JSON, meaning valid JSON is also valid YAML. They excel in different
 contexts and understanding when to use each is key to efficient development workflows.
 </p>

 <h4 className="font-semibold">YAML vs JSON — Feature Comparison</h4>
 <div className="overflow-x-auto">
 <table className="w-full border-collapse text-sm">
 <thead>
 <tr className="bg-muted/50">
 <th className="border p-2 text-left">Feature</th>
 <th className="border p-2 text-left">YAML</th>
 <th className="border p-2 text-left">JSON</th>
 </tr>
 </thead>
 <tbody>
 {[
 ["Comments","Yes (# syntax)","No"],
 ["Readability","Very high — indentation-based","Medium — bracket-based"],
 ["Verbosity","Less verbose","More verbose (quotes required)"],
 ["Multi-line strings","Yes (block scalars | and >)","Requires \\n escaping"],
 ["Data types","Auto-detected (123, true, null)","Explicit (\"true\"vs true)"],
 ["Parsing speed","Slower (complex grammar)","Faster (simpler grammar)"],
 ["Browser support","Requires library","Built-in (JSON.parse)"],
 ["Error-prone","Yes (indentation errors)","Less (brackets delimit)"],
 ].map(([feat, yaml, json]) => (
 <tr key={feat} className="odd:bg-muted/20">
 <td className="border p-2 font-medium text-xs">{feat}</td>
 <td className="border p-2 text-xs">{yaml}</td>
 <td className="border p-2 text-xs">{json}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>

 <h4 className="font-semibold">When to Use YAML vs JSON</h4>
 <div className="overflow-x-auto">
 <table className="w-full border-collapse text-sm">
 <thead>
 <tr className="bg-muted/50">
 <th className="border p-2 text-left">Use Case</th>
 <th className="border p-2 text-left">Prefer</th>
 <th className="border p-2 text-left">Reason</th>
 </tr>
 </thead>
 <tbody>
 {[
 ["GitHub Actions, GitLab CI","YAML","Human-written, comments needed"],
 ["Kubernetes manifests","YAML","Industry standard, readable"],
 ["Docker Compose","YAML","Official format"],
 ["REST API responses","JSON","Browser-native parsing"],
 ["Package.json / config files","JSON","No comments needed, strict"],
 ["Ansible playbooks","YAML","Official format"],
 ["Swagger/OpenAPI spec","YAML or JSON","Both supported equally"],
 ["Database storage","JSON","Native JSONB support in PostgreSQL"],
 ].map(([useCase, prefer, reason]) => (
 <tr key={useCase} className="odd:bg-muted/20">
 <td className="border p-2 font-medium text-xs">{useCase}</td>
 <td className="border p-2 text-primary font-medium text-xs">{prefer}</td>
 <td className="border p-2 text-muted-foreground text-xs">{reason}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>

 <h4 className="font-semibold">Common YAML Pitfalls to Avoid</h4>
 <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
 <li><strong>Tabs vs spaces:</strong> YAML forbids tab characters for indentation — use spaces only. Mixing causes ParseError.</li>
 <li><strong>Implicit type coercion:</strong> YAML auto-converts values — <code>true</code>, <code>yes</code>, <code>on</code> all become boolean true. Quote strings to prevent: <code>'true'</code>.</li>
 <li><strong>Norway problem:</strong> Country code <code>NO</code> becomes boolean false in YAML 1.1 parsers. Always quote country codes and similar values.</li>
 <li><strong>Duplicate keys:</strong> YAML allows duplicate keys (last wins) but JSON does not. Validate YAML carefully before converting.</li>
 </ul>
 </div>
 </ToolFeatureGuides>

 {/* SECTION 5: FAQ + RELATED TOOLS */}
 <ToolFaqAccordion
 faqs={[
 {
 question:"What is the difference between YAML and JSON?",
 answer:"Both are data serialization formats, but YAML is more human-friendly for configuration files — it supports comments, multi-line strings, and requires less punctuation. JSON is better for APIs and data exchange — it's faster to parse and has native browser support (JSON.parse). Valid JSON is also valid YAML since YAML is a superset of JSON.",
 },
 {
 question:"Why does YAML use indentation instead of brackets?",
 answer:"YAML uses indentation (like Python) to define structure, making it very readable for humans writing configuration files. This eliminates the need for braces {} and square brackets [], reducing visual noise. The downside is that indentation errors (tabs vs spaces, wrong indent level) are a common source of YAML bugs.",
 },
 {
 question:"Can YAML handle all JSON data types?",
 answer:"Yes. YAML supports all JSON types: strings, numbers (integers and floats), booleans, null, arrays, and objects. YAML also adds extra types not in JSON: dates (2024-01-15), multi-line strings (block scalars), binary data, and anchors/aliases for reuse.",
 },
 {
 question:"Why is my YAML giving type errors after conversion?",
 answer:"YAML auto-detects types — values like true, false, yes, no, null, 123, 1.5 are automatically converted to their native types. If you want a string, quote it: \"true\", \"123\", \"null\". This is especially important for values like version numbers (\"1.0\"), port numbers, and boolean-looking strings.",
 },
 {
 question:"Is this converter safe for sensitive config files?",
 answer:"Yes. All conversion runs entirely in your browser using a JavaScript YAML parser. Your configuration files, environment variables, secrets, or API keys never leave your device — nothing is sent to any server.",
 },
 ]}
 />
 <RelatedTools currentToolUrl="/tools/dev/yaml-json"max={6} />
 </div>
 );
}
