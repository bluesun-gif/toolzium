"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState, useMemo } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/shared/action-buttons";
import { KeyRound, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { GlassCard } from "@/components/ui/glass-card";
const cardClass = "border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass = "border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass = "text-xs sm:text-sm font-semibold flex items-center gap-2";
export default function PasswordGeneratorClient() {
  const [length, setLength] = useState(16);
  const [upper, setUpper] = useState(true);
  const [lower, setLower] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [count, setCount] = useState(1);
  const [passwords, setPasswords] = useState<string[]>([]);
  const generatePasswords = () => {
    let charset = "";
    if (upper) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lower) charset += "abcdefghijklmnopqrstuvwxyz";
    if (numbers) charset += "0123456789";
    if (symbols) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";
    if (charset.length === 0) {
      toast.error("Select at least one character type");
      return;
    }
    const generated: string[] = [];
    for (let c = 0; c < count; c++) {
      let pass = "";
      const array = new Uint32Array(length);
      window.crypto.getRandomValues(array);
      for (let i = 0; i < length; i++) {
        pass += charset[array[i] % charset.length];
      }
      generated.push(pass);
    }
    setPasswords(generated);
  };
  const strength = useMemo(() => {
    let score = 0;
    if (length >= 12) score++;
    if (length >= 16) score++;
    if (upper && lower) score++;
    if (numbers) score++;
    if (symbols) score++;
    if (score <= 2) return {
      label: "Weak",
      color: "bg-red-500",
      width: "25%"
    };
    if (score === 3) return {
      label: "Medium",
      color: "bg-yellow-500",
      width: "50%"
    };
    if (score === 4) return {
      label: "Strong",
      color: "bg-blue-500",
      width: "75%"
    };
    return {
      label: "Very Strong",
      color: "bg-green-500",
      width: "100%"
    };
  }, [length, upper, lower, numbers, symbols]);
  return <div className="relative max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={KeyRound} title="Password Generator" description="Create ultra-secure, cryptographically random passwords with custom character rules." />
 
 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>Security Settings</CardTitle>
 </CardHeader>
 <CardContent className="p-4 sm:p-6 space-y-6">
 <div className="space-y-4">
 <div className="flex justify-between items-center">
 <label className="text-sm font-medium">Length: {length}</label>
 <span className="text-xs text-muted-foreground">8 - 64</span>
 </div>
 <input type="range" min="8" max="64" value={length} onChange={e => setLength(parseInt(e.target.value))} className="w-full accent-primary" />
 </div>

 <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
 {[{
              label: "Uppercase (A-Z)",
              state: upper,
              set: setUpper
            }, {
              label: "Lowercase (a-z)",
              state: lower,
              set: setLower
            }, {
              label: "Numbers (0-9)",
              state: numbers,
              set: setNumbers
            }, {
              label: "Symbols (!@#$)",
              state: symbols,
              set: setSymbols
            }].map(opt => <label key={opt.label} className="flex items-center space-x-2 cursor-pointer p-3 rounded-lg border border-border/50 hover:bg-muted/30">
 <input type="checkbox" checked={opt.state} onChange={e => opt.set(e.target.checked)} className="h-4 w-4 rounded accent-primary" />
 <span className="text-sm">{opt.label}</span>
 </label>)}
 </div>

 <div className="space-y-2">
 <label className="text-sm font-medium">Number of Passwords (1-10)</label>
 <input type="number" min="1" max="10" value={count} onChange={e => setCount(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))} className="w-full rounded-lg border border-border/70 bg-background/80 p-2 text-sm outline-none focus:ring-2 focus:ring-primary/50" />
 </div>

 <div className="space-y-2">
 <label className="text-sm font-medium">Password Strength</label>
 <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
 <div className={`h-full ${strength.color} transition-all duration-300`} style={{
                width: strength.width
              }} />
 </div>
 <p className="text-xs text-muted-foreground">{strength.label}</p>
 </div>

 <Button onClick={generatePasswords} className="w-full" size="lg">
 <RefreshCw className="w-4 h-4 mr-2" /> Generate Passwords
 </Button>

 {passwords.length > 0 && <div className="space-y-3 mt-6">
 {passwords.map((p, i) => <div key={i} className="flex items-center gap-2 p-3 bg-background rounded-lg border border-border/50">
 <code className="flex-1 text-green-400 font-mono text-sm break-all">{p}</code>
 <CopyButton getText={() => p} label="Copy" />
 </div>)}
 </div>}
 </CardContent>
 </GlassCard>

 <ToolHowItWorks steps={[{
        step: "01",
        title: "Set Length",
        description: "Drag the slider to choose how long your password should be (up to 64 characters).",
        icon: KeyRound
      }, {
        step: "02",
        title: "Choose Characters",
        description: "Toggle the inclusion of uppercase, lowercase, numbers, and special symbols.",
        icon: KeyRound
      }, {
        step: "03",
        title: "Generate & Copy",
        description: "Click generate to create secure passwords and copy them to your clipboard instantly.",
        icon: KeyRound
      }]} badges={["100% Free", "Client-Side", "Secure"]} />

 <ToolFeatureGuides features={[{
        icon: KeyRound,
        title: "Cryptographic Randomness",
        description: "Uses the Web Crypto API (window.crypto.getRandomValues) for true, unpredictable entropy."
      }, {
        icon: KeyRound,
        title: "Strength Meter",
        description: "Visual feedback indicates how resilient your password configuration is against brute-force attacks."
      }, {
        icon: KeyRound,
        title: "Batch Generation",
        description: "Generate up to 10 unique passwords simultaneously for all your accounts."
      }, {
        icon: KeyRound,
        title: "Zero-Knowledge",
        description: "Passwords are generated locally in your browser and are never transmitted over the network."
      }]}>
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <p>In an era of frequent data breaches, using strong, unique passwords for every account is your first line of defense. Our generator creates completely random strings that are virtually impossible to guess or crack using dictionary attacks.</p>
 <p>Unlike server-side generators, this tool relies on your browser's built-in cryptographic APIs. This ensures that even if our servers were compromised, your generated passwords would remain completely unknown to anyone but you.</p>
 <p>We recommend using a password manager in conjunction with this tool to securely store your complex credentials without having to memorize them.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion faqs={[{
        question: "Are these passwords sent to your server?",
        answer: "Absolutely not. The generation algorithm runs entirely within your web browser using JavaScript. The passwords never leave your device."
      }, {
        question: "What is a good password length?",
        answer: "Security experts recommend a minimum of 12-16 characters for standard accounts, and 20+ characters for highly sensitive accounts like email or banking."
      }, {
        question: "Should I include symbols?",
        answer: "Yes, mixing character types (uppercase, lowercase, numbers, symbols) exponentially increases the entropy and time required to crack a password."
      }]} />

 <RelatedTools currentToolUrl="/tools/fun/password-generator" max={6} />
 </div></div>;
}