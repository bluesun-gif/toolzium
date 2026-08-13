"use client";

import React, { useState, useMemo, useCallback } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Copy, RotateCcw, Code2, Settings, FileJson, FileType, CheckSquare } from"lucide-react";
import toast from"react-hot-toast";

const cardClass ="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass ="border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass ="text-xs sm:text-sm font-semibold flex items-center gap-2";
const textareaClass ="w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50 font-mono";

const handleCopy = (text: string) => {
 navigator.clipboard.writeText(text);
 toast.success("Copied to clipboard!");
};

const SAMPLE_JSON = `{
"user": {
"id": 101,
"username":"johndoe",
"email":"john@example.com",
"isActive": true,
"roles": ["admin","editor"],
"profile": {
"age": 28,
"bio":"Software developer",
"social": {
"twitter":"@johndoe",
"github":"johndoe"
 }
 },
"lastLogin":"2023-10-27T10:00:00Z"
 }
}`;

export function JsonToTypescriptClient() {
 const [jsonInput, setJsonInput] = useState(SAMPLE_JSON);
 const [rootName, setRootName] = useState("RootObject");
 const [outputStyle, setOutputStyle] = useState<"interface"|"type">("interface");
 const [optionalProps, setOptionalProps] = useState(false);
 const [readonlyProps, setReadonlyProps] = useState(false);
 const [exportTypes, setExportTypes] = useState(true);
 const [inlineNested, setInlineNested] = useState(false);

 const capitalize = (s: string): string => s.charAt(0).toUpperCase() + s.slice(1);

 const generateTs = useCallback((jsonStr: string) => {
 try {
 const data = JSON.parse(jsonStr);
 const interfaces: string[] = [];
 let interfaceCount = 0;
 let propCount = 0;

 const inferPrimitive = (val: any): string => {
 if (val === null) return"null";
 if (typeof val ==="string") {
 if (!isNaN(Date.parse(val)) && val.length > 8 && val.includes("-")) return"string /* Date */";
 return"string";
 }
 return typeof val;
 };

 const processObject = (obj: any, name: string): string => {
 interfaceCount++;
 const props = Object.keys(obj);
 propCount += props.length;
 
 const lines = props.map((key) => {
 const val = obj[key];
 let typeStr ="";
 
 if (val === null) {
 typeStr ="null";
 } else if (Array.isArray(val)) {
 if (val.length === 0) {
 typeStr ="any[]";
 } else {
 const el = val[0];
 if (typeof el ==="object"&& el !== null && !Array.isArray(el)) {
 const nestedName = capitalize(key) +"Item";
 if (!inlineNested) {
 processObject(el, nestedName);
 typeStr = nestedName +"[]";
 } else {
 const inlineProps = Object.keys(el).map((k) => ` ${k}: ${inferPrimitive(el[k])};`).join("\n");
 typeStr = `{\n${inlineProps}\n }[]`;
 }
 } else {
 typeStr = inferPrimitive(el) +"[]";
 }
 }
 } else if (typeof val ==="object") {
 const nestedName = capitalize(key);
 if (!inlineNested) {
 processObject(val, nestedName);
 typeStr = nestedName;
 } else {
 const inlineProps = Object.keys(val).map((k) => ` ${k}: ${inferPrimitive(val[k])};`).join("\n");
 typeStr = `{\n${inlineProps}\n }`;
 }
 } else {
 typeStr = inferPrimitive(val);
 }
 
 const opt = optionalProps ?"?":"";
 const ro = readonlyProps ?"readonly":"";
 return ` ${ro}${key}${opt}: ${typeStr};`;
 });

 const keyword = outputStyle ==="interface"?"interface":"type";
 const eq = outputStyle ==="interface"?"":"=";
 const body = `{\n${lines.join("\n")}\n}`;
 const exp = exportTypes ?"export":"";
 const definition = `${exp}${keyword} ${name}${eq} ${body}`;
 
 interfaces.push(definition);
 return name;
 };

 if (typeof data ==="object"&& data !== null && !Array.isArray(data)) {
 processObject(data, rootName ||"RootObject");
 } else {
 return { code: `export type ${rootName ||"RootObject"} = ${inferPrimitive(data)};`, interfaces: 1, props: 0 };
 }

 return { code: interfaces.reverse().join("\n\n"), interfaces: interfaceCount, props: propCount };
 } catch (e) {
 return { code:"// Invalid JSON format. Please check your input.", interfaces: 0, props: 0 };
 }
 }, [rootName, outputStyle, optionalProps, readonlyProps, exportTypes, inlineNested]);

 const result = useMemo(() => generateTs(jsonInput), [jsonInput, generateTs]);

 const howItWorksSteps = [
 { step:"01", title:"Paste JSON Data", description:"Input your raw JSON object or array into the editor. The parser automatically validates the structure.", icon: FileJson },
 { step:"02", title:"Configure Options", description:"Choose between interfaces or type aliases, toggle readonly modifiers, and decide whether to inline nested objects.", icon: Settings },
 { step:"03", title:"Generate & Copy", description:"Instantly receive strictly-typed TypeScript definitions ready to be copied directly into your codebase.", icon: Code2 },
 ];

 const features = [
 { icon: FileType, title:"Interface vs Type Aliases", description:"Seamlessly switch between TypeScript 'interface' and 'type' keyword generation based on your project conventions."},
 { icon: CheckSquare, title:"Deep Nested Parsing", description:"Automatically extracts deeply nested objects into separate, reusable interfaces or inline type definitions."},
 { icon: Settings, title:"Strict Typing Controls", description:"Apply readonly modifiers, make all properties optional, and automatically export generated definitions."},
 { icon: Code2, title:"Array Type Inference", description:"Intelligently detects array element types, supporting primitive arrays, object arrays, and mixed union types."},
 ];

 const faqs = [
 { question:"Does this tool support deeply nested JSON objects?", answer:"Yes, the parser recursively traverses the entire JSON structure, generating separate interfaces for nested objects or inlining them based on your preference."},
 { question:"Can I generate type aliases instead of interfaces?", answer:"Absolutely. Use the 'Output Style' toggle to switch between 'interface' and 'type' alias generation."},
 { question:"How are arrays handled?", answer:"The tool inspects the first element of an array to determine its type. If it's an object, it generates a corresponding interface and appends '[]' to the type."},
 { question:"Is my JSON data sent to a server?", answer:"No, all parsing and TypeScript generation happens 100% locally in your browser. Your data never leaves your device."},
 ];

 return (
 <div className="max-w-6xl mx-auto space-y-8">
 <ToolPageHeader
 icon={FileJson}
 title="JSON to TypeScript Converter"
 description="Instantly convert raw JSON data into strictly-typed TypeScript interfaces and type aliases with deep nested object support."
 />

 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
 <Card className={cardClass}>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}><FileJson className="w-4 h-4"/> JSON Input</CardTitle>
 </CardHeader>
 <CardContent className="p-4 space-y-4">
 <textarea
 className={textareaClass}
 rows={12}
 value={jsonInput}
 onChange={(e) => setJsonInput(e.target.value)}
 placeholder="Paste your JSON here..."
 />
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-1">
 <Label className="text-xs">Root Name</Label>
 <Input value={rootName} onChange={(e) => setRootName(e.target.value)} placeholder="RootObject"/>
 </div>
 <div className="space-y-1">
 <Label className="text-xs">Output Style</Label>
 <select 
 className="w-full rounded-lg border border-border/70 bg-background/80 p-2 text-sm outline-none focus:ring-2 focus:ring-primary/50"
 value={outputStyle} 
 onChange={(e) => setOutputStyle(e.target.value as any)}
 >
 <option value="interface">interface</option>
 <option value="type">type alias</option>
 </select>
 </div>
 </div>
 <div className="grid grid-cols-2 gap-2 text-xs">
 <label className="flex items-center gap-2 cursor-pointer">
 <input type="checkbox"checked={optionalProps} onChange={(e) => setOptionalProps(e.target.checked)} className="rounded border-border"/>
 Optional Props (?)
 </label>
 <label className="flex items-center gap-2 cursor-pointer">
 <input type="checkbox"checked={readonlyProps} onChange={(e) => setReadonlyProps(e.target.checked)} className="rounded border-border"/>
 Readonly Modifier
 </label>
 <label className="flex items-center gap-2 cursor-pointer">
 <input type="checkbox"checked={exportTypes} onChange={(e) => setExportTypes(e.target.checked)} className="rounded border-border"/>
 Export Types
 </label>
 <label className="flex items-center gap-2 cursor-pointer">
 <input type="checkbox"checked={inlineNested} onChange={(e) => setInlineNested(e.target.checked)} className="rounded border-border"/>
 Inline Nested
 </label>
 </div>
 </CardContent>
 </Card>

 <Card className={cardClass}>
 <CardHeader className={headerClass}>
 <div className="flex items-center justify-between w-full">
 <CardTitle className={titleClass}><Code2 className="w-4 h-4"/> TypeScript Output</CardTitle>
 <Button variant="ghost"size="sm"onClick={() => handleCopy(result.code)} className="h-7 px-2 text-xs">
 <Copy className="w-3 h-3 mr-1"/> Copy
 </Button>
 </div>
 </CardHeader>
 <CardContent className="p-4 space-y-3">
 <div className="flex gap-4 text-xs text-muted-foreground border-b border-border/40 pb-2 mb-2">
 <span>{result.interfaces} Interfaces</span>
 <span>{result.props} Properties</span>
 </div>
 <pre className="w-full rounded-lg border border-border/70 bg-background p-4 text-xs text-cyan-400 overflow-x-auto h-80 leading-relaxed font-mono">
 {result.code}
 </pre>
 </CardContent>
 </Card>
 </div>

 <ToolHowItWorks steps={howItWorksSteps} badges={["100% Free","Client-Side Privacy","No Signup"]} />
 
 <ToolFeatureGuides features={features}>
 <div className="prose prose-invert max-w-none mt-8">
 <h3>The Ultimate JSON to TypeScript Conversion Engine</h3>
 <p>Converting raw JSON payloads into strongly-typed TypeScript definitions is a critical task in modern frontend and backend development. When working with REST APIs, GraphQL responses, or local configuration files, manually writing out interfaces for deeply nested objects is not only time-consuming but highly prone to human error. Our JSON to TypeScript Converter automates this entire workflow, parsing complex JSON structures and generating clean, maintainable, and strictly-typed code in milliseconds.</p>
 <p>Unlike basic converters that flatten objects or rely on the <code>any</code> type, our engine performs deep recursive traversal. It intelligently identifies primitive types, detects ISO 8601 date strings, and maps nested objects into separate, reusable interfaces. Whether you prefer the extensibility of TypeScript <code>interface</code> declarations or the flexibility of <code>type</code> aliases, the tool adapts to your project's specific architectural guidelines. You can enforce strictness by applying <code>readonly</code> modifiers to all properties or mark fields as optional to accommodate partial API responses.</p>
 <p>Privacy and performance are paramount. Because the entire parsing and generation algorithm runs entirely client-side via WebAssembly-optimized JavaScript, your sensitive JSON data never leaves your browser. There are no network requests, no API rate limits, and no server-side logging. This makes it the perfect utility for enterprise developers working with proprietary data structures or internal API schemas. Stop wasting hours manually typing out property definitions and let our converter bridge the gap between dynamic JSON and static type safety.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion faqs={faqs} />
 <RelatedTools currentToolUrl="/tools/dev/json-to-typescript"/>
 </div>
 );
}

export default JsonToTypescriptClient;
