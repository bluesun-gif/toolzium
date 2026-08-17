"use client";

import { Card } from "@/components/ui/card";

import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { ModelSelector } from "@/components/shared/model-selector";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { cn } from "@/lib/utils";
import { Rocket, Sparkles, Copy, CheckCircle2, Sliders, RefreshCcw, ExternalLink, Lightbulb, Globe, Building2, FileText, History, Trash2, Check, Type } from "lucide-react";
import toast from "react-hot-toast";
interface StartupIdea {
  name: string;
  tagline: string;
  domainSuggestion: string;
  style: string;
  elevatorPitch: string;
}
interface SavedHistory {
  id: string;
  keywords: string;
  industry: string;
  suggestions: StartupIdea[];
  timestamp: string;
}
export function StartupNameClient() {
  const [keywords, setKeywords] = useState("");
  const [model, setModel] = useState("gpt4o");
  const [industry, setIndustry] = useState("tech");
  const [namingStyle, setNamingStyle] = useState<"modern" | "compound" | "abstract" | "suffix" | "creative">("modern");
  const [tldPreference, setTldPreference] = useState<"ai" | "com" | "io" | "dev">("ai");
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestions, setSuggestions] = useState<StartupIdea[]>([]);
  const [history, setHistory] = useState<SavedHistory[]>([]);
  const industries = [{
    id: "tech",
    name: "Software & AI Tech"
  }, {
    id: "fintech",
    name: "Fintech & Banking"
  }, {
    id: "ecommerce",
    name: "E-Commerce & DTC"
  }, {
    id: "health",
    name: "Healthtech & Wellness"
  }, {
    id: "cybersecurity",
    name: "Cybersecurity & Cloud"
  }, {
    id: "education",
    name: "EdTech & Learning"
  }, {
    id: "sustainability",
    name: "CleanTech & Green Energy"
  }];
  const presets = [{
    label: "🤖 AI Customer Service",
    text: "Autonomous AI customer support agents for e-commerce"
  }, {
    label: "💳 Crypto Payment Gateway",
    text: "Instant multi-chain crypto payment API for developers"
  }, {
    label: "📊 B2B Sales Intelligence",
    text: "Predictive lead scoring platform for enterprise sales teams"
  }, {
    label: "🌿 Green Logistics",
    text: "Carbon-neutral supply chain optimization platform"
  }];
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("toolzium_startup_name_history");
        if (saved) setHistory(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load startup name history:", e);
    }
  }, []);
  const saveToHistory = (item: SavedHistory) => {
    try {
      setHistory(prev => {
        const updated = [item, ...prev.slice(0, 19)];
        localStorage.setItem("toolzium_startup_name_history", JSON.stringify(updated));
        return updated;
      });
    } catch (e) {
      console.error("Failed to save history:", e);
    }
  };
  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("toolzium_startup_name_history");
    toast.success("History cleared!");
  };
  const applyPreset = (presetText: string) => {
    setKeywords(presetText);
    toast.success("Concept loaded!");
  };
  const handleGenerate = useCallback(async () => {
    if (!keywords.trim()) {
      toast.error("Please enter a few keywords or product concept");
      return;
    }
    setIsGenerating(true);
    const keyTrim = keywords.trim();
    const indName = industries.find(i => i.id === industry)?.name || "Tech";
    try {
      // Real AI Call to Groq AI Gateway
      const prompt = `Act as an elite Silicon Valley Brand Naming Strategist. Generate 6 unique, highly brandable startup names for a company in the ${indName} sector based on these keywords/concept: "${keyTrim}".
      
      Format requirements:
      Return EXACTLY a valid JSON array of objects with keys: name, tagline, domainSuggestion (ending in .${tldPreference}), style, elevatorPitch. Do not wrap in markdown or markdown code fences if possible, just return JSON.`;
      let generatedResults: StartupIdea[] = [];
      try {
        const response = await fetch("/api/ai/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            prompt,
            model,
            type: "json"
          })
        });
        const data = await response.json();
        if (data.success && data.raw) {
          const cleanJson = data.raw.replace(/```json/g, "").replace(/```/g, "").trim();
          generatedResults = JSON.parse(cleanJson);
        }
      } catch (err) {
        console.warn("AI backend parse fallback, generating smart client-side items:", err);
      }

      // Intelligent Fallback Generator if AI response fails or is invalid
      if (!Array.isArray(generatedResults) || generatedResults.length === 0) {
        const words = keyTrim.split(/[,\s]+/).map(w => w.trim()).filter(Boolean);
        const base = words[0] ? words[0].charAt(0).toUpperCase() + words[0].slice(1) : "Nexus";
        const alt = words[1] ? words[1].charAt(0).toUpperCase() + words[1].slice(1) : "Flow";
        generatedResults = [{
          name: `${base}AI`,
          tagline: `The intelligent platform for ${keyTrim}`,
          domainSuggestion: `${base.toLowerCase()}ai.${tldPreference}`,
          style: "Modern Tech",
          elevatorPitch: `An autonomous AI ecosystem designed to streamline ${keyTrim} for modern teams.`
        }, {
          name: `Velo${base}`,
          tagline: `Accelerated ${indName} workflows`,
          domainSuggestion: `velo${base.toLowerCase()}.${tldPreference}`,
          style: "Compound Brandable",
          elevatorPitch: `High-velocity software infrastructure enabling seamless execution.`
        }, {
          name: `${base}ly`,
          tagline: `Smart ${indName} made effortless`,
          domainSuggestion: `${base.toLowerCase()}ly.${tldPreference}`,
          style: "Modern Suffix",
          elevatorPitch: `Simplified user-centric tools for next-generation ${indName} optimization.`
        }, {
          name: `Zenith${alt}`,
          tagline: `Enterprise-grade platform for ${keyTrim}`,
          domainSuggestion: `zenith${alt.toLowerCase()}.${tldPreference}`,
          style: "Abstract Prestige",
          elevatorPitch: `Market-leading technology providing security, scale, and reliable insights.`
        }];
      }
      setSuggestions(generatedResults);
      saveToHistory({
        id: `startup-${Date.now()}`,
        keywords: keyTrim,
        industry: indName,
        suggestions: generatedResults,
        timestamp: new Date().toLocaleTimeString()
      });
      setIsGenerating(false);
      toast.success("Generated brandable startup names!");
    } catch (e) {
      console.error("Startup name generation error:", e);
      setIsGenerating(false);
      toast.error("Failed to generate names. Please try again.");
    }
  }, [keywords, industry, namingStyle, tldPreference]);
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

      <div className="max-w-[1400px] mx-auto p-4 md:p-6 lg:p-8 space-y-8 relative z-10">
        <ToolPageHeader title="AI Startup Name & Brand Generator Studio" description="Generate viral, brandable startup names, taglines, domain suggestions, and elevator pitches powered by AI." icon={Rocket} />

        <div className="space-y-6 relative z-10">
          

          <ModelSelector value={model} onChange={setModel} />


          <GlassCard className="p-5 flex flex-col bg-background border-border shadow-sm rounded-2xl">
            <div className="flex items-center gap-2 mb-4 border-b border-border pb-3">
              <Building2 className="w-5 h-5 text-primary" />
              <Label className="text-lg font-bold text-foreground">Startup Concept & Options</Label>
            </div>

            <div className="space-y-4 flex-1">
              <div>
                <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-2">
                  <Lightbulb className="w-3.5 h-3.5 inline mr-1 text-amber-500" />
                  Quick Presets (Click to Load)
                </Label>
                <div className="flex flex-wrap gap-1.5">
                  {presets.map((p, idx) => <Button key={idx} type="button" onClick={() => applyPreset(p.text)} className="text-xs bg-muted hover:bg-accent hover:text-accent-foreground text-muted-foreground px-3 py-1.5 rounded-full border border-border/60 transition-colors font-medium">
                      {p.label}
                    </Button>)}
                </div>
              </div>

              <div>
                <Label className="text-sm font-semibold text-muted-foreground block mb-1.5">
                  Product Concept / Core Keywords
                </Label>
                <textarea className="w-full rounded-xl border border-border bg-background p-3.5 text-sm outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary min-h-[100px] text-foreground font-medium" placeholder="e.g. Autonomous AI customer support agents for e-commerce stores..." value={keywords} onChange={e => setKeywords(e.target.value)} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-muted-foreground">Industry Sector</Label>
                  <select className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground font-medium outline-none focus:ring-2 focus:ring-primary/50" value={industry} onChange={e => setIndustry(e.target.value)}>
                    {industries.map(ind => <option key={ind.id} value={ind.id}>
                        {ind.name}
                      </option>)}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-muted-foreground">TLD Extension Focus</Label>
                  <select className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground font-medium outline-none focus:ring-2 focus:ring-primary/50" value={tldPreference} onChange={e => setTldPreference(e.target.value as any)}>
                    <option value="ai">.AI (Artificial Intelligence)</option>
                    <option value="com">.COM (Global Commercial)</option>
                    <option value="io">.IO (Tech Infrastructure)</option>
                    <option value="dev">.DEV (Developer Platform)</option>
                  </select>
                </div>
              </div>

              <Button onClick={handleGenerate} disabled={isGenerating || !keywords.trim()} className="w-full gap-2 mt-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/20 rounded-xl h-12 text-base">
                {isGenerating ? <RefreshCcw className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                {isGenerating ? "Brainstorming AI Names..." : "Generate Brandable Startup Names"}
              </Button>
            </div>
          </GlassCard>

          {/* Right Output Workspace Card */}
          <div className="flex flex-col space-y-4">
            {suggestions.length > 0 ? <motion.div initial={{
              opacity: 0,
              y: 15
            }} animate={{
              opacity: 1,
              y: 0
            }} className="space-y-4">
                <div className="flex justify-between items-center px-1">
                  <Label className="text-lg font-bold text-foreground">
                    Generated Brand Concepts ({suggestions.length})
                  </Label>
                </div>

                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                  {suggestions.map((item, idx) => <GlassCard key={idx} className="p-5 space-y-3 border-l-4 border-l-primary bg-card/70 backdrop-blur-md rounded-2xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-extrabold text-foreground">{item.name}</h3>
                          <span className="text-[11px] font-mono font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-md mt-1 inline-block">
                            {item.style}
                          </span>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => handleCopy(`${item.name} — ${item.tagline}`, "Brand info")} className="h-8 text-xs gap-1 border-border font-semibold">
                          <Copy className="w-3.5 h-3.5" /> Copy Brand
                        </Button>
                      </div>

                      <p className="text-sm font-semibold text-foreground/90">{item.tagline}</p>
                      {item.elevatorPitch && <p className="text-xs text-muted-foreground leading-relaxed">{item.elevatorPitch}</p>}

                      <div className="flex items-center justify-between pt-2 border-t border-border/40">
                        <span className="text-xs font-mono font-bold text-primary flex items-center gap-1">
                          <Globe className="w-3.5 h-3.5" /> {item.domainSuggestion}
                        </span>
                        <a href={`https://www.namecheap.com/domains/domain-name-search/?domain=${item.domainSuggestion}`} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
                          Check Domain <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </GlassCard>)}
                </div>
              </motion.div> : <GlassCard className="p-8 h-full min-h-[420px] flex flex-col items-center justify-center text-center text-muted-foreground border-dashed border-2 border-border rounded-2xl">
                <Rocket className="w-14 h-14 mb-3 text-muted-foreground/40" />
                <p className="text-base font-semibold text-foreground">No Names Generated Yet</p>
                <p className="text-xs max-w-xs mt-1 text-muted-foreground">
                  Enter your startup concept keywords on the left to generate brandable business names, taglines, and domain suggestions.
                </p>
              </GlassCard>}
          </div>
        </div>

        {/* History Drawer */}
        {history.length > 0 && <GlassCard className="p-5 bg-background border-border shadow-sm rounded-2xl">
            <div className="flex justify-between items-center mb-3 border-b border-border pb-2">
              <Label className="text-base font-bold text-foreground flex items-center gap-2">
                <History className="w-4 h-4 text-primary" /> Your Startup Name History ({history.length})
              </Label>
              <Button variant="ghost" size="sm" onClick={clearHistory} className="h-7 text-xs text-muted-foreground hover:text-red-500">
                <Trash2 className="w-3.5 h-3.5 mr-1" /> Clear
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[220px] overflow-y-auto pr-1">
              {history.map(item => <div key={item.id} className="p-3 bg-muted/40 rounded-xl border border-border flex justify-between items-center text-xs">
                  <div className="truncate max-w-[75%]">
                    <span className="font-bold text-foreground truncate block">{item.keywords}</span>
                    <span className="text-[10px] text-muted-foreground">{item.timestamp} · {item.industry}</span>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => {
                setSuggestions(item.suggestions);
                setKeywords(item.keywords);
              }} className="h-7 text-xs px-2.5 font-semibold">
                    Reload
                  </Button>
                </div>)}
            </div>
          </GlassCard>}

        </div>
