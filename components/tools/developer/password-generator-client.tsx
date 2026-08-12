"use client";

import React, { useState, useMemo, useCallback } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { CopyButton } from"@/components/shared/action-buttons";
import toast from"react-hot-toast";
import { Lock, Shield, Key, RefreshCw } from"lucide-react";

const cardClass ="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass ="border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass ="text-xs sm:text-sm font-semibold flex items-center gap-2";

const CHARSETS = {
 uppercase:"ABCDEFGHIJKLMNOPQRSTUVWXYZ",
 lowercase:"abcdefghijklmnopqrstuvwxyz",
 numbers:"0123456789",
 symbols:"!@#$%^&*()_+-=[]{}|;:,.<>?",
};

function secureRandomInt(max: number): number {
 const array = new Uint32Array(1);
 crypto.getRandomValues(array);
 return array[0] % max;
}

function generatePassword(
 length: number,
 useUpper: boolean,
 useLower: boolean,
 useNumbers: boolean,
 useSymbols: boolean
): string {
 let pool ="";
 if (useUpper) pool += CHARSETS.uppercase;
 if (useLower) pool += CHARSETS.lowercase;
 if (useNumbers) pool += CHARSETS.numbers;
 if (useSymbols) pool += CHARSETS.symbols;
 if (!pool) return"";

 let password ="";
 for (let i = 0; i < length; i++) {
 password += pool[secureRandomInt(pool.length)];
 }
 return password;
}

function evaluateStrength(
 length: number,
 useUpper: boolean,
 useLower: boolean,
 useNumbers: boolean,
 useSymbols: boolean
): { label: string; color: string; percent: number } {
 let poolSize = 0;
 if (useUpper) poolSize += 26;
 if (useLower) poolSize += 26;
 if (useNumbers) poolSize += 10;
 if (useSymbols) poolSize += 26;
 if (poolSize === 0) return { label:"None", color:"bg-muted", percent: 0 };

 const entropy = length * Math.log2(poolSize);
 let label: string;
 let color: string;
 let percent: number;

 if (entropy < 40) {
 label ="Weak";
 color ="bg-red-500";
 percent = 25;
 } else if (entropy < 60) {
 label ="Fair";
 color ="bg-orange-500";
 percent = 50;
 } else if (entropy < 90) {
 label ="Strong";
 color ="bg-lime-500";
 percent = 75;
 } else {
 label ="Very Strong";
 color ="bg-green-500";
 percent = 100;
 }

 return { label, color, percent };
}

