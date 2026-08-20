"use client";

import React, { useState, useMemo, useRef } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ToolBackground } from "@/components/shared/tool-background";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { ShareResultButton } from "@/components/shared/share-result-modal";
import { EmbedButton } from "@/components/shared/embed-modal";
import { cn } from "@/lib/utils";
import {
  Radio, ArrowRightLeft, Volume2, Square, Copy, Check, Trash2, Download,
  Sparkles, AudioLines, BookOpen, Lightbulb
} from "lucide-react";
import toast from "react-hot-toast";

const MORSE_MAP: Record<string, string> = {
  A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".", F: "..-.", G: "--.", H: "....",
  I: "..", J: ".---", K: "-.-", L: ".-..", M: "--", N: "-.", O: "---", P: ".--.",
  Q: "--.-", R: ".-.", S: "...", T: "-", U: "..-", V: "...-", W: ".--", X: "-..-",
  Y: "-.--", Z: "--..",
  "0": "-----", "1": ".----", "2": "..---", "3": "...--", "4": "....-",
  "5": ".....", "6": "-....", "7": "--...", "8": "---..", "9": "----.",
  ".": ".-.-.-", ",": "--..--", "?": "..--..", "'": ".----.", "!": "-.-.--",
  "/": "-..-.", "(": "-.--.", ")": "-.--.-", "&": ".-...", ":": "---...",
  ";": "-.-.-.", "=": "-...-", "+": ".-.-.", "-": "-....-", "_": "..--.-",
  '"': ".-..-.", "$": "...-..-", "@": ".--.-.", " ": "/"
};

const REVERSE_MORSE_MAP: Record<string, string> = Object.fromEntries(
  Object.entries(MORSE_MAP).map(([k, v]) => [v, k])
);
// Also support alternate representations
REVERSE_MORSE_MAP["-..-."] = "/";
REVERSE_MORSE_MAP["/"] = " ";

function encodeToMorse(text: string): string {
  if (!text) return "";
  return text
    .toUpperCase()
    .trim()
    .split(/\s+/)
    .map((word) =>
      Array.from(word)
        .map((char) => MORSE_MAP[char] || "")
        .filter(Boolean)
        .join(" ")
    )
    .join(" / ");
}

function decodeFromMorse(morseText: string): string {
  if (!morseText) return "";
  const cleaned = morseText.trim();

  // If input contains slashes as word boundaries
  if (cleaned.includes("/")) {
    // Check if slashes are separating letters (e.g. ".-../---/...-/.") or words ("... --- ... / ... --- ...")
    const parts = cleaned.split("/");
    const isSlashPerLetter = parts.every((p) => {
      const trimmed = p.trim();
      return trimmed === "" || REVERSE_MORSE_MAP[trimmed] !== undefined;
    });

    if (isSlashPerLetter) {
      // Decode slash-separated letters
      return parts
        .map((p) => {
          const trimmed = p.trim();
          if (!trimmed) return " ";
          return REVERSE_MORSE_MAP[trimmed] || "?";
        })
        .join("");
    } else {
      // Decode word separated by slashes and letters separated by spaces
      return parts
        .map((word) =>
          word
            .trim()
            .split(/\s+/)
            .map((char) => REVERSE_MORSE_MAP[char.trim()] || "")
            .join("")
        )
        .join(" ");
    }
  }

  // Standard space-separated morse
  const words = cleaned.split(/\s{3,}|\n+/);
  return words
    .map((word) =>
      word
        .trim()
        .split(/\s+/)
        .map((char) => REVERSE_MORSE_MAP[char.trim()] || "")
        .join("")
    )
    .join(" ");
}

const SAMPLE_TEXTS = ["LOVE", "HELLO WORLD", "SOS EMERGENCY", "TOOLZIUM"];

