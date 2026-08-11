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
import { Sparkles, Copy, Sliders, CheckCircle2, Terminal, Code2, Zap, Image as ImageIcon, Check, Lightbulb } from "lucide-react";
import toast from "react-hot-toast";

interface OptimizedResult {
  expandedSuperPrompt: string;
  rolePrompt: string;
  chainOfThoughtPrompt: string;
  systemInstructions: string;
  isImagePrompt: boolean;
  imageVariations?: {
    cinematic: string;
    studio: string;
    artistic: string;
  };
}

export function PromptOptimizerClient() {
  const [rawPrompt, setRawPrompt] = useState("");
  const [targetModel, setTargetModel] = useState<"gpt4" | "claude" | "midjourney" | "generic">("gpt4");
  const [domain, setDomain] = useState("general");
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [result, setResult] = useState<OptimizedResult | null>(null);

  const presets = [
    { label: "🐶 Dog Image Prompt", text: "Create a photorealistic image of a dog in a sunset meadow" },
    { label: "💻 Python Web Scraper", text: "Write a Python script to scrape product prices and save to CSV" },
    { label: "📝 SEO Blog Article", text: "Write a high-converting blog post about remote work productivity" },
    { label: "🚀 Startup Elevator Pitch", text: "Craft a 60-second elevator pitch for an AI productivity app" }
  ];

  const applyPreset = (presetText: string) => {
    setRawPrompt(presetText);
    toast.success("Sample prompt loaded!");
  };

  const handleOptimize = useCallback(() => {
    if (!rawPrompt.trim()) {
      toast.error("Please enter a prompt to optimize");
      return;
    }

    setIsOptimizing(true);

    setTimeout(() => {
      const input = rawPrompt.trim();
      const inputLower = input.toLowerCase();

      // Check if input is image related
      const isImg = targetModel === "midjourney" ||
        inputLower.includes("image") ||
        inputLower.includes("photo") ||
        inputLower.includes("picture") ||
        inputLower.includes("dog") ||
        inputLower.includes("cat") ||
        inputLower.includes("portrait") ||
        inputLower.includes("logo") ||
        inputLower.includes("draw") ||
        inputLower.includes("midjourney");

      if (isImg) {
        // Generate rich image prompts
        const subjectClean = input
          .replace(/create\s+a\s+|write\s+a\s+|generate\s+a\s+|photorealistic\s+image\s+of\s+a\s+|image\s+of\s+a\s+/gi, "")
          .trim() || "dog in a sunlit meadow";

        const cinematic = `/imagine prompt: Cinematic portrait of ${subjectClean}, golden hour sunlight filtering through lush natural surroundings, 85mm f/1.8 lens, shallow depth of field, hyper-realistic texture, 8k resolution, award-winning photography --ar 16:9 --style raw --v 6.0 --stylize 250`;
        const studio = `/imagine prompt: Commercial studio photograph of ${subjectClean}, clean soft pastel background, professional studio lighting, sharp focus, Hasselblad H6D-100c, vibrant colors, detailed features --ar 4:3 --stylize 150`;
        const artistic = `/imagine prompt: Atmospheric digital concept art of ${subjectClean}, dramatic lighting, intricate details, Octane Render 3D, Unreal Engine 5, trending on ArtStation --ar 16:9 --v 6.0`;

        setResult({
          expandedSuperPrompt: `[ACT AS AN EXPERT AI ART DIRECTOR & PROMPT ENGINEER]\n\nTask: Generate a high-resolution, photorealistic image based on: "${input}".\n\nKey Visual Attributes:\n- Subject: ${subjectClean}\n- Environment: Sunlit natural setting with warm volumetric lighting\n- Camera & Lens: 85mm prime lens, f/1.4 aperture, shallow depth of field\n- Style: Photorealistic, 8k resolution, cinematic color grading\n- Parameters: --ar 16:9 --v 6.0 --style raw`,
          rolePrompt: cinematic,
          chainOfThoughtPrompt: studio,
          systemInstructions: "Detected image generation intent. Expanded raw draft into 3 specialized visual prompts with lighting, camera lens parameters, and aspect ratio flags.",
          isImagePrompt: true,
          imageVariations: {
            cinematic,
            studio,
            artistic
          }
        });
      } else if (inputLower.includes("code") || inputLower.includes("script") || inputLower.includes("python") || inputLower.includes("javascript") || inputLower.includes("sql") || inputLower.includes("api")) {
        // Coding prompt expansion
        const superPrompt = `Act as a Senior Principal Software Architect with 15+ years of experience in enterprise development.\n\nTask: ${input}\n\nStrict Engineering Constraints:\n1. Provide full, production-ready code with no placeholders or omitted logic.\n2. Implement robust error handling, input validation, and type safety.\n3. Include clean inline comments and docstrings explaining core algorithm steps.\n4. Provide a sample execution usage example at the end.`;

        const role = `<system>\nYou are a Lead Software Architect. Your objective is to implement "${input}" following clean code architecture principles. Output fully tested, executable code.\n</system>\n\n<user_request>\n${input}\n</user_request>`;

        const cot = `<task>\n${input}\n</task>\n\n<thinking>\nStep 1: Deconstruct requirements and edge cases.\nStep 2: Define data structures and type signatures.\nStep 3: Write core logic with defensive guards.\nStep 4: Verify time and space complexity.\n</thinking>\n\n<output>\n[Executable Code Here]\n</output>`;

        setResult({
          expandedSuperPrompt: superPrompt,
          rolePrompt: role,
          chainOfThoughtPrompt: cot,
          systemInstructions: "Transformed draft into production software architecture prompts with type safety constraints and error handling requirements.",
          isImagePrompt: false
        });
      } else {
        // General text & copywriting expansion
        const superPrompt = `Act as an Elite Domain Specialist and Master Communicator.\n\nPrimary Goal: Expand and execute the following task with maximum depth and accuracy: "${input}".\n\nExecution Blueprint:\n1. Provide a clear Executive Summary answering the core objective.\n2. Break down implementation steps using structured markdown headers and bullet points.\n3. Highlight potential edge cases, trade-offs, or common pitfalls to avoid.\n4. Conclude with actionable next steps.`;

        const role = `<system>\nYou are an expert subject matter consultant. Respond to the user request with clear, structured, and actionable guidance based strictly on verifiable facts.\n</system>\n\n<user_request>\n${input}\n</user_request>`;

        const cot = `Please analyze the following task step-by-step before outputting the final response:\n\nTask: ${input}\n\nReasoning Process:\n1. What is the core underlying objective?\n2. What are the key constraints or target audience expectations?\n3. What is the most structured way to present this information?\n\nLet's think step by step.`;

        setResult({
          expandedSuperPrompt: superPrompt,
          rolePrompt: role,
          chainOfThoughtPrompt: cot,
          systemInstructions: "Expanded input into an actionable super-prompt with explicit output structure, persona framing, and step-by-step reasoning triggers.",
          isImagePrompt: false
        });
      }

      setIsOptimizing(false);
      toast.success("Prompt expanded into high-yield engineering instructions!");
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
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">Transform short draft prompts into detailed, high-yield system instructions for ChatGPT, Claude 3.5, Midjourney, and DeepSeek.</p>
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
            {/* Quick Presets */}
            <div>
              <Label className="text-[11px] mb-1.5 block text-slate-500 font-semibold uppercase tracking-wider flex items-center gap-1">
                <Lightbulb className="w-3 h-3 text-amber-500" /> Quick Presets (Click to load)
              </Label>
              <div className="flex flex-wrap gap-1.5">
                {presets.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => applyPreset(p.text)}
                    className="text-xs bg-slate-100 dark:bg-slate-800 hover:bg-purple-50 hover:text-purple-700 dark:hover:bg-purple-950/50 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 transition-all font-medium"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-xs mb-1 block text-slate-700 dark:text-slate-300 font-medium">Your Draft / Idea Prompt</Label>
              <textarea
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 text-sm outline-none focus:ring-2 focus:ring-purple-500 min-h-[120px] font-sans text-slate-900 dark:text-slate-100"
                placeholder="e.g. Create a photorealistic image of a golden retriever dog in a sunset meadow..."
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
                  <option value="general">General / Creative</option>
                  <option value="coding">Software Development</option>
                  <option value="writing">Creative & Copywriting</option>
                  <option value="marketing">Marketing & Growth</option>
                </select>
              </div>
            </div>

            <Button onClick={handleOptimize} disabled={isOptimizing || !rawPrompt.trim()} className="w-full gap-2 mt-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold shadow-md shadow-purple-500/20 rounded-xl h-11">
              <Sparkles className="w-4 h-4" />
              {isOptimizing ? "Expanding & Refining Prompt..." : "Optimize & Expand Prompt"}
            </Button>
          </CardContent>
        </GlassCard>

        {/* Results Column */}
        <div className="space-y-4">
          {result ? (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              {result.isImagePrompt && result.imageVariations ? (
                <>
                  <GlassCard className="p-4 space-y-3 border-l-4 border-l-purple-500">
                    <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
                      <span className="text-xs font-extrabold text-purple-600 uppercase tracking-wider flex items-center gap-1.5">
                        <ImageIcon className="w-3.5 h-3.5" /> Option 1: Cinematic Photorealistic Prompt
                      </span>
                      <Button variant="outline" size="sm" onClick={() => handleCopy(result.imageVariations!.cinematic, "Cinematic Image Prompt")} className="h-7 text-xs gap-1 border-slate-200">
                        <Copy className="w-3.5 h-3.5" /> Copy
                      </Button>
                    </div>
                    <pre className="text-xs font-mono bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800 whitespace-pre-wrap leading-relaxed text-slate-800 dark:text-slate-200">{result.imageVariations.cinematic}</pre>
                  </GlassCard>

                  <GlassCard className="p-4 space-y-3 border-l-4 border-l-sky-500">
                    <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
                      <span className="text-xs font-extrabold text-sky-600 uppercase tracking-wider flex items-center gap-1.5">
                        <ImageIcon className="w-3.5 h-3.5" /> Option 2: Studio Commercial Product Prompt
                      </span>
                      <Button variant="outline" size="sm" onClick={() => handleCopy(result.imageVariations!.studio, "Studio Image Prompt")} className="h-7 text-xs gap-1 border-slate-200">
                        <Copy className="w-3.5 h-3.5" /> Copy
                      </Button>
                    </div>
                    <pre className="text-xs font-mono bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800 whitespace-pre-wrap leading-relaxed text-slate-800 dark:text-slate-200">{result.imageVariations.studio}</pre>
                  </GlassCard>

                  <GlassCard className="p-4 space-y-3 border-l-4 border-l-emerald-500">
                    <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
                      <span className="text-xs font-extrabold text-emerald-600 uppercase tracking-wider flex items-center gap-1.5">
                        <ImageIcon className="w-3.5 h-3.5" /> Option 3: Artistic 3D Concept Art Prompt
                      </span>
                      <Button variant="outline" size="sm" onClick={() => handleCopy(result.imageVariations!.artistic, "Artistic Image Prompt")} className="h-7 text-xs gap-1 border-slate-200">
                        <Copy className="w-3.5 h-3.5" /> Copy
                      </Button>
                    </div>
                    <pre className="text-xs font-mono bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800 whitespace-pre-wrap leading-relaxed text-slate-800 dark:text-slate-200">{result.imageVariations.artistic}</pre>
                  </GlassCard>
                </>
              ) : (
                <>
                  <GlassCard className="p-4 space-y-3 border-l-4 border-l-purple-500">
                    <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
                      <span className="text-xs font-extrabold text-purple-600 uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" /> Expanded Super-Prompt
                      </span>
                      <Button variant="outline" size="sm" onClick={() => handleCopy(result.expandedSuperPrompt, "Expanded Super-Prompt")} className="h-7 text-xs gap-1 border-slate-200">
                        <Copy className="w-3.5 h-3.5" /> Copy
                      </Button>
                    </div>
                    <pre className="text-xs font-mono bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800 whitespace-pre-wrap leading-relaxed text-slate-800 dark:text-slate-200">{result.expandedSuperPrompt}</pre>
                  </GlassCard>

                  <GlassCard className="p-4 space-y-3 border-l-4 border-l-indigo-500">
                    <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
                      <span className="text-xs font-extrabold text-indigo-600 uppercase tracking-wider flex items-center gap-1.5">
                        <Code2 className="w-3.5 h-3.5" /> Structured System Persona
                      </span>
                      <Button variant="outline" size="sm" onClick={() => handleCopy(result.rolePrompt, "System persona prompt")} className="h-7 text-xs gap-1 border-slate-200">
                        <Copy className="w-3.5 h-3.5" /> Copy
                      </Button>
                    </div>
                    <pre className="text-xs font-mono bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800 whitespace-pre-wrap leading-relaxed text-slate-800 dark:text-slate-200">{result.rolePrompt}</pre>
                  </GlassCard>
                </>
              )}

              <GlassCard className="p-4 space-y-2">
                <span className="text-xs font-semibold text-slate-500">Optimization Enhancements Applied:</span>
                <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">{result.systemInstructions}</p>
              </GlassCard>
            </motion.div>
          ) : (
            <GlassCard className="p-8 h-[380px] flex flex-col items-center justify-center text-center text-slate-400 border-dashed border-2 border-slate-200 dark:border-slate-800">
              <Sparkles className="w-12 h-12 mb-3 text-slate-300 dark:text-slate-700" />
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">No Prompt Optimized Yet</p>
              <p className="text-xs max-w-xs mt-1 text-slate-500">Enter your draft prompt or click a quick preset on the left to generate expanded visual and text prompts.</p>
            </GlassCard>
          )}
        </div>
      </div>

      <ToolHowItWorks
        steps={[
          { step: "01", title: "Paste Rough Concept", description: "Input any short idea draft or click a quick preset button.", icon: Terminal },
          { step: "02", title: "Select Target Model", description: "Specify whether you are targeting ChatGPT, Claude, Midjourney, or DeepSeek.", icon: Sliders },
          { step: "03", title: "Copy Engineered Prompt", description: "Receive expanded visual image prompts or structured LLM super-prompts instantly.", icon: CheckCircle2 }
        ]}
        badges={["100% Free", "Midjourney & Flux Ready", "Multi-LLM Compatible"]}
      />

      <ToolFeatureGuides
        features={[
          { icon: ImageIcon, title: "Image Prompt Generator", description: "Expands simple object descriptions into detailed Midjourney v6 and Flux prompts with lighting, lens, and resolution parameters." },
          { icon: Code2, title: "XML Structural Tagging", description: "Injects strict XML delimiter tags optimized for Claude 3.5 Sonnet and OpenAI o1 models." },
          { icon: Zap, title: "Chain-of-Thought Activation", description: "Forces step-by-step internal reasoning before the model emits final text output." },
          { icon: CheckCircle2, title: "Zero Data Logging", description: "Your proprietary prompts remain completely confidential and client-side." }
        ]}
      >
        <div className="prose dark:prose-invert max-w-none">
          <h3>Why Prompt Engineering Matters for AI Quality</h3>
          <p>
            Large Language Models (LLMs) and Image Generators (Midjourney, DALL-E 3) respond dramatically better to structured system prompts with explicit persona framing, lighting parameters, and step-by-step reasoning instructions. Vague draft prompts like "write a dog image prompt" lead to generic results, whereas engineered prompts yield photorealistic, production-ready output on the first attempt.
          </p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion
        faqs={[
          { question: "What happens when I enter an image prompt like 'dog photo'?", answer: "The tool automatically detects image generation intent and expands your request into 3 photorealistic Midjourney v6 / Flux prompts complete with lighting, camera lens, and aspect ratio parameters." },
          { question: "What is Chain-of-Thought (CoT) prompting?", answer: "Chain-of-Thought prompting directs the AI model to reason step-by-step through a problem before arriving at its final answer, significantly reducing logical errors." }
        ]}
      />

      <RelatedTools currentToolUrl="/tools/ai/prompt-optimizer" max={6} />
    </div>
  );
}

export default PromptOptimizerClient;
