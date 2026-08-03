"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { Binary, Play, Square, Settings2 } from "lucide-react";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GlassCard } from "@/components/ui/glass-card";
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";

const MORSE_CODE_DICT: Record<string, string> = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
  'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
  'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
  'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--',
  '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
  '9': '----.', '0': '-----', ',': '--..--', '.': '.-.-.-', '?': '..--..',
  '/': '-..-.', '-': '-....-', '(': '-.--.', ')': '-.--.-', '!': '-.-.--',
  '@': '.--.-.', '&': '.-...', ':': '---...', ';': '-.-.-.', '=': '-...-',
  '+': '.-.-.', '_': '..--.-', '"': '.-..-.', '$': '...-..-', '\'': '.----.'
};

const REVERSE_DICT: Record<string, string> = Object.entries(MORSE_CODE_DICT).reduce((acc, [key, value]) => {
  acc[value] = key;
  return acc;
}, {} as Record<string, string>);

export function MorseCodeClient() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isMorseInput, setIsMorseInput] = useState(false);
  const [wpm, setWpm] = useState(20);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const timeoutIdsRef = useRef<NodeJS.Timeout[]>([]);

  const stopAudio = useCallback(() => {
    timeoutIdsRef.current.forEach(clearTimeout);
    timeoutIdsRef.current = [];
    if (oscillatorRef.current) {
      try {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
      } catch (e) {
        // Ignore errors if already stopped
      }
      oscillatorRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  useEffect(() => {
    return () => {
      stopAudio();
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, [stopAudio]);

  const detectAndTranslate = useCallback((text: string) => {
    if (!text.trim()) {
      setOutput("");
      setIsMorseInput(false);
      return;
    }

    // Check if input is likely Morse code (mostly dots, dashes, spaces, and slashes)
    const isMorse = /^[.\- \/\n]+$/.test(text);
    setIsMorseInput(isMorse);

    if (isMorse) {
      // Decode Morse to Text
      const words = text.trim().split(/[\/\n]+|   +/);
      const decoded = words.map(word => {
        return word.split(' ').map(char => REVERSE_DICT[char] || char).join('');
      }).join(' ');
      setOutput(decoded);
    } else {
      // Encode Text to Morse
      const encoded = text.toUpperCase().split('').map(char => {
        if (char === ' ' || char === '\n') return '/';
        return MORSE_CODE_DICT[char] || char;
      }).join(' ');
      setOutput(encoded);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setInput(val);
    detectAndTranslate(val);
  };

  const handleReset = () => {
    setInput("");
    setOutput("");
    stopAudio();
  };

  const playMorse = async () => {
    if (isPlaying) {
      stopAudio();
      return;
    }
    
    let morseToPlay = isMorseInput ? input : output;
    if (!morseToPlay) return;
    
    // Normalize spaces and slashes for playback
    morseToPlay = morseToPlay.replace(/\//g, ' / ');

    setIsPlaying(true);
    
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') {
      await ctx.resume();
    }

    const dotDuration = 1.2 / wpm; // Standard formula for dot duration based on WPM
    
    let currentTime = ctx.currentTime;
    
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, ctx.currentTime); // 600Hz tone
    
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    osc.start(ctx.currentTime);
    oscillatorRef.current = osc;

    const sequence: {type: string, duration: number}[] = [];
    
    for (let i = 0; i < morseToPlay.length; i++) {
      const char = morseToPlay[i];
      if (char === '.') {
        sequence.push({ type: 'on', duration: dotDuration });
        sequence.push({ type: 'off', duration: dotDuration }); // Space between parts of same letter
      } else if (char === '-') {
        sequence.push({ type: 'on', duration: dotDuration * 3 });
        sequence.push({ type: 'off', duration: dotDuration });
      } else if (char === ' ') {
        sequence.push({ type: 'off', duration: dotDuration * 2 }); // Space between letters (3 - 1 from above)
      } else if (char === '/') {
        sequence.push({ type: 'off', duration: dotDuration * 6 }); // Space between words (7 - 1 from above)
      }
    }

    let scheduleTime = ctx.currentTime;
    sequence.forEach(({ type, duration }) => {
      if (type === 'on') {
        gainNode.gain.setValueAtTime(1, scheduleTime);
        gainNode.gain.setTargetAtTime(0, scheduleTime + duration - 0.01, 0.01); // smooth off to avoid clicks
      }
      scheduleTime += duration;
    });

    // Schedule stop
    const stopTime = scheduleTime;
    
    const stopTimeoutId = setTimeout(() => {
      stopAudio();
    }, (stopTime - ctx.currentTime) * 1000);
    
    timeoutIdsRef.current.push(stopTimeoutId);
  };

  return (
    <div className="space-y-6">
      <ToolPageHeader
        title="Morse Code Translator"
        description="Translate text to morse code and vice-versa. Includes audio playback and adjustable speeds."
        icon={Binary}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard>
          <CardHeader>
            <CardTitle>{isMorseInput ? 'Morse Code (Input)' : 'Text (Input)'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder={isMorseInput ? "Enter morse code (e.g. .... . .-.. .-.. ---)" : "Enter text to translate..."}
              value={input}
              onChange={handleInputChange}
              className="min-h-[200px] resize-y font-mono text-lg"
            />
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Auto-detects direction based on input
              </span>
              <ResetButton onClick={handleReset} />
            </div>
          </CardContent>
        </GlassCard>

        <GlassCard>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle>{isMorseInput ? 'Text (Output)' : 'Morse Code (Output)'}</CardTitle>
            <div className="flex gap-2">
              <ActionButton
                onClick={playMorse}
                disabled={!input}
                icon={isPlaying ? Square : Play}
                label={isPlaying ? "Stop" : "Play"}
                variant={isPlaying ? "destructive" : "secondary"}
              />
              <CopyButton getText={() => output} />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="min-h-[200px] p-3 rounded-md bg-muted/50 border overflow-y-auto font-mono text-lg break-words">
              {output || <span className="text-muted-foreground italic">Translation will appear here...</span>}
            </div>
            
            <div className="space-y-3 pt-4 border-t border-border/50">
              <div className="flex justify-between">
                <Label className="flex items-center gap-2">
                  <Settings2 className="w-4 h-4 text-muted-foreground" />
                  Playback Speed (WPM)
                </Label>
                <span className="text-sm font-medium">{wpm} WPM</span>
              </div>
              <Slider
                value={[wpm]}
                min={5}
                max={40}
                step={1}
                onValueChange={(vals) => setWpm(vals[0])}
                disabled={isPlaying}
              />
            </div>
          </CardContent>
        </GlassCard>
      </div>
    </div>
  );
}
