"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import { cn } from "@/lib/utils";
import React, { useState, useEffect, useRef } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Volume2, VolumeX, Play, Pause, Sparkles, Zap, Radio, Moon, Sun, Headphones, Shield, Copy } from "lucide-react";
import toast from "react-hot-toast";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
interface SoundTrack {
  id: string;
  name: string;
  category: "Noise" | "Nature" | "Binaural";
  description: string;
  icon: string;
}
const TRACKS: SoundTrack[] = [{
  id: "brown",
  name: "Brown Noise",
  category: "Noise",
  description: "Deep low-frequency rumble for deep focus and study.",
  icon: "🌊"
}, {
  id: "pink",
  name: "Pink Noise",
  category: "Noise",
  description: "Balanced soft sound for relaxation and memory retention.",
  icon: "🌸"
}, {
  id: "white",
  name: "White Noise",
  category: "Noise",
  description: "Equal intensity noise for masking office distractions.",
  icon: "📻"
}, {
  id: "binaural",
  name: "Gamma Binaural (40Hz)",
  category: "Binaural",
  description: "Brainwave stimulation for peak mental concentration.",
  icon: "🧠"
}, {
  id: "rain",
  name: "Rain & Waves",
  category: "Nature",
  description: "Rhythmic rainfall for stress relief and sleep.",
  icon: "🌧️"
}];
export default function AmbientNoiseClient() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeTrackId, setActiveTrackId] = useState<string>("brown");
  const [volume, setVolume] = useState<number>(0.7);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const noiseNodeRef = useRef<AudioNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const stopAudio = () => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.setTargetAtTime(0, audioCtxRef.current?.currentTime || 0, 0.1);
    }
    setTimeout(() => {
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        audioCtxRef.current.suspend();
      }
    }, 150);
    setIsPlaying(false);
  };
  const startAudio = (trackId: string) => {
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as {
          webkitAudioContext: typeof AudioContext;
        }).webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }
      if (audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }
      const ctx = audioCtxRef.current;
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);
      if (trackId === "brown") {
        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          output[i] = (lastOut + 0.02 * white) / 1.02;
          lastOut = output[i];
          output[i] *= 3.5;
        }
      } else if (trackId === "pink") {
        let b0 = 0,
          b1 = 0,
          b2 = 0,
          b3 = 0,
          b4 = 0,
          b5 = 0,
          b6 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
          output[i] *= 0.11;
          b6 = white * 0.115926;
        }
      } else {
        for (let i = 0; i < bufferSize; i++) {
          output[i] = (Math.random() * 2 - 1) * 0.3;
        }
      }
      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = buffer;
      whiteNoise.loop = true;
      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(volume, ctx.currentTime);
      whiteNoise.connect(gainNode);
      gainNode.connect(ctx.destination);
      whiteNoise.start();
      noiseNodeRef.current = whiteNoise;
      gainNodeRef.current = gainNode;
      setIsPlaying(true);
      setActiveTrackId(trackId);
    } catch {
      toast.error("Audio Context initialization failed.");
    }
  };
  const handleTogglePlay = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      startAudio(activeTrackId);
    }
  };
  const handleTrackSelect = (id: string) => {
    if (isPlaying) {
      stopAudio();
      setTimeout(() => startAudio(id), 100);
    } else {
      setActiveTrackId(id);
    }
  };
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(val, audioCtxRef.current.currentTime);
    }
  };
  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);
  const activeTrack = TRACKS.find(t => t.id === activeTrackId) || TRACKS[0];
  return <div className="relative mx-auto max-w-6xl px-2 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6 max-w-full overflow-hidden"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader title="Ambient Focus Noise & Binaural Sound Generator Studio" description="Synthesize Brown Noise, Pink Noise, White Noise, and 40Hz Binaural Beats 100% in your browser for deep work, study, and sleep." />

 {/* SINGLE VIEWPORT SOUND STUDIO WORKSPACE */}
 <div className="grid gap-4 sm:gap-6 lg:grid-cols-12 min-h-[480px] max-w-full">
 {/* Left Column: Sound Track Selection (5 Cols) */}
 <div className="lg:col-span-5 flex flex-col max-w-full min-w-0">
 <Card className="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl flex-1 flex flex-col justify-between overflow-hidden max-w-full min-w-0">
 <CardHeader className="border-b border-border/40 bg-muted/20 p-3 sm:p-4">
 <div className="flex items-center justify-between">
 <CardTitle className="text-xs sm:text-sm font-semibold flex items-center gap-2 tracking-tight">
 <Headphones className="h-4 w-4 text-primary shrink-0" />
 Select Focus Sound Engine
 </CardTitle>
 <Badge variant="outline" className="text-[10px] text-emerald-500 border-emerald-500/30 gap-1 shrink-0">
 <Zap className="h-3 w-3" /> Web Audio API
 </Badge>
 </div>
 </CardHeader>

 <CardContent className="p-3 sm:p-4 space-y-2 flex-1 flex flex-col justify-between max-w-full min-w-0">
 <div className="space-y-2 max-w-full min-w-0 overflow-y-auto max-h-[340px] pr-1">
 {TRACKS.map(track => <Button key={track.id} type="button" onClick={() => handleTrackSelect(track.id)} className={cn(`w-full p-3 rounded-xl border text-left transition flex items-center gap-3 ${activeTrackId === track.id ? "border-primary bg-primary/10 shadow-sm" : "border-border/60 bg-background hover:bg-muted/40"}`)}>
 <span className="text-2xl shrink-0">{track.icon}</span>
 <div className="min-w-0 flex-1">
 <div className="flex items-center justify-between">
 <span className="font-semibold text-xs text-foreground truncate">{track.name}</span>
 <Badge variant="secondary" className="text-[9px] px-1.5 py-0.2 shrink-0">
 {track.category}
 </Badge>
 </div>
 <p className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">{track.description}</p>
 </div>
 </Button>)}
 </div>
 </CardContent>
 </Card>
 </div>

 {/* Right Column: Audio Player & Wave Visualizer (7 Cols) */}
 <div className="lg:col-span-7 flex flex-col max-w-full min-w-0">
 <Card className="border border-primary/30 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl flex-1 flex flex-col justify-between overflow-hidden max-w-full min-w-0">
 <CardHeader className="border-b border-border/40 bg-muted/20 p-3 sm:p-4">
 <CardTitle className="text-xs sm:text-sm font-semibold flex items-center gap-2 text-primary tracking-tight">
 <Radio className="h-4 w-4 shrink-0" />
 Live Sound Studio Player
 </CardTitle>
 </CardHeader>

 <CardContent className="p-4 sm:p-6 flex-1 flex flex-col justify-center items-center text-center space-y-6 max-w-full min-w-0">
 <div className="space-y-2">
 <span className="text-4xl">{activeTrack.icon}</span>
 <h3 className="font-bold text-lg text-foreground">{activeTrack.name}</h3>
 <p className="text-xs text-muted-foreground max-w-sm mx-auto">{activeTrack.description}</p>
 </div>

 {/* Animated Wave Bar */}
 <div className="flex items-center justify-center gap-1.5 h-12 w-full max-w-xs">
 {[40, 70, 35, 90, 60, 100, 50, 80, 45, 75, 95, 30].map((h, i) => <div key={i} className={`w-2 rounded-full bg-primary transition-all duration-300 ${isPlaying ? "animate-pulse" : "opacity-30"}`} style={{
                  height: isPlaying ? `${h}%` : "12px",
                  animationDelay: `${i * 0.08}s`
                }} />)}
 </div>

 {/* Play / Pause Toggle Button */}
 <Button onClick={handleTogglePlay} className="h-14 w-14 rounded-full shadow-lg gap-0 justify-center p-0 bg-primary text-primary-foreground hover:scale-105 transition">
 {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-0.5" />}
 </Button>

 {/* Volume Slider */}
 <div className="flex items-center gap-3 w-full max-w-xs text-xs text-muted-foreground pt-2">
 <VolumeX className="h-4 w-4 shrink-0" />
 <input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange} className="w-full accent-primary h-1.5 bg-muted rounded-lg cursor-pointer" />
 <Volume2 className="h-4 w-4 shrink-0" />
 </div>
 </CardContent>
 </Card>
 </div>
 </div>
 
      <ToolHowItWorks steps={[{
        step: "01",
        title: "Input Your Data",
        description: "Enter your information in the input field above and configure any options.",
        icon: Sparkles
      }, {
        step: "02",
        title: "Process & Generate",
        description: "The tool processes your input instantly and displays the results.",
        icon: Zap
      }, {
        step: "03",
        title: "Copy & Use",
        description: "Copy the output with one click and use it wherever you need.",
        icon: Copy
      }]} badges={["100% Free", "Instant Results", "Privacy-First"]} />

      <ToolFeatureGuides features={[{
        icon: Sparkles,
        title: "Lightning Fast",
        description: "Get results in milliseconds with our optimized client-side processing engine."
      }, {
        icon: Shield,
        title: "Completely Private",
        description: "All processing happens in your browser. Your data never leaves your device."
      }, {
        icon: Zap,
        title: "No Signup Required",
        description: "Use this tool instantly without creating an account or providing any personal information."
      }]}>
        <div className="prose dark:prose-invert max-w-none">
          <h3>Why Use Our Ambient Focus Noise & Binaural Sound Generator Studio?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Ambient Focus Noise & Binaural Sound Generator Studio provides
            the functionality you need without any complexity or cost.
          </p>
          <p>
            Unlike server-based alternatives, everything runs locally in your browser, ensuring maximum
            privacy and zero latency. No data is ever transmitted to external servers, making it safe
            for sensitive information.
          </p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion faqs={[{
        question: "Is this tool free to use?",
        answer: "Yes, this tool is 100% free with no hidden costs, subscriptions, or usage limits."
      }, {
        question: "Is my data secure?",
        answer: "Absolutely. All processing happens locally in your browser. Your input data never leaves your device or gets sent to any server."
      }, {
        question: "Do I need to create an account?",
        answer: "No account or registration is required. Simply open the tool and start using it immediately."
      }]} />

      <RelatedTools currentToolUrl="/tools/productivity/ambient-noise" max={6} />

  </div></div>;
}