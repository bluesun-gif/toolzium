"use client";

import { useState, useMemo } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Button } from"@/components/ui/button";
import { CopyButton } from"@/components/shared/action-buttons";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { Clock, Users, Calendar, Trash2, Sparkles, Shield, Zap, Copy } from"lucide-react";
import { cn } from"@/lib/utils";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

type Participant = {
 id: string;
 name: string;
 timezone: string;
};

const commonTimezones = [
"UTC","America/New_York","America/Chicago","America/Denver","America/Los_Angeles", 
"Europe/London","Europe/Paris","Asia/Kolkata","Asia/Tokyo","Australia/Sydney"
];

export function MeetingPlannerClient() {
 const [participants, setParticipants] = useState<Participant[]>([
 { id:"1", name:"Me", timezone: Intl.DateTimeFormat().resolvedOptions().timeZone },
 { id:"2", name:"Client", timezone:"Europe/London"}
 ]);
 const [newName, setNewName] = useState("");
 const [newTz, setNewTz] = useState("UTC");

 const addParticipant = () => {
 if (newName && newTz) {
 setParticipants([...participants, { id: Math.random().toString(), name: newName, timezone: newTz }]);
 setNewName("");
 }
 };

 const removeParticipant = (id: string) => {
 setParticipants(participants.filter(p => p.id !== id));
 };

 const hours = Array.from({ length: 24 }, (_, i) => i);

 // Helper to format hour in specific timezone
 const getHourInTz = (utcHour: number, timezone: string) => {
 const today = new Date();
 today.setUTCHours(utcHour, 0, 0, 0);
 const formatter = new Intl.DateTimeFormat('en-US', { hour: 'numeric', hour12: false, timeZone: timezone });
 const formatted = formatter.format(today);
 const numericHour = parseInt(formatted);
 // Is it working hours? (9 to 17)
 const isWorkingHours = numericHour >= 9 && numericHour < 17;
 return { hour: numericHour, label: `${numericHour}:00`, isWorkingHours };
 };

 const generateInviteText = () => {
 let text ="Meeting Availability Proposal:\n\n";
 text +="We can meet at one of these times:\n";
 // suggest best time based on first participant's 9am
 participants.forEach(p => {
 text += `- ${p.name}: ${getHourInTz(14, p.timezone).label} (${p.timezone})\n`;
 });
 return text;
 };

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

 <ToolPageHeader icon={Clock} title="Time Zone Meeting Planner"description="Find overlapping working hours across multiple time zones."actions={<CopyButton getText={generateInviteText} label="Copy Invite"/>} />
 
 <div className="grid gap-6 md:grid-cols-3">
 <GlassCard className="md:col-span-1">
 <CardHeader>
 <CardTitle>Participants</CardTitle>
 <CardDescription>Add people and their timezones</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Name</Label>
 <Input value={newName} onChange={e => setNewName(e.target.value)} placeholder="e.g. Alice"/>
 </div>
 <div className="space-y-2">
 <Label>Timezone</Label>
 <Select value={newTz} onValueChange={setNewTz}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 {commonTimezones.map(tz => (
 <SelectItem key={tz} value={tz}>{tz}</SelectItem>
 ))}
 </SelectContent>
 </Select>
 </div>
 <Button onClick={addParticipant} className="w-full"disabled={!newName}>Add Participant</Button>
 
 <Separator className="my-4"/>
 
 <div className="space-y-3">
 {participants.map(p => (
 <div key={p.id} className="flex items-center justify-between bg-muted/50 p-2 rounded-md">
 <div>
 <div className="font-medium text-sm">{p.name}</div>
 <div className="text-xs text-muted-foreground">{p.timezone}</div>
 </div>
 {participants.length > 1 && (
 <Button variant="ghost"size="icon"className="h-8 w-8 text-destructive"onClick={() => removeParticipant(p.id)}>
 <Trash2 className="h-4 w-4"/>
 </Button>
 )}
 </div>
 ))}
 </div>
 </CardContent>
 </GlassCard>
 
 <GlassCard className="md:col-span-2 overflow-x-auto">
 <CardHeader>
 <CardTitle>Availability Grid</CardTitle>
 <CardDescription>Green indicates overlapping working hours (9 AM - 5 PM)</CardDescription>
 </CardHeader>
 <CardContent>
 <div className="min-w-[600px]">
 <table className="w-full text-xs text-center border-collapse">
 <thead>
 <tr>
 <th className="text-left p-2 border-b w-32">Participant</th>
 {hours.map(h => (
 <th key={h} className="p-1 border-b font-normal text-muted-foreground">
 {h.toString().padStart(2, '0')}
 </th>
 ))}
 </tr>
 </thead>
 <tbody>
 {participants.map(p => (
 <tr key={p.id}>
 <td className="text-left p-2 font-medium border-b truncate"title={p.name}>{p.name}</td>
 {hours.map(h => {
 const { hour, label, isWorkingHours } = getHourInTz(h, p.timezone);
 return (
 <td key={h} className="p-1 border-b border-l border-r first:border-l-0 last:border-r-0 relative">
 <div className={cn(
"h-8 rounded-sm flex items-center justify-center font-medium",
 isWorkingHours ?"bg-green-500/20 text-green-700 dark:text-green-400":"bg-muted text-muted-foreground/50"
 )} title={`${label} in ${p.timezone}`}>
 {hour}
 </div>
 </td>
 );
 })}
 </tr>
 ))}
 </tbody>
 </table>
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
          <h3>Why Use Our p.name?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our p.name provides
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

      <RelatedTools currentToolUrl="/tools/time/meeting-planner" max={6} />

</div>
 );
}
