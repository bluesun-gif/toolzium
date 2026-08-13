"use client";

import React, { useState, useRef, useEffect, useMemo } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Radio, Play, Square, Copy, Volume2 } from"lucide-react";
import toast from"react-hot-toast";
import { CopyButton } from"@/components/shared/action-buttons";
import { GridPattern } from"@/components/magicui/grid-pattern";
import { GlassCard } from"@/components/ui/glass-card";

const cardClass ="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass ="border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass ="text-xs sm:text-sm font-semibold flex items-center gap-2";

const MORSE_MAP: Record<string, string> = {
 'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....',
 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.',
 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
 'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-',
 '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.', ' ': '/'
};

export default function MorseAudioClient() {
 const [text, setText] = useState("HELLO WORLD");
 const [wpm, setWpm] = useState(15);
 const [isPlaying, setIsPlaying] = useState(false);
 const audioCtxRef = useRef<AudioContext | null>(null);
 const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

 const morseCode = useMemo(() => {
 return text.toUpperCase().split('').map(c => MORSE_MAP[c] || '').join(' ');
 }, [text]);

 useEffect(() => {
 return () => {
 timeoutsRef.current.forEach(clearTimeout);
 if (audioCtxRef.current) audioCtxRef.current.close();
 };
 }, []);

 const stopAudio = () => {
 timeoutsRef.current.forEach(clearTimeout);
 timeoutsRef.current = [];
 setIsPlaying(false);
 if (audioCtxRef.current) {
 audioCtxRef.current.close();
 audioCtxRef.current = null;
 }
 };

 const playAudio = async () => {
 if (isPlaying) {
 stopAudio();
 return;
 }

 if (!text.trim()) {
 toast.error("Please enter some text first.");
 return;
 }

 setIsPlaying(true);
 const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
 audioCtxRef.current = ctx;

 const unit = 1.2 / wpm;
 const frequency = 600;

 let currentTime = ctx.currentTime;

 const chars = text.toUpperCase().split('');
 
 for (let i = 0; i < chars.length; i++) {
 const char = chars[i];
 const morse = MORSE_MAP[char];
 
 if (!morse) continue;

 if (morse === '/') {
 currentTime += unit * 7;
 } else {
 for (let j = 0; j < morse.length; j++) {
 const symbol = morse[j];
 
 const osc = ctx.createOscillator();
 const gain = ctx.createGain();
 osc.type = 'sine';
 osc.frequency.value = frequency;
 osc.connect(gain);
 gain.connect(ctx.destination);

 gain.gain.setValueAtTime(0, currentTime);
 gain.gain.linearRampToValueAtTime(0.5, currentTime + 0.01);
 
 const duration = symbol === '.' ? unit : unit * 3;
 gain.gain.setValueAtTime(0.5, currentTime + duration - 0.01);
 gain.gain.linearRampToValueAtTime(0, currentTime + duration);

 osc.start(currentTime);
 osc.stop(currentTime + duration);

 currentTime += duration + unit;
 }
 currentTime += unit * 2;
 }
 }

 const totalDuration = (currentTime - ctx.currentTime) * 1000;
 const endTimeout = setTimeout(() => {
 setIsPlaying(false);
 }, totalDuration);
 timeoutsRef.current.push(endTimeout);
 };

 return (
      <div className="relative max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6">
      <GridPattern />

 <ToolPageHeader 
 icon={Radio} 
 title="Morse Code Audio Player"
 description="Convert text to Morse code and listen to it with authentic Web Audio API beeps."
 />

 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>Translator & Player</CardTitle>
 </CardHeader>
 <CardContent className="p-6 space-y-6">
 <div className="space-y-2">
 <label className="text-sm font-medium">Input Text</label>
 <textarea
 value={text}
 onChange={(e) => setText(e.target.value)}
 className="w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50 h-24 resize-none"
 placeholder="Type your message here..."
 />
 </div>

 <div className="space-y-2">
 <div className="flex justify-between items-center">
 <label className="text-sm font-medium">Morse Output</label>
 <CopyButton getText={() => morseCode} label="Copy Morse"/>
 </div>
 <div className="p-4 bg-muted/50 rounded-lg font-mono text-lg tracking-widest break-all min-h-[60px]">
 {morseCode ||"..."}
 </div>
 </div>

 <div className="space-y-2">
 <div className="flex justify-between items-center">
 <label className="text-sm font-medium">Speed: {wpm} WPM</label>
 </div>
 <input 
 type="range"
 min="5"
 max="30"
 value={wpm} 
 onChange={(e) => setWpm(parseInt(e.target.value))}
 className="w-full accent-primary"
 disabled={isPlaying}
 />
 </div>

 <div className="flex gap-4">
 <Button onClick={playAudio} className="flex-1 gap-2"variant={isPlaying ?"destructive":"default"}>
 {isPlaying ? <><Square className="w-4 h-4"/> Stop</> : <><Play className="w-4 h-4"/> Play Audio</>}
 </Button>
 </div>
 </CardContent>
 </GlassCard>

 <ToolHowItWorks 
 steps={[
 { step:"01", title:"Enter Your Text", description:"Type any message into the text area to see it instantly translated.", icon: Radio },
 { step:"02", title:"Adjust the Speed", description:"Use the slider to set the Words Per Minute (WPM) playback speed.", icon: Volume2 },
 { step:"03", title:"Listen & Copy", description:"Hit play to hear authentic Morse beeps, or copy the code to share.", icon: Copy }
 ]} 
 badges={["100% Free","Client-Side","Fun"]} 
 />

 <ToolFeatureGuides features={[
 { icon: Radio, title:"Real-Time Translation", description:"Watch your text convert to dots and dashes instantly as you type."},
 { icon: Volume2, title:"Web Audio API", description:"Generates pure sine wave tones directly in your browser with zero latency."},
 { icon: Play, title:"Adjustable WPM", description:"Control the playback speed from a slow 5 WPM up to a rapid 30 WPM."},
 { icon: Copy, title:"One-Click Copy", description:"Easily copy the generated Morse string to your clipboard for use elsewhere."}
 ]}>
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <p>Morse code is a method used in telecommunication to encode text characters as standardized sequences of two different signal durations, called dots and dashes. Invented by Samuel Morse in the 1830s, it revolutionized long-distance communication.</p>
 <p>This Morse Code Audio Player utilizes the Web Audio API to synthesize authentic-sounding radio tones on the fly. Unlike pre-recorded audio files, this approach ensures perfect timing based on your chosen Words Per Minute (WPM) speed without downloading any external assets.</p>
 <p>Whether you are a ham radio enthusiast practicing your listening skills, a student learning about historical communication methods, or just sending a secret message to a friend, this tool provides an accurate and private translation experience.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion faqs={[
 { question:"What does WPM mean?", answer:"WPM stands for Words Per Minute. It is the standard measurement for Morse code transmission speed. 15 WPM is considered a standard conversational pace."},
 { question:"Why can't I hear any sound?", answer:"Modern browsers require user interaction before playing audio. Ensure you have clicked the 'Play Audio' button and that your device is not muted."},
 { question:"Are spaces and numbers supported?", answer:"Yes! Spaces are converted to the '/' separator, and all numbers 0-9 have their standard Morse code representations."}
 ]} />

 <RelatedTools currentToolUrl="/tools/fun/morse-audio" max={6} />
 </div>
 );
}
