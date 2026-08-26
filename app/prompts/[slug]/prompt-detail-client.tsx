"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VoteButtons } from "@/components/shared/vote-buttons";
import {
  ArrowLeft,
  CheckCircle2,
  Copy,
  Layers,
  Sparkles,
  Terminal,
} from "lucide-react";
import type { PromptTemplateItem } from "@/lib/data/adapters/prompts-adapter";

interface PromptDetailClientProps {
  prompt: PromptTemplateItem;
}

export default function PromptDetailClient({ prompt }: PromptDetailClientProps) {
  // Initialize state with default variable values
  const [variables, setVariables] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    prompt.variables.forEach((v) => {
      initial[v.name] = v.defaultValue || "";
    });
    return initial;
  });

  const [copied, setCopied] = useState(false);

  // Compute interpolated prompt text
  let renderedPrompt = prompt.promptText;
  Object.entries(variables).forEach(([key, val]) => {
    renderedPrompt = renderedPrompt.split(`{{${key}}}`).join(val || `[${key}]`);
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(renderedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <Card className="rounded-3xl border-2 border-primary/30 bg-card/90 backdrop-blur-md shadow-2xl overflow-hidden">
        <CardHeader className="bg-muted/30 border-b border-border/60 pb-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2.5 flex-wrap">
                <CardTitle className="text-xl sm:text-2xl font-black text-foreground">
                  {prompt.title}
                </CardTitle>
                <Badge className="bg-primary/10 text-primary border-primary/20 text-xs font-bold rounded-full">
                  {prompt.modelTarget}
                </Badge>
                <Badge variant="outline" className="text-xs font-semibold rounded-full">
                  {prompt.category}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {prompt.description}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <VoteButtons
                itemId={`prompt:${prompt.slug}`}
                initialScore={prompt.initialScore}
              />
              <Button asChild variant="outline" size="sm" className="rounded-xl text-xs font-semibold">
                <Link href="/prompts">
                  <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
                  All Prompts
                </Link>
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 sm:p-8 space-y-6">
          {/* Variables Configuration Box */}
          {prompt.variables.length > 0 && (
            <div className="p-5 rounded-2xl bg-muted/40 border border-border/60 space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">
                  Step 1: Customize Prompt Variables
                </h3>
              </div>

              <div className="grid gap-3.5 sm:grid-cols-2">
                {prompt.variables.map((v) => (
                  <div key={v.name} className="space-y-1.5">
                    <label className="text-xs font-semibold text-foreground">
                      {v.label}
                    </label>
                    {v.name === "code" || v.name === "thesis" ? (
                      <Textarea
                        value={variables[v.name] || ""}
                        onChange={(e) =>
                          setVariables((prev) => ({ ...prev, [v.name]: e.target.value }))
                        }
                        placeholder={v.placeholder}
                        className="rounded-xl text-xs font-mono min-h-[80px]"
                      />
                    ) : (
                      <Input
                        type="text"
                        value={variables[v.name] || ""}
                        onChange={(e) =>
                          setVariables((prev) => ({ ...prev, [v.name]: e.target.value }))
                        }
                        placeholder={v.placeholder}
                        className="rounded-xl text-xs font-medium h-10"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Rendered Prompt Output */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-primary" />
                <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">
                  Step 2: Generated Prompt Output
                </h3>
              </div>
              <Button
                onClick={handleCopy}
                size="sm"
                className="rounded-xl font-bold gap-1.5 text-xs h-9"
              >
                {copied ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? "Copied to Clipboard!" : "Copy Custom Prompt"}</span>
              </Button>
            </div>

            <div className="relative rounded-2xl border border-border/80 bg-zinc-950 p-4 sm:p-6 text-zinc-100 font-mono text-xs leading-relaxed overflow-x-auto whitespace-pre-wrap selection:bg-primary/30">
              {renderedPrompt}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
