"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AiOutputDisplay } from "@/components/shared/ai-output-display";
import { Code2, RefreshCw, Sparkles, Shield, Zap, Copy } from "lucide-react";
import toast from "react-hot-toast";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { ModelSelector } from "@/components/shared/model-selector";
export default function RegexExplainerClient() {
  const [pattern, setPattern] = useState("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$");
  const [model, setModel] = useState("gpt4o");
  const [sampleText, setSampleText] = useState("Contact us at support@toolzium.com or alex@example.org");
  const [aiExplanation, setAiExplanation] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const explainRegex = async () => {
    if (!pattern.trim()) return;
    setLoading(true);
    try {
      const prompt = `Explain this regular expression pattern in plain English step-by-step: '${pattern}'. Describe what each character class, quantifier, anchor, and group matches. Output 4 clear bullet points. No markdown asterisks.`;
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          prompt,
            model,
          type: "prose"
        })
      });
      if (!res.ok) throw new Error("AI API failed");
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        setAiExplanation(data.results);
        toast.success("AI Regex breakdown complete!");
      } else {
        throw new Error("No results");
      }
    } catch (err) {
      toast.error("AI breakdown failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return <div className="relative space-y-6 max-w-4xl mx-auto px-4"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={Code2} title="Regex Tester & AI Natural Language Explainer" description="Test regular expressions against live sample strings and generate plain-English breakdowns of regex syntax with live AI inference." />

 <div className="mb-4">


   <ModelSelector value={model} onChange={setModel} />


 </div>


 <GlassCard className="p-6 space-y-4">
 <div className="space-y-2">
 <label className="text-xs font-bold text-foreground block">Regex Pattern String:</label>
 <Input type="text" value={pattern} onChange={e => setPattern(e.target.value)} placeholder="^[a-zA-Z0-9]+$" className="h-11 font-mono text-sm font-bold text-primary" />
 </div>

 <div className="space-y-2">
 <label className="text-xs font-bold text-foreground block">Test Input Text:</label>
 <textarea value={sampleText} onChange={e => setSampleText(e.target.value)} rows={3} className="w-full p-3 font-mono text-xs bg-background text-foreground rounded-xl border" />
 </div>

 <div className="flex justify-end pt-2">
 <Button onClick={explainRegex} disabled={loading} className="gap-2 font-bold h-11 px-6 shadow-md">
 <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
 {loading ? "AI Explaining..." : "AI Explain Regex Pattern"}
 </Button>
 </div>
 </GlassCard>

 {/* AI Explanation Output */}
 {aiExplanation.length > 0 && <AiOutputDisplay title="AI Plain-English Regex Breakdown" subtitle="Real-time LLM step-by-step regex syntax explanation" content={aiExplanation} loading={loading} onRegenerate={explainRegex} variant="prose" />}
 
      <ToolHowItWorks steps={[{
        step: "01",
        title: "Input Your Data",
        description: "Enter your information in the input field above and configure any options.",
        icon: Sparkles
      }, {
        step: "02",
        title: "Process & Generate",
        description: "The tool processes your input instantly and displays the results.",
        icon: Zap
      }, {
        step: "03",
        title: "Copy & Use",
        description: "Copy the output with one click and use it wherever you need.",
        icon: Copy
      }]} badges={["100% Free", "Instant Results", "Privacy-First"]} />

      <ToolFeatureGuides features={[{
        icon: Sparkles,
        title: "Lightning Fast",
        description: "Get results in milliseconds with our optimized client-side processing engine."
      }, {
        icon: Shield,
        title: "Completely Private",
        description: "All processing happens in your browser. Your data never leaves your device."
      }, {
        icon: Zap,
        title: "No Signup Required",
        description: "Use this tool instantly without creating an account or providing any personal information."
      }]}>
        <div className="prose dark:prose-invert max-w-none">
          <h3>Why Use Our Regex Tester & AI Natural Language Explainer?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Regex Tester & AI Natural Language Explainer provides
            the functionality you need without any complexity or cost.
          </p>
          <p>
            Unlike server-based alternatives, everything runs locally in your browser, ensuring maximum
            privacy and zero latency. No data is ever transmitted to external servers, making it safe
            for sensitive information.
          </p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion faqs={[{
        question: "Is this tool free to use?",
        answer: "Yes, this tool is 100% free with no hidden costs, subscriptions, or usage limits."
      }, {
        question: "Is my data secure?",
        answer: "Absolutely. All processing happens locally in your browser. Your input data never leaves your device or gets sent to any server."
      }, {
        question: "Do I need to create an account?",
        answer: "No account or registration is required. Simply open the tool and start using it immediately."
      }]} />

      <RelatedTools currentToolUrl="/tools/dev/regex-explainer" max={6} />

    </div></div>;
}