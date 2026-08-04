"use client";

import React, { useState, useEffect, useRef } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Volume2, Type, Play, Copy, Square } from "lucide-react";
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const MORSE_MAP: Record<string, string> = {
  'a': '.-', 'b': '-...', 'c': '-.-.', 'd': '-..', 'e': '.', 'f': '..-.',
  'g': '--.', 'h': '....', 'i': '..', 'j': '.---', 'k': '-.-', 'l': '.-..',
  'm': '--', 'n': '-.', 'o': '---', 'p': '.--.', 'q': '--.-', 'r': '.-.',
  's': '...', 't': '-', 'u': '..-', 'v': '...-', 'w': '.--', 'x': '-..-',
  'y': '-.--', 'z': '--..', '1': '.----', '2': '..---', '3': '...--',
  '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
  '9': '----.', '0': '-----', ' ': '/'
};

const REVERSE_MORSE_MAP = Object.fromEntries(Object.entries(MORSE_MAP).map(([k, v]) => [v, k]));

export function MorseAudioClient() {
  const [text, setText] = useState("HELLO WORLD");
  const [morse, setMorse] = useState("");
  const [wpm, setWpm] = useState("15");
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSymbol, setActiveSymbol] = useState(-1);
  const [mode, setMode] = useState<"text2morse"|"morse2text">("text2morse");
  
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (mode === "text2morse") {
      const m = text.toLowerCase().split('').map(c => MORSE_MAP[c] || c).join(' ');
      setMorse(m);
    } else {
      const t = morse.split(' ').map(m => REVERSE_MORSE_MAP[m] || (m === '/' ? ' ' : m)).join('').toUpperCase();
      setText(t);
    }
  }, [text, morse, mode]);
  
  const stopPlayback = () => {
    setIsPlaying(false);
    setActiveSymbol(-1);
    if (audioCtxRef.current) {
      audioCtxRef.current.close();
      audioCtxRef.current = null;
    }
  };

  const playMorse = async () => {
    if (isPlaying) {
      stopPlayback();
      return;
    }
    
    setIsPlaying(true);
    setActiveSymbol(-1);
    
    // Initialize Web Audio API
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new AudioContextClass();
    audioCtxRef.current = ctx;
    
    const dotDuration = 1200 / parseInt(wpm); // Formula for WPM
    
    const playBeep = (duration: number): Promise<void> => {
      return new Promise(resolve => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = 600;
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(1, ctx.currentTime + 0.01);
        
        osc.start();
        
        setTimeout(() => {
          gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.01);
          setTimeout(() => {
            osc.stop();
            osc.disconnect();
            resolve();
          }, 10);
        }, duration);
      });
    };
    
    const wait = (ms: number) => new Promise(res => setTimeout(res, ms));
    
    const sequence = morse.replace(/\s+/g, ' ').split('');
    
    for (let i = 0; i < sequence.length; i++) {
      if (!audioCtxRef.current) break; // stopped
      
      const char = sequence[i];
      setActiveSymbol(i);
      
      if (char === '.') {
        await playBeep(dotDuration);
        await wait(dotDuration);
      } else if (char === '-') {
        await playBeep(dotDuration * 3);
        await wait(dotDuration);
      } else if (char === ' ') {
        await wait(dotDuration * 2); // 1 + 2 = 3 (letter gap)
      } else if (char === '/') {
        await wait(dotDuration * 6); // 1 + 6 = 7 (word gap)
      }
    }
    
    stopPlayback();
  };
  
  useEffect(() => {
    return () => {
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, []);

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={Volume2}
        title="Morse Code Audio"
        description="Convert text to Morse code with interactive audio playback."
        actions={
          <>
            <CopyButton getText={() => mode === 'text2morse' ? morse : text} label="Copy Output" />
            <ResetButton onClick={() => { setText(""); setMorse(""); }} label="Clear" />
          </>
        }
      />
      
      <GlassCard>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Converter</CardTitle>
              <CardDescription>Enter text or morse code</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Label className="text-sm">Mode:</Label>
              <Select value={mode} onValueChange={(v: "text2morse"|"morse2text") => setMode(v)}>
                <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="text2morse">Text to Morse</SelectItem>
                  <SelectItem value="morse2text">Morse to Text</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {mode === "text2morse" ? (
             <div className="space-y-2">
               <Label>Input Text</Label>
               <Textarea 
                 value={text} 
                 onChange={e => setText(e.target.value)} 
                 placeholder="Enter text to convert..."
                 className="min-h-[100px]"
               />
             </div>
          ) : (
             <div className="space-y-2">
               <Label>Input Morse Code (use spaces between letters, / between words)</Label>
               <Textarea 
                 value={morse} 
                 onChange={e => setMorse(e.target.value)} 
                 placeholder=".-.. .. -.- .   - .... .. ..."
                 className="min-h-[100px] font-mono text-lg"
               />
             </div>
          )}
          
          <div className="flex justify-center gap-4">
            <div className="flex items-center gap-2">
              <Label>Speed (WPM):</Label>
              <Select value={wpm} onValueChange={setWpm} disabled={isPlaying}>
                <SelectTrigger className="w-[80px]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="15">15</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button onClick={playMorse} variant={isPlaying ? "destructive" : "default"} className="min-w-[120px]">
              {isPlaying ? <><Square className="h-4 w-4 mr-2" /> Stop</> : <><Play className="h-4 w-4 mr-2" /> Play</>}
            </Button>
          </div>
          
          <Separator />
          
          {mode === "text2morse" ? (
             <div className="space-y-2">
               <Label>Morse Output</Label>
               <div className="p-4 bg-muted rounded-md min-h-[100px] font-mono text-xl flex flex-wrap gap-1 leading-loose">
                 {morse.split('').map((char, i) => (
                   <span key={i} className={"px-[2px] rounded " + (activeSymbol === i ? 'bg-primary text-primary-foreground' : '')}>
                     {char}
                   </span>
                 ))}
               </div>
             </div>
          ) : (
             <div className="space-y-2">
               <Label>Text Output</Label>
               <div className="p-4 bg-muted rounded-md min-h-[100px] text-lg">
                 {text}
               </div>
             </div>
          )}
          
        </CardContent>
      </GlassCard>
    </div>
  );
}
