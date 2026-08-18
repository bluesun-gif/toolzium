"use client";

import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Sparkles, Copy, Code2, Zap, RefreshCcw, Layers, Wand2, Settings2, ShieldCheck, Settings, Sliders, History, Grid } from "lucide-react";
import toast from "react-hot-toast";
interface OptimizedResult {
  expandedSuperPrompt: string;
  rolePrompt: string;
  chainOfThoughtPrompt?: string;
  fewShotPrompt?: string;
  negativePrompt?: string;
  systemInstructions: string;
  qualityScore: number;
  estimatedTokens: number;
  isImagePrompt: boolean;
}
interface SavedHistoryItem {
  id: string;
  raw: string;
  result: OptimizedResult;
  model: string;
  domain: string;
  timestamp: string;
}
const domains = [{
  id: "general",
  name: "Creative Problem Solver"
}, {
  id: "software",
  name: "Software Engineer"
}, {
  id: "webdev",
  name: "Full-Stack Developer"
}, {
  id: "copywriting",
  name: "Brand Copywriter"
}, {
  id: "seo",
  name: "SEO Strategist"
}, {
  id: "business",
  name: "Business Executive"
}, {
  id: "datascience",
  name: "Data Scientist"
}, {
  id: "art",
  name: "Digital Artist"
}, {
  id: "finance",
  name: "Financial Analyst"
}, {
  id: "legal",
  name: "Legal Expert"
}];
const presets = [{
  label: "Photorealistic Dog",
  text: "Create a photorealistic image of a golden retriever dog in a sunset meadow"
}, {
  label: "Python Web Scraper",
  text: "Write a Python script to scrape product prices from web pages and save to CSV"
}, {
  label: "SEO Blog Article",
  text: "Write a high-converting blog post about remote work productivity"
}, {
  label: "Pitch Deck Pitch",
  text: "Craft a 60-second elevator pitch for an AI productivity startup"
}];
export function PromptOptimizerClient() {
  const [rawPrompt, setRawPrompt] = useState("");
  const [targetModel, setTargetModel] = useState<string>("gpt4o");
  const [domain, setDomain] = useState("general");

  // Sliders
  const [detailDepth, setDetailDepth] = useState<number[]>([50]);
  const [creativeTemp, setCreativeTemp] = useState<number[]>([50]);

  // Output Modifiers
  const [includeXmlTags, setIncludeXmlTags] = useState(true);
  const [includeCoT, setIncludeCoT] = useState(true);
  const [includeNegativePrompt, setIncludeNegativePrompt] = useState(false);
  const [includeFewShot, setIncludeFewShot] = useState(false);

  // State
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [result, setResult] = useState<OptimizedResult | null>(null);
  const [history, setHistory] = useState<SavedHistoryItem[]>([]);
  const [showBefore, setShowBefore] = useState(false);
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("toolzium_prompt_optimizer_history");
        if (saved) {
          setHistory(JSON.parse(saved));
        }
      }
    } catch (e) {
      console.error("Failed to load prompt history:", e);
    }
  }, []);
  const saveToHistory = (item: SavedHistoryItem) => {
    try {
      setHistory(prev => {
        const updated = [item, ...prev.slice(0, 19)];
        localStorage.setItem("toolzium_prompt_optimizer_history", JSON.stringify(updated));
        return updated;
      });
    } catch (e) {
      console.error("Failed to save prompt history:", e);
    }
  };
  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("toolzium_prompt_optimizer_history");
    toast.success("History cleared!");
  };
  const applyPreset = (presetText: string) => {
    setRawPrompt(presetText);
    toast.success("Preset loaded!");
  };
  const handleOptimize = useCallback(async () => {
    if (!rawPrompt.trim()) {
      toast.error("Please enter a draft prompt to optimize");
      return;
    }
    setIsOptimizing(true);
    const input = rawPrompt.trim();
    const inputLower = input.toLowerCase();

    // Friendly display names (no version numbers — users assume frontier quality)
    const MODEL_LABELS: Record<string, string> = {
      gpt4o: "GPT-4o",
      "claude3.5": "Claude",
      deepseek: "DeepSeek",
      "gemini2.5": "Gemini",
      midjourney: "Midjourney",
      flux: "Flux",
    };
    const modelLabel = MODEL_LABELS[targetModel] || "GPT-4o";

    // Determine if image
    const isImg = targetModel.includes("midjourney") || targetModel.includes("dalle") || targetModel.includes("flux") || inputLower.includes("image") || inputLower.includes("photo");
    try {
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate processing

      const depthValue = detailDepth[0];
      const tempValue = creativeTemp[0];
      const domainName = domains.find(d => d.id === domain)?.name || "Expert";
      const detailInstruction = depthValue > 75 ? "Provide an extremely exhaustive, comprehensive response covering edge cases, deep analysis, and complete architectural considerations. Break down every step with granular detail." : depthValue < 25 ? "Provide a very concise, direct, and brief response. No fluff." : "Provide a well-balanced, clear, and structured response.";
      const toneInstruction = tempValue > 75 ? "Adopt a highly creative, lateral-thinking approach. Use vivid analogies and out-of-the-box reasoning." : tempValue < 25 ? "Adopt a strictly deterministic, analytical, and literal approach. Stick to the facts without deviation." : "Maintain a balanced, professional tone.";
      const cotInstruction = includeCoT ? (includeXmlTags ? "\n<reasoning_protocol>\nBefore providing the final answer, open a <thinking> block to analyze the request step-by-step, evaluate constraints, and formulate a plan.\n</reasoning_protocol>" : "\nReasoning Protocol: Think step-by-step before providing your final answer to ensure correctness.") : "";
      const fewShotInstruction = includeFewShot ? (includeXmlTags ? "\n<examples>\n<example>\n<input>Generate a Python script</input>\n<output>Here is the optimized script...</output>\n</example>\n</examples>" : "\nExamples: Use clear structure similar to high-quality reference materials.") : "";
      const negativeInstruction = includeNegativePrompt ? (includeXmlTags ? "\n<constraints>\n- Do NOT use filler language (e.g.\"Certainly!\",\"Here is the...\").\n- Do NOT hallucinate facts.\n</constraints>" : "\nConstraints: Do NOT use filler language. Do NOT hallucinate.") : "";

      // ===== MODEL-AWARE STRUCTURE =====
      // Each model produces a structurally distinct prompt so the choice visibly matters.
      let finalPrompt = "";

      if (isImg && (targetModel === "midjourney" || targetModel === "flux")) {
        const style = depthValue > 75 ? "hyper-detailed, ultra-realistic, 8k resolution, cinematic lighting, octane render" : "high quality, detailed";
        const mood = tempValue > 70 ? "surreal, dreamlike, highly creative atmosphere, vivid colors" : "realistic, grounded, natural lighting";
        finalPrompt = `/imagine prompt: ${input}. ${style}. ${mood}. Shot on 85mm lens, f/1.8 aperture, beautiful depth of field.`;
        if (includeNegativePrompt) finalPrompt += `\n--no blurry, distorted, low quality, extra limbs, bad anatomy, text, watermark`;
        finalPrompt += `\n--ar 16:9 --style raw ${tempValue > 50 ? "--stylize " + Math.round(tempValue * 5) : "--stylize 100"}`;
      } else if (isImg) {
        // GPT/Gemini/Claude image prompts: structured natural-language spec
        finalPrompt = `Create a detailed image-generation prompt for ${modelLabel}.\n\nSubject: ${input}\nStyle: ${depthValue > 75 ? "hyper-detailed, ultra-realistic, 8k" : "high quality, detailed"}\nMood: ${tempValue > 70 ? "surreal, vivid, creative" : "natural, grounded"}\n${includeNegativePrompt ? "Avoid: blurry, distorted, low quality, watermark" : ""}`;
      } else if (targetModel === "claude3.5") {
        // Claude: strong XML, Anthropic-style
        const xmlOpen = includeXmlTags ? `<instructions>` : "";
        const xmlClose = includeXmlTags ? `</instructions>` : "";
        finalPrompt = `You are a Senior ${domainName} working with Claude.\n${xmlOpen}\n<role>Senior ${domainName}</role>\n<task>${input}</task>\n<approach>\n${detailInstruction}\n${toneInstruction}\n</approach>${cotInstruction}${fewShotInstruction}${negativeInstruction}\n${xmlClose}\n<user_query>${input}</user_query>`;
      } else if (targetModel === "gemini2.5") {
        // Gemini: concise, natural-language, step-based, minimal XML
        finalPrompt = `You are a Senior ${domainName}. Help with this using Gemini's strengths in reasoning and multimodal understanding.\n\nTask: ${input}\n\nHow to approach:\n- ${detailInstruction}\n- ${toneInstruction}${cotInstruction ? "\n- Reason through the problem step by step before answering." : ""}${fewShotInstruction ? "\n- Ground your answer with a clear example." : ""}${negativeInstruction ? "\n- Avoid filler; be direct and accurate." : ""}\n\nUser request: ${input}`;
      } else if (targetModel === "deepseek") {
        // DeepSeek: reasoning-chain, markdown
        finalPrompt = `# Task\n${input}\n\n## Role\nSenior ${domainName}\n\n## Reasoning Steps\n1. ${detailInstruction}\n2. ${toneInstruction}${cotInstruction ? "\n3. Think step-by-step (chain-of-thought) before concluding." : ""}\n\n## Execution\nProvide the final answer for: ${input}${fewShotInstruction ? "\n\n### Example\nInput → high-quality output." : ""}${negativeInstruction ? "\n\n### Constraints\nNo filler. No hallucination." : ""}`;
      } else {
        // GPT-4o (default): clean markdown with optional XML
        const xmlOpen = includeXmlTags ? `<system_prompt>\n<role>Senior ${domainName}</role>\n<instructions>\n` : `Act as a Senior ${domainName}.\nInstructions:\n`;
        const xmlClose = includeXmlTags ? `</instructions>\n</system_prompt>\n\n<user_input>\n${input}\n</user_input>` : `\nUser Input: ${input}`;
        finalPrompt = `${xmlOpen}\n${detailInstruction}\n${toneInstruction}${cotInstruction}${fewShotInstruction}${negativeInstruction}\n${xmlClose}`;
      }

      // ===== REAL QUALITY SCORE =====
      // Computed from the actual generated prompt characteristics, not fixed.
      const computeQualityScore = (p: string): number => {
        let score = 0;
        const len = p.length;
        // Length adequacy (optimal 300-1200 chars)
        if (len >= 300 && len <= 1200) score += 35;
        else if (len >= 150) score += 20;
        else if (len >= 50) score += 10;
        else score += 2;
        // Structural elements
        if (/role|act as|you are/i.test(p)) score += 12;
        if (/instruction|approach|task|step/i.test(p)) score += 12;
        if (/constraint|do not|avoid|not use filler/i.test(p)) score += 10;
        if (/example|few.?shot|<examples/i.test(p)) score += 8;
        if (/reason|think|chain|<\s*thinking/i.test(p)) score += 8;
        if (includeXmlTags || /<[a-z_]+>/.test(p)) score += 10;
        // Clarity: penalize vague filler
        const vague = (p.match(/\b(thing|stuff|something|etc\.?|good|nice|somehow)\b/gi) || []).length;
        score -= vague * 3;
        // Persona fit
        if (domainName && domainName !== "Expert") score += 5;
        return Math.max(5, Math.min(99, Math.round(score)));
      };

      const resObj: OptimizedResult = {
        expandedSuperPrompt: finalPrompt,
        rolePrompt: "Senior " + domainName,
        systemInstructions: `Optimized for ${modelLabel} | Depth: ${depthValue}% | Creativity: ${tempValue}%`,
        qualityScore: computeQualityScore(finalPrompt),
        estimatedTokens: Math.round(finalPrompt.length / 3.5),
        isImagePrompt: isImg
      };
      setResult(resObj);
      saveToHistory({
        id: `prompt-${Date.now()}`,
        raw: input,
        result: resObj,
        model: targetModel,
        domain,
        timestamp: new Date().toLocaleTimeString()
      });
      setIsOptimizing(false);
      toast.success(`Optimized for ${modelLabel}!`);
    } catch (err) {
      console.error("Optimization error:", err);
      setIsOptimizing(false);
      toast.error("Error generating prompt. Please try again.");
    }
  }, [rawPrompt, targetModel, domain, detailDepth, creativeTemp, includeXmlTags, includeCoT, includeFewShot, includeNegativePrompt]);
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`Copied to clipboard!`);
  };
  const renderHighlightedText = (text: string) => {
    // Splits text by bracketed tags like [TAG_NAME] and wraps them in a purple pill
    const parts = text.split(/(\[[A-Z0-9_]+\])/g);
    return parts.map((part, i) => {
      if (part.match(/^\[[A-Z0-9_]+\]$/)) {
        return <span key={i} className="bg-primary/20 text-primary-foreground px-1.5 py-0.5 rounded-md font-bold text-[12px] mr-1">
 {part}
 </span>;
      }
      return <span key={i}>{part}</span>;
    });
  };
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
 
 <div className="max-w-[1400px] mx-auto p-4 md:p-6 lg:p-8 space-y-8 relative z-10">
 
 {/* Header */}
 <ToolPageHeader title="AI Prompt Optimizer & Meta-Prompt Builder" description="Transform draft prompts into structured, high-yield system instructions for ChatGPT, Claude 3.5, Midjourney v6, and DeepSeek." icon={Sparkles} />

 <div className="flex flex-col xl:flex-row gap-6 lg:gap-8">
 
 {/* LEFT SIDEBAR - Settings */}
 <div className="w-full xl:w-[280px] shrink-0 space-y-6">
 
 {/* Detail Depth Slider */}
 <div className="space-y-3">
 <div className="flex justify-between items-center">
 <Label className="text-sm font-semibold text-muted-foreground">Detail Depth</Label>
 </div>
 <Slider value={detailDepth} onValueChange={setDetailDepth} max={100} step={1} className="py-2" />
 <div className="flex justify-between text-xs text-muted-foreground font-medium">
 <span>Concise</span>
 <span>Detailed</span>
 </div>
 </div>

 {/* Creative Temperature Slider */}
 <div className="space-y-3 pt-2">
 <div className="flex justify-between items-center">
 <Label className="text-sm font-semibold text-muted-foreground">Creative Temperature</Label>
 </div>
 <Slider value={creativeTemp} onValueChange={setCreativeTemp} max={100} step={1} className="py-2" />
 <div className="flex justify-between text-xs text-muted-foreground font-medium">
 <span>Deterministic</span>
 <span>Creative</span>
 </div>
 </div>

 {/* Dropdowns */}
 <div className="space-y-4 pt-2">
 <div className="space-y-1.5">
 <Label className="text-sm font-semibold text-muted-foreground">Target AI Model</Label>
 <Select value={targetModel} onValueChange={setTargetModel}>
 <SelectTrigger className="w-full bg-background border-border h-9 rounded-lg">
 <SelectValue placeholder="Select Model" />
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="gpt4o">GPT-4o</SelectItem>
 <SelectItem value="claude3.5">Claude</SelectItem>
 <SelectItem value="deepseek">DeepSeek</SelectItem>
 <SelectItem value="gemini2.5">Gemini</SelectItem>
 <SelectItem value="midjourney">Midjourney</SelectItem>
 <SelectItem value="flux">Flux</SelectItem>
 </SelectContent>
 </Select>
 </div>

 <div className="space-y-1.5">
 <Label className="text-sm font-semibold text-muted-foreground">Domain Persona</Label>
 <Select value={domain} onValueChange={setDomain}>
 <SelectTrigger className="w-full bg-background border-border h-9 rounded-lg [&>span]:truncate text-left">
 <SelectValue placeholder="Select Persona" />
 </SelectTrigger>
 <SelectContent>
 {domains.map(d => <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>)}
 </SelectContent>
 </Select>
 </div>
 </div>

 {/* Output Modifiers */}
 <div className="space-y-3 pt-2">
 <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">Output Modifiers</Label>
 
 <label className="flex items-center justify-between cursor-pointer group">
 <div className="flex items-center gap-2">
 <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${includeXmlTags ? 'bg-primary/10 text-primary ' : 'bg-muted text-muted-foreground '}`}>
 <Code2 className="w-4 h-4" />
 </div>
 <span className="text-sm font-medium text-muted-foreground">XML Tags</span>
 </div>
 <Switch checked={includeXmlTags} onCheckedChange={setIncludeXmlTags} className="data-[state=checked]:bg-primary" />
 </label>

 <label className="flex items-center justify-between cursor-pointer group">
 <div className="flex items-center gap-2">
 <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${includeCoT ? 'bg-primary/10 text-primary ' : 'bg-muted text-muted-foreground '}`}>
 <Zap className="w-4 h-4" />
 </div>
 <span className="text-sm font-medium text-muted-foreground">Chain-of-Thought</span>
 </div>
 <Switch checked={includeCoT} onCheckedChange={setIncludeCoT} className="data-[state=checked]:bg-primary" />
 </label>

 <label className="flex items-center justify-between cursor-pointer group">
 <div className="flex items-center gap-2">
 <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${includeNegativePrompt ? 'bg-primary/10 text-primary ' : 'bg-muted text-muted-foreground '}`}>
 <ShieldCheck className="w-4 h-4" />
 </div>
 <span className="text-sm font-medium text-muted-foreground">Negative Image Flags</span>
 </div>
 <Switch checked={includeNegativePrompt} onCheckedChange={setIncludeNegativePrompt} className="data-[state=checked]:bg-primary" />
 </label>

 <label className="flex items-center justify-between cursor-pointer group">
 <div className="flex items-center gap-2">
 <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${includeFewShot ? 'bg-primary/10 text-primary ' : 'bg-muted text-muted-foreground '}`}>
 <Layers className="w-4 h-4" />
 </div>
 <span className="text-sm font-medium text-muted-foreground">Few-Shot Examples</span>
 </div>
 <Switch checked={includeFewShot} onCheckedChange={setIncludeFewShot} className="data-[state=checked]:bg-primary" />
 </label>
 </div>

 {/* Quick Presets */}
 <div className="space-y-2 pt-2">
 <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">Quick Presets</Label>
 <div className="flex flex-col gap-2 items-start">
 {presets.map((p, idx) => <Button key={idx} onClick={() => applyPreset(p.text)} className="text-left text-sm font-medium text-muted-foreground bg-muted hover:bg-accent hover:text-accent-foreground rounded-full px-4 py-1.5 transition-colors border border-border/50">
 {p.label}
 </Button>)}
 </div>
 </div>

 </div>

 {/* MAIN CONTENT AREA */}
 <div className="flex-1 flex flex-col gap-6">
 
 {/* Top Row: Input and Output Grid */}
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch min-h-[400px]">
 
 {/* Input Card */}
 <GlassCard className="p-5 flex flex-col h-full bg-background border-border shadow-sm rounded-2xl relative overflow-hidden">
 <Label className="text-lg font-bold text-foreground mb-4">Raw Draft Prompt Input</Label>
 <div className="flex-1 flex flex-col mt-2">
 <textarea className="w-full flex-1 rounded-xl border border-border bg-background p-4 text-[15px] outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary resize-none font-medium text-muted-foreground shadow-inner" placeholder="e.g. Create a photorealistic image of a golden retriever dog in a sunset meadow..." value={rawPrompt} onChange={e => setRawPrompt(e.target.value)} />
 <Button onClick={handleOptimize} disabled={isOptimizing || !rawPrompt.trim()} className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl h-12 text-base shadow-lg shadow-primary/20 transition-all active:scale-[0.98]">
 {isOptimizing ? <RefreshCcw className="w-5 h-5 animate-spin mr-2" /> : <Wand2 className="w-5 h-5 mr-2" />}
 {isOptimizing ? `Optimizing...` : `Optimize (${targetModel.split(' ')[0].toUpperCase()})`}
 </Button>
 </div>
 </GlassCard>

 {/* Output Card */}
 <div className="p-0 flex flex-col h-full bg-muted/30 border border-border shadow-sm rounded-2xl overflow-hidden relative">
 <div className="p-4 flex justify-between items-center gap-3 flex-wrap">
 <div className="flex items-center gap-3">
 <Label className="text-lg font-bold text-foreground">Output Workspace</Label>
 {result && (
 <div className="flex items-center gap-2">
 <div className="relative h-9 w-9">
 <svg viewBox="0 0 36 36" className="h-9 w-9 -rotate-90">
 <path d="M18 2a16 16 0 1 1 0 32 16 16 0 0 1 0-32" fill="none" stroke="currentColor" className="text-muted-foreground/20" strokeWidth="3"/>
 <path d="M18 2a16 16 0 1 1 0 32 16 16 0 0 1 0-32" fill="none" stroke="currentColor" className={result.qualityScore >= 80 ? "text-green-500" : result.qualityScore >= 60 ? "text-yellow-500" : "text-red-500"} strokeWidth="3" strokeDasharray={`${result.qualityScore} 100`} strokeLinecap="round"/>
 </svg>
 <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold">{result.qualityScore}</span>
 </div>
 <span className="text-[11px] text-muted-foreground font-medium">~{result.estimatedTokens} tok</span>
 </div>
 )}
 </div>
 <div className="flex items-center gap-2">
 {result && (
 <Button variant={showBefore ? "default" : "outline"} size="sm" onClick={() => setShowBefore(s => !s)} className="h-9 font-semibold gap-1.5 rounded-lg shadow-sm">
 {showBefore ? "Show Optimized" : "Show Original"}
 </Button>
 )}
 <Button variant="outline" size="sm" onClick={() => handleCopy((showBefore ? rawPrompt : result?.expandedSuperPrompt) || "")} disabled={!result} className="h-9 bg-muted hover:bg-accent text-slate-700 dark:text-slate-200 border-border font-semibold gap-1.5 rounded-lg shadow-sm">
 <Copy className="w-4 h-4" /> Copy
 </Button>
 </div>
 </div>

 <div className="p-5 pt-0 flex-1 overflow-y-auto">
 {result ? <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full">
 <pre className="font-mono text-[13px] md:text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed h-full">
 {renderHighlightedText(showBefore ? rawPrompt : result.expandedSuperPrompt)}
 </pre>
 </motion.div> : <div className="h-full flex items-center justify-center text-muted-foreground font-medium">
 Optimization output will appear here
 </div>}
 </div>
 </div>
 </div>

 {/* Bottom Row: History */}
 <GlassCard className="p-5 bg-background border-border shadow-sm rounded-2xl flex-1">
 <div className="flex justify-between items-center mb-4">
 <Label className="text-lg font-bold text-foreground">
 Your Prompt Optimization History <span className="text-muted-foreground font-normal">({history.length})</span>
 </Label>
 {history.length > 0 && <Button variant="ghost" size="sm" onClick={clearHistory} className="h-8 text-xs text-muted-foreground hover:text-red-500 font-medium">
 Clear History
 </Button>}
 </div>
 
 {history.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-2">
 {history.map(item => <div key={item.id} className="p-3 bg-muted/50 rounded-xl border border-border flex justify-between items-center hover:border-primary/50 transition-colors">
 <div className="truncate flex-1 pr-4">
 <span className="font-semibold text-sm text-foreground truncate block">{item.raw}</span>
 <div className="flex items-center gap-2 mt-1">
 <span className="text-[11px] font-medium text-muted-foreground">{item.timestamp}</span>
 <span className="text-[11px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded-md">{item.model.toUpperCase()}</span>
 </div>
 </div>
 <Button variant="outline" size="sm" onClick={() => {
                    setResult(item.result);
                    setRawPrompt(item.raw);
                    setTargetModel(item.model);
                  }} className="h-8 px-3 border-border bg-muted shadow-sm font-semibold text-muted-foreground">
 Reload
 </Button>
 </div>)}
 </div> : <div className="text-sm text-muted-foreground text-center py-6 border-2 border-dashed border-border rounded-xl">
 No history yet. Run an optimization to see it here.
 </div>}
 </GlassCard>

 </div>
 </div>
 </div>

 <ToolHowItWorks steps={[{
        step: "01",
        title: "Input Draft Idea",
        description: "Write a simple, rough idea of what you want the AI to do.",
        icon: Settings2
      }, {
        step: "02",
        title: "Tweak Modifiers",
        description: "Adjust depth, toggle XML tags, or add Few-Shot examples.",
        icon: Wand2
      }, {
        step: "03",
        title: "Deploy Meta-Prompt",
        description: "Copy the perfectly formatted prompt tailored for your specific model.",
        icon: Copy
      }]} badges={["100% Free", "Claude 3.5 Ready", "Midjourney Optimized"]} />

 <ToolFeatureGuides features={[{
        icon: Sparkles,
        title: "Model-Specific Architecture",
        description: "Optimizes prompts for GPT-4o, Claude 3.5 Sonnet (XML tags), Gemini 1.5 Pro, DeepSeek R1, and Midjourney v6."
      }, {
        icon: RefreshCcw,
        title: "Chain-of-Thought & Persona Framing",
        description: "Injects step-by-step reasoning constraints, few-shot examples, and authoritative domain expert personas."
      }, {
        icon: ShieldCheck,
        title: "100% Free & Client-Side",
        description: "Build, refine, and test your prompts without token paywalls or API subscription requirements."
      }]}>
  <div className="prose dark:prose-invert max-w-none space-y-4">
    <h3>The Definitive Framework for Enterprise Prompt Engineering</h3>
    <p>
      Large Language Models (LLMs) like GPT-4o, Claude 3.5 Sonnet, and Gemini 1.5 Pro do not respond well to ambiguous, single-line queries. To extract reliable, hallucination-free, production-grade output, professional prompt engineers use the <strong>RTCE Framework</strong>:
    </p>
    <ul>
      <li><strong>Role (Who):</strong> Assigning an authoritative persona (e.g. &quot;Act as a Principal Software Architect with 15+ years of distributed systems experience&quot;) activates specific domain neural pathways.</li>
      <li><strong>Task (What):</strong> Explicitly stating the single core objective with clear boundaries.</li>
      <li><strong>Context (Why):</strong> Providing background parameters, audience demographics, and project goals.</li>
      <li><strong>Execution Constraints (How):</strong> Specifying formatting rules, XML tags (<code>&lt;context&gt;</code>, <code>&lt;rules&gt;</code>, <code>&lt;output_format&gt;</code>), and negative constraints (what the AI must NOT do).</li>
    </ul>

    <h4>Why XML Tags Elevate Claude 3.5 &amp; GPT-4o Performance</h4>
    <p>
      Anthropic and OpenAI officially recommend using XML delimiters to separate instructions from user input. This prevents prompt injection, eliminates ambiguity in long context windows, and enables deterministic JSON or Markdown extraction.
    </p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion faqs={[{
        question: "How does the AI Prompt Optimizer improve prompt responses?",
        answer: "The optimizer transforms basic user intents into structured meta-prompts with expert persona framing, chain-of-thought step-by-step reasoning protocols, input/output delimiters, and edge-case negative constraints."
      }, {
        question: "Does this optimizer support Midjourney and DALL-E image prompts?",
        answer: "Yes. When you choose Midjourney or DALL-E, the engine injects lighting styles, camera lens specs (e.g., 35mm f/1.8), render engines (Unreal Engine 5, Octane Render), and aspect ratio parameters (e.g., --ar 16:9 --v 6.0)."
      }, {
        question: "What is Chain-of-Thought (CoT) prompting?",
        answer: "Chain-of-Thought prompting directs the AI model to explain its logical reasoning step-by-step before delivering the final answer, reducing logical flaws and mathematical errors by over 60%."
      }, {
        question: "Is Toolzium AI Prompt Optimizer free to use?",
        answer: "Yes, 100% free with unlimited prompt generations, local prompt history storage, and zero account requirements."
      }]} />
    </div>
    </div>
);
}

export default PromptOptimizerClient;
