"use client";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { AlignLeft, Calendar, Clock, Copy, ListChecks, Plus, Trash2, Users } from"lucide-react";

export function StandupClient() {
 const [name, setName] = useState("");
 const [yesterday, setYesterday] = useState<string[]>([""]);
 const [today, setToday] = useState<string[]>([""]);
 const [blockers, setBlockers] = useState<string[]>([""]);
 const [format, setFormat] = useState<"bullet"|"numbered"|"slack">("bullet");

 useEffect(() => {
 const savedName = localStorage.getItem("standupName");
 if (savedName) setName(savedName);
 }, []);

 const handleNameChange = (val: string) => {
 setName(val);
 localStorage.setItem("standupName", val);
 };

 const updateArray = (arr: string[], setArr: (val: string[]) => void, index: number, value: string) => {
 const newArr = [...arr];
 newArr[index] = value;
 setArr(newArr);
 };

 const addField = (arr: string[], setArr: (val: string[]) => void) => {
 setArr([...arr,""]);
 };

 const removeField = (arr: string[], setArr: (val: string[]) => void, index: number) => {
 if (arr.length === 1) {
 setArr([""]);
 return;
 }
 const newArr = [...arr];
 newArr.splice(index, 1);
 setArr(newArr);
 };

 const getFormattedReport = () => {
 let report ="";
 if (name) report += `*Standup: ${name}*\n\n`;

 const formatList = (items: string[], type:"bullet"|"numbered"|"slack", prefix: string) => {
 const validItems = items.filter(i => i.trim() !=="");
 if (validItems.length === 0) return"";
 
 let res = `*${prefix}*\n`;
 validItems.forEach((item, i) => {
 if (type ==="bullet") res += `- ${item}\n`;
 else if (type ==="numbered") res += `${i + 1}. ${item}\n`;
 else if (type ==="slack") res += `• ${item}\n`;
 });
 return res +"\n";
 };

 report += formatList(yesterday, format,"Yesterday");
 report += formatList(today, format,"Today");
 report += formatList(blockers, format,"Blockers");

 return report.trim();
 };

 const resetAll = () => {
 setYesterday([""]);
 setToday([""]);
 setBlockers([""]);
 };

 const renderSection = (title: string, arr: string[], setArr: (val: string[]) => void) => (
 <div className="space-y-2">
 <div className="flex justify-between items-center">
 <Label className="text-base font-semibold">{title}</Label>
 <Button variant="ghost"size="sm"onClick={() => addField(arr, setArr)}>
 <Plus className="w-4 h-4 mr-1"/> Add
 </Button>
 </div>
 {arr.map((item, i) => (
 <div key={i} className="flex gap-2">
 <Input
 value={item}
 onChange={(e) => updateArray(arr, setArr, i, e.target.value)}
 placeholder={`What did you do ${title.toLowerCase()}?`}
 />
 <Button variant="outline"size="icon"onClick={() => removeField(arr, setArr, i)}>
 <Trash2 className="w-4 h-4 text-red-500"/>
 </Button>
 </div>
 ))}
 </div>
 );

 return (
 <div className="space-y-6">
 <ToolPageHeader
 icon={ListChecks}
 title="Daily Standup Generator"
 description="Quickly generate and format your daily standup reports."
 actions={<ResetButton onClick={resetAll} />}
 />

 <div className="grid md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Standup Details</CardTitle>
 <CardDescription>Fill in your tasks and blockers</CardDescription>
 </CardHeader>
 <CardContent className="space-y-6">
 <div className="space-y-2">
 <Label>Name (Optional)</Label>
 <div className="flex gap-2">
 <Users className="w-5 h-5 text-muted-foreground mt-2"/>
 <Input value={name} onChange={(e) => handleNameChange(e.target.value)} placeholder="Your Name"/>
 </div>
 </div>

 <Separator />

 {renderSection("Yesterday", yesterday, setYesterday)}
 {renderSection("Today", today, setToday)}
 {renderSection("Blockers", blockers, setBlockers)}
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Formatted Report</CardTitle>
 <CardDescription>Preview and copy your standup</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Format</Label>
 <Select value={format} onValueChange={(v: any) => setFormat(v)}>
 <SelectTrigger>
 <SelectValue placeholder="Select format"/>
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="bullet">Bullet Points (-)</SelectItem>
 <SelectItem value="numbered">Numbered List (1.)</SelectItem>
 <SelectItem value="slack">Slack Format (•)</SelectItem>
 </SelectContent>
 </Select>
 </div>

 <div className="bg-muted p-4 rounded-md whitespace-pre-wrap min-h-[200px] text-sm">
 {getFormattedReport() || <span className="text-muted-foreground">Your report will appear here...</span>}
 </div>

 <div className="flex justify-end">
 <CopyButton getText={getFormattedReport} label="Copy Report"/>
 </div>
 </CardContent>
 </GlassCard>
 </div>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Add Notes",
    description:"Yesterday, today, blockers.",
    icon: ListChecks,
  },
{
    step:"02",
    title:"Format",
    description:"Structure the update.",
    icon: AlignLeft,
  },
{
    step:"03",
    title:"Copy",
    description:"Export for your team.",
    icon: Copy,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: ListChecks,
    title:"Three Prompts",
    description:"Standard standup.",
  },
{
    icon: AlignLeft,
    title:"Format",
    description:"Clean output.",
  },
{
    icon: Copy,
    title:"Copy",
    description:"Paste to chat.",
  },
{
    icon: Clock,
    title:"Quick",
    description:"Seconds to write.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A daily standup generator structures the classic three-question update — yesterday, today, blockers — so it is clear and concise for your team. The format prevents rambling. This tool assembles and lets you copy it.</p>
  <p>Blockers surfaced early save days of stuck work. The generator makes that prompt automatic.</p>
  <p>Use it each morning. The tool's value is a crisp, copy-ready standup in seconds.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"What is a standup?",
    answer:"Brief team status update.",
  },
{
    question:"Free?",
    answer:"Yes.",
  },
{
    question:"Private?",
    answer:"Local until shared.",
  },
{
    question:"Use case?",
    answer:"Agile teams.",
  },
{
    question:"Export?",
    answer:"Copy text.",
  }
  ]}
/>
</div>
 );
}
