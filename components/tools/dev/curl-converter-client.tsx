"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { Code, Terminal, Play, Settings } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export function CurlConverterClient() {
  const [curlCommand, setCurlCommand] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("fetch");
  
  const parseCurl = (cmd: string) => {
    let method = "GET";
    const methodMatch = cmd.match(/-X\s+([A-Z]+)/);
    if (methodMatch) method = methodMatch[1];
    else if (cmd.includes("-d ") || cmd.includes("--data ")) method = "POST";
    
    let url = "";
    const urlMatch = cmd.match(/['"]?(https?:\/\/[^\s'"]+)['"]?/);
    if (urlMatch) url = urlMatch[1];
    
    const headers: Record<string, string> = {};
    const headerRegex = /-H\s+['"]([^:]+):\s*([^'"]+)['"]/g;
    let hMatch;
    while ((hMatch = headerRegex.exec(cmd)) !== null) {
      headers[hMatch[1]] = hMatch[2];
    }
    
    let body = "";
    const bodyRegex = /(?:-d|--data)\s+['"]([^'"]+)['"]/;
    const bMatch = cmd.match(bodyRegex);
    if (bMatch) body = bMatch[1];
    
    return { method, url, headers, body };
  };

  const generateCode = () => {
    if (!curlCommand.trim()) return "Please enter a cURL command.";
    const { method, url, headers, body } = parseCurl(curlCommand);
    
    let code = "";
    if (targetLanguage === "fetch") {
      code = "fetch('" + url + "', {\n";
      code += "  method: '" + method + "',\n";
      if (Object.keys(headers).length > 0) {
        code += "  headers: {\n";
        for (const [k, v] of Object.entries(headers)) {
          code += "    '" + k + "': '" + v + "',\n";
        }
        code += "  },\n";
      }
      if (body) {
        code += "  body: JSON.stringify(" + body + ")\n";
      }
      code += "})\n.then(response => response.json())\n.then(data => console.log(data));";
    } else if (targetLanguage === "python") {
      code = "import requests\n\n";
      code += "url = '" + url + "'\n";
      if (Object.keys(headers).length > 0) {
        code += "headers = {\n";
        for (const [k, v] of Object.entries(headers)) {
          code += "    '" + k + "': '" + v + "',\n";
        }
        code += "}\n";
      }
      if (body) {
        code += "data = " + body + "\n";
        code += "response = requests." + method.toLowerCase() + "(url, headers=headers, data=data)\n";
      } else {
        code += "response = requests." + method.toLowerCase() + "(url, headers=headers)\n";
      }
      code += "print(response.json())";
    }
    return code;
  };

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={Terminal}
        title="cURL Code Converter"
        description="Convert cURL commands to various programming languages easily."
        actions={
          <React.Fragment>
            <ResetButton onClick={() => setCurlCommand("")} label="Reset" />
          </React.Fragment>
        }
      />
      <div className="grid md:grid-cols-2 gap-6">
        <GlassCard>
          <CardHeader>
            <CardTitle>Input cURL Command</CardTitle>
            <CardDescription>Paste your cURL command here</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea 
              placeholder="curl -X POST https://api.example.com/data -H 'Authorization: Bearer xyz' -d '{&quot;key&quot;:&quot;value&quot;}'"
              value={curlCommand}
              onChange={(e) => setCurlCommand(e.target.value)}
              className="min-h-[200px] font-mono"
            />
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setCurlCommand("curl -X GET https://jsonplaceholder.typicode.com/todos/1")}>Sample GET</Button>
              <Button variant="outline" size="sm" onClick={() => setCurlCommand("curl -X POST https://jsonplaceholder.typicode.com/posts -H 'Content-Type: application/json' -d '{&quot;title&quot;:&quot;foo&quot;}'")}>Sample POST</Button>
            </div>
          </CardContent>
        </GlassCard>
        
        <GlassCard>
          <CardHeader>
            <CardTitle>Generated Code</CardTitle>
            <CardDescription>Select a target language</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2 mb-4">
              <Button variant={targetLanguage === "fetch" ? "default" : "outline"} onClick={() => setTargetLanguage("fetch")}>Fetch</Button>
              <Button variant={targetLanguage === "python" ? "default" : "outline"} onClick={() => setTargetLanguage("python")}>Python</Button>
            </div>
            <Textarea 
              readOnly
              value={generateCode()}
              className="min-h-[200px] font-mono bg-muted"
            />
            <div className="flex justify-end mt-2">
              <CopyButton getText={() => generateCode()} label="Copy Code" />
            </div>
          </CardContent>
        </GlassCard>
      </div>
    </div>
  );
}
