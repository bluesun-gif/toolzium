"use client";
<<<<<<< HEAD
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { AiOutputDisplay } from"@/components/shared/ai-output-display";
import { BookOpen, Bug, Code2, PlayCircle, RefreshCw, Regex } from"lucide-react";
import toast from"react-hot-toast";

=======
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
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
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
<<<<<<< HEAD
 {aiExplanation.length > 0 && (
 <AiOutputDisplay
 title="AI Plain-English Regex Breakdown"
 subtitle="Real-time LLM step-by-step regex syntax explanation"
 content={aiExplanation}
 loading={loading}
 onRegenerate={explainRegex}
 variant="prose"
 />
 )}
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Paste Expression",
    description:"Enter a regular expression to analyze.",
    icon: Regex,
  },
{
    step:"02",
    title:"Read Explanation",
    description:"Get a plain-English breakdown of each token.",
    icon: BookOpen,
  },
{
    step:"03",
    title:"Test Matches",
    description:"Try sample strings to confirm behavior.",
    icon: PlayCircle,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Regex,
    title:"Token Breakdown",
    description:"Each part is explained individually.",
  },
{
    icon: BookOpen,
    title:"Plain English",
    description:"Human-readable summary of the whole pattern.",
  },
{
    icon: PlayCircle,
    title:"Live Testing",
    description:"Validate against sample input strings.",
  },
{
    icon: Bug,
    title:"Error Hints",
    description:"Spot unbalanced groups or invalid syntax.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A regex explainer is the debugger for patterns you did not write — or forgot why you wrote. It parses an expression token by token and translates it into plain language, turning a cryptic string like ^(d&#123;3&#125;)-d&#123;4&#125;$ into 'start, three digits, a hyphen, four digits, end.' That translation is invaluable when maintaining legacy validation or reviewing a teammate's code.</p>
  <p>The explainer works by walking the pattern left to right. It identifies anchors, character classes, quantifiers, and groups, then states what each contributes. This reveals mistakes humans miss: a quantifier applied to the wrong element, an unescaped dot that matches too much, or a group that captures when it should not. Seeing the intended behavior spelled out makes the fix obvious.</p>
  <p>Greedy and lazy matching is a frequent source of surprises. A greedy quantifier grabs the longest possible match, which can swallow text you wanted separate. Appending a question mark makes it lazy, matching the shortest stretch instead. An explainer flags this behavior so you can choose deliberately rather than by accident.</p>
  <p>Groups deserve attention. Capturing groups, written with parentheses, isolate substrings for extraction, while non-capturing groups (?:...) keep structure without storage overhead. Named groups improve readability in complex patterns. The explainer lists each group and its purpose, helping you verify the capture layout matches your code.</p>
  <p>Use the tool to validate before deploying. Paste the expression, read the breakdown, then test against representative strings — valid and invalid. Confirm the pattern rejects bad input and accepts good input as intended. A few minutes of explanation prevents regex bugs that otherwise slip into production and quietly mis-parse user data.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"What does a regex explainer do?",
    answer:"It parses a regular expression and describes what each token matches in plain language, helping you understand or debug a pattern.",
  },
{
    question:"Why is my regex not matching?",
    answer:"Common causes are unescaped special characters, wrong quantifier scope, or missing anchors. An explainer highlights how the pattern actually behaves.",
  },
{
    question:"What is a capture group?",
    answer:"Parentheses create a capture group that isolates part of a match so you can extract or reference it later.",
  },
{
    question:"What is greedy vs lazy matching?",
    answer:"By default quantifiers are greedy and match as much as possible. Adding a question mark makes them lazy, matching as little as possible.",
  },
{
    question:"Do I need to escape the dot?",
    answer:"If you mean a literal period, escape it with a backslash. An unescaped dot matches any character, which often causes unexpected matches.",
  }
  ]}
/>
</div>
 );
}
=======
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
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
