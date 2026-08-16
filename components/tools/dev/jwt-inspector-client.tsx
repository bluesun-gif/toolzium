"use client";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { AiOutputDisplay } from"@/components/shared/ai-output-display";
import { ClipboardPaste, Clock, Lock, RefreshCw, ScanSearch, ShieldCheck } from"lucide-react";
import toast from"react-hot-toast";

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
    step:"01",
    title:"Paste the Token",
    description:"Drop a JWT into the input field.",
    icon: ClipboardPaste,
  },
{
    step:"02",
    title:"Decode",
    description:"Instantly view header, payload, and signature parts.",
    icon: ScanSearch,
  },
{
    step:"03",
    title:"Verify & Export",
    description:"Check expiry and copy decoded JSON.",
    icon: ShieldCheck,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: ClipboardPaste,
    title:"Paste or Type",
    description:"Accept any JWT string for decoding.",
  },
{
    icon: ScanSearch,
    title:"Three-Part View",
    description:"Separate header, payload, and signature clearly.",
  },
{
    icon: Clock,
    title:"Expiry Check",
    description:"See issued and expiration times at a glance.",
  },
{
    icon: ShieldCheck,
    title:"Local & Private",
    description:"Decoding happens in your browser only.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>JSON Web Tokens are everywhere in modern auth, yet many developers treat them as opaque strings. Understanding their structure makes debugging login flows far easier. A JWT has three parts separated by dots: a header, a payload, and a signature. Each part except the signature is base64url-encoded JSON, which means it is readable by design — encoding is not encryption.</p>
  <p>The header typically declares the algorithm and token type. The payload carries claims such as the subject, issued-at time iat, and expiration exp. Because the payload is plaintext to anyone who decodes it, never place passwords or secret data inside. The signature is what provides integrity: it is computed over the first two parts using a secret (for HS256) or a private key (for RS256), so tampering is detectable.</p>
  <p>Decoding and verifying are different operations. Decoding simply reveals the JSON so you can inspect claims. Verifying recomputes the signature with the correct secret or public key and confirms the token is authentic and unaltered. A token can decode perfectly yet fail verification if its signature is invalid or it has expired.</p>
  <p>An inspector accelerates debugging. When a user reports random logouts, paste their token and check the exp claim — if it is in the past, the session expired as designed. When roles seem wrong, inspect the payload's role claim. Always verify server-side before trusting any claim; client-side decoding is only for visibility.</p>
  <p>Security hygiene matters. Decode tokens locally rather than pasting them into unknown web tools, since tokens grant access. Our inspector runs entirely in your browser, keeping the token on your device while you inspect headers, claims, and expiry with confidence.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"What is a JWT?",
    answer:"A JSON Web Token is a compact, URL-safe token with three base64url parts: header, payload, and signature. It is commonly used for authentication.",
  },
{
    question:"Is decoding a JWT the same as verifying it?",
    answer:"No. Decoding reveals the contents; verifying confirms the signature was produced by a trusted secret or key. Decoding alone proves nothing about authenticity.",
  },
{
    question:"Why can I read the payload if it is signed?",
    answer:"The payload is only base64url-encoded, not encrypted. Anyone can decode it. Keep no secrets in the payload; use signing for integrity.",
  },
{
    question:"What do exp and iat mean?",
    answer:"iat is the issued-at time and exp is the expiration time, both in Unix seconds. After exp the token should be rejected.",
  },
{
    question:"Is my token sent to a server here?",
    answer:"No. This inspector decodes locally in your browser, so the token never leaves your device. Still, avoid pasting highly sensitive production tokens on shared machines.",
  }
  ]}
/>
</div>
 );
}
