"use client";

import React, { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { ActionButton, ResetButton } from"@/components/shared/action-buttons";
import { cn } from"@/lib/utils";
import { Shield, Lock, Eye, EyeOff, Copy, Sparkles, Zap } from"lucide-react";;
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

export function PasswordEntropyClient() {
 const [password, setPassword] = useState("");
 const [showPassword, setShowPassword] = useState(false);
 const [entropy, setEntropy] = useState(0);
 const [charSetSize, setCharSetSize] = useState(0);
 const [rating, setRating] = useState({ label:"None", color:"text-muted-foreground"});

 useEffect(() => {
 calculateEntropy(password);
 }, [password]);

 const calculateEntropy = (pwd: string) => {
 if (!pwd) {
 setEntropy(0);
 setCharSetSize(0);
 setRating({ label:"None", color:"text-muted-foreground"});
 return;
 }

 let n = 0;
 if (/[a-z]/.test(pwd)) n += 26;
 if (/[A-Z]/.test(pwd)) n += 26;
 if (/[0-9]/.test(pwd)) n += 10;
 if (/[^a-zA-Z0-9]/.test(pwd)) n += 32;

 setCharSetSize(n);
 const e = pwd.length * Math.log2(n || 1);
 setEntropy(e);

 if (e < 28) setRating({ label:"Very Weak", color:"text-red-500"});
 else if (e < 36) setRating({ label:"Weak", color:"text-orange-500"});
 else if (e < 60) setRating({ label:"Reasonable", color:"text-yellow-500"});
 else if (e < 128) setRating({ label:"Strong", color:"text-green-500"});
 else setRating({ label:"Invincible", color:"text-emerald-600"});
 };

 const formatTime = (seconds: number) => {
 if (seconds < 1) return"Less than a second";
 if (seconds < 60) return seconds.toFixed(0) +"seconds";
 if (seconds < 3600) return (seconds / 60).toFixed(0) +"minutes";
 if (seconds < 86400) return (seconds / 3600).toFixed(0) +"hours";
 if (seconds < 31536000) return (seconds / 86400).toFixed(0) +"days";
 if (seconds < 3153600000) return (seconds / 31536000).toFixed(0) +"years";
 return (seconds / 31536000).toExponential(2) +"years";
 };

 const combinations = Math.pow(charSetSize, password.length) || 0;
 const timeOnline = combinations / 10;
 const timeOfflineFast = combinations / 100000000000;
 const timeSupercomputer = combinations / 100000000000000;

 return (
 <div className="space-y-6">
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray="4 2"
        className="absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
      />

 <ToolPageHeader
 icon={Shield}
 title="Password Entropy Calculator"
 description="Analyze password security, information entropy, and estimated crack time."
 actions={<ResetButton onClick={() => setPassword("")} label="Reset"/>}
 />

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Input Password</CardTitle>
 <CardDescription>Type a password to analyze its strength</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="relative">
 <Input
 type={showPassword ?"text":"password"}
 value={password}
 onChange={(e) => setPassword(e.target.value)}
 placeholder="Enter password..."
 className="pr-10"
 />
 <Button
 type="button"
 variant="ghost"
 size="icon"
 className="absolute right-0 top-0 h-full px-3"
 onClick={() => setShowPassword(!showPassword)}
 >
 {showPassword ? <EyeOff className="h-4 w-4"/> : <Eye className="h-4 w-4"/>}
 </Button>
 </div>

 <div className="mt-6 space-y-4">
 <h4 className="font-semibold text-sm">Security Recommendations:</h4>
 <ul className="text-sm space-y-2">
 <li className={cn("flex items-center gap-2", (password.length >= 12 ?"text-green-500":"text-muted-foreground"))}>
 <div className={cn("w-2 h-2 rounded-full", (password.length >= 12 ?"bg-green-500":"bg-muted-foreground"))} />
 At least 12 characters
 </li>
 <li className={cn("flex items-center gap-2", (/[a-z]/.test(password) && /[A-Z]/.test(password) ?"text-green-500":"text-muted-foreground"))}>
 <div className={cn("w-2 h-2 rounded-full", (/[a-z]/.test(password) && /[A-Z]/.test(password) ?"bg-green-500":"bg-muted-foreground"))} />
 Uppercase and lowercase letters
 </li>
 <li className={cn("flex items-center gap-2", (/[0-9]/.test(password) ?"text-green-500":"text-muted-foreground"))}>
 <div className={cn("w-2 h-2 rounded-full", (/[0-9]/.test(password) ?"bg-green-500":"bg-muted-foreground"))} />
 Contains numbers
 </li>
 <li className={cn("flex items-center gap-2", (/[^a-zA-Z0-9]/.test(password) ?"text-green-500":"text-muted-foreground"))}>
 <div className={cn("w-2 h-2 rounded-full", (/[^a-zA-Z0-9]/.test(password) ?"bg-green-500":"bg-muted-foreground"))} />
 Contains symbols
 </li>
 </ul>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Analysis Results</CardTitle>
 <CardDescription>Mathematical entropy and estimated crack times</CardDescription>
 </CardHeader>
 <CardContent className="space-y-6">
 <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
 <span className="font-medium">Security Rating:</span>
 <span className={cn("font-bold text-lg", rating.color)}>{rating.label}</span>
 </div>

 <div className="grid grid-cols-2 gap-4">
 <div className="p-3 border rounded-md">
 <div className="text-xs text-muted-foreground mb-1">Entropy (Bits)</div>
 <div className="text-xl font-bold">{entropy.toFixed(1)}</div>
 </div>
 <div className="p-3 border rounded-md">
 <div className="text-xs text-muted-foreground mb-1">Char Set Size (N)</div>
 <div className="text-xl font-bold">{charSetSize}</div>
 </div>
 <div className="p-3 border rounded-md">
 <div className="text-xs text-muted-foreground mb-1">Length (L)</div>
 <div className="text-xl font-bold">{password.length}</div>
 </div>
 <div className="p-3 border rounded-md">
 <div className="text-xs text-muted-foreground mb-1">Combinations</div>
 <div className="text-lg font-bold">{combinations > 0 ? combinations.toExponential(2) : 0}</div>
 </div>
 </div>

 <Separator />

 <div className="space-y-3">
 <h4 className="font-semibold text-sm">Estimated Crack Time:</h4>
 <div className="space-y-2 text-sm">
 <div className="flex justify-between">
 <span className="text-muted-foreground">Online Attack (10/sec):</span>
 <span className="font-mono">{formatTime(timeOnline)}</span>
 </div>
 <div className="flex justify-between">
 <span className="text-muted-foreground">Offline Fast (100B/sec):</span>
 <span className="font-mono">{formatTime(timeOfflineFast)}</span>
 </div>
 <div className="flex justify-between">
 <span className="text-muted-foreground">Supercomputer (100T/sec):</span>
 <span className="font-mono">{formatTime(timeSupercomputer)}</span>
 </div>
 </div>
 </div>
 </CardContent>
 </GlassCard>
 </div>
 
      <ToolHowItWorks
        steps={[
          {
            step: "01",
            title: "Input Your Data",
            description: "Enter your information in the input field above and configure any options.",
            icon: Sparkles,
          },
          {
            step: "02",
            title: "Process & Generate",
            description: "The tool processes your input instantly and displays the results.",
            icon: Zap,
          },
          {
            step: "03",
            title: "Copy & Use",
            description: "Copy the output with one click and use it wherever you need.",
            icon: Copy,
          },
        ]}
        badges={["100% Free", "Instant Results", "Privacy-First"]}
      />

      <ToolFeatureGuides
        features={[
          {
            icon: Sparkles,
            title: "Lightning Fast",
            description: "Get results in milliseconds with our optimized client-side processing engine.",
          },
          {
            icon: Shield,
            title: "Completely Private",
            description: "All processing happens in your browser. Your data never leaves your device.",
          },
          {
            icon: Zap,
            title: "No Signup Required",
            description: "Use this tool instantly without creating an account or providing any personal information.",
          },
        ]}
      >
        <div className="prose dark:prose-invert max-w-none">
          <h3>Why Use Our Password Entropy Calculator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Password Entropy Calculator provides
            the functionality you need without any complexity or cost.
          </p>
          <p>
            Unlike server-based alternatives, everything runs locally in your browser, ensuring maximum
            privacy and zero latency. No data is ever transmitted to external servers, making it safe
            for sensitive information.
          </p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion
        faqs={[
          {
            question: "Is this tool free to use?",
            answer: "Yes, this tool is 100% free with no hidden costs, subscriptions, or usage limits.",
          },
          {
            question: "Is my data secure?",
            answer: "Absolutely. All processing happens locally in your browser. Your input data never leaves your device or gets sent to any server.",
          },
          {
            question: "Do I need to create an account?",
            answer: "No account or registration is required. Simply open the tool and start using it immediately.",
          },
        ]}
      />

      <RelatedTools currentToolUrl="/tools/util/password-entropy" max={6} />

</div>
 );
}
