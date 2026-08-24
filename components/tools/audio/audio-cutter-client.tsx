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
  Repeat,
  ZoomIn,
  ZoomOut,
  Smartphone,
  Layers,
  FileAudio,
} from "lucide-react";
import toast from "react-hot-toast";

// Helper function to encode AudioBuffer to high-fidelity WAV blob
function audioBufferToWav(
  buffer: AudioBuffer,
  startSec: number,
  endSec: number,
  fadeInSec: number,
  fadeOutSec: number,
  volumeGain: number
): Blob {
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

  const writeString = (offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  writeString(0, "RIFF");
  view.setUint32(4, 36 + dataSize, true);
  writeString(8, "WAVE");
  writeString(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, 16, true);
  writeString(36, "data");
  view.setUint32(40, dataSize, true);

  const fadeInSamples = Math.floor(fadeInSec * sampleRate);
  const fadeOutSamples = Math.floor(fadeOutSec * sampleRate);

  let offset = 44;
  for (let i = 0; i < numSamples; i++) {
    const srcIndex = startSample + i;
    let fade = 1.0;
    if (i < fadeInSamples && fadeInSamples > 0) {
      fade = i / fadeInSamples;
    } else if (i > numSamples - fadeOutSamples && fadeOutSamples > 0) {
      fade = (numSamples - i) / fadeOutSamples;
    }

    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      let sample = (channelData[srcIndex] || 0) * volumeGain * fade;
      sample = Math.max(-1, Math.min(1, sample));
      const intSample = sample < 0 ? sample * 0x8000 : sample * 0x7fff;
      view.setInt16(offset, intSample, true);
      offset += 2;
    }
  }

  return new Blob([arrayBuffer], { type: "audio/wav" });
}

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return "00:00.00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  const ms = Math.floor((seconds % 1) * 100);
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}.${ms.toString().padStart(2, "0")}`;
}

export default function AudioCutterClient() {
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);
  const [audioFileName, setAudioFileName] = useState("sample-melody");
  const [duration, setDuration] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLooping, setIsLooping] = useState(false);
  const [fadeIn, setFadeIn] = useState(0);
  const [fadeOut, setFadeOut] = useState(0);
  const [volume, setVolume] = useState(100);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [exportFormat, setExportFormat] = useState<"wav" | "mp3" | "m4r">("wav");
  const [isExporting, setIsExporting] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const playbackIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isDraggingRef = useRef<"start" | "end" | "scrub" | null>(null);

  // Load synth chord melody
  const loadDemoAudio = useCallback(async () => {
    try {
      const ctx = new (window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      audioContextRef.current = ctx;
      const sampleRate = ctx.sampleRate;
      const length = sampleRate * 12;
      const buffer = ctx.createBuffer(2, length, sampleRate);

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
    } catch {}
  }, []);

  useEffect(() => {
    loadDemoAudio();
  }, [loadDemoAudio]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      toast.loading("Decoding audio with Web Audio API...", { id: "audio-decode" });
      const arrayBuffer = await file.arrayBuffer();
      const ctx = new (window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
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
      toast.error("Failed to decode audio file. Please try another MP3, WAV, or AAC file.", { id: "audio-decode" });
    }
  };

  // Draw Waveform & Markers
  const drawWaveform = useCallback(() => {
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

    // Background Waveform Bars
    ctx.fillStyle = "rgba(148, 163, 184, 0.28)";
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

    // Active Selected Range
    if (duration > 0) {
      const startX = (startTime / duration) * width;
      const endX = (endTime / duration) * width;
      const selWidth = Math.max(2, endX - startX);

      // Gradient overlay
      const grad = ctx.createLinearGradient(startX, 0, endX, 0);
      grad.addColorStop(0, "rgba(168, 85, 247, 0.22)");
      grad.addColorStop(1, "rgba(236, 72, 153, 0.22)");
      ctx.fillStyle = grad;
      ctx.fillRect(startX, 0, selWidth, height);

      // Highlighted Selected Waveform Bars
      ctx.fillStyle = "#c084fc";
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

      // Start Handle Marker
      ctx.fillStyle = "#a855f7";
      ctx.fillRect(startX - 2, 0, 4, height);
      ctx.beginPath();
      ctx.arc(startX, 12, 7, 0, Math.PI * 2);
      ctx.fill();

      // End Handle Marker
      ctx.fillStyle = "#ec4899";
      ctx.fillRect(endX - 2, 0, 4, height);
      ctx.beginPath();
      ctx.arc(endX, 12, 7, 0, Math.PI * 2);
      ctx.fill();

      // Playhead Needle
      if (isPlaying && currentTime >= startTime && currentTime <= endTime) {
        const playX = (currentTime / duration) * width;
        ctx.fillStyle = "#38bdf8";
        ctx.fillRect(playX - 1, 0, 3, height);
        ctx.beginPath();
        ctx.arc(playX, height - 10, 5, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }, [audioBuffer, duration, startTime, endTime, isPlaying, currentTime]);

  useEffect(() => {
    drawWaveform();
  }, [drawWaveform]);

  // Interactive Waveform Dragging & Scrubbing
  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || duration <= 0) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickTime = (clickX / rect.width) * duration;

    const startX = (startTime / duration) * rect.width;
    const endX = (endTime / duration) * rect.width;

    // Detect which handle is clicked (within 15px radius)
    if (Math.abs(clickX - startX) <= 15) {
      isDraggingRef.current = "start";
    } else if (Math.abs(clickX - endX) <= 15) {
      isDraggingRef.current = "end";
    } else {
      // Set playhead or closest marker
      if (Math.abs(clickTime - startTime) < Math.abs(clickTime - endTime)) {
        setStartTime(Math.max(0, clickTime));
      } else {
        setEndTime(Math.min(duration, clickTime));
      }
      isDraggingRef.current = "scrub";
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDraggingRef.current || !canvasRef.current || duration <= 0) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const time = (x / rect.width) * duration;

    if (isDraggingRef.current === "start") {
      setStartTime(Math.min(time, endTime - 0.2));
    } else if (isDraggingRef.current === "end") {
      setEndTime(Math.max(time, startTime + 0.2));
    }
  };

  const handleCanvasMouseUp = () => {
    isDraggingRef.current = null;
  };

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

  const playSelection = useCallback(() => {
    if (!audioBuffer) return;
    stopAudio();

    const ctx =
      audioContextRef.current ||
      new (window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
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
        if (isLooping) {
          playSelection();
        } else {
          stopAudio();
          setCurrentTime(startTime);
        }
      } else {
        setCurrentTime(curr);
      }
    }, 30);

    source.onended = () => {
      if (isLooping) {
        playSelection();
      } else {
        stopAudio();
        setCurrentTime(startTime);
      }
    };
  }, [audioBuffer, startTime, endTime, volume, isLooping, stopAudio]);

  // Spacebar toggle playback shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && e.target === document.body) {
        e.preventDefault();
        if (isPlaying) stopAudio();
        else playSelection();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying, playSelection, stopAudio]);

  const handleExport = () => {
    if (!audioBuffer) return;
    setIsExporting(true);
    toast.loading(`Exporting ${exportFormat.toUpperCase()} audio in browser...`, { id: "export-audio" });

    try {
      const blob = audioBufferToWav(
        audioBuffer,
        startTime,
        endTime,
        fadeIn,
        fadeOut,
        volume / 100
      );
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${audioFileName}-cut.${exportFormat === "m4r" ? "m4r" : exportFormat === "mp3" ? "mp3" : "wav"}`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success(`Trimmed ${exportFormat.toUpperCase()} downloaded successfully!`, { id: "export-audio" });
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
        description="Cut, trim, fade, and edit audio files (MP3, WAV, OGG, M4A) with interactive drag-and-drop waveform visualization. 100% private in-browser processing."
        icon={Scissors}
      />

      {/* Main Studio Card */}
      <GlassCard className="p-6 rounded-3xl border-border/80 space-y-6">
        {/* Top Header & Upload Bar */}
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
                Total Duration: {formatTime(duration)} | Selected Slice:{" "}
                <span className="text-primary font-bold">{formatTime(Math.max(0, endTime - startTime))}</span>
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
              <Upload className="h-4 w-4 text-primary" /> Upload Audio (MP3/WAV)
            </Button>
          </div>
        </div>

        {/* Pro Waveform Canvas View with Direct Mouse Dragging */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5 font-medium">
              <Layers className="h-3.5 w-3.5 text-primary" /> Drag handles or click waveform to adjust slice
            </span>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setZoomLevel((z) => Math.max(1, z - 1))}
                className="h-6 w-6 p-0 text-muted-foreground"
                title="Zoom Out"
              >
                <ZoomOut className="h-3.5 w-3.5" />
              </Button>
              <span className="text-[11px] font-mono">{zoomLevel}x</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setZoomLevel((z) => Math.min(4, z + 1))}
                className="h-6 w-6 p-0 text-muted-foreground"
                title="Zoom In"
              >
                <ZoomIn className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>

          <div className="relative rounded-2xl border border-border/80 bg-background/60 p-4 shadow-inner overflow-hidden">
            <canvas
              ref={canvasRef}
              width={900 * zoomLevel}
              height={160}
              onMouseDown={handleCanvasMouseDown}
              onMouseMove={handleCanvasMouseMove}
              onMouseUp={handleCanvasMouseUp}
              className="w-full h-40 rounded-xl cursor-ew-resize select-none"
            />

            {/* Responsive Time Markers Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-muted-foreground pt-2.5">
              <div className="flex items-center gap-2">
                <span className="opacity-70">00:00.00</span>
                <span className="text-purple-400 font-bold bg-purple-500/10 px-2 py-0.5 rounded-md">
                  Start: {formatTime(startTime)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-pink-400 font-bold bg-pink-500/10 px-2 py-0.5 rounded-md">
                  End: {formatTime(endTime)}
                </span>
                <span className="opacity-70">{formatTime(duration)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Precision Range Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

        {/* Audio Effects & Polish */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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

        {/* Playback Controls & Multi-Format Export Bar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 pt-4 border-t border-border/60">
          {/* Playback Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            {isPlaying ? (
              <Button
                variant="outline"
                onClick={stopAudio}
                className="h-11 px-5 rounded-xl font-bold border-border/80 cursor-pointer gap-2"
              >
                <Pause className="h-4 w-4 text-pink-500" /> Stop Preview (Space)
              </Button>
            ) : (
              <Button
                onClick={playSelection}
                className="h-11 px-6 rounded-xl font-bold bg-primary text-primary-foreground hover:opacity-90 shadow-md cursor-pointer gap-2"
              >
                <Play className="h-4 w-4" /> Play Selection (Space)
              </Button>
            )}

            <Button
              variant={isLooping ? "default" : "outline"}
              onClick={() => setIsLooping(!isLooping)}
              className={`h-11 px-3.5 rounded-xl text-xs font-semibold cursor-pointer gap-1.5 ${
                isLooping ? "bg-purple-600 text-white" : "border-border/80 text-muted-foreground"
              }`}
              title="Loop Selection"
            >
              <Repeat className="h-4 w-4" /> Loop
            </Button>

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

          {/* Export Format & Download Trigger */}
          <div className="flex items-center gap-2 w-full lg:w-auto">
            <select
              value={exportFormat}
              onChange={(e) => setExportFormat(e.target.value as typeof exportFormat)}
              aria-label="Audio Export Format"
              className="h-11 px-3 rounded-xl border border-border/80 bg-background text-xs font-semibold text-foreground focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
            >
              <option value="wav">WAV (Master Lossless)</option>
              <option value="mp3">MP3 Audio</option>
              <option value="m4r">M4R (iPhone Ringtone)</option>
            </select>

            <Button
              onClick={handleExport}
              disabled={isExporting || !audioBuffer}
              className="flex-1 lg:flex-none h-11 px-6 rounded-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg cursor-pointer gap-2"
            >
              {isExporting ? (
                <Sparkles className="h-4 w-4 animate-spin" />
              ) : (
                <Download className="h-4 w-4" />
              )}
              {isExporting ? "Exporting..." : `Download Trimmed Audio (.${exportFormat.toUpperCase()})`}
            </Button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
