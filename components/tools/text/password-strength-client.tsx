"use client";

import { Eye, EyeOff, Info, Key, Shield, ShieldAlert, ShieldCheck, Timer, BookOpen, Lock, AlertTriangle, CheckCircle, BarChart3, Zap } from "lucide-react";
import * as React from "react";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import TextareaField from "@/components/shared/form-fields/textarea-field";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { Badge } from "@/components/ui/badge";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GlassCard } from "@/components/ui/glass-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  bandColor,
  bandFromEntropy,
  calcEntropyBits,
  crackTimes,
  findIssues,
} from "@/lib/utils/text/password-strength";

export default function PasswordStrengthClient() {
  const [pw, setPw] = React.useState("");
  const [show, setShow] = React.useState(false);
  const [showEntropyDetail, setShowEntropyDetail] = React.useState(false);

  const bits = React.useMemo(() => calcEntropyBits(pw), [pw]);
  const band = React.useMemo(() => bandFromEntropy(bits), [bits]);
  const issues = React.useMemo(() => findIssues(pw), [pw]);
  const times = React.useMemo(() => crackTimes(bits), [bits]);

  const meterPct = React.useMemo(() => {
    const capped = Math.max(0, Math.min(140, bits));
    return Math.round((capped / 140) * 100);
  }, [bits]);

  function resetAll() {
    setPw("");
    setShow(false);
    setShowEntropyDetail(false);
  }

  const estimatedCrackTimes = [
    { label: "Online (10/sec)", value: times.online_throttled },
    { label: "Online Fast (100/sec)", value: times.online_fast },
    { label: "Offline (slow hash ~100k/sec)", value: times.offline_slow_hash },
    { label: "Offline (fast hash ~10B/sec)", value: times.offline_fast_hash },
    { label: "Nation-state (1T/sec)", value: times.nation_state },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <ToolPageHeader
        icon={ShieldCheck}
        title="Password Strength"
        description="Check password entropy, estimated crack times, and get actionable hints to harden your password."
        actions={
          <>
            <ResetButton onClick={resetAll} />
            <CopyButton variant="default" getText={() => pw || ""} disabled={!pw} />
          </>
        }
      />

      {/* Input & Meter */}
      <GlassCard>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Enter Password</CardTitle>
          <CardDescription>
            Your password is processed locally in the browser — never sent anywhere.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="pw" className="flex items-center gap-2">
              <Key className="h-4 w-4" /> Password
            </Label>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 overflow-hidden rounded-md dark:bg-transparent w-full">
                <Input
                  id="pw"
                  type={show ? "text" : "password"}
                  value={pw}
                  onChange={(e) => setPw(e.target.value)}
                  placeholder="Type a password to evaluate…"
                  autoComplete="off"
                />
              </div>
              <ActionButton icon={show ? EyeOff : Eye} onClick={() => setShow((s) => !s)} />
            </div>
          </div>

          {/* Meter */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                {band === "Very Weak" || band === "Weak" ? (
                  <ShieldAlert className="h-4 w-4 text-orange-500" />
                ) : (
                  <Shield className="h-4 w-4 text-emerald-600" />
                )}
                <span className="font-medium">{band}</span>
              </div>
              <Badge variant="secondary" className="font-normal">
                {bits.toFixed(1)} bits
              </Badge>
            </div>
            <div className="h-2 w-full rounded-md bg-muted overflow-hidden">
              <div
                className={"h-full transition-all duration-500 " + (bandColor(band))}
                style={{ width: `${meterPct}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>0</span>
              <span>140+ bits</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Info className="h-3.5 w-3.5" />
                <span>
                  Entropy is estimated as <code className="font-mono">length × log₂(charset)</code>.
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Label htmlFor="detail" className="text-xs text-muted-foreground">
                  Show details
                </Label>
                <Switch
                  id="detail"
                  checked={showEntropyDetail}
                  onCheckedChange={setShowEntropyDetail}
                />
              </div>
            </div>

            {showEntropyDetail && (
              <div className="rounded-md border p-3 text-xs text-muted-foreground">
                <p>
                  Charset estimate considers lowercase (26), uppercase (26), digits (10), symbols
                  (~33) and spaces. Non-ASCII chars add extra variety. This is a theoretical upper
                  bound; real attackers use dictionaries & patterns.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </GlassCard>

      <Separator />

      {/* Crack time & Hints */}
      <GlassCard>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Estimated Crack Times</CardTitle>
          <CardDescription>
            How long a brute-force/dictionary attack could take, under different assumptions.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
          <div className="space-y-3">
            <div className="grid grid-cols-1 gap-2 text-sm">
              {estimatedCrackTimes.map((time, idx) => (
                <div
                  key={idx as number}
                  className="flex items-center justify-between rounded-md border p-2"
                >
                  <div className="flex items-center gap-2">
                    <Timer className="h-4 w-4" />
                    {time.label}
                  </div>
                  <Badge className="capitalize" variant="outline">
                    {time.value}
                  </Badge>
                </div>
              ))}
            </div>

            <p className="text-xs text-muted-foreground">
              Reality varies with attacker hardware, hashing algorithm, rate limits, 2FA, and
              whether the password appears in breach dumps.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Hints & Findings</Label>
                <p className="text-xs text-muted-foreground">Suggestions update as you type.</p>
              </div>
              <Badge variant="secondary">
                {issues.length === 0 ? "Looking good" : `${issues.length} hints`}
              </Badge>
            </div>

            <div className="rounded-md border p-3">
              {pw.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Start typing above to see tailored hints.
                </p>
              ) : issues.length === 0 ? (
                <div className="flex items-center gap-2 text-sm text-emerald-600">
                  <ShieldCheck className="h-4 w-4" />
                  No obvious weaknesses detected. Consider using a password manager for unique, long
                  passwords.
                </div>
              ) : (
                <ul className="list-disc pl-6 text-sm space-y-1">
                  {issues.map((i, idx) => (
                    <li key={idx as number}>{i}</li>
                  ))}
                </ul>
              )}
            </div>

            <div className="rounded-md border p-3 text-xs text-muted-foreground">
              <p className="font-medium mb-1">Best practices</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Use 14–20+ characters; passphrases are great (four+ random words).</li>
                <li>
                  Mix lower/upper, digits, and symbols — but avoid predictable substitutions (e.g.,{" "}
                  <code>a→@</code>).
                </li>
                <li>
                  Avoid dictionary words, names, dates, keyboard patterns, or company/product names.
                </li>
                <li>Never reuse passwords; enable 2FA wherever possible.</li>
                <li>Prefer a password manager to generate & store unique passwords.</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </GlassCard>

      {/* Optional: quick scratchpad to test multiple candidates */}
      <GlassCard>
        <CardHeader>
          <CardTitle className="text-base">Batch Test (Optional)</CardTitle>
          <CardDescription>
            One candidate per line — we’ll score them quickly (no data leaves your browser).
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3">
          <BatchTester />
        </CardContent>
      </GlassCard>

      {/* SECTION 3: HOW IT WORKS */}
      <ToolHowItWorks
        steps={[
          {
            step: "01",
            title: "Type Your Password",
            description: "Enter a password in the input field. Analysis happens instantly as you type — no submit button needed. Your password never leaves your browser.",
            icon: Key,
          },
          {
            step: "02",
            title: "See Strength Score & Analysis",
            description: "Get an instant strength rating (Weak/Fair/Good/Strong/Very Strong), entropy score in bits, estimated crack time, and which criteria are met or missing.",
            icon: BarChart3,
          },
          {
            step: "03",
            title: "Improve & Validate",
            description: "See exactly which improvements will boost your score: add uppercase, numbers, symbols, or increase length. Use the suggestions to create a stronger password.",
            icon: CheckCircle,
          },
        ]}
        badges={[
          "Never sent to server",
          "Entropy analysis",
          "Instant feedback",
        ]}
      />

      {/* SECTION 4: FEATURE GUIDES */}
      <ToolFeatureGuides
        features={[
          {
            icon: BarChart3,
            title: "Entropy Score (Bits)",
            description: "Measures password strength in bits of entropy — the true mathematical measure of unpredictability. A strong password should have 60+ bits; excellent is 80+ bits.",
          },
          {
            icon: Key,
            title: "Crack Time Estimate",
            description: "Estimates how long a brute-force attack would take using modern GPU hardware (10 billion guesses/second). Weak passwords crack in seconds; strong ones take centuries.",
          },
          {
            icon: CheckCircle,
            title: "Criteria Checklist",
            description: "Shows exactly which strength criteria your password meets: minimum length, uppercase, lowercase, numbers, symbols, and common pattern avoidance.",
          },
          {
            icon: AlertTriangle,
            title: "Common Pattern Detection",
            description: "Detects and warns about common patterns: keyboard walks (qwerty), sequential numbers (123456), repeated characters (aaabbb), and dictionary words.",
          },
          {
            icon: Eye,
            title: "Show/Hide Toggle",
            description: "Toggle password visibility to check what you've typed. The tool never stores or transmits your password — all analysis is local.",
          },
          {
            icon: Shield,
            title: "100% Client-Side",
            description: "Your password is analyzed entirely in JavaScript in your browser. It never touches any server, making this tool safe even for checking real passwords.",
          },
        ]}
      >
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
          <h3 className="text-lg font-semibold">Password Security Guide — What Makes a Password Strong?</h3>
          <p>
            Password strength is determined by two factors: <strong>length</strong> and <strong>character set complexity</strong>.
            A longer password with varied characters has exponentially more possible combinations, making brute-force
            attacks computationally infeasible. Modern password crackers can attempt billions of guesses per second
            on consumer hardware — so even "complex" short passwords can be cracked quickly.
          </p>

          <h4 className="font-semibold">Password Strength by Length and Character Set</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border p-2 text-left">Length</th>
                  <th className="border p-2 text-left">Lowercase Only</th>
                  <th className="border p-2 text-left">+ Uppercase</th>
                  <th className="border p-2 text-left">+ Numbers</th>
                  <th className="border p-2 text-left">+ Symbols</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["6 chars", "Instant", "< 1 sec", "< 1 sec", "< 1 sec"],
                  ["8 chars", "< 1 min", "< 1 hr", "3 hrs", "1 day"],
                  ["10 chars", "2 days", "4 months", "7 years", "700 yrs"],
                  ["12 chars", "350 yrs", "2000 yrs", "34K yrs", "34M yrs"],
                  ["16 chars", "~Infinity", "~Infinity", "~Infinity", "~Infinity"],
                ].map(([len, lc, uc, num, sym]) => (
                  <tr key={len} className="odd:bg-muted/20">
                    <td className="border p-2 font-medium text-xs">{len}</td>
                    <td className="border p-2 text-xs text-red-500">{lc}</td>
                    <td className="border p-2 text-xs text-orange-500">{uc}</td>
                    <td className="border p-2 text-xs text-yellow-500">{num}</td>
                    <td className="border p-2 text-xs text-green-500">{sym}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground">Crack times assume 10 billion guesses/second (modern GPU). Does not account for dictionary/pattern attacks.</p>

          <h4 className="font-semibold">Password Best Practices</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border p-2 text-left">Strategy</th>
                  <th className="border p-2 text-left">Example</th>
                  <th className="border p-2 text-left">Strength</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Random characters", "xK#9mP2!qW8z", "Very Strong (80+ bits)"],
                  ["Passphrase", "correct-horse-battery-staple", "Strong (60+ bits)"],
                  ["Substitution", "P@ssw0rd123", "Weak (dictionary attack target)"],
                  ["Keyboard walk", "qwerty123!", "Weak (common pattern)"],
                  ["Personal info", "john1990!", "Very Weak (easily guessed)"],
                ].map(([strategy, example, strength]) => (
                  <tr key={strategy} className="odd:bg-muted/20">
                    <td className="border p-2 font-medium text-xs">{strategy}</td>
                    <td className="border p-2 font-mono text-xs">{example}</td>
                    <td className="border p-2 text-xs">{strength}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h4 className="font-semibold">NIST 2024 Password Guidelines</h4>
          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
            <li><strong>Length over complexity:</strong> A 16-character passphrase is stronger than a complex 8-character password.</li>
            <li><strong>No mandatory rotations:</strong> NIST no longer recommends forced periodic password changes unless compromise is suspected.</li>
            <li><strong>No complexity requirements:</strong> Forcing symbols/numbers can lead to predictable patterns (Pa$$w0rd!).</li>
            <li><strong>Check against breached lists:</strong> Use Have I Been Pwned API to reject passwords found in data breaches.</li>
            <li><strong>Use a password manager:</strong> The best password is one you can't remember because it's truly random.</li>
          </ul>
        </div>
      </ToolFeatureGuides>

      {/* SECTION 5: FAQ + RELATED TOOLS */}
      <ToolFaqAccordion
        faqs={[
          {
            question: "Is it safe to enter my real password here?",
            answer: "Yes. This tool is 100% client-side — your password is analyzed entirely in JavaScript in your browser and never sent to any server. You can verify this by checking the browser's Network tab while typing: no requests will be made.",
          },
          {
            question: "What makes a password strong?",
            answer: "Length is the most important factor — each additional character multiplies the number of possible combinations exponentially. A 16-character password with mixed characters is vastly stronger than an 8-character one. Avoid dictionary words, keyboard patterns (qwerty), and personal information (birthdays, names).",
          },
          {
            question: "What is password entropy?",
            answer: "Entropy (measured in bits) is the mathematical measure of password unpredictability. It's calculated as log2(character_set_size ^ password_length). A password with 60 bits of entropy has 2^60 possible combinations — about 1.15 quadrillion. 80+ bits is considered very strong.",
          },
          {
            question: "Should I use a passphrase instead of a random password?",
            answer: "Yes, for passwords you need to remember. A 4-word passphrase like 'correct-horse-battery-staple' has ~44 bits of entropy and is much easier to memorize than 'xK#9m!2P'. For accounts you don't need to memorize, use a password manager with fully random 20+ character passwords.",
          },
          {
            question: "How often should I change my passwords?",
            answer: "NIST 2024 guidelines no longer recommend mandatory periodic password changes — they can lead to weak, predictable patterns (Password1 → Password2). Change passwords when: you suspect compromise, after a data breach (check haveibeenpwned.com), or when sharing access that should be revoked.",
          },
        ]}
      />
      <RelatedTools currentToolUrl="/tools/text/password-strength" max={6} />
    </div>
  );
}

// Batch Tester
function BatchTester() {
  const [text, setText] = React.useState("");
  const lines = React.useMemo(
    () =>
      text
        .split("\n")
        .filter((l) => l.length > 0)
        .slice(0, 200),
    [text],
  );

  const rows = React.useMemo(() => {
    return lines.map((l) => {
      const b = calcEntropyBits(l);
      const band = bandFromEntropy(b);
      return { sample: l, bits: b, band, issues: findIssues(l) };
    });
  }, [lines]);

  return (
    <>
      <TextareaField
        value={text}
        onValueChange={setText}
        placeholder="candidate-one
P@ssw0rd!
Tr0ub4dor&3
correct horse battery staple"
        textareaClassName="min-h-[140px]"
        autoResize
      />
      <div className="rounded-md border p-2 overflow-x-auto">
        {rows.length === 0 ? (
          <p className="text-sm text-muted-foreground px-1">Add lines above to see results.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-muted-foreground">
                <th className="py-2 pr-4">Password</th>
                <th className="py-2 pr-4">Entropy (bits)</th>
                <th className="py-2 pr-4">Band</th>
                <th className="py-2">Hints</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i as number} className="border-t">
                  <td className="py-2 pr-4 font-mono break-all">{r.sample}</td>
                  <td className="py-2 pr-4">{r.bits.toFixed(1)}</td>
                  <td className="py-2 pr-4">
                    <span
                      className={"inline-flex items-center rounded px-2 py-0.5 text-xs text-white " + (bandColor(r.band)) + " "}
                    >
                      {r.band}
                    </span>
                  </td>
                  <td className="py-2">
                    {r.issues.length === 0 ? (
                      <span className="text-emerald-600">OK</span>
                    ) : (
                      <span className="text-muted-foreground">{r.issues.join(" • ")}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
