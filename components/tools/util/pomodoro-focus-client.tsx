"use client";

import {
 BarChart3,
 Bell,
 BookOpen,
 Brain,
 Check,
 Clock4,
 Coffee,
 History,
 Pause,
 Play,
 Settings2,
 Shield,
 SkipForward,
 Timer,
 Volume2,
 VolumeX,
 Zap,
} from"lucide-react";
import * as React from"react";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { ActionButton, ResetButton } from"@/components/shared/action-buttons";
import InputField from"@/components/shared/form-fields/input-field";
import SwitchRow from"@/components/shared/form-fields/switch-row";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { CardContent, CardDescription, CardHeader, CardTitle } from"@/components/ui/card";
import { GlassCard } from"@/components/ui/glass-card";
import { Label } from"@/components/ui/label";
import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from"@/components/ui/select";
import { Separator } from"@/components/ui/separator";
import { cn, pad } from"@/lib/utils";
import { GridPattern } from"@/components/magicui/grid-pattern";

/* Types */
type Mode ="work"|"short"|"long";
type HistoryItem = {
 id: string;
 startedAt: number;
 endedAt: number;
 mode: Mode;
 durationMs: number;
};

/* Helpers */
function msToClock(ms: number) {
 const totalSec = Math.max(0, Math.floor(ms / 1000));
 const m = Math.floor(totalSec / 60);
 const s = totalSec % 60;
 return `${pad(m)}:${pad(s)}`;
}
function clamp(n: number, min: number, max: number) {
 return Math.min(max, Math.max(min, n));
}
function makeBeep(volume = 0.4, durationMs = 220, freq = 880) {
  // Client-only effect
 const AudioCtx =
 window.AudioContext ||
 (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
 if (!AudioCtx) return;

 const ctx = new AudioCtx();
 const o = ctx.createOscillator();
 const g = ctx.createGain();
 o.type ="sine";
 o.frequency.value = freq;
 g.gain.value = volume;
 o.connect(g);
 g.connect(ctx.destination);
 o.start();
 setTimeout(() => {
 o.stop();
 ctx.close().catch(() => {});
 }, durationMs);
}

/* Component */
export default function PomodoroFocusClient() {
 // Settings
 const [workMin, setWorkMin] = React.useState(25);
 const [shortMin, setShortMin] = React.useState(5);
 const [longMin, setLongMin] = React.useState(15);
 const [sessionsUntilLong, setSessionsUntilLong] = React.useState(4);
 const [autoStartBreaks, setAutoStartBreaks] = React.useState(true);
 const [autoStartWork, setAutoStartWork] = React.useState(false);
 const [soundOn, setSoundOn] = React.useState(true);
 const [volume, setVolume] = React.useState(70);

 // Runtime
 const [mode, setMode] = React.useState<Mode>("work");
 const [running, setRunning] = React.useState(false);
 const [remainingMs, setRemainingMs] = React.useState(workMin * 60 * 1000);
 const [cycleCount, setCycleCount] = React.useState(0);
 const [history, setHistory] = React.useState<HistoryItem[]>([]);
 const [startedAt, setStartedAt] = React.useState<number | null>(null);

 // Derived
 const targetMs = React.useMemo(() => {
 if (mode ==="work") return workMin * 60 * 1000;
 if (mode ==="short") return shortMin * 60 * 1000;
 return longMin * 60 * 1000;
 }, [mode, workMin, shortMin, longMin]);

 const progress = React.useMemo(
 () => 100 - Math.round((remainingMs / targetMs) * 100),
 [remainingMs, targetMs],
 );

 // Initialize when mode or settings change (if not running)
 React.useEffect(() => {
 if (!running) setRemainingMs(targetMs);
 }, [targetMs, running]);

 // Ping with sound + optional notification
 const ping = React.useCallback(
 (title: string, body: string) => {
 if (soundOn) makeBeep(volume / 100, 220, 920);
 if (
 typeof window !=="undefined"&&
"Notification"in window &&
 Notification.permission ==="granted"
 ) {
 try {
 new Notification(title, { body });
 } catch {}
 }
 },
 [soundOn, volume],
 );

 /* Session Complete */
 const onCompleteSession = React.useCallback(
 (skipped = false) => {
 setRunning(false);
 setStartedAt(null);

 setHistory((prev) => [
 {
 id: crypto.randomUUID(),
 startedAt:
 prev.length && prev[prev.length - 1].endedAt > (startedAt ?? 0)
 ? Date.now() - (targetMs - remainingMs)
 : (startedAt ?? Date.now()),
 endedAt: Date.now(),
 mode,
 durationMs: targetMs - Math.max(0, remainingMs),
 },
 ...prev,
 ]);

 if (!skipped) {
 if (mode ==="work") {
 const newCount = cycleCount + 1;
 setCycleCount(newCount);
 if (newCount % sessionsUntilLong === 0) {
 setMode("long");
 setRemainingMs(longMin * 60 * 1000);
 ping("Long break 🎉", `Great job! Take ${longMin} minutes.`);
 if (autoStartBreaks) setRunning(true);
 } else {
 setMode("short");
 setRemainingMs(shortMin * 60 * 1000);
 ping("Break time ☕", `Take ${shortMin} minutes.`);
 if (autoStartBreaks) setRunning(true);
 }
 } else {
 setMode("work");
 setRemainingMs(workMin * 60 * 1000);
 ping("Focus time 🔥", `Back to work for ${workMin} minutes.`);
 if (autoStartWork) setRunning(true);
 }
 } else {
 if (mode ==="work") {
 const newCount = cycleCount + 1;
 setCycleCount(newCount);
 if (newCount % sessionsUntilLong === 0) {
 setMode("long");
 setRemainingMs(longMin * 60 * 1000);
 if (autoStartBreaks) setRunning(true);
 } else {
 setMode("short");
 setRemainingMs(shortMin * 60 * 1000);
 if (autoStartBreaks) setRunning(true);
 }
 } else {
 setMode("work");
 setRemainingMs(workMin * 60 * 1000);
 if (autoStartWork) setRunning(true);
 }
 }
 },
 [
 startedAt,
 targetMs,
 remainingMs,
 mode,
 cycleCount,
 sessionsUntilLong,
 longMin,
 shortMin,
 workMin,
 autoStartBreaks,
 autoStartWork,
 ping,
 ],
 );

 /* Timer Controls */
 const start = React.useCallback(() => {
 setStartedAt(Date.now());
 setRunning(true);
 }, []);
 const pause = React.useCallback(() => {
 setRunning(false);
 }, []);

 // ✅ Fix: simple toggle (no nested setRunning calls)
 const askedNotifRef = React.useRef(false);
 const toggle = React.useCallback(() => {
 if (running) {
 pause();
 } else {
 // Request notification permission only on first start, not on page load
 if (
 !askedNotifRef.current &&
 typeof window !=="undefined"&&
"Notification"in window &&
 Notification.permission ==="default"
 ) {
 Notification.requestPermission().catch(() => {});
 askedNotifRef.current = true;
 }
 start();
 }
 }, [running, start, pause]);

 const resetTimer = React.useCallback(
 (nextMode?: Mode) => {
 setRunning(false);
 const m = nextMode ?? mode;
 setMode(m);
 setRemainingMs(
 m ==="work"
 ? workMin * 60 * 1000
 : m ==="short"
 ? shortMin * 60 * 1000
 : longMin * 60 * 1000,
 );
 setStartedAt(null);
 },
 [mode, workMin, shortMin, longMin],
 );

 const skip = React.useCallback(() => onCompleteSession(true), [onCompleteSession]);

 const resetAll = React.useCallback(() => {
 setRunning(false);
 setMode("work");
 setRemainingMs(workMin * 60 * 1000);
 setCycleCount(0);
 setHistory([]);
 setStartedAt(null);
 }, [workMin]);

 /* Effects */
 // Ticker
 React.useEffect(() => {
 let t: number | undefined;
 if (running) {
 t = window.setInterval(() => {
 setRemainingMs((prev) => {
 const next = prev - 1000;
 if (next <= 0) {
 onCompleteSession();
 return 0;
 }
 return next;
 });
 }, 1000);
 }
 return () => {
 if (t) window.clearInterval(t);
 };
 }, [running, onCompleteSession]);

 // Keyboard shortcuts
 React.useEffect(() => {
 const onKey = (e: KeyboardEvent) => {
 if (e.target && (e.target as HTMLElement).tagName ==="INPUT") return;
 if (e.code ==="Space") {
 e.preventDefault();
 toggle();
 } else if (e.key.toLowerCase() ==="r") {
 resetTimer();
 } else if (e.key.toLowerCase() ==="n") {
 skip();
 }
 };
 window.addEventListener("keydown", onKey);
 return () => window.removeEventListener("keydown", onKey);
 }, [toggle, resetTimer, skip]);

 /* UI */
 const modeLabel: Record<Mode, string> = {
 work:"Focus",
 short:"Short Break",
 long:"Long Break",
 };
 const modeIcon: Record<Mode, React.ReactNode> = {
 work: <Zap className="h-5 w-5"/>,
 short: <Coffee className="h-5 w-5"/>,
 long: <Coffee className="h-5 w-5"/>,
 };

 return (
 <div className="max-w-6xl mx-auto space-y-8">
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray="4 2"
        className="absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
      />

 <ToolPageHeader
 icon={Timer}
 title="Pomodoro Focus"
 description="Work / break cycles with sound, history, and auto-start options."
 actions={
 <>
 <ResetButton onClick={resetAll} label="Reset All"/>
 <ActionButton icon={SkipForward} label="Skip"onClick={skip} />
 <ActionButton
 variant="default"
 icon={running ? Pause : Play}
 label={running ?"Pause":"Start"}
 onClick={toggle}
 />
 </>
 }
 />

 {/* Timer */}
 <GlassCard>
 <CardHeader className="pb-3">
 <div className="flex items-center justify-between">
 <div className="flex items-center gap-2 text-base">
 {modeIcon[mode]}
 <CardTitle className="text-base">{modeLabel[mode]}</CardTitle>
 </div>
 <div className="flex items-center gap-2 text-xs text-muted-foreground">
 <Clock4 className="h-4 w-4"/>
 Completed: <span className="font-medium">{cycleCount}</span>
 </div>
 </div>
 <CardDescription>
 {mode ==="work"
 ? `Focus for ${workMin} minute${workMin > 1 ?"s":""}`
 : mode ==="short"
 ? `Take a short ${shortMin}-minute break`
 : `Enjoy a long ${longMin}-minute break`}
 </CardDescription>
 </CardHeader>
 <CardContent>
 <div className="grid gap-6 md:grid-cols-2">
 {/* Clock */}
 <div className="flex flex-col items-center justify-center gap-4">
 <div className="relative h-48 w-48">
 <svg
 className="h-full w-full"
 role="img"
 aria-label="Pomodoro progress ring"
 viewBox="0 0 100 100"
 >
 <circle
 cx="50"
 cy="50"
 r="44"
 stroke="hsl(var(--muted))"
 strokeWidth="8"
 fill="none"
 />
 <circle
 cx="50"
 cy="50"
 r="44"
 stroke="hsl(var(--primary))"
 strokeWidth="8"
 fill="none"
 strokeDasharray={2 * Math.PI * 44}
 strokeDashoffset={((100 - progress) / 100) * 2 * Math.PI * 44}
 strokeLinecap="round"
 transform="rotate(-90 50 50)"
 />
 </svg>
 <div className="absolute inset-0 flex flex-col items-center justify-center">
 <div className="text-4xl font-semibold tabular-nums">
 {msToClock(remainingMs)}
 </div>
 <div className="text-xs text-muted-foreground">{progress}%</div>
 </div>
 </div>
 <div className="flex gap-2">
 <ResetButton size="sm"onClick={() => resetTimer(mode)} />
 <ActionButton
 variant="default"
 size="sm"
 icon={running ? Pause : Play}
 label={running ?"Pause":"Start"}
 onClick={toggle}
 />
 </div>
 </div>

 {/* Controls */}
 <div className="grid gap-4">
 <div className="grid grid-cols-3 gap-3">
 <InputField
 label="Work (min)"
 type="number"
 min={1}
 max={180}
 value={workMin}
 onChange={(e) => setWorkMin(clamp(parseInt(e.target.value ||"0", 10), 1, 180))}
 />
 <InputField
 label="Short (min)"
 type="number"
 min={1}
 max={60}
 value={shortMin}
 onChange={(e) => setShortMin(clamp(parseInt(e.target.value ||"0", 10), 1, 60))}
 />
 <InputField
 label="Long (min)"
 type="number"
 min={5}
 max={90}
 value={longMin}
 onChange={(e) => setLongMin(clamp(parseInt(e.target.value ||"0", 10), 5, 90))}
 />
 </div>
 <div className="grid grid-cols-2 gap-3">
 <div className="space-y-2">
 <Label>Mode</Label>
 <Select
 value={mode}
 onValueChange={(v: Mode) => {
 setMode(v);
 setRunning(false);
 setRemainingMs(
 v ==="work"
 ? workMin * 60 * 1000
 : v ==="short"
 ? shortMin * 60 * 1000
 : longMin * 60 * 1000,
 );
 }}
 >
 <SelectTrigger className="w-full">
 <SelectValue placeholder="Select mode"/>
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="work">Focus</SelectItem>
 <SelectItem value="short">Short Break</SelectItem>
 <SelectItem value="long">Long Break</SelectItem>
 </SelectContent>
 </Select>
 </div>
 <InputField
 label="Until Long Break"
 type="number"
 min={2}
 max={12}
 value={sessionsUntilLong}
 onChange={(e) =>
 setSessionsUntilLong(clamp(parseInt(e.target.value ||"0", 10), 2, 12))
 }
 />
 </div>
 <div>
 <div className="flex items-center gap-2">
 <Settings2 className="h-4 w-4"/>
 <span className="text-sm">Auto-start options</span>
 </div>
 <div className="grid md:grid-cols-2 gap-4">
 <SwitchRow
 label="Auto-start breaks"
 checked={autoStartBreaks}
 onCheckedChange={setAutoStartBreaks}
 />
 <SwitchRow
 label="Auto-start work"
 checked={autoStartWork}
 onCheckedChange={setAutoStartWork}
 />
 </div>
 </div>
 <div className="flex items-center justify-between rounded-md border p-3">
 <div className="flex items-center gap-2">
 <Bell className="h-4 w-4"/>
 <span className="text-sm">Sound on session change</span>
 </div>
 <div className="flex items-center gap-3">
 <input
 type="range"
 min={0}
 max={100}
 step={1}
 value={volume}
 onChange={(e) => setVolume(parseInt(e.target.value ||"0", 10))}
 className="w-28"
 />
 <ActionButton
 size="icon"
 onClick={() => setSoundOn((s) => !s)}
 aria-label="Toggle sound"
 icon={soundOn ? Volume2 : VolumeX}
 />
 </div>
 </div>
 </div>
 </div>
 </CardContent>
 </GlassCard>

 <Separator />

 {/* History */}
 <GlassCard>
 <CardHeader>
 <div className="flex items-center gap-2">
 <History className="h-4 w-4"/>
 <CardTitle className="text-base">Session History</CardTitle>
 </div>
 <CardDescription>Recent completed or skipped sessions.</CardDescription>
 </CardHeader>
 <CardContent className="grid gap-3">
 {history.length === 0 ? (
 <p className="text-sm text-muted-foreground">
 No sessions yet. Start your first pomodoro!
 </p>
 ) : (
 <ul className="grid gap-2">
 {history.slice(0, 20).map((h) => (
 <li
 key={h.id}
 className={cn(
"flex items-center justify-between rounded-md border p-3",
 h.mode ==="work"?"bg-primary/5":"bg-muted/50",
 )}
 >
 <div className="flex items-center gap-2">
 {h.mode ==="work"? (
 <Zap className="h-4 w-4"/>
 ) : (
 <Coffee className="h-4 w-4"/>
 )}
 <span className="text-sm font-medium">
 {h.mode ==="work"
 ?"Focus"
 : h.mode ==="short"
 ?"Short Break"
 :"Long Break"}
 </span>
 <span className="text-xs text-muted-foreground">
 • {msToClock(h.durationMs)} • {new Date(h.endedAt).toLocaleTimeString()}
 </span>
 </div>
 <Check className="h-4 w-4 text-primary"/>
 </li>
 ))}
 </ul>
 )}
 </CardContent>
 </GlassCard>
 {/* SECTION 3: HOW IT WORKS */}
 <ToolHowItWorks
 steps={[
 {
 step:"01",
 title:"Start the Timer",
 description:"Click Start to begin a 25-minute focused work session. The timer counts down with a visual indicator. Your browser tab shows the remaining time so you can work in other windows.",
 icon: Timer,
 },
 {
 step:"02",
 title:"Take a Short Break",
 description:"When the Pomodoro ends, an alert sounds and a 5-minute break begins automatically. Step away from your screen — rest is as important as focus.",
 icon: Coffee,
 },
 {
 step:"03",
 title:"Repeat & Track",
 description:"After 4 Pomodoros, take a 15-30 minute long break. Track your completed sessions to measure daily focus time and build productive work habits.",
 icon: BarChart3,
 },
 ]}
 badges={[
"25/5 min intervals",
"Long break after 4 rounds",
"Browser tab timer",
 ]}
 />

 {/* SECTION 4: FEATURE GUIDES */}
 <ToolFeatureGuides
 features={[
 {
 icon: Timer,
 title:"Classic Pomodoro Intervals",
 description:"25-minute work sessions followed by 5-minute breaks, with a 15-30 minute long break after every 4 Pomodoros — the original Pomodoro Technique® intervals.",
 },
 {
 icon: Settings2,
 title:"Customizable Durations",
 description:"Adjust work session length (15-60 min), short break (3-15 min), and long break (15-45 min) to match your personal focus style and work demands.",
 },
 {
 icon: Bell,
 title:"Audio Notifications",
 description:"Browser notification and audio alert when each session ends — so you know to switch modes even when working in other tabs or windows.",
 },
 {
 icon: BarChart3,
 title:"Session Counter",
 description:"Tracks completed Pomodoros in the current session. Use the count to measure your daily focus output — 4-8 Pomodoros is a highly productive day.",
 },
 {
 icon: Brain,
 title:"Science-Backed Focus",
 description:"Based on the Pomodoro Technique® by Francesco Cirillo. Research shows spaced focus intervals with regular breaks improve concentration and reduce mental fatigue.",
 },
 {
 icon: Shield,
 title:"No Signup, No Data",
 description:"Fully client-side timer — no account, no tracking, no data sent anywhere. Works offline after the initial page load.",
 },
 ]}
 >
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <h3 className="text-lg font-semibold">The Pomodoro Technique — How It Works and Why It's Effective</h3>
 <p>
 The <strong>Pomodoro Technique</strong> was developed by Francesco Cirillo in the late 1980s
 (named after his tomato-shaped kitchen timer — <em>pomodoro</em> is Italian for tomato).
 It breaks work into focused 25-minute intervals separated by short breaks, using time-boxing
 to reduce the impact of interruptions and mental fatigue.
 </p>

 <h4 className="font-semibold">The 5 Steps of the Pomodoro Technique</h4>
 <div className="overflow-x-auto">
 <table className="w-full border-collapse text-sm">
 <thead>
 <tr className="bg-muted/50">
 <th className="border p-2 text-left">Step</th>
 <th className="border p-2 text-left">Action</th>
 <th className="border p-2 text-left">Duration</th>
 </tr>
 </thead>
 <tbody>
 {[
 ["1","Choose a task to work on","Before starting"],
 ["2","Set timer and work with full focus","25 minutes"],
 ["3","Stop when timer rings; mark one Pomodoro","0 minutes"],
 ["4","Take a short break (rest, stretch, hydrate)","5 minutes"],
 ["5","Every 4 Pomodoros: take a long break","15-30 minutes"],
 ].map(([step, action, duration]) => (
 <tr key={step} className="odd:bg-muted/20">
 <td className="border p-2 font-mono text-primary font-bold text-xs">{step}</td>
 <td className="border p-2 font-medium text-xs">{action}</td>
 <td className="border p-2 text-muted-foreground text-xs">{duration}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>

 <h4 className="font-semibold">Pomodoro Variations — Finding Your Ideal Interval</h4>
 <div className="overflow-x-auto">
 <table className="w-full border-collapse text-sm">
 <thead>
 <tr className="bg-muted/50">
 <th className="border p-2 text-left">Style</th>
 <th className="border p-2 text-left">Work</th>
 <th className="border p-2 text-left">Short Break</th>
 <th className="border p-2 text-left">Best For</th>
 </tr>
 </thead>
 <tbody>
 {[
 ["Classic Pomodoro","25 min","5 min","Most knowledge workers"],
 ["52/17 Rule","52 min","17 min","Deep focus tasks"],
 ["90-min Ultradian","90 min","20 min","Creative work, writing"],
 ["Short Burst","15 min","3 min","ADHD, low-energy days"],
 ["Extended Focus","50 min","10 min","Complex problem-solving"],
 ].map(([style, work, brk, best]) => (
 <tr key={style} className="odd:bg-muted/20">
 <td className="border p-2 font-medium text-xs">{style}</td>
 <td className="border p-2 text-primary font-mono text-xs">{work}</td>
 <td className="border p-2 font-mono text-xs">{brk}</td>
 <td className="border p-2 text-muted-foreground text-xs">{best}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>

 <h4 className="font-semibold">The Science Behind Time-Boxed Work</h4>
 <p>
 Research in cognitive psychology supports interval-based focus:
 <strong>ultradian rhythms</strong> mean the brain naturally cycles through ~90-minute
 focus-fatigue cycles. Within each cycle, attention peaks and dips. The Pomodoro Technique
 works <em>within</em> these natural rhythms by ensuring regular recovery before fatigue
 becomes chronic. Studies show time pressure (the countdown) also activates the prefrontal
 cortex and reduces procrastination — the"I'll just do this for 25 minutes"commitment
 is psychologically easier than open-ended work.
 </p>
 </div>
 </ToolFeatureGuides>

 {/* SECTION 5: FAQ + RELATED TOOLS */}
 <ToolFaqAccordion
 faqs={[
 {
 question:"What is the Pomodoro Technique?",
 answer:"The Pomodoro Technique is a time management method developed by Francesco Cirillo in the 1980s. It involves working in 25-minute focused intervals (called Pomodoros) separated by 5-minute breaks. After 4 Pomodoros, you take a longer 15-30 minute break. The technique helps maintain focus, reduce fatigue, and make large tasks feel more manageable.",
 },
 {
 question:"Why 25 minutes? Can I use different intervals?",
 answer:"The 25-minute interval was based on Cirillo's personal experimentation — it's long enough for meaningful progress but short enough to maintain focus. Research suggests 25-52 minutes is the sweet spot for most people. If you find 25 minutes too short for deep work, try 45 or 52 minutes. If attention is difficult, try 15 minutes. Adjust the timer settings to find your ideal interval.",
 },
 {
 question:"What should I do during Pomodoro breaks?",
 answer:"Short breaks (5 min): stand up, stretch, hydrate, look away from your screen (reduces eye strain), take 3 deep breaths. Avoid social media during breaks — it activates the same attention networks as work. Long breaks (15-30 min): walk, eat a snack, meditate, or do a non-digital activity to genuinely restore cognitive energy.",
 },
 {
 question:"How many Pomodoros should I aim for per day?",
 answer:"4-8 Pomodoros (2-4 hours of focused work) is considered highly productive for knowledge workers. Cal Newport's 'Deep Work' research suggests most people max out at 4 hours of truly focused work per day. Don't try to do 12+ Pomodoros — quality of focus matters more than quantity.",
 },
 {
 question:"What if I get interrupted during a Pomodoro?",
 answer:"The original technique says: if interrupted by something urgent, end the Pomodoro (it doesn't count), handle the interruption, then start fresh. For optional interruptions, use the 'inform, negotiate, schedule, call back' method: tell the person you're in a focus session, agree on a time to follow up. Over time, people learn to respect your Pomodoro time.",
 },
 ]}
 />
 <RelatedTools currentToolUrl="/tools/util/pomodoro" max={6} />
 </div>
 );
}
