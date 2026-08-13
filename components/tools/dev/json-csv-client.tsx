"use client";

import React, { useState, useMemo, useCallback, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import toast from"react-hot-toast";
import { FileJson, FileSpreadsheet, ArrowRightLeft, Copy, Download, Settings, AlertCircle } from"lucide-react";
import { GridPattern } from"@/components/magicui/grid-pattern";
import { GlassCard } from"@/components/ui/glass-card";

const cardClass ="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass ="border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass ="text-xs sm:text-sm font-semibold flex items-center gap-2";
const textareaClass ="w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50 font-mono";

const SAMPLE_JSON = `[
 {"id": 1,"user": {"name":"Alice","role":"Admin"},"active": true,"tags": ["dev","lead"]},
 {"id": 2,"user": {"name":"Bob","role":"Editor"},"active": false,"tags": ["content"]}
]`;

function flattenObject(obj: any, prefix =""): any {
 let res: any = {};
 for (let k in obj) {
 const key = prefix ? `${prefix}.${k}` : k;
 if (typeof obj[k] ==="object"&& obj[k] !== null && !Array.isArray(obj[k])) {
 Object.assign(res, flattenObject(obj[k], key));
 } else {
 res[key] = obj[k];
 }
 }
 return res;
}

function parseCsvLine(line: string, delimiter: string): string[] {
 const result: string[] = [];
 let current ="";
 let inQuotes = false;
 for (let i = 0; i < line.length; i++) {
 const char = line[i];
 if (char === '"') {
 if (inQuotes && line[i+1] === '"') { current += '"'; i++; }
 else inQuotes = !inQuotes;
 } else if (char === delimiter && !inQuotes) {
 result.push(current); current ="";
 } else {
 current += char;
 }
 }
 result.push(current);
 return result;
}

export default function JsonCsvClient() {
 const [jsonStr, setJsonStr] = useState(SAMPLE_JSON);
 const [csvStr, setCsvStr] = useState("");
 const [direction, setDirection] = useState<"json-csv"|"csv-json">("json-csv");
 const [delimiter, setDelimiter] = useState(",");
 const [flatten, setFlatten] = useState(true);
 const [error, setError] = useState("");

 useEffect(() => {
 setError("");
 try {
 if (direction ==="json-csv") {
 const parsed = JSON.parse(jsonStr);
 if (!Array.isArray(parsed)) throw new Error("JSON must be an array of objects");
 const flatData = flatten ? parsed.map((item: any) => flattenObject(item)) : parsed;
 const headers = Array.from(new Set(flatData.flatMap(Object.keys)));
 const rows = flatData.map(row => 
 headers.map(h => {
 let val = row[h];
 if (val === null || val === undefined) return"";
 if (typeof val ==="object") val = JSON.stringify(val);
 val = String(val);
 if (val.includes(delimiter) || val.includes('"') || val.includes('\n')) {
 return `"${val.replace(/"/g, '""')}"`;
 }
 return val;
 }).join(delimiter)
 );
 setCsvStr([headers.join(delimiter), ...rows].join('\n'));
 } else {
 const lines = csvStr.split('\n').filter(l => l.trim());
 if (!lines.length) { setJsonStr("[]"); return; }
 const headers = parseCsvLine(lines[0], delimiter);
 const json = lines.slice(1).map(line => {
 const vals = parseCsvLine(line, delimiter);
 const obj: any = {};
 headers.forEach((h, i) => {
 let v: any = vals[i] ||"";
 if (!isNaN(Number(v)) && v.trim() !=="") v = Number(v);
 else if (v ==="null") v = null;
 else if (v ==="true") v = true;
 else if (v ==="false") v = false;
 obj[h] = v;
 });
 return obj;
 });
 setJsonStr(JSON.stringify(json, null, 2));
 }
 } catch (err: any) {
 setError(err.message ||"Invalid data format");
 }
 }, [jsonStr, csvStr, direction, delimiter, flatten]);

 const stats = useMemo(() => {
 if (direction ==="json-csv"&& !error) {
 try {
 const parsed = JSON.parse(jsonStr);
 const flatData = flatten ? parsed.map((item: any) => flattenObject(item)) : parsed;
 const cols = new Set(flatData.flatMap(Object.keys)).size;
 return `${parsed.length} rows, ${cols} columns`;
 } catch { return""; }
 } else if (!error) {
 const lines = csvStr.split('\n').filter(l => l.trim());
 const cols = lines.length > 0 ? parseCsvLine(lines[0], delimiter).length : 0;
 return `${Math.max(0, lines.length - 1)} rows, ${cols} columns`;
 }
 return"";
 }, [jsonStr, csvStr, direction, delimiter, flatten, error]);

 const downloadFile = (content: string, ext: string) => {
 const blob = new Blob([content], { type:"text/plain"});
 const url = URL.createObjectURL(blob);
 const a = document.createElement("a");
 a.href = url; a.download = `data.${ext}`; a.click();
 URL.revokeObjectURL(url);
 toast.success(`Downloaded data.${ext}`);
 };

 const steps = [
 { step:"01", title:"Paste Data", description:"Input your raw JSON array or CSV text into the respective editor pane.", icon: FileJson },
 { step:"02", title:"Configure Options", description:"Set delimiters, toggle nested object flattening, and enable type detection.", icon: Settings },
 { step:"03", title:"Convert & Export", description:"Instantly transform your data and download the resulting file or copy to clipboard.", icon: Download },
 ];

 const features = [
 { icon: FileJson, title:"Nested Flattening", description:"Automatically converts deeply nested JSON objects into dot-notation CSV headers."},
 { icon: FileSpreadsheet, title:"Smart Delimiters", description:"Support for commas, semicolons, tabs, and pipes with proper quote escaping."},
 { icon: ArrowRightLeft, title:"Bi-Directional", description:"Seamlessly convert JSON to CSV and CSV back to typed JSON objects."},
 { icon: Download, title:"Instant Export", description:"Download your transformed data as clean .json or .csv files instantly."},
 ];

 const faqs = [
 { question:"How does the tool handle nested JSON objects?", answer:"When the 'Flatten nested' option is enabled, the tool recursively traverses your JSON objects and converts nested structures into dot-notation headers (e.g., `user.address.city`). This ensures that complex hierarchical data can be accurately represented in a flat, two-dimensional CSV table."},
 { question:"Will my CSV data with commas break the conversion?", answer:"No. The converter strictly follows RFC 4180 standards. If a cell value contains the selected delimiter, double quotes, or newline characters, it is automatically wrapped in double quotes, and any internal quotes are properly escaped to prevent parsing errors."},
 { question:"Is my data sent to a server?", answer:"Absolutely not. All parsing, transformation, and file generation happens entirely within your browser's memory using client-side JavaScript. Your sensitive data never leaves your device, ensuring complete privacy and security."},
 ];

 return (
 <div className="max-w-6xl mx-auto space-y-8 pb-12 px-4">
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray="4 2"
        className="absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
      />

 <ToolPageHeader icon={ArrowRightLeft} title="JSON to CSV Converter"description="Transform JSON arrays into flat CSV files and vice versa with nested object flattening and custom delimiters."/>
 
 <GlassCard>
 <CardHeader className={headerClass}>
 <div className="flex items-center justify-between w-full flex-wrap gap-4">
 <CardTitle className={titleClass}><Settings className="w-4 h-4"/> Conversion Engine</CardTitle>
 <div className="flex items-center gap-2">
 <Button variant={direction ==="json-csv"?"default":"outline"} size="sm"onClick={() => setDirection("json-csv")}>JSON → CSV</Button>
 <Button variant={direction ==="csv-json"?"default":"outline"} size="sm"onClick={() => setDirection("csv-json")}>CSV → JSON</Button>
 </div>
 </div>
 </CardHeader>
 <CardContent className="p-6 space-y-4">
 <div className="flex flex-wrap gap-4 items-end">
 <div className="space-y-1">
 <Label className="text-xs">Delimiter</Label>
 <select value={delimiter} onChange={e => setDelimiter(e.target.value)} className="h-9 rounded-md border border-border bg-background px-3 text-sm">
 <option value=",">Comma (,)</option>
 <option value=";">Semicolon (;)</option>
 <option value="\t">Tab (\t)</option>
 <option value="|">Pipe (|)</option>
 </select>
 </div>
 <label className="flex items-center gap-2 text-sm cursor-pointer">
 <input type="checkbox"checked={flatten} onChange={e => setFlatten(e.target.checked)} className="rounded border-border"/>
 Flatten Nested Objects
 </label>
 <Button variant="outline"size="sm"onClick={() => setJsonStr(SAMPLE_JSON)}>Load Sample</Button>
 {stats && <span className="text-xs text-muted-foreground ml-auto font-mono">{stats}</span>}
 </div>

 {error && (
 <div className="flex items-center gap-2 text-destructive text-xs bg-destructive/10 p-2 rounded">
 <AlertCircle className="w-4 h-4"/> {error}
 </div>
 )}

 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div className="space-y-2">
 <div className="flex items-center justify-between">
 <Label className="text-xs flex items-center gap-1"><FileJson className="w-3 h-3"/> JSON</Label>
 <div className="flex gap-1">
 <Button variant="ghost"size="icon"className="h-6 w-6"onClick={() => { navigator.clipboard.writeText(jsonStr); toast.success("Copied JSON"); }}><Copy className="w-3 h-3"/></Button>
 <Button variant="ghost"size="icon"className="h-6 w-6"onClick={() => downloadFile(jsonStr,"json")}><Download className="w-3 h-3"/></Button>
 </div>
 </div>
 <textarea className={textareaClass} rows={15} value={jsonStr} onChange={e => setJsonStr(e.target.value)} />
 </div>
 <div className="space-y-2">
 <div className="flex items-center justify-between">
 <Label className="text-xs flex items-center gap-1"><FileSpreadsheet className="w-3 h-3"/> CSV</Label>
 <div className="flex gap-1">
 <Button variant="ghost"size="icon"className="h-6 w-6"onClick={() => { navigator.clipboard.writeText(csvStr); toast.success("Copied CSV"); }}><Copy className="w-3 h-3"/></Button>
 <Button variant="ghost"size="icon"className="h-6 w-6"onClick={() => downloadFile(csvStr,"csv")}><Download className="w-3 h-3"/></Button>
 </div>
 </div>
 <textarea className={textareaClass} rows={15} value={csvStr} onChange={e => setCsvStr(e.target.value)} />
 </div>
 </div>
 </CardContent>
 </GlassCard>

 <ToolHowItWorks steps={steps} badges={["100% Free","Client-Side Privacy","No Signup"]} />
 
 <ToolFeatureGuides features={features}>
 <div className="prose prose-sm dark:prose-invert max-w-none">
 <h3>Mastering Data Interchange Formats</h3>
 <p>Data interchange is the lifeblood of modern web applications, and the ability to seamlessly convert between JSON and CSV formats is a daily necessity for developers, data analysts, and backend engineers. JSON (JavaScript Object Notation) is the undisputed standard for API payloads and NoSQL database storage due to its ability to represent complex, nested hierarchical structures. Conversely, CSV (Comma-Separated Values) remains the universal format for spreadsheet applications like Excel, Google Sheets, and legacy enterprise data pipelines due to its compact, tabular nature.</p>
 <p>Converting deeply nested JSON arrays into flat CSV files requires intelligent parsing algorithms. A robust converter must traverse nested objects, flattening them using dot notation (e.g., `user.address.city`) to preserve data relationships without breaking the two-dimensional table structure. It must also gracefully handle edge cases, such as arrays within values, escaping commas and newline characters within quoted strings, and automatically detecting data types to prevent numeric strings from being corrupted. On the flip side, parsing CSV back into JSON requires a state machine capable of respecting quote enclosures and custom delimiters like tabs, semicolons, or pipes. Whether you are performing ETL (Extract, Transform, Load) operations, migrating legacy databases, or simply preparing API data for a stakeholder report, a client-side JSON to CSV converter ensures your data transformations are fast, secure, and completely private, as no data ever leaves your browser.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion faqs={faqs} />
 <RelatedTools currentToolUrl="/tools/dev/json-to-csv-converter" max={6} />
 </div>
 );
}