export default function PasswordGeneratorClient() {
 const [length, setLength] = useState(16);
 const [useUpper, setUseUpper] = useState(true);
 const [useLower, setUseLower] = useState(true);
 const [useNumbers, setUseNumbers] = useState(true);
 const [useSymbols, setUseSymbols] = useState(true);
 const [password, setPassword] = useState("");

 const strength = useMemo(
 () => evaluateStrength(length, useUpper, useLower, useNumbers, useSymbols),
 [length, useUpper, useLower, useNumbers, useSymbols]
 );

 const handleGenerate = useCallback(() => {
 if (!useUpper && !useLower && !useNumbers && !useSymbols) {
 toast.error("Select at least one character type.");
 return;
 }
 const pwd = generatePassword(length, useUpper, useLower, useNumbers, useSymbols);
 setPassword(pwd);
 toast.success("Password generated");
 }, [length, useUpper, useLower, useNumbers, useSymbols]);

 return (
 <div className="max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6">
 <ToolPageHeader
 icon={Lock}
 title="Secure Password Generator"
 description="Generate cryptographically strong random passwords using your browser's secure random API."
 />

 <Card className={cardClass}>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <Key className="w-4 h-4 text-primary"/> Generator Settings
 </CardTitle>
 </CardHeader>
 <CardContent className="p-3 sm:p-4 space-y-5">
 <div className="space-y-2">
 <div className="flex items-center justify-between">
 <label className="text-sm font-medium">Length: <span className="font-bold">{length}</span></label>
 </div>
 <input
 type="range"
 min={8}
 max={64}
 value={length}
 onChange={(e) => setLength(parseInt(e.target.value, 10))}
 className="w-full accent-primary"
 />
 <div className="flex justify-between text-xs text-muted-foreground">
 <span>8</span>
 <span>64</span>
 </div>
 </div>

 <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
 {[
 { label:"Uppercase (A-Z)", value: useUpper, set: setUseUpper },
 { label:"Lowercase (a-z)", value: useLower, set: setUseLower },
 { label:"Numbers (0-9)", value: useNumbers, set: setUseNumbers },
 { label:"Symbols (!@#)", value: useSymbols, set: setUseSymbols },
 ].map((opt) => (
 <label
 key={opt.label}
 className="flex cursor-pointer items-center gap-2 rounded-lg border border-border/60 bg-background/60 p-3 text-sm hover:bg-muted/40"
 >
 <input
 type="checkbox"
 checked={opt.value}
 onChange={(e) => opt.set(e.target.checked)}
 className="h-4 w-4 accent-primary"
 />
 <span>{opt.label}</span>
 </label>
 ))}
 </div>

 <div className="space-y-2">
 <div className="flex items-center justify-between text-sm">
 <span className="font-medium">Strength:</span>
 <span className="font-semibold">{strength.label}</span>
 </div>
 <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
 <div
 className={`h-full ${strength.color} transition-all`}
 style={{ width: `${strength.percent}%` }}
 />
 </div>
 </div>

 <Button onClick={handleGenerate} className="w-full">
 <RefreshCw className="w-4 h-4 mr-2"/> Generate Password
 </Button>
 </CardContent>
 </Card>

 {password && (
 <Card className={cardClass}>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <Lock className="w-4 h-4 text-primary"/> Your Password
 </CardTitle>
 </CardHeader>
 <CardContent className="p-3 sm:p-4 space-y-3">
 <div className="rounded-lg border border-border/60 bg-muted/30 p-4 text-center">
 <code className="break-all font-mono text-lg sm:text-xl font-bold tracking-wider">
 {password}
 </code>
 </div>
 <div className="flex items-center justify-between text-xs text-muted-foreground">
 <span>{password.length} characters</span>
 <CopyButton getText={() => password} label="Copy Password"/>
 </div>
 </CardContent>
 </Card>
 )}

 <ToolHowItWorks
 steps={[
 { step:"01", title:"Set Length", description:"Choose a password length between 8 and 64 characters. Longer is always stronger.", icon: Lock },
 { step:"02", title:"Pick Character Sets", description:"Enable uppercase, lowercase, numbers, and symbols based on your requirements.", icon: Key },
 { step:"03", title:"Generate & Copy", description:"Click generate and copy the cryptographically secure password to your clipboard.", icon: Shield },
 ]}
 badges={["100% Free","Client-Side","Secure"]}
 />

 <ToolFeatureGuides
 features={[
 { icon: Lock, title:"CSPRNG", description:"Uses crypto.getRandomValues() for true cryptographic randomness, not Math.random()."},
 { icon: Shield, title:"Strength Meter", description:"Calculates password entropy to show Weak, Fair, Strong, or Very Strong ratings."},
 { icon: Key, title:"Customizable", description:"Full control over length and character sets to meet any password policy."},
 { icon: RefreshCw, title:"Private", description:"Passwords are generated locally and never transmitted to any server."},
 ]}
 >
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <p>Password strength is fundamentally a question of entropy — the number of possible combinations an attacker must try in a brute-force attack. Entropy is measured in bits and calculated as <code>length × log₂(pool_size)</code>. A password with 80 bits of entropy would require an attacker to try, on average, 2⁷⁹ combinations, which is computationally infeasible with current technology.</p>
 <p>This generator uses the Web Crypto API&apos;s <code>crypto.getRandomValues()</code> method, which is a cryptographically secure pseudo-random number generator (CSPRNG). Unlike <code>Math.random()</code>, which is a fast but predictable pseudo-random generator suitable only for games and simulations, CSPRNG output is designed to be unpredictable even to an attacker who knows the algorithm and has observed previous outputs. This is essential for security-critical applications like password generation.</p>
 <p>Current best practice from organizations like NIST recommends passwords of at least 12–16 characters that combine multiple character sets. For high-value accounts, aim for 20+ characters or use passphrases — several random words strung together. Even better, use a password manager that can generate and store unique 32+ character passwords for every account, freeing you from the burden of memorization while maximizing security.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion
 faqs={[
 { question:"Is Math.random() unsafe for passwords?", answer:"Yes. Math.random() is a predictable pseudo-random generator. An attacker who observes a few outputs can predict future values. Always use crypto.getRandomValues() for security purposes."},
 { question:"How long should my password be?", answer:"Minimum 12 characters for general use, 16+ for sensitive accounts. Longer passwords made of random words (passphrases) are often easier to remember and just as secure."},
 { question:"Are my passwords stored anywhere?", answer:"No. Passwords are generated locally in your browser memory. Nothing is transmitted, logged, or saved. Close the tab and the password is gone."},
 { question:"Should I use a password manager instead?", answer:"Yes. A password manager generates and stores unique strong passwords for every site, so you only need to remember one master password."},
 ]}
 />

 <RelatedTools currentToolUrl="/tools/developer/password-generator"max={6} />
 </div>
 );
}
