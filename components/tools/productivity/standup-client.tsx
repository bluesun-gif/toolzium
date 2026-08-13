"use client";

import React, { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { ListChecks, Calendar, Users, Plus, Trash2, Shield, BookOpen, Layers, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

export function StandupClient() {
  const [name, setName] = useState("");
  const [yesterday, setYesterday] = useState<string[]>(["Finalized UI design specs", "Refactored API endpoint routing"]);
  const [today, setToday] = useState<string[]>(["Implement database schema migrations", "Conduct code review for PR #42"]);
  const [blockers, setBlockers] = useState<string[]>(["Waiting on staging environment credentials"]);
  const [format, setFormat] = useState<"bullet" | "numbered" | "slack">("slack");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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
    setArr([...arr, ""]);
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
    let report = "";
    if (name.trim()) report += `*Standup Report: ${name.trim()}*\n\n`;

    const formatList = (items: string[], type: "bullet" | "numbered" | "slack", prefix: string) => {
      const validItems = items.filter((i) => i.trim() !== "");
      if (validItems.length === 0) return "";

      let res = `*${prefix}*\n`;
      validItems.forEach((item, i) => {
        if (type === "bullet") res += `- ${item}\n`;
        else if (type === "numbered") res += `${i + 1}. ${item}\n`;
        else if (type === "slack") res += `• ${item}\n`;
      });
      return res + "\n";
    };

    report += formatList(yesterday, format, "Yesterday");
    report += formatList(today, format, "Today");
    report += formatList(blockers, format, "Blockers");

    return report.trim();
  };

  const resetAll = () => {
    setYesterday([""]);
    setToday([""]);
    setBlockers([""]);
    toast.success("Reset standup fields!");
  };

  const renderSection = (title: string, arr: string[], setArr: (val: string[]) => void) => (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{title}</Label>
        <Button variant="ghost" size="sm" onClick={() => addField(arr, setArr)} className="h-7 text-xs font-bold text-primary gap-1">
          <Plus className="w-3.5 h-3.5" /> Add Item
        </Button>
      </div>
      {arr.map((item, i) => (
        <div key={i} className="flex gap-2">
          <Input
            value={item}
            onChange={(e) => updateArray(arr, setArr, i, e.target.value)}
            placeholder={`e.g. Completed task for ${title.toLowerCase()}...`}
            className="h-10 text-xs font-medium"
          />
          <Button variant="outline" size="icon" onClick={() => removeField(arr, setArr, i)} className="h-10 w-10 shrink-0 text-muted-foreground hover:text-destructive">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ))}
    </div>
  );

  if (!mounted) return null;

  return (
    <div className="relative max-w-6xl mx-auto space-y-8">
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray="4 2"
        className="absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
      />

      <ToolPageHeader
        icon={ListChecks}
        title="Agile Daily Standup Report Generator"
        description="Format daily team updates into bullet points, numbered lists, or Slack bullet syntax (Yesterday, Today, Blockers)."
        actions={<ResetButton onClick={resetAll} label="Clear All" />}
      />

      <div className="grid md:grid-cols-2 gap-6">
        {/* INPUT DETAILS */}
        <GlassCard>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Users className="w-5 h-5 text-primary" /> Team Member Standup Details
            </CardTitle>
            <CardDescription>Enter yesterday&apos;s achievements, today&apos;s plan, and active blockers.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="s-name" className="text-xs font-bold">Your Name / Handle</Label>
              <Input
                id="s-name"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. Alex Morgan (Engineering Lead)"
                className="h-11 font-medium"
              />
            </div>

            <Separator />

            {renderSection("Yesterday's Accomplishments", yesterday, setYesterday)}
            {renderSection("Today's Commitments", today, setToday)}
            {renderSection("Impediments & Blockers", blockers, setBlockers)}
          </CardContent>
        </GlassCard>

        {/* PREVIEW & FORMAT */}
        <GlassCard className="flex flex-col justify-between">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <ListChecks className="w-5 h-5 text-primary" /> Formatted Output Preview
            </CardTitle>
            <CardDescription>Select export format for Slack, Teams, or Markdown.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 flex-1 flex flex-col justify-between">
            <div className="space-y-2">
              <Label className="text-xs font-bold">List Style Format</Label>
              <Select value={format} onValueChange={(v: "bullet" | "numbered" | "slack") => setFormat(v)}>
                <SelectTrigger className="h-10 text-xs font-medium">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="slack">Slack / Discord Bullets (•)</SelectItem>
                  <SelectItem value="bullet">Standard Dash Bullets (-)</SelectItem>
                  <SelectItem value="numbered">Numbered List (1.)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="bg-muted/30 border border-border/60 p-4 rounded-xl font-mono text-xs text-foreground whitespace-pre-wrap min-h-[220px] flex-1">
              {getFormattedReport() || <span className="text-muted-foreground italic">Your formatted standup update will render here...</span>}
            </div>

            <div className="flex justify-end pt-2">
              <CopyButton getText={getFormattedReport} label="Copy Standup Report" />
            </div>
          </CardContent>
        </GlassCard>
      </div>

      {/* HOW IT WORKS */}
      <ToolHowItWorks
        steps={[
          {
            step: "01",
            title: "Fill Yesterday & Today",
            description: "List what you completed yesterday and your primary task commitments for today.",
            icon: Users,
          },
          {
            step: "02",
            title: "Flag Any Blockers",
            description: "Highlight any pending dependencies or impediments needing team assistance.",
            icon: ListChecks,
          },
          {
            step: "03",
            title: "Copy for Slack / Teams",
            description: "Choose bullet point or Slack formatting and copy directly into your team channel.",
            icon: CheckCircle2,
          },
        ]}
        badges={["Slack Bullet Syntax", "Markdown Ready", "Auto-Saved Name"]}
      />

      {/* FEATURE GUIDES */}
      <ToolFeatureGuides
        features={[
          {
            icon: ListChecks,
            title: "Agile 3-Step Structure",
            description: "Follows standard Agile Scrum standup structure (Yesterday, Today, Blockers).",
          },
          {
            icon: Users,
            title: "Multiple Output Formats",
            description: "Formatted specifically for Slack bullet points, Discord markdown, or numbered emails.",
          },
          {
            icon: Shield,
            title: "100% Client-Side Privacy",
            description: "Saves your handle locally and generates reports without server network requests.",
          },
        ]}
      />

      {/* FAQ ACCORDION */}
      <ToolFaqAccordion
        faqs={[
          {
            question: "What is a Daily Standup?",
            answer: "A daily standup is a short 15-minute Agile meeting where team members share Yesterday's progress, Today's goals, and Blockers.",
          },
          {
            question: "Does it save my name?",
            answer: "Yes, your name is saved locally in your browser so you don't need to retype it every morning.",
          },
        ]}
      />

      <RelatedTools currentToolUrl="/tools/productivity/standup" max={6} />
    </div>
  );
}
