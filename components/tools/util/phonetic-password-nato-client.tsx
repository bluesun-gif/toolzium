"use client";

import { ToolBackground } from"@/components/shared/tool-background";

import { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ActionButton, CopyButton } from "@/components/shared/action-buttons";
import { Copy, Lock, RefreshCw, Settings, Shield, Sparkles, Volume2, Zap } from "lucide-react";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
const natoAlphabet: Record<string, string> = {
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
  z: "Zulu",
  "0": "Zero",
  "1": "One",
  "2": "Two",
  "3": "Three",
  "4": "Four",
  "5": "Five",
  "6": "Six",
  "7": "Seven",
  "8": "Eight",
  "9": "Nine"
};
export function PhoneticPasswordClient() {
  const [length, setLength] = useState(12);
  const [useUpper, setUseUpper] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(false);
  const [password, setPassword] = useState("");
  const generatePassword = () => {
    const lowers = "abcdefghijklmnopqrstuvwxyz";
    const uppers = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*";
    let chars = lowers;
    if (useUpper) chars += uppers;
    if (useNumbers) chars += numbers;
    if (useSymbols) chars += symbols;
    let res = "";
    for (let i = 0; i < length; i++) {
      res += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(res);
  };
  useEffect(() => {
    generatePassword();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getBreakdown = () => {
    return password.split('').map(char => {
      const lowerChar = char.toLowerCase();
      const nato = natoAlphabet[lowerChar] || "Symbol";
      const isUpper = char >= 'A' && char <= 'Z';
      const type = char >= '0' && char <= '9' ? "Number" : nato === "Symbol" ? "Symbol" : isUpper ? "Uppercase" : "Lowercase";
      return {
        char,
        nato,
        type,
        isUpper
      };
    });
  };
  const calculateEntropy = () => {
    let pool = 26;
    if (useUpper) pool += 26;
    if (useNumbers) pool += 10;
    if (useSymbols) pool += 8;
    return Math.floor(password.length * Math.log2(pool));
  };
  const getCopyText = () => {
    let text = "Password:" + password + "\n\nPhonetic Guide:\n";
    getBreakdown().forEach(item => {
      text += item.char + "-" + (item.isUpper ? "Capital" : "") + item.nato + "\n";
    });
    return text;
  };
  const breakdown = getBreakdown();
  const entropy = calculateEntropy();
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

 <ToolPageHeader icon={Lock} title="Phonetic Password Generator" description="Generate strong passwords with a NATO phonetic guide for easy verbal communication." actions={<>
 <ActionButton onClick={generatePassword} icon={RefreshCw} label="Regenerate" />
 <CopyButton getText={getCopyText} label="Copy All" />
 </>} />
 
 <div className={"grid md:grid-cols-3 gap-6"}>
 <div className={"space-y-6"}>
 <GlassCard>
 <CardHeader>
 <CardTitle>Settings</CardTitle>
 </CardHeader>
 <CardContent className={"space-y-4"}>
 <div className={"space-y-2"}>
 <Label>Length ({length})</Label>
 <Input type="range" min="8" max="32" value={length} onChange={e => setLength(Number(e.target.value))} onMouseUp={generatePassword} onTouchEnd={generatePassword} />
 </div>
 <div className={"flex items-center justify-between"}>
 <Label className={"cursor-pointer"}>Uppercase (A-Z)</Label>
 <Switch checked={useUpper} onCheckedChange={v => {
                  setUseUpper(v);
                  setTimeout(generatePassword, 50);
                }} />
 </div>
 <div className={"flex items-center justify-between"}>
 <Label className={"cursor-pointer"}>Numbers (0-9)</Label>
 <Switch checked={useNumbers} onCheckedChange={v => {
                  setUseNumbers(v);
                  setTimeout(generatePassword, 50);
                }} />
 </div>
 <div className={"flex items-center justify-between"}>
 <Label className={"cursor-pointer"}>Symbols (!@#$)</Label>
 <Switch checked={useSymbols} onCheckedChange={v => {
                  setUseSymbols(v);
                  setTimeout(generatePassword, 50);
                }} />
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle className={"flex items-center gap-2"}>
 <Shield className={"h-5 w-5"} /> Security Strength
 </CardTitle>
 </CardHeader>
 <CardContent>
 <div className={"text-3xl font-bold"}>{entropy} bits</div>
 <div className={"text-sm text-muted-foreground mt-1"}>
 {entropy < 50 ? "Weak" : entropy < 80 ? "Strong" : "Very Strong"}
 </div>
 </CardContent>
 </GlassCard>
 </div>

 <div className={"md:col-span-2 space-y-6"}>
 <GlassCard className={"border-primary/50"}>
 <CardContent className={"p-6 flex flex-col items-center justify-center space-y-4"}>
 <div className={"text-4xl tracking-widest font-mono text-center break-all select-all"}>
 {password}
 </div>
 <CopyButton getText={() => password} label="Copy Password Only" />
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>NATO Phonetic Guide</CardTitle>
 <CardDescription>Read this aloud to communicate the password accurately.</CardDescription>
 </CardHeader>
 <CardContent>
 <div className={"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2"}>
 {breakdown.map((item, i) => <div key={i} className={"flex items-center gap-3 p-2 rounded-md bg-muted/50 border"}>
 <div className={"font-mono font-bold text-lg w-6 text-center"}>{item.char}</div>
 <div className={"flex flex-col"}>
 <span className={"font-semibold text-sm"}>{item.nato}</span>
 <span className={"text-[10px] text-muted-foreground uppercase tracking-wider"}>{item.isUpper ? "Capital" : item.type}</span>
 </div>
 </div>)}
 </div>
 </CardContent>
 </GlassCard>
 </div>
 </div>
 
      <ToolHowItWorks steps={[
        { step: "01", title: "Generate Password", description: "Generate a strong random password of your chosen length and complexity.", icon: RefreshCw },
        { step: "02", title: "Get NATO Spelling", description: "See the password automatically spelled out in NATO phonetic alphabet — ready to dictate.", icon: Volume2 },
        { step: "03", title: "Copy & Use", description: "Copy the password and its NATO spelling for secure verbal communication.", icon: Copy },
      ]} badges={["NATO + Password", "Verbal Ready", "Strong Random"]} />

      <ToolFeatureGuides features={[
        { icon: Lock, title: "Strong Password Generation", description: "Generates cryptographically secure random passwords with your chosen character sets." },
        { icon: Volume2, title: "Instant NATO Spelling", description: "Every generated password is immediately shown in NATO phonetic format — no extra step." },
        { icon: Shield, title: "Verbal Communication", description: "Share passwords verbally without ambiguity — no more 'is that a 1 or an l?'" },
      ]}>
        <div className="prose dark:prose-invert max-w-none">
          <h3>Why Use Our Phonetic Password Generator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Phonetic Password Generator provides
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

export default PhoneticPasswordClient;
