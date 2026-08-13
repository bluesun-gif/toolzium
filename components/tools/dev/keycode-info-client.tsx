"use client";

import React, { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Label } from"@/components/ui/label";
import toast from"react-hot-toast";
import { Keyboard, Copy, History, Terminal, Command } from"lucide-react";
import { cn } from"@/lib/utils";
import { GridPattern } from"@/components/magicui/grid-pattern";
import { GlassCard } from"@/components/ui/glass-card";

const cardClass ="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass ="border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass ="text-xs sm:text-sm font-semibold flex items-center gap-2";

const commonKeys = [
 { key:"Enter", code:"Enter", keyCode: 13 },
 { key:"Escape", code:"Escape", keyCode: 27 },
 { key:"Space", code:"Space", keyCode: 32 },
 { key:"ArrowUp", code:"ArrowUp", keyCode: 38 },
 { key:"ArrowDown", code:"ArrowDown", keyCode: 40 },
 { key:"ArrowLeft", code:"ArrowLeft", keyCode: 37 },
 { key:"ArrowRight", code:"ArrowRight", keyCode: 39 },
 { key:"Tab", code:"Tab", keyCode: 9 },
 { key:"Backspace", code:"Backspace", keyCode: 8 },
 { key:"Delete", code:"Delete", keyCode: 46 },
 { key:"F1", code:"F1", keyCode: 112 },
 { key:"F12", code:"F12", keyCode: 123 },
];

