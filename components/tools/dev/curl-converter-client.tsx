"use client";

import { useState, useMemo } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import TextareaField from "@/components/shared/form-fields/textarea-field";
import { ResetButton, CopyButton } from "@/components/shared/action-buttons";
import { Button } from "@/components/ui/button";
import { Terminal, Code2, ArrowRightLeft } from "lucide-react";

type Language = "javascript" | "python" | "nodejs" | "go" | "php" | "rust";

interface ParsedCurl {
  method: string;
  url: string;
  headers: Record<string, string>;
  data: string | null;
}

export default function CurlConverterClient() {
  const [curlInput, setCurlInput] = useState<string>(
    `curl -X POST "https://api.example.com/v1/users" \\
  -H "Authorization: Bearer my_secret_token" \\
  -H "Content-Type: application/json" \\
  -d '{"name": "Tanvir Ahmed", "role": "Architect"}'`
  );
  const [targetLang, setTargetLang] = useState<Language>("javascript");

  const parsed = useMemo<ParsedCurl>(() => {
    let raw = curlInput.trim();
    if (!raw.startsWith("curl")) {
      return { method: "GET", url: "", headers: {}, data: null };
    }

    // Clean continuation backslashes & extra whitespace
    raw = raw.replace(/\\\n/g, " ").replace(/\s+/g, " ");

    let method = "GET";
    let url = "";
    const headers: Record<string, string> = {};
    let data: string | null = null;

    // Match URL (first non-flag argument or after url flag)
    const urlMatch = raw.match(/(?:'|")?(https?:\/\/[^\s"']+)(?:'|")?/i);
    if (urlMatch) {
      url = urlMatch[1];
    }

    // Method flag -X or --request
    const methodMatch = raw.match(/(?:-X|--request)\s+([A-Z]+)/i);
    if (methodMatch) {
      method = methodMatch[1].toUpperCase();
    }

    // Header flags -H or --header
    const headerRegex = /(?:-H|--header)\s+(?:"|')([^"']+)(?:"|')/gi;
    let hMatch;
    while ((hMatch = headerRegex.exec(raw)) !== null) {
      const headerStr = hMatch[1];
      const colonIdx = headerStr.indexOf(":");
      if (colonIdx > 0) {
        const key = headerStr.substring(0, colonIdx).trim();
        const val = headerStr.substring(colonIdx + 1).trim();
        headers[key] = val;
      }
    }

    // Data flags -d or --data or --data-raw
    const dataMatch = raw.match(/(?:-d|--data|--data-raw|--data-binary)\s+(?:'|")([\s\S]*?)(?:'|")(?:\s+|$)/i);
    if (dataMatch) {
      data = dataMatch[1];
      if (method === "GET") method = "POST";
    }

    return { method, url, headers, data };
  }, [curlInput]);

  const generatedCode = useMemo<string>(() => {
    if (!parsed.url) return "// Paste a valid cURL command above to see code generation.";

    const { method, url, headers, data } = parsed;

    switch (targetLang) {
      case "javascript": {
        let code = `fetch("${url}", {\n  method: "${method}",\n`;
        if (Object.keys(headers).length > 0) {
          code += `  headers: ${JSON.stringify(headers, null, 4).replace(/\n/g, "\n  ")},\n`;
        }
        if (data) {
          code += `  body: JSON.stringify(${data.startsWith("{") ? data : JSON.stringify(data)}),\n`;
        }
        code += `})\n  .then(res => res.json())\n  .then(data => console.log(data))\n  .catch(err => console.error(err));`;
        return code;
      }

      case "python": {
        let code = `import requests\n\nurl = "${url}"\n`;
        if (Object.keys(headers).length > 0) {
          code += `headers = ${JSON.stringify(headers, null, 4)}\n`;
        }
        if (data) {
          if (data.startsWith("{")) {
            code += `json_payload = ${data}\nresponse = requests.${method.toLowerCase()}(url, headers=headers, json=json_payload)\n`;
          } else {
            code += `data_payload = ${JSON.stringify(data)}\nresponse = requests.${method.toLowerCase()}(url, headers=headers, data=data_payload)\n`;
          }
        } else {
          code += `response = requests.${method.toLowerCase()}(url${Object.keys(headers).length > 0 ? ", headers=headers" : ""})\n`;
        }
        code += `print(response.json())`;
        return code;
      }

      case "nodejs": {
        let code = `const axios = require('axios');\n\nconst config = {\n  method: '${method.toLowerCase()}',\n  url: '${url}',\n`;
        if (Object.keys(headers).length > 0) {
          code += `  headers: ${JSON.stringify(headers, null, 4).replace(/\n/g, "\n  ")},\n`;
        }
        if (data) {
          code += `  data: ${data.startsWith("{") ? data : JSON.stringify(data)},\n`;
        }
        code += `};\n\naxios(config)\n  .then(response => console.log(response.data))\n  .catch(error => console.error(error));`;
        return code;
      }

      case "go": {
        return `package main\n\nimport (\n\t"fmt"\n\t"net/http"\n\t"io"\n${data ? '\t"strings"\n' : ""})\n\nfunc main() {\n\tclient := &http.Client{}\n\tvar req *http.Request\n\tvar err error\n\n${
          data ? `\tbody := strings.NewReader(\`${data}\`)\n\treq, err = http.NewRequest("${method}", "${url}", body)\n` : `\treq, err = http.NewRequest("${method}", "${url}", nil)\n`
        }\tif err != nil {\n\t\tpanic(err)\n\t}\n\n${Object.entries(headers)
          .map(([k, v]) => `\treq.Header.Add("${k}", "${v}")`)
          .join("\n")}\n\n\tresp, err := client.Do(req)\n\tif err != nil {\n\t\tpanic(err)\n\t}\n\tdefer resp.Body.Close()\n\n\tbodyBytes, _ := io.ReadAll(resp.Body)\n\tfmt.Println(string(bodyBytes))\n}`;
      }

      case "php": {
        let code = `<?php\n$ch = curl_init();\ncurl_setopt($ch, CURLOPT_URL, '${url}');\ncurl_setopt($ch, CURLOPT_RETURNTRANSFER, true);\ncurl_setopt($ch, CURLOPT_CUSTOMREQUEST, '${method}');\n`;
        if (Object.keys(headers).length > 0) {
          const headerArr = Object.entries(headers).map(([k, v]) => `'${k}: ${v}'`);
          code += `curl_setopt($ch, CURLOPT_HTTPHEADER, [\n    ${headerArr.join(",\n    ")}\n]);\n`;
        }
        if (data) {
          code += `curl_setopt($ch, CURLOPT_POSTFIELDS, '${data}');\n`;
        }
        code += `$response = curl_exec($ch);\ncurl_close($ch);\necho $response;`;
        return code;
      }

      case "rust": {
        let code = `use reqwest::Client;\n\n#[tokio::main]\nasync fn main() -> Result<(), Box<dyn std::error::Error>> {\n    let client = Client::new();\n    let res = client.${method.toLowerCase()}("${url}")\n`;
        Object.entries(headers).forEach(([k, v]) => {
          code += `        .header("${k}", "${v}")\n`;
        });
        if (data) {
          code += `        .body(r#"${data}"#)\n`;
        }
        code += `        .send()\n        .await?\n        .text()\n        .await?;\n\n    println!("{}", res);\n    Ok(())\n}`;
        return code;
      }

      default:
        return "";
    }
  }, [parsed, targetLang]);

  const handleReset = () => {
    setCurlInput("");
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <ToolPageHeader
        title="cURL to Code Converter"
        description="Convert cURL commands to JavaScript Fetch, Python Requests, Node.js Axios, Go, PHP, and Rust. Parses headers, HTTP methods, and JSON request payloads instantly."
        icon={Terminal}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: cURL Input */}
        <div className="lg:col-span-6 space-y-6">
          <GlassCard className="h-full flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between pb-4 border-b">
              <div>
                <CardTitle>cURL Command</CardTitle>
                <CardDescription>Paste your cURL request snippet</CardDescription>
              </div>
              <ResetButton onClick={handleReset} />
            </CardHeader>
            <CardContent className="pt-6 flex-1 flex flex-col space-y-4">
              <TextareaField
                value={curlInput}
                onChange={(e) => setCurlInput(e.target.value)}
                placeholder='curl -X POST "https://api.example.com" -H "Content-Type: application/json" -d "..."'
                rows={12}
                className="font-mono text-xs flex-1"
              />

              {parsed.url && (
                <div className="p-3 border rounded-lg bg-muted/20 text-xs space-y-1">
                  <div className="flex gap-2">
                    <span className="font-semibold text-primary">Method:</span> {parsed.method}
                  </div>
                  <div className="flex gap-2 truncate">
                    <span className="font-semibold text-primary">Target URL:</span> {parsed.url}
                  </div>
                  <div className="flex gap-2">
                    <span className="font-semibold text-primary">Headers Count:</span> {Object.keys(parsed.headers).length}
                  </div>
                </div>
              )}
            </CardContent>
          </GlassCard>
        </div>

        {/* Right Column: Code Generator */}
        <div className="lg:col-span-6 space-y-6">
          <GlassCard className="h-full flex flex-col">
            <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b">
              <div>
                <CardTitle>Generated Code</CardTitle>
                <CardDescription>Select target language</CardDescription>
              </div>
              <CopyButton getText={generatedCode} label="Copy Code" />
            </CardHeader>

            <CardContent className="pt-6 flex-1 flex flex-col space-y-4">
              {/* Language Tabs */}
              <div className="flex flex-wrap gap-2">
                {[
                  { id: "javascript", label: "JS (Fetch)" },
                  { id: "python", label: "Python" },
                  { id: "nodejs", label: "Node.js (Axios)" },
                  { id: "go", label: "Go" },
                  { id: "php", label: "PHP" },
                  { id: "rust", label: "Rust" },
                ].map((lang) => (
                  <Button
                    key={lang.id}
                    type="button"
                    variant={targetLang === lang.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTargetLang(lang.id as Language)}
                  >
                    {lang.label}
                  </Button>
                ))}
              </div>

              <TextareaField
                value={generatedCode}
                readOnly
                rows={14}
                className="font-mono text-xs bg-slate-950 text-slate-100 flex-1 dark:bg-slate-950"
              />
            </CardContent>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
