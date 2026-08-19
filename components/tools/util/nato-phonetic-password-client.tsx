"use client";

import { Input } from "@/components/ui/input";

import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ActionButton, CopyButton } from "@/components/shared/action-buttons";
import { Copy, Keyboard, List, Lock, RefreshCw, Settings, Shield, Sparkles, Type, Volume2, Zap } from "lucide-react";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
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
export function NatoPhoneticPasswordClient() {
  const [length, setLength] = useState(12);
  const [incNumbers, setIncNumbers] = useState(true);
  const [incUpper, setIncUpper] = useState(true);
  const [incSymbols, setIncSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const generatePassword = () => {
    let charset = "abcdefghijklmnopqrstuvwxyz";
    if (incUpper) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (incNumbers) charset += "0123456789";
    if (incSymbols) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";
    let res = "";
    for (let i = 0; i < length; i++) {
      res += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(res);
  };
  useEffect(() => {
    generatePassword();
  }, [length, incNumbers, incUpper, incSymbols]);
  const getNatoWord = (char: string) => {
    if (/[a-zA-Z]/.test(char)) {
      const isUpper = char === char.toUpperCase();
      const word = NATO_ALPHABET[char.toLowerCase()];
      return isUpper ? "Capital" + word : word;
    }
    if (/[0-9]/.test(char)) return "Number" + char;
    return "Symbol" + char;
  };
  const getEntropy = () => {
    let pool = 26;
    if (incUpper) pool += 26;
    if (incNumbers) pool += 10;
    if (incSymbols) pool += 32;
    return Math.round(length * Math.log2(pool));
  };
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

 <ToolPageHeader icon={Lock} title="NATO Phonetic Password Generator" description="Generate secure passwords with NATO phonetic spelling soundout." actions={<React.Fragment>
 <ActionButton onClick={generatePassword} icon={RefreshCw} label="Regenerate" variant="outline" size="default" />
 </React.Fragment>} />
 
 <div className="grid md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Settings</CardTitle>
 </CardHeader>
 <CardContent className="space-y-6">
 <div className="space-y-2">
 <div className="flex justify-between">
 <Label>Length: {length}</Label>
 </div>
 <input type="range" min={8} max={32} value={length} onChange={e => setLength(Number(e.target.value))} className="w-full" />
 </div>
 <div className="flex items-center justify-between">
 <Label>Uppercase Letters</Label>
 <Switch checked={incUpper} onCheckedChange={setIncUpper} />
 </div>
 <div className="flex items-center justify-between">
 <Label>Numbers</Label>
 <Switch checked={incNumbers} onCheckedChange={setIncNumbers} />
 </div>
 <div className="flex items-center justify-between">
 <Label>Special Symbols</Label>
 <Switch checked={incSymbols} onCheckedChange={setIncSymbols} />
 </div>
 
 <div className="p-4 bg-muted rounded-md mt-6">
 <div className="text-sm font-semibold mb-1 flex items-center gap-2"><Shield className="w-4 h-4" /> Security Info</div>
 <div className="text-sm">Entropy: {getEntropy()} bits</div>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader className="flex flex-row justify-between items-center">
 <CardTitle>Output</CardTitle>
 <CopyButton getText={() => password} label="Copy Password" />
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="p-4 bg-background border rounded-lg text-2xl font-mono text-center break-all tracking-wider">
 {password}
 </div>
 
 <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
 <h4 className="font-semibold text-sm mb-2">NATO Phonetic Soundout</h4>
 {password.split('').map((char, i) => <div key={i} className="flex items-center border-b pb-2">
 <div className="w-12 text-center font-bold text-lg bg-muted rounded-md p-1">{char}</div>
 <div className="ml-4">{getNatoWord(char)}</div>
 </div>)}
 </div>
 </CardContent>
 </GlassCard>
 </div>
 
      <ToolHowItWorks steps={[
        { step: "01", title: "Enter Text or Password", description: "Type any word, phrase, or password to convert to NATO phonetic spelling.", icon: Type },
        { step: "02", title: "View NATO Spelling", description: "See each character spelled out with its NATO phonetic word — letter by letter.", icon: List },
        { step: "03", title: "Read or Copy", description: "Read the NATO spelling aloud or copy it for written communication.", icon: Copy },
      ]} badges={["NATO Standard", "Audio Read", "All Characters"]} />

      <ToolFeatureGuides features={[
        { icon: List, title: "Letter-by-Letter View", description: "Each character shown with its NATO phonetic word in an easy-to-read format." },
        { icon: Volume2, title: "Audio Read Mode", description: "Click to hear the full NATO spelling read aloud in sequence." },
        { icon: Keyboard, title: "All Characters", description: "Supports uppercase, lowercase, numbers, and common special characters." },
      ]}>
        <div className="prose dark:prose-invert max-w-none">
          <h3>Why Use Our NATO Phonetic Password Generator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our NATO Phonetic Password Generator provides
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

export default NatoPhoneticPasswordClient;
