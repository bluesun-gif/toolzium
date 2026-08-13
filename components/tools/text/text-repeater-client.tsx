"use client";

import React, { useState } from "react";
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
import { CopyButton } from "@/components/shared/action-buttons";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { Repeat, PenTool, Settings, Copy } from"lucide-react";

export default function TextRepeaterClient() {
  const [text, setText] = useState("");
  const [count, setCount] = useState(10);
  const [separator, setSeparator] = useState("newline");
  const [customSep, setCustomSep] = useState("");
  const [output, setOutput] = useState("");

  const handleGenerate = () => {
    if (!text) {
      toast.error("Please enter some text to repeat.");
      return;
    }
    if (count < 1 || count > 10000) {
      toast.error("Count must be between 1 and 10,000.");
      return;
    }

    let sep = "";
    if (separator === "newline") sep = "\n";
    else if (separator === "space") sep = " ";
    else if (separator === "comma") sep = ", ";
    else if (separator === "custom") sep = customSep;

    const arr = Array(count).fill(text);
    const result = arr.join(sep);
    setOutput(result);
    toast.success(`Generated ${count} repetitions!`);
  };

  return (
    <div className="w-full min-h-screen pb-20 relative">
      <GridPattern />

      <div className="max-w-[1400px] mx-auto p-4 md:p-6 lg:p-8 space-y-8 relative z-10">
        <ToolPageHeader
          icon={Repeat}
          title="Text Repeater & String Multiplier Studio"
          description="Repeat any word, phrase, or paragraph multiple times with custom separators, newlines, and instant copy."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Inputs */}
          <GlassCard className="p-5 flex flex-col bg-background border-border shadow-sm rounded-2xl">
            <div className="border-b border-border pb-3 mb-4">
              <Label className="text-base font-bold text-foreground flex items-center gap-2">
                <PenTool className="w-4 h-4 text-primary" /> Configuration & Text Settings
              </Label>
            </div>

            <div className="space-y-4 flex-1">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-muted-foreground">Text to Repeat</Label>
                <Input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="e.g. Hello World or 🚀 Fire"
                  className="bg-background border-border text-foreground"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-muted-foreground">Repeat Count (1–10,000)</Label>
                  <Input
                    type="number"
                    min={1}
                    max={10000}
                    value={count}
                    onChange={(e) => setCount(parseInt(e.target.value) || 1)}
                    className="bg-background border-border text-foreground font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-muted-foreground">Separator</Label>
                  <select
                    value={separator}
                    onChange={(e) => setSeparator(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background p-2.5 text-xs text-foreground font-medium outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="newline">New Line (\n)</option>
                    <option value="space">Space (" ")</option>
                    <option value="comma">Comma (", ")</option>
                    <option value="custom">Custom Separator</option>
                  </select>
                </div>
              </div>

              {separator === "custom" && (
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-muted-foreground">Custom Separator String</Label>
                  <Input
                    value={customSep}
                    onChange={(e) => setCustomSep(e.target.value)}
                    placeholder="e.g. | or --- or ⭐"
                    className="bg-background border-border text-foreground font-mono"
                  />
                </div>
              )}

              <Button
                onClick={handleGenerate}
                className="w-full gap-2 mt-4 bg-primary hover:bg-primary/90 text-white font-bold shadow-lg shadow-primary/20 rounded-xl h-12 text-base"
              >
                <Repeat className="w-5 h-5" /> Generate Repeated Text
              </Button>
            </div>
          </GlassCard>

          {/* Output */}
          <GlassCard className="p-5 flex flex-col bg-card border-border shadow-sm rounded-2xl min-h-[380px]">
            <div className="flex justify-between items-center border-b border-border pb-3 mb-4">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                <Copy className="w-3.5 h-3.5 text-primary" /> Generated Output ({output.length} chars)
              </span>
              {output && <CopyButton getText={() => output} label="Copy All" />}
            </div>

            <div className="flex-1">
              <textarea
                value={output}
                readOnly
                rows={12}
                placeholder="Click 'Generate Repeated Text' on the left to display output here..."
                className="w-full rounded-xl border border-border bg-muted/30 p-3.5 text-xs font-mono outline-none text-foreground min-h-[280px]"
              />
            </div>
          </GlassCard>
        </div>

        <ToolHowItWorks
          steps={[
            { step: "01", title: "Enter Phrase", description: "Type the word, sentence, or emoji string you want to duplicate.", icon: PenTool },
            { step: "02", title: "Set Parameters", description: "Choose how many times to repeat it and select the separator between instances.", icon: Settings },
            { step: "03", title: "Generate & Copy", description: "Click generate to build the string and copy it to your clipboard instantly.", icon: Copy },
          ]}
          badges={["100% Free", "Up to 10,000 Repeats", "No Signup Required"]}
        />

        <ToolFeatureGuides
          features={[
            { icon: Repeat, title: "High Volume Multiplier", description: "Generates up to 10,000 repetitions instantly without browser lag." },
            { icon: Settings, title: "Custom Separators", description: "Join repeated text with newlines, spaces, commas, or custom characters." },
            { icon: Copy, title: "One-Click Copy", description: "Copy massive generated text blocks straight to your clipboard." },
          ]}
        >
          <div className="prose dark:prose-invert max-w-none mt-6">
            <h3>Why Text Repeaters are Essential Utilities</h3>
            <p>
              Text repeaters allow developers to create dummy text payloads for stress-testing inputs and API parameters. Marketers also use string multipliers to generate formatted social media text.
            </p>
          </div>
        </ToolFeatureGuides>

        <ToolFaqAccordion
          faqs={[
            { question: "Is there a limit to how many times I can repeat text?", answer: "You can generate up to 10,000 repetitions in a single click." },
            { question: "Does this work with emojis?", answer: "Yes! Emojis and multi-line paragraphs repeat seamlessly." },
          ]}
        />

        <RelatedTools currentToolUrl="/tools/text/text-repeater" max={6} />
      </div>
    </div>
  );
}
