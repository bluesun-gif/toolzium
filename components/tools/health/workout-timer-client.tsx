"use client";

import { useState, useEffect, useRef } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Button } from"@/components/ui/button";
import { ActionButton } from"@/components/shared/action-buttons";
import { Timer, Play, Pause, Activity, RotateCcw, Volume2, VolumeX, Sparkles, Shield, Zap, Copy } from"lucide-react";
import { cn } from"@/lib/utils";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

type TimerState ="idle"|"work"|"rest"|"finished";

export function WorkoutTimerClient() {
 const [workSecs, setWorkSecs] = useState(20);
 const [restSecs, setRestSecs] = useState(10);
 const [totalRounds, setTotalRounds] = useState(8);
 
 const [state, setState] = useState<TimerState>("idle");
 const [timeLeft, setTimeLeft] = useState(workSecs);
 const [currentRound, setCurrentRound] = useState(1);
 const [isPaused, setIsPaused] = useState(false);
 const [soundEnabled, setSoundEnabled] = useState(true);

 const timerRef = useRef<NodeJS.Timeout | null>(null);

 const playBeep = (freq: number, duration: number) => {
 if (!soundEnabled) return;
 try {
 const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
 const osc = ctx.createOscillator();
 const gain = ctx.createGain();
 osc.connect(gain);
 gain.connect(ctx.destination);
 osc.type ="sine";
 osc.frequency.setValueAtTime(freq, ctx.currentTime);
 gain.gain.setValueAtTime(0.5, ctx.currentTime);
 gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
 osc.start(ctx.currentTime);
 osc.stop(ctx.currentTime + duration);
 } catch (e) {
 // Audio context might be blocked
 }
 };

 useEffect(() => {
 if (state ==="idle"|| state ==="finished"|| isPaused) {
 if (timerRef.current) clearInterval(timerRef.current);
 return;
 }

 timerRef.current = setInterval(() => {
 setTimeLeft(prev => {
 if (prev <= 1) {
 // Transition
 if (state ==="work") {
 if (restSecs > 0) {
 setState("rest");
 playBeep(440, 0.5); // lower pitch for rest
 return restSecs;
 } else {
 if (currentRound < totalRounds) {
 setCurrentRound(r => r + 1);
 setState("work");
 playBeep(880, 0.5);
 return workSecs;
 } else {
 setState("finished");
 playBeep(1000, 1);
 return 0;
 }
 }
 } else if (state ==="rest") {
 if (currentRound < totalRounds) {
 setCurrentRound(r => r + 1);
 setState("work");
 playBeep(880, 0.5); // higher pitch for work
 return workSecs;
 } else {
 setState("finished");
 playBeep(1000, 1);
 return 0;
 }
 }
 }
 if (prev <= 4 && prev > 1) {
 playBeep(600, 0.1); // short warning beeps
 }
 return prev - 1;
 });
 }, 1000);

 return () => {
 if (timerRef.current) clearInterval(timerRef.current);
 };
 }, [state, isPaused, currentRound, totalRounds, workSecs, restSecs, soundEnabled]);

 const startTimer = () => {
 if (state ==="idle"|| state ==="finished") {
 setState("work");
 setCurrentRound(1);
 setTimeLeft(workSecs);
 setIsPaused(false);
 playBeep(880, 0.5);
 } else if (isPaused) {
 setIsPaused(false);
 }
 };

 const pauseTimer = () => setIsPaused(true);
 
 const resetTimer = () => {
 setState("idle");
 setIsPaused(false);
 setCurrentRound(1);
 setTimeLeft(workSecs);
 };

 const setPreset = (w: number, r: number, rnds: number) => {
 setWorkSecs(w);
 setRestSecs(r);
 setTotalRounds(rnds);
 resetTimer();
 };

 const formatTime = (secs: number) => {
 const m = Math.floor(secs / 60);
 const s = secs % 60;
 return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
 };

 const maxTime = state ==="work"? workSecs : restSecs;
 const progressPercent = state ==="idle"? 100 : (timeLeft / maxTime) * 100;
 
 const totalWorkoutTime = (workSecs + restSecs) * totalRounds - (restSecs > 0 ? restSecs : 0);

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

 <ToolPageHeader icon={Activity} title="Workout Timer"description="Interval training timer for Tabata, HIIT, and EMOM workouts."actions={
 <Button variant="outline"size="icon"onClick={() => setSoundEnabled(!soundEnabled)}>
 {soundEnabled ? <Volume2 className="h-4 w-4"/> : <VolumeX className="h-4 w-4 text-muted-foreground"/>}
 </Button>
 } />
 
 <div className="grid gap-6 md:grid-cols-2">
 <GlassCard>
 <CardHeader>
 <CardTitle>Display</CardTitle>
 <CardDescription>Round {currentRound} of {totalRounds}</CardDescription>
 </CardHeader>
 <CardContent className="flex flex-col items-center justify-center space-y-8 py-8">
 <div className={cn(
"text-8xl font-black tracking-tighter transition-colors",
 state ==="work"?"text-primary": state ==="rest"?"text-primary": state ==="finished"?"text-green-500":"text-muted-foreground"
 )}>
 {formatTime(timeLeft)}
 </div>
 
 <div className="text-2xl font-semibold uppercase tracking-widest text-muted-foreground">
 {state ==="idle"&&"Ready"}
 {state ==="work"&&"Work"}
 {state ==="rest"&&"Rest"}
 {state ==="finished"&&"Finished"}
 </div>

 <div className="w-full h-4 bg-muted rounded-full overflow-hidden">
 <div 
 className={cn("h-full transition-all duration-1000 ease-linear", state ==="work"?"bg-primary": state ==="rest"?"bg-blue-500":"bg-muted-foreground")}
 style={{ width: `${progressPercent}%` }}
 />
 </div>

 <div className="flex gap-4">
 {(state ==="idle"|| isPaused || state ==="finished") ? (
 <Button size="lg"onClick={startTimer} className="w-32 h-16 text-lg"><Play className="mr-2 h-6 w-6"/> Start</Button>
 ) : (
 <Button size="lg"onClick={pauseTimer} variant="secondary"className="w-32 h-16 text-lg"><Pause className="mr-2 h-6 w-6"/> Pause</Button>
 )}
 <Button size="lg"onClick={resetTimer} variant="outline"className="w-32 h-16 text-lg"><RotateCcw className="mr-2 h-6 w-6"/> Reset</Button>
 </div>
 </CardContent>
 </GlassCard>
 
 <GlassCard>
 <CardHeader>
 <CardTitle>Settings</CardTitle>
 <CardDescription>Total Time: {formatTime(totalWorkoutTime)}</CardDescription>
 </CardHeader>
 <CardContent className="space-y-6">
 <div className="flex flex-wrap gap-2 mb-4">
 <Button size="sm"variant="secondary"onClick={() => setPreset(20, 10, 8)}>Tabata</Button>
 <Button size="sm"variant="secondary"onClick={() => setPreset(30, 30, 10)}>HIIT 30/30</Button>
 <Button size="sm"variant="secondary"onClick={() => setPreset(60, 0, 10)}>EMOM</Button>
 </div>

 <div className="space-y-4">
 <div className="space-y-2">
 <Label>Work Duration (seconds)</Label>
 <Input type="number"value={workSecs} onChange={(e) => { setWorkSecs(Number(e.target.value)); resetTimer(); }} min={1} />
 </div>
 <div className="space-y-2">
 <Label>Rest Duration (seconds)</Label>
 <Input type="number"value={restSecs} onChange={(e) => { setRestSecs(Number(e.target.value)); resetTimer(); }} min={0} />
 </div>
 <div className="space-y-2">
 <Label>Number of Rounds</Label>
 <Input type="number"value={totalRounds} onChange={(e) => { setTotalRounds(Number(e.target.value)); resetTimer(); }} min={1} />
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
          <h3>Why Use Our Workout Timer?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Workout Timer provides
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

      <RelatedTools currentToolUrl="/tools/health/workout-timer" max={6} />

</div>
 );
}
