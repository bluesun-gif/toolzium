"use client";

import React, { useState, useMemo } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Send, Copy, Plus, Trash2, History, Code, Globe, Lock, Loader2 } from"lucide-react";
import toast from"react-hot-toast";

const cardClass ="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass ="border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass ="text-xs sm:text-sm font-semibold flex items-center gap-2";
const textareaClass ="w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50 font-mono";

type KVPair = { key: string; value: string; enabled: boolean };
type HistoryItem = { method: string; url: string; status: number; time: number; timestamp: number };

const METHODS = ["GET","POST","PUT","PATCH","DELETE","HEAD","OPTIONS"];

const syntaxHighlight = (json: string): React.ReactNode => {
 if (!json) return null;
 const html = json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, (match) => {
 let cls = 'text-yellow-500';
 if (/^"/.test(match)) {
 if (/:$/.test(match)) {
 cls = 'text-cyan-400';
 } else {
 cls = 'text-green-400';
 }
 } else if (/true|false/.test(match)) {
 cls = 'text-primary';
 } else if (/null/.test(match)) {
 cls = 'text-red-400';
 }
 return `<span class="${cls}">${match}</span>`;
 });
 return <pre className="text-xs font-mono whitespace-pre-wrap"dangerouslySetInnerHTML={{ __html: html }} />;
};

