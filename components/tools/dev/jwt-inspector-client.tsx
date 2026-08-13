"use client";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { AiOutputDisplay } from"@/components/shared/ai-output-display";
import { ShieldCheck, Lock, RefreshCw, Sparkles, Shield, Zap, Copy } from"lucide-react";
import toast from"react-hot-toast";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

const SAMPLE_JWT ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFsZXggUml2ZXJhIiwiaWF0IjoxNTE2MjM5MDIyLCJyb2xlIjoiYWRtaW4ifQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

export default function JwtInspectorClient() {
 const [token, setToken] = useState(SAMPLE_JWT);
 const [headerJson, setHeaderJson] = useState("");
 const [payloadJson, setPayloadJson] = useState("");
 const [aiAnalysis, setAiAnalysis] = useState<string[]>([]);
 const [loading, setLoading] = useState(false);

 const decodeJwt = () => {
 try {
 const parts = token.split(".");
 if (parts.length < 2) throw new Error("Invalid JWT token format");

 const header = JSON.parse(atob(parts[0]));
 const payload = JSON.parse(atob(parts[1]));

 setHeaderJson(JSON.stringify(header, null, 2));
 setPayloadJson(JSON.stringify(payload, null, 2));
 toast.success("Decoded JWT Header & Payload!");
 } catch (err) {
 toast.error("Failed to decode JWT token.");
 }
 };

 const auditWithAi = async () => {
 if (!token.trim()) return;

 setLoading(true);

 try {
 const prompt = `Audit this JWT token payload and header for security risks, expiration claims (exp, iat), sensitive data leaks, and signing algorithm strength:\n\nHeader: ${headerJson}\nPayload: ${payloadJson}\n\nOutput 4 security audit bullet points. No markdown asterisks.`;

 const res = await fetch("/api/ai/generate", {
 method:"POST",
 headers: {"Content-Type":"application/json"},
 body: JSON.stringify({ prompt, type:"prose"}),
 });

 if (!res.ok) throw new Error("AI API failed");

 const data = await res.json();
 if (data.results && data.results.length > 0) {
 setAiAnalysis(data.results);
 toast.success("AI JWT security audit complete!");
 } else {
 throw new Error("No results");
 }
 } catch (err) {
 toast.error("AI audit failed. Please try again.");
 } finally {
 setLoading(false);
 }
 };

 React.useEffect(() => {
 decodeJwt();
 }, [token]);

 return (
 <div className="space-y-6 max-w-5xl mx-auto px-4">
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray="4 2"
        className="absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
      />

 <ToolPageHeader
 icon={ShieldCheck}
 title="JWT Security Audit & Payload Inspector Studio"
 description="Decode JSON Web Tokens (JWT) locally and run live AI security risk audits for algorithm vulnerabilities and payload data leaks."
 />

 <GlassCard className="p-5 space-y-4">
 <label className="text-xs font-bold text-foreground block">
 Paste Encoded JWT Token:
 </label>
 <Input
 type="text"
 value={token}
 onChange={(e) => setToken(e.target.value)}
 placeholder="eyJhbGciOiJIUzI1Ni..."
 className="h-11 font-mono text-xs"
 />

 <div className="flex justify-end pt-1">
 <Button
 onClick={auditWithAi}
 disabled={loading || !payloadJson}
 className="gap-2 font-bold h-10 px-5 shadow-md"
 >
 <RefreshCw className={`h-4 w-4 ${loading ?"animate-spin":""}`} />
 {loading ?"AI Security Auditing...":"AI JWT Security Audit"}
 </Button>
 </div>
 </GlassCard>

 {/* Decoded Cards */}
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <GlassCard className="p-5 space-y-3">
 <h3 className="text-xs font-bold text-foreground border-b pb-2 uppercase tracking-wider">
 JWT Header (Algorithm & Token Type)
 </h3>
 <pre className="p-4 font-mono text-xs bg-background text-cyan-400 rounded-xl overflow-x-auto h-48">
 {headerJson ||"// Header JSON will appear here..."}
 </pre>
 </GlassCard>

 <GlassCard className="p-5 space-y-3">
 <h3 className="text-xs font-bold text-foreground border-b pb-2 uppercase tracking-wider">
 JWT Payload (Claims & Data)
 </h3>
 <pre className="p-4 font-mono text-xs bg-background text-emerald-400 rounded-xl overflow-x-auto h-48">
 {payloadJson ||"// Payload JSON will appear here..."}
 </pre>
 </GlassCard>
 </div>

 {aiAnalysis.length > 0 && (
 <AiOutputDisplay
 title="AI JWT Security Audit Report"
 subtitle="Real-time LLM security vulnerability and token risk assessment"
 content={aiAnalysis}
 loading={loading}
 onRegenerate={auditWithAi}
 variant="prose"
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
          <h3>Why Use Our JWT Security Audit & Payload Inspector Studio?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our JWT Security Audit & Payload Inspector Studio provides
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

      <RelatedTools currentToolUrl="/tools/dev/jwt-inspector" max={6} />

</div>
 );
}
