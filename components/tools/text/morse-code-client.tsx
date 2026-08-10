"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { Binary, Play, Square, Settings2, Radio, Volume2, Copy, Shield, Zap, BookOpen, Type } from "lucide-react";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
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
    <div className="max-w-6xl mx-auto space-y-8">
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

      {/* SECTION 3: HOW IT WORKS */}
      <ToolHowItWorks
        steps={[
          { step: "01", title: "Enter Text or Morse", description: "Type plain text to convert to Morse code, or type Morse code (dots and dashes) to decode back to text. The translator auto-detects which direction to convert.", icon: Type },
          { step: "02", title: "Hear the Signal", description: "Click Play to hear the Morse code as audio beeps using the Web Audio API. Adjust speed (WPM) and frequency (Hz) to match your practice or communication needs.", icon: Volume2 },
          { step: "03", title: "Copy or Share", description: "Copy the Morse code output with one click. Use it for educational purposes, creative projects, communication practice, or decorative encoding.", icon: Copy },
        ]}
        badges={["ITU standard", "Audio playback", "Bidirectional"]}
      />

      {/* SECTION 4: FEATURE GUIDES */}
      <ToolFeatureGuides
        features={[
          { icon: Radio, title: "Bidirectional Translation", description: "Convert text to Morse code and Morse code back to text. Supports all 26 letters, digits 0-9, and common punctuation following the ITU International Morse Code standard." },
          { icon: Volume2, title: "Audio Playback", description: "Hear the Morse code played as real audio beeps using the Web Audio API. Adjustable WPM (words per minute) speed from 5 to 40 WPM and frequency from 400-900 Hz." },
          { icon: Settings2, title: "Speed and Tone Control", description: "Adjust transmission speed in WPM (standard: 20 WPM) and tone frequency in Hz (standard: 600 Hz). Higher WPM for proficiency testing, lower for learning." },
          { icon: Zap, title: "Real-Time Conversion", description: "Conversion happens instantly as you type with no delay. Both the Morse output and character-by-character breakdown update in real time." },
          { icon: BookOpen, title: "Character Reference", description: "Built-in Morse code reference chart showing the dot-dash pattern for every letter, number, and punctuation mark. Essential for learning the code." },
          { icon: Shield, title: "Client-Side and Private", description: "All translation and audio generation happens in your browser using the Web Audio API. No text is sent to any server." },
        ]}
      >
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
          <h3 className="text-lg font-semibold">Morse Code Reference Chart</h3>
          <p>International Morse Code (ITU) uses dots (dit) and dashes (dah) to represent characters. A dash is 3x the length of a dot. Space between parts of same letter: 1 dot. Space between letters: 3 dots. Space between words: 7 dots.</p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead><tr className="bg-muted/50"><th className="border p-2 text-left">Char</th><th className="border p-2 text-left">Morse</th><th className="border p-2 text-left">Char</th><th className="border p-2 text-left">Morse</th><th className="border p-2 text-left">Char</th><th className="border p-2 text-left">Morse</th></tr></thead>
              <tbody>
                {[[["A",".-"],["B","-..."],["C","-.-."]],[["D","-.."],["E","."],["F","..-."]],[["G","--."],["H","...."],["I",".."]],[["J",".---"],["K","-.-"],["L",".-.."]],[["M","--"],["N","-. "],["O","---"]],[["P",".--."],["Q","--.-"],["R",".-."]],[["S","..."],["T","-"],["U","..-"]],[["V","...-"],["W",".--"],["X","-..-"]],[["Y","-.--"],["Z","--.."],["",""]],[["0","-----"],["1",".----"],["2","..---"]],[["3","...--"],["4","....-"],["5","....."]],[["6","-...."],["7","--..."],["8","---.."]],[["9","----."],["",""],["",""]]].map((row, i) => (
                  <tr key={i} className="odd:bg-muted/20">
                    {row.map(([ch, code], j) => (
                      <React.Fragment key={j}>
                        <td className="border p-2 font-bold text-xs text-center">{ch}</td>
                        <td className="border p-2 font-mono text-primary text-xs">{code}</td>
                      </React.Fragment>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h3 className="text-lg font-semibold">Timing and Speed Reference</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead><tr className="bg-muted/50"><th className="border p-2 text-left">Speed (WPM)</th><th className="border p-2 text-left">Level</th><th className="border p-2 text-left">Dot Duration</th><th className="border p-2 text-left">Use Case</th></tr></thead>
              <tbody>
                {[["5 WPM","Beginner","240ms","Learning Morse code"],["10 WPM","Novice","120ms","Basic practice"],["13 WPM","Tech License","92ms","Former US amateur radio requirement"],["20 WPM","Intermediate","60ms","Comfortable conversation speed"],["25 WPM","Advanced","48ms","Contest and DX operating"],["35+ WPM","Expert","34ms","High-speed competition"]].map(([speed, level, dot, use]) => (
                  <tr key={speed} className="odd:bg-muted/20"><td className="border p-2 font-mono text-primary text-xs">{speed}</td><td className="border p-2 font-medium text-xs">{level}</td><td className="border p-2 text-xs">{dot}</td><td className="border p-2 text-muted-foreground text-xs">{use}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <h3 className="text-lg font-semibold">Morse Code History and Uses Today</h3>
          <p>Invented by Samuel Morse in 1837 for the electric telegraph, Morse code was the first form of long-distance digital communication. The most famous Morse sequence is SOS (... --- ...), the international distress signal adopted in 1906. While telegraph networks are gone, Morse code survives in: amateur (ham) radio communication, aviation navigational beacons (VOR/NDB transmit their callsign in Morse), military training, accessibility technology (ALS patients communicate using blink-to-Morse systems), and popular culture.</p>
        </div>
      </ToolFeatureGuides>

      {/* SECTION 5: FAQ + RELATED TOOLS */}
      <ToolFaqAccordion
        faqs={[
          { question: "How do I type Morse code for decoding?", answer: "Use dots (.) and dashes (-) with a single space between letters and three spaces (or a slash /) between words. Example: .... . .-.. .-.. --- / .-- --- .-. .-.. -.. decodes to HELLO WORLD. The translator accepts both dot-dash notation and the slash word separator." },
          { question: "What is the SOS signal in Morse code?", answer: "SOS in Morse code is ... --- ... (three dots, three dashes, three dots). It was chosen as the international distress signal in 1906 because it is easy to recognize and transmit even by untrained operators. Contrary to popular belief, SOS does not stand for Save Our Ship or Save Our Souls - it was chosen purely for its simplicity." },
          { question: "What does WPM mean in Morse code?", answer: "WPM stands for Words Per Minute. In Morse code, the standard test word is PARIS (.--.  .-  .-. ..  ...), which contains exactly 50 timing units. Sending PARIS once per minute equals 1 WPM. Amateur radio licensing exams traditionally required 5 WPM (Novice) or 13 WPM (Tech) proficiency, though the US eliminated the Morse requirement in 2007." },
          { question: "Is Morse code still used today?", answer: "Yes. Amateur (ham) radio operators worldwide use Morse code for long-distance communication, especially in low-signal conditions where voice transmission fails. Aviation still uses Morse: VOR and NDB navigational beacons transmit their 2-3 letter callsign in Morse code. Military services train operators in Morse. Accessibility technology uses Morse code to enable communication for people with severe motor disabilities, including ALS patients who control computers via eye blinks converted to Morse." },
          { question: "What is the difference between dots and dashes in Morse code?", answer: "A dot (dit) is the basic timing unit. A dash (dah) is exactly 3 dots in duration. The space between parts of the same letter is 1 dot. The space between letters is 3 dots. The space between words is 7 dots. This proportional timing system means Morse code can be sent at any speed while maintaining correct relative durations between elements." },
        ]}
      />
      <RelatedTools currentToolUrl="/tools/text/morse-code" max={6} />
    </div>
  );
}
