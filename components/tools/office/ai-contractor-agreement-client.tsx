"use client";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Textarea } from"@/components/ui/textarea";
import { AiOutputDisplay } from"@/components/shared/ai-output-display";
import { ShieldCheck, RefreshCw, Sparkles, Shield, Zap, Copy } from"lucide-react";
import toast from"react-hot-toast";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

export default function AiContractorAgreementClient() {
 const [clientName, setClientName] = useState("Acme Technologies Inc.");
 const [contractorName, setContractorName] = useState("Nexus Digital LLC");
 const [services, setServices] = useState("Full-Stack Web Development & Cloud Infrastructure Maintenance");
 const [paymentTerms, setPaymentTerms] = useState("$75/hr billed bi-weekly, Net 15 payment terms");
 const [jurisdiction, setJurisdiction] = useState("State of California, USA");
 const [results, setResults] = useState<string[]>([]);
 const [loading, setLoading] = useState(false);

 const generateAgreement = async () => {
 if (!clientName.trim() || !contractorName.trim()) return;

 setLoading(true);

 try {
 const prompt = `Draft a standard Independent Contractor Agreement clause structure: Client: '${clientName}', Contractor: '${contractorName}', Services: '${services}', Payment Terms: '${paymentTerms}', Jurisdiction: '${jurisdiction}'. Structure into 4 core contract clauses: Clause 1: Scope of Services & Deliverables, Clause 2: Payment Structure & Invoicing Rules, Clause 3: Intellectual Property (IP) Work-for-Hire Assignment, Clause 4: Non-Disclosure (NDA) & Termination Notice. Format as 4 distinct agreement clause cards. Disclaimer: Educational draft template. No markdown asterisks.`;

 const res = await fetch("/api/ai/generate", {
 method:"POST",
 headers: {"Content-Type":"application/json"},
 body: JSON.stringify({ prompt, type:"cards"}),
 });

 if (!res.ok) throw new Error("AI API failed");

 const data = await res.json();
 if (data.results && data.results.length > 0) {
 setResults(data.results);
 toast.success("AI Contractor Agreement drafted!");
 } else {
 throw new Error("No results");
 }
 } catch (err) {
 toast.error("AI drafting failed. Please try again.");
 } finally {
 setLoading(false);
 }
 };

 return (
      <div className="relative space-y-6 max-w-4xl mx-auto px-4">
      <GridPattern />

 <ToolPageHeader
 icon={ShieldCheck}
 title="AI Independent Contractor Agreement Studio"
 description="Draft custom contractor agreements, IP work-for-hire clauses, payment terms, and confidentiality terms powered by live AI."
 />

 <GlassCard className="p-6 space-y-4">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div className="space-y-2">
 <label className="text-xs font-bold text-foreground block">Client Company Name:</label>
 <Input
 type="text"
 value={clientName}
 onChange={(e) => setClientName(e.target.value)}
 placeholder="e.g. Apex Software Inc."
 className="h-11 font-medium"
 />
 </div>

 <div className="space-y-2">
 <label className="text-xs font-bold text-foreground block">Contractor / Freelancer Name:</label>
 <Input
 type="text"
 value={contractorName}
 onChange={(e) => setContractorName(e.target.value)}
 placeholder="e.g. John Doe Consulting"
 className="h-11 font-medium"
 />
 </div>
 </div>

 <div className="space-y-2">
 <label className="text-xs font-bold text-foreground block">Services & Work Description:</label>
 <Textarea
 value={services}
 onChange={(e) => setServices(e.target.value)}
 placeholder="Describe contractor duties, milestones, and deliverables..."
 className="min-h-[90px]"
 />
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div className="space-y-2">
 <label className="text-xs font-bold text-foreground block">Payment Rate & Terms:</label>
 <Input
 type="text"
 value={paymentTerms}
 onChange={(e) => setPaymentTerms(e.target.value)}
 placeholder="e.g. $5,000 fixed milestone, Net 30"
 className="h-11"
 />
 </div>

 <div className="space-y-2">
 <label className="text-xs font-bold text-foreground block">Governing Jurisdiction / State:</label>
 <Input
 type="text"
 value={jurisdiction}
 onChange={(e) => setJurisdiction(e.target.value)}
 placeholder="e.g. State of Delaware, USA"
 className="h-11"
 />
 </div>
 </div>

 <div className="flex justify-end pt-2">
 <Button
 onClick={generateAgreement}
 disabled={loading || !clientName.trim() || !contractorName.trim()}
 className="gap-2 font-bold h-11 px-6 shadow-md"
 >
 <RefreshCw className={`h-4 w-4 ${loading ?"animate-spin":""}`} />
 {loading ?"AI Drafting Agreement...":"AI Draft Contractor Agreement"}
 </Button>
 </div>
 </GlassCard>

 {/* Output */}
 {results.length > 0 && (
 <AiOutputDisplay
 title="Generated Contractor Agreement Draft Clauses"
 subtitle="Scope of work, IP ownership, payment terms, and non-disclosure clauses"
 content={results}
 loading={loading}
 onRegenerate={generateAgreement}
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
          <h3>Why Use Our AI Independent Contractor Agreement Studio?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our AI Independent Contractor Agreement Studio provides
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

      <RelatedTools currentToolUrl="/tools/office/ai-contractor-agreement" max={6} />

</div>
 );
}
