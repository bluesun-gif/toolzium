"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";
import { Rocket, Sparkles, RefreshCw, Copy, Check, Globe, Tag, Store } from "lucide-react";

interface StartupIdea {
  name: string;
  domain: string;
  tagline: string;
  elevatorPitch: string;
}

export default function StartupNameClient() {
  const [keywords, setKeywords] = useState<string>("AI automation workflow agent software");
  const [industry, setIndustry] = useState<string>("SaaS & Artificial Intelligence");
  const [vibe, setVibe] = useState<string>("Modern & Techy");

  const [ideas, setIdeas] = useState<StartupIdea[]>([
    {
      name: "FlowGenius AI",
      domain: "flowgenius.ai",
      tagline: "Autonomous Workflows for Modern Teams",
      elevatorPitch: "FlowGenius AI automates repetitive software tasks using intelligent AI agents.",
    },
    {
      name: "NexusPulse",
      domain: "nexuspulse.io",
      tagline: "The Pulse of Real-Time Automation",
      elevatorPitch: "NexusPulse connects enterprise data pipelines with real-time predictive insights.",
    },
    {
      name: "SynapseCraft",
      domain: "synapsecraft.com",
      tagline: "Crafting Next-Gen AI Experiences",
      elevatorPitch: "SynapseCraft empowers developers to deploy LLM agents in minutes.",
    },
  ]);

  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [copiedName, setCopiedName] = useState<string | null>(null);

  const handleGenerateNames = () => {
    if (!keywords.trim()) {
      toast.error("Please enter a few keywords or business concepts.");
      return;
    }

    setIsGenerating(true);

    setTimeout(() => {
      const cleanKw = keywords.trim().split(" ")[0] || "Nova";
      const capitalized = cleanKw.charAt(0).toUpperCase() + cleanKw.slice(1);

      setIdeas([
        {
          name: `${capitalized}Scale AI`,
          domain: `${cleanKw.toLowerCase()}scale.ai`,
          tagline: `Accelerate Your ${industry} Growth`,
          elevatorPitch: `High-throughput automation built specifically for ${industry}.`,
        },
        {
          name: `Vortex${capitalized}`,
          domain: `vortex${cleanKw.toLowerCase()}.io`,
          tagline: `The Intelligence Platform for ${industry}`,
          elevatorPitch: `Next-generation software engine driving ${industry} performance.`,
        },
        {
          name: `${capitalized}Sphere`,
          domain: `${cleanKw.toLowerCase()}sphere.com`,
          tagline: `Unified Operations & Insights`,
          elevatorPitch: `All-in-one ecosystem for managing modern ${industry} tasks.`,
        },
      ]);

      setIsGenerating(false);
      toast.success("Generated brandable startup names & domains!");
    }, 500);
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedName(label);
    toast.success(`Copied ${label}!`);
    setTimeout(() => setCopiedName(null), 2000);
  };

  return (
    <div className="mx-auto max-w-6xl px-2 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6 max-w-full overflow-hidden">
      <ToolPageHeader
        title="AI Startup & Business Name Generator Studio"
        description="Generate brandable startup names, available domain ideas (.ai, .com, .io), taglines, and elevator pitches with 1-click tone controls."
      />

      {/* SINGLE VIEWPORT STARTUP STUDIO WORKSPACE */}
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-12 min-h-[500px] max-w-full">
        {/* Left Column: Business Inputs (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col max-w-full min-w-0">
          <Card className="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl flex-1 flex flex-col justify-between overflow-hidden max-w-full min-w-0">
            <CardHeader className="border-b border-border/40 bg-muted/20 p-3 sm:p-4">
              <CardTitle className="text-xs sm:text-sm font-semibold flex items-center gap-2 tracking-tight">
                <Rocket className="h-4 w-4 text-primary shrink-0" />
                Startup Concept & Vibe
              </CardTitle>
            </CardHeader>

            <CardContent className="p-3 sm:p-4 space-y-3 flex-1 flex flex-col justify-between max-w-full min-w-0">
              <div className="space-y-1 max-w-full min-w-0">
                <label className="text-xs font-semibold text-muted-foreground">Keywords or Business Concept:</label>
                <Textarea
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  placeholder="e.g. AI automation, workflow, productivity..."
                  className="text-xs min-h-[110px] bg-muted/20 resize-none p-3 rounded-xl max-w-full min-w-0"
                />
              </div>

              {/* Industry & Vibe Selectors - Stacks on Mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs max-w-full min-w-0">
                <div className="space-y-1 max-w-full min-w-0">
                  <label className="font-semibold text-muted-foreground">Industry:</label>
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full bg-background border rounded-lg p-2 text-xs max-w-full min-w-0"
                  >
                    <option value="SaaS & Artificial Intelligence">SaaS & AI</option>
                    <option value="E-Commerce & Retail">E-Commerce</option>
                    <option value="Health & Fitness">Health & Fitness</option>
                    <option value="Finance & Crypto">Finance & Crypto</option>
                  </select>
                </div>

                <div className="space-y-1 max-w-full min-w-0">
                  <label className="font-semibold text-muted-foreground">Brand Vibe:</label>
                  <select
                    value={vibe}
                    onChange={(e) => setVibe(e.target.value)}
                    className="w-full bg-background border rounded-lg p-2 text-xs max-w-full min-w-0"
                  >
                    <option value="Modern & Techy">Modern & Techy</option>
                    <option value="Minimalist & Clean">Minimalist & Clean</option>
                    <option value="Fun & Quirky">Fun & Quirky</option>
                    <option value="Luxury & Premium">Luxury & Premium</option>
                  </select>
                </div>
              </div>

              <Button
                onClick={handleGenerateNames}
                disabled={isGenerating || !keywords.trim()}
                className="w-full gap-2 shadow-md rounded-xl font-semibold h-10 justify-center text-xs sm:text-sm mt-2 max-w-full min-w-0"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin shrink-0" />
                    <span>Brainstorming Brands...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 shrink-0" />
                    <span>Generate Startup Names & Domains</span>
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Generated Brand Ideas (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col max-w-full min-w-0">
          <Card className="border border-primary/30 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl flex-1 flex flex-col justify-between overflow-hidden max-w-full min-w-0">
            <CardHeader className="border-b border-border/40 bg-muted/20 p-3 sm:p-4">
              <CardTitle className="text-xs sm:text-sm font-semibold flex items-center gap-2 text-primary tracking-tight truncate min-w-0">
                <Globe className="h-4 w-4 shrink-0" />
                <span>Brandable Startup Name Ideas</span>
              </CardTitle>
            </CardHeader>

            <CardContent className="p-3 sm:p-4 flex-1 flex flex-col justify-between max-w-full min-w-0 overflow-hidden">
              <div className="space-y-3 max-w-full min-w-0 overflow-y-auto max-h-[440px] pr-1">
                {ideas.map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl border bg-muted/20 space-y-2 max-w-full min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <h4 className="font-bold text-sm text-foreground truncate">{item.name}</h4>
                        <Badge variant="outline" className="text-[10px] text-emerald-500 border-emerald-500/30 shrink-0">
                          {item.domain}
                        </Badge>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopy(`${item.name} (${item.domain}) - ${item.tagline}`, item.name)}
                        className="text-[11px] text-primary hover:underline flex items-center gap-1 font-medium shrink-0"
                      >
                        {copiedName === item.name ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                        {copiedName === item.name ? "Copied" : "Copy"}
                      </button>
                    </div>

                    <p className="text-xs font-semibold text-primary/90 leading-tight break-words">&quot;{item.tagline}&quot;</p>
                    <p className="text-xs text-muted-foreground leading-relaxed break-words">{item.elevatorPitch}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
