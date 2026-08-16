"use client";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { ActionButton, CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { ArrowDown, ArrowDownWideNarrow, ArrowUp, Clock, Copy, Download, FileText, ListChecks, Plus, Printer, Save, Trash2, Users } from"lucide-react";
import toast from"react-hot-toast";

type AgendaItem = {
  id: string;
  topic: string;
  presenter: string;
  duration: number;
};
const TEMPLATES = {
  standup: [{
    topic: "What did you complete yesterday?",
    presenter: "All Team Members",
    duration: 5
  }, {
    topic: "What is your main focus today?",
    presenter: "All Team Members",
    duration: 5
  }, {
    topic: "Identify active blockers & dependencies",
    presenter: "Team Lead",
    duration: 5
  }],
  review: [{
    topic: "Project Progress & Milestone Update",
    presenter: "Project Manager",
    duration: 10
  }, {
    topic: "Architecture & Code Review",
    presenter: "Tech Lead",
    duration: 15
  }, {
    topic: "Risk Management & Resource Allocation",
    presenter: "All",
    duration: 15
  }, {
    topic: "Action Items & Next Steps",
    presenter: "Project Manager",
    duration: 10
  }]
};
export function MeetingAgendaClient() {
  const [title, setTitle] = useState("Sprint Planning & Roadmap Sync");
  const [date, setDate] = useState("2026-08-15");
  const [time, setTime] = useState("10:00");
  const [totalDuration, setTotalDuration] = useState(60);
  const [location, setLocation] = useState("Google Meet / Room 302");
  const [attendees, setAttendees] = useState("Engineering & Product Team");
  const [items, setItems] = useState<AgendaItem[]>([{
    id: "1",
    topic: "Welcome & Objective Setting",
    presenter: "Host",
    duration: 5
  }, {
    id: "2",
    topic: "Product Backlog Grooming",
    presenter: "Product Owner",
    duration: 25
  }, {
    id: "3",
    topic: "Sprint Capacity & Commitment",
    presenter: "Scrum Master",
    duration: 20
  }, {
    id: "4",
    topic: "Q&A and Wrap Up",
    presenter: "Host",
    duration: 10
  }]);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("toolzium_agenda");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.title) setTitle(parsed.title);
        if (parsed.date) setDate(parsed.date);
        if (parsed.time) setTime(parsed.time);
        if (parsed.totalDuration) setTotalDuration(parsed.totalDuration);
        if (parsed.location) setLocation(parsed.location);
        if (parsed.attendees) setAttendees(parsed.attendees);
        if (Array.isArray(parsed.items) && parsed.items.length > 0) setItems(parsed.items);
      } catch (e) {}
    }
  }, []);
  const saveAgenda = () => {
    localStorage.setItem("toolzium_agenda", JSON.stringify({
      title,
      date,
      time,
      totalDuration,
      location,
      attendees,
      items
    }));
    toast.success("Saved agenda locally!");
  };
  const loadTemplate = (type: keyof typeof TEMPLATES) => {
    const templateItems = TEMPLATES[type].map((item, i) => ({
      ...item,
      id: Date.now().toString() + i
    }));
    setItems(templateItems);
    toast.success(`Loaded ${type} meeting template!`);
  };
  const addItem = () => {
    setItems([...items, {
      id: Date.now().toString(),
      topic: "New Discussion Topic",
      presenter: "Team Member",
      duration: 10
    }]);
  };
  const updateItem = (id: string, field: keyof AgendaItem, value: any) => {
    setItems(items.map(it => it.id === id ? {
      ...it,
      [field]: value
    } : it));
  };
  const removeItem = (id: string) => {
    setItems(items.filter(it => it.id !== id));
  };
  const moveItem = (index: number, dir: number) => {
    if (index + dir < 0 || index + dir >= items.length) return;
    const newItems = [...items];
    const temp = newItems[index];
    newItems[index] = newItems[index + dir];
    newItems[index + dir] = temp;
    setItems(newItems);
  };
  const usedTime = items.reduce((sum, item) => sum + (Number(item.duration) || 0), 0);
  const getCopyText = () => {
    let text = `MEETING AGENDA: ${title}\n`;
    text += `Date: ${date} | Time: ${time}\n`;
    text += `Location: ${location}\n`;
    text += `Attendees: ${attendees}\n\n`;
    text += `AGENDA TOPICS (${usedTime} mins total):\n`;
    items.forEach((item, i) => {
      text += `${i + 1}. ${item.topic} - ${item.presenter} (${item.duration}m)\n`;
    });
    return text;
  };
  const resetAll = () => {
    setTitle("Team Sync");
    setDate("2026-08-15");
    setTime("10:00");
    setTotalDuration(60);
    setLocation("");
    setAttendees("");
    setItems([]);
    toast.success("Reset agenda!");
  };
  return <div className="relative max-w-6xl mx-auto space-y-8"><ToolBackground /><div className="relative z-10">
      

      <ToolPageHeader icon={FileText} title="Interactive Meeting Agenda Builder" description="Plan meeting topics, allocate presenter time limits, load quick templates, and copy formatted markdown notes." actions={<div className="flex gap-2">
            <ActionButton icon={Save} label="Save" onClick={saveAgenda} />
            <ActionButton icon={Printer} label="Print" onClick={() => window.print()} variant="outline" />
            <CopyButton getText={getCopyText} label="Copy Agenda" />
            <ResetButton onClick={resetAll} label="Reset" />
          </div>} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* MEETING DETAILS */}
        <div className="md:col-span-1 space-y-6">
          <GlassCard>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Clock className="w-5 h-5 text-primary" /> Meeting Parameters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="m-title" className="text-xs font-bold">Meeting Title</Label>
                <Input id="m-title" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Sprint Planning..." className="h-11 font-medium" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="m-date" className="text-xs font-semibold">Date</Label>
                  <Input id="m-date" type="date" value={date} onChange={e => setDate(e.target.value)} className="h-9 text-xs" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="m-time" className="text-xs font-semibold">Time</Label>
                  <Input id="m-time" type="time" value={time} onChange={e => setTime(e.target.value)} className="h-9 text-xs" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="m-dur" className="text-xs font-bold">Target Duration (Minutes)</Label>
                <Input id="m-dur" type="number" value={totalDuration} onChange={e => setTotalDuration(Number(e.target.value))} className="h-10 text-xs font-mono font-bold" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="m-loc" className="text-xs font-semibold">Location / Conference Link</Label>
                <Input id="m-loc" value={location} onChange={e => setLocation(e.target.value)} placeholder="Zoom / Google Meet link..." className="h-10 text-xs" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="m-att" className="text-xs font-semibold">Attendees</Label>
                <Input id="m-att" value={attendees} onChange={e => setAttendees(e.target.value)} placeholder="Team members..." className="h-10 text-xs" />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Quick Start Templates</Label>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => loadTemplate("standup")} className="flex-1 font-bold text-xs">
                    Standup
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => loadTemplate("review")} className="flex-1 font-bold text-xs">
                    Sprint Review
                  </Button>
                </div>
              </div>
            </CardContent>
          </GlassCard>
        </div>

        {/* AGENDA ITEMS CANVAS */}
        <div className="md:col-span-2 space-y-6">
          <GlassCard>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <FileText className="w-5 h-5 text-primary" /> Agenda Topics & Time Budget
                </CardTitle>
                <CardDescription className="text-xs font-bold">
                  Allocated:{" "}
                  <span className={cn(usedTime > totalDuration ? "text-destructive font-black" : "text-emerald-500 font-black")}>
                    {usedTime} mins
                  </span>{" "}
                  / {totalDuration} mins limit
                </CardDescription>
              </div>
              <Button onClick={addItem} size="sm" className="font-bold gap-2">
                <Plus className="w-4 h-4" /> Add Topic
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {items.length === 0 ? <div className="text-center p-8 text-muted-foreground text-xs italic border border-dashed border-border/80 rounded-xl">
                  No agenda items added yet. Click &apos;Add Topic&apos; or pick a template on the left.
                </div> : items.map((item, index) => <div key={item.id} className="flex gap-3 items-start p-3 bg-muted/20 rounded-xl border border-border/60">
                    <div className="flex flex-col gap-0.5 mt-1">
                      <Button onClick={() => moveItem(index, -1)} disabled={index === 0} className="p-1 hover:bg-muted rounded disabled:opacity-30">
                        <ArrowUp className="w-3.5 h-3.5" />
                      </Button>
                      <Button onClick={() => moveItem(index, 1)} disabled={index === items.length - 1} className="p-1 hover:bg-muted rounded disabled:opacity-30">
                        <ArrowDown className="w-3.5 h-3.5" />
                      </Button>
                    </div>

                    <div className="flex-1 space-y-2">
                      <Input placeholder="Discussion Topic Title..." value={item.topic} onChange={e => updateItem(item.id, "topic", e.target.value)} className="font-bold text-xs h-9 text-foreground" />
                      <div className="flex gap-2">
                        <div className="flex-1 flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                          <Input placeholder="Presenter" value={item.presenter} onChange={e => updateItem(item.id, "presenter", e.target.value)} className="h-8 text-xs" />
                        </div>
                        <div className="w-28 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                          <Input type="number" placeholder="Mins" value={item.duration} onChange={e => updateItem(item.id, "duration", Number(e.target.value))} className="h-8 text-xs font-bold" />
                        </div>
                      </div>
                    </div>

                    <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-destructive h-8 w-8 mt-1">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>)}
            </CardContent>
          </GlassCard>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <ToolHowItWorks steps={[{
        step: "01",
        title: "Set Meeting Parameters",
        description: "Define meeting title, date, time, attendees, and target total duration.",
        icon: Clock
      }, {
        step: "02",
        title: "Structure Agenda Topics",
        description: "Add discussion topics, assign presenters, and specify minute allocations.",
        icon: FileText
      }, {
        step: "03",
        title: "Copy & Export Notes",
        description: "Copy clean formatted markdown agendas into calendar invites or team emails.",
        icon: CheckCircle2
      }]} badges={["Time Budget Calculator", "Markdown Copy", "100% Free"]} />

      {/* FEATURE GUIDES */}
      <ToolFeatureGuides features={[{
        icon: Clock,
        title: "Time Allocation Budgeting",
        description: "Calculates total allocated minutes and warns when agenda topics exceed target meeting duration."
      }, {
        icon: FileText,
        title: "Quick-Start Team Templates",
        description: "Includes pre-configured meeting templates for Agile Standups and Project Reviews."
      }, {
        icon: Shield,
        title: "Confidential Local Storage",
        description: "Saves draft meeting agendas securely in local storage without server retention."
      }]} />

      {/* FAQ ACCORDION */}
      <ToolFaqAccordion faqs={[{
        question: "What happens if my topics exceed the total duration?",
        answer: "The allocated time indicator turns red to alert you that the sum of topic durations exceeds your target meeting length."
      }, {
        question: "Can I print the agenda?",
        answer: "Yes, click the 'Print' button to generate a clean print/PDF view of your meeting agenda."
      }]} />

 return (
 <div className="space-y-6">
 <ToolPageHeader 
 icon={FileText} 
 title="Meeting Agenda Builder"
 description="Plan and structure meetings effectively. Keep track of time and topics."
 actions={
 <>
 <ActionButton icon={Save} label="Save"onClick={saveAgenda} />
 <ActionButton icon={Printer} label="Print"onClick={() => window.print()} variant="outline"/>
 <CopyButton getText={getCopyText} label="Copy Agenda"/>
 <ResetButton onClick={resetAll} label="Reset"/>
 </>
 }
 />

 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 <div className="md:col-span-1 space-y-6">
 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <Clock className="w-5 h-5"/> Meeting Details
 </CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Title</Label>
 <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Weekly Sync"/>
 </div>
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Date</Label>
 <Input type="date"value={date} onChange={(e) => setDate(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Time</Label>
 <Input type="time"value={time} onChange={(e) => setTime(e.target.value)} />
 </div>
 </div>
 <div className="space-y-2">
 <Label>Total Duration (mins)</Label>
 <Input type="number"value={totalDuration} onChange={(e) => setTotalDuration(Number(e.target.value))} />
 </div>
 <div className="space-y-2">
 <Label>Location / Link</Label>
 <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Zoom link..."/>
 </div>
 <div className="space-y-2">
 <Label>Attendees</Label>
 <Input value={attendees} onChange={(e) => setAttendees(e.target.value)} placeholder="Team members..."/>
 </div>

 <Separator className="my-4"/>
 
 <div className="space-y-2">
 <Label>Quick Templates</Label>
 <div className="flex gap-2">
 <Button variant="outline"size="sm"onClick={() => loadTemplate('standup')} className="flex-1">Standup</Button>
 <Button variant="outline"size="sm"onClick={() => loadTemplate('review')} className="flex-1">Review</Button>
 </div>
 </div>
 </CardContent>
 </GlassCard>
 </div>

 <div className="md:col-span-2 space-y-6">
 <GlassCard>
 <CardHeader className="flex flex-row items-center justify-between">
 <div>
 <CardTitle>Agenda Items</CardTitle>
 <CardDescription>
 Time allocated: <span className={usedTime > totalDuration ?"text-red-500 font-bold":"text-green-500 font-bold"}>{usedTime}</span> / {totalDuration} mins
 </CardDescription>
 </div>
 <Button onClick={addItem} size="sm"><Plus className="w-4 h-4 mr-2"/> Add Item</Button>
 </CardHeader>
 <CardContent className="space-y-4">
 {items.length === 0 ? (
 <div className="text-center p-8 text-muted-foreground border-2 border-dashed rounded-lg">
 No agenda items yet. Add an item or use a template.
 </div>
 ) : (
 items.map((item, index) => (
 <div key={item.id} className="flex gap-4 items-start p-4 bg-secondary/30 rounded-lg border">
 <div className="flex flex-col gap-1 mt-1">
 <button onClick={() => moveItem(index, -1)} disabled={index === 0} className="p-1 hover:bg-secondary rounded disabled:opacity-30">
 <ArrowUp className="w-4 h-4"/>
 </button>
 <button onClick={() => moveItem(index, 1)} disabled={index === items.length - 1} className="p-1 hover:bg-secondary rounded disabled:opacity-30">
 <ArrowDown className="w-4 h-4"/>
 </button>
 </div>
 
 <div className="flex-1 space-y-3">
 <Input 
 placeholder="Topic"
 value={item.topic} 
 onChange={(e) => updateItem(item.id, 'topic', e.target.value)} 
 className="font-medium"
 />
 <div className="flex gap-3">
 <div className="flex-1 flex items-center gap-2">
 <Users className="w-4 h-4 text-muted-foreground shrink-0"/>
 <Input 
 placeholder="Presenter"
 value={item.presenter} 
 onChange={(e) => updateItem(item.id, 'presenter', e.target.value)} 
 className="h-8"
 />
 </div>
 <div className="w-32 flex items-center gap-2">
 <Clock className="w-4 h-4 text-muted-foreground shrink-0"/>
 <Input 
 type="number"
 placeholder="Mins"
 value={item.duration} 
 onChange={(e) => updateItem(item.id, 'duration', Number(e.target.value))} 
 className="h-8"
 />
 </div>
 </div>
 </div>
 
 <Button variant="ghost"size="icon"onClick={() => removeItem(item.id)} className="text-destructive hover:text-destructive hover:bg-destructive/10 mt-1">
 <Trash2 className="w-4 h-4"/>
 </Button>
 </div>
 ))
 )}
 </CardContent>
 </GlassCard>
 </div>
 </div>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Add Items",
    description:"List topics and owners.",
    icon: ListChecks,
  },
{
    step:"02",
    title:"Order",
    description:"Sequence the discussion.",
    icon: ArrowDownWideNarrow,
  },
{
    step:"03",
    title:"Share",
    description:"Export the agenda.",
    icon: Download,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: ListChecks,
    title:"Topics",
    description:"With owners.",
  },
{
    icon: ArrowDownWideNarrow,
    title:"Order",
    description:"Sequenced.",
  },
{
    icon: Download,
    title:"Export",
    description:"Send ahead.",
  },
{
    icon: Clock,
    title:"Timeboxes",
    description:"Allocate minutes.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A meeting agenda builder structures discussion with topics, owners, and timeboxes so meetings stay on track. Agendas sent ahead let attendees prepare, cutting meeting length. This tool assembles and exports them.</p>
  <p>Owners and timeboxes prevent sprawl. The agenda makes expectations explicit before the call.</p>
  <p>Use it before every meeting. The tool's value is focused, prepared meetings that respect time.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"Why an agenda?",
    answer:"Keeps meetings focused.",
  },
{
    question:"Owners?",
    answer:"Yes, assign each item.",
  },
{
    question:"Free?",
    answer:"Yes.",
  },
{
    question:"Timeboxes?",
    answer:"Yes, allocate.",
  },
{
    question:"Use case?",
    answer:"Any meeting.",
  }
  ]}
/>
</div>
 );
}
