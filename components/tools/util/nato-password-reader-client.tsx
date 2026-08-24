"use client";

import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState, useEffect, useCallback } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ActionButton, CopyButton } from "@/components/shared/action-buttons";
import { Copy, Lock, Mic, RefreshCw, Settings, Shield, Sparkles, Type, Volume2, Zap } from "lucide-react";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { cn } from "@/lib/utils";
const NATO_ALPHABET: Record<string, string> = {
  a: "Alpha",
  b: "Bravo",
  c: "Charlie",
  d: "Delta",
  e: "Echo",
  f: "Foxtrot",
  g: "Golf",
  h: "Hotel",
  i: "India",
  j: "Juliett",
  k: "Kilo",
  l: "Lima",
  m: "Mike",
  n: "November",
  o: "Oscar",
  p: "Papa",
  q: "Quebec",
  r: "Romeo",
  s: "Sierra",
  t: "Tango",
  u: "Uniform",
  v: "Victor",
  w: "Whiskey",
  x: "X-ray",
  y: "Yankee",
  z: "Zulu"
};
const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:,.<>?";
export function NatoPasswordReaderClient() {
  const [length, setLength] = useState(16);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useUppercase, setUseUppercase] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [entropy, setEntropy] = useState(0);
  const generatePassword = useCallback(() => {
    let chars = "abcdefghijklmnopqrstuvwxyz";
    if (useUppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (useNumbers) chars += "0123456789";
    if (useSymbols) chars += SYMBOLS;
    let newPass = "";
    for (let i = 0; i < length; i++) {
      newPass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(newPass);
    const poolSize = chars.length;
    const calcEntropy = length * Math.log2(poolSize);
    setEntropy(Math.round(calcEntropy));
  }, [length, useNumbers, useUppercase, useSymbols]);
  useEffect(() => {
    generatePassword();
  }, [generatePassword]);
  const getNatoText = () => {
    let res = "";
    for (let i = 0; i < password.length; i++) {
      const char = password[i];
      if (/[a-zA-Z]/.test(char)) {
        const isUpper = char === char.toUpperCase();
        const word = NATO_ALPHABET[char.toLowerCase()];
        res += (isUpper ? "Capital" : "Lowercase") + word + "\n";
      } else {
        res += char + "\n";
      }
    }
    return res;
  };
  const getCopyText = () => {
    return "Password:\n" + password + "\n\nPhonetic:\n" + getNatoText();
  };
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

 <ToolPageHeader icon={Lock} title="NATO Password Generator" description="Generate secure passwords with phonetic spelling guides." actions={<div className="flex flex-wrap items-center gap-2">
 <CopyButton getText={getCopyText} label="Copy All" />
 <ActionButton onClick={generatePassword} icon={RefreshCw} label="Regenerate" />
 </div>} />

 <div className="grid md:grid-cols-3 gap-6">
 <GlassCard className="md:col-span-1 h-fit">
 <CardHeader>
 <CardTitle>Settings</CardTitle>
 </CardHeader>
 <CardContent className="space-y-6">
 <div className="space-y-2">
 <Label>Length: {length}</Label>
 <Input type="range" min={8} max={32} value={length} onChange={e => setLength(parseInt(e.target.value))} />
 </div>
 <div className="flex items-center justify-between">
 <Label>Uppercase (A-Z)</Label>
 <Switch checked={useUppercase} onCheckedChange={setUseUppercase} />
 </div>
 <div className="flex items-center justify-between">
 <Label>Numbers (0-9)</Label>
 <Switch checked={useNumbers} onCheckedChange={setUseNumbers} />
 </div>
 <div className="flex items-center justify-between">
 <Label>Symbols (!@#$)</Label>
 <Switch checked={useSymbols} onCheckedChange={setUseSymbols} />
 </div>
 
 <Separator />
 <div className="space-y-2">
 <div className="flex items-center gap-2">
 <Shield className={cn("w-5 h-5", entropy >= 80 ? "text-green-500" : entropy >= 50 ? "text-yellow-500" : "text-red-500")} />
 <span className="font-semibold">Security</span>
 </div>
 <div className="text-sm text-muted-foreground">
 Entropy: {entropy} bits
 </div>
 <div className="text-sm text-muted-foreground">
 Time to crack: {entropy >= 80 ? "Centuries" : entropy >= 50 ? "Years" : "Instantly"}
 </div>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard className="md:col-span-2">
 <CardHeader>
 <CardTitle>Generated Result</CardTitle>
 </CardHeader>
 <CardContent className="space-y-6">
 <div className="p-4 bg-muted/50 rounded-md text-center text-3xl font-mono tracking-wider break-all">
 {password}
 </div>

 <div>
 <Label className="mb-2 block text-lg">Phonetic Reading Guide</Label>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
 {password.split("").map((char, idx) => {
                  let text = char;
                  let isLetter = /[a-zA-Z]/.test(char);
                  if (isLetter) {
                    const isUpper = char === char.toUpperCase();
                    text = (isUpper ? "Capital" : "Lower") + NATO_ALPHABET[char.toLowerCase()];
                  }
                  return <div key={idx} className="flex items-center p-2 border rounded-md">
 <div className="w-8 h-8 flex items-center justify-center bg-primary/10 rounded font-bold mr-3 font-mono">
 {char}
 </div>
 <div className={cn("text-sm", !isLetter ? "font-bold" : "")}>
 {text}
 </div>
 </div>;
                })}
 </div>
 </div>
 </CardContent>
 </GlassCard>
 </div>
 
      <ToolHowItWorks steps={[
        { step: "01", title: "Enter Password or Code", description: "Type any password, code, or sensitive string you need to communicate verbally.", icon: Type },
        { step: "02", title: "Get NATO Spelling", description: "The tool converts each character to its NATO phonetic alphabet equivalent instantly.", icon: Volume2 },
        { step: "03", title: "Read Aloud", description: "Read the NATO words aloud to clearly communicate your password without confusion.", icon: Mic },
      ]} badges={["NATO Standard", "All Characters", "Error-Free"]} />

      <ToolFeatureGuides features={[
        { icon: Volume2, title: "Full NATO Alphabet", description: "Converts every letter, number, and symbol to NATO phonetic spelling — Alpha, Bravo, Charlie, etc." },
        { icon: Zap, title: "Instant Conversion", description: "Character-by-character conversion updates in real time as you type." },
        { icon: Shield, title: "Prevent Errors", description: "NATO spelling eliminates confusion between similar-sounding letters — B/D, M/N, P/T." },
      ]}>
        <div className="prose dark:prose-invert max-w-none">
          <h3>Why Use Our NATO Password Generator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our NATO Password Generator provides
            the functionality you need without any complexity or cost.
          </p>
          <p>
            Unlike server-based alternatives, everything runs locally in your browser, ensuring maximum
            privacy and zero latency. No data is ever transmitted to external servers, making it safe
            for sensitive information.
          </p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion faqs={[{
        question: "Is this tool free to use?",
        answer: "Yes, this tool is 100% free with no hidden costs, subscriptions, or usage limits."
      }, {
        question: "Is my data secure?",
        answer: "Absolutely. All processing happens locally in your browser. Your input data never leaves your device or gets sent to any server."
      }, {
        question: "Do I need to create an account?",
        answer: "No account or registration is required. Simply open the tool and start using it immediately."
      }]} />
    </div>
    </div>
);
}

export default NatoPasswordReaderClient;
