"use client";

import { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { CopyButton, ActionButton } from "@/components/shared/action-buttons";
import { Lock, Shield, RefreshCw } from "lucide-react";

const NATO_ALPHABET: Record<string, string> = {
  a: "alpha", b: "bravo", c: "charlie", d: "delta", e: "echo", f: "foxtrot",
  g: "golf", h: "hotel", i: "india", j: "juliett", k: "kilo", l: "lima",
  m: "mike", n: "november", o: "oscar", p: "papa", q: "quebec", r: "romeo",
  s: "sierra", t: "tango", u: "uniform", v: "victor", w: "whiskey", x: "x-ray",
  y: "yankee", z: "zulu"
};

const SYMBOL_NAMES: Record<string, string> = {
  "!": "exclamation", "@": "at", "#": "hash", "$": "dollar", "%": "percent",
  "^": "caret", "&": "ampersand", "*": "asterisk", "-": "dash", "_": "underscore",
  "+": "plus", "=": "equals", "?": "question", ".": "dot"
};

export function PhoneticPasswordClient() {
  const [length, setLength] = useState(12);
  const [useUpper, setUseUpper] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  
  const [password, setPassword] = useState("");
  const [phonetic, setPhonetic] = useState("");
  const [entropy, setEntropy] = useState(0);

  const generatePassword = () => {
    let charset = "abcdefghijklmnopqrstuvwxyz";
    let poolSize = 26;
    
    if (useUpper) { charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; poolSize += 26; }
    if (useNumbers) { charset += "0123456789"; poolSize += 10; }
    if (useSymbols) { charset += "!@#$%^&*-_+=?."; poolSize += 14; }

    let result = "";
    const crypto = window.crypto;
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    
    for (let i = 0; i < length; i++) {
      result += charset[array[i] % charset.length];
    }

    // calculate entropy
    const bits = Math.floor(length * Math.log2(poolSize));
    
    // generate phonetic
    const phonetics = result.split("").map(char => {
      if (/[a-zA-Z]/.test(char)) {
        const isUpper = char === char.toUpperCase();
        const word = NATO_ALPHABET[char.toLowerCase()];
        return isUpper ? word.charAt(0).toUpperCase() + word.slice(1) : word;
      }
      if (/[0-9]/.test(char)) {
        return char;
      }
      return SYMBOL_NAMES[char] || char;
    });

    setPassword(result);
    setEntropy(bits);
    setPhonetic(phonetics.join("-"));
  };

  useEffect(() => {
    generatePassword();
  }, [length, useUpper, useNumbers, useSymbols]);

  const getCrackingTime = (bits: number) => {
    if (bits < 40) return "Instantly";
    if (bits < 60) return "Days";
    if (bits < 80) return "Years";
    if (bits < 100) return "Centuries";
    return "Eons";
  };

  return (
    <div className="space-y-6">
      <ToolPageHeader
        title="Phonetic Pronunciation Password Generator"
        description="Generate strong, memorable passwords with NATO phonetic pronunciation guides."
        icon={Lock}
        actions={
          <>
            <ActionButton onClick={generatePassword} label="Regenerate" icon={RefreshCw} />
          </>
        }
      />

      <div className="grid md:grid-cols-2 gap-6">
        <GlassCard>
          <CardHeader>
            <CardTitle>Options</CardTitle>
            <CardDescription>Customize your password requirements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Length: {length}</Label>
              </div>
              <Input 
                type="range" 
                min="8" max="32" 
                value={length} 
                onChange={(e) => setLength(parseInt(e.target.value))}
              />
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Include Uppercase</Label>
                <Switch checked={useUpper} onCheckedChange={setUseUpper} />
              </div>
              <div className="flex items-center justify-between">
                <Label>Include Numbers</Label>
                <Switch checked={useNumbers} onCheckedChange={setUseNumbers} />
              </div>
              <div className="flex items-center justify-between">
                <Label>Include Symbols</Label>
                <Switch checked={useSymbols} onCheckedChange={setUseSymbols} />
              </div>
            </div>
          </CardContent>
        </GlassCard>

        <GlassCard>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Shield className="w-5 h-5" /> Result</CardTitle>
            <CardDescription>Your generated password</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Password</Label>
                <CopyButton getText={() => password} label="Copy" />
              </div>
              <div className="p-4 bg-muted/50 rounded-lg border font-mono text-xl text-center break-all">
                {password}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Phonetic Guide</Label>
                <CopyButton getText={() => phonetic} label="Copy Guide" />
              </div>
              <div className="p-4 bg-muted/50 rounded-lg border text-sm font-medium break-words leading-relaxed">
                {phonetic}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-background rounded border text-center">
                <div className="text-xs text-muted-foreground mb-1">Entropy</div>
                <div className="font-bold">{entropy} bits</div>
              </div>
              <div className="p-3 bg-background rounded border text-center">
                <div className="text-xs text-muted-foreground mb-1">Crack Time</div>
                <div className="font-bold">{getCrackingTime(entropy)}</div>
              </div>
            </div>
          </CardContent>
        </GlassCard>
      </div>
    </div>
  );
}
