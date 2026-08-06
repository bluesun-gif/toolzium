"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";
import {
  Sparkles,
  Bot,
  Copy,
  Check,
  RefreshCw,
  Zap,
  SlidersHorizontal,
  Wand2,
  Terminal,
  Layers,
  ArrowRight,
} from "lucide-react";

interface OptimizedPromptResult {
  systemRole: string;
  enhancedPrompt: string;
  negativePrompt?: string;
  chainOfThought: string;
  recommendedSettings: {
    temperature: string;
    topP: string;
    model: string;
  };
}

const SAMPLE_PROMPTS = [
  {
    title: "🐍 Refactor Python Code",
    raw: "Make my Python code faster and clean",
    target: "Coding & Architecture",
    model: "ChatGPT (GPT-4o)",
  },
  {
    title: "🎨 Midjourney Cyberpunk City",
    raw: "A cool futuristic neon city at night",
    target: "Photorealistic Image Generation",
    model: "Midjourney v6",
  },
  {
    title: "📈 E-Commerce Landing Page Copy",
    raw: "Write copy for selling ergonomic office desk chairs",
    target: "Product Marketing & Copywriting",
    model: "Claude 3.5 Sonnet",
  },
];

export default function PromptOptimizerClient() {
  const [rawPrompt, setRawPrompt] = useState<string>("Make my Python script faster and optimize database queries");
  const [targetModel, setTargetModel] = useState<string>("ChatGPT (GPT-4o)");
  const [taskCategory, setTaskCategory] = useState<string>("Coding & Architecture");

  const [result, setResult] = useState<OptimizedPromptResult | null>({
    systemRole: "You are a Principal Software Architect and Senior Python Performance Specialist specializing in high-throughput database optimization and asynchronous IO.",
    enhancedPrompt: `Act as a Principal Python Architect. Analyze the provided Python code and perform a comprehensive refactoring with the following strict requirements:\n\n1. **Performance Optimization**: Identify computational bottlenecks, O(N^2) loops, and redundant I/O operations. Replace them with vectorized NumPy/Pandas operations or Python generators.\n2. **Database Query Tuning**: Optimize PostgreSQL/SQLAlchemy queries by adding indexed WHERE clauses, eager loading (selectinload), and connection pooling.\n3. **Production Readability**: Enforce PEP8 compliance, type hints (typing module), and comprehensive Google-style docstrings.\n4. **Output Format**: Return the refactored code block first, followed by a bulleted benchmark breakdown detailing complexity improvements (Big-O).`,
    chainOfThought: "Step 1: Define expert persona. Step 2: Establish quantitative performance parameters. Step 3: Specify explicit output structure (code first, benchmark second).",
    recommendedSettings: {
      temperature: "0.2 (Deterministic & Logical)",
      topP: "0.95",
      model: "GPT-4o / Claude 3.5 Sonnet",
    },
  });

  const [isOptimizing, setIsOptimizing] = useState<boolean>(false);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const handleOptimize = () => {
    if (!rawPrompt.trim()) {
      toast.error("Please enter a basic prompt to optimize.");
      return;
    }

    setIsOptimizing(true);

    setTimeout(() => {
      let systemRole = "";
      let enhanced = "";
      let negPrompt = "";
      let cot = "";
      let temp = "0.7";

      if (targetModel.includes("Midjourney") || targetModel.includes("Diffusion")) {
        systemRole = "AI Art Direction Engine & Cinematography Prompt Architect";
        enhanced = `/imagine prompt: ${rawPrompt.trim()}, cinematic lighting, 8k resolution, photorealistic detail, shot on 35mm Hasselblad lens, volumetrics, raytracing, unreal engine 5 render, dramatic ambient shadows, hyper-detailed textures --ar 16:9 --v 6.0 --style raw`;
        negPrompt = "blurry, low quality, distorted anatomy, extra limbs, watermark, text logo, oversaturated, pixelated, cropped";
        cot = "Appended photographic camera specs, lighting style, engine renderer, and negative exclusions for photorealism.";
        temp = "1.0 (Creative)";
      } else if (taskCategory === "Coding & Architecture") {
        systemRole = "Principal Systems Architect & Lead Software Engineer";
        enhanced = `Act as an expert Systems Architect. Take the following request:\n"${rawPrompt.trim()}"\n\nProvide a battle-tested solution following these rules:\n- Use modern idiom design patterns with strict type safety.\n- Include inline comments explaining complex algorithm steps.\n- Provide edge-case unit tests using standard testing frameworks.`;
        cot = "Applied role-prompting, structural constraints, and unit test requirements.";
        temp = "0.2 (Logical & Precise)";
      } else {
        systemRole = "World-Class Direct Response Copywriter & Brand Strategist";
        enhanced = `You are a Master Copywriter. Craft high-converting copy based on:\n"${rawPrompt.trim()}"\n\nStructure:\n1. **Attention-Grabbing Hook**: 3 variations targeting customer pain points.\n2. **Value Proposition**: Clear benefit bullets using emotional triggers.\n3. **Call to Action (CTA)**: High-urgency closing sentence.`;
        cot = "Applied AIDA framework, emotional triggers, and structural section mandates.";
        temp = "0.7 (Balanced & Persuasive)";
      }

      setResult({
        systemRole,
        enhancedPrompt: enhanced,
        negativePrompt: negPrompt || undefined,
        chainOfThought: cot,
        recommendedSettings: {
          temperature: temp,
          topP: "0.9",
          model: targetModel,
        },
      });

      setIsOptimizing(false);
      toast.success("Prompt successfully optimized!");
    }, 500);
  };

  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(label);
    toast.success(`Copied ${label} to clipboard!`);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  return (
    <div className="mx-auto max-w-6xl px-2 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6 max-w-full overflow-hidden">
      <ToolPageHeader
        title="AI Prompt Engineering & Optimizer Studio"
        description="Transform simple ideas into master-grade prompts for ChatGPT, Claude 3.5, Gemini, and Midjourney with 1-click persona framing and structural constraints."
      />

      {/* SINGLE VIEWPORT PROMPT STUDIO WORKSPACE */}
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-12 min-h-[500px] max-w-full">
        {/* Left Column: Input Prompt & Target Selectors (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col max-w-full min-w-0">
          <Card className="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl flex-1 flex flex-col justify-between overflow-hidden max-w-full min-w-0">
            <CardHeader className="border-b border-border/40 bg-muted/20 p-3 sm:p-4">
              <CardTitle className="text-xs sm:text-sm font-semibold flex items-center gap-2 tracking-tight">
                <Wand2 className="h-4 w-4 text-primary shrink-0" />
                Input Prompt Requirements
              </CardTitle>
            </CardHeader>

            <CardContent className="p-3 sm:p-4 space-y-3 flex-1 flex flex-col justify-between max-w-full min-w-0">
              {/* Presets - Wraps on Mobile */}
              <div className="space-y-1 max-w-full min-w-0">
                <span className="text-[11px] font-semibold text-muted-foreground">
                  Try Sample Prompts:
                </span>
                <div className="flex flex-wrap gap-1.5 max-w-full min-w-0">
                  {SAMPLE_PROMPTS.map((sample, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setRawPrompt(sample.raw);
                        setTargetModel(sample.model);
                        setTaskCategory(sample.target);
                      }}
                      className="px-2.5 py-1 rounded-lg border text-xs font-medium bg-background hover:bg-muted transition text-muted-foreground hover:text-foreground text-left shrink-0"
                    >
                      {sample.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Target AI Model & Category Selectors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs max-w-full min-w-0">
                <div className="space-y-1 max-w-full min-w-0">
                  <label className="font-semibold text-muted-foreground flex items-center gap-1">
                    <Bot className="h-3.5 w-3.5 text-primary shrink-0" /> AI Model:
                  </label>
                  <select
                    value={targetModel}
                    onChange={(e) => setTargetModel(e.target.value)}
                    className="w-full bg-background border rounded-lg p-2 text-xs max-w-full min-w-0"
                  >
                    <option value="ChatGPT (GPT-4o)">ChatGPT (GPT-4o)</option>
                    <option value="Claude 3.5 Sonnet">Claude 3.5 Sonnet</option>
                    <option value="Google Gemini 1.5 Pro">Gemini 1.5 Pro</option>
                    <option value="Midjourney v6">Midjourney v6</option>
                    <option value="Stable Diffusion XL">Stable Diffusion XL</option>
                  </select>
                </div>

                <div className="space-y-1 max-w-full min-w-0">
                  <label className="font-semibold text-muted-foreground flex items-center gap-1">
                    <Layers className="h-3.5 w-3.5 text-purple-500 shrink-0" /> Domain:
                  </label>
                  <select
                    value={taskCategory}
                    onChange={(e) => setTaskCategory(e.target.value)}
                    className="w-full bg-background border rounded-lg p-2 text-xs max-w-full min-w-0"
                  >
                    <option value="Coding & Architecture">Coding & Tech</option>
                    <option value="Product Marketing & Copywriting">Marketing Copy</option>
                    <option value="Photorealistic Image Generation">AI Image Art</option>
                    <option value="Creative Writing & Storytelling">Creative Writing</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1 flex-1 flex flex-col max-w-full min-w-0">
                <label className="text-xs font-semibold text-muted-foreground">Raw Prompt or Basic Idea:</label>
                <Textarea
                  value={rawPrompt}
                  onChange={(e) => setRawPrompt(e.target.value)}
                  placeholder="e.g. Write a python script to parse CSV files..."
                  className="text-xs min-h-[120px] bg-muted/20 resize-none p-3 rounded-xl max-w-full min-w-0"
                />
              </div>

              <Button
                onClick={handleOptimize}
                disabled={isOptimizing || !rawPrompt.trim()}
                className="w-full gap-2 shadow-md rounded-xl font-semibold h-10 justify-center text-xs sm:text-sm mt-2 max-w-full min-w-0"
              >
                {isOptimizing ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin shrink-0" />
                    <span>Optimizing Prompt...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 shrink-0" />
                    <span>Optimize & Engineer Prompt</span>
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Engineered Prompt Output Card (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col max-w-full min-w-0">
          <Card className="border border-primary/30 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl flex-1 flex flex-col justify-between overflow-hidden max-w-full min-w-0">
            <CardHeader className="border-b border-border/40 bg-muted/20 p-3 sm:p-4">
              <div className="flex items-center justify-between gap-2 max-w-full min-w-0">
                <CardTitle className="text-xs sm:text-sm font-semibold flex items-center gap-2 text-primary tracking-tight truncate min-w-0">
                  <Terminal className="h-4 w-4 shrink-0" />
                  <span className="truncate">Optimized Master Prompt</span>
                </CardTitle>

                {result && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      handleCopyText(
                        `[SYSTEM ROLE]\n${result.systemRole}\n\n[MASTER PROMPT]\n${result.enhancedPrompt}${
                          result.negativePrompt ? `\n\n[NEGATIVE PROMPT]\n${result.negativePrompt}` : ""
                        }`,
                        "Engineered Prompt"
                      )
                    }
                    className="h-8 gap-1.5 text-xs rounded-lg shrink-0"
                  >
                    {copiedSection === "Engineered Prompt" ? (
                      <Check className="h-3.5 w-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                    {copiedSection === "Engineered Prompt" ? "Copied" : "Copy Master Prompt"}
                  </Button>
                )}
              </div>
            </CardHeader>

            <CardContent className="p-3 sm:p-4 flex-1 flex flex-col justify-between max-w-full min-w-0 overflow-hidden">
              {!result && !isOptimizing && (
                <div className="flex-1 rounded-xl border border-dashed flex flex-col items-center justify-center text-center p-6 text-muted-foreground bg-muted/10 space-y-3 min-h-[280px] max-w-full">
                  <Wand2 className="h-8 w-8 opacity-40 text-primary" />
                  <p className="text-sm font-semibold text-foreground">Click &quot;Optimize & Engineer Prompt&quot;</p>
                </div>
              )}

              {result && (
                <div className="space-y-3 max-w-full min-w-0 overflow-y-auto max-h-[440px] pr-1">
                  {/* System Role Persona */}
                  <div className="p-3 rounded-xl border bg-muted/20 space-y-1 max-w-full min-w-0">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                      <Zap className="h-3 w-3 text-emerald-500 shrink-0" /> System Persona & Role:
                    </span>
                    <p className="font-medium text-xs text-foreground leading-relaxed break-words">{result.systemRole}</p>
                  </div>

                  {/* Main Enhanced Prompt */}
                  <div className="p-3.5 rounded-xl border bg-slate-950 font-mono text-xs text-slate-100 space-y-1.5 max-w-full min-w-0">
                    <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-slate-400">
                      Master Prompt:
                    </span>
                    <pre className="whitespace-pre-wrap break-all leading-relaxed text-slate-100">{result.enhancedPrompt}</pre>
                  </div>

                  {/* Negative Prompt (if image generation) */}
                  {result.negativePrompt && (
                    <div className="p-3 rounded-xl border bg-amber-500/10 border-amber-500/30 space-y-1 max-w-full min-w-0">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                        Negative Exclusions Prompt:
                      </span>
                      <p className="text-xs text-foreground/90 leading-relaxed break-words">{result.negativePrompt}</p>
                    </div>
                  )}

                  {/* Settings Breakdown */}
                  <div className="p-3 rounded-xl border bg-muted/20 space-y-1 text-xs max-w-full min-w-0">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                      <SlidersHorizontal className="h-3 w-3 text-primary shrink-0" /> Recommended AI Model Settings:
                    </span>
                    <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
                      <div><span className="text-muted-foreground">Temp:</span> {result.recommendedSettings.temperature}</div>
                      <div><span className="text-muted-foreground">Model:</span> {result.recommendedSettings.model}</div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
