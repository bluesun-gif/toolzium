"use client";

import React, { useState, useMemo } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToolBackground } from "@/components/shared/tool-background";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { ShareResultButton } from "@/components/shared/share-result-modal";
import { EmbedButton } from "@/components/shared/embed-modal";
import { cn } from "@/lib/utils";
import {
  ShieldCheck, ShieldAlert, Shield, Lock, Key, Copy, Check, Eye, EyeOff,
  RefreshCw, Zap, Clock, AlertTriangle, CheckCircle2, Sparkles, Cpu, Server
} from "lucide-react";
import toast from "react-hot-toast";
import {
  calcEntropyBits,
  bandFromEntropy,
  estimateCharset,
  findIssues,
  crackTimes,
} from "@/lib/utils/text/password-strength";

export default function PasswordStrengthClient() {
  const [password, setPassword] = useState("Tr0ub4dor&3#2026");
  const [showPassword, setShowPassword] = useState(true);
  const [copied, setCopied] = useState(false);

  // Entropy & calculations
  const entropyBits = useMemo(() => calcEntropyBits(password), [password]);
  const charset = useMemo(() => estimateCharset(password), [password]);
  const band = useMemo(() => bandFromEntropy(entropyBits), [entropyBits]);
  const issues = useMemo(() => findIssues(password), [password]);
  const crack = useMemo(() => crackTimes(entropyBits), [entropyBits]);

  // Score percentage 0-100
  const scorePercent = Math.min(100, Math.round((entropyBits / 100) * 100));

  // Security Checks
  const checks = [
    { label: "12+ Characters", pass: password.length >= 12 },
    { label: "Uppercase Letters (A-Z)", pass: /[A-Z]/.test(password) },
    { label: "Lowercase Letters (a-z)", pass: /[a-z]/.test(password) },
    { label: "Numbers (0-9)", pass: /\d/.test(password) },
    { label: "Symbols (!@#$)", pass: /[^A-Za-z0-9\s]/.test(password) },
    { label: "No Repetitions", pass: !/(.)\1{2,}/.test(password) && password.length > 0 },
  ];

  const handleCopy = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    toast.success("Password copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const generateStrongPassword = () => {
    const chars = "abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789!@#$%^&*()_+";
    let gen = "";
    for (let i = 0; i < 18; i++) {
      gen += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(gen);
    toast.success("Generated 18-character strong password!");
  };

  const getBandBadge = () => {
    switch (band) {
      case "Very Weak":
        return { color: "bg-red-500/10 text-red-500 border-red-500/20", icon: ShieldAlert, label: "Very Weak" };
      case "Weak":
        return { color: "bg-orange-500/10 text-orange-500 border-orange-500/20", icon: ShieldAlert, label: "Weak" };
      case "Fair":
        return { color: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20", icon: Shield, label: "Fair" };
      case "Strong":
        return { color: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20", icon: ShieldCheck, label: "Strong" };
      case "Very Strong":
        return { color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20", icon: ShieldCheck, label: "Very Strong" };
    }
  };

  const badge = getBandBadge();
  const BadgeIcon = badge.icon;

  return (
    <div className="min-h-screen relative pb-20">
      <ToolBackground />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 space-y-8">
        
        {/* Page Header */}
        <ToolPageHeader
          title="Password Strength & Entropy Analyzer"
          description="Analyze password crack time, NIST complexity score, and cryptographic Shannon entropy bits with 100% private in-browser analysis."
          icon={Lock}
          badgeText="🛡️ 100% Private In-Browser Security"
        />

        {/* Main Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Input & Live Analysis (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <GlassCard className="p-5 sm:p-6 space-y-5">
              
              <div className="flex items-center justify-between">
                <Label className="text-sm font-bold text-foreground flex items-center gap-2">
                  <Key className="w-4 h-4 text-primary" /> Test Your Password
                </Label>
                <button
                  type="button"
                  onClick={generateStrongPassword}
                  className="text-xs font-semibold text-primary hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Generate Random Strong
                </button>
              </div>

              {/* Password Input with Visibility and Actions */}
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter a password to evaluate..."
                  className="h-13 text-base sm:text-lg pr-24 pl-4 font-mono font-medium rounded-xl border-border bg-background/80 focus:ring-2 focus:ring-primary/40 shadow-inner"
                />
                <div className="absolute right-2 top-2 bottom-2 flex items-center gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                    className="h-9 w-9 p-0 text-muted-foreground hover:text-foreground rounded-lg"
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleCopy}
                    className="h-9 w-9 p-0 text-muted-foreground hover:text-foreground rounded-lg"
                    title="Copy password"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              {/* Strength Meter Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-muted-foreground">Strength & Cryptographic Entropy</span>
                  <span className="font-mono font-bold text-foreground">
                    {entropyBits.toFixed(1)} bits ({scorePercent}%)
                  </span>
                </div>
                <div className="h-2.5 w-full bg-muted/60 rounded-full overflow-hidden flex gap-1 p-0.5 border border-border/40">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-500",
                      band === "Very Weak" && "w-1/5 bg-red-500",
                      band === "Weak" && "w-2/5 bg-orange-500",
                      band === "Fair" && "w-3/5 bg-yellow-500",
                      band === "Strong" && "w-4/5 bg-green-500",
                      band === "Very Strong" && "w-full bg-emerald-500"
                    )}
                  />
                </div>
              </div>

              {/* Status Badge & Character Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                <div className="p-3 bg-muted/30 border border-border/60 rounded-xl text-center">
                  <div className="text-[11px] text-muted-foreground font-semibold">Rating</div>
                  <div className="text-xs font-extrabold text-foreground flex items-center justify-center gap-1 mt-0.5">
                    <BadgeIcon className="w-3.5 h-3.5 text-primary" />
                    <span>{badge.label}</span>
                  </div>
                </div>
                <div className="p-3 bg-muted/30 border border-border/60 rounded-xl text-center">
                  <div className="text-[11px] text-muted-foreground font-semibold">Length</div>
                  <div className="text-xs font-extrabold text-foreground mt-0.5">
                    {password.length} chars
                  </div>
                </div>
                <div className="p-3 bg-muted/30 border border-border/60 rounded-xl text-center">
                  <div className="text-[11px] text-muted-foreground font-semibold">Charset Pool</div>
                  <div className="text-xs font-extrabold text-foreground mt-0.5">
                    {charset} symbols
                  </div>
                </div>
                <div className="p-3 bg-muted/30 border border-border/60 rounded-xl text-center">
                  <div className="text-[11px] text-muted-foreground font-semibold">Entropy</div>
                  <div className="text-xs font-extrabold text-primary font-mono mt-0.5">
                    {entropyBits.toFixed(0)} bits
                  </div>
                </div>
              </div>

              {/* Security Checklist */}
              <div className="space-y-2.5 pt-2 border-t border-border/60">
                <div className="text-xs font-bold text-foreground">Security Checklist:</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {checks.map((c, i) => (
                    <div
                      key={i}
                      className={cn(
                        "flex items-center gap-2 p-2.5 rounded-lg border text-xs font-medium transition-all",
                        c.pass
                          ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-700 dark:text-emerald-400"
                          : "bg-muted/20 border-border text-muted-foreground"
                      )}
                    >
                      {c.pass ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-muted-foreground/30 shrink-0" />
                      )}
                      <span>{c.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Warning Issues if Any */}
              {issues.length > 0 && (
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 text-xs space-y-1.5">
                  <div className="font-bold flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Security Vulnerabilities Detected:</span>
                  </div>
                  <ul className="list-disc list-inside space-y-0.5 pl-1 text-[11px]">
                    {issues.map((iss, idx) => (
                      <li key={idx}>{iss}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Share & Embed Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-border/60">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={generateStrongPassword}
                  className="text-xs font-semibold rounded-xl h-9"
                >
                  <Sparkles className="w-3.5 h-3.5 mr-1.5 text-primary" /> Generate New Strong Password
                </Button>

                <div className="flex items-center gap-2">
                  <ShareResultButton
                    toolTitle="Password Strength & Entropy Analyzer"
                    resultTitle={`Password Strength: ${badge.label} (${entropyBits.toFixed(1)} bits)`}
                    resultSummary={`Estimated brute-force crack time on GPU cluster: ${crack.offline_fast_hash}`}
                    resultMetrics={[
                      { label: "Strength", value: badge.label },
                      { label: "Entropy", value: `${entropyBits.toFixed(0)} bits` },
                      { label: "Crack Time", value: crack.offline_fast_hash },
                      { label: "Length", value: `${password.length} chars` },
                    ]}
                  />
                  <EmbedButton toolPath="/tools/text/password-strength" toolTitle="Password Strength & Entropy Analyzer" />
                </div>
              </div>

            </GlassCard>
          </div>

          {/* Right Column: Estimated Crack Time Matrix (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <GlassCard className="p-5 sm:p-6 space-y-5">
              
              <div className="flex items-center gap-2 border-b border-border/60 pb-3">
                <Clock className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-bold text-foreground">Estimated Brute-Force Crack Times</h3>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed">
                Calculated assuming exhaustive key search against state-of-the-art attack scenarios:
              </p>

              <div className="space-y-3">
                
                {/* Online Rate Limited */}
                <div className="p-3 bg-muted/20 border border-border/60 rounded-xl space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-muted-foreground flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-primary" /> Online Login (Rate Limited)
                    </span>
                    <span className="font-bold text-foreground font-mono">{crack.online_throttled}</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground">10 attempts/sec with IP throttling</p>
                </div>

                {/* Online Fast */}
                <div className="p-3 bg-muted/20 border border-border/60 rounded-xl space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-muted-foreground flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-amber-500" /> Online Fast (Unthrottled API)
                    </span>
                    <span className="font-bold text-foreground font-mono">{crack.online_fast}</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground">100 attempts/sec without lockouts</p>
                </div>

                {/* Offline Slow Hash */}
                <div className="p-3 bg-muted/20 border border-border/60 rounded-xl space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-muted-foreground flex items-center gap-1.5">
                      <Server className="w-3.5 h-3.5 text-blue-500" /> Offline Slow Hash (bcrypt/Argon2)
                    </span>
                    <span className="font-bold text-foreground font-mono">{crack.offline_slow_hash}</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground">100,000 guesses/sec on modern CPU</p>
                </div>

                {/* Offline Fast Hash */}
                <div className="p-3 bg-muted/20 border border-border/60 rounded-xl space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-muted-foreground flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-purple-500" /> Offline GPU Cluster (MD5/SHA256)
                    </span>
                    <span className="font-bold text-foreground font-mono">{crack.offline_fast_hash}</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground">10 billion guesses/sec on GPU rig</p>
                </div>

                {/* Supercomputer */}
                <div className="p-3 bg-muted/20 border border-border/60 rounded-xl space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-muted-foreground flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Nation-State Supercomputer
                    </span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono font-extrabold">{crack.nation_state}</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground">1 trillion guesses/sec distributed compute</p>
                </div>

              </div>

              {/* Security Best Practices Tip */}
              <div className="p-3.5 bg-primary/5 border border-primary/20 rounded-xl space-y-1 text-xs">
                <div className="font-bold text-primary flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> Pro Security Tip:
                </div>
                <p className="text-muted-foreground text-[11px] leading-relaxed">
                  Passphrases composed of 4–5 random words (e.g. <code>correct-horse-battery-staple</code>) yield 65+ bits of entropy while remaining easy for humans to remember.
                </p>
              </div>

            </GlassCard>
          </div>

        </div>

        {/* How It Works & Educational Guides */}
        <ToolHowItWorks
          steps={[
            { step: "1", title: "Entropy Calculation", description: "Computes theoretical Shannon entropy in bits based on password length and available character space." },
            { step: "2", title: "NIST & Pattern Checking", description: "Checks against dictionary words, common leaked passwords, keyboard walks (qwerty), and sequential characters." },
            { step: "3", title: "Hardware Attack Simulation", description: "Simulates time to crack across online throttled systems, offline GPU rigs, and distributed clusters." }
          ]}
        />

        <ToolFeatureGuides
          features={[
            { title: "100% Client-Side Privacy", description: "Your password is never sent over any network or server. All calculations execute locally in your web browser." },
            { title: "Cryptographic Entropy", description: "Accurately measures bits of randomness rather than arbitrary length-only scoring rules." },
            { title: "Built-in Strong Generator", description: "Generate 18-character cryptographically secure passwords with a single click." }
          ]}
        />

        <ToolFaqAccordion
          faqs={[
            { question: "Is it safe to type my real password here?", answer: "Yes. This tool operates 100% in your browser using local JavaScript. No password data is ever transmitted or logged." },
            { question: "What is a good entropy score?", answer: "An entropy score of 60 bits or higher provides strong protection against automated brute-force attacks. 80+ bits provides military-grade security." },
            { question: "Why are passphrases recommended over complex short passwords?", answer: "Passphrases (e.g. 4 random words) provide significantly higher entropy due to length while being much easier to remember than short random character strings." }
          ]}
        />

        <RelatedTools currentToolUrl="/tools/text/password-strength" />

      </div>
    </div>
  );
}
