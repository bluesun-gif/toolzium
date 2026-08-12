"use client";

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
import { FileText, Clock, Users, Copy, Plus, Trash2, ArrowUp, ArrowDown, Printer, Save } from"lucide-react";
import toast from"react-hot-toast";

type AgendaItem = {
 id: string;
 topic: string;
 presenter: string;
 duration: number;
};

const TEMPLATES = {
 standup: [
 { topic:"What did you do yesterday?", presenter:"All", duration: 5 },
 { topic:"What will you do today?", presenter:"All", duration: 5 },
 { topic:"Any blockers?", presenter:"All", duration: 5 }
 ],
 review: [
 { topic:"Project Status Update", presenter:"PM", duration: 10 },
 { topic:"Key Milestones", presenter:"Lead", duration: 15 },
 { topic:"Risks & Issues", presenter:"All", duration: 15 },
 { topic:"Next Steps", presenter:"PM", duration: 5 }
 ]
};

export function MeetingAgendaClient() {
 const [title, setTitle] = useState("Weekly Sync");
 const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
 const [time, setTime] = useState("10:00");
 const [totalDuration, setTotalDuration] = useState(60);
 const [location, setLocation] = useState("Zoom / Room A");
 const [attendees, setAttendees] = useState("Team");
 const [items, setItems] = useState<AgendaItem[]>([
 { id:"1", topic:"Welcome & Intro", presenter:"Host", duration: 5 }
 ]);

 useEffect(() => {
 const saved = localStorage.getItem("toolzium_agenda");
 if (saved) {
 try {
 const parsed = JSON.parse(saved);
 setTitle(parsed.title);
 setDate(parsed.date);
 setTime(parsed.time);
 setTotalDuration(parsed.totalDuration);
 setLocation(parsed.location);
 setAttendees(parsed.attendees);
 setItems(parsed.items);
 } catch (e) {
 // ignore
 }
 }
 }, []);

 const saveAgenda = () => {
 localStorage.setItem("toolzium_agenda", JSON.stringify({
 title, date, time, totalDuration, location, attendees, items
 }));
 toast.success("Agenda saved!");
 };

 const loadTemplate = (type: keyof typeof TEMPLATES) => {
 const templateItems = TEMPLATES[type].map((item, i) => ({
 ...item,
 id: Date.now().toString() + i
 }));
 setItems(templateItems);
 toast.success(`Loaded ${type} template`);
 };

 const addItem = () => {
 setItems([...items, { id: Date.now().toString(), topic:"", presenter:"", duration: 5 }]);
 };

 const updateItem = (id: string, field: keyof AgendaItem, value: any) => {
 setItems(items.map(it => it.id === id ? { ...it, [field]: value } : it));
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
 text += `AGENDA ITEMS (${usedTime} mins total):\n`;
 items.forEach((item, i) => {
 text += `${i + 1}. ${item.topic} - ${item.presenter} (${item.duration}m)\n`;
 });
 return text;
 };

 const resetAll = () => {
 setTitle("");
 setDate("");
 setTime("");
 setTotalDuration(60);
 setLocation("");
 setAttendees("");
 setItems([]);
 };

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
 </div>
 );
}
