"use client";

import { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { Heart, Droplets, AlertTriangle, Sparkles, Shield, Zap, Copy } from"lucide-react";
import { Label } from"@/components/ui/label";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

type BloodType ="A+"|"A-"|"B+"|"B-"|"AB+"|"AB-"|"O+"|"O-";

const compatibility: Record<BloodType, { give: string[], receive: string[] }> = {
"A+": { give: ["A+","AB+"], receive: ["A+","A-","O+","O-"] },
"O+": { give: ["O+","A+","B+","AB+"], receive: ["O+","O-"] },
"B+": { give: ["B+","AB+"], receive: ["B+","B-","O+","O-"] },
"AB+": { give: ["AB+"], receive: ["Everyone"] },
"A-": { give: ["A+","A-","AB+","AB-"], receive: ["A-","O-"] },
"O-": { give: ["Everyone"], receive: ["O-"] },
"B-": { give: ["B+","B-","AB+","AB-"], receive: ["B-","O-"] },
"AB-": { give: ["AB+","AB-"], receive: ["AB-","A-","B-","O-"] },
};

export function BloodTypeClient() {
 const [selectedType, setSelectedType] = useState<BloodType>("A+");

 return (
      <div className="relative space-y-6">
      <GridPattern />

 <ToolPageHeader
 icon={Heart}
 title="Blood Type Compatibility"
 description="Check blood type compatibility for donation and receiving."
 actions={<></>}
 />

 <GlassCard>
 <CardHeader>
 <CardTitle>Select Blood Type</CardTitle>
 <CardDescription>Choose a blood type to see compatibility</CardDescription>
 </CardHeader>
 <CardContent>
 <div className="space-y-2 max-w-sm">
 <Label>Blood Type</Label>
 <Select value={selectedType} onValueChange={(val: BloodType) => setSelectedType(val)}>
 <SelectTrigger>
 <SelectValue placeholder="Select blood type"/>
 </SelectTrigger>
 <SelectContent>
 {Object.keys(compatibility).map((type) => (
 <SelectItem key={type} value={type}>{type}</SelectItem>
 ))}
 </SelectContent>
 </Select>
 </div>
 </CardContent>
 </GlassCard>

 <div className="grid md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2"><Droplets className="w-5 h-5 text-red-500"/> Can Donate To (Give)</CardTitle>
 </CardHeader>
 <CardContent>
 <div className="flex flex-wrap gap-2">
 {compatibility[selectedType].give.map(t => (
 <span key={t} className="px-3 py-1 bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-100 rounded-full text-lg font-bold border border-red-200 dark:border-red-800">{t}</span>
 ))}
 </div>
 {selectedType ==="O-"&& <p className="mt-4 text-sm text-muted-foreground">O- is the universal donor.</p>}
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2"><Droplets className="w-5 h-5 text-primary"/> Can Receive From</CardTitle>
 </CardHeader>
 <CardContent>
 <div className="flex flex-wrap gap-2">
 {compatibility[selectedType].receive.map(t => (
 <span key={t} className="px-3 py-1 bg-primary/10 text-primary dark:bg-blue-900/50 rounded-full text-lg font-bold border border-blue-200 dark:border-blue-800">{t}</span>
 ))}
 </div>
 {selectedType ==="AB+"&& <p className="mt-4 text-sm text-muted-foreground">AB+ is the universal recipient.</p>}
 </CardContent>
 </GlassCard>
 </div>

 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-amber-500"/> Medical Disclaimer</CardTitle>
 </CardHeader>
 <CardContent>
 <p className="text-sm text-muted-foreground">
 This tool is for informational purposes only. Do not use this information for medical decisions. Always consult with a healthcare professional or blood bank for actual compatibility and donation eligibility.
 </p>
 </CardContent>
 </GlassCard>
 
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
          <h3>Why Use Our Blood Type Compatibility?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Blood Type Compatibility provides
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

      <RelatedTools currentToolUrl="/tools/health/blood-type" max={6} />

</div>
 );
}
