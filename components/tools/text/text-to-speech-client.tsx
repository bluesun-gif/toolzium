"use client";

import React, { useState, useEffect, useRef } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Volume2, Play, Pause, Square, VolumeX, Trash2, Download, Loader2 } from "lucide-react";
import { downloadTtsAudio } from "@/lib/actions/tts-downloader.action";
import toast from "react-hot-toast";

export default function TextToSpeechClient() {
  const [text, setText] = useState("Hello! Welcome to Toolzium. This is a natural-sounding text-to-speech reader that runs completely inside your browser. Type or paste any text here and click Speak to hear it read out loud.");
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceIndex, setSelectedVoiceIndex] = useState<string>("0");
  const [rate, setRate] = useState<number>(1);
  const [pitch, setPitch] = useState<number>(1);
  const [volume, setVolume] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Initialize SpeechSynthesis and populate voices
  useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      synthRef.current = window.speechSynthesis;
      
      const loadVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices();
        setVoices(availableVoices);
        
        // Select default voice (English if available)
        if (availableVoices.length > 0) {
          const defaultVoiceIdx = availableVoices.findIndex(v => v.lang.startsWith("en"));
          if (defaultVoiceIdx !== -1) {
            setSelectedVoiceIndex(defaultVoiceIdx.toString());
          } else {
            setSelectedVoiceIndex("0");
          }
        }
      };

      loadVoices();
      
      // Chrome loads voices asynchronously, so we bind onvoiceschanged
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const handleSpeak = () => {
    if (!synthRef.current) {
      toast.error("Speech Synthesis is not supported in this browser.");
      return;
    }

    if (!text.trim()) {
      toast.error("Please enter some text to speak.");
      return;
    }

    // Force resume first in case it was paused, to avoid getting the browser speech queue stuck
    try {
      if (synthRef.current.paused) {
        synthRef.current.resume();
      }
      synthRef.current.cancel();
    } catch (e) {
      console.warn("Cancel error:", e);
    }

    // Speak synchronously to preserve the user gesture activation context
    try {
      const utterance = new SpeechSynthesisUtterance(text);
      utteranceRef.current = utterance;
      
      // Save global reference to prevent garbage collection on Windows/Chrome
      (window as any)._activeUtterance = utterance;

      // Apply voice settings by index
      const voiceIdx = parseInt(selectedVoiceIndex);
      const voiceObj = voices[voiceIdx];
      if (voiceObj) {
        utterance.voice = voiceObj;
        utterance.lang = voiceObj.lang;
      }
      utterance.rate = rate;
      utterance.pitch = pitch;
      utterance.volume = volume;

      // Events
      utterance.onstart = () => {
        setIsPlaying(true);
        setIsPaused(false);
      };

      utterance.onend = () => {
        setIsPlaying(false);
        setIsPaused(false);
        (window as any)._activeUtterance = null;
      };

      utterance.onerror = (e) => {
        console.error("TTS Error:", e);
        // Only show error toast if it's not a user-triggered cancellation
        if (e.error !== "interrupted" && e.error !== "canceled") {
          toast.error(`Speech synthesis error: ${e.error || "unknown"}`);
        }
        setIsPlaying(false);
        setIsPaused(false);
        (window as any)._activeUtterance = null;
      };

      synthRef.current.speak(utterance);
    } catch (err: any) {
      toast.error(`Failed to initialize speech: ${err.message}`);
    }
  };

  const handleDownload = async () => {
    if (!text.trim()) {
      toast.error("Please enter some text to download.");
      return;
    }

    setIsDownloading(true);
    const toastId = toast.loading("Generating your high-quality MP3 voiceover file...");

    try {
      const voiceIdx = parseInt(selectedVoiceIndex);
      const voiceObj = voices[voiceIdx];
      const lang = voiceObj ? voiceObj.lang : "en";

      const res = await downloadTtsAudio(text, lang);
      
      if (res.success && res.data) {
        // Trigger client-side file download
        const link = document.createElement("a");
        link.href = res.data;
        link.download = `voiceover-${Date.now()}.mp3`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success("Voiceover download complete!", { id: toastId });
      } else {
        throw new Error(res.error || "Failed to download audio file.");
      }
    } catch (err: any) {
      console.error(err);
      toast.error(`Download failed: ${err.message}`, { id: toastId });
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePauseResume = () => {
    if (!synthRef.current) return;

    if (isPlaying) {
      if (isPaused) {
        synthRef.current.resume();
        setIsPaused(false);
      } else {
        synthRef.current.pause();
        setIsPaused(true);
      }
    }
  };

  const handleStop = () => {
    if (synthRef.current) {
      try {
        if (synthRef.current.paused) {
          synthRef.current.resume();
        }
        synthRef.current.cancel();
      } catch (e) {}
      setIsPlaying(false);
      setIsPaused(false);
      (window as any)._activeUtterance = null;
    }
  };

  const handleClear = () => {
    setText("");
    handleStop();
  };

  const getWordCount = () => {
    return text.trim() ? text.trim().split(/\s+/).length : 0;
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <ToolPageHeader
        title="Text to Speech (TTS) Reader"
        description="Convert any text into natural-sounding speech online. 100% free, runs completely offline inside your browser."
      />

      <div className="mt-8 grid gap-8 md:grid-cols-3">
        {/* Editor Column */}
        <div className="md:col-span-2 space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-lg">Input Text</CardTitle>
              <div className="flex text-xs text-muted-foreground gap-4">
                <span>Words: <strong className="text-foreground">{getWordCount()}</strong></span>
                <span>Characters: <strong className="text-foreground">{text.length}</strong></span>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Type or paste something to read..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="min-h-[280px] text-base resize-none font-normal"
              />
              <div className="flex flex-wrap gap-2 mt-4">
                <Button onClick={handleSpeak} disabled={isPlaying && !isPaused} className="flex-1 min-w-[120px]">
                  <Play className="mr-2 h-4 w-4" />
                  Speak
                </Button>
                {isPlaying && (
                  <>
                    <Button variant="outline" onClick={handlePauseResume} className="flex-1 min-w-[120px]">
                      <Pause className="mr-2 h-4 w-4" />
                      {isPaused ? "Resume" : "Pause"}
                    </Button>
                    <Button variant="destructive" onClick={handleStop} className="flex-1 min-w-[120px]">
                      <Square className="mr-2 h-4 w-4" />
                      Stop
                    </Button>
                  </>
                )}
                <Button
                  variant="outline"
                  onClick={handleDownload}
                  disabled={isDownloading || !text.trim()}
                  className="flex-1 min-w-[120px]"
                >
                  {isDownloading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Downloading...
                    </>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      Download Audio
                    </>
                  )}
                </Button>
                <Button variant="outline" onClick={handleClear} disabled={!text}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls Column */}
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Voice Controls</CardTitle>
              <CardDescription>Adjust language, speed, and volume.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Select Voice */}
              <div className="space-y-2">
                <Label htmlFor="voice-select">Available Voices</Label>
                {voices.length > 0 ? (
                  <Select value={selectedVoiceIndex} onValueChange={setSelectedVoiceIndex}>
                    <SelectTrigger id="voice-select" className="w-full">
                      <SelectValue placeholder="Select a voice" />
                    </SelectTrigger>
                    <SelectContent>
                      {voices.map((voice, idx) => (
                        <SelectItem key={idx} value={idx.toString()}>
                          {voice.name} ({voice.lang})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="text-xs text-muted-foreground italic">
                    Loading voices... Ensure system speech engine is enabled.
                  </div>
                )}
              </div>

              {/* Speed Slider */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="rate-input">Speech Speed</Label>
                  <span className="text-xs text-muted-foreground">{rate}x</span>
                </div>
                <input
                  type="range"
                  id="rate-input"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={rate}
                  onChange={(e) => setRate(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              {/* Pitch Slider */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="pitch-input">Pitch / Tone</Label>
                  <span className="text-xs text-muted-foreground">{pitch}</span>
                </div>
                <input
                  type="range"
                  id="pitch-input"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={pitch}
                  onChange={(e) => setPitch(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              {/* Volume Slider */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="volume-input" className="flex items-center gap-1">
                    {volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    Volume
                  </Label>
                  <span className="text-xs text-muted-foreground">{Math.round(volume * 100)}%</span>
                </div>
                <input
                  type="range"
                  id="volume-input"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>
            </CardContent>
          </Card>

          {/* SEO Block */}
          <Card>
            <CardHeader className="p-4 pt-5 pb-2">
              <CardTitle className="text-sm font-semibold">Privacy Information</CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground space-y-2 leading-relaxed p-4 pt-0">
              <p>
                Unlike other converters, this tool works 100% locally inside your device browser using the **Web Speech API**.
              </p>
              <p>
                None of your texts or voice streams are ever transmitted over the network or saved to database servers. It is private, clean, and runs instantly.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
