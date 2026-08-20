"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ToolBackground } from "@/components/shared/tool-background";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { ShareResultButton } from "@/components/shared/share-result-modal";
import { EmbedButton } from "@/components/shared/embed-modal";
import { cn } from "@/lib/utils";
import {
  Volume2, Play, Pause, Square, RotateCcw, Copy, Check, Download,
  Sparkles, Languages, Gauge, Sliders, AudioLines, FileText, ChevronDown
} from "lucide-react";
import toast from "react-hot-toast";

const SAMPLE_TEXTS = [
  {
    title: "Technology Briefing",
    text: "Artificial intelligence and agentic workflows are rapidly transforming modern software engineering. With distributed inference and instant client-side tools, developers can build faster and scale globally.",
  },
  {
    title: "Audiobook Story",
    text: "The morning mist drifted across the silent valley as the first rays of golden sunlight touched the mountain peaks. Somewhere in the distance, a gentle stream whispered through the ancient pines.",
  },
  {
    title: "Business Pitch",
    text: "Toolzium provides over five hundred privacy-friendly, lightning-fast utility tools directly in your browser. With zero server latency and end-to-end encryption, it's the ultimate productivity powerhouse.",
  },
  {
    title: "Tongue Twister",
    text: "Peter Piper picked a peck of pickled peppers. A peck of pickled peppers Peter Piper picked. If Peter Piper picked a peck of pickled peppers, where's the peck of pickled peppers Peter Piper picked?",
  },
];

