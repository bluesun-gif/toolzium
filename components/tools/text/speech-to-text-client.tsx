"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
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
  Mic, MicOff, Copy, Check, Trash2, Download, Upload, FileAudio,
  Sparkles, Languages, Clock, ShieldCheck, AudioLines, Loader2,
  Settings, RefreshCw, ChevronDown
} from "lucide-react";
import toast from "react-hot-toast";

const LANGUAGES = [
  { code: "en-US", name: "English (US)" },
  { code: "en-GB", name: "English (UK)" },
  { code: "en-IN", name: "English (India)" },
  { code: "en-AU", name: "English (Australia)" },
  { code: "es-ES", name: "Spanish (Spain)" },
  { code: "es-MX", name: "Spanish (Mexico)" },
  { code: "fr-FR", name: "French (France)" },
  { code: "de-DE", name: "German (Germany)" },
  { code: "it-IT", name: "Italian (Italy)" },
  { code: "pt-BR", name: "Portuguese (Brazil)" },
  { code: "hi-IN", name: "Hindi (India)" },
  { code: "bn-BD", name: "Bengali (Bangladesh)" },
  { code: "ar-SA", name: "Arabic (Saudi Arabia)" },
  { code: "zh-CN", name: "Chinese (Mandarin)" },
  { code: "ja-JP", name: "Japanese" },
  { code: "ko-KR", name: "Korean" },
  { code: "ru-RU", name: "Russian" },
];

