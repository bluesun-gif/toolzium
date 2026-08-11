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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Rocket, Sparkles, Copy, CheckCircle2, Sliders, RefreshCcw, ExternalLink } from "lucide-react";
import toast from "react-hot-toast";

interface StartupIdea {
  name: string;
  tagline: string;
  domainSuggestion: string;
  style: string;
}

export function StartupNameClient() {
  const [keywords, setKeywords] = useState("");
  const [industry, setIndustry] = useState("tech");
  const [namingStyle, setNamingStyle] = useState<"modern" | "compound" | "abstract" | "suffix">("modern");

  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestions, setSuggestions] = useState<StartupIdea[]>([]);

  const handleGenerate = useCallback(() => {
    if (!keywords.trim()) {
      toast.error("Please enter a few keywords about your startup concept");
      return;
    }

    setIsGenerating(true);

    setTimeout(() => {
      const keys = keywords.split(/[,\s]+/).map(k => k.trim()).filter(Boolean);
      const base = keys[0] ? keys[0].charAt(0).toUpperCase() + keys[0].slice(1) : "Nexus";
      const second = keys[1] ? keys[1].charAt(0).toUpperCase() + keys[1].slice(1) : "Flow";

      let items: StartupIdea[] = [];

      if (namingStyle === "compound") {
        items = [
          { name: `${base}${second}`, tagline: `The unified platform for ${keywords}`, domainSuggestion: `${base.toLowerCase()}${second.toLowerCase()}.com`, style: "Compound Words" },
          { name: `Cloud${base}`, tagline: `Next-generation ${industry} infrastructure`, domainSuggestion: `cloud${base.toLowerCase()}.io`, style: "Compound Words" },
          { name: `${base}Grid`, tagline: `Intelligent workflow network for teams`, domainSuggestion: `${base.toLowerCase()}grid.app`, style: "Compound Words" },
          { name: `Hyper${second}`, tagline: `Ultra-fast solutions powered by intelligence`, domainSuggestion: `hyper${second.toLowerCase()}.ai`, style: "Compound Words" }
        ];
      } else if (namingStyle === "suffix") {
        items = [
          { name: `${base}ify`, tagline: `Automate your ${industry} workflow effortlessly`, domainSuggestion: `${base.toLowerCase()}ify.com`, style: "Modern Suffix" },
          { name: `${base}ly`, tagline: `The smarter way to manage ${keywords}`, domainSuggestion: `${base.toLowerCase()}ly.ai`, style: "Modern Suffix" },
          { name: `${base}io`, tagline: `Real-time analytics for ${industry}`, domainSuggestion: `${base.toLowerCase()}io.dev`, style: "Modern Suffix" },
          { name: `${second}able`, tagline: `Scalable ${industry} tools built for growth`, domainSuggestion: `${second.toLowerCase()}able.com`, style: "Modern Suffix" }
        ];
      } else {
        items = [
          { name: `${base}labs`, tagline: `Intelligent ${industry} solutions for modern teams`, domainSuggestion: `${base.toLowerCase()}labs.com`, style: "Modern Tech" },
          { name: `Velo${base}`, tagline: `Accelerate your ${keywords} workflow`, domainSuggestion: `velo${base.toLowerCase()}.ai`, style: "Brandable Abstract" },
          { name: `Zenith${second}`, tagline: `Enterprise-grade platform for ${industry}`, domainSuggestion: `zenith${second.toLowerCase()}.io`, style: "Brandable Abstract" },
          { name: `Apex${base}`, tagline: `The premier tool for ${keywords}`, domainSuggestion: `apex${base.toLowerCase()}.com`, style: "Modern Tech" }
        ];
      }

      setSuggestions(items);
      setIsGenerating(false);
      toast.success("Generated brandable startup names!");
    }, 450);
  }, [keywords, industry, namingStyle]);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-4">
      {/* 3D Orange Rocket Icon Header Box */}
      <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md shadow-slate-200/50">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg shadow-orange-500/30 flex items-center justify-center shrink-0">
          <Rocket className="w-7 h-7" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100">AI Startup Name & Brand Generator</h1>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-orange-100 dark:bg-orange-950/50 text-orange-700 dark:text-orange-300 px-2.5 py-0.5 rounded-full border border-orange-200">POPULAR</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">Generate catchy, brandable startup names, taglines, and domain suggestions based on your business keywords.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="p-0">
          <CardHeader className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 p-4">
            <CardTitle className="text-sm font-semibold flex items-center gap-2 text-slate-900 dark:text-slate-100">
              <Rocket className="w-4 h-4 text-orange-600" />
              Startup Concept Input
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 space-y-4">
            <div>
              <Label className="text-xs mb-1 block text-slate-700 dark:text-slate-300 font-medium">Core Keywords / Niche</Label>
              <Input
                placeholder="e.g. AI, automation, analytics, finance, health"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs mb-1 block text-slate-700 dark:text-slate-300 font-medium">Industry Sector</Label>
                <select
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-xs text-slate-900 dark:text-slate-100 font-medium"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                >
                  <option value="tech">Software & AI Tech</option>
                  <option value="fintech">Fintech & Finance</option>
                  <option value="ecommerce">E-Commerce & Retail</option>
                  <option value="health">Healthcare & Fitness</option>
                </select>
              </div>

              <div>
                <Label className="text-xs mb-1 block text-slate-700 dark:text-slate-300 font-medium">Naming Style</Label>
                <select
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-xs text-slate-900 dark:text-slate-100 font-medium"
                  value={namingStyle}
                  onChange={(e) => setNamingStyle(e.target.value as any)}
                >
                  <option value="modern">Modern Tech (.io, .ai)</option>
                  <option value="compound">Compound Words (CloudFlow)</option>
                  <option value="suffix">Modern Suffix (Baseify)</option>
                  <option value="abstract">Abstract Brandable (Zenith)</option>
                </select>
              </div>
            </div>

            <Button onClick={handleGenerate} disabled={isGenerating || !keywords.trim()} className="w-full gap-2 mt-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold shadow-md shadow-orange-500/20 rounded-xl h-11">
              {isGenerating ? <RefreshCcw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              {isGenerating ? "Brainstorming Names..." : "Generate Startup Names"}
            </Button>
          </CardContent>
        </GlassCard>

        <div className="space-y-4">
          {suggestions.length > 0 ? (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
              <span className="text-xs font-extrabold text-orange-600 uppercase tracking-wider px-1">Brandable Name Concepts ({suggestions.length})</span>
              {suggestions.map((item, idx) => (
                <GlassCard key={idx} className="p-4 space-y-2 border-l-4 border-l-orange-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-black text-slate-900 dark:text-slate-100">{item.name}</h3>
                      <span className="text-[10px] font-mono font-bold text-orange-600 bg-orange-50 dark:bg-orange-950/50 px-2 py-0.5 rounded-full border border-orange-200">{item.style}</span>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => handleCopy(item.name, "Startup name")} className="h-8 text-xs gap-1 border-slate-200">
                      <Copy className="w-3.5 h-3.5" /> Copy
                    </Button>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">{item.tagline}</p>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs font-mono font-semibold text-slate-500">{item.domainSuggestion}</span>
                    <a
                      href={`https://namecheap.pxf.io/c/123456/386170/5618?u=https%3A%2F%2Fwww.namecheap.com%2Fdomains%2Fdomain-name-search%2F%3Fdomain%3D${item.domainSuggestion}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-semibold text-blue-600 hover:underline flex items-center gap-1"
                    >
                      Check Domain <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </GlassCard>
              ))}
            </motion.div>
          ) : (
            <GlassCard className="p-8 h-[380px] flex flex-col items-center justify-center text-center text-slate-400 border-dashed border-2 border-slate-200 dark:border-slate-800">
              <Rocket className="w-12 h-12 mb-3 text-slate-300 dark:text-slate-700" />
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">No Names Generated Yet</p>
              <p className="text-xs max-w-xs mt-1 text-slate-500">Enter your startup keywords on the left to brainstorm brandable business names and taglines.</p>
            </GlassCard>
          )}
        </div>
      </div>

      <ToolHowItWorks
        steps={[
          { step: "01", title: "Enter Keywords", description: "Input core product keywords, niche terms, or industry focus.", icon: Rocket },
          { step: "02", title: "Select Naming Style", description: "Choose between Modern Tech, Compound Words, or Suffixes.", icon: Sliders },
          { step: "03", title: "Check Domain Availability", description: "Export brandable names and verify domain status.", icon: CheckCircle2 }
        ]}
        badges={["100% Free", "Domain Suggestions", "Brand Taglines Included"]}
      />

      <ToolFeatureGuides
        features={[
          { icon: Rocket, title: "Brandable Naming Engine", description: "Combines linguistic prefixes, suffixes, and compound roots for memorable names." },
          { icon: ExternalLink, title: "1-Click Domain Lookups", description: "Direct links to check domain registration status across .com, .io, and .ai TLDs." },
          { icon: CheckCircle2, title: "Tagline & Positioning", description: "Generates complementary brand taglines for immediate pitch presentation." }
        ]}
      >
        <div className="prose dark:prose-invert max-w-none">
          <h3>The Importance of a Strong Brand Name</h3>
          <p>
            A memorable startup name establishes instant credibility with potential investors and early adopters. High-converting brand names are short, easy to pronounce, and aligned with modern domain TLD trends.
          </p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion
        faqs={[
          { question: "Are these startup names trademarked?", answer: "Name suggestions are algorithmically generated. Always perform a trademark search before launching." },
          { question: "Which domain extension is best for tech startups?", answer: ".com remains the gold standard for global consumer brands, while .io and .ai dominate developer and artificial intelligence startups." }
        ]}
      />

      <RelatedTools currentToolUrl="/tools/ai/startup-name" max={6} />
    </div>
  );
}

export default StartupNameClient;