export default function TextToSpeechClient() {
  const [text, setText] = useState(SAMPLE_TEXTS[0].text);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceIndex, setSelectedVoiceIndex] = useState<number>(0);
  const [rate, setRate] = useState<number>(1.0);
  const [pitch, setPitch] = useState<number>(1.0);
  const [volume, setVolume] = useState<number>(1.0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [activeWord, setActiveWord] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Initialize SpeechSynthesis and populate available voices
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      synthRef.current = window.speechSynthesis;

      const loadVoices = () => {
        const available = synthRef.current?.getVoices() || [];
        setVoices(available);
        if (available.length > 0) {
          // Default to first English voice or index 0
          const defaultIdx = available.findIndex((v) => v.lang.startsWith("en") || v.default);
          setSelectedVoiceIndex(defaultIdx >= 0 ? defaultIdx : 0);
        }
      };

      loadVoices();
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = loadVoices;
      }
    }

    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  const wordCount = useMemo(() => (text.trim() ? text.trim().split(/\s+/).length : 0), [text]);
  const charCount = text.length;
  const estimatedDuration = useMemo(() => {
    if (wordCount === 0) return "0 sec";
    const minutes = wordCount / (150 * rate);
    const secs = Math.round(minutes * 60);
    if (secs < 60) return `${secs} sec`;
    return `${Math.floor(secs / 60)}m ${secs % 60}s`;
  }, [wordCount, rate]);

  const handlePlay = () => {
    if (!synthRef.current) {
      toast.error("Text to Speech is not supported in this browser.");
      return;
    }

    if (!text.trim()) {
      toast.error("Please enter some text to speak.");
      return;
    }

    // If currently paused, resume playback
    if (isPaused) {
      synthRef.current.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    // Cancel any previous speech
    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    if (voices[selectedVoiceIndex]) {
      utterance.voice = voices[selectedVoiceIndex];
    }
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = volume;

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };

    utterance.onboundary = (event) => {
      if (event.name === "word") {
        const spoken = text.substring(event.charIndex, event.charIndex + (event.charLength || 10));
        setActiveWord(spoken.trim());
      }
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setActiveWord("");
    };

    utterance.onerror = (e) => {
      console.error("Speech error", e);
      setIsPlaying(false);
      setIsPaused(false);
      setActiveWord("");
    };

    utteranceRef.current = utterance;
    synthRef.current.speak(utterance);
  };

  const handlePause = () => {
    if (synthRef.current && isPlaying) {
      synthRef.current.pause();
      setIsPlaying(false);
      setIsPaused(true);
    }
  };

  const handleStop = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsPlaying(false);
      setIsPaused(false);
      setActiveWord("");
    }
  };

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Text copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen relative pb-20">
      <ToolBackground />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 space-y-8">
        
        {/* Page Header */}
        <ToolPageHeader
          title="Text to Speech Reader & Audio Generator"
          description="Read any text aloud with natural AI voices, customizable accents, speed, pitch, and real-time word highlighting with 100% private in-browser audio synthesis."
          icon={Volume2}
          badgeText="🔊 Natural High-Definition Voice Engine"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Text Input & Live Reader (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <GlassCard className="p-5 sm:p-6 space-y-5">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <Label className="text-sm font-bold text-foreground flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary" /> Enter or Paste Text
                </Label>
                
                {/* Sample Presets */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] text-muted-foreground font-semibold">Sample:</span>
                  {SAMPLE_TEXTS.map((sample, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        handleStop();
                        setText(sample.text);
                      }}
                      className="text-[11px] bg-muted/50 hover:bg-primary/10 hover:text-primary text-muted-foreground px-2 py-0.5 rounded-md border border-border/60 transition-all cursor-pointer"
                    >
                      {sample.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Text Area */}
              <div className="relative">
                <textarea
                  value={text}
                  onChange={(e) => {
                    setText(e.target.value);
                    if (isPlaying) handleStop();
                  }}
                  rows={8}
                  placeholder="Paste or type any article, document, or story here to listen..."
                  className="w-full rounded-2xl border border-border bg-background/80 p-4 text-sm sm:text-base outline-none focus:ring-2 focus:ring-primary/40 text-foreground font-sans leading-relaxed resize-y min-h-[200px]"
                />
                
                {/* Word / Char Counter footer */}
                <div className="flex items-center justify-between text-[11px] text-muted-foreground font-mono px-2 pt-1">
                  <span>{wordCount} words • {charCount} chars</span>
                  <span>Est. Duration: <strong className="text-foreground font-bold">{estimatedDuration}</strong></span>
                </div>
              </div>

              {/* Live Playback Controls */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-muted/30 border border-border/60 rounded-2xl">
                
                <div className="flex items-center gap-2">
                  {!isPlaying ? (
                    <Button
                      type="button"
                      size="lg"
                      onClick={handlePlay}
                      className="rounded-xl px-5 font-bold gap-2 bg-primary text-primary-foreground shadow-md hover:opacity-90 cursor-pointer"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      <span>{isPaused ? "Resume" : "Listen Now"}</span>
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      size="lg"
                      variant="outline"
                      onClick={handlePause}
                      className="rounded-xl px-5 font-bold gap-2 border-primary/40 text-primary hover:bg-primary/10 cursor-pointer"
                    >
                      <Pause className="w-4 h-4 fill-current" />
                      <span>Pause</span>
                    </Button>
                  )}

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={handleStop}
                    disabled={!isPlaying && !isPaused}
                    className="h-10 w-10 rounded-xl text-muted-foreground hover:text-destructive"
                    title="Stop playback"
                  >
                    <Square className="w-4 h-4" />
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={handleCopy}
                    className="h-10 w-10 rounded-xl text-muted-foreground hover:text-foreground"
                    title="Copy text"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>

                {/* Animated Audio Waveform when playing */}
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-background/60 rounded-xl border border-border/40">
                  <AudioLines className={cn("w-4 h-4 text-primary", isPlaying && "animate-pulse")} />
                  <span className="text-xs font-semibold font-mono text-muted-foreground">
                    {isPlaying ? (
                      <span className="text-primary font-bold">Speaking: &ldquo;{activeWord || "..."}&rdquo;</span>
                    ) : isPaused ? (
                      <span>Paused</span>
                    ) : (
                      <span>Ready</span>
                    )}
                  </span>
                </div>

              </div>

              {/* Share & Embed Bar */}
              <div className="flex items-center justify-between pt-2 border-t border-border/60">
                <span className="text-xs text-muted-foreground">100% Client-Side Web Speech Synthesis</span>
                <div className="flex items-center gap-2">
                  <ShareResultButton
                    toolTitle="Text to Speech Reader & Audio Generator"
                    resultTitle="Synthesized Natural Audio Reading"
                    resultSummary={`Generated audio for ${wordCount} words with estimated duration of ${estimatedDuration}.`}
                    resultMetrics={[
                      { label: "Words", value: wordCount },
                      { label: "Speed Rate", value: `${rate}x` },
                      { label: "Est. Time", value: estimatedDuration },
                    ]}
                  />
                  <EmbedButton toolPath="/tools/text/text-to-speech" toolTitle="Text to Speech Reader" />
                </div>
              </div>

            </GlassCard>
          </div>

          {/* Right Column: Voice & Audio Customization Controls (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <GlassCard className="p-5 sm:p-6 space-y-5">
              
              <div className="flex items-center gap-2 border-b border-border/60 pb-3">
                <Sliders className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-bold text-foreground">Voice & Audio Settings</h3>
              </div>

              {/* Voice Selector */}
              <div className="space-y-2">
                <Label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                  <Languages className="w-3.5 h-3.5 text-primary" /> Select Voice & Accent ({voices.length} Available)
                </Label>
                <div className="relative">
                  <select
                    value={selectedVoiceIndex}
                    onChange={(e) => {
                      setSelectedVoiceIndex(Number(e.target.value));
                      if (isPlaying) handleStop();
                    }}
                    className="w-full bg-background border border-border text-foreground font-semibold text-xs rounded-xl h-11 px-3.5 appearance-none pr-10 focus:ring-2 focus:ring-primary/50 outline-none cursor-pointer"
                  >
                    {voices.length === 0 && <option value={0}>Default Browser Voice</option>}
                    {voices.map((voice, idx) => (
                      <option key={idx} value={idx}>
                        {voice.name} ({voice.lang}) {voice.default ? "⭐ Default" : ""}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3.5 top-3.5 w-4 h-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>

              {/* Speed Rate Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-muted-foreground flex items-center gap-1.5">
                    <Gauge className="w-3.5 h-3.5 text-primary" /> Speech Rate (Speed)
                  </span>
                  <span className="font-mono font-bold text-foreground bg-muted/60 px-2 py-0.5 rounded-md text-[11px]">
                    {rate.toFixed(1)}x
                  </span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="2.0"
                  step="0.1"
                  value={rate}
                  onChange={(e) => setRate(parseFloat(e.target.value))}
                  className="w-full accent-primary cursor-pointer h-2 bg-muted rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
                  <span>0.5x (Slow)</span>
                  <span>1.0x (Normal)</span>
                  <span>2.0x (Fast)</span>
                </div>
              </div>

              {/* Pitch Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-muted-foreground flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-primary" /> Voice Pitch
                  </span>
                  <span className="font-mono font-bold text-foreground bg-muted/60 px-2 py-0.5 rounded-md text-[11px]">
                    {pitch.toFixed(1)}
                  </span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="1.5"
                  step="0.1"
                  value={pitch}
                  onChange={(e) => setPitch(parseFloat(e.target.value))}
                  className="w-full accent-primary cursor-pointer h-2 bg-muted rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
                  <span>Deeper (0.5)</span>
                  <span>Natural (1.0)</span>
                  <span>Higher (1.5)</span>
                </div>
              </div>

              {/* Volume Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-muted-foreground flex items-center gap-1.5">
                    <Volume2 className="w-3.5 h-3.5 text-primary" /> Volume Level
                  </span>
                  <span className="font-mono font-bold text-foreground bg-muted/60 px-2 py-0.5 rounded-md text-[11px]">
                    {Math.round(volume * 100)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="1.0"
                  step="0.05"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-full accent-primary cursor-pointer h-2 bg-muted rounded-lg"
                />
              </div>

              {/* Quick Reset Settings Button */}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setRate(1.0);
                  setPitch(1.0);
                  setVolume(1.0);
                  toast.success("Audio settings reset to default");
                }}
                className="w-full rounded-xl text-xs font-semibold gap-1.5 h-9"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset Audio Controls
              </Button>

            </GlassCard>
          </div>

        </div>

        {/* How It Works & Guides */}
        <ToolHowItWorks
          steps={[
            { step: "1", title: "Enter Your Text", description: "Paste any article, book excerpt, script, or language lesson in the editor." },
            { step: "2", title: "Select Voice & Speed", description: "Choose from dozens of native regional accents and customize pitch, speed, and volume." },
            { step: "3", title: "Instant Audio Playback", description: "Listen with zero buffering directly in your browser with real-time word tracking." }
          ]}
        />

        <ToolFeatureGuides
          features={[
            { title: "Natural Neural Accents", description: "Access all system-installed neural voices including US, UK, Canadian, Australian, Indian, and European languages." },
            { title: "Real-Time Word Highlighting", description: "Follow along seamlessly as the reader speaks each word with boundary detection." },
            { title: "100% Private Synthesis", description: "All speech is generated locally on your device without sending any text to external servers." }
          ]}
        />

        <ToolFaqAccordion
          faqs={[
            { question: "Is this text to speech reader free and unlimited?", answer: "Yes! There are no character limits or usage fees because speech synthesis runs 100% locally in your web browser." },
            { question: "How can I get more voices or natural accents?", answer: "The available voices come from your operating system (Apple Siri voices on Mac/iOS, Microsoft Natural voices on Windows, or Google voices on Chrome/Android). Installing language packs in your OS adds more voices here automatically." },
            { question: "Does this tool work offline?", answer: "Yes! Once the page is loaded, the speech synthesis engine operates completely offline without needing an active internet connection." }
          ]}
        />

        <RelatedTools currentToolUrl="/tools/text/text-to-speech" />

      </div>
    </div>
  );
}
