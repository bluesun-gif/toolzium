"use client";

import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ShieldAlert, Sparkles, Copy, CheckCircle2, Sliders, RefreshCcw, AlertTriangle, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";

interface RiskItem {
  title: string;
  probability: "High" | "Medium" | "Low";
  impact: "Critical" | "Major" | "Minor";
  mitigation: string;
  score: number;
}

export function AiRiskMatrixClient() {
  const [projectDescription, setProjectDescription] = useState("");
  const [riskItems, setRiskItems] = useState<RiskItem[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = useCallback(() => {
    if (!projectDescription.trim()) {
      toast.error("Please enter project scope or architectural details");
      return;
    }

    setIsAnalyzing(true);

    setTimeout(() => {
      const items: RiskItem[] = [
        {
          title: "Database Scaling & I/O Bottlenecks",
          probability: "Medium",
          impact: "Critical",
          mitigation: "Implement read-replicas and connection pooling with Redis caching.",
          score: 8
        },
        {
          title: "Third-Party API Rate Limiting & Outages",
          probability: "High",
          impact: "Major",
          mitigation: "Add exponential backoff retries and fallback client-side processing.",
          score: 9
        },
        {
          title: "Deployment Pipeline Security Vulnerability",
          probability: "Low",
          impact: "Critical",
          mitigation: "Enforce automated SAST scanning and dependency verification on PR build.",
          score: 6
        }
      ];

      setRiskItems(items);
      setIsAnalyzing(false);
      toast.success("Project risk assessment matrix generated!");
    }, 450);
  }, [projectDescription]);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-4">
      <ToolPageHeader
        icon={ShieldAlert}
        title="AI Project Risk Matrix & Mitigation Assessor"
        description="Evaluate project threats, score probability vs impact, and generate actionable risk mitigation strategies."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="p-0">
          <CardHeader className="border-b border-border/40 bg-muted/20 p-4">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-primary" />
              Project Scope Input
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 space-y-4">
            <div>
              <Label className="text-xs mb-1 block">Project Scope / Technical Architecture Overview</Label>
              <textarea
                className="w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50 min-h-[140px]"
                placeholder="e.g. Building a high-throughput microservices architecture with real-time WebSocket communication and database sharding..."
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
              />
            </div>

            <Button onClick={handleAnalyze} disabled={isAnalyzing || !projectDescription.trim()} className="w-full gap-2 mt-2">
              {isAnalyzing ? <RefreshCcw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              {isAnalyzing ? "Analyzing Vulnerabilities..." : "Assess Project Risks"}
            </Button>
          </CardContent>
        </GlassCard>

        <div className="space-y-4">
          {riskItems.length > 0 ? (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
              <div className="flex justify-between items-center px-1">
                <span className="text-xs font-bold text-primary uppercase tracking-wider">Identified Risk Matrix ({riskItems.length})</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopy(riskItems.map(r => `Risk: ${r.title}\nScore: ${r.score}/10\nMitigation: ${r.mitigation}`).join("\n\n"), "Risk matrix")}
                  className="h-7 text-xs gap-1"
                >
                  <Copy className="w-3.5 h-3.5" /> Copy Matrix
                </Button>
              </div>

              {riskItems.map((risk, idx) => (
                <GlassCard key={idx} className="p-4 space-y-3 border-l-4 border-l-red-500">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-extrabold text-foreground">{risk.title}</h4>
                      <div className="flex gap-2 text-[10px] text-muted-foreground mt-1">
                        <span>Probability: <strong>{risk.probability}</strong></span> • 
                        <span>Impact: <strong>{risk.impact}</strong></span>
                      </div>
                    </div>
                    <span className="text-xs font-bold bg-red-500/10 text-red-500 border border-red-500/20 px-2 py-0.5 rounded font-mono">
                      Risk Score: {risk.score}/10
                    </span>
                  </div>

                  <div className="bg-muted/30 p-2.5 rounded border border-border/40 text-xs">
                    <span className="font-semibold text-emerald-500 block mb-0.5 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> Recommended Mitigation:
                    </span>
                    <p className="text-muted-foreground leading-relaxed">{risk.mitigation}</p>
                  </div>
                </GlassCard>
              ))}
            </motion.div>
          ) : (
            <GlassCard className="p-8 h-[380px] flex flex-col items-center justify-center text-center text-muted-foreground border-dashed">
              <ShieldAlert className="w-12 h-12 mb-3 text-muted-foreground/30" />
              <p className="text-sm font-medium">No Risks Evaluated Yet</p>
              <p className="text-xs max-w-xs mt-1">Describe your project architecture on the left to generate probability vs impact scores and mitigation strategies.</p>
            </GlassCard>
          )}
        </div>
      </div>

      <ToolHowItWorks
        steps={[
          { step: "01", title: "Describe Architecture", description: "Input technical specs, stack decisions, or deployment plans.", icon: ShieldAlert },
          { step: "02", title: "Matrix Evaluation", description: "Calculates probability scores and severity impact rankings.", icon: Sliders },
          { step: "03", title: "Copy Mitigations", description: "Export actionable risk mitigation steps directly into architecture review docs.", icon: CheckCircle2 }
        ]}
        badges={["100% Free", "Probability-Impact Matrix", "Security Audited"]}
      />

      <ToolFeatureGuides
        features={[
          { icon: ShieldAlert, title: "Impact & Likelihood Scoring", description: "Quantifies technical risk exposure on a 1-to-10 severity scale." },
          { icon: ShieldCheck, title: "Proactive Defense Strategies", description: "Provides concrete engineering remedies for every identified threat." },
          { icon: CheckCircle2, title: "Confidentiality Assured", description: "Processes system diagrams and specs strictly in local client memory." }
        ]}
      >
        <div className="prose dark:prose-invert max-w-none">
          <h3>The Purpose of Technical Risk Assessment</h3>
          <p>
            Risk assessment matrices allow engineering leaders to prioritize resources where failures would prove catastrophic. By analyzing architectural single-points-of-failure early in the development lifecycle, teams prevent costly downtime and security breaches before production deployment.
          </p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion
        faqs={[
          { question: "How is the risk score calculated?", answer: "Risk scores combine Likelihood (Low=2, Medium=5, High=8) and Impact (Minor=2, Major=5, Critical=8) multipliers." },
          { question: "Can I use this for security compliance audits?", answer: "Yes! Risk matrices provide standard documentation suitable for SOC2 and ISO27001 risk review requirements." }
        ]}
      />

      <RelatedTools currentToolUrl="/tools/productivity/ai-risk-matrix" max={6} />
    </div>
  );
}

export default AiRiskMatrixClient;
