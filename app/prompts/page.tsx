"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgrammaticSeoWrapper } from "@/components/seo/programmatic-seo-wrapper";
import { PROMPTS_DATABASE } from "@/lib/data/adapters/prompts-adapter";
import {
  ArrowRight,
  Bot,
  Copy,
  Layers,
  Search,
  Sparkles,
  Star,
  Terminal,
} from "lucide-react";

export default function PromptsHub() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("ALL");

  const categories = ["ALL", "Coding & Dev", "Writing & SEO", "Business & Marketing", "System Prompts", "Midjourney & Art", "Defensive & Logic"];

  const filtered = PROMPTS_DATABASE.filter((p) => {
    const matchesCat = activeCategory === "ALL" || p.category === activeCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const faqs = [
    {
      question: "What is the Toolzium AI Prompt & Template Library?",
      answer: "A curated repository of high-performance system prompts, role templates, and generation parameters engineered for ChatGPT (GPT-4o), Claude 3.5 Sonnet, and Midjourney v6.",
    },
    {
      question: "Can I customize the variables in each prompt template?",
      answer: "Yes! Every prompt detail page includes an interactive variable injector where you can fill in your specific programming language, topic, or image parameters and copy the ready-to-run prompt with 1 click.",
    },
    {
      question: "Are these prompt templates free for commercial projects?",
      answer: "Yes. All prompts in the public directory are released under permissive open access for developers, creators, marketers, and researchers.",
    },
    {
      question: "How do I submit or upvote new prompts?",
      answer: "Use the interactive upvote widgets on each prompt page. High-performing community prompts get featured on the main directory.",
    },
  ];

  const guideSections = [
    {
      heading: "Mastering Modern LLM Prompt Engineering & System Prompts",
      body: "Effective prompt architecture leverages role prompting, chain-of-thought (CoT) decomposition, negative constraints, and few-shot examples to eliminate hallucinations and extract deterministic, high-quality responses from modern frontier models.",
    },
    {
      heading: "Model-Specific Optimization (Claude vs GPT-4o vs Midjourney)",
      body: "Claude excels with structured XML tags (<instructions>, <context>) and nuanced analytical reasoning. GPT-4o delivers rapid code execution and function calling. Midjourney v6 prioritizes technical camera parameters (lens focal length, ISO, lighting style).",
    },
    {
      heading: "Variable Injection & Workflow Automation",
      body: "Standardizing your organizational prompts with template variables ({{topic}}, {{code}}) allows engineering teams to integrate LLM pipelines seamlessly into CI/CD and automated customer support workflows.",
    },
    {
      heading: "Defensive Prompting & Hallucination Mitigation",
      body: "Always instruct models to state 'I do not have sufficient information' when sources are ambiguous, rather than fabricating plausible-sounding technical documentation.",
    },
  ];

  return (
    <ProgrammaticSeoWrapper
      title="Free AI Prompts & System Templates Library"
      subtitle="Curated, battle-tested prompt templates and system directives for ChatGPT, Claude 3.5 Sonnet, and Midjourney v6 with interactive variable injection."
      categoryName="AI Tools & Prompts"
      categoryUrl="/prompts"
      canonicalPath="/prompts"
      faqs={faqs}
      guideSections={guideSections}
      countryCode="US"
      vpnContext="general"
      relatedSearches={[
        { label: "Code Reviewer Prompt", url: "/prompts/senior-architect-code-review" },
        { label: "SEO Pillar Architect", url: "/prompts/seo-pillar-cluster-architect" },
        { label: "Midjourney 8K Cinematic", url: "/prompts/midjourney-photorealistic-cinematic-portrait" },
        { label: "Socratic Logic Adversary", url: "/prompts/socratic-logic-adversary" },
      ]}
    >
      <div className="space-y-6">
        <Card className="rounded-3xl border-2 border-primary/20 bg-gradient-to-b from-card to-background shadow-xl overflow-hidden">
          <CardContent className="p-6 sm:p-10 space-y-6">
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <Badge className="rounded-full bg-primary/10 text-primary border-primary/20 px-3 py-1 text-xs font-bold">
                <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                Curated AI System Prompts
              </Badge>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                AI Prompt & Template Library
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Discover tested prompts for coding, SEO architecture, Midjourney art, and adversarial logic testing.
              </p>
            </div>

            <div className="max-w-xl mx-auto space-y-3">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search prompts by keyword or tag..."
                  className="w-full rounded-2xl border-2 border-primary/25 bg-card pl-10 pr-4 py-2.5 text-sm sm:text-base focus-visible:ring-primary/20 shadow-md"
                />
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-1.5 flex-wrap justify-center text-xs">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-colors ${
                      activeCategory === cat
                        ? "bg-primary text-primary-foreground shadow-xs"
                        : "bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Prompts Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {filtered.map((prompt) => (
            <Card
              key={prompt.slug}
              className="group rounded-3xl border border-border/70 bg-card hover:border-primary/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              <CardHeader className="p-6 pb-3 space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-[10px] font-bold rounded-full">
                    {prompt.category}
                  </Badge>
                  <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px] font-bold rounded-full">
                    {prompt.modelTarget}
                  </Badge>
                </div>

                <CardTitle className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                  {prompt.title}
                </CardTitle>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {prompt.description}
                </p>
              </CardHeader>

              <CardContent className="p-6 pt-0 space-y-4">
                <div className="flex flex-wrap gap-1 pt-2">
                  {prompt.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-medium bg-muted/60 text-muted-foreground px-2 py-0.5 rounded-md"
                    >
                      #{t}
                    </span>
                  ))}
                </div>

                <Button asChild className="w-full rounded-xl font-bold gap-2 text-xs h-10">
                  <Link href={`/prompts/${prompt.slug}`}>
                    <span>Use & Customize Prompt Template</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ProgrammaticSeoWrapper>
  );
}