export default function SpeechToTextClient() {
  const [activeTab, setActiveTab] = useState<"live" | "upload">("live");
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>("en-US");
  const [continuous, setContinuous] = useState<boolean>(true);
  const [transcript, setTranscript] = useState<string>("");
  const [interimText, setInterimText] = useState<string>("");
  const [duration, setDuration] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [micSupported, setMicSupported] = useState<boolean>(true);

  const recognitionRef = useRef<any>(null);
  const timerRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check Web Speech API support safely on client mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SpeechRecognition) {
        setMicSupported(false);
      }
    }
  }, []);

  const formatDuration = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const wordCount = useMemo(() => {
    const combined = `${transcript} ${interimText}`.trim();
    return combined ? combined.split(/\s+/).length : 0;
  }, [transcript, interimText]);

  const charCount = useMemo(() => {
    return `${transcript} ${interimText}`.trim().length;
  }, [transcript, interimText]);

  const startLiveRecognition = async () => {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast.error("Web Speech API is not supported in this browser. Please use Chrome, Edge, or upload an audio file below.");
      return;
    }

    try {
      // First explicitly request microphone access to trigger browser prompt
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        await navigator.mediaDevices.getUserMedia({ audio: true });
      }

      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {}
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = continuous;
      recognition.interimResults = true;
      recognition.lang = language;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsRecording(true);
        setDuration(0);
        timerRef.current = setInterval(() => {
          setDuration((prev) => prev + 1);
        }, 1000);
        toast.success("Microphone active. Start speaking!");
      };

      recognition.onresult = (event: any) => {
        let currentInterim = "";
        let finalChunk = "";

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const res = event.results[i];
          if (res.isFinal) {
            finalChunk += res[0].transcript + " ";
          } else {
            currentInterim += res[0].transcript;
          }
        }

        if (finalChunk) {
          setTranscript((prev) => (prev ? `${prev.trim()} ${finalChunk.trim()} ` : `${finalChunk.trim()} `));
          setInterimText("");
        } else {
          setInterimText(currentInterim);
        }
      };

      recognition.onerror = (event: any) => {
        console.warn("Speech recognition notice:", event.error);
        if (event.error === "not-allowed") {
          toast.error("Microphone permission denied. Please allow microphone access in your browser settings.");
          stopLiveRecognition();
        } else if (event.error === "no-speech") {
          // No speech detected, keep listening if continuous
          if (!continuous) stopLiveRecognition();
        }
      };

      recognition.onend = () => {
        // If continuous is active and user didn't explicitly hit stop, restart
        if (isRecording && continuous) {
          try {
            recognition.start();
          } catch (e) {
            stopLiveRecognition();
          }
        } else {
          stopLiveRecognition();
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err: any) {
      console.error("Mic start error:", err);
      toast.error(err.message || "Could not access microphone. Please check permissions.");
      stopLiveRecognition();
    }
  };

  const stopLiveRecognition = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsRecording(false);
    setInterimText("");
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopLiveRecognition();
      toast("Recording paused.");
    } else {
      startLiveRecognition();
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (max 25MB)
    if (file.size > 25 * 1024 * 1024) {
      toast.error("Audio file size must be under 25MB.");
      return;
    }

    setIsUploading(true);
    const toastId = toast.loading(`Transcribing "${file.name}" with AI Whisper...`);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("language", language);

      const res = await fetch("/api/ai/transcribe", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to transcribe audio file.");
      }

      const transcribed = data.text || "";
      setTranscript((prev) => (prev ? `${prev}\n\n${transcribed}` : transcribed));
      toast.success("Transcription complete!", { id: toastId });
    } catch (err: any) {
      console.error("Upload transcription error:", err);
      toast.error(err.message || "Failed to transcribe audio file.", { id: toastId });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleCopy = () => {
    const full = `${transcript} ${interimText}`.trim();
    if (!full) return;
    navigator.clipboard.writeText(full);
    setCopied(true);
    toast.success("Transcript copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const full = `${transcript} ${interimText}`.trim();
    if (!full) {
      toast.error("No transcript to download.");
      return;
    }
    const blob = new Blob([full], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `transcript-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded transcript as .txt!");
  };

  const handleClear = () => {
    stopLiveRecognition();
    setTranscript("");
    setInterimText("");
    setDuration(0);
    toast.success("Transcript cleared!");
  };

  return (
    <div className="min-h-screen relative pb-20">
      <ToolBackground />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 space-y-8">
        
        {/* Page Header */}
        <ToolPageHeader
          title="Speech to Text Transcriber & Audio Dictation"
          description="Transcribe live microphone dictation in real-time or upload audio recordings (MP3, WAV, M4A) with high-accuracy AI Whisper transcription."
          icon={Mic}
          badgeText="🎙️ Live Voice Dictation & AI Whisper"
        />

        {/* Mode Selector Tabs */}
        <div className="flex items-center gap-2 p-1.5 bg-muted/40 rounded-2xl border border-border/60 max-w-md mx-auto">
          <button
            type="button"
            onClick={() => {
              stopLiveRecognition();
              setActiveTab("live");
            }}
            className={cn(
              "flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer",
              activeTab === "live"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-background/60"
            )}
          >
            <Mic className="w-4 h-4" />
            <span>Live Microphone</span>
          </button>

          <button
            type="button"
            onClick={() => {
              stopLiveRecognition();
              setActiveTab("upload");
            }}
            className={cn(
              "flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer",
              activeTab === "upload"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-background/60"
            )}
          >
            <FileAudio className="w-4 h-4" />
            <span>Upload Audio File</span>
          </button>
        </div>

        {/* Main Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Recording Controls / File Uploader (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <GlassCard className="p-5 sm:p-6 space-y-5">
              
              {activeTab === "live" ? (
                <>
                  <div className="flex items-center justify-between border-b border-border/60 pb-3">
                    <Label className="text-sm font-bold text-foreground flex items-center gap-2">
                      <Mic className="w-4 h-4 text-primary" /> Live Voice Dictation
                    </Label>
                    <span className="text-[11px] font-mono text-muted-foreground">
                      {formatDuration(duration)}
                    </span>
                  </div>

                  {/* Pulsing Mic Button */}
                  <div className="flex flex-col items-center justify-center py-6 space-y-4">
                    <div className="relative">
                      {isRecording && (
                        <div className="absolute -inset-3 rounded-full bg-red-500/20 animate-ping" />
                      )}
                      <Button
                        type="button"
                        onClick={toggleRecording}
                        size="icon"
                        className={cn(
                          "relative h-24 w-24 rounded-full shadow-xl transition-all duration-300 cursor-pointer",
                          isRecording
                            ? "bg-red-600 hover:bg-red-700 text-white scale-105 shadow-red-500/30"
                            : "bg-primary hover:bg-primary/90 text-primary-foreground shadow-primary/30"
                        )}
                      >
                        {isRecording ? (
                          <MicOff className="w-10 h-10 animate-pulse" />
                        ) : (
                          <Mic className="w-10 h-10" />
                        )}
                      </Button>
                    </div>

                    <div className="text-center space-y-1">
                      <div className="text-sm font-bold text-foreground">
                        {isRecording ? "Listening... Speak into microphone" : "Click to Start Speaking"}
                      </div>
                      <p className="text-[11px] text-muted-foreground">
                        {isRecording ? "Click again to pause or finish" : "Ensure microphone permissions are enabled"}
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between border-b border-border/60 pb-3">
                    <Label className="text-sm font-bold text-foreground flex items-center gap-2">
                      <FileAudio className="w-4 h-4 text-primary" /> AI Whisper Audio File Transcriber
                    </Label>
                    <span className="text-[10px] uppercase font-mono text-primary font-bold">Whisper-v3</span>
                  </div>

                  {/* Audio File Dropzone */}
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="p-8 border-2 border-dashed border-border/80 hover:border-primary/50 bg-muted/20 hover:bg-muted/40 rounded-2xl text-center cursor-pointer transition-all space-y-3"
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="audio/*,.mp3,.wav,.m4a,.ogg,.webm,.aac,.flac"
                      onChange={handleFileUpload}
                      className="hidden"
                      disabled={isUploading}
                    />

                    <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary mx-auto flex items-center justify-center">
                      {isUploading ? (
                        <Loader2 className="w-6 h-6 animate-spin" />
                      ) : (
                        <Upload className="w-6 h-6" />
                      )}
                    </div>

                    <div className="space-y-1">
                      <div className="text-xs font-bold text-foreground">
                        {isUploading ? "Transcribing Audio with Whisper AI..." : "Click or Drag Audio File Here"}
                      </div>
                      <p className="text-[10px] text-muted-foreground">
                        Supports MP3, M4A, WAV, WebM, OGG, FLAC up to 25MB
                      </p>
                    </div>
                  </div>
                </>
              )}

              {/* Language Selector & Continuous Checkbox */}
              <div className="space-y-3 pt-3 border-t border-border/60">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                    <Languages className="w-3.5 h-3.5 text-primary" /> Recognition Language
                  </Label>
                  <div className="relative">
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full bg-background border border-border text-foreground font-semibold text-xs rounded-xl h-11 px-3.5 appearance-none pr-10 focus:ring-2 focus:ring-primary/50 outline-none cursor-pointer"
                    >
                      {LANGUAGES.map((l) => (
                        <option key={l.code} value={l.code}>
                          {l.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3.5 top-3.5 w-4 h-4 text-muted-foreground pointer-events-none" />
                  </div>
                </div>

                {activeTab === "live" && (
                  <label className="flex items-center gap-2 text-xs font-medium text-muted-foreground cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      checked={continuous}
                      onChange={(e) => setContinuous(e.target.checked)}
                      className="rounded border-border accent-primary h-4 w-4"
                    />
                    <span>Continuous Dictation Mode (Keep listening through pauses)</span>
                  </label>
                )}
              </div>

            </GlassCard>
          </div>

          {/* Right Column: Live Transcript Area & Action Toolbar (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <GlassCard className="p-5 sm:p-6 space-y-4">
              
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <Label className="text-sm font-bold text-foreground flex items-center gap-2">
                  <AudioLines className="w-4 h-4 text-primary" /> Transcribed Text
                </Label>
                
                <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground">
                  <span>{wordCount} words</span>
                  <span>•</span>
                  <span>{charCount} chars</span>
                </div>
              </div>

              {/* Editable Transcript Text Area */}
              <div className="relative">
                <textarea
                  value={transcript}
                  onChange={(e) => setTranscript(e.target.value)}
                  placeholder={
                    isRecording
                      ? "Listening... Your words will appear here in real-time."
                      : "Transcribed speech will appear here. You can also edit, format, or type directly..."
                  }
                  rows={10}
                  className="w-full rounded-2xl border border-border bg-background/80 p-4 text-sm sm:text-base outline-none focus:ring-2 focus:ring-primary/40 text-foreground font-sans leading-relaxed resize-y min-h-[260px]"
                />

                {/* Interim Live Stream text overlay */}
                {interimText && (
                  <div className="p-2.5 bg-primary/10 rounded-xl border border-primary/20 text-xs font-medium text-primary mt-2 flex items-center gap-2 animate-pulse">
                    <Sparkles className="w-3.5 h-3.5 shrink-0" />
                    <span>Streaming: &ldquo;{interimText}&rdquo;</span>
                  </div>
                )}
              </div>

              {/* Action Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-border/60">
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleCopy}
                    disabled={!transcript && !interimText}
                    className="rounded-xl text-xs font-semibold gap-1.5 h-9"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "Copied!" : "Copy Text"}</span>
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleDownload}
                    disabled={!transcript && !interimText}
                    className="rounded-xl text-xs font-semibold gap-1.5 h-9"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Save .TXT</span>
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleClear}
                    disabled={!transcript && !interimText}
                    className="rounded-xl text-xs font-semibold text-muted-foreground hover:text-destructive gap-1.5 h-9"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear</span>
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <ShareResultButton
                    toolTitle="Speech to Text Transcriber"
                    resultTitle="Voice Transcript"
                    resultSummary={`Transcribed ${wordCount} words using Speech to Text Studio.`}
                    resultMetrics={[
                      { label: "Words", value: wordCount },
                      { label: "Characters", value: charCount },
                      { label: "Language", value: language },
                    ]}
                  />
                  <EmbedButton toolPath="/tools/text/speech-to-text" toolTitle="Speech to Text Transcriber" />
                </div>
              </div>

            </GlassCard>
          </div>

        </div>

        {/* How It Works & Guides */}
        <ToolHowItWorks
          steps={[
            { step: "1", title: "Allow Microphone or Upload Audio", description: "Click the microphone button to dictate live or upload any recorded audio file (MP3, WAV, M4A)." },
            { step: "2", title: "Choose Language", description: "Select from over 17 supported regional languages and accents for maximum recognition precision." },
            { step: "3", title: "Instant Accurate Transcript", description: "Your spoken words stream into editable text in real-time, ready for 1-click copy or .TXT download." }
          ]}
        />

        <ToolFeatureGuides
          features={[
            { title: "Dual Voice & Whisper AI Engine", description: "Seamlessly switch between instant zero-latency browser dictation and deep AI Whisper file transcription." },
            { title: "Continuous Dictation Mode", description: "Keep transcribing lectures, podcasts, or long meetings without stopping during conversational pauses." },
            { title: "100% Privacy & Security", description: "Live dictation processes in-browser. Uploaded audio files are transcribed transiently with zero permanent storage." }
          ]}
        />

        <ToolFaqAccordion
          faqs={[
            { question: "Why is my microphone not recording?", answer: "Ensure that your browser has permission to access your microphone. Click the lock/tune icon in your browser's address bar to verify that Microphone is set to 'Allow'." },
            { question: "Can I upload long audio files for transcription?", answer: "Yes! You can upload audio files up to 25MB (MP3, WAV, M4A, OGG) to be transcribed by our AI Whisper engine." },
            { question: "Does this transcribe punctuation marks?", answer: "Yes. When dictating, simply speak words like 'comma', 'period', 'question mark', or 'new line' and the speech engine will insert punctuation automatically." }
          ]}
        />

        <RelatedTools currentToolUrl="/tools/text/speech-to-text" />

      </div>
    </div>
  );
}
