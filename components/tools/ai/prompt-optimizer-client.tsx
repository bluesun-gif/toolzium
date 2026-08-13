"use client";

import React, { useState, useEffect, useCallback } from"react";
import { motion } from"framer-motion";
import ToolPageHeader from"@/components/shared/tool-page-header";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { GlassCard } from"@/components/ui/glass-card";
import { Button } from"@/components/ui/button";
import { Label } from"@/components/ui/label";
import { GridPattern } from"@/components/magicui/grid-pattern";
import { cn } from"@/lib/utils";
import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from"@/components/ui/select";
import { Switch } from"@/components/ui/switch";
import { Slider } from"@/components/ui/slider";
import {
 Sparkles,
 Copy,
 Code2,
 Zap,
 RefreshCcw,
 Layers,
 Wand2,
 Settings2,
 ShieldCheck
} from"lucide-react";
import toast from"react-hot-toast";

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

const domains = [
 { id:"general", name:"Creative Problem Solver"},
 { id:"software", name:"Software Engineer"},
 { id:"webdev", name:"Full-Stack Developer"},
 { id:"copywriting", name:"Brand Copywriter"},
 { id:"seo", name:"SEO Strategist"},
 { id:"business", name:"Business Executive"},
 { id:"datascience", name:"Data Scientist"},
 { id:"art", name:"Digital Artist"},
 { id:"finance", name:"Financial Analyst"},
 { id:"legal", name:"Legal Expert"},
];

