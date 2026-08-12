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
import { Volume2, Play, Pause, Square, RotateCcw, Mic, Settings, AlertCircle } from"lucide-react";
import toast from"react-hot-toast";

const cardClass ="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass ="border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass ="text-xs sm:text-sm font-semibold flex items-center gap-2";
const textareaClass ="w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50 font-mono";

export function TextToSpeechClient() {
 const [text, setText] = useState("Welcome to Toolzium. This is a demonstration of the browser's native text-to-speech capabilities. You can adjust the voice, speed, pitch, and volume using the controls below.");
 const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
 const [selectedVoiceURI, setSelectedVoiceURI] = useState<string>("");
 const [rate, setRate] = useState(1);
 const [pitch, setPitch] = useState(1);
 const [volume, setVolume] = useState(1);
 const [isPlaying, setIsPlaying] = useState(false);
 const [isPaused, setIsPaused] = useState(false);
 const [isSupported, setIsSupported] = useState(true);
 
 const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
 const chunkIndexRef = useRef(0);
 const chunksRef = useRef<string[]>([]);

 useEffect(() => {
 if (typeof window !=="undefined"&& !window.speechSynthesis) {
 setIsSupported(false);
 return;
 }

 const loadVoices = () => {
 const availableVoices = window.speechSynthesis.getVoices();
 if (availableVoices.length > 0) {
 setVoices(availableVoices);
 if (!selectedVoiceURI && availableVoices.length > 0) {
 const defaultVoice = availableVoices.find(v => v.lang.startsWith("en")) || availableVoices[0];
 setSelectedVoiceURI(defaultVoice.voiceURI);
 }
 }
 };

 loadVoices();
 if (window.speechSynthesis.onvoiceschanged !== undefined) {
 window.speechSynthesis.onvoiceschanged = loadVoices;
 }

 return () => {
 window.speechSynthesis.cancel();
 };
 }, []);

 const charCount = text.length;
 const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
 const estimatedMinutes = useMemo(() => {
 const wpm = 150 * rate;
 return wpm > 0 ? (wordCount / wpm).toFixed(1) :"0";
 }, [wordCount, rate]);

 const chunkText = (input: string, limit: number = 200): string[] => {
 if (input.length <= limit) return [input];
 const chunks: string[] = [];
 const sentences = input.match(/[^.!?]+[.!?]+/g) || [input];
 let currentChunk ="";
 
 sentences.forEach(sentence => {
 if ((currentChunk + sentence).length > limit) {
 if (currentChunk) chunks.push(currentChunk);
 currentChunk = sentence;
 } else {
 currentChunk += sentence;
 }
 });
 if (currentChunk) chunks.push(currentChunk);
 return chunks;
 };

 const speakChunk = useCallback(() => {
 if (chunkIndexRef.current >= chunksRef.current.length) {
 setIsPlaying(false);
 setIsPaused(false);
 chunkIndexRef.current = 0;
 return;
 }

 const utterance = new SpeechSynthesisUtterance(chunksRef.current[chunkIndexRef.current]);
 const voice = voices.find(v => v.voiceURI === selectedVoiceURI);
 if (voice) utterance.voice = voice;
 utterance.rate = rate;
 utterance.pitch = pitch;
 utterance.volume = volume;

 utterance.onend = () => {
 chunkIndexRef.current++;
 if (chunkIndexRef.current < chunksRef.current.length) {
 speakChunk();
 } else {
 setIsPlaying(false);
 setIsPaused(false);
 }
 };

 utterance.onerror = (e) => {
 console.error("Speech error", e);
 toast.error("Speech synthesis error");
 setIsPlaying(false);
 };

 utteranceRef.current = utterance;
 window.speechSynthesis.speak(utterance);
 }, [voices, selectedVoiceURI, rate, pitch, volume]);

 const handlePlay = () => {
 if (!text.trim()) {
 toast.error("Please enter some text first");
 return;
 }
 window.speechSynthesis.cancel();
 chunksRef.current = chunkText(text);
 chunkIndexRef.current = 0;
 setIsPlaying(true);
 setIsPaused(false);
 speakChunk();
 };

 const handlePause = () => {
 if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
 window.speechSynthesis.pause();
 setIsPaused(true);
 }
 };

 const handleResume = () => {
 if (window.speechSynthesis.paused) {
 window.speechSynthesis.resume();
 setIsPaused(false);
 }
 };

 const handleStop = () => {
 window.speechSynthesis.cancel();
 setIsPlaying(false);
 setIsPaused(false);
 chunkIndexRef.current = 0;
 };

 const handleCopy = () => {
 navigator.clipboard.writeText(text);
 toast.success("Text copied to clipboard!");
 };

 if (!isSupported) {
 return (
 <div className="max-w-6xl mx-auto space-y-8 p-4">
 <ToolPageHeader
 icon={Volume2}
 title="Text to Speech Converter"
 description="Convert written text into natural-sounding speech using your browser's native synthesis engine."
 />
 <Card className={cardClass}>
 <CardContent className="p-8 text-center text-destructive flex flex-col items-center gap-4">
 <AlertCircle className="w-12 h-12"/>
 <h2 className="text-xl font-bold">Browser Not Supported</h2>
 <p>Your browser does not support the Web Speech API. Please try Chrome, Edge, or Safari.</p>
 </CardContent>
 </Card>
 </div>
 );
 }

 return (
 <div className="max-w-6xl mx-auto space-y-8 p-4">
 <ToolPageHeader
 icon={Volume2}
 title="Text to Speech Converter"
 description="Convert written text into natural-sounding speech using your browser's native synthesis engine. Perfect for accessibility, proofreading, and multitasking."
 />

 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
 <Card className={`${cardClass} lg:col-span-2 flex flex-col`}>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <Mic className="w-4 h-4 text-primary"/>
 Input Text
 </CardTitle>
 </CardHeader>
 <CardContent className="p-4 sm:p-6 flex-grow flex flex-col gap-4">
 <textarea
 className={`${textareaClass} flex-grow min-h-[300px] resize-y`}
 value={text}
 onChange={(e) => setText(e.target.value)}
 placeholder="Type or paste text here..."
 />
 <div className="flex flex-wrap justify-between items-center text-xs text-muted-foreground">
 <div className="flex gap-4">
 <span>Characters: <strong className="text-foreground">{charCount.toLocaleString()}</strong></span>
 <span>Words: <strong className="text-foreground">{wordCount.toLocaleString()}</strong></span>
 </div>
 <div className="flex items-center gap-2">
 <span>Est. Duration:</span>
 <span className="font-bold text-primary">{estimatedMinutes} min</span>
 </div>
 </div>
 {charCount > 30000 && (
 <div className="text-xs text-amber-500 flex items-center gap-2 bg-amber-500/10 p-2 rounded">
 <AlertCircle className="w-4 h-4"/>
 Text is very long. Queue mode will automatically chunk speech to prevent browser cutoff.
 </div>
 )}
 </CardContent>
 </Card>

 <Card className={cardClass}>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <Settings className="w-4 h-4 text-primary"/>
 Voice Settings
 </CardTitle>
 </CardHeader>
 <CardContent className="p-4 sm:p-6 space-y-6">
 <div className="space-y-2">
 <Label>Voice</Label>
 <select
 className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
 value={selectedVoiceURI}
 onChange={(e) => setSelectedVoiceURI(e.target.value)}
 >
 {voices.map((voice) => (
 <option key={voice.voiceURI} value={voice.voiceURI}>
 {voice.name} ({voice.lang})
 </option>
 ))}
 </select>
 </div>

 <div className="space-y-2">
 <div className="flex justify-between">
 <Label>Speed</Label>
 <span className="text-xs text-muted-foreground">{rate.toFixed(1)}x</span>
 </div>
 <input
 type="range"
 min="0.5"
 max="2"
 step="0.1"
 value={rate}
 onChange={(e) => setRate(parseFloat(e.target.value))}
 className="w-full accent-primary"
 />
 </div>

 <div className="space-y-2">
 <div className="flex justify-between">
 <Label>Pitch</Label>
 <span className="text-xs text-muted-foreground">{pitch.toFixed(1)}</span>
 </div>
 <input
 type="range"
 min="0.5"
 max="2"
 step="0.1"
 value={pitch}
 onChange={(e) => setPitch(parseFloat(e.target.value))}
 className="w-full accent-primary"
 />
 </div>

 <div className="space-y-2">
 <div className="flex justify-between">
 <Label>Volume</Label>
 <span className="text-xs text-muted-foreground">{Math.round(volume * 100)}%</span>
 </div>
 <input
 type="range"
 min="0"
 max="1"
 step="0.1"
 value={volume}
 onChange={(e) => setVolume(parseFloat(e.target.value))}
 className="w-full accent-primary"
 />
 </div>
 </CardContent>
 </Card>
 </div>

 <Card className={cardClass}>
 <CardContent className="p-4 sm:p-6">
 <div className="flex flex-wrap gap-3 justify-center">
 {!isPlaying ? (
 <Button onClick={handlePlay} size="lg"className="gap-2 w-32">
 <Play className="w-4 h-4"/> Play
 </Button>
 ) : (
 <>
 {!isPaused ? (
 <Button onClick={handlePause} size="lg"variant="secondary"className="gap-2 w-32">
 <Pause className="w-4 h-4"/> Pause
 </Button>
 ) : (
 <Button onClick={handleResume} size="lg"variant="secondary"className="gap-2 w-32">
 <Play className="w-4 h-4"/> Resume
 </Button>
 )}
 </>
 )}
 <Button onClick={handleStop} size="lg"variant="destructive"className="gap-2 w-32"disabled={!isPlaying && !isPaused}>
 <Square className="w-4 h-4"/> Stop
 </Button>
 <Button onClick={handleCopy} size="lg"variant="outline"className="gap-2">
 <RotateCcw className="w-4 h-4"/> Copy Text
 </Button>
 </div>
 </CardContent>
 </Card>

 <ToolHowItWorks
 steps={[
 { step:"01", title:"Enter Your Text", description:"Paste articles, books, or notes into the input area. The tool handles long texts by chunking them automatically.", icon: Mic },
 { step:"02", title:"Customize Voice", description:"Select from available system voices and adjust speed, pitch, and volume to match your listening preference.", icon: Settings },
 { step:"03", title:"Listen & Learn", description:"Hit play to hear your text read aloud. Use controls to pause or stop at any time for a hands-free experience.", icon: Volume2 }
 ]}
 badges={["100% Free","Client-Side Privacy","No Signup"]}
 />

 <ToolFeatureGuides
 features={[
 { icon: Mic, title:"Native Browser Engine", description:"Leverages the Web Speech API built directly into your browser, ensuring zero latency and no server uploads."},
 { icon: Settings, title:"Granular Control", description:"Fine-tune every aspect of the audio output, from speaking rate (0.5x to 2x) to pitch and volume."},
 { icon: AlertCircle, title:"Smart Chunking", description:"Automatically splits long documents into manageable segments to prevent browser timeout errors."},
 { icon: Volume2, title:"Multi-Language Support", description:"Access dozens of languages and accents depending on your operating system's installed voice packs."}
 ]}
 >
 <div className="prose dark:prose-invert max-w-none">
 <h3>The Power of Browser-Based Text to Speech</h3>
 <p>
 Text-to-speech (TTS) technology has evolved from robotic, monotone outputs into sophisticated, natural-sounding voices that rival professional narration. By utilizing the native Web Speech API, this tool offers a secure, private, and instant way to consume written content audibly. Unlike cloud-based services that require you to upload your documents to a server, our client-side architecture ensures that your sensitive data—whether it's legal documents, personal journals, or proprietary code—never leaves your device.
 </p>
 <h3>Enhancing Accessibility and Productivity</h3>
 <p>
 For individuals with dyslexia, visual impairments, or learning disabilities, TTS is an essential accessibility feature that democratizes information. It allows users to follow along with highlighted text (in supported environments) or simply listen while multitasking. Students can proofread essays by listening for awkward phrasing that the eye might miss, while commuters can turn long-form articles into personal podcasts. The ability to adjust the speaking rate is particularly valuable for speed-listeners who want to consume information at 2x speed, or language learners who need a slower pace to catch pronunciation nuances.
 </p>
 <h3>Privacy-First Architecture</h3>
 <p>
 In an era of data scraping and privacy concerns, local processing is a significant advantage. Because the synthesis happens entirely within your browser's engine, there is no API latency and no risk of data interception. You can use this tool offline (once the page is loaded) and trust that your intellectual property remains yours alone.
 </p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion
 faqs={[
 { question:"Why do some voices sound better than others?", answer:"Voice quality depends on your operating system. Modern OS versions (Windows 11, macOS, iOS, Android) include 'Neural' or 'Enhanced' voices that sound very human. Older systems may only have basic robotic voices."},
 { question:"Is there a limit to how much text I can convert?", answer:"Browsers typically have a character limit per utterance (often around 200-300 characters). However, our tool automatically chunks long text into smaller segments and plays them sequentially, effectively allowing for unlimited text length."},
 { question:"Does this tool work offline?", answer:"Yes. Once the webpage is loaded, the speech synthesis is handled entirely by your device's local hardware and software. No internet connection is required to generate audio."},
 { question:"Can I download the audio as an MP3?", answer:"The Web Speech API is designed for real-time playback and does not natively support file export. To record the audio, you would need to use a system audio recorder or screen recording software while the tool is playing."},
 { question:"Why is the 'Stop' button greyed out?", answer:"The Stop button is only active when audio is currently playing or paused. If the synthesis has finished or hasn't started, the button is disabled."}
 ]}
 />

 <RelatedTools currentToolUrl="/tools/text/text-to-speech"max={6} />
 </div>
 );
}

export default TextToSpeechClient;
