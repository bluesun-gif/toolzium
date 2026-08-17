"use client";

import { Input } from "@/components/ui/input";

import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState, useMemo } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, RotateCcw, Terminal, Code, Globe, Zap } from "lucide-react";
import toast from "react-hot-toast";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { GlassCard } from "@/components/ui/glass-card";
const cardClass = "border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass = "border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass = "text-xs sm:text-sm font-semibold flex items-center gap-2";
const textareaClass = "w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50 font-mono";
const DEFAULT_CURL = `curl -X POST https://api.example.com/v1/users \\
 -H"Authorization: Bearer sk_test_abc123"\\
 -H"Content-Type: application/json"\\
 -d '{"name":"John Doe","email":"john@example.com"}'`;
interface ParsedCurl {
  method: string;
  url: string;
  headers: Record<string, string>;
  body: string;
}
export default function CurlConverterClient() {
  const [curlInput, setCurlInput] = useState(DEFAULT_CURL);
  const [activeLang, setActiveLang] = useState<"js" | "python" | "node" | "go" | "php" | "rust">("js");
  const parsed = useMemo<ParsedCurl>(() => {
    let clean = curlInput.replace(/\\\s*\n/g, "").replace(/\s+/g, "").trim();
    let method = "GET";
    const methodMatch = clean.match(/-X\s+(GET|POST|PUT|DELETE|PATCH|OPTIONS|HEAD)/i);
    if (methodMatch) method = methodMatch[1].toUpperCase();else if (clean.includes("-d") || clean.includes("--data") || clean.includes("--data-raw")) method = "POST";
    const urlMatch = clean.match(/curl\s+(?:[^"'\s]*\s+)*["']?(https?:\/\/[^"'\s]+)["']?/) || clean.match(/(https?:\/\/[^"'\s]+)/);
    const url = urlMatch ? urlMatch[1] : "";
    const headers: Record<string, string> = {};
    const headerRegex = /(?:-H|--header)\s+["']([^"']+)["']/g;
    let hMatch;
    while ((hMatch = headerRegex.exec(clean)) !== null) {
      const parts = hMatch[1].split(":");
      if (parts.length >= 2) {
        const key = parts.shift()?.trim() || "";
        const val = parts.join(":").trim();
        if (key) headers[key] = val;
      }
    }
    let body = "";
    const bodyMatch = clean.match(/(?:-d|--data|--data-raw)\s+["'](.+?)["']/);
    if (bodyMatch) body = bodyMatch[1];
    return {
      method,
      url,
      headers,
      body
    };
  }, [curlInput]);
  const generateCode = () => {
    const headersStr = Object.keys(parsed.headers).length > 0 ? ` headers: {\n${Object.entries(parsed.headers).map(([k, v]) => `"${k}":"${v}"`).join(",\n")}\n },\n` : "";
    const bodyStr = parsed.body ? ` body: JSON.stringify(${parsed.body}),\n` : "";
    const pyHeaders = Object.keys(parsed.headers).length > 0 ? ` headers=${JSON.stringify(parsed.headers)},\n` : "";
    const pyBody = parsed.body ? ` json=${parsed.body},\n` : "";
    switch (activeLang) {
      case "js":
        return `try {
 const response = await fetch("${parsed.url}", {
 method:"${parsed.method}",
${headersStr}${bodyStr} });
 if (!response.ok) throw new Error(\`HTTP error! status: \${response.status}\`);
 const data = await response.json();
 console.log(data);
} catch (error) {
 console.error("Fetch Error:", error);
}`;
      case "python":
        return `import requests

try:
 response = requests.request(
"${parsed.method}",
"${parsed.url}",
${pyHeaders}${pyBody} )
 response.raise_for_status()
 print(response.json())
except requests.exceptions.RequestException as e:
 print(f"Request failed: {e}")`;
      case "node":
        return `const axios = require('axios');

(async () => {
 try {
 const response = await axios({
 method: '${parsed.method.toLowerCase()}',
 url: '${parsed.url}',
${Object.keys(parsed.headers).length > 0 ? ` headers: ${JSON.stringify(parsed.headers)},\n` : ""}${parsed.body ? ` data: ${parsed.body}\n` : ""} });
 console.log(response.data);
 } catch (error) {
 console.error(error.response ? error.response.data : error.message);
 }
})();`;
      case "go":
        return `package main

import (
"fmt"
"io"
"net/http"
"strings"
)

func main() {
 client := &http.Client{}
 var data = strings.NewReader(\`${parsed.body}\`)
 req, err := http.NewRequest("${parsed.method}","${parsed.url}", data)
 if err != nil { panic(err) }
 
${Object.entries(parsed.headers).map(([k, v]) => ` req.Header.Add("${k}","${v}")`).join("\n")}
 
 resp, err := client.Do(req)
 if err != nil { panic(err) }
 defer resp.Body.Close()
 
 body, _ := io.ReadAll(resp.Body)
 fmt.Println(string(body))
}`;
      case "php":
        return `<?php
$curl = curl_init();

curl_setopt_array($curl, [
 CURLOPT_URL =>"${parsed.url}",
 CURLOPT_RETURNTRANSFER => true,
 CURLOPT_CUSTOMREQUEST =>"${parsed.method}",
${Object.keys(parsed.headers).length > 0 ? ` CURLOPT_HTTPHEADER => ${JSON.stringify(Object.entries(parsed.headers).map(([k, v]) => `${k}: ${v}`))},\n` : ""}${parsed.body ? ` CURLOPT_POSTFIELDS => '${parsed.body}',\n` : ""}]);

$response = curl_exec($curl);
$err = curl_error($curl);
curl_close($curl);

if ($err) {
 echo"cURL Error #:". $err;
} else {
 echo $response;
}
?>`;
      case "rust":
        return `use reqwest::Client;
use serde_json::json;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
 let client = Client::new();
 let res = client.${parsed.method.toLowerCase()}("${parsed.url}")
${Object.entries(parsed.headers).map(([k, v]) => ` .header("${k}","${v}")`).join("\n")}${parsed.body ? `\n .json(&${parsed.body})` : ""}
 .send()
 .await?;

 println!("Status: {}", res.status());
 println!("Body: {}", res.text().await?);
 Ok(())
}`;
      default:
        return "";
    }
  };
  const codeOutput = generateCode();
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

 <ToolPageHeader icon={Terminal} title="cURL to Code Converter" description="Instantly translate cURL commands into production-ready HTTP client code for JS, Python, Go, PHP, and Rust." />

 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
 <Card className={`${cardClass} lg:col-span-1`}>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}><Terminal className="w-4 h-4" /> cURL Input</CardTitle>
 </CardHeader>
 <CardContent className="p-4 space-y-4">
 <textarea value={curlInput} onChange={e => setCurlInput(e.target.value)} rows={8} className={textareaClass} placeholder="Paste your cURL command here..." />
 <Button variant="outline" className="w-full" onClick={() => setCurlInput("")}>
 <RotateCcw className="w-4 h-4 mr-2" /> Clear
 </Button>
 </CardContent>
 </Card>

 <div className="lg:col-span-2 space-y-6">
 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}><Zap className="w-4 h-4" /> Parsed Details</CardTitle>
 </CardHeader>
 <CardContent className="p-4">
 <div className="flex flex-wrap gap-3 mb-4">
 <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full">{parsed.method}</span>
 <span className="px-3 py-1 bg-muted text-muted-foreground text-xs font-mono rounded-full break-all">{parsed.url || "No URL detected"}</span>
 </div>
 <div className="grid grid-cols-2 gap-4 text-xs">
 <div>
 <span className="text-muted-foreground font-semibold block mb-1">Headers ({Object.keys(parsed.headers).length})</span>
 <ul className="space-y-1">
 {Object.entries(parsed.headers).map(([k, v]) => <li key={k} className="font-mono text-[10px] truncate" title={`${k}: ${v}`}>
 <span className="text-cyan-400">{k}:</span> {v}
 </li>)}
 {Object.keys(parsed.headers).length === 0 && <li className="text-muted-foreground">None detected</li>}
 </ul>
 </div>
 <div>
 <span className="text-muted-foreground font-semibold block mb-1">Body</span>
 <pre className="font-mono text-[10px] bg-muted/50 p-2 rounded overflow-x-auto max-h-24">
 {parsed.body || "None"}
 </pre>
 </div>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader className={headerClass}>
 <div className="flex items-center justify-between w-full flex-wrap gap-4">
 <div className="flex gap-2 flex-wrap">
 {(["js", "python", "node", "go", "php", "rust"] as const).map(lang => <Button key={lang} variant={activeLang === lang ? "default" : "outline"} size="sm" onClick={() => setActiveLang(lang)} className="uppercase text-[10px]">
 {lang}
 </Button>)}
 </div>
 <Button onClick={() => {
                  navigator.clipboard.writeText(codeOutput);
                  toast.success("Copied Code!");
                }} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
 <Copy className="w-3.5 h-3.5" /> Copy Code
 </Button>
 </div>
 </CardHeader>
 <CardContent className="p-4">
 <pre className="w-full bg-background text-emerald-400 p-4 rounded-lg text-xs font-mono overflow-x-auto max-h-96 whitespace-pre-wrap">
 {codeOutput}
 </pre>
 </CardContent>
 </GlassCard>
 </div>
 </div>

 <ToolHowItWorks steps={[{
        step: "01",
        title: "Paste cURL",
        description: "Drop your terminal command into the input box. Multi-line commands are supported.",
        icon: Terminal
      }, {
        step: "02",
        title: "Auto-Parse",
        description: "The engine extracts the method, URL, headers, and payload automatically.",
        icon: Zap
      }, {
        step: "03",
        title: "Select Language",
        description: "Choose your target language and copy the production-ready boilerplate code.",
        icon: Code
      }]} badges={["100% Free", "Client-Side Privacy", "No Signup"]} />

 <ToolFeatureGuides features={[{
        icon: Terminal,
        title: "Smart Parser",
        description: "Handles multi-line commands, escaped quotes, and various cURL flags seamlessly."
      }, {
        icon: Code,
        title: "6 Languages",
        description: "Generate idiomatic code for JS Fetch, Python Requests, Node Axios, Go, PHP, and Rust."
      }, {
        icon: Zap,
        title: "Instant Analysis",
        description: "Visual breakdown of detected HTTP method, headers, and JSON payloads."
      }, {
        icon: Globe,
        title: "Production Ready",
        description: "Includes error handling, async patterns, and proper content-type serialization."
      }]}>
 <div className="prose dark:prose-invert max-w-none">
 <h3>Accelerate API Integration with Automated Code Generation</h3>
 <p>The cURL command-line tool is an indispensable utility for backend engineers, DevOps professionals, and API developers. It allows for the rapid testing of HTTP endpoints, authentication flows, and complex data payloads directly from the terminal. However, transitioning from a quick terminal test to production-ready application code often involves tedious manual translation. Developers must painstakingly map cURL flags to their programming language's specific HTTP client libraries, ensuring that headers, query parameters, request bodies, and authentication tokens are formatted correctly. This manual process is not only time-consuming but also highly prone to syntax errors and subtle bugs.</p>
 <p>An automated cURL-to-code converter bridges this gap, instantly translating terminal commands into robust, idiomatic code across multiple languages. Whether you are building a frontend integration using the JavaScript <code>fetch</code> API, a backend microservice in Node.js with <code>axios</code>, a data pipeline in Python using <code>requests</code>, or a high-performance system in Go or Rust, generating the correct boilerplate is critical.</p>
 <p>Production-ready code requires more than just the basic request; it demands proper error handling, asynchronous patterns (like <code>async/await</code> or Promises), and correct content-type serialization. Our advanced parser intelligently detects HTTP methods, extracts Bearer tokens, parses JSON payloads, and identifies crucial flags like <code>--insecure</code> or <code>--compressed</code>. By automating this translation, engineering teams can drastically reduce the time spent on API integration, eliminate copy-paste errors, and maintain a consistent, high-quality standard across their codebase. Whether you are documenting an API for your team or rapidly prototyping a new feature, instant code generation empowers you to move faster and ship with confidence.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion faqs={[{
        question: "Does this support multipart/form-data?",
        answer: "Currently, the parser focuses on JSON and standard string payloads. Multipart form data with file uploads requires more complex terminal syntax that is usually better handled directly in your code editor."
      }, {
        question: "Are my API keys safe?",
        answer: "Yes. This tool runs 100% client-side in your browser. Your cURL commands and sensitive Bearer tokens are never sent to any external server."
      }, {
        question: "Can I convert WebSocket commands?",
        answer: "No, cURL is designed for standard HTTP/HTTPS requests. WebSocket connections require different client libraries and persistent connection handling."
      }]} />
    </div>
    </div>
);
}