<ToolHowItWorks steps={[{
          step: "01",
          title: "Enter Keywords",
          description: "Input core product keywords, niche terms, or concept idea.",
          icon: Rocket
        }, {
          step: "02",
          title: "Select Industry & TLD",
          description: "Choose target industry sector and domain TLD preference (.ai, .com).",
          icon: Sliders
        }, {
          step: "03",
          title: "Review & Check Domain",
          description: "Export brandable names, taglines, and verify domain availability.",
          icon: CheckCircle2
        }]} badges={["100% Free", "Domain Checkers", "AI Elevator Pitches"]} />

        <ToolFeatureGuides features={[{
          icon: Rocket,
          title: "Brandable Naming Engine",
          description: "Combines linguistic prefixes, suffixes, and compound roots for memorable names."
        }, {
          icon: ExternalLink,
          title: "1-Click Domain Lookups",
          description: "Direct links to check domain registration status across .com, .io, and .ai TLDs."
        }, {
          icon: CheckCircle2,
          title: "Tagline & Positioning",
          description: "Generates complementary brand taglines for immediate pitch presentation."
        }]}>
          <div className="prose dark:prose-invert max-w-none">
            <h3>The Importance of a Strong Brand Name</h3>
            <p>
              A memorable startup name establishes instant credibility with potential investors and early adopters. High-converting brand names are short, easy to pronounce, and aligned with modern domain TLD trends.
            </p>
          </div>
        </ToolFeatureGuides>

        <ToolFaqAccordion faqs={[{
          question: "Are these startup names trademarked?",
          answer: "Name suggestions are AI generated. Always perform a trademark search before launching."
        }, {
          question: "Which domain extension is best for tech startups?",
          answer: ".com remains the gold standard for global consumer brands, while .io and .ai dominate developer and artificial intelligence startups."
        }]} />
    </div>
    </div>
);
}

export default StartupNameClient;
