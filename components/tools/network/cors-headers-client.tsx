"use client";

import { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Shield } from "lucide-react";

export function CorsHeadersClient() {
  const [allowOrigin, setAllowOrigin] = useState("*");
  const [allowMethods, setAllowMethods] = useState("GET, POST, OPTIONS");
  const [allowHeaders, setAllowHeaders] = useState("Content-Type, Authorization");
  const [maxAge, setMaxAge] = useState("86400");
  const [allowCredentials, setAllowCredentials] = useState(false);

  const generateHttpHeaders = () => {
    let headers = `Access-Control-Allow-Origin: ${allowOrigin}\n`;
    headers += `Access-Control-Allow-Methods: ${allowMethods}\n`;
    headers += `Access-Control-Allow-Headers: ${allowHeaders}\n`;
    headers += `Access-Control-Max-Age: ${maxAge}\n`;
    if (allowCredentials) {
      headers += `Access-Control-Allow-Credentials: true\n`;
    }
    return headers;
  };

  const generateNginx = () => {
    let config = `add_header 'Access-Control-Allow-Origin' '${allowOrigin}' always;\n`;
    config += `add_header 'Access-Control-Allow-Methods' '${allowMethods}' always;\n`;
    config += `add_header 'Access-Control-Allow-Headers' '${allowHeaders}' always;\n`;
    config += `add_header 'Access-Control-Max-Age' ${maxAge} always;\n`;
    if (allowCredentials) {
      config += `add_header 'Access-Control-Allow-Credentials' 'true' always;\n`;
    }
    return config;
  };

  const generateExpress = () => {
    return `const cors = require('cors');\n\napp.use(cors({\n  origin: '${allowOrigin}',\n  methods: ['${allowMethods.split(', ').join("', '")}'],\n  allowedHeaders: ['${allowHeaders.split(', ').join("', '")}'],\n  maxAge: ${maxAge},\n  credentials: ${allowCredentials}\n}));`;
  };

  return (
    <div className="space-y-6">
      <ToolPageHeader 
        icon={Shield} 
        title="CORS Header Generator" 
        description="Generate Cross-Origin Resource Sharing headers for various servers." 
        actions={
          <ResetButton onClick={() => {
            setAllowOrigin("*");
            setAllowMethods("GET, POST, OPTIONS");
            setAllowHeaders("Content-Type, Authorization");
            setMaxAge("86400");
            setAllowCredentials(false);
          }} />
        } 
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard>
          <CardHeader>
            <CardTitle>Configuration</CardTitle>
            <CardDescription>Set your CORS policies</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Access-Control-Allow-Origin</Label>
              <Input value={allowOrigin} onChange={(e) => setAllowOrigin(e.target.value)} placeholder="*, http://example.com" />
            </div>
            <div className="space-y-2">
              <Label>Access-Control-Allow-Methods</Label>
              <Input value={allowMethods} onChange={(e) => setAllowMethods(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Access-Control-Allow-Headers</Label>
              <Input value={allowHeaders} onChange={(e) => setAllowHeaders(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Access-Control-Max-Age (seconds)</Label>
              <Input type="number" value={maxAge} onChange={(e) => setMaxAge(e.target.value)} />
            </div>
            <div className="flex items-center space-x-2 pt-2">
              <Switch checked={allowCredentials} onCheckedChange={setAllowCredentials} />
              <Label>Access-Control-Allow-Credentials</Label>
            </div>
          </CardContent>
        </GlassCard>

        <GlassCard>
          <CardHeader>
            <CardTitle>Generated Output</CardTitle>
            <CardDescription>Copy the configuration for your environment</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label className="text-md font-semibold">Raw HTTP Headers</Label>
                <CopyButton getText={generateHttpHeaders} label="Copy Headers" />
              </div>
              <pre className="p-4 bg-muted rounded-md text-sm overflow-x-auto">
                {generateHttpHeaders()}
              </pre>
            </div>
            <Separator />
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label className="text-md font-semibold">Nginx Configuration</Label>
                <CopyButton getText={generateNginx} label="Copy Nginx" />
              </div>
              <pre className="p-4 bg-muted rounded-md text-sm overflow-x-auto">
                {generateNginx()}
              </pre>
            </div>
            <Separator />
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label className="text-md font-semibold">Express.js Middleware</Label>
                <CopyButton getText={generateExpress} label="Copy Express" />
              </div>
              <pre className="p-4 bg-muted rounded-md text-sm overflow-x-auto">
                {generateExpress()}
              </pre>
            </div>
          </CardContent>
        </GlassCard>
      </div>
    </div>
  );
}
