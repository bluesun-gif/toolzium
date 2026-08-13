"use client";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Textarea } from"@/components/ui/textarea";
import { AiOutputDisplay } from"@/components/shared/ai-output-display";
import { FileText, RefreshCw, Sparkles, Shield, Zap, Copy } from"lucide-react";
import toast from"react-hot-toast";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

export default function AiSowGeneratorClient() {
 const [projectTitle, setProjectTitle] = useState("E-Commerce Web Platform Overhaul");
 const [clientName, setClientName] = useState("Vanguard Retail Brands");
 const [timeline, setTimeline] = useState("6 Weeks (Phased Delivery)");
 const [scopeDetails, setScopeDetails] = useState("Redesign Next.js storefront UI, integrate Stripe Checkout, optimize mobile performance to sub-1s load times, and configure Postgres database caching.");
 const [results, setResults] = useState<string[]>([]);
 const [loading, setLoading] = useState(false);

 const generateSow = async () => {
 if (!projectTitle.trim() || !scopeDetails.trim()) return;

 setLoading(true);

 try {
 const prompt = `Write a Statement of Work (SOW) document: Project Title: '${projectTitle}', Client: '${clientName}', Timeline: '${timeline}', Scope: '${scopeDetails}'. Break into 4 key section cards: Section 1: Executive Summary & Objective, Section 2: Phase Breakdown & Milestone Deliverables, Section 3: Acceptance Criteria & Out-of-Scope Exclusions, Section 4: Project Assumptions & Review Sign-off. Format as 4 distinct SOW section cards. No markdown asterisks.`;

 const res = await fetch("/api/ai/generate", {
 method:"POST",
 headers: {"Content-Type":"application/json"},
 body: JSON.stringify({ prompt, type:"cards"}),
 });

 if (!res.ok) throw new Error("AI API failed");

 const data = await res.json();
 if (data.results && data.results.length > 0) {
 setResults(data.results);
 toast.success("AI Statement of Work generated!");
 } else {
 throw new Error("No results");
 }
 } catch (err) {
 toast.error("AI generation failed. Please try again.");
 } finally {
 setLoading(false);
 }
 };

 return (
 <div className="space-y-6 max-w-4xl mx-auto px-4">
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray="4 2"
        className="absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
      />

 <ToolPageHeader
 icon={FileText}
 title="AI Statement of Work (SOW) Deliverables Generator"
 description="Generate professional client Statement of Work (SOW) documents with phased milestone deliverables, acceptance criteria, and out-of-scope boundaries using live AI."
 />

 <GlassCard className="p-6 space-y-4">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div className="space-y-2">
 <label className="text-xs font-bold text-foreground block">Project Title:</label>
 <Input
 type="text"
 value={projectTitle}
 onChange={(e) => setProjectTitle(e.target.value)}
 placeholder="e.g. Mobile App Redesign"
 className="h-11 font-medium"
 />
 </div>

 <div className="space-y-2">
 <label className="text-xs font-bold text-foreground block">Client Organization:</label>
 <Input
 type="text"
 value={clientName}
 onChange={(e) => setClientName(e.target.value)}
 placeholder="e.g. Acme Corp"
 className="h-11 font-medium"
 />
 </div>
 </div>

 <div className="space-y-2">
 <label className="text-xs font-bold text-foreground block">Project Scope & Deliverable Notes:</label>
 <Textarea
 value={scopeDetails}
 onChange={(e) => setScopeDetails(e.target.value)}
 placeholder="Outline main technical goals, integrations, features..."
 className="min-h-[110px]"
 />
 </div>

 <div className="space-y-2">
 <label className="text-xs font-bold text-foreground block">Estimated Project Timeline:</label>
 <Input
 type="text"
 value={timeline}
 onChange={(e) => setTimeline(e.target.value)}
 placeholder="e.g. 4 Weeks (Sprint 1 to 4)"
 className="h-11"
 />
 </div>

 <div className="flex justify-end pt-2">
 <Button
 onClick={generateSow}
 disabled={loading || !projectTitle.trim() || !scopeDetails.trim()}
 className="gap-2 font-bold h-11 px-6 shadow-md"
 >
 <RefreshCw className={`h-4 w-4 ${loading ?"animate-spin":""}`} />
 {loading ?"AI Building SOW...":"AI Generate Statement of Work"}
 </Button>
 </div>
 </GlassCard>

 {/* Output */}
 {results.length > 0 && (
 <AiOutputDisplay
 title="Generated Statement of Work (SOW) Document"
 subtitle="Milestone deliverables, acceptance criteria, and out-of-scope boundaries"
 content={results}
 loading={loading}
 onRegenerate={generateSow}
 variant="cards"
 />
 )}
 
      <ToolHowItWorks
        steps={[
          {
            step: "01",
            title: "Input Your Data",
            description: "Enter your information in the input field above and configure any options.",
            icon: Sparkles,
          },
          {
            step: "02",
            title: "Process & Generate",
            description: "The tool processes your input instantly and displays the results.",
            icon: Zap,
          },
          {
            step: "03",
            title: "Copy & Use",
            description: "Copy the output with one click and use it wherever you need.",
            icon: Copy,
          },
        ]}
        badges={["100% Free", "Instant Results", "Privacy-First"]}
      />

      <ToolFeatureGuides
        features={[
          {
            icon: Sparkles,
            title: "Lightning Fast",
            description: "Get results in milliseconds with our optimized client-side processing engine.",
          },
          {
            icon: Shield,
            title: "Completely Private",
            description: "All processing happens in your browser. Your data never leaves your device.",
          },
          {
            icon: Zap,
            title: "No Signup Required",
            description: "Use this tool instantly without creating an account or providing any personal information.",
          },
        ]}
      >
        <div className="prose dark:prose-invert max-w-none">
          <h3>Why Use Our AI Statement of Work (SOW) Deliverables Generator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our AI Statement of Work (SOW) Deliverables Generator provides
            the functionality you need without any complexity or cost.
          </p>
          <p>
            Unlike server-based alternatives, everything runs locally in your browser, ensuring maximum
            privacy and zero latency. No data is ever transmitted to external servers, making it safe
            for sensitive information.
          </p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion
        faqs={[
          {
            question: "Is this tool free to use?",
            answer: "Yes, this tool is 100% free with no hidden costs, subscriptions, or usage limits.",
          },
          {
            question: "Is my data secure?",
            answer: "Absolutely. All processing happens locally in your browser. Your input data never leaves your device or gets sent to any server.",
          },
          {
            question: "Do I need to create an account?",
            answer: "No account or registration is required. Simply open the tool and start using it immediately.",
          },
        ]}
      />

      <RelatedTools currentToolUrl="/tools/office/ai-sow-generator" max={6} />

</div>
 );
}
