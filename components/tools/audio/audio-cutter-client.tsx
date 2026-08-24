"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/ui/glass-card";
import { Slider } from "@/components/ui/slider";
import {
  Scissors,
  Play,
  Pause,
  Upload,
  Download,
  RotateCcw,
  Volume2,
  Sparkles,
  Music,
  Check,
  Zap,
} from "lucide-react";
import toast from "react-hot-toast";

// Helper function to encode AudioBuffer to WAV blob
function audioBufferToWav(buffer: AudioBuffer, startSec: number, endSec: number, fadeInSec: number, fadeOutSec: number, volumeGain: number): Blob {
  const sampleRate = buffer.sampleRate;
  const numChannels = buffer.numberOfChannels;
  const startSample = Math.max(0, Math.floor(startSec * sampleRate));
  const endSample = Math.min(buffer.length, Math.floor(endSec * sampleRate));
  const numSamples = endSample - startSample;

  const bytesPerSample = 2; // 16-bit PCM
  const blockAlign = numChannels * bytesPerSample;
  const byteRate = sampleRate * blockAlign;
  const dataSize = numSamples * blockAlign;
  const bufferLength = 44 + dataSize;

  const arrayBuffer = new ArrayBuffer(bufferLength);
  const view = new DataView(arrayBuffer);

  // Write WAV RIFF header
  const writeString = (offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  writeString(0, "RIFF");
  view.setUint32(4, 36 + dataSize, true);
  writeString(8, "WAVE");
  writeString(12, "fmt ");
  view.setUint32(16, 16, true); // Subchunk1Size
  view.setUint16(20, 1, true); // AudioFormat (PCM = 1)
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, 16, true); // BitsPerSample
  writeString(36, "data");
  view.setUint32(40, dataSize, true);

  // Process PCM Channels
  const fadeInSamples = Math.floor(fadeInSec * sampleRate);
  const fadeOutSamples = Math.floor(fadeOutSec * sampleRate);

  let offset = 44;
  for (let i = 0; i < numSamples; i++) {
    const srcIndex = startSample + i;
    
    // Calculate fade multipliers
    let fade = 1.0;
    if (i < fadeInSamples && fadeInSamples > 0) {
      fade = i / fadeInSamples;
    } else if (i > numSamples - fadeOutSamples && fadeOutSamples > 0) {
      fade = (numSamples - i) / fadeOutSamples;
    }

    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      let sample = (channelData[srcIndex] || 0) * volumeGain * fade;
      // Clamp sample to [-1, 1]
      sample = Math.max(-1, Math.min(1, sample));
      // Convert float to 16-bit PCM integer
      const intSample = sample < 0 ? sample * 0x8000 : sample * 0x7fff;
      view.setInt16(offset, intSample, true);
      offset += 2;
    }
  }

  return new Blob([arrayBuffer], { type: "audio/wav" });
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  const ms = Math.floor((seconds % 1) * 100);
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}.${ms.toString().padStart(2, "0")}`;
}

export default function AudioCutterClient() {
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);
  const [audioFileName, setAudioFileName] = useState("sample-audio");
  const [duration, setDuration] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [fadeIn, setFadeIn] = useState(0);
  const [fadeOut, setFadeOut] = useState(0);
  const [volume, setVolume] = useState(100);
  const [isExporting, setIsExporting] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const playbackIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize or load demo audio tone
  const loadDemoAudio = useCallback(async () => {
    try {
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      audioContextRef.current = ctx;
      const sampleRate = ctx.sampleRate;
      const length = sampleRate * 12; // 12 seconds demo
      const buffer = ctx.createBuffer(2, length, sampleRate);

      // Synthesize a pleasing synth ambient chord demo
      for (let channel = 0; channel < 2; channel++) {
        const data = buffer.getChannelData(channel);
        for (let i = 0; i < length; i++) {
          const t = i / sampleRate;
          const tone1 = Math.sin(2 * Math.PI * 440 * t) * Math.exp(-0.4 * (t % 3));
          const tone2 = Math.sin(2 * Math.PI * 554.37 * t) * Math.exp(-0.3 * (t % 3));
          const tone3 = Math.sin(2 * Math.PI * 659.25 * t) * 0.4;
          data[i] = (tone1 + tone2 + tone3) * 0.3;
        }
      }
      setAudioBuffer(buffer);
      setDuration(12);
      setStartTime(1.5);
      setEndTime(9.0);
      setAudioFileName("toolzium-demo-audio");
    } catch {
      // Ignore if AudioContext requires user gesture
    }
  }, []);

  useEffect(() => {
    loadDemoAudio();
  }, [loadDemoAudio]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      toast.loading("Decoding audio in browser...", { id: "audio-decode" });
      const arrayBuffer = await file.arrayBuffer();
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      audioContextRef.current = ctx;
      const decoded = await ctx.decodeAudioData(arrayBuffer);

      setAudioBuffer(decoded);
      setAudioFileName(file.name.replace(/\.[^/.]+$/, ""));
      setDuration(decoded.duration);
      setStartTime(0);
      setEndTime(decoded.duration);
      setCurrentTime(0);
      toast.success(`Loaded "${file.name}" (${formatTime(decoded.duration)})`, { id: "audio-decode" });
    } catch {
      toast.error("Failed to decode audio file. Please try another MP3/WAV/OGG file.", { id: "audio-decode" });
    }
  };

  // Draw Waveform to Canvas
  useEffect(() => {
    if (!audioBuffer || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    const channelData = audioBuffer.getChannelData(0);
    const step = Math.ceil(channelData.length / width);
    const amp = height / 2;

    // Draw background waveform bars
    ctx.fillStyle = "rgba(100, 116, 139, 0.35)";
    for (let i = 0; i < width; i++) {
      let min = 1.0;
      let max = -1.0;
      for (let j = 0; j < step; j++) {
        const datum = channelData[i * step + j] || 0;
        if (datum < min) min = datum;
        if (datum > max) max = datum;
      }
      ctx.fillRect(i, (1 + min) * amp, 1, Math.max(1, (max - min) * amp));
    }

    // Highlight selected active slice range
    if (duration > 0) {
      const startX = (startTime / duration) * width;
      const endX = (endTime / duration) * width;
      const selWidth = endX - startX;

      // Selection overlay
      ctx.fillStyle = "rgba(168, 85, 247, 0.15)";
      ctx.fillRect(startX, 0, selWidth, height);

      // Selected waveform bars
      ctx.fillStyle = "#a855f7";
      for (let i = Math.floor(startX); i < Math.ceil(endX); i++) {
        let min = 1.0;
        let max = -1.0;
        for (let j = 0; j < step; j++) {
          const datum = channelData[i * step + j] || 0;
          if (datum < min) min = datum;
          if (datum > max) max = datum;
        }
        ctx.fillRect(i, (1 + min) * amp, 1, Math.max(1, (max - min) * amp));
      }

      // Start / End boundary lines
      ctx.fillStyle = "#8b5cf6";
      ctx.fillRect(startX - 1, 0, 3, height);
      ctx.fillRect(endX - 1, 0, 3, height);

      // Current playback scrubber needle
      if (isPlaying && currentTime >= startTime && currentTime <= endTime) {
        const playX = (currentTime / duration) * width;
        ctx.fillStyle = "#ec4899";
        ctx.fillRect(playX - 1, 0, 2, height);
      }
    }
  }, [audioBuffer, duration, startTime, endTime, isPlaying, currentTime]);

  const stopAudio = useCallback(() => {
    if (sourceNodeRef.current) {
      try {
        sourceNodeRef.current.stop();
      } catch {}
      sourceNodeRef.current.disconnect();
      sourceNodeRef.current = null;
    }
    if (playbackIntervalRef.current) {
      clearInterval(playbackIntervalRef.current);
      playbackIntervalRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  const playSelection = () => {
    if (!audioBuffer) return;
    stopAudio();

    const ctx = audioContextRef.current || new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    if (ctx.state === "suspended") {
      ctx.resume();
    }
    audioContextRef.current = ctx;

    const source = ctx.createBufferSource();
    source.buffer = audioBuffer;

    const gainNode = ctx.createGain();
    gainNode.gain.value = volume / 100;
    source.connect(gainNode);
    gainNode.connect(ctx.destination);

    const playDuration = endTime - startTime;
    source.start(0, startTime, playDuration);
    sourceNodeRef.current = source;
    setIsPlaying(true);
    setCurrentTime(startTime);

    const startTimestamp = Date.now();
    playbackIntervalRef.current = setInterval(() => {
      const elapsed = (Date.now() - startTimestamp) / 1000;
      const curr = startTime + elapsed;
      if (curr >= endTime) {
        stopAudio();
        setCurrentTime(startTime);
      } else {
        setCurrentTime(curr);
      }
    }, 40);

    source.onended = () => {
      stopAudio();
      setCurrentTime(startTime);
    };
  };

  const handleExport = () => {
    if (!audioBuffer) return;
    setIsExporting(true);
    toast.loading("Encoding WAV audio in browser...", { id: "export-audio" });

    try {
      const blob = audioBufferToWav(audioBuffer, startTime, endTime, fadeIn, fadeOut, volume / 100);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${audioFileName}-trimmed.wav`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Trimmed audio downloaded successfully!", { id: "export-audio" });
    } catch {
      toast.error("Failed to export audio", { id: "export-audio" });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 space-y-6">
      <ToolPageHeader
        title="In-Browser Audio Waveform Cutter & Ringtone Studio"
        description="Cut, trim, fade, and export audio clips (MP3, WAV, OGG, M4A) with high-precision waveform visualization. 100% private in-browser processing."
        icon={Scissors}
      />

      {/* Main Waveform & Control Card */}
      <GlassCard className="p-6 rounded-3xl border-border/80 space-y-6">
        {/* Top File Meta & Upload Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-border/60 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-primary/10 text-primary">
              <Music className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground truncate max-w-xs sm:max-w-md">
                {audioFileName}
              </h3>
              <p className="text-xs text-muted-foreground font-mono">
                Total Duration: {formatTime(duration)} | Selected Slice: {formatTime(Math.max(0, endTime - startTime))}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="audio/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              className="h-9 px-4 rounded-xl font-semibold border-dashed border-border/80 hover:border-primary/50 cursor-pointer gap-2"
            >
              <Upload className="h-4 w-4 text-primary" /> Upload Audio
            </Button>
          </div>
        </div>

        {/* Waveform Canvas View */}
        <div className="relative rounded-2xl border border-border/80 bg-background/60 p-4 shadow-inner">
          <canvas
            ref={canvasRef}
            width={900}
            height={160}
            className="w-full h-40 rounded-xl cursor-crosshair"
          />
          {/* Time markers bar */}
          <div className="flex justify-between text-[11px] font-mono text-muted-foreground pt-2">
            <span>00:00.00</span>
            <span className="text-purple-400 font-bold">Start: {formatTime(startTime)}</span>
            <span className="text-pink-400 font-bold">End: {formatTime(endTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Dual Range Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Start Time Slider */}
          <div className="space-y-1.5 p-3 rounded-2xl border border-border/60 bg-muted/20">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-muted-foreground">Start Marker</span>
              <span className="font-mono text-purple-400">{formatTime(startTime)}</span>
            </div>
            <Slider
              value={[startTime]}
              min={0}
              max={Math.max(0.1, duration)}
              step={0.05}
              onValueChange={(vals) => {
                const val = Math.min(vals[0], endTime - 0.2);
                setStartTime(val);
              }}
              className="cursor-pointer"
            />
          </div>

          {/* End Time Slider */}
          <div className="space-y-1.5 p-3 rounded-2xl border border-border/60 bg-muted/20">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-muted-foreground">End Marker</span>
              <span className="font-mono text-pink-400">{formatTime(endTime)}</span>
            </div>
            <Slider
              value={[endTime]}
              min={0}
              max={Math.max(0.1, duration)}
              step={0.05}
              onValueChange={(vals) => {
                const val = Math.max(vals[0], startTime + 0.2);
                setEndTime(val);
              }}
              className="cursor-pointer"
            />
          </div>
        </div>

        {/* Audio Effects & Polish Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          {/* Fade In */}
          <div className="space-y-1.5 p-3 rounded-2xl border border-border/60 bg-card">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-muted-foreground">Fade In (sec)</span>
              <span className="text-foreground">{fadeIn}s</span>
            </div>
            <Slider
              value={[fadeIn]}
              min={0}
              max={5}
              step={0.5}
              onValueChange={(vals) => setFadeIn(vals[0])}
              className="cursor-pointer"
            />
          </div>

          {/* Fade Out */}
          <div className="space-y-1.5 p-3 rounded-2xl border border-border/60 bg-card">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-muted-foreground">Fade Out (sec)</span>
              <span className="text-foreground">{fadeOut}s</span>
            </div>
            <Slider
              value={[fadeOut]}
              min={0}
              max={5}
              step={0.5}
              onValueChange={(vals) => setFadeOut(vals[0])}
              className="cursor-pointer"
            />
          </div>

          {/* Volume Boost */}
          <div className="space-y-1.5 p-3 rounded-2xl border border-border/60 bg-card">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-muted-foreground flex items-center gap-1">
                <Volume2 className="h-3.5 w-3.5 text-primary" /> Volume Boost
              </span>
              <span className="text-foreground">{volume}%</span>
            </div>
            <Slider
              value={[volume]}
              min={25}
              max={200}
              step={5}
              onValueChange={(vals) => setVolume(vals[0])}
              className="cursor-pointer"
            />
          </div>
        </div>

        {/* Playback & Export Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border/60">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {isPlaying ? (
              <Button
                variant="outline"
                onClick={stopAudio}
                className="flex-1 sm:flex-none h-11 px-5 rounded-xl font-bold border-border/80 cursor-pointer gap-2"
              >
                <Pause className="h-4 w-4 text-pink-500" /> Stop Preview
              </Button>
            ) : (
              <Button
                onClick={playSelection}
                className="flex-1 sm:flex-none h-11 px-6 rounded-xl font-bold bg-primary text-primary-foreground hover:opacity-90 shadow-md cursor-pointer gap-2"
              >
                <Play className="h-4 w-4" /> Play Selection
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setStartTime(0);
                setEndTime(duration);
                setFadeIn(0);
                setFadeOut(0);
                setVolume(100);
              }}
              title="Reset Markers"
              className="h-11 w-11 rounded-xl text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>

          <Button
            onClick={handleExport}
            disabled={isExporting || !audioBuffer}
            className="w-full sm:w-auto h-11 px-7 rounded-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg cursor-pointer gap-2"
          >
            {isExporting ? (
              <Sparkles className="h-4 w-4 animate-spin" />
            ) : (
              <Download className="h-4 w-4" />
            )}
            {isExporting ? "Exporting Audio..." : "Download Trimmed Audio (.WAV)"}
          </Button>
        </div>
      </GlassCard>
    </div>
  );
}
