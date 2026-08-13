"use client";

import {
 ActionButton,
 CopyButton,
 ExportTextButton,
 ResetButton,
} from"@/components/shared/action-buttons";
import InputField from"@/components/shared/form-fields/input-field";
import SwitchRow from"@/components/shared/form-fields/switch-row";
import TextareaField from"@/components/shared/form-fields/textarea-field";
import Stat from"@/components/shared/stat";
import ToolPageHeader from"@/components/shared/tool-page-header";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { Key, ShieldAlert, ShieldCheck, Lock, Sliders, Copy, Download, Sparkles } from"lucide-react";
import { useCallback, useEffect, useMemo, useState } from"react";
import toast from"react-hot-toast";

import { CardContent, CardDescription, CardHeader, CardTitle } from"@/components/ui/card";
import { GlassCard } from"@/components/ui/glass-card";
import { Separator } from"@/components/ui/separator";
import { trackToolConversion, trackToolUsage } from"@/lib/gtm";
import { GridPattern } from"@/components/magicui/grid-pattern";
import {
 buildCharset,
 DEFAULT_SYMBOLS,
 ensureAtLeastOneFromEach,
 entropyBits,
 strengthLabel,
} from"@/lib/utils/dev/password-generator";

export default function PasswordGeneratorClient() {
 const [length, setLength] = useState<number>(16);
 const [count, setCount] = useState<number>(12);
 const [flags, setFlags] = useState<GenFlags>({
 upper: true,
 lower: true,
 numbers: true,
 symbols: true,
 excludeAmbiguous: true,
 requireEachSet: true,
 });
 const [customSymbols, setCustomSymbols] = useState<string>(DEFAULT_SYMBOLS);
 const [autoRun, setAutoRun] = useState<boolean>(true);
 const [passwords, setPasswords] = useState<string[]>([]);

 const charset = useMemo(() => buildCharset(flags, customSymbols), [flags, customSymbols]);
 const bits = useMemo(() => entropyBits(length, charset.length), [length, charset.length]);
 const strength = useMemo(() => strengthLabel(bits), [bits]);

 const run = useCallback(() => {
 trackToolUsage("Password Generator","Developer");
 const out: string[] = [];
 for (let i = 0; i < Math.max(1, count); i++) {
 out.push(ensureAtLeastOneFromEach(Math.max(4, length), flags, charset, customSymbols));
 }
 setPasswords(out);
 trackToolConversion("Password Generator","generated");
 }, [count, length, flags, charset, customSymbols]);

 useEffect(() => {
 if (autoRun) {
 run();
 }
 }, [autoRun, run]);

 function resetAll() {
 setLength(16);
 setCount(12);
 setFlags({
 upper: true,
 lower: true,
 numbers: true,
 symbols: true,
 excludeAmbiguous: true,
 requireEachSet: true,
 });
 setCustomSymbols(DEFAULT_SYMBOLS);
 setPasswords([]);
 setAutoRun(true);
 toast.success("Password Generator reset");
 }

 const allText = useMemo(() => passwords.join("\n"), [passwords]);

 const steps = [
 {
 step:"01",
 title:"Set Length & Rules",
 description:"Choose password length (12-64+ chars) and toggle uppercase, lowercase, numbers, symbols, and ambiguous char rules.",
 icon: Sliders,
 },
 {
 step:"02",
 title:"Instant Cryptographic Entropy",
 description:"Live calculation of mathematical entropy (bits). Passwords generated using Web Crypto API getRandomValues().",
 icon: Lock,
 },
 {
 step:"03",
 title:"Copy or Export",
 description:"Copy individual passwords with 1-click or export batch generated passwords directly to a secure .txt file.",
 icon: Download,
 },
 ];

 const features = [
 {
 title:"Cryptographically Secure (PRNG)",
 description:"Uses window.crypto.getRandomValues() for CSPRNG randomness, preventing predictable pattern attacks.",
 icon: Lock,
 },
 {
 title:"Live Entropy Calculation",
 description:"Displays exact mathematical entropy in bits (e.g. 95+ bits) so you know if your password is brute-force proof.",
 icon: ShieldCheck,
 },
 {
 title:"Exclude Ambiguous Characters",
 description:"Optionally remove confusing characters like 0 vs O, 1 vs l vs I, and quotes for error-free manual typing.",
 icon: Sliders,
 },
 {
 title:"Batch Generation & Export",
 description:"Generate up to 100 passwords simultaneously with 1-click individual copies or complete text file export.",
 icon: Copy,
 },
 {
 title:"Custom Symbol Palette",
 description:"Customize allowed special symbols (!@#$%^&*) to comply with strict corporate or banking password policies.",
 icon: Sparkles,
 },
 {
 title:"100% In-Browser Privacy",
 description:"Generated 100% client-side in your browser memory. Nothing is ever sent to, logged, or saved on any server.",
 icon: ShieldAlert,
 },
 ];

 const faqs = [
 {
 question:"What makes a password cryptographically secure?",
 answer:"A secure password relies on high randomness and length. Standard Math.random() in JavaScript is pseudo-random and predictable. Toolzium uses crypto.getRandomValues(), an industry-standard Cryptographically Secure Pseudorandom Number Generator (CSPRNG).",
 },
 {
 question:"What is password entropy and how many bits do I need?",
 answer:"Entropy measures how unpredictable a password is in bits. Passwords under 40 bits are weak. 60–80 bits are strong for everyday accounts. 90+ bits (like a 16-character mixed password) require billions of years to crack via modern GPU brute force.",
 },
 {
 question:"Are generated passwords logged or saved anywhere?",
 answer:"Never. All generation happens strictly inside your computer's RAM using local JavaScript. Nothing is transmitted over the network or saved anywhere.",
 },
 {
 question:"Why should I exclude ambiguous characters?",
 answer:"Characters like capital 'O' and zero '0', lowercase 'l' and number '1', or uppercase 'I' look identical in many fonts. Excluding ambiguous characters prevents typing mistakes when logging in on mobile devices.",
 },
 {
 question:"How long should my passwords be?",
 answer:"We recommend a minimum of 16 characters with mixed uppercase, lowercase, numbers, and symbols. For master passwords or passphrases, 20+ characters offer maximum long-term security.",
 },
 ];

 return (
 <>
 {/* SECTION 1: HEADER */}
 <ToolPageHeader
 icon={Key}
 title="Free Strong Password Generator & Entropy Checker"
 description="Generate cryptographically secure, uncrackable random passwords. Calculate live entropy bits, customize character sets, and export batch passwords."
 actions={
 <>
 <ResetButton onClick={resetAll} />
 <CopyButton
 getText={() => allText}
 disabled={!allText}
 label="Copy All"
 />
 <ExportTextButton
 filename="passwords.txt"
 getText={() => allText ||""}
 disabled={!allText}
 />
 <ActionButton variant="default"label="Generate"icon={Key} onClick={run} />
 </>
 }
 />

 {/* Quick Stats */}
 <div className="mb-4 grid gap-3 sm:grid-cols-4">
      <GridPattern />

 <Stat label="Batch Count"value={count} />
 <Stat label="Password Length"value={`${length} chars`} />
 <Stat label="Charset Pool"value={`${charset.length} chars`} hint="available characters"/>
 <Stat
 label="Entropy"
 value={`${bits.toFixed(1)} bits`}
 hint={strength.label}
 Icon={strength.tone ==="warn"? ShieldAlert : ShieldCheck}
 />
 </div>

 {/* SECTION 2: PRIMARY WORKSPACE */}
 <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
 {/* Left Column: Settings */}
 <GlassCard className="p-4 sm:p-5">
 <CardHeader className="px-0 pt-0">
 <CardTitle className="text-base font-semibold">Password Rules & Options</CardTitle>
 <CardDescription>Adjust length, count, and character sets.</CardDescription>
 </CardHeader>
 <CardContent className="px-0 space-y-4">
 <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
 <InputField
 label="Length (chars)"
 type="number"
 min={4}
 max={128}
 value={String(length)}
 onChange={(e) => setLength(Math.min(128, Math.max(4, Number(e.target.value) || 4)))}
 />
 <InputField
 label="Batch Count"
 type="number"
 min={1}
 max={100}
 value={String(count)}
 onChange={(e) => setCount(Math.min(100, Math.max(1, Number(e.target.value) || 1)))}
 />
 </div>

 <SwitchRow
 label="Uppercase (A–Z)"
 checked={flags.upper}
 onCheckedChange={(v) => setFlags((f) => ({ ...f, upper: Boolean(v) }))}
 />
 <SwitchRow
 label="Lowercase (a–z)"
 checked={flags.lower}
 onCheckedChange={(fVal) => setFlags((f) => ({ ...f, lower: Boolean(fVal) }))}
 />
 <SwitchRow
 label="Numbers (0–9)"
 checked={flags.numbers}
 onCheckedChange={(v) => setFlags((f) => ({ ...f, numbers: Boolean(v) }))}
 />
 <SwitchRow
 label="Special Symbols (!@#$)"
 checked={flags.symbols}
 onCheckedChange={(v) => setFlags((f) => ({ ...f, symbols: Boolean(v) }))}
 />
 <TextareaField
 label="Custom Symbol Pool"
 value={customSymbols}
 onValueChange={setCustomSymbols}
 textareaClassName="min-h-[50px] font-mono text-xs"
 placeholder={DEFAULT_SYMBOLS}
 disabled={!flags.symbols}
 />

 <Separator />

 <SwitchRow
 label="Exclude Ambiguous (0/O, 1/l/I)"
 hint="Prevents lookalike characters for easy typing."
 checked={flags.excludeAmbiguous}
 onCheckedChange={(v) => setFlags((f) => ({ ...f, excludeAmbiguous: Boolean(v) }))}
 />
 <SwitchRow
 label="Require At Least 1 From Each Set"
 checked={flags.requireEachSet}
 onCheckedChange={(v) => setFlags((f) => ({ ...f, requireEachSet: Boolean(v) }))}
 />

 <Separator />

 <SwitchRow
 label="Auto-Generate on Change"
 checked={autoRun}
 onCheckedChange={(v) => setAutoRun(Boolean(v))}
 />
 </CardContent>
 </GlassCard>

 {/* Right Column: Output Password List */}
 <GlassCard className="p-4 sm:p-5 shadow-sm lg:col-span-2 flex flex-col justify-between">
 <div>
 <CardHeader className="px-0 pt-0">
 <CardTitle className="text-base font-semibold">Generated Passwords</CardTitle>
 <CardDescription>Click any password row or copy button to save to clipboard.</CardDescription>
 </CardHeader>
 <CardContent className="px-0 grid gap-2.5 sm:grid-cols-2">
 {passwords.length === 0 ? (
 <div className="col-span-2 rounded-md border p-6 text-center text-sm text-muted-foreground">
 No passwords generated yet. Click <em>Generate</em> button above.
 </div>
 ) : null}
 {passwords.map((pwd, i) => (
 <div
 key={`pwd-${i}`}
 className="flex items-center justify-between rounded-lg border bg-muted/20 p-2.5 hover:border-primary/50 transition-colors group"
 >
 <span className="font-mono text-xs sm:text-sm font-semibold text-foreground break-all tracking-wide select-all">
 {pwd}
 </span>
 <CopyButton
 size="sm"
 getText={() => pwd}
 />
 </div>
 ))}
 </CardContent>
 </div>

 <div className="pt-4 flex items-center justify-between text-xs text-muted-foreground border-t">
 <span>🔒 Generated with crypto.getRandomValues()</span>
 <span>{passwords.length} passwords ready</span>
 </div>
 </GlassCard>
 </div>

 {/* SECTION 3: HOW IT WORKS */}
 <ToolHowItWorks
 title="How to Generate Secure Passwords"
 subtitle="Create unhackable, high-entropy passwords in 3 fast steps."
 steps={steps}
 />

 {/* SECTION 4: FEATURE HIGHLIGHTS & DEEP SEO GUIDE */}
 <ToolFeatureGuides features={features}>
 <div className="space-y-4 text-sm sm:text-base leading-relaxed">
 <h3 className="text-lg font-bold text-foreground">
 Complete Guide: Why Strong Passwords Matter & How to Create Them
 </h3>
 <p>
 In today's digital landscape, compromised credentials are the leading cause of data breaches globally. Relying on simple passwords, dictionary words, or variations of the same password across multiple platforms leaves your accounts vulnerable to automated attacks. Cybercriminals routinely deploy credential stuffing attacks—where leaked usernames and passwords from one breach are automatically tested against thousands of other sites. 
 </p>
 <p>
 If you reuse passwords, a single breach on a low-security website can instantly compromise your email, banking, and social media accounts. Toolzium's Password Generator is engineered to mitigate these risks by generating high-entropy, zero-bias passwords that withstand modern cracking algorithms.
 </p>

 <h4 className="text-base font-semibold text-foreground pt-2">What Makes a Password Strong?</h4>
 <p>
 A strong password is defined by two primary factors: <strong>length</strong> and <strong>complexity</strong>. While complexity (using a mix of uppercase, lowercase, numbers, and symbols) expands the pool of potential characters, length is the most critical factor in determining mathematical strength, known as entropy. 
 </p>
 <p>
 <strong>Entropy</strong> is a measure of unpredictability, calculated in bits. The higher the entropy, the more difficult a password is to guess. According to NIST (National Institute of Standards and Technology) 2024 guidelines, passwords should be long, randomly generated, and completely unique to each service. They no longer recommend arbitrary expiration dates, provided the password is sufficiently strong and uncompromised.
 </p>

 <h4 className="text-base font-semibold text-foreground pt-2">Password Entropy Reference Table</h4>
 <p>
 The table below illustrates how entropy bits correlate to password strength and the estimated time required for a modern GPU cluster to crack the password via brute-force attack:
 </p>
 <div className="overflow-x-auto rounded-lg border my-2">
 <table className="w-full text-xs sm:text-sm text-left">
 <thead className="bg-muted/60">
 <tr className="[&>th]:px-3 [&>th]:py-2 font-semibold">
 <th>Entropy (bits)</th>
 <th>Strength Rating</th>
 <th>Time to Crack (GPU)</th>
 <th>Example</th>
 </tr>
 </thead>
 <tbody>
 <tr className="border-t">
 <td className="px-3 py-2 font-mono text-red-500 font-bold">&lt; 28</td>
 <td className="px-3 py-2">Very Weak</td>
 <td className="px-3 py-2">Instantaneous</td>
 <td className="px-3 py-2 font-mono">password123</td>
 </tr>
 <tr className="border-t">
 <td className="px-3 py-2 font-mono text-orange-500 font-bold">28 - 35</td>
 <td className="px-3 py-2">Weak</td>
 <td className="px-3 py-2">Minutes to hours</td>
 <td className="px-3 py-2 font-mono">Monkey99</td>
 </tr>
 <tr className="border-t">
 <td className="px-3 py-2 font-mono text-yellow-500 font-bold">36 - 59</td>
 <td className="px-3 py-2">Reasonable</td>
 <td className="px-3 py-2">Days to months</td>
 <td className="px-3 py-2 font-mono">Tig3r!Woods</td>
 </tr>
 <tr className="border-t">
 <td className="px-3 py-2 font-mono text-emerald-500 font-bold">60 - 127</td>
 <td className="px-3 py-2">Strong</td>
 <td className="px-3 py-2">Centuries</td>
 <td className="px-3 py-2 font-mono">k7$vP9@zQw#2</td>
 </tr>
 <tr className="border-t">
 <td className="px-3 py-2 font-mono text-primary font-bold">128+</td>
 <td className="px-3 py-2">Very Strong</td>
 <td className="px-3 py-2">Trillions of years</td>
 <td className="px-3 py-2 font-mono">mQ8!pW2$vN5^kL9@xR4*jT7</td>
 </tr>
 </tbody>
 </table>
 </div>

 <h4 className="text-base font-semibold text-foreground pt-2">CSPRNG vs Math.random()</h4>
 <p>
 Not all random password generators are created equal. Many poorly designed tools rely on standard programming functions like <code>Math.random()</code> in JavaScript. These functions are <strong>pseudo-random</strong> and can be predictable if an attacker observes enough outputs, making them highly unsuitable for cryptographic security.
 </p>
 <p>
 To guarantee true unpredictability, Toolzium's generator utilizes <code>window.crypto.getRandomValues()</code>. This is a Cryptographically Secure Pseudorandom Number Generator (CSPRNG). It taps into your device's operating system to gather true entropy (such as mouse movements or hardware noise) ensuring that the generated passwords cannot be mathematically reverse-engineered.
 </p>

 <h4 className="text-base font-semibold text-foreground pt-2">Common Password Mistakes to Avoid</h4>
 <ul className="list-disc pl-5 space-y-1.5">
 <li><strong>Dictionary Words & Phrases:</strong> Attackers use"dictionary attacks"that try millions of common words and phrases per second. A password like"PurpleElephant"is much weaker than a truly random string.</li>
 <li><strong>Personal Information:</strong> Never include names, birthdays, pet names, or sports teams. This information is easily scraped from social media for targeted attacks.</li>
 <li><strong>Predictable Patterns & Padding:</strong> Using keyboard walks like"qwerty"or"123456", or padding a weak password with a capital letter and an exclamation mark at the end (e.g.,"Password123!") defeats the purpose of true randomness.</li>
 </ul>

 <h4 className="text-base font-semibold text-foreground pt-2">Password Manager Best Practices</h4>
 <p>
 Remembering dozens of highly complex, 16-character passwords is impossible for a human. This is why adopting a password manager is essential for modern digital hygiene. 
 </p>
 <p>
 We recommend the following workflow for ultimate security:
 </p>
 <ul className="list-disc pl-5 space-y-1.5">
 <li><strong>Generate:</strong> Use our tool to generate a unique, high-entropy password for a specific account.</li>
 <li><strong>Store:</strong> Save this new credential immediately into a reputable, encrypted password vault (such as Bitwarden or 1Password).</li>
 <li><strong>Autofill:</strong> Rely on the password manager's browser extension to autofill credentials, which also protects you from phishing sites that try to steal your login info.</li>
 </ul>
 <p>
 Finally, secure your password manager itself with a formidable <strong>Master Password</strong>. This should be a long, memorable passphrase (like 4-5 random words generated by a diceware method) and backed by robust Multi-Factor Authentication (MFA). Since your master password is the key to your entire digital life, its entropy should be incredibly high.
 </p>
 </div>
 </ToolFeatureGuides>

 {/* SECTION 5: FAQ & RELATED TOOLS */}
 <ToolFaqAccordion faqs={faqs} />

 <RelatedTools currentToolUrl="/tools/dev/password-generator" max={6} />
 </>
 );
}
