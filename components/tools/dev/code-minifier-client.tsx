"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { Minimize2, Code, BarChart3 } from "lucide-react";
import toast from "react-hot-toast";

type Language = "html" | "css" | "js";

export function CodeMinifierClient() {
  const [inputCode, setInputCode] = useState("");
  const [minifiedCode, setMinifiedCode] = useState("");
  const [language, setLanguage] = useState<Language>("html");
  
  const handleMinify = () => {
    if (!inputCode.trim()) {
      toast.error("Please enter some code to minify.");
      return;
    }

    let minified = inputCode;
    try {
      if (language === "css") {
        minified = minified.replace(/\/\*[\s\S]*?\*\//g, ''); // Remove comments
        minified = minified.replace(/\s+/g, ' '); // Collapse whitespace
        minified = minified.replace(/\s*([\{\}\:\;\,])\s*/g, '$1'); // Remove spaces around characters
        minified = minified.trim();
      } else if (language === "js") {
        minified = minified.replace(/\/\*[\s\S]*?\*\//g, ''); // Remove block comments
        minified = minified.replace(/\/\/.*$/gm, ''); // Remove line comments
        minified = minified.replace(/\s+/g, ' '); // Collapse whitespace
        minified = minified.trim();
      } else if (language === "html") {
        minified = minified.replace(/<!--[\s\S]*?-->/g, ''); // Remove comments
        minified = minified.replace(/>\s+</g, '><'); // Remove spaces between tags
        minified = minified.trim();
      }
      setMinifiedCode(minified);
      toast.success("Code minified successfully!");
    } catch (error) {
      toast.error("Failed to minify code.");
    }
  };

  const handleReset = () => {
    setInputCode("");
    setMinifiedCode("");
    toast.success("Reset successfully.");
  };
  
  const originalSize = new Blob([inputCode]).size;
  const minifiedSize = new Blob([minifiedCode]).size;
  const savings = originalSize > 0 ? ((originalSize - minifiedSize) / originalSize * 100).toFixed(1) : "0.0";

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={Minimize2}
        title="Code Minifier"
        description="Minify your HTML, CSS, and JavaScript code to reduce file size and improve loading speed."
        actions={
          <>
            <ResetButton onClick={handleReset} label="Reset" />
          </>
        }
      />
      
      <GlassCard>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>Choose the language you want to minify.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            {(["html", "css", "js"] as Language[]).map((lang) => (
              <Button
                key={lang}
                variant={language === lang ? "default" : "outline"}
                onClick={() => setLanguage(lang)}
                className="uppercase"
              >
                {lang}
              </Button>
            ))}
          </div>
        </CardContent>
      </GlassCard>

      <div className="grid md:grid-cols-2 gap-6">
        <GlassCard>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5 text-primary" />
              Original Code
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="input-code">Paste your {language.toUpperCase()} code here:</Label>
              <textarea
                id="input-code"
                className="flex min-h-[300px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 font-mono"
                placeholder={`Paste ${language.toUpperCase()} code...`}
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
              />
            </div>
            <Button onClick={handleMinify} className="w-full">Minify {language.toUpperCase()}</Button>
          </CardContent>
        </GlassCard>

        <GlassCard>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Minimize2 className="h-5 w-5 text-primary" />
                Minified Output
              </CardTitle>
              {minifiedCode && (
                <CopyButton getText={() => minifiedCode} label="Copy" />
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <textarea
              readOnly
              className="flex min-h-[300px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 font-mono"
              placeholder="Minified code will appear here..."
              value={minifiedCode}
            />
            {minifiedCode && (
              <div className="grid grid-cols-3 gap-2 text-center text-sm">
                <div className="rounded-lg bg-secondary/50 p-2">
                  <div className="text-muted-foreground">Original</div>
                  <div className="font-semibold">{originalSize} bytes</div>
                </div>
                <div className="rounded-lg bg-secondary/50 p-2">
                  <div className="text-muted-foreground">Minified</div>
                  <div className="font-semibold">{minifiedSize} bytes</div>
                </div>
                <div className="rounded-lg bg-primary/10 p-2 text-primary">
                  <div className="flex items-center justify-center gap-1">
                    <BarChart3 className="h-3 w-3" />
                    <span>Saved</span>
                  </div>
                  <div className="font-bold">{savings}%</div>
                </div>
              </div>
            )}
          </CardContent>
        </GlassCard>
      </div>
    </div>
  );
}
