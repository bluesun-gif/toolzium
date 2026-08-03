"use client";

import React, { useState, useEffect, useRef } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mic, MicOff, Copy, Download, Trash2, Loader2, Info } from "lucide-react";
import toast from "react-hot-toast";

const LANGUAGES = [
  { code: "en-US", name: "English (United States)" },
  { code: "en-GB", name: "English (United Kingdom)" },
  { code: "es-ES", name: "Spanish (Spain)" },
  { code: "fr-FR", name: "French (France)" },
  { code: "de-DE", name: "German (Germany)" },
  { code: "it-IT", name: "Italian (Italy)" },
  { code: "pt-BR", name: "Portuguese (Brazil)" },
  { code: "bn-BD", name: "Bengali (Bangladesh)" },
  { code: "bn-IN", name: "Bengali (India)" },
  { code: "hi-IN", name: "Hindi (India)" },
  { code: "zh-CN", name: "Chinese (Simplified)" },
  { code: "ja-JP", name: "Japanese (Japan)" },
];

export default function SpeechToTextClient() {
  const [transcription, setTranscription] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [language, setLanguage] = useState("en-US");
  const [supported, setSupported] = useState<boolean | null>(null);
  
  const recognitionRef = useRef<any>(null);
  const interimTextRef = useRef("");

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        setSupported(true);
        const rec = new SpeechRecognition();
        rec.continuous = true;
        rec.interimResults = true;
        rec.lang = language;

        rec.onstart = () => {
          setIsListening(true);
          toast.success("Microphone active. Start speaking!");
        };

        rec.onresult = (event: any) => {
          let finalTranscript = "";
          let interimTranscript = "";

          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript;
            } else {
              interimTranscript += event.results[i][0].transcript;
            }
          }

          if (finalTranscript) {
            setTranscription((prev) => prev + (prev ? " " : "") + finalTranscript);
          }
          interimTextRef.current = interimTranscript;
        };

        rec.onerror = (event: any) => {
          console.error("Speech Recognition Error:", event);
          if (event.error === "not-allowed") {
            toast.error("Microphone permission denied.");
          } else {
            toast.error(`Recognition error: ${event.error}`);
          }
          setIsListening(false);
        };

        rec.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = rec;
      } else {
        setSupported(false);
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Update recognition language if it changes
  useEffect(() => {
    if (recognitionRef.current) {
      recognitionRef.current.lang = language;
      if (isListening) {
        recognitionRef.current.stop();
        setTimeout(() => {
          recognitionRef.current.start();
        }, 300);
      }
    }
  }, [language]);

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      toast.success("Transcription paused.");
    } else {
      try {
        interimTextRef.current = "";
        recognitionRef.current.start();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleCopy = () => {
    if (!transcription) return;
    navigator.clipboard.writeText(transcription);
    toast.success("Copied to clipboard!");
  };

  const handleDownload = () => {
    if (!transcription) return;
    const blob = new Blob([transcription], { type: "text/plain;charset=utf-8" });
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = `transcription-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
    toast.success("Transcript downloaded!");
  };

  const handleClear = () => {
    setTranscription("");
    interimTextRef.current = "";
    toast.success("Transcription cleared.");
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <ToolPageHeader
        title="Speech to Text Transcriber"
        description="Convert your spoken voice to text in real-time. Completely free, privacy-friendly voice typing."
      />

      {supported === false && (
        <Card className="border-destructive/30 bg-destructive/5 mb-6">
          <CardContent className="flex items-start gap-3 p-4">
            <MicOff className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-destructive">Speech Recognition Not Supported</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Your current browser does not support the Web Speech API. Please try using a modern browser like **Google Chrome**, **Microsoft Edge**, or **Safari** to utilize voice typing.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="mt-8 grid gap-8 md:grid-cols-3">
        {/* Transcription Editor */}
        <div className="md:col-span-2 space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                Live Transcript
                {isListening && (
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                )}
              </CardTitle>
              <div className="flex gap-2">
                <Badge variant={isListening ? "destructive" : "secondary"}>
                  {isListening ? "Listening..." : "Idle"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Textarea
                  placeholder="Click 'Start Listening' and start speaking. Your voice transcription will appear here. You can also edit this text directly..."
                  value={transcription}
                  onChange={(e) => setTranscription(e.target.value)}
                  className="min-h-[300px] text-base resize-none font-normal"
                  disabled={supported === false}
                />
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                <Button
                  onClick={toggleListening}
                  disabled={supported === false}
                  variant={isListening ? "destructive" : "default"}
                  className="flex-1 min-w-[150px]"
                >
                  {isListening ? (
                    <>
                      <MicOff className="mr-2 h-4 w-4" />
                      Stop Listening
                    </>
                  ) : (
                    <>
                      <Mic className="mr-2 h-4 w-4" />
                      Start Listening
                    </>
                  )}
                </Button>
                <Button variant="outline" onClick={handleCopy} disabled={!transcription}>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy
                </Button>
                <Button variant="outline" onClick={handleDownload} disabled={!transcription}>
                  <Download className="mr-2 h-4 w-4" />
                  Download TXT
                </Button>
                <Button variant="outline" onClick={handleClear} disabled={!transcription && !interimTextRef.current}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Configuration Controls */}
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Settings</CardTitle>
              <CardDescription>Configure language settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="lang-select">Transcription Language</Label>
                <Select value={language} onValueChange={setLanguage} disabled={supported === false}>
                  <SelectTrigger id="lang-select" className="w-full">
                    <SelectValue placeholder="Select Language" />
                  </SelectTrigger>
                  <SelectContent>
                    {LANGUAGES.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        {lang.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Usage */}
          <Card>
            <CardHeader className="p-4 pt-5 pb-2">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Info className="h-4 w-4 text-primary" />
                Speech Synthesis Note
              </CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground space-y-2 leading-relaxed p-4 pt-0">
              <p>
                Speech recognition utilizes browser-native APIs. On Google Chrome, voice processing is securely analyzed via Google's servers, while other browsers do it directly on-device.
              </p>
              <p>
                Toolzium does not capture, store, or log any of your recorded audio or text transcripts. Everything stays safely inside your local browser context.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
