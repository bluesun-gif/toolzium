"use client";

import React, { useState, useRef, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Switch } from"@/components/ui/switch";
import { Label } from"@/components/ui/label";
import toast from"react-hot-toast";
import { Monitor, Mic, Video, Square, Play, Pause, Download, RotateCcw, AlertTriangle, Sparkles, Shield, Zap, Copy } from"lucide-react";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

export default function ScreenRecorderClient() {
 const [supported, setSupported] = useState(true);
 const [recordingState, setRecordingState] = useState<"idle"|"recording"|"paused"|"finished">("idle");
 const [includeMic, setIncludeMic] = useState(false);
 const [time, setTime] = useState(0);
 const [videoUrl, setVideoUrl] = useState<string | null>(null);
 
 const mediaRecorderRef = useRef<MediaRecorder | null>(null);
 const chunksRef = useRef<Blob[]>([]);
 const streamRef = useRef<MediaStream | null>(null);
 const liveVideoRef = useRef<HTMLVideoElement>(null);
 const timerRef = useRef<NodeJS.Timeout | null>(null);

 useEffect(() => {
 if (typeof window !=="undefined") {
 if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
 setSupported(false);
 }
 }
 return () => stopAllStreams();
 }, []);

 const formatTime = (seconds: number) => {
 const m = Math.floor(seconds / 60).toString().padStart(2,"0");
 const s = (seconds % 60).toString().padStart(2,"0");
 return `${m}:${s}`;
 };

 const stopAllStreams = () => {
 if (streamRef.current) {
 streamRef.current.getTracks().forEach((track) => track.stop());
 streamRef.current = null;
 }
 };

 const startRecording = async () => {
 try {
 chunksRef.current = [];
 setVideoUrl(null);
 setTime(0);

 // 1. Get Screen Stream
 const screenStream = await navigator.mediaDevices.getDisplayMedia({
 video: true,
 audio: true, // system audio if supported
 });

 // 2. Get Mic Stream if requested
 let combinedStream = new MediaStream([...screenStream.getTracks()]);
 
 if (includeMic) {
 try {
 const micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
 micStream.getAudioTracks().forEach(track => {
 combinedStream.addTrack(track);
 });
 } catch (micErr) {
 toast.error("Microphone access denied or not available. Continuing without mic.");
 }
 }

 streamRef.current = combinedStream;

 if (liveVideoRef.current) {
 liveVideoRef.current.srcObject = combinedStream;
 liveVideoRef.current.play();
 }

 // Handle screen sharing stopped externally (e.g., via browser"Stop sharing"button)
 screenStream.getVideoTracks()[0].onended = () => {
 if (recordingState ==="recording"|| recordingState ==="paused") {
 stopRecording();
 }
 };

 const options = { mimeType: 'video/webm;codecs=vp9' };
 let recorder: MediaRecorder;
 try {
 recorder = new MediaRecorder(combinedStream, options);
 } catch (e) {
 recorder = new MediaRecorder(combinedStream); // fallback
 }

 mediaRecorderRef.current = recorder;

 recorder.ondataavailable = (e) => {
 if (e.data.size > 0) chunksRef.current.push(e.data);
 };

 recorder.onstop = () => {
 const blob = new Blob(chunksRef.current, { type: chunksRef.current[0]?.type || 'video/webm' });
 const url = URL.createObjectURL(blob);
 setVideoUrl(url);
 stopAllStreams();
 if (liveVideoRef.current) {
 liveVideoRef.current.srcObject = null;
 }
 clearInterval(timerRef.current!);
 };

 recorder.start(1000); // chunk every 1 second
 setRecordingState("recording");

 timerRef.current = setInterval(() => {
 setTime((prev) => prev + 1);
 }, 1000);

 } catch (err: any) {
 console.error(err);
 if (err.name !== 'NotAllowedError') {
 toast.error("Failed to start recording:"+ err.message);
 }
 }
 };

 const pauseRecording = () => {
 if (mediaRecorderRef.current && recordingState ==="recording") {
 mediaRecorderRef.current.pause();
 setRecordingState("paused");
 clearInterval(timerRef.current!);
 }
 };

 const resumeRecording = () => {
 if (mediaRecorderRef.current && recordingState ==="paused") {
 mediaRecorderRef.current.resume();
 setRecordingState("recording");
 timerRef.current = setInterval(() => {
 setTime((prev) => prev + 1);
 }, 1000);
 }
 };

 const stopRecording = () => {
 if (mediaRecorderRef.current && (recordingState ==="recording"|| recordingState ==="paused")) {
 mediaRecorderRef.current.stop();
 setRecordingState("finished");
 clearInterval(timerRef.current!);
 }
 };

 const downloadRecording = () => {
 if (!videoUrl) return;
 const a = document.createElement("a");
 a.style.display ="none";
 a.href = videoUrl;
 a.download = `recording-${new Date().toISOString().slice(0,10)}.webm`;
 document.body.appendChild(a);
 a.click();
 document.body.removeChild(a);
 };

 const resetRecording = () => {
 if (videoUrl) {
 URL.revokeObjectURL(videoUrl);
 setVideoUrl(null);
 }
 setRecordingState("idle");
 setTime(0);
 };

 if (!supported) {
 return (
 <div className="mx-auto max-w-3xl px-4 py-8 text-center">
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray="4 2"
        className="absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
      />

 <AlertTriangle className="mx-auto h-12 w-12 text-destructive mb-4"/>
 <h2 className="text-2xl font-bold mb-2">Browser Not Supported</h2>
 <p className="text-muted-foreground">Your browser does not support the required Screen Capture API. Please try using a recent version of Chrome, Firefox, or Edge on a desktop device.</p>
 </div>
 );
 }

 return (
 <div className="mx-auto max-w-5xl px-4 py-8">
 <ToolPageHeader
 title="Screen Recorder"
 description="Record your screen, window, or browser tab entirely in your browser. No installation required."
 />

 <div className="mt-8 max-w-3xl mx-auto">
 <Card className="border-2 shadow-sm">
 <CardHeader className="text-center pb-4">
 <CardTitle>Browser-Based Recorder</CardTitle>
 <CardDescription>Private & secure. Never uploaded to a server.</CardDescription>
 </CardHeader>
 <CardContent className="space-y-6">
 
 {recordingState ==="idle"&& (
 <div className="space-y-6">
 <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/50">
 <div className="flex items-center gap-3">
 <div className="p-2 bg-primary/10 rounded-full">
 <Mic className="h-5 w-5 text-primary"/>
 </div>
 <div>
 <Label htmlFor="mic-toggle"className="text-base">Include Microphone Audio</Label>
 <p className="text-sm text-muted-foreground">Record your voice along with the screen</p>
 </div>
 </div>
 <Switch
 id="mic-toggle"
 checked={includeMic}
 onCheckedChange={setIncludeMic}
 />
 </div>

 <Button 
 size="lg"
 className="w-full h-16 text-lg bg-red-600 hover:bg-red-700 text-white shadow-lg transition-all"
 onClick={startRecording}
 >
 <Video className="mr-2 h-6 w-6"/>
 Start Recording
 </Button>
 
 <div className="text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
 <Monitor className="h-4 w-4"/> You will be prompted to choose what to share.
 </div>
 </div>
 )}

 {(recordingState ==="recording"|| recordingState ==="paused") && (
 <div className="space-y-4">
 <div className="relative aspect-video bg-black rounded-lg overflow-hidden border-2 border-muted shadow-inner">
 <video 
 ref={liveVideoRef} 
 muted 
 className="w-full h-full object-contain"
 />
 {recordingState ==="recording"&& (
 <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/60 text-white px-3 py-1.5 rounded-full backdrop-blur-md">
 <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse"/>
 <span className="font-mono font-bold tracking-wider">{formatTime(time)}</span>
 </div>
 )}
 {recordingState ==="paused"&& (
 <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
 <div className="bg-background/90 text-foreground px-6 py-3 rounded-full font-bold shadow-lg flex items-center gap-2">
 <Pause className="h-5 w-5"/> Paused ({formatTime(time)})
 </div>
 </div>
 )}
 </div>

 <div className="flex items-center justify-center gap-4 pt-2">
 {recordingState ==="recording"? (
 <Button variant="outline"size="lg"onClick={pauseRecording} className="w-32">
 <Pause className="mr-2 h-4 w-4"/> Pause
 </Button>
 ) : (
 <Button variant="outline"size="lg"onClick={resumeRecording} className="w-32">
 <Play className="mr-2 h-4 w-4"/> Resume
 </Button>
 )}
 <Button variant="destructive"size="lg"onClick={stopRecording} className="w-40 shadow-md">
 <Square className="mr-2 h-4 w-4 fill-current"/> Stop
 </Button>
 </div>
 </div>
 )}

 {recordingState ==="finished"&& videoUrl && (
 <div className="space-y-6">
 <div className="bg-muted p-1 rounded-xl">
 <video 
 src={videoUrl} 
 controls 
 className="w-full rounded-lg shadow-sm"
 />
 </div>
 
 <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
 <Button size="lg"className="w-full sm:w-auto min-w-48 shadow-md"onClick={downloadRecording}>
 <Download className="mr-2 h-5 w-5"/> Download WebM
 </Button>
 <Button variant="outline"size="lg"className="w-full sm:w-auto"onClick={resetRecording}>
 <RotateCcw className="mr-2 h-4 w-4"/> Record Again
 </Button>
 </div>
 </div>
 )}

 </CardContent>
 </Card>
 </div>
 
      <ToolHowItWorks
        steps={[
          {
            step: "01",
            title: "Input Your Data",
            description: "Enter your information in the input field above and configure any options.",
            icon: Sparkles,
          },
          {
            step: "02",
            title: "Process & Generate",
            description: "The tool processes your input instantly and displays the results.",
            icon: Zap,
          },
          {
            step: "03",
            title: "Copy & Use",
            description: "Copy the output with one click and use it wherever you need.",
            icon: Copy,
          },
        ]}
        badges={["100% Free", "Instant Results", "Privacy-First"]}
      />

      <ToolFeatureGuides
        features={[
          {
            icon: Sparkles,
            title: "Lightning Fast",
            description: "Get results in milliseconds with our optimized client-side processing engine.",
          },
          {
            icon: Shield,
            title: "Completely Private",
            description: "All processing happens in your browser. Your data never leaves your device.",
          },
          {
            icon: Zap,
            title: "No Signup Required",
            description: "Use this tool instantly without creating an account or providing any personal information.",
          },
        ]}
      >
        <div className="prose dark:prose-invert max-w-none">
          <h3>Why Use Our Screen Recorder?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Screen Recorder provides
            the functionality you need without any complexity or cost.
          </p>
          <p>
            Unlike server-based alternatives, everything runs locally in your browser, ensuring maximum
            privacy and zero latency. No data is ever transmitted to external servers, making it safe
            for sensitive information.
          </p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion
        faqs={[
          {
            question: "Is this tool free to use?",
            answer: "Yes, this tool is 100% free with no hidden costs, subscriptions, or usage limits.",
          },
          {
            question: "Is my data secure?",
            answer: "Absolutely. All processing happens locally in your browser. Your input data never leaves your device or gets sent to any server.",
          },
          {
            question: "Do I need to create an account?",
            answer: "No account or registration is required. Simply open the tool and start using it immediately.",
          },
        ]}
      />

      <RelatedTools currentToolUrl="/tools/util/screen-recorder" max={6} />

</div>
 );
}
