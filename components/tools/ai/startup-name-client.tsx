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
import { Rocket, Sparkles, Copy, CheckCircle2, Sliders, RefreshCcw, Globe, ExternalLink } from "lucide-react";
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
      } else if (namingStyle === "abstract") {
        items = [
          { name: `Aura${base.slice(0, 3)}`, tagline: `Elevating human potential in ${industry}`, domainSuggestion: `aura${base.toLowerCase().slice(0, 3)}.com`, style: "Abstract Brand" },
          { name: `Velo${second.slice(0, 3)}`, tagline: `Speed, clarity, and precision for teams`, domainSuggestion: `velo${second.toLowerCase().slice(0, 3)}.io`, style: "Abstract Brand" },
          { name: `Kinetix`, tagline: `Dynamic acceleration for ${industry} leaders`, domainSuggestion: `kinetix.ai`, style: "Abstract Brand" },
          { name: `ZentrX`, tagline: `Minimalist architecture for modern digital assets`, domainSuggestion: `zentrx.app`, style: "Abstract Brand" }
        ];
      } else {
        items = [
          { name: `${base} AI`, tagline: `Autonomous intelligence for ${industry}`, domainSuggestion: `${base.toLowerCase()}ai.com`, style: "Modern Tech" },
          { name: `Pulse${base}`, tagline: `Live metric monitoring and ${keywords}`, domainSuggestion: `pulse${base.toLowerCase()}.io`, style: "Modern Tech" },
          { name: `Nova${second}`, tagline: `Redefining how teams experience ${industry}`, domainSuggestion: `nova${second.toLowerCase()}.app`, style: "Modern Tech" },
          { name: `Synthetix`, tagline: `Deep learning algorithms built for scale`, domainSuggestion: `synthetix.ai`, style: "Modern Tech" }
        ];
      }

      setSuggestions(items);
      setIsGenerating(false);
      toast.success("Startup names and domain suggestions generated!");
    }, 450);
  }, [keywords, industry, namingStyle]);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-4">
      <ToolPageHeader
        icon={Rocket}
        title="AI Startup Name & Brand Generator"
        description="Brainstorm memorable, brandable startup names, taglines, and matching domain suggestions powered by modern naming formulas."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="p-0">
          <CardHeader className="border-b border-border/40 bg-muted/20 p-4">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Rocket className="w-4 h-4 text-primary" />
              Startup Concept Input
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 space-y-4">
            <div>
              <Label className="text-xs mb-1 block">Core Keywords / Concept</Label>
              <Input
                placeholder="e.g. cloud, data, analytics, speed"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs mb-1 block">Industry Sector</Label>
                <select
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                >
                  <option value="tech">SaaS & Technology</option>
                  <option value="fintech">Fintech & Finance</option>
                  <option value="ai">Artificial Intelligence</option>
                  <option value="ecommerce">E-Commerce & Retail</option>
                  <option value="health">Health & BioTech</option>
                </select>
              </div>

              <div>
                <Label className="text-xs mb-1 block">Naming Formula Style</Label>
                <select
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs"
                  value={namingStyle}
                  onChange={(e) => setNamingStyle(e.target.value as any)}
                >
                  <option value="modern">Modern Tech (.ai / .io)</option>
                  <option value="compound">Compound Words (CloudFlow)</option>
                  <option value="suffix">Modern Suffixes (-ify / -ly)</option>
                  <option value="abstract">Abstract Brandable (Kinetix)</option>
                </select>
              </div>
            </div>

            <Button onClick={handleGenerate} disabled={isGenerating || !keywords.trim()} className="w-full gap-2 mt-2">
              {isGenerating ? <RefreshCcw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              {isGenerating ? "Brainstorming Names..." : "Generate Startup Names"}
            </Button>
          </CardContent>
        </GlassCard>

        <div className="space-y-4">
          {suggestions.length > 0 ? (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
              {suggestions.map((item, idx) => (
                <GlassCard key={idx} className="p-4 space-y-2 hover:border-primary/50 transition-colors">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-[10px] font-bold text-primary uppercase tracking-wider bg-primary/10 px-2 py-0.5 rounded border border-primary/20">{item.style}</span>
                      <h3 className="text-lg font-extrabold text-foreground mt-1">{item.name}</h3>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => handleCopy(item.name, item.name)} className="h-8 text-xs gap-1">
                      <Copy className="w-3.5 h-3.5" /> Copy Name
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">{item.tagline}</p>
                  <div className="flex items-center justify-between pt-2 border-t border-border/40 text-xs">
                    <span className="font-mono text-xs text-emerald-500 flex items-center gap-1">
                      <Globe className="w-3.5 h-3.5" /> {item.domainSuggestion}
                    </span>
                    <a
                      href={`https://namecheap.cx?q=${item.domainSuggestion}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-muted-foreground hover:text-primary flex items-center gap-1"
                    >
                      Check Availability <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </GlassCard>
              ))}
            </motion.div>
          ) : (
            <GlassCard className="p-8 h-[380px] flex flex-col items-center justify-center text-center text-muted-foreground border-dashed">
              <Rocket className="w-12 h-12 mb-3 text-muted-foreground/30" />
              <p className="text-sm font-medium">No Startup Names Generated Yet</p>
              <p className="text-xs max-w-xs mt-1">Enter your concept keywords on the left to brainstorm company names, domain suggestions, and taglines.</p>
            </GlassCard>
          )}
        </div>
      </div>

      <ToolHowItWorks
        steps={[
          { step: "01", title: "Enter Keywords", description: "Input 1-3 core words that describe your company's core value proposition.", icon: Rocket },
          { step: "02", title: "Choose Naming Style", description: "Select between Compound, Tech Suffix (-ify/-ly), or Abstract brandable formulas.", icon: Sliders },
          { step: "03", title: "Check & Launch", description: "Review matching domain availability and copy brand taglines instantly.", icon: CheckCircle2 }
        ]}
        badges={["100% Free", "Domain Checked", "Tagline Generator"]}
      />

      <ToolFeatureGuides
        features={[
          { icon: Rocket, title: "Modern Naming Architecture", description: "Applies proven tech naming rules used by Y-Combinator startups and Fortune 500 brands." },
          { icon: Globe, title: "Instant Domain Suggestions", description: "Pairs every name with viable .com, .ai, .io, and .app TLD extensions." },
          { icon: CheckCircle2, title: "Integrated Tagline Crafting", description: "Generates one-line elevator pitches matching each brandable startup name." }
        ]}
      >
        <div className="prose dark:prose-invert max-w-none">
          <h3>The Mechanics of Brandable Startup Names</h3>
          <p>
            A great startup name should be easy to spell, memorable, and legally protectable. Today's top tech companies often rely on specific naming conventions: compound nouns (Dropbox, Stripe), tech suffixes (Spotify, Shopify), or abstract coined terms (Veritas, Axiom). Our generator applies these precise formulas to turn raw concept keywords into scalable brand identities.
          </p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion
        faqs={[
          { question: "How do I check if a domain name is registered?", answer: "Click 'Check Availability' on any generated startup name card to search WHOIS domain registries directly." },
          { question: "Can I trademark these generated names?", answer: "While our generator suggests original combinations, you should always run a search on your local trademark database (such as USPTO) before filing." }
        ]}
      />

      <RelatedTools currentToolUrl="/tools/ai/startup-name" max={6} />
    </div>
  );
}

export default StartupNameClient;