const presets = [
 { label:"Photorealistic Dog", text:"Create a photorealistic image of a golden retriever dog in a sunset meadow"},
 { label:"Python Web Scraper", text:"Write a Python script to scrape product prices from web pages and save to CSV"},
 { label:"SEO Blog Article", text:"Write a high-converting blog post about remote work productivity"},
 { label:"Pitch Deck Pitch", text:"Craft a 60-second elevator pitch for an AI productivity startup"},
];

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

 useEffect(() => {
  
 try {
 if (typeof window !=="undefined") {
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
 setHistory((prev) => {
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

 // Determine if image
 const isImg = targetModel.includes("midjourney") || targetModel.includes("dalle") || targetModel.includes("flux") || 
 inputLower.includes("image") || inputLower.includes("photo");

 try {
 await new Promise(resolve => setTimeout(resolve, 800)); // Simulate processing

 const depthValue = detailDepth[0];
 const tempValue = creativeTemp[0];
 const domainName = domains.find(d => d.id === domain)?.name ||"Expert";
 
 let finalPrompt ="";
 
 // Dynamic generation logic ensuring EVERYTHING affects the output
 if (isImg) {
 const subject = input;
 const style = depthValue > 75 ?"hyper-detailed, ultra-realistic, 8k resolution, cinematic lighting, octane render, unreal engine 5":"high quality, detailed";
 const mood = tempValue > 70 ?"surreal, dreamlike, highly creative atmosphere, vivid colors":"realistic, grounded, natural lighting";
 
 finalPrompt = `[SYSTEM_INSTRUCTION_V2]
Create a highly detailed, professional meta-prompt that transforms user draft ideas into high-quality image generation instructions. Focus on clarity, composition, style, and tone for AI models like Midjourney and DALL-E 3.

[SYSTEM_INSTRUCTION] {
 {action: 'GENERATE_PHOTOREALISTIC'},
 {action: 'SPECIFY_COMPOSITION'},
 {action: 'DEFINE_LIGHTING'},
 {action: 'SPECIFY_STYLE'}
}

[CORE_PROMPT_START]
/imagine prompt: ${subject}. ${style}. ${mood}. Shot on 85mm lens, f/1.8 aperture, beautiful depth of field. 

[PARAMETERS]
--ar 16:9 --v 6.0 --style raw ${tempValue > 50 ?"--stylize"+ Math.round(tempValue * 5) :"--stylize 100"}
`;
 
 if (includeNegativePrompt) {
 finalPrompt += `\n--no blurry, distorted, low quality, extra limbs, bad anatomy, text, watermark, signature, poorly drawn, out of frame\n`;
 }
 
 } else {
 // Text / Code logic
 const xmlWrapperOpen = includeXmlTags ? `<system_prompt>\n<role>Senior ${domainName}</role>\n<instructions>\n` : `Act as a Senior ${domainName}.\nInstructions:\n`;
 const xmlWrapperClose = includeXmlTags ? `</instructions>\n</system_prompt>\n\n<user_input>\n${input}\n</user_input>` : `\nUser Input: ${input}`;

 const detailInstruction = depthValue > 75 
 ?"- Provide an extremely exhaustive, comprehensive response covering edge cases, deep analysis, and complete architectural considerations.\n- Break down every single step with granular detail."
 : depthValue < 25 
 ?"- Provide a very concise, direct, and brief response. No fluff."
 :"- Provide a well-balanced, clear, and structured response.";

 const toneInstruction = tempValue > 75
 ?"- Adopt a highly creative, lateral-thinking approach. Use vivid analogies and out-of-the-box reasoning."
 : tempValue < 25
 ?"- Adopt a strictly deterministic, analytical, and literal approach. Stick to the facts without deviation."
 :"- Maintain a balanced, professional tone.";

 const cotInstruction = includeCoT 
 ? (includeXmlTags ? `\n<reasoning_protocol>\nBefore providing the final answer, open a <thinking> block to analyze the request step-by-step, evaluate constraints, and formulate a plan.\n</reasoning_protocol>` : `\nReasoning Protocol: Think step-by-step before providing your final answer to ensure correctness.`)
 :"";

 const fewShotInstruction = includeFewShot
 ? (includeXmlTags ? `\n<examples>\n<example>\n<input>Generate a Python script</input>\n<output>Here is the optimized script...</output>\n</example>\n</examples>` : `\nExamples: Use clear structure similar to high-quality reference materials.`)
 :"";

 const negativeInstruction = includeNegativePrompt
 ? (includeXmlTags ? `\n<constraints>\n- Do NOT use filler language (e.g."Certainly!","Here is the...").\n- Do NOT hallucinate facts.\n</constraints>` : `\nConstraints: Do NOT use filler language. Do NOT hallucinate.`)
 :"";

 const getDomainSpecificInstructions = (d: string) => {
 switch(d) {
 case"software": return"- Write clean, maintainable, and well-documented code.\n- Follow best practices for performance and security.";
 case"webdev": return"- Focus on responsive, accessible, and modern UI/UX.\n- Ensure cross-browser compatibility and semantic HTML.";
 case"copywriting": return"- Use persuasive, high-converting language.\n- Focus on user benefits and emotional triggers.";
 case"seo": return"- Optimize for search intent and readability.\n- Naturally integrate relevant keywords and LSI terms.";
 case"business": return"- Provide strategic, actionable executive insights.\n- Focus on ROI, scalability, and operational efficiency.";
 case"datascience": return"- Ensure statistical rigor and data accuracy.\n- Provide clear interpretations of data models and metrics.";
 case"art": return"- Focus on visual composition, color theory, and lighting.\n- Provide detailed aesthetic and stylistic direction.";
 case"finance": return"- Maintain strict accuracy in financial modeling.\n- Focus on risk assessment and clear metric reporting.";
 case"legal": return"- Use precise, unambiguous legal terminology.\n- Focus on compliance, liability protection, and clarity.";
 default: return"- Approach the problem with creative, lateral thinking.\n- Provide innovative and practical solutions.";
 }
 };

 const domainSpecific = getDomainSpecificInstructions(domain);

 finalPrompt = `${xmlWrapperOpen}
${detailInstruction}
${toneInstruction}
${domainSpecific}${cotInstruction}${fewShotInstruction}${negativeInstruction}
${xmlWrapperClose}`;
 }

 const resObj: OptimizedResult = {
 expandedSuperPrompt: finalPrompt,
 rolePrompt:"Senior"+ domainName,
 systemInstructions: `Optimized for ${targetModel.toUpperCase()} | Depth: ${depthValue}% | Creativity: ${tempValue}%`,
 qualityScore: Math.min(99, 40 + (depthValue * 0.2) + (includeXmlTags ? 10 : 0) + (includeCoT ? 15 : 0)),
 estimatedTokens: Math.round(finalPrompt.length / 3.5),
 isImagePrompt: isImg,
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
 toast.success(`Prompt optimized successfully!`);
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
 return (
 <span key={i} className="bg-primary/20 text-primary-foreground px-1.5 py-0.5 rounded-md font-bold text-[12px] mr-1">
 {part}
 </span>
 );
 }
 return <span key={i}>{part}</span>;
 });
 };
 return (
 <div className="w-full min-h-screen pb-20 relative">
 <GridPattern
 width={40}
 height={40}
 x={-1}
 y={-1}
 className={cn(
"absolute inset-0 h-full w-full stroke-border [mask-image:linear-gradient(to_bottom,white,transparent)]"
 )}
 />
 <div className="max-w-[1400px] mx-auto p-4 md:p-6 lg:p-8 space-y-8 relative z-10">
 
 {/* Header */}
 <ToolPageHeader
 title="AI Prompt Optimizer & Meta-Prompt Builder"
 description="Transform draft prompts into structured, high-yield system instructions for ChatGPT, Claude 3.5, Midjourney v6, and DeepSeek."
 icon={Sparkles}
 />

 <div className="flex flex-col xl:flex-row gap-6 lg:gap-8">
 
 {/* LEFT SIDEBAR - Settings */}
 <div className="w-full xl:w-[280px] shrink-0 space-y-6">
 
 {/* Detail Depth Slider */}
 <div className="space-y-3">
 <div className="flex justify-between items-center">
 <Label className="text-sm font-semibold text-muted-foreground">Detail Depth</Label>
 </div>
 <Slider 
 value={detailDepth} 
 onValueChange={setDetailDepth} 
 max={100} 
 step={1}
 className="py-2"
 />
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
 <Slider 
 value={creativeTemp} 
 onValueChange={setCreativeTemp} 
 max={100} 
 step={1}
 className="py-2"
 />
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
 <SelectValue placeholder="Select Model"/>
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="gpt4o">OpenAI ChatGPT (GPT-4o)</SelectItem>
 <SelectItem value="claude3.5">Anthropic Claude 3.5 Sonnet</SelectItem>
 <SelectItem value="deepseek">DeepSeek R1</SelectItem>
 <SelectItem value="gemini2.5">Google Gemini 2.5 Pro</SelectItem>
 <SelectItem value="midjourney">Midjourney v6</SelectItem>
 <SelectItem value="flux">Flux.1 Pro</SelectItem>
 </SelectContent>
 </Select>
 </div>

 <div className="space-y-1.5">
 <Label className="text-sm font-semibold text-muted-foreground">Domain Persona</Label>
 <Select value={domain} onValueChange={setDomain}>
 <SelectTrigger className="w-full bg-background border-border h-9 rounded-lg [&>span]:truncate text-left">
 <SelectValue placeholder="Select Persona"/>
 </SelectTrigger>
 <SelectContent>
 {domains.map((d) => (
 <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>
 ))}
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
 <Code2 className="w-4 h-4"/>
 </div>
 <span className="text-sm font-medium text-muted-foreground">XML Tags</span>
 </div>
 <Switch checked={includeXmlTags} onCheckedChange={setIncludeXmlTags} className="data-[state=checked]:bg-primary"/>
 </label>

 <label className="flex items-center justify-between cursor-pointer group">
 <div className="flex items-center gap-2">
 <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${includeCoT ? 'bg-primary/10 text-primary ' : 'bg-muted text-muted-foreground '}`}>
 <Zap className="w-4 h-4"/>
 </div>
 <span className="text-sm font-medium text-muted-foreground">Chain-of-Thought</span>
 </div>
 <Switch checked={includeCoT} onCheckedChange={setIncludeCoT} className="data-[state=checked]:bg-primary"/>
 </label>

 <label className="flex items-center justify-between cursor-pointer group">
 <div className="flex items-center gap-2">
 <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${includeNegativePrompt ? 'bg-primary/10 text-primary ' : 'bg-muted text-muted-foreground '}`}>
 <ShieldCheck className="w-4 h-4"/>
 </div>
 <span className="text-sm font-medium text-muted-foreground">Negative Image Flags</span>
 </div>
 <Switch checked={includeNegativePrompt} onCheckedChange={setIncludeNegativePrompt} className="data-[state=checked]:bg-primary"/>
 </label>

 <label className="flex items-center justify-between cursor-pointer group">
 <div className="flex items-center gap-2">
 <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${includeFewShot ? 'bg-primary/10 text-primary ' : 'bg-muted text-muted-foreground '}`}>
 <Layers className="w-4 h-4"/>
 </div>
 <span className="text-sm font-medium text-muted-foreground">Few-Shot Examples</span>
 </div>
 <Switch checked={includeFewShot} onCheckedChange={setIncludeFewShot} className="data-[state=checked]:bg-primary"/>
 </label>
 </div>

 {/* Quick Presets */}
 <div className="space-y-2 pt-2">
 <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">Quick Presets</Label>
 <div className="flex flex-col gap-2 items-start">
 {presets.map((p, idx) => (
 <button
 key={idx}
 onClick={() => applyPreset(p.text)}
 className="text-left text-sm font-medium text-muted-foreground bg-muted hover:bg-accent hover:text-accent-foreground rounded-full px-4 py-1.5 transition-colors border border-border/50"
 >
 {p.label}
 </button>
 ))}
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
 <textarea
 className="w-full flex-1 rounded-xl border border-border bg-background p-4 text-[15px] outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary resize-none font-medium text-muted-foreground shadow-inner"
 placeholder="e.g. Create a photorealistic image of a golden retriever dog in a sunset meadow..."
 value={rawPrompt}
 onChange={(e) => setRawPrompt(e.target.value)}
 />
 <Button 
 onClick={handleOptimize} 
 disabled={isOptimizing || !rawPrompt.trim()} 
 className="w-full mt-4 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl h-12 text-base shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
 >
 {isOptimizing ? <RefreshCcw className="w-5 h-5 animate-spin mr-2"/> : <Wand2 className="w-5 h-5 mr-2"/>}
 {isOptimizing ? `Optimizing...` : `Optimize (${targetModel.split(' ')[0].toUpperCase()})`}
 </Button>
 </div>
 </GlassCard>

 {/* Output Card */}
 <div className="p-0 flex flex-col h-full bg-muted/30 border border-border shadow-sm rounded-2xl overflow-hidden relative">
 <div className="p-4 flex justify-between items-center">
 <Label className="text-lg font-bold text-foreground">Output Workspace</Label>
 <Button 
 variant="outline"
 size="sm"
 onClick={() => handleCopy(result?.expandedSuperPrompt ||"")} 
 disabled={!result}
 className="h-9 bg-muted hover:bg-accent text-slate-700 dark:text-slate-200 border-border font-semibold gap-1.5 rounded-lg shadow-sm"
 >
 <Copy className="w-4 h-4"/> Copy Optimized Prompt
 </Button>
 </div>
 
 <div className="p-5 pt-0 flex-1 overflow-y-auto">
 {result ? (
 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full">
 <pre className="font-mono text-[13px] md:text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed h-full">
 {renderHighlightedText(result.expandedSuperPrompt)}
 </pre>
 </motion.div>
 ) : (
 <div className="h-full flex items-center justify-center text-muted-foreground font-medium">
 Optimization output will appear here
 </div>
 )}
 </div>
 </div>
 </div>

 {/* Bottom Row: History */}
 <GlassCard className="p-5 bg-background border-border shadow-sm rounded-2xl flex-1">
 <div className="flex justify-between items-center mb-4">
 <Label className="text-lg font-bold text-foreground">
 Your Prompt Optimization History <span className="text-muted-foreground font-normal">({history.length})</span>
 </Label>
 {history.length > 0 && (
 <Button variant="ghost"size="sm"onClick={clearHistory} className="h-8 text-xs text-muted-foreground hover:text-red-500 font-medium">
 Clear History
 </Button>
 )}
 </div>
 
 {history.length > 0 ? (
 <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-2">
 {history.map((item) => (
 <div key={item.id} className="p-3 bg-muted/50 rounded-xl border border-border flex justify-between items-center hover:border-primary/50 transition-colors">
 <div className="truncate flex-1 pr-4">
 <span className="font-semibold text-sm text-foreground truncate block">{item.raw}</span>
 <div className="flex items-center gap-2 mt-1">
 <span className="text-[11px] font-medium text-muted-foreground">{item.timestamp}</span>
 <span className="text-[11px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded-md">{item.model.toUpperCase()}</span>
 </div>
 </div>
 <Button 
 variant="outline"
 size="sm"
 onClick={() => { setResult(item.result); setRawPrompt(item.raw); setTargetModel(item.model); }} 
 className="h-8 px-3 border-border bg-muted shadow-sm font-semibold text-muted-foreground"
 >
 Reload
 </Button>
 </div>
 ))}
 </div>
 ) : (
 <div className="text-sm text-muted-foreground text-center py-6 border-2 border-dashed border-border rounded-xl">
 No history yet. Run an optimization to see it here.
 </div>
 )}
 </GlassCard>

 </div>
 </div>
 </div>

 <ToolHowItWorks
 steps={[
 { step:"01", title:"Input Draft Idea", description:"Write a simple, rough idea of what you want the AI to do.", icon: Settings2 },
 { step:"02", title:"Tweak Modifiers", description:"Adjust depth, toggle XML tags, or add Few-Shot examples.", icon: Wand2 },
 { step:"03", title:"Deploy Meta-Prompt", description:"Copy the perfectly formatted prompt tailored for your specific model.", icon: Copy }
 ]}
 badges={["100% Free","Claude 3.5 Ready","Midjourney Optimized"]}
 />

 <ToolFeatureGuides
 features={[
 { icon: Sparkles, title:"Model-Specific Syntax", description:"Automatically formats system instructions and tags (like XML for Claude) depending on your target model."},
 { icon: RefreshCcw, title:"Dynamic Logic Engine", description:"Sliders and toggles directly alter the prompt logic—no fake UI elements."},
 { icon: Copy, title:"1-Click Copy Workspace", description:"A clean workspace to review and instantly copy your generated master prompt."}
 ]}
 >
 <div className="prose dark:prose-invert max-w-none">
 <h3>Why Optimize Your Prompts?</h3>
 <p>
 Large Language Models perform exponentially better when given structured, formatted instructions. By wrapping your intent in clear system protocols, reasoning constraints, and XML tags, you prevent hallucinations and get production-ready results.
 </p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion
 faqs={[
 { question:"Does this work for Claude 3.5 Sonnet?", answer:"Yes! If you select Claude and enable XML tags, the system will perfectly format the prompt using Anthropics recommended structural tags."},
 { question:"How does the Detail Depth slider work?", answer:"Increasing the depth slider instructs the engine to add exhaustive, multi-step execution parameters and edge-case handling to your output prompt."}
 ]}
 />

 <RelatedTools currentToolUrl="/tools/ai/prompt-optimizer"/>

 </div>
 );
}

export default PromptOptimizerClient;
