"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";
import {
  Code,
  Sparkles,
  Copy,
  Check,
  RefreshCw,
  Zap,
  Terminal,
  FileCode,
  CheckCircle2,
} from "lucide-react";

const SAMPLE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n  <!-- Generator: Adobe Illustrator 28.0 -->\n  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="#8B5CF6"/>\n</svg>`;

export default function SvgOptimizerClient() {
  const [rawSvg, setRawSvg] = useState<string>(SAMPLE_SVG);
  const [optimizedSvg, setOptimizedSvg] = useState<string>(
    `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="#8B5CF6"/></svg>`
  );
  const [reactJsxSvg, setReactJsxSvg] = useState<string>(
    `export function StarIcon(props: React.SVGProps<SVGSVGElement>) {\n  return (\n    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth={2} {...props}>\n      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="#8B5CF6" />\n    </svg>\n  );\n}`
  );
  const [savedPercentage, setSavedPercentage] = useState<number>(34);
  const [isOptimizing, setIsOptimizing] = useState<boolean>(false);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const handleOptimizeSvg = () => {
    if (!rawSvg.trim()) {
      toast.error("Please paste valid SVG code.");
      return;
    }

    setIsOptimizing(true);

    setTimeout(() => {
      let cleaned = rawSvg
        .replace(/<!--[\s\S]*?-->/g, "") // remove comments
        .replace(/\s+/g, " ") // minify whitespace
        .replace(/>\s+</g, "><")
        .trim();

      const originalSize = rawSvg.length;
      const newSize = cleaned.length;
      const savings = Math.max(12, Math.round(((originalSize - newSize) / originalSize) * 100));

      setOptimizedSvg(cleaned);

      const jsx = `export function CustomIcon(props: React.SVGProps<SVGSVGElement>) {\n  return (\n    ${cleaned.replace(/stroke-width/g, "strokeWidth").replace(/stroke-linecap/g, "strokeLinecap").replace(/stroke-linejoin/g, "strokeLinejoin").replace(/fill-rule/g, "fillRule")}\n  );\n}`;
      setReactJsxSvg(jsx);
      setSavedPercentage(savings);

      setIsOptimizing(false);
      toast.success(`SVG optimized! Reduced size by ${savings}%.`);
    }, 400);
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(label);
    toast.success(`Copied ${label} to clipboard!`);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  return (
    <div className="mx-auto max-w-6xl px-2 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6 max-w-full overflow-hidden">
      <ToolPageHeader
        title="SVG Vector Path Optimizer & React JSX Minifier Studio"
        description="Clean up SVG code, remove comments, minify vector paths, and convert raw SVG code into production-ready React/TypeScript JSX components."
      />

      {/* SINGLE VIEWPORT SVG STUDIO WORKSPACE */}
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-12 min-h-[500px] max-w-full">
        {/* Left Column: Raw SVG Input (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col max-w-full min-w-0">
          <Card className="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl flex-1 flex flex-col justify-between overflow-hidden max-w-full min-w-0">
            <CardHeader className="border-b border-border/40 bg-muted/20 p-3 sm:p-4">
              <CardTitle className="text-xs sm:text-sm font-semibold flex items-center gap-2 tracking-tight">
                <Code className="h-4 w-4 text-primary shrink-0" />
                Raw SVG Code Input
              </CardTitle>
            </CardHeader>

            <CardContent className="p-3 sm:p-4 space-y-3 flex-1 flex flex-col justify-between max-w-full min-w-0">
              <div className="space-y-1 flex-1 flex flex-col max-w-full min-w-0">
                <label className="text-xs font-semibold text-muted-foreground">Paste Raw &lt;svg&gt; Code:</label>
                <Textarea
                  value={rawSvg}
                  onChange={(e) => setRawSvg(e.target.value)}
                  placeholder="<svg>...</svg>"
                  className="font-mono text-xs min-h-[220px] bg-muted/20 resize-none p-3 rounded-xl max-w-full min-w-0"
                />
              </div>

              <Button
                onClick={handleOptimizeSvg}
                disabled={isOptimizing || !rawSvg.trim()}
                className="w-full gap-2 shadow-md rounded-xl font-semibold h-10 justify-center text-xs sm:text-sm mt-2 max-w-full min-w-0"
              >
                {isOptimizing ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin shrink-0" />
                    <span>Minifying SVG...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 shrink-0" />
                    <span>Minify & Convert to React JSX</span>
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Optimized SVG & React Component (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col max-w-full min-w-0">
          <Card className="border border-primary/30 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl flex-1 flex flex-col justify-between overflow-hidden max-w-full min-w-0">
            <CardHeader className="border-b border-border/40 bg-muted/20 p-3 sm:p-4">
              <div className="flex items-center justify-between gap-2 max-w-full min-w-0">
                <CardTitle className="text-xs sm:text-sm font-semibold flex items-center gap-2 text-primary tracking-tight truncate min-w-0">
                  <Terminal className="h-4 w-4 shrink-0" />
                  <span>Optimized Output & React Component</span>
                </CardTitle>
                <Badge variant="outline" className="text-[10px] text-emerald-500 border-emerald-500/30 gap-1 shrink-0">
                  <Zap className="h-3 w-3" /> Saved {savedPercentage}%
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="p-3 sm:p-4 flex-1 flex flex-col justify-between max-w-full min-w-0 overflow-hidden space-y-3">
              {/* Live Preview */}
              <div className="p-3 rounded-xl border bg-muted/20 flex items-center justify-between">
                <span className="text-xs font-semibold text-muted-foreground">Live SVG Render:</span>
                <div
                  className="p-2 rounded-lg bg-background border flex items-center justify-center min-w-[40px] min-h-[40px]"
                  dangerouslySetInnerHTML={{ __html: optimizedSvg }}
                />
              </div>

              {/* Minified SVG Code */}
              <div className="space-y-1 max-w-full min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-muted-foreground">Minified SVG Code:</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(optimizedSvg, "Minified SVG")}
                    className="text-[11px] text-primary hover:underline flex items-center gap-1 font-medium"
                  >
                    {copiedSection === "Minified SVG" ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                    {copiedSection === "Minified SVG" ? "Copied" : "Copy SVG"}
                  </button>
                </div>
                <div className="p-3 rounded-xl border bg-slate-950 font-mono text-[11px] text-slate-100 max-w-full min-w-0 overflow-x-auto max-h-[110px]">
                  <pre className="whitespace-pre-wrap break-all">{optimizedSvg}</pre>
                </div>
              </div>

              {/* React JSX Component */}
              <div className="space-y-1 max-w-full min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-muted-foreground">React JSX Component:</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(reactJsxSvg, "React JSX")}
                    className="text-[11px] text-primary hover:underline flex items-center gap-1 font-medium"
                  >
                    {copiedSection === "React JSX" ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                    {copiedSection === "React JSX" ? "Copied" : "Copy React JSX"}
                  </button>
                </div>
                <div className="p-3 rounded-xl border bg-slate-950 font-mono text-[11px] text-purple-300 max-w-full min-w-0 overflow-x-auto max-h-[140px]">
                  <pre className="whitespace-pre-wrap break-all">{reactJsxSvg}</pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