export function ApiTesterClient() {
 const [method, setMethod] = useState("GET");
 const [url, setUrl] = useState("https://jsonplaceholder.typicode.com/posts/1");
 const [headers, setHeaders] = useState<KVPair[]>([{ key:"", value:"", enabled: true }]);
 const [params, setParams] = useState<KVPair[]>([{ key:"", value:"", enabled: true }]);
 const [bodyType, setBodyType] = useState("JSON");
 const [bodyContent, setBodyContent] = useState('{\n"title":"foo",\n"body":"bar",\n"userId": 1\n}');
 const [authType, setAuthType] = useState("None");
 const [authValue, setAuthValue] = useState("");
 
 const [loading, setLoading] = useState(false);
 const [response, setResponse] = useState<any>(null);
 const [history, setHistory] = useState<HistoryItem[]>([]);
 const [activeTab, setActiveTab] = useState<"params"|"headers"|"body"|"auth">("params");

 const handleCopy = (text: string) => {
 navigator.clipboard.writeText(text);
 toast.success("Copied to clipboard!");
 };

 const updateKV = (type:"headers"|"params", index: number, field:"key"|"value"|"enabled", val: any) => {
 const list = type ==="headers"? [...headers] : [...params];
 list[index] = { ...list[index], [field]: val };
 type ==="headers"? setHeaders(list) : setParams(list);
 };

 const addKV = (type:"headers"|"params") => {
 const list = type ==="headers"? [...headers] : [...params];
 list.push({ key:"", value:"", enabled: true });
 type ==="headers"? setHeaders(list) : setParams(list);
 };

 const removeKV = (type:"headers"|"params", index: number) => {
 const list = type ==="headers"? [...headers] : [...params];
 list.splice(index, 1);
 type ==="headers"? setHeaders(list) : setParams(list);
 };

 const buildUrl = () => {
 let finalUrl = url;
 const activeParams = params.filter((p) => p.enabled && p.key);
 if (activeParams.length > 0) {
 const qs = activeParams.map((p) => `${encodeURIComponent(p.key)}=${encodeURIComponent(p.value)}`).join("&");
 finalUrl += (finalUrl.includes("?") ?"&":"?") + qs;
 }
 return finalUrl;
 };

 const sendRequest = async () => {
 if (!url) return toast.error("Please enter a URL");
 setLoading(true);
 setResponse(null);
 const startTime = performance.now();
 
 try {
 const finalUrl = buildUrl();
 const reqHeaders: Record<string, string> = {};
 headers.filter((h) => h.enabled && h.key).forEach((h) => { reqHeaders[h.key] = h.value; });
 
 if (authType ==="Bearer") reqHeaders["Authorization"] = `Bearer ${authValue}`;
 if (authType ==="Basic") reqHeaders["Authorization"] = `Basic ${btoa(authValue)}`;
 if (authType ==="API Key") reqHeaders["X-API-Key"] = authValue;

 if (method !=="GET"&& method !=="HEAD"&& bodyType ==="JSON") {
 reqHeaders["Content-Type"] ="application/json";
 }

 const res = await fetch(finalUrl, {
 method,
 headers: reqHeaders,
 body: method !=="GET"&& method !=="HEAD"? bodyContent : undefined,
 });

 const endTime = performance.now();
 const time = Math.round(endTime - startTime);
 const text = await res.text();
 let json: any = null;
 try { json = JSON.parse(text); } catch {}

 setResponse({
 status: res.status,
 statusText: res.statusText,
 time,
 size: new Blob([text]).size,
 headers: Object.fromEntries(res.headers.entries()),
 body: text,
 json,
 });

 setHistory((prev) => [{ method, url, status: res.status, time, timestamp: Date.now() }, ...prev].slice(0, 5));
 } catch (err: any) {
 toast.error(`Request Failed: ${err.message}`);
 } finally {
 setLoading(false);
 }
 };

 const loadExample = (type:"get"|"post") => {
 if (type ==="get") {
 setMethod("GET");
 setUrl("https://jsonplaceholder.typicode.com/users/1");
 toast.success("Loaded GET example");
 } else {
 setMethod("POST");
 setUrl("https://jsonplaceholder.typicode.com/posts");
 setBodyContent('{\n"title":"foo",\n"body":"bar",\n"userId": 1\n}');
 toast.success("Loaded POST example");
 }
 };

 return (
 <div className="max-w-6xl mx-auto space-y-8 px-4 py-8">
 <ToolPageHeader
 icon={Globe}
 title="Client-Side API Tester"
 description="A lightweight, browser-based API request builder and tester. Debug REST endpoints, inspect headers, and view responses without leaving your browser."
 />

 <Card className={cardClass}>
 <CardContent className="p-4 space-y-4">
 <div className="flex flex-col sm:flex-row gap-3">
 <select value={method} onChange={(e) => setMethod(e.target.value)} className="w-full sm:w-32 rounded-lg border border-border/70 bg-background/80 p-2 text-sm font-bold">
 {METHODS.map((m) => <option key={m} value={m}>{m}</option>)}
 </select>
 <Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://api.example.com/v1/resource"className="flex-1 font-mono"/>
 <Button onClick={sendRequest} disabled={loading}>
 {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2"/> : <Send className="w-4 h-4 mr-2"/>}
 Send
 </Button>
 </div>
 <div className="flex gap-2 text-xs">
 <Button variant="ghost"size="sm"onClick={() => loadExample("get")}>Load GET Example</Button>
 <Button variant="ghost"size="sm"onClick={() => loadExample("post")}>Load POST Example</Button>
 </div>

 <div className="border-b border-border/40">
 <div className="flex gap-4 text-sm">
 {(["params","headers","body","auth"] as const).map((tab) => (
 <button key={tab} onClick={() => setActiveTab(tab)} className={`pb-2 border-b-2 transition-colors capitalize ${activeTab === tab ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}>
 {tab}
 </button>
 ))}
 </div>
 </div>

 {activeTab ==="params"&& (
 <div className="space-y-2">
 {params.map((p, i) => (
 <div key={i} className="flex gap-2 items-center">
 <input type="checkbox"checked={p.enabled} onChange={(e) => updateKV("params", i,"enabled", e.target.checked)} className="rounded border-border"/>
 <Input placeholder="Key"value={p.key} onChange={(e) => updateKV("params", i,"key", e.target.value)} className="flex-1"/>
 <Input placeholder="Value"value={p.value} onChange={(e) => updateKV("params", i,"value", e.target.value)} className="flex-1"/>
 <Button variant="ghost"size="icon"onClick={() => removeKV("params", i)}><Trash2 className="w-4 h-4 text-red-500"/></Button>
 </div>
 ))}
 <Button variant="outline"size="sm"onClick={() => addKV("params")}><Plus className="w-4 h-4 mr-2"/> Add Parameter</Button>
 </div>
 )}

 {activeTab ==="headers"&& (
 <div className="space-y-2">
 {headers.map((h, i) => (
 <div key={i} className="flex gap-2 items-center">
 <input type="checkbox"checked={h.enabled} onChange={(e) => updateKV("headers", i,"enabled", e.target.checked)} className="rounded border-border"/>
 <Input placeholder="Key"value={h.key} onChange={(e) => updateKV("headers", i,"key", e.target.value)} className="flex-1"/>
 <Input placeholder="Value"value={h.value} onChange={(e) => updateKV("headers", i,"value", e.target.value)} className="flex-1"/>
 <Button variant="ghost"size="icon"onClick={() => removeKV("headers", i)}><Trash2 className="w-4 h-4 text-red-500"/></Button>
 </div>
 ))}
 <Button variant="outline"size="sm"onClick={() => addKV("headers")}><Plus className="w-4 h-4 mr-2"/> Add Header</Button>
 </div>
 )}

 {activeTab ==="body"&& (
 <div className="space-y-3">
 <select value={bodyType} onChange={(e) => setBodyType(e.target.value)} className="w-full sm:w-48 rounded-lg border border-border/70 bg-background/80 p-2 text-sm">
 <option value="JSON">JSON</option>
 <option value="Raw Text">Raw Text</option>
 </select>
 <textarea value={bodyContent} onChange={(e) => setBodyContent(e.target.value)} className={textareaClass} rows={8} placeholder={method ==="GET"?"Body not allowed for GET requests":"Enter payload..."} disabled={method ==="GET"|| method ==="HEAD"} />
 </div>
 )}

 {activeTab ==="auth"&& (
 <div className="space-y-3">
 <select value={authType} onChange={(e) => setAuthType(e.target.value)} className="w-full sm:w-48 rounded-lg border border-border/70 bg-background/80 p-2 text-sm">
 <option value="None">None</option>
 <option value="Bearer">Bearer Token</option>
 <option value="Basic">Basic Auth (user:pass)</option>
 <option value="API Key">API Key (Header)</option>
 </select>
 {authType !=="None"&& <Input placeholder="Token / user:pass / Key Value"value={authValue} onChange={(e) => setAuthValue(e.target.value)} className="font-mono"/>}
 </div>
 )}
 </CardContent>
 </Card>

 {response && (
 <Card className={cardClass}>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>Response</CardTitle>
 <Button variant="outline"size="sm"onClick={() => handleCopy(response.body)}><Copy className="w-4 h-4"/></Button>
 </CardHeader>
 <CardContent className="p-4 space-y-4">
 <div className="flex flex-wrap gap-4 text-sm">
 <div className={`px-3 py-1 rounded-full font-bold ${response.status < 300 ? 'bg-green-500/20 text-green-500' : response.status < 400 ? 'bg-blue-500/20 text-primary' : response.status < 500 ? 'bg-yellow-500/20 text-yellow-500' : 'bg-red-500/20 text-red-500'}`}>
 {response.status} {response.statusText}
 </div>
 <div className="text-muted-foreground">Time: <span className="text-foreground font-bold">{response.time} ms</span></div>
 <div className="text-muted-foreground">Size: <span className="text-foreground font-bold">{response.size} B</span></div>
 </div>

 <details className="border border-border/50 rounded-lg">
 <summary className="p-3 cursor-pointer font-semibold text-sm bg-muted/10">Headers ({Object.keys(response.headers).length})</summary>
 <div className="p-3 text-xs font-mono space-y-1 bg-background/50">
 {Object.entries(response.headers).map(([k, v]) => (
 <div key={k}><span className="text-cyan-400">{k}:</span> <span className="text-muted-foreground">{v as string}</span></div>
 ))}
 </div>
 </details>

 <div className="border border-border/50 rounded-lg overflow-hidden">
 <div className="p-2 bg-muted/20 border-b border-border/50 text-xs font-semibold">Body</div>
 <div className="p-4 bg-background text-foreground max-h-96 overflow-auto">
 {response.json ? syntaxHighlight(JSON.stringify(response.json, null, 2)) : <pre className="text-xs font-mono whitespace-pre-wrap">{response.body}</pre>}
 </div>
 </div>
 </CardContent>
 </Card>
 )}

 {history.length > 0 && (
 <Card className={cardClass}>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}><History className="w-4 h-4"/> Recent Requests</CardTitle>
 </CardHeader>
 <CardContent className="p-4 space-y-2">
 {history.map((h, i) => (
 <div key={i} className="flex items-center justify-between text-xs p-2 hover:bg-muted/30 rounded cursor-pointer"onClick={() => { setMethod(h.method); setUrl(h.url); }}>
 <div className="flex items-center gap-3">
 <span className="font-bold text-primary">{h.method}</span>
 <span className="font-mono truncate max-w-[200px] sm:max-w-md">{h.url}</span>
 </div>
 <div className="flex gap-4 text-muted-foreground">
 <span className={h.status < 400 ? 'text-green-500' : 'text-red-500'}>{h.status}</span>
 <span>{h.time}ms</span>
 </div>
 </div>
 ))}
 </CardContent>
 </Card>
 )}

 <ToolHowItWorks
 steps={[
 { step:"01", title:"Configure Request", description:"Set your HTTP method, URL, headers, and payload using the intuitive builder.", icon: Code },
 { step:"02", title:"Send & Inspect", description:"Execute the request directly from your browser and view the raw response.", icon: Send },
 { step:"03", title:"Debug & Iterate", description:"Analyze status codes, response times, and JSON payloads to fix API issues.", icon: Globe },
 ]}
 badges={["100% Free","No CORS Proxy","Browser Native"]}
 />

 <ToolFeatureGuides
 features={[
 { icon: Send, title:"Full HTTP Method Support", description:"Execute GET, POST, PUT, PATCH, DELETE, HEAD, and OPTIONS requests."},
 { icon: Code, title:"JSON Syntax Highlighting", description:"Automatically format and colorize JSON responses for easy debugging."},
 { icon: Lock, title:"Auth Integration", description:"Easily attach Bearer tokens, Basic Auth, or custom API keys to requests."},
 { icon: History, title:"Session History", description:"Review your last 5 requests to quickly iterate on API endpoints."},
 ]}
 >
 <div className="prose prose-sm dark:prose-invert max-w-none mt-6">
 <h3>The Evolution of API Debugging in the Browser</h3>
 <p>Historically, debugging REST APIs required heavy, standalone desktop applications like Postman or Insomnia. While powerful, these tools introduce context-switching friction; developers must leave their code editor, open a separate application, recreate their request payloads, and manage complex workspace syncing. Modern browser capabilities, specifically the Fetch API, have advanced to the point where lightweight, client-side API testers can handle 90% of daily debugging tasks without ever leaving the web environment.</p>
 <p>Client-side API testing is particularly valuable for verifying CORS (Cross-Origin Resource Sharing) configurations. When a web application fails to fetch data from a backend, the issue is often a misconfigured CORS header on the server. By executing the request directly from the browser's JavaScript engine, developers can immediately see the exact CORS error in the console, confirming whether the issue lies in the frontend request formatting or the backend access control policies. Furthermore, inspecting the raw response headers directly in the browser provides immediate feedback on caching policies (Cache-Control), content encoding (gzip/brotli), and security headers (HSTS, CSP).</p>
 <h3>Payload Formatting and State Management</h3>
 <p>A major pain point in API development is managing JSON payloads. Manually formatting JSON strings with correct escaping for quotes and line breaks is error-prone. This tool bridges the gap by providing a native JSON editor that automatically validates syntax before transmission. When combined with real-time syntax highlighting on the response body, developers can instantly spot malformed data returned by the server. This rapid feedback loop—configure, send, inspect, adjust—drastically reduces the time spent diagnosing integration issues between microservices and frontend clients.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion
 faqs={[
 { question:"Why am I getting a CORS error?", answer:"CORS (Cross-Origin Resource Sharing) is a browser security feature. If the API server does not explicitly allow requests from your current domain via the Access-Control-Allow-Origin header, the browser will block the response. This is a server-side configuration issue, not a bug in this tool."},
 { question:"Can I send requests to local servers (localhost)?", answer:"Yes, you can send requests to localhost or local network IPs, provided your browser allows mixed content (HTTPS page to HTTP local server) or you are running this tool from an HTTP context."},
 { question:"Are my API keys safe?", answer:"Yes. All requests are executed directly from your browser to the target server. No data, headers, or payloads are routed through our servers or any third-party proxy."},
 ]}
 />

 <RelatedTools currentToolUrl="/tools/dev/api-tester"max={6} />
 </div>
 );
}

export default ApiTesterClient;
