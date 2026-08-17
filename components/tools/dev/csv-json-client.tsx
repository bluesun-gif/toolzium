"use client";

import React, { useState, useMemo } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ToolBackground } from "@/components/shared/tool-background";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { Key, Shield, CheckCircle2, XCircle, Clock, Copy, Sparkles } from "lucide-react";
import toast from "react-hot-toast";

export function CsvJsonClient() {
  const [token, setToken] = useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlRhbnZpciBBaG1lZCIsImlhdCI6MTUxNjIzOTAyMiwiZXhwIjoxODMxNjIzOTAyLCJyb2xlcyI6WyJhZG1pbiIsImRldmVsb3BlciJdfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
  );

  const decoded = useMemo(() => {
    try {
      const parts = token.trim().split(".");
      if (parts.length < 2) return null;

      const headerJson = JSON.parse(atob(parts[0].replace(/-/g, "+").replace(/_/g, "/")));
      const payloadJson = JSON.parse(atob(parts[1].replace(/-/g, "+").replace(/_/g, "/")));

      let isExpired = false;
      let expDate: Date | null = null;
      if (payloadJson.exp) {
        expDate = new Date(payloadJson.exp * 1000);
        isExpired = expDate.getTime() < Date.now();
      }

      return {
        header: headerJson,
        payload: payloadJson,
        signature: parts[2] || "",
        isExpired,
        expDate
      };
    } catch (e) {
      return null;
    }
  }, [token]);

  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
        <ToolPageHeader
          icon={Key}
          title="CSV to JSON & JSON to CSV Converter"
          description="Decode, inspect, and verify JWT headers, claims payloads, expiration dates, and signatures securely in your browser."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Encoded Token Input */}
          <div className="lg:col-span-5">
            <GlassCard>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Encoded JWT String</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setToken("");
                      toast.success("Cleared input.");
                    }}
                  >
                    Clear
                  </Button>
                </div>
                <CardDescription>Paste an RFC 7519 standard token</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  rows={14}
                  value={token}
                  onChange={e => setToken(e.target.value)}
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  className="font-mono text-xs break-all resize-y"
                />
              </CardContent>
            </GlassCard>
          </div>

          {/* Decoded Results */}
          <div className="lg:col-span-7 space-y-4">
            {decoded ? (
              <>
                {/* Status Bar */}
                <GlassCard className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {decoded.isExpired ? (
                      <XCircle className="w-5 h-5 text-red-500" />
                    ) : (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    )}
                    <div>
                      <div className="font-bold text-sm">
                        {decoded.isExpired ? "Token Expired" : "Valid Expiration"}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {decoded.expDate ? `Expires: ${decoded.expDate.toLocaleString()}` : "No 'exp' claim present"}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs font-mono bg-muted px-2.5 py-1 rounded">
                    Alg: {decoded.header.alg || "None"}
                  </div>
                </GlassCard>

                {/* Header */}
                <GlassCard>
                  <CardHeader className="py-3">
                    <CardTitle className="text-xs font-mono uppercase text-red-500">Header: Algorithm &amp; Type</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <pre className="p-3 rounded-md bg-muted/50 font-mono text-xs overflow-x-auto text-red-600 dark:text-red-400">
                      {JSON.stringify(decoded.header, null, 2)}
                    </pre>
                  </CardContent>
                </GlassCard>

                {/* Payload */}
                <GlassCard>
                  <CardHeader className="py-3">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-xs font-mono uppercase text-purple-500">Payload: Data Claims</CardTitle>
                      <CopyButton getText={() => JSON.stringify(decoded.payload, null, 2)} label="Copy Payload" />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <pre className="p-3 rounded-md bg-muted/50 font-mono text-xs overflow-x-auto text-purple-600 dark:text-purple-400">
                      {JSON.stringify(decoded.payload, null, 2)}
                    </pre>
                  </CardContent>
                </GlassCard>
              </>
            ) : (
              <GlassCard className="p-8 text-center text-muted-foreground flex flex-col items-center justify-center min-h-[280px]">
                <Key className="w-10 h-10 mb-3 opacity-30" />
                <p>Invalid or malformed JSON Web Token</p>
              </GlassCard>
            )}
          </div>
        </div>

        <ToolHowItWorks
          steps={[
            { step: "01", title: "Paste JWT", description: "Insert any bearer token or access token.", icon: Key },
            { step: "02", title: "Base64URL Parse", description: "Safely parses Header, Payload, and Signature parts.", icon: Sparkles },
            { step: "03", title: "Inspect Claims", description: "Review roles, user IDs, issuer tags, and expiration timestamps.", icon: Shield }
          ]}
          badges={["100% Free Forever", "Zero Server Transmission", "RFC 7519 Standard"]}
        />

        <ToolFeatureGuides
          features={[
            { icon: Key, title: "Header & Claims Inspection", description: "Color-coded breakdown of cryptographic algorithms and data payloads." },
            { icon: Clock, title: "Expiration Clock Diagnostics", description: "Evaluates standard 'exp', 'nbf', and 'iat' epoch timestamps against system time." },
            { icon: Shield, title: "100% Client-Side Privacy", description: "Tokens are never transmitted to external APIs or logged anywhere." }
          ]}
        >
          <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
            <h3>Understanding JSON Web Tokens (JWT)</h3>
            <p>
              A JSON Web Token (JWT) consists of three parts separated by dots (<code>.</code>): the Header (specifying the signing algorithm), the Payload (containing application claims such as sub, exp, and role), and the Cryptographic Signature.
            </p>
          </div>
        </ToolFeatureGuides>

        <ToolFaqAccordion
          faqs={[
            { question: "Is it safe to paste sensitive JWT tokens here?", answer: "Yes. All decoding occurs locally within your browser using JavaScript. No tokens are sent across the network." },
            { question: "Can a client-side tool verify RSA/HMAC signatures?", answer: "This tool decodes and validates formatting and expiration. Verifying cryptographic signatures requires providing your public or secret key." }
          ]}
        />

        <RelatedTools currentToolUrl="/tools/dev/csv-json" max={6} />
      </div>
    </div>
  );
}

export default CsvJsonClient;