export default function MorseCodeClient() {
  const [mode, setMode] = useState<"text-to-morse" | "morse-to-text">("text-to-morse");
  const [input, setInput] = useState<string>("love");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const playAbortRef = useRef<boolean>(false);

  const output = useMemo(() => {
    if (!input.trim()) return "";
    return mode === "text-to-morse" ? encodeToMorse(input) : decodeFromMorse(input);
  }, [input, mode]);

  const handleModeSwap = () => {
    stopAudio();
    const nextMode = mode === "text-to-morse" ? "morse-to-text" : "text-to-morse";
    setMode(nextMode);
    setInput(output);
    toast.success(`Switched to ${nextMode === "text-to-morse" ? "Text to Morse" : "Morse to Text"}`);
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    toast.success("Output copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  // Play realistic Morse Code Beeps via Web Audio API
  const playMorseAudio = async () => {
    const morseCode = mode === "text-to-morse" ? output : input;
    if (!morseCode.trim()) {
      toast.error("No Morse code to play.");
      return;
    }

    if (isPlaying) {
      stopAudio();
      return;
    }

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;
      playAbortRef.current = false;
      setIsPlaying(true);

      const dotTime = 0.08; // seconds per dot
      const dashTime = dotTime * 3;
      const symbolGap = dotTime;
      const letterGap = dotTime * 3;
      const wordGap = dotTime * 7;

      const playTone = (duration: number) => {
        return new Promise<void>((resolve) => {
          if (playAbortRef.current) return resolve();

          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(650, ctx.currentTime);

          gain.gain.setValueAtTime(0, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.005);
          gain.gain.setValueAtTime(0.3, ctx.currentTime + duration - 0.005);
          gain.gain.linearRampToValueAtTime(0, ctx.currentTime + duration);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start();
          osc.stop(ctx.currentTime + duration);
          setTimeout(resolve, duration * 1000);
        });
      };

      const pause = (duration: number) => {
        return new Promise<void>((resolve) => {
          setTimeout(resolve, duration * 1000);
        });
      };

      for (let i = 0; i < morseCode.length; i++) {
        if (playAbortRef.current) break;
        const char = morseCode[i];

        if (char === ".") {
          await playTone(dotTime);
          await pause(symbolGap);
        } else if (char === "-") {
          await playTone(dashTime);
          await pause(symbolGap);
        } else if (char === " ") {
          await pause(letterGap);
        } else if (char === "/") {
          await pause(wordGap);
        }
      }
    } catch (err) {
      console.error("Audio error:", err);
    } finally {
      setIsPlaying(false);
    }
  };

  const stopAudio = () => {
    playAbortRef.current = true;
    if (audioCtxRef.current) {
      try {
        audioCtxRef.current.close();
      } catch (e) {}
      audioCtxRef.current = null;
    }
    setIsPlaying(false);
  };

  return (
    <div className="min-h-screen relative pb-20">
      <ToolBackground />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 space-y-8">
        
        {/* Page Header */}
        <ToolPageHeader
          title="International Morse Code Translator & Audio Player"
          description="Encode plain text into standard Morse code and decode Morse code dots and dashes back into readable text with real-time audio playback."
          icon={Radio}
          badgeText="📻 Two-Way Morse Translator • Audio Synthesizer"
        />

        {/* Mode Selector Pill */}
        <div className="flex items-center gap-2 p-1.5 bg-muted/40 rounded-2xl border border-border/60 max-w-md mx-auto">
          <button
            type="button"
            onClick={() => {
              stopAudio();
              setMode("text-to-morse");
            }}
            className={cn(
              "flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer",
              mode === "text-to-morse"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-background/60"
            )}
          >
            <span>Text ➔ Morse</span>
          </button>

          <button
            type="button"
            onClick={() => {
              stopAudio();
              setMode("morse-to-text");
            }}
            className={cn(
              "flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer",
              mode === "morse-to-text"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-background/60"
            )}
          >
            <span>Morse ➔ Text</span>
          </button>
        </div>

        {/* Translation Studio */}
        <GlassCard className="p-5 sm:p-6 space-y-5">
          
          {/* Sample Chips */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-3">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] text-muted-foreground font-semibold">Sample text:</span>
              {SAMPLE_TEXTS.map((sample, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    stopAudio();
                    if (mode === "text-to-morse") {
                      setInput(sample);
                    } else {
                      setInput(encodeToMorse(sample));
                    }
                  }}
                  className="text-[11px] bg-muted/50 hover:bg-primary/10 hover:text-primary text-muted-foreground px-2.5 py-0.5 rounded-md border border-border/60 transition-all cursor-pointer font-mono"
                >
                  {sample}
                </button>
              ))}
            </div>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleModeSwap}
              className="text-xs font-semibold gap-1.5 h-8 rounded-xl"
            >
              <ArrowRightLeft className="w-3.5 h-3.5" />
              <span>Swap Direction</span>
            </Button>
          </div>

          {/* Two-Column Input/Output Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Input Card */}
            <div className="flex flex-col space-y-2 rounded-2xl border border-border/80 bg-background/60 p-4 shadow-sm">
              <div className="flex items-center justify-between text-xs text-muted-foreground pb-1 border-b border-border/40">
                <span className="font-bold text-foreground">
                  {mode === "text-to-morse" ? "Input Text (Letters & Numbers)" : "Input Morse Code (Dots & Dashes)"}
                </span>
                {input && (
                  <button
                    type="button"
                    onClick={() => {
                      stopAudio();
                      setInput("");
                    }}
                    className="text-[11px] text-muted-foreground hover:text-destructive flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" /> Clear
                  </button>
                )}
              </div>

              <textarea
                value={input}
                onChange={(e) => {
                  stopAudio();
                  setInput(e.target.value);
                }}
                placeholder={
                  mode === "text-to-morse"
                    ? "Type text here to convert to Morse code (e.g. LOVE)..."
                    : "Enter Morse code (e.g. .-.. --- ...- . or .-../---/...-/. )..."
                }
                rows={7}
                className="w-full bg-transparent text-foreground text-sm sm:text-base font-mono outline-none resize-y min-h-[160px] leading-relaxed"
              />

              <div className="text-[11px] text-muted-foreground font-mono pt-1 text-right">
                {input.length} characters
              </div>
            </div>

            {/* Output Card */}
            <div className="flex flex-col space-y-2 rounded-2xl border border-primary/20 bg-primary/5 p-4 shadow-sm">
              <div className="flex items-center justify-between text-xs text-muted-foreground pb-1 border-b border-border/40">
                <span className="font-bold text-primary">
                  {mode === "text-to-morse" ? "Morse Code Output" : "Decoded Text Output"}
                </span>

                <div className="flex items-center gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={playMorseAudio}
                    disabled={!output.trim()}
                    className={cn(
                      "h-8 text-xs font-semibold gap-1",
                      isPlaying
                        ? "text-red-500 hover:text-red-600 animate-pulse"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {isPlaying ? (
                      <>
                        <Square className="w-3.5 h-3.5 fill-current" />
                        <span>Stop Audio</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Play Beeps</span>
                      </>
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleCopy}
                    disabled={!output.trim()}
                    className="h-8 text-xs font-semibold gap-1 text-muted-foreground hover:text-foreground"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "Copied" : "Copy"}</span>
                  </Button>
                </div>
              </div>

              <div className="flex-1 py-1 text-foreground font-mono text-sm sm:text-base font-semibold whitespace-pre-wrap select-all leading-relaxed min-h-[160px]">
                {output || <span className="text-muted-foreground font-normal italic">Output will appear here...</span>}
              </div>

              <div className="flex items-center justify-between text-[11px] text-muted-foreground font-mono pt-1">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Standard ITU Morse Code
                </span>
                <span>{output.length} characters</span>
              </div>
            </div>

          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-border/60">
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant={isPlaying ? "destructive" : "outline"}
                size="sm"
                onClick={playMorseAudio}
                disabled={!output.trim()}
                className="rounded-xl text-xs font-bold gap-1.5 h-9"
              >
                {isPlaying ? <AudioLines className="w-4 h-4 animate-bounce" /> : <Volume2 className="w-4 h-4" />}
                <span>{isPlaying ? "Playing 650Hz Beeps..." : "Play Morse Audio"}</span>
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <ShareResultButton
                toolTitle="Morse Code Translator"
                resultTitle="Morse Code Translation"
                resultSummary={`Converted "${input.slice(0, 40)}" to Morse code.`}
                resultMetrics={[
                  { label: "Mode", value: mode === "text-to-morse" ? "Text to Morse" : "Morse to Text" },
                  { label: "Output Length", value: `${output.length} chars` },
                ]}
              />
              <EmbedButton toolPath="/tools/text/morse-code" toolTitle="Morse Code Translator" />
            </div>
          </div>

        </GlassCard>

        {/* International Morse Code Alphabet Quick Reference */}
        <GlassCard className="p-5 sm:p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-border/60 pb-3">
            <BookOpen className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-bold text-foreground">International Morse Code Reference Guide</h3>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-9 gap-2 text-center text-xs font-mono">
            {Object.entries(MORSE_MAP)
              .filter(([k]) => k !== " ")
              .map(([char, morse]) => (
                <div key={char} className="p-2 rounded-xl bg-muted/30 border border-border/40">
                  <div className="font-extrabold text-foreground">{char}</div>
                  <div className="text-primary text-[11px] font-bold mt-0.5">{morse}</div>
                </div>
              ))}
          </div>
        </GlassCard>

        {/* How It Works & Guides */}
        <ToolHowItWorks
          steps={[
            { step: "1", title: "Input Text or Morse", description: "Type letters, numbers, punctuation, or paste dots and dashes (separated by spaces or slashes)." },
            { step: "2", title: "Two-Way Instant Conversion", description: "Our engine translates bi-directionally in real-time according to ITU standards." },
            { step: "3", title: "Audio Playback & Copy", description: "Listen to the audio beeps or copy the converted output with a single click." }
          ]}
        />

        <ToolFeatureGuides
          features={[
            { title: "Two-Way Translation", description: "Seamlessly decode both space-separated and slash-separated Morse code back to plain text." },
            { title: "Synthesized Audio Player", description: "Listen to realistic 650Hz audio tones with precise international Morse timing ratios." },
            { title: "Complete Alphabet Reference", description: "Full reference chart for all letters A–Z, numbers 0–9, and common punctuation marks." }
          ]}
        />

        <ToolFaqAccordion
          faqs={[
            { question: "How are letters and words separated in Morse code?", answer: "In standard Morse code, letters within a word are separated by a space (' '), and words are separated by a slash (' / ') or three spaces." },
            { question: "Can this tool decode Morse code with slashes?", answer: "Yes! Our decoder automatically detects slash-separated characters (e.g. .-../---/...-/.) as well as standard space-separated words." },
            { question: "What is the famous SOS signal in Morse code?", answer: "SOS is encoded as '... --- ...' (three dots, three dashes, three dots). It was chosen for its distinct, easily recognizable audio pattern." }
          ]}
        />

        <RelatedTools currentToolUrl="/tools/text/morse-code" />

      </div>
    </div>
  );
}
