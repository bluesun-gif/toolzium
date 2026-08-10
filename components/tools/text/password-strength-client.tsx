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
          { step: "01", title: "Type Your Password", description: "Enter any password to instantly analyze its strength. The tool checks length, character variety, common patterns, dictionary words, and calculates real entropy in bits.", icon: Lock },
          { step: "02", title: "See Strength Breakdown", description: "Get a detailed score with specific feedback: which character types are missing, whether the password contains common words or keyboard patterns, and how long it would take to crack.", icon: ShieldCheck },
          { step: "03", title: "Improve and Verify", description: "Follow the specific suggestions to strengthen your password. Re-type to verify your final password matches. All analysis is instant and private — nothing is stored or sent to any server.", icon: Eye },
        ]}
        badges={["Entropy calculation", "Pattern detection", "Crack time estimate"]}
      />

      {/* SECTION 4: FEATURE GUIDES */}
      <ToolFeatureGuides
        features={[
          { icon: ShieldCheck, title: "Entropy-Based Scoring", description: "Calculates true password entropy in bits using character set size and password length. Entropy above 72 bits is considered strong. The score reflects mathematical crack resistance, not just character variety." },
          { icon: AlertTriangle, title: "Pattern Detection", description: "Detects keyboard walks (qwerty, 12345), repeated characters (aaaa), sequences (abcd), common substitutions (p@ssw0rd), and checks against a dictionary of the 10,000 most common passwords." },
          { icon: Zap, title: "Crack Time Estimates", description: "Shows estimated time to crack using brute force at 10 billion guesses per second (modern GPU attack). Displays crack time for online attacks (1000/sec), offline slow hash (100k/sec), and offline fast hash (10B/sec)." },
          { icon: Key, title: "Character Set Analysis", description: "Checks presence of lowercase letters, uppercase letters, numbers, and special symbols. Shows which character types are missing and how adding them exponentially increases the character set size." },
          { icon: BookOpen, title: "Actionable Suggestions", description: "Provides specific, prioritized improvements: increase length, add specific character types, remove detected patterns, avoid dictionary words. Each suggestion shows the entropy gain it would provide." },
          { icon: Eye, title: "Show or Hide Toggle", description: "Toggle password visibility with the show/hide button to verify what you typed without retyping. The visibility toggle never affects the security analysis." },
        ]}
      >
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
          <h3 className="text-lg font-semibold">Password Strength and Entropy Reference</h3>
          <p>Password strength is determined by entropy — the number of bits required to represent the total possible combinations. A password with 72 bits of entropy has 2 to the power of 72 possible combinations. At 10 billion guesses per second (a modern GPU), cracking it would take longer than the age of the universe.</p>
          <h3 className="text-lg font-semibold">Entropy by Character Set and Length</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border p-2 text-left">Character Set</th>
                  <th className="border p-2 text-left">Pool Size</th>
                  <th className="border p-2 text-left">8 chars</th>
                  <th className="border p-2 text-left">12 chars</th>
                  <th className="border p-2 text-left">16 chars</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Digits only (0-9)", "10", "27 bits", "40 bits", "53 bits"],
                  ["Lowercase only", "26", "38 bits", "56 bits", "75 bits"],
                  ["Lower + Upper", "52", "46 bits", "68 bits", "91 bits"],
                  ["Lower + Upper + Digits", "62", "48 bits", "71 bits", "95 bits"],
                  ["All ASCII printable", "95", "53 bits", "79 bits", "105 bits"],
                  ["Diceware words", "7,776", "~90 bits", "~116 bits", "~142 bits"],
                ].map(([set, pool, e8, e12, e16]) => (
                  <tr key={set} className="odd:bg-muted/20">
                    <td className="border p-2 font-medium text-xs">{set}</td>
                    <td className="border p-2 font-mono text-xs">{pool}</td>
                    <td className="border p-2 font-mono text-primary text-xs">{e8}</td>
                    <td className="border p-2 font-mono text-primary text-xs">{e12}</td>
                    <td className="border p-2 font-mono text-primary text-xs">{e16}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h3 className="text-lg font-semibold">Crack Time by Attack Scenario</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border p-2 text-left">Attack Type</th>
                  <th className="border p-2 text-left">Speed</th>
                  <th className="border p-2 text-left">Example</th>
                  <th className="border p-2 text-left">Protection</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Online attack", "~100/sec", "Web login form with rate limiting", "8+ char password sufficient"],
                  ["Online (fast)", "~1,000/sec", "API without rate limits", "10+ chars recommended"],
                  ["Offline slow hash", "~100K/sec", "bcrypt, scrypt, Argon2", "12+ chars with mixed types"],
                  ["Offline fast hash", "~10B/sec", "MD5, SHA-1 (GPU attack)", "16+ chars or passphrase"],
                  ["Custom hardware", "~100B/sec", "ASIC cluster (nation-state)", "20+ chars or passphrase"],
                ].map(([attack, speed, ex, prot]) => (
                  <tr key={attack} className="odd:bg-muted/20">
                    <td className="border p-2 font-medium text-xs">{attack}</td>
                    <td className="border p-2 font-mono text-primary text-xs">{speed}</td>
                    <td className="border p-2 text-xs">{ex}</td>
                    <td className="border p-2 text-muted-foreground text-xs">{prot}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h3 className="text-lg font-semibold">Password Best Practices (NIST 2024)</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li><strong>Length over complexity</strong>: NIST SP 800-63B recommends prioritizing length. A 20-character passphrase of random words is stronger than a 10-character complex password.</li>
            <li><strong>Avoid periodic rotation</strong>: Mandatory 90-day password rotation has been removed from NIST recommendations. It encourages weaker, predictable password patterns (Password1, Password2).</li>
            <li><strong>Use a password manager</strong>: Use unique, randomly generated passwords for every account. Never reuse passwords. A breach of one site compromises all reused passwords.</li>
            <li><strong>Enable MFA</strong>: Multi-factor authentication blocks 99.9% of automated attacks even if a password is compromised (Microsoft Security data).</li>
          </ul>
        </div>
      </ToolFeatureGuides>

      {/* SECTION 5: FAQ + RELATED TOOLS */}
      <ToolFaqAccordion
        faqs={[
          { question: "Is my password sent to a server when I type it here?", answer: "No. All password analysis happens entirely in your browser using JavaScript. Your password is never transmitted over the network, never logged, and never stored. The tool works offline once the page loads. You can verify this by disconnecting from the internet and testing the tool — it works identically." },
          { question: "What makes a password strong?", answer: "Password strength is determined by entropy: the product of length and the logarithm of the character set size. A strong password has high entropy, meaning many possible combinations. Key factors: length (most important), character variety (lowercase, uppercase, digits, symbols), absence of dictionary words, absence of keyboard patterns like qwerty or 12345, and uniqueness (not reused from other accounts)." },
          { question: "Why does the tool say my complex password is weak?", answer: "Common patterns like P@ssw0rd, Tr0ub4dor, or S3cur3 are well-known substitution patterns that attackers test first. Dictionary-based attacks include leet-speak substitutions, so p@ssword is cracked as fast as password. The checker detects these patterns and correctly rates them as weak despite containing uppercase, numbers, and symbols." },
          { question: "What is a passphrase and is it better than a random password?", answer: "A passphrase is a sequence of random words: correct-horse-battery-staple. A 4-word Diceware passphrase has about 51 bits of entropy (7776 to the power of 4 combinations), which is comparable to a 9-character random alphanumeric password. A 6-word passphrase (77 bits) is stronger than most random passwords and far easier to remember. Passphrases are recommended by NIST for human-memorable credentials." },
          { question: "What entropy level is considered strong enough?", answer: "Security levels by entropy: 40-56 bits is adequate for low-value accounts with rate-limited online access. 72-80 bits is strong for most purposes and resistant to offline attacks using bcrypt or Argon2. 100+ bits is very strong and resistant to all current hardware attacks including GPU clusters. NIST recommends at least 112 bits for the most sensitive applications." },
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
