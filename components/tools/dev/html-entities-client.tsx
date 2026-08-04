"use client";

import { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { Code, List } from "lucide-react";

export function HtmlEntitiesClient() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [useNumeric, setUseNumeric] = useState(false);

  const encodeHtml = (str: string) => {
    if (useNumeric) {
      return str.replace(/[\u00A0-\u9999<>\&]/g, function(i) {
        return '&#' + i.charCodeAt(0) + ';';
      });
    }
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  };

  const decodeHtml = (str: string) => {
    if (typeof document === "undefined") return str;
    let txt = document.createElement("textarea");
    txt.innerHTML = str;
    return txt.value;
  };

  const output = mode === "encode" ? encodeHtml(input) : decodeHtml(input);

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={Code}
        title="HTML Entity Encoder"
        description="Encode and decode HTML entities. Convert special characters to HTML entities and vice versa."
        actions={
          <>
            <ResetButton onClick={() => setInput("")} label="Clear" />
          </>
        }
      />

      <div className="grid md:grid-cols-2 gap-6">
        <GlassCard>
          <CardHeader>
            <CardTitle>Input</CardTitle>
            <CardDescription>Enter text or HTML to process</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Button variant={mode === "encode" ? "default" : "outline"} onClick={() => setMode("encode")}>Encode</Button>
              <Button variant={mode === "decode" ? "default" : "outline"} onClick={() => setMode("decode")}>Decode</Button>
            </div>
            {mode === "encode" && (
              <div className="flex items-center space-x-2">
                <Switch id="numeric" checked={useNumeric} onCheckedChange={setUseNumeric} />
                <Label htmlFor="numeric">Use Numeric Entities</Label>
              </div>
            )}
            <textarea
              className="w-full min-h-[200px] p-3 rounded-md border bg-background/50 focus:outline-none focus:ring-2 focus:ring-ring"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Enter text to ${mode}...`}
            />
          </CardContent>
        </GlassCard>

        <GlassCard>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Output</CardTitle>
                <CardDescription>Processed result</CardDescription>
              </div>
              <CopyButton getText={() => output} label="Copy Result" />
            </div>
          </CardHeader>
          <CardContent>
            <textarea
              className="w-full min-h-[200px] p-3 rounded-md border bg-muted/50 focus:outline-none"
              value={output}
              readOnly
            />
          </CardContent>
        </GlassCard>
      </div>

      <GlassCard>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><List className="w-5 h-5" /> Common HTML Entities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="p-2 border rounded">&amp;lt; = &lt;</div>
            <div className="p-2 border rounded">&amp;gt; = &gt;</div>
            <div className="p-2 border rounded">&amp;amp; = &amp;</div>
            <div className="p-2 border rounded">&amp;quot; = &quot;</div>
            <div className="p-2 border rounded">&amp;copy; = &copy;</div>
            <div className="p-2 border rounded">&amp;reg; = &reg;</div>
            <div className="p-2 border rounded">&amp;euro; = &euro;</div>
            <div className="p-2 border rounded">&amp;pound; = &pound;</div>
          </div>
        </CardContent>
      </GlassCard>
    </div>
  );
}
