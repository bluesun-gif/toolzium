"use client";

import React, { useState, useEffect, useCallback } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Switch } from"@/components/ui/switch";
import { ActionButton, CopyButton } from"@/components/shared/action-buttons";
import { Lock, Shield, RefreshCw } from"lucide-react";

const NATO_ALPHABET: Record<string, string> = {
 a:"Alpha", b:"Bravo", c:"Charlie", d:"Delta", e:"Echo", f:"Foxtrot",
 g:"Golf", h:"Hotel", i:"India", j:"Juliett", k:"Kilo", l:"Lima",
 m:"Mike", n:"November", o:"Oscar", p:"Papa", q:"Quebec", r:"Romeo",
 s:"Sierra", t:"Tango", u:"Uniform", v:"Victor", w:"Whiskey",
 x:"X-ray", y:"Yankee", z:"Zulu"
};

const SYMBOLS ="!@#$%^&*()_+-=[]{}|;:,.<>?";

export function NatoPasswordReaderClient() {
 const [length, setLength] = useState(16);
 const [useNumbers, setUseNumbers] = useState(true);
 const [useUppercase, setUseUppercase] = useState(true);
 const [useSymbols, setUseSymbols] = useState(true);
 const [password, setPassword] = useState("");
 const [entropy, setEntropy] = useState(0);

 const generatePassword = useCallback(() => {
 let chars ="abcdefghijklmnopqrstuvwxyz";
 if (useUppercase) chars +="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
 if (useNumbers) chars +="0123456789";
 if (useSymbols) chars += SYMBOLS;

 let newPass ="";
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
 let res ="";
 for (let i = 0; i < password.length; i++) {
 const char = password[i];
 if (/[a-zA-Z]/.test(char)) {
 const isUpper = char === char.toUpperCase();
 const word = NATO_ALPHABET[char.toLowerCase()];
 res += (isUpper ?"Capital":"Lowercase") + word +"\n";
 } else {
 res += char +"\n";
 }
 }
 return res;
 };

 const getCopyText = () => {
 return"Password:\n"+ password +"\n\nPhonetic:\n"+ getNatoText();
 };

 return (
 <div className="space-y-6">
 <ToolPageHeader
 icon={Lock}
 title="NATO Password Generator"
 description="Generate secure passwords with phonetic spelling guides."
 actions={
 <div className="flex gap-2">
 <CopyButton getText={getCopyText} label="Copy All"/>
 <ActionButton onClick={generatePassword} icon={RefreshCw} label="Regenerate"/>
 </div>
 }
 />

 <div className="grid md:grid-cols-3 gap-6">
 <GlassCard className="md:col-span-1 h-fit">
 <CardHeader>
 <CardTitle>Settings</CardTitle>
 </CardHeader>
 <CardContent className="space-y-6">
 <div className="space-y-2">
 <Label>Length: {length}</Label>
 <Input
 type="range"
 min={8}
 max={32}
 value={length}
 onChange={(e) => setLength(parseInt(e.target.value))}
 />
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
 <Shield className={"w-5 h-5"+ (entropy >= 80 ?"text-green-500": entropy >= 50 ?"text-yellow-500":"text-red-500")} />
 <span className="font-semibold">Security</span>
 </div>
 <div className="text-sm text-muted-foreground">
 Entropy: {entropy} bits
 </div>
 <div className="text-sm text-muted-foreground">
 Time to crack: {entropy >= 80 ?"Centuries": entropy >= 50 ?"Years":"Instantly"}
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
 text = (isUpper ?"Capital":"Lower") + NATO_ALPHABET[char.toLowerCase()];
 }
 return (
 <div key={idx} className="flex items-center p-2 border rounded-md">
 <div className="w-8 h-8 flex items-center justify-center bg-primary/10 rounded font-bold mr-3 font-mono">
 {char}
 </div>
 <div className={"text-sm"+ (!isLetter ?"font-bold":"")}>
 {text}
 </div>
 </div>
 );
 })}
 </div>
 </div>
 </CardContent>
 </GlassCard>
 </div>
 </div>
 );
}
