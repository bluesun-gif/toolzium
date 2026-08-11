"use client";

import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Sparkles, Copy, Sliders, CheckCircle2, Terminal, Code2, Zap, Cpu } from "lucide-react";
import toast from "react-hot-toast";

interface OptimizedResult {
  rolePrompt: string;
  chainOfThoughtPrompt: string;
  fewShotPrompt: string;
  systemInstructions: string;
}

export function PromptOptimizerClient() {
  const [rawPrompt, setRawPrompt] = useState("");
  const [targetModel, setTargetModel] = useState<"gpt4" | "claude" | "midjourney" | "generic">("gpt4");
  const [domain, setDomain] = useState("general");
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [result, setResult] = useState<OptimizedResult | null>(null);

  const handleOptimize = useCallback(() => {
    if (!rawPrompt.trim()) {
      toast.error("Please enter a prompt to optimize");
      return;
    }

    setIsOptimizing(true);

    setTimeout(() => {
      const input = rawPrompt.trim();

      if (targetModel === "midjourney") {
        setResult({
          rolePrompt: `/imagine prompt: ${input}, hyperrealistic, 8k resolution, cinematic lighting, octane render, unreal engine 5, intricate details, photorealistic, depth of field --ar 16:9 --v 6.0 --style raw`,
          chainOfThoughtPrompt: `/imagine prompt: Architectural concept photography of ${input}, volumetric atmosphere, award-winning photography, soft natural illumination, golden hour glow --ar 4:3 --stylize 250`,
          fewShotPrompt: `/imagine prompt: Minimalist studio shot of ${input}, clean background, sharp focus, Hasselblad H6D-100c, commercial grade --ar 1:1`,
          systemInstructions: `Parameters applied: Aspect ratio set, stylize strength balanced, model v6.0 defaults enforced.`
        });
      } else if (targetModel === "claude") {
        setResult({
          rolePrompt: `<system>\nYou are an elite subject matter expert in ${domain}. Your goal is to provide precise, nuanced, and highly structured answers based strictly on verifiable facts.\n</system>\n\n<user_request>\n${input}\n</user_request>\n\n<formatting_rules>\n- Present your response using clear markdown headings and bullet points.\n- Highlight critical trade-offs or assumptions.\n- Avoid unnecessary conversational fluff.\n</formatting_rules>`,
          chainOfThoughtPrompt: `<task>\n${input}\n</task>\n\n<thinking>\nStep 1: Analyze core objectives and implicit requirements.\nStep 2: Identify edge cases or key constraints.\nStep 3: Synthesize recommendations.\n</thinking>\n\n<output>\n[Provide final response here]\n</output>`,
          fewShotPrompt: `Example 1:\nInput: Write a summary of serverless architecture.\nOutput: Serverless computing allows developers to build applications without managing infrastructure...\n\nNow process:\nInput: ${input}`,
          systemInstructions: `XML tags (<system>, <task>, <thinking>) added to optimize Claude's attention and prompt caching structure.`
        });
      } else {
        setResult({
          rolePrompt: `Act as a Senior ${domain === "coding" ? "Software Architect" : "Strategy Consultant"}. You have 15+ years of experience.\n\nTask: ${input}\n\nConstraints:\n1. Be concise, direct, and actionable.\n2. Provide concrete examples or code snippets where applicable.\n3. Format key points using bold headers and markdown lists.`,
          chainOfThoughtPrompt: `Please address the following task step-by-step:\n\nTask: ${input}\n\nExecution Steps:\n1. Deconstruct the primary problem statement.\n2. Evaluate potential solutions with pros & cons.\n3. Recommend the optimal approach with step-by-step implementation guidance.\n\nLet's think step by step.`,
          fewShotPrompt: `Input Query: ${input}\n\nExpected Output Format:\n1. Executive Summary\n2. Key Takeaways / Implementation Steps\n3. Potential Edge Cases to Avoid`,
          systemInstructions: `Added persona framing, step-by-step reasoning triggers, and explicit output structural constraints.`
        });
      }

      setIsOptimizing(false);
      toast.success("Prompt optimized across 4 engineering paradigms!");
    }, 400);
  }, [rawPrompt, targetModel, domain]);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-4">
      {/* 3D Colorful Icon Header Box */}
      <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md shadow-slate-200/50">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-purple-500/30 flex items-center justify-center shrink-0">
          <Sparkles className="w-7 h-7" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100">AI Prompt Optimizer & Meta-Prompt Builder</h1>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-purple-100 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 px-2.5 py-0.5 rounded-full border border-purple-200">POPULAR</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">Transform vague draft prompts into structured, high-yield system instructions for ChatGPT, Claude 3.5, Midjourney, and DeepSeek.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="p-0">
          <CardHeader className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 p-4">
            <CardTitle className="text-sm font-semibold flex items-center gap-2 text-slate-900 dark:text-slate-100">
              <Terminal className="w-4 h-4 text-purple-600" />
              Raw Input Draft Prompt
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 space-y-4">
            <div>
              <Label className="text-xs mb-1 block text-slate-700 dark:text-slate-300 font-medium">Your Draft / Raw Prompt</Label>
              <textarea
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 text-sm outline-none focus:ring-2 focus:ring-purple-500 min-h-[130px] font-mono text-slate-900 dark:text-slate-100"
                placeholder="e.g. Write a Python script to scrape product prices from a web page and save to CSV"
                value={rawPrompt}
                onChange={(e) => setRawPrompt(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs mb-1 block text-slate-700 dark:text-slate-300 font-medium">Target AI Engine</Label>
                <select
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-xs text-slate-900 dark:text-slate-100 font-medium"
                  value={targetModel}
                  onChange={(e) => setTargetModel(e.target.value as any)}
                >
                  <option value="gpt4">OpenAI ChatGPT / GPT-4o</option>
                  <option value="claude">Anthropic Claude 3.5 Sonnet</option>
                  <option value="midjourney">Midjourney / Flux (Image)</option>
                  <option value="generic">Generic / DeepSeek R1</option>
                </select>
              </div>

              <div>
                <Label className="text-xs mb-1 block text-slate-700 dark:text-slate-300 font-medium">Domain Persona</Label>
                <select
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-xs text-slate-900 dark:text-slate-100 font-medium"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                >
                  <option value="general">General / Business</option>
                  <option value="coding">Software Development</option>
                  <option value="writing">Creative & Copywriting</option>
                  <option value="marketing">Marketing & Growth</option>
                </select>
              </div>
            </div>

            <Button onClick={handleOptimize} disabled={isOptimizing || !rawPrompt.trim()} className="w-full gap-2 mt-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold shadow-md shadow-purple-500/20 rounded-xl h-11">
              <Sparkles className="w-4 h-4" />
              {isOptimizing ? "Refining Prompt Engineering..." : "Optimize Prompt"}
            </Button>
          </CardContent>
        </GlassCard>

        <div className="space-y-4">
          {result ? (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <GlassCard className="p-4 space-y-3">
                <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
                  <span className="text-xs font-extrabold text-purple-600 uppercase tracking-wider flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5" /> Structured System Persona
                  </span>
                  <Button variant="outline" size="sm" onClick={() => handleCopy(result.rolePrompt, "System persona prompt")} className="h-7 text-xs gap-1 border-slate-200">
                    <Copy className="w-3.5 h-3.5" /> Copy
                  </Button>
                </div>
                <pre className="text-xs font-mono bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800 whitespace-pre-wrap leading-relaxed text-slate-800 dark:text-slate-200">{result.rolePrompt}</pre>
              </GlassCard>

              <GlassCard className="p-4 space-y-3">
                <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
                  <span className="text-xs font-extrabold text-indigo-600 uppercase tracking-wider flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5" /> Chain-of-Thought (Reasoning Trigger)
                  </span>
                  <Button variant="outline" size="sm" onClick={() => handleCopy(result.chainOfThoughtPrompt, "Chain-of-thought prompt")} className="h-7 text-xs gap-1 border-slate-200">
                    <Copy className="w-3.5 h-3.5" /> Copy
                  </Button>
                </div>
                <pre className="text-xs font-mono bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800 whitespace-pre-wrap leading-relaxed text-slate-800 dark:text-slate-200">{result.chainOfThoughtPrompt}</pre>
              </GlassCard>

              <GlassCard className="p-4 space-y-2">
                <span className="text-xs font-semibold text-slate-500">Engineering Enhancements Applied:</span>
                <p className="text-xs text-slate-700 dark:text-slate-300">{result.systemInstructions}</p>
              </GlassCard>
            </motion.div>
          ) : (
            <GlassCard className="p-8 h-[380px] flex flex-col items-center justify-center text-center text-slate-400 border-dashed border-2 border-slate-200 dark:border-slate-800">
              <Sparkles className="w-12 h-12 mb-3 text-slate-300 dark:text-slate-700" />
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">No Prompt Optimized Yet</p>
              <p className="text-xs max-w-xs mt-1 text-slate-500">Enter your initial draft prompt on the left and select your target model to generate role-framed, chain-of-thought prompts.</p>
            </GlassCard>
          )}
        </div>
      </div>

      <ToolHowItWorks
        steps={[
          { step: "01", title: "Paste Rough Concept", description: "Input any short or unorganized prompt draft into the optimizer.", icon: Terminal },
          { step: "02", title: "Select Engine & Target", description: "Specify whether you are targeting ChatGPT, Claude, Midjourney, or DeepSeek.", icon: Sliders },
          { step: "03", title: "Copy Engineered Prompt", description: "Receive structured role-play, chain-of-thought, and XML-tagged prompts instantly.", icon: CheckCircle2 }
        ]}
        badges={["100% Free", "Prompt Security", "Multi-LLM Compatible"]}
      />

      <ToolFeatureGuides
        features={[
          { icon: Code2, title: "XML Structural Tagging", description: "Injects strict XML delimiter tags optimized for Claude 3.5 Sonnet and OpenAI o1 models." },
          { icon: Zap, title: "Chain-of-Thought Activation", description: "Forces step-by-step internal reasoning before the model emits final text output." },
          { icon: Sparkles, title: "Midjourney v6 Parametric Flags", description: "Automatically adds aspect ratios, stylize values, and photorealistic parameters for image generators." },
          { icon: CheckCircle2, title: "Zero Data Logging", description: "Your proprietary prompts remain completely confidential and client-side." }
        ]}
      >
        <div className="prose dark:prose-invert max-w-none">
          <h3>Why Prompt Engineering Matters for AI Quality</h3>
          <p>
            Large Language Models (LLMs) like GPT-4o and Claude 3.5 Sonnet respond dramatically better to structured system prompts with explicit persona framing, output formatting rules, and step-by-step reasoning instructions. Vague prompts lead to generic hallucinations, whereas engineered prompts yield precise, production-ready output on the first attempt.
          </p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion
        faqs={[
          { question: "What is Chain-of-Thought (CoT) prompting?", answer: "Chain-of-Thought prompting directs the AI model to reason step-by-step through a problem before arriving at its final answer, significantly reducing mathematical and logical errors." },
          { question: "Why does Midjourney require different optimization?", answer: "Midjourney operates on visual parameters (such as --ar 16:9, --stylize, --v 6.0) and visual keywords rather than conversational instructions." }
        ]}
      />

      <RelatedTools currentToolUrl="/tools/ai/prompt-optimizer" max={6} />
    </div>
  );
}

export default PromptOptimizerClient;
