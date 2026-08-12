"use client";

import React, { useState, useMemo, useCallback, useEffect, useRef } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Copy, RotateCcw, Mic, MicOff, Trash2, CheckCircle2 } from"lucide-react";
import toast from"react-hot-toast";

const cardClass ="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass ="border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass ="text-xs sm:text-sm font-semibold flex items-center gap-2";
const textareaClass ="w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50 font-mono";

const SpeechRecognition = typeof window !=="undefined"? ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition) : null;

export function SpeechToTextClient() {
 const [isRecording, setIsRecording] = useState(false);
 const [finalText, setFinalText] = useState("");
 const [interimText, setInterimText] = useState("");
 const [language, setLanguage] = useState("en-US");
 const [continuous, setContinuous] = useState(true);
 const [isSupported, setIsSupported] = useState(true);
 const [duration, setDuration] = useState(0);
 
 const recognitionRef = useRef<any>(null);
 const timerRef = useRef<any>(null);

 useEffect(() => {
 if (!SpeechRecognition) {
 setIsSupported(false);
 return;
 }

 const recognition = new SpeechRecognition();
 recognition.continuous = continuous;
 recognition.interimResults = true;
 recognition.lang = language;

 recognition.onresult = (event: any) => {
 let interimTranscript ="";
 let finalTranscript ="";
 
 for (let i = event.resultIndex; i < event.results.length; ++i) {
 if (event.results[i].isFinal) {
 finalTranscript += event.results[i][0].transcript +"";
 } else {
 interimTranscript += event.results[i][0].transcript;
 }
 }
 
 if (finalTranscript) {
 setFinalText((prev) => prev + finalTranscript);
 }
 setInterimText(interimTranscript);
 };

 recognition.onerror = (event: any) => {
 console.error("Speech recognition error", event.error);
 setIsRecording(false);
 clearInterval(timerRef.current);
 };

 recognition.onend = () => {
 setIsRecording(false);
 clearInterval(timerRef.current);
 };

 recognitionRef.current = recognition;

 return () => {
 if (recognitionRef.current) {
 try { recognitionRef.current.abort(); } catch (e) {}
 }
 clearInterval(timerRef.current);
 };
 }, [language, continuous]);

 const toggleRecording = () => {
 if (!recognitionRef.current) return;
 
 if (isRecording) {
 recognitionRef.current.stop();
 setIsRecording(false);
 clearInterval(timerRef.current);
 } else {
 try {
 recognitionRef.current.start();
 setIsRecording(true);
 timerRef.current = setInterval(() => {
 setDuration((prev) => prev + 1);
 }, 1000);
 } catch (e) {
 toast.error("Could not start recording.");
 }
 }
 };

 const handleCopy = (text: string) => {
 navigator.clipboard.writeText(text);
 toast.success("Copied to clipboard!");
 };

 const handleClear = () => {
 setFinalText("");
 setInterimText("");
 setDuration(0);
 toast.success("Transcript cleared!");
 };

 const wordCount = finalText.trim() ? finalText.trim().split(/\s+/).length : 0;
 const formatTime = (s: number) => {
 const m = Math.floor(s / 60);
 const sec = s % 60;
 return `${m.toString().padStart(2,"0")}:${sec.toString().padStart(2,"0")}`;
 };

 return (
 <div className="max-w-4xl mx-auto space-y-8 p-4">
 <ToolPageHeader
 icon={Mic}
 title="Speech to Text"
 description="Transcribe your voice to text in real-time using your browser's speech recognition."
 />

 {!isSupported && (
 <Card className="border-destructive bg-destructive/10 mb-6">
 <CardContent className="p-4 flex items-center gap-3">
 <MicOff className="h-6 w-6 text-destructive"/>
 <p className="text-destructive font-medium">Your browser does not support the Web Speech API. Please use Chrome or Edge.</p>
 </CardContent>
 </Card>
 )}

 <div className="flex flex-col items-center mb-8 py-8">
 <div className="relative mb-6">
 <div className={`absolute inset-0 rounded-full transition-all duration-500 ${isRecording ?"bg-red-500/20 scale-150 animate-ping":"scale-0"}`}></div>
 <Button
 onClick={toggleRecording}
 size="icon"
 variant={isRecording ?"destructive":"default"}
 className="relative h-24 w-24 rounded-full shadow-xl"
 disabled={!isSupported}
 >
 {isRecording ? <MicOff className="h-10 w-10"/> : <Mic className="h-10 w-10"/>}
 </Button>
 </div>
 <p className="text-lg font-semibold mb-2">{isRecording ?"Recording...":"Click to start speaking"}</p>
 <p className="text-sm text-muted-foreground">{formatTime(duration)}</p>
 </div>

 <div className="grid sm:grid-cols-2 gap-4 mb-6">
 <div className="space-y-2">
 <Label>Language</Label>
 <select value={language} onChange={(e) => setLanguage(e.target.value)} className="w-full border rounded px-3 py-2 bg-background text-sm">
 <option value="en-US">English (US)</option>
 <option value="en-GB">English (UK)</option>
 <option value="es-ES">Spanish</option>
 <option value="fr-FR">French</option>
 <option value="de-DE">German</option>
 <option value="hi-IN">Hindi</option>
 <option value="ar-SA">Arabic</option>
 <option value="zh-CN">Chinese (Mandarin)</option>
 <option value="ja-JP">Japanese</option>
 <option value="ko-KR">Korean</option>
 </select>
 </div>
 <div className="flex items-end">
 <div className="flex items-center space-x-2 pb-2">
 <input type="checkbox"id="continuous"checked={continuous} onChange={(e) => setContinuous(e.target.checked)} className="h-4 w-4 rounded border-border"/>
 <Label htmlFor="continuous"className="cursor-pointer">Continuous Mode (Keep recording)</Label>
 </div>
 </div>
 </div>

 <Card className={`${cardClass} mb-8`}>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>Transcript</CardTitle>
 </CardHeader>
 <CardContent className="p-4">
 <div className="min-h-[200px] p-4 border rounded-lg bg-background/50 whitespace-pre-wrap font-mono text-sm">
 <span>{finalText}</span>
 <span className="text-muted-foreground italic">{interimText}</span>
 {!finalText && !interimText && <span className="text-muted-foreground">Your transcribed text will appear here...</span>}
 </div>
 
 <div className="flex justify-between items-center mt-4">
 <div className="flex gap-4 text-sm text-muted-foreground">
 <span>{wordCount} words</span>
 <span className="flex items-center gap-1"><CheckCircle2 className="h-4 w-4"/> {duration}s duration</span>
 </div>
 <div className="flex gap-2">
 <Button variant="outline"size="sm"onClick={() => handleCopy(finalText)} disabled={!finalText}>
 <Copy className="h-4 w-4 mr-1"/> Copy
 </Button>
 <Button variant="destructive"size="sm"onClick={handleClear}>
 <Trash2 className="h-4 w-4 mr-1"/> Clear
 </Button>
 </div>
 </div>
 </CardContent>
 </Card>

 <ToolHowItWorks steps={[
 { step:"01", title:"Select Settings", description:"Choose your spoken language and toggle continuous mode based on your needs.", icon: Mic },
 { step:"02", title:"Start Recording", description:"Click the large microphone button and grant browser permission to access your audio.", icon: CheckCircle2 },
 { step:"03", title:"Read & Export", description:"Watch your words appear in real-time. Copy the final transcript or clear it to start over.", icon: Copy }
 ]} />

 <ToolFeatureGuides features={[
 { icon: Mic, title:"Real-time Transcription", description:"See interim results in gray as you speak, which solidify into final text the moment you pause."},
 { icon: CheckCircle2, title:"Multi-language Support", description:"Switch between English, Spanish, French, German, and several other major languages instantly."},
 { icon: MicOff, title:"Continuous Mode", description:"Keep the microphone active for long-form dictation, or disable it to stop automatically after you finish speaking."},
 { icon: Copy, title:"Local Processing", description:"Leveraging the browser's native Web Speech API, your audio is processed locally by your device's engine without external servers."}
 ]}>
 <div className="prose dark:prose-invert max-w-none">
 <h2>Dictate at the Speed of Thought</h2>
 <p>Typing is often the bottleneck between your brain and your document. Voice-to-text technology allows you to bypass the keyboard entirely, capturing your thoughts, meeting notes, or creative ideas exactly as you speak them. Our Speech to Text tool brings this powerful capability directly to your browser with zero setup required.</p>
 <p>Built on the Web Speech API, this tool utilizes your browser's native speech recognition engine. This means there are no external API calls, no file uploads, and no privacy concerns regarding your voice data. Whether you are dictating an email, writing a blog post, or transcribing a quick voice memo, the real-time interim feedback ensures you know the engine is capturing your words accurately.</p>
 <p>With support for over a dozen languages and adjustable continuous listening modes, the tool adapts to your workflow. Continuous mode is perfect for stream-of-consciousness writing or lengthy lectures, while standard mode works flawlessly for quick commands and short messages. Combined with one-click copying and automatic word counting, this tool transforms your browser into a powerful, privacy-first dictation studio.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion faqs={[
 { question:"Why is the microphone button disabled?", answer:"Your browser does not support the Web Speech API. Please switch to Google Chrome or Microsoft Edge for full functionality."},
 { question:"Is my voice recorded and sent to a server?", answer:"No. The speech recognition is handled entirely by your browser's local engine. Your audio never leaves your device."},
 { question:"What is the difference between interim and final results?", answer:"Interim results are the engine's best guess while you are still speaking. Once you pause, the engine finalizes the sentence and it becomes permanent text."},
 { question:"Do I need a high-quality microphone?", answer:"While a good microphone helps, modern speech engines are highly optimized for standard laptop and phone microphones in normal environments."}
 ]} />

 <RelatedTools currentToolUrl="/tools/text/speech-to-text"max={6} />
 </div>
 );
}

export default SpeechToTextClient;
