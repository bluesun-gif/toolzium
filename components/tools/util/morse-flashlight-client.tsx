"use client";

import { useState, useRef, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Switch } from"@/components/ui/switch";
import { CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { Zap, Volume2, Play, Square, AlertTriangle } from"lucide-react";
import { cn } from"@/lib/utils";

const MORSE_MAP: Record<string, string> = {
 a:".-", b:"-...", c:"-.-.", d:"-..", e:".", f:"..-.", g:"--.", h:"....", i:"..", j:".---", k:"-.-", l:".-..", m:"--",
 n:"-.", o:"---", p:".--.", q:"--.-", r:".-.", s:"...", t:"-", u:"..-", v:"...-", w:".--", x:"-..-", y:"-.--", z:"--..",
"0":"-----","1":".----","2":"..---","3":"...--","4":"....-","5":".....","6":"-....","7":"--...","8":"---..","9":"----.",
"":"/",
};

export function MorseFlashlightClient() {
 const [text, setText] = useState("");
 const [morse, setMorse] = useState("");
 const [wpm, setWpm] = useState(15);
 const [useAudio, setUseAudio] = useState(false);
 const [isPlaying, setIsPlaying] = useState(false);
 const [isFlashing, setIsFlashing] = useState(false);
 const audioCtxRef = useRef<AudioContext | null>(null);
 const playTimeoutRef = useRef<NodeJS.Timeout | null>(null);
 const stopFlagRef = useRef(false);

 useEffect(() => {
 let result ="";
 for (const char of text.toLowerCase()) {
 if (MORSE_MAP[char]) result += MORSE_MAP[char] +"";
 }
 setMorse(result.trim());
 }, [text]);

 const initAudio = () => {
 if (!audioCtxRef.current) {
 audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
 }
 };

 const playBeep = (durationMs: number) => {
 if (!audioCtxRef.current) return;
 const osc = audioCtxRef.current.createOscillator();
 const gain = audioCtxRef.current.createGain();
 osc.type ="sine";
 osc.frequency.value = 600;
 osc.connect(gain);
 gain.connect(audioCtxRef.current.destination);
 osc.start();
 gain.gain.setValueAtTime(1, audioCtxRef.current.currentTime);
 gain.gain.exponentialRampToValueAtTime(0.001, audioCtxRef.current.currentTime + durationMs / 1000);
 osc.stop(audioCtxRef.current.currentTime + durationMs / 1000);
 };

 const playMorse = async () => {
 if (!morse || isPlaying) return;
 if (useAudio) initAudio();
 
 setIsPlaying(true);
 stopFlagRef.current = false;
 
 // Timing calculation based on standard PARIS word
 const dotDuration = 1200 / wpm; 
 const dashDuration = dotDuration * 3;
 const intraCharGap = dotDuration;
 const interCharGap = dotDuration * 3;
 const wordGap = dotDuration * 7;

 const sleep = (ms: number) => new Promise(resolve => {
 playTimeoutRef.current = setTimeout(resolve, ms);
 });

 for (let i = 0; i < morse.length; i++) {
 if (stopFlagRef.current) break;
 
 const char = morse[i];
 if (char ===".") {
 setIsFlashing(true);
 if (useAudio) playBeep(dotDuration);
 await sleep(dotDuration);
 setIsFlashing(false);
 await sleep(intraCharGap);
 } else if (char ==="-") {
 setIsFlashing(true);
 if (useAudio) playBeep(dashDuration);
 await sleep(dashDuration);
 setIsFlashing(false);
 await sleep(intraCharGap);
 } else if (char ==="") {
 await sleep(interCharGap);
 } else if (char ==="/") {
 await sleep(wordGap);
 }
 }
 setIsPlaying(false);
 setIsFlashing(false);
 };

 const stopMorse = () => {
 stopFlagRef.current = true;
 if (playTimeoutRef.current) clearTimeout(playTimeoutRef.current);
 setIsPlaying(false);
 setIsFlashing(false);
 };

 const handleSos = () => {
 setText("SOS");
 };

 return (
 <div className="space-y-6">
 {isFlashing && (
 <div className="fixed inset-0 z-50 bg-background pointer-events-none transition-colors duration-75"></div>
 )}
 
 <ToolPageHeader
 icon={Zap}
 title="Morse Code Flashlight"
 description="Translate text to Morse code and play it visually or audibly."
 actions={
 <CopyButton getText={() => morse} label="Copy Morse"/>
 }
 />

 <div className="grid md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Controls</CardTitle>
 <CardDescription>Enter text and adjust playback settings</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Text to Translate</Label>
 <Input 
 value={text} 
 onChange={(e) => setText(e.target.value)} 
 placeholder="Hello World"
 disabled={isPlaying}
 />
 </div>
 
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Speed (WPM): {wpm}</Label>
 <input 
 type="range"
 min="5"
 max="40"
 value={wpm} 
 onChange={(e) => setWpm(parseInt(e.target.value))}
 disabled={isPlaying}
 className="w-full"
 />
 </div>
 <div className="flex items-center space-x-2 pt-6">
 <Switch 
 id="audio-mode"
 checked={useAudio} 
 onCheckedChange={setUseAudio}
 disabled={isPlaying}
 />
 <Label htmlFor="audio-mode"className="flex items-center gap-2">
 <Volume2 className="w-4 h-4"/> Audio Beep
 </Label>
 </div>
 </div>

 <div className="flex gap-2 pt-4">
 <Button onClick={playMorse} disabled={isPlaying || !morse} className="flex-1">
 <Play className="w-4 h-4 mr-2"/> Play
 </Button>
 <Button onClick={stopMorse} disabled={!isPlaying} variant="destructive"className="flex-1">
 <Square className="w-4 h-4 mr-2"/> Stop
 </Button>
 <Button onClick={handleSos} variant="outline"disabled={isPlaying}>
 <AlertTriangle className="w-4 h-4 mr-2"/> SOS
 </Button>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Morse Output</CardTitle>
 <CardDescription>Standard International Morse Code</CardDescription>
 </CardHeader>
 <CardContent>
 <div className="p-4 bg-muted rounded-md min-h-[100px] text-2xl tracking-widest break-words font-mono">
 {morse || <span className="text-muted-foreground text-sm tracking-normal font-sans">Translation will appear here...</span>}
 </div>
 </CardContent>
 </GlassCard>
 </div>
 </div>
 );
}
