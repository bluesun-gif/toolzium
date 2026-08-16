"use client";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { AlertTriangle, BookOpen, Droplet, Droplets, GitCompare, Heart, ShieldCheck } from"lucide-react";
import { Label } from"@/components/ui/label";

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
 <div className="space-y-6">
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
    step:"01",
    title:"Enter Types",
    description:"Choose two blood types.",
    icon: Droplet,
  },
{
    step:"02",
    title:"Compare",
    description:"See donation compatibility.",
    icon: GitCompare,
  },
{
    step:"03",
    title:"Learn",
    description:"Understand ABO and Rh rules.",
    icon: BookOpen,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Droplet,
    title:"Type Input",
    description:"All eight common types.",
  },
{
    icon: GitCompare,
    title:"Compatibility",
    description:"Who can give to whom.",
  },
{
    icon: BookOpen,
    title:"Education",
    description:"Explains the science.",
  },
{
    icon: ShieldCheck,
    title:"Safety Note",
    description:"Transfusion guidance only.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A blood type compatibility tool clarifies who can safely donate to whom, a question that matters in emergencies and planning. The ABO system (A, B, AB, O) and the Rh factor (positive or negative) together determine compatibility. This tool compares two types and shows the safe donation direction.</p>
  <p>The rules are simple but easy to mix up. O negative is the universal donor; AB positive is the universal recipient. Rh negative recipients should generally receive Rh negative blood. The tool maps these so you don't rely on memory during stress. Education sections explain why, reinforcing the logic.</p>
  <p>This is informational, not a substitute for clinical testing and professional transfusion decisions. Use it to understand the system and prepare, but always follow medical guidance for actual care. The tool's value is demystifying a topic surrounded by myth, leaving you with accurate, usable knowledge.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"What is universal donor?",
    answer:"O negative can give to any ABO/Rh type.",
  },
{
    question:"Universal recipient?",
    answer:"AB positive can receive from any type.",
  },
{
    question:"What is Rh?",
    answer:"A plus or minus factor affecting compatibility.",
  },
{
    question:"Does type affect personality?",
    answer:"No, that is a myth; only transfusion matters.",
  },
{
    question:"Is this medical advice?",
    answer:"Informational; defer to professionals.",
  }
  ]}
/>
</div>
 );
}