export default function KeycodeInfoClient() {
 const [lastEvent, setLastEvent] = useState<any>(null);
 const [history, setHistory] = useState<any[]>([]);
 const [isActive, setIsActive] = useState(true);

 useEffect(() => {
 const handleKeyDown = (e: KeyboardEvent) => {
 if (!isActive) return;
 // Prevent default browser actions for things like Tab, Space, F-keys while testing
 if (["Tab","Space","F1","F2","F3","F4","F5","F6","F7","F8","F9","F10","F11","F12"].includes(e.code)) {
 e.preventDefault();
 }
 
 const data = {
 key: e.key,
 code: e.code,
 keyCode: e.keyCode,
 which: e.which,
 location: e.location,
 ctrlKey: e.ctrlKey,
 shiftKey: e.shiftKey,
 altKey: e.altKey,
 metaKey: e.metaKey,
 type: e.type,
 timeStamp: e.timeStamp.toFixed(2)
 };
 setLastEvent(data);
 setHistory(prev => [data, ...prev].slice(0, 10));
 };
 
 window.addEventListener("keydown", handleKeyDown);
 return () => window.removeEventListener("keydown", handleKeyDown);
 }, [isActive]);

 const getLocationName = (loc: number) => {
 switch(loc) {
 case 0: return"Standard";
 case 1: return"Left";
 case 2: return"Right";
 case 3: return"Numpad";
 default: return"Unknown";
 }
 };

 const copyJSON = () => {
 if (lastEvent) {
 navigator.clipboard.writeText(JSON.stringify(lastEvent, null, 2));
 toast.success("Event JSON copied!");
 }
 };

 return (
      <div className="relative max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6">
      <GridPattern />

 <ToolPageHeader
 icon={Keyboard}
 title="JavaScript Keycode Reference"
 description="Press any key to instantly view detailed KeyboardEvent data including key, code, keyCode, and modifier states."
 />

 <Card className={cn(cardClass, "border-primary/30 bg-primary/5")}>
 <CardContent className="p-12 flex flex-col items-center justify-center text-center relative">
 <div className="absolute top-4 right-4 flex items-center gap-2">
 <Label className="text-xs cursor-pointer flex items-center gap-2 text-muted-foreground select-none">
 <input type="checkbox"checked={isActive} onChange={e => setIsActive(e.target.checked)} className="accent-primary"/>
 Listener Active
 </Label>
 </div>
 {!lastEvent ? (
 <div className="space-y-4 animate-pulse">
 <Keyboard className="w-16 h-16 text-primary mx-auto"/>
 <h2 className="text-2xl font-bold text-foreground">Press Any Key</h2>
 <p className="text-muted-foreground text-sm">Click anywhere on the page and press a key to see event details.</p>
 </div>
 ) : (
 <div className="space-y-6 w-full">
 <div className="flex flex-col items-center gap-2">
 <span className="text-xs uppercase tracking-widest text-muted-foreground">event.key</span>
 <span className="text-6xl font-mono font-bold text-primary">
 {lastEvent.key ===""?"Space": lastEvent.key}
 </span>
 </div>
 
 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
 <div className="p-3 rounded-lg bg-background border border-border text-center">
 <p className="text-xs text-muted-foreground mb-1">event.code</p>
 <p className="font-mono font-bold text-sm text-foreground">{lastEvent.code}</p>
 </div>
 <div className="p-3 rounded-lg bg-background border border-border text-center">
 <p className="text-xs text-muted-foreground mb-1">event.keyCode</p>
 <p className="font-mono font-bold text-sm text-foreground">{lastEvent.keyCode}</p>
 </div>
 <div className="p-3 rounded-lg bg-background border border-border text-center">
 <p className="text-xs text-muted-foreground mb-1">event.which</p>
 <p className="font-mono font-bold text-sm text-foreground">{lastEvent.which}</p>
 </div>
 <div className="p-3 rounded-lg bg-background border border-border text-center">
 <p className="text-xs text-muted-foreground mb-1">location</p>
 <p className="font-mono font-bold text-sm text-foreground">{getLocationName(lastEvent.location)}</p>
 </div>
 </div>

 <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
 <span className={`px-3 py-1 rounded-full text-xs font-bold border ${lastEvent.ctrlKey ?"bg-primary text-primary-foreground border-primary":"bg-muted text-muted-foreground border-border"}`}>Ctrl</span>
 <span className={`px-3 py-1 rounded-full text-xs font-bold border ${lastEvent.shiftKey ?"bg-primary text-primary-foreground border-primary":"bg-muted text-muted-foreground border-border"}`}>Shift</span>
 <span className={`px-3 py-1 rounded-full text-xs font-bold border ${lastEvent.altKey ?"bg-primary text-primary-foreground border-primary":"bg-muted text-muted-foreground border-border"}`}>Alt</span>
 <span className={`px-3 py-1 rounded-full text-xs font-bold border ${lastEvent.metaKey ?"bg-primary text-primary-foreground border-primary":"bg-muted text-muted-foreground border-border"}`}>Meta / Cmd</span>
 </div>

 <Button onClick={copyJSON} size="sm"className="mx-auto flex text-xs font-semibold">
 <Copy className="w-4 h-4 mr-2"/> Copy JSON
 </Button>
 </div>
 )}
 </CardContent>
 </Card>

 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
 <Card className={cn(cardClass, "lg:col-span-2")}>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <Terminal className="w-4 h-4 text-primary"/> Quick Reference Table
 </CardTitle>
 </CardHeader>
 <CardContent className="p-0">
 <div className="max-h-[400px] overflow-y-auto">
 <table className="w-full text-sm text-left">
 <thead className="bg-muted/30 text-xs uppercase sticky top-0 text-foreground">
 <tr>
 <th className="px-4 py-3">Key</th>
 <th className="px-4 py-3">Code</th>
 <th className="px-4 py-3">KeyCode</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-border/50 text-foreground">
 {commonKeys.map((k, i) => (
 <tr key={i} className="hover:bg-muted/20 transition-colors">
 <td className="px-4 py-2 font-mono font-bold">{k.key}</td>
 <td className="px-4 py-2 font-mono text-muted-foreground">{k.code}</td>
 <td className="px-4 py-2 font-mono text-primary font-bold">{k.keyCode}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </CardContent>
 </Card>

 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <History className="w-4 h-4 text-primary"/> Event History (Last 10)
 </CardTitle>
 </CardHeader>
 <CardContent className="p-4">
 <div className="space-y-2 max-h-[400px] overflow-y-auto">
 {history.length === 0 ? (
 <p className="text-sm text-muted-foreground text-center py-8">No events recorded yet.</p>
 ) : (
 history.map((h, i) => (
 <div key={i} className="p-2 rounded bg-muted/20 border border-border/50 flex justify-between items-center text-xs font-mono">
 <span className="font-bold text-primary">{h.key ===""?"Space": h.key}</span>
 <span className="text-muted-foreground">{h.code}</span>
 </div>
 ))
 )}
 </div>
 </CardContent>
 </GlassCard>
 </div>

 <ToolHowItWorks
 steps={[
 { step:"01", title:"Focus Window", description:"Ensure your browser window is in focus and the 'Listener Active' toggle is enabled.", icon: Keyboard },
 { step:"02", title:"Press Any Key", description:"Hit any key, combination, or modifier to instantly capture the native KeyboardEvent.", icon: Command },
 { step:"03", title:"Analyze & Copy", description:"Review the key, code, and deprecated keyCode values, then copy the full JSON payload.", icon: Copy }
 ]}
 badges={["Real-Time Capture","Modifier Detection","JSON Export"]}
 />

 <ToolFeatureGuides
 features={[
 { icon: Keyboard, title:"Modern vs Legacy Properties", description:"Clearly distinguishes between the modern `key` and `code` properties and the deprecated `keyCode` and `which` integers."},
 { icon: Command, title:"Modifier State Tracking", description:"Instantly visualizes the state of Ctrl, Shift, Alt, and Meta (Cmd/Win) keys during complex chorded shortcuts."},
 { icon: Terminal, title:"Comprehensive Reference", description:"Includes a built-in lookup table for common navigation, function, and control keys to speed up development."},
 { icon: History, title:"Sequential Event Logging", description:"Maintains a rolling buffer of the last 10 keystrokes, allowing you to analyze sequences and rapid inputs."}
 ]}
 >
 <div className="prose max-w-none dark:prose-invert">
 <h3 className="text-xl font-bold mb-4">Navigating the Chaos of JavaScript Keyboard Events</h3>
 <p className="text-muted-foreground mb-4">
 Handling keyboard input in JavaScript has historically been one of the most frustrating tasks for frontend developers. For years, the ecosystem relied on the <code className="text-primary">keyCode</code> property—an arbitrary integer assigned to each physical key. However, <code className="text-primary">keyCode</code> was fundamentally flawed: it couldn't distinguish between numpad numbers and top-row numbers, it varied across operating systems and keyboard layouts (like AZERTY vs QWERTY), and it failed completely for non-Latin scripts. Consequently, the W3C deprecated it in favor of the modern UI Events Keyboard specification.
 </p>
 <p className="text-muted-foreground mb-4">
 The modern standard introduces two distinct properties: <code className="text-primary">event.key</code> and <code className="text-primary">event.code</code>. The <code className="text-primary">key</code> property represents the actual character or action generated by the key press, respecting modifier keys and layout. Pressing Shift+A yields"A", while pressing it on a French keyboard yields"Q". Conversely, <code className="text-primary">code</code> represents the physical key on the keyboard itself (e.g., <code className="text-primary">KeyA</code>), remaining constant regardless of layout or modifiers. This distinction is vital for game development (where physical WASD positioning matters) versus text editing (where the typed character matters).
 </p>
 <p className="text-muted-foreground">
 This JavaScript Keycode Reference tool bridges the gap between legacy codebases and modern standards. By capturing the raw <code className="text-primary">KeyboardEvent</code> object, it allows developers to see exactly what the browser is reporting in real-time. It also tracks the state of modifier keys and the physical location of the input (such as distinguishing between the Left Shift and Right Shift keys). Whether you are building complex hotkey systems, accessible UI navigation, or browser-based games, understanding these event properties is the first step toward robust, cross-platform keyboard interaction.
 </p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion
 faqs={[
 { question:"Why is my keyCode showing as undefined or deprecated?", answer:"The `keyCode` and `which` properties were officially deprecated by the W3C because they were unreliable across different keyboard layouts and platforms. Modern browsers still support them for backward compatibility, but you should use `event.key` or `event.code` for new development."},
 { question:"What is the difference between event.key and event.code?", answer:"`event.key` returns the character or action produced by the key (e.g., 'A' or 'Enter'), which changes based on Shift or keyboard layout. `event.code` returns the physical key identifier (e.g., 'KeyA' or 'Enter'), which remains the same regardless of layout or modifiers."},
 { question:"Why does the tool prevent default actions for some keys?", answer:"To provide a smooth testing experience, the tool intercepts keys like Tab, Space, and F1-F12 (which normally trigger browser navigation or find menus) and prevent their default behavior while the listener is active. You can toggle the listener off to use your browser normally."}
 ]}
 />

 <RelatedTools currentToolUrl="/tools/dev/keycode-info" max={6} />
 </div>
 );
}
