"use client";

import { useState, useEffect, useRef, useMemo } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { Card, CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { Label } from"@/components/ui/label";
import { RotateCcw, Timer, Activity, Zap, Keyboard, ShieldCheck, Target, Cpu, Clock as ClockIcon, BookOpen, Shield, BarChart3, Award, TrendingUp } from"lucide-react";
import { cn } from"@/lib/utils";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { GridPattern } from"@/components/magicui/grid-pattern";

const SAMPLE_TEXTS = {
 easy: [
"the quick brown fox jumps over the lazy dog",
"hello world this is a simple typing test for beginners",
"practice makes perfect keep typing to improve your speed",
"a short sentence is good for warming up your fingers",
"water is essential for life on earth and human health",
"reading a good book can improve your vocabulary immensely",
"never give up on your dreams no matter how hard it gets",
"the sun shines bright in the beautiful blue summer sky",
"typing games are a fun way to practice your keyboard skills",
"always remember to take breaks when working on a computer"
 ],
 medium: [
"Typing speed tests are a great way to measure your progress and improve your keyboard skills over time.",
"The ability to type quickly and accurately can save you hours of work each week, increasing your productivity.",
"When learning to touch type, it is more important to focus on accuracy rather than speed in the beginning.",
"A mechanical keyboard provides tactile feedback which many typists find satisfying and helpful for their speed.",
"Remember to maintain good posture while typing to prevent back pain and reduce strain on your wrists.",
"Consistent practice for just fifteen minutes a day can dramatically increase your overall words per minute.",
"Look at the screen instead of your hands while typing to train your muscle memory more effectively.",
"Different keyboard layouts like Dvorak and Colemak were designed to minimize finger movement and increase efficiency.",
"In the modern digital age, being proficient at typing is almost as essential as being able to write by hand.",
"There are many free online resources available to help you master touch typing from the comfort of your home."
 ],
 hard: [
"function calculateSpeed(chars, timeInSeconds) { return Math.round((chars / 5) / (timeInSeconds / 60)); }",
"const fetchData = async (url) => { try { const res = await fetch(url); return await res.json(); } catch(e) { console.error(e); } };",
"import React, { useState, useEffect } from 'react'; export default function App() { const [count, setCount] = useState(0); return <div/>; }",
"SELECT users.name, orders.total FROM users INNER JOIN orders ON users.id = orders.user_id WHERE orders.status = 'completed';",
"def bubble_sort(arr): n = len(arr); for i in range(n-1): for j in range(0, n-i-1): if arr[j] > arr[j+1]: arr[j], arr[j+1] = arr[j+1], arr[j]",
"document.addEventListener('DOMContentLoaded', () => { const elements = document.querySelectorAll('.item'); elements.forEach(el => el.classList.add('active')); });",
"type User = { id: string; username: string; email: string; createdAt: Date; isActive: boolean; };",
"public static void main(String[] args) { System.out.println(\"Hello, World!\"); ArrayList<String> list = new ArrayList<>(); }",
"interface DatabaseResponse<T> { data: T[]; totalCount: number; hasNextPage: boolean; error: Error | null; }",
"sudo apt-get update && sudo apt-get upgrade -y && sudo systemctl restart nginx.service"
 ]
};

type Difficulty ="easy"|"medium"|"hard";

export default function TypingTestClient() {
 const [difficulty, setDifficulty] = useState<Difficulty>("medium");
 const [targetText, setTargetText] = useState("");
 const [userInput, setUserInput] = useState("");
 const [status, setStatus] = useState<"idle"|"typing"|"finished">("idle");
 const [startTime, setStartTime] = useState<number | null>(null);
 const [duration, setDuration] = useState(0);
 
 const inputRef = useRef<HTMLTextAreaElement>(null);

 const getRandomText = (level: Difficulty) => {
 const texts = SAMPLE_TEXTS[level];
 return texts[Math.floor(Math.random() * texts.length)];
 };

 const startNewTest = (level: Difficulty = difficulty) => {
 setDifficulty(level);
 setTargetText(getRandomText(level));
 setUserInput("");
 setStatus("idle");
 setStartTime(null);
 setDuration(0);
 if (inputRef.current) {
 inputRef.current.focus();
 }
 };

 useEffect(() => {
 startNewTest(difficulty);
 // eslint-disable-next-line react-hooks/exhaustive-deps
 }, []);

 useEffect(() => {
 let interval: NodeJS.Timeout;
 if (status ==="typing") {
 interval = setInterval(() => {
 setDuration((Date.now() - (startTime || Date.now())) / 1000);
 }, 100);
 }
 return () => clearInterval(interval);
 }, [status, startTime]);

 const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
 const value = e.target.value;
 
 if (status ==="idle"&& value.length > 0) {
 setStatus("typing");
 setStartTime(Date.now());
 }

 // Prevent typing more than target text
 if (value.length <= targetText.length) {
 setUserInput(value);
 }

 if (value === targetText && targetText.length > 0) {
 setStatus("finished");
 }
 };

 const calculateStats = () => {
 const timeInMinutes = duration / 60;
 
 let correctChars = 0;
 for (let i = 0; i < userInput.length; i++) {
 if (userInput[i] === targetText[i]) {
 correctChars++;
 }
 }

 // Standard WPM: (total characters / 5) / time in minutes
 const rawWpm = timeInMinutes > 0 ? (userInput.length / 5) / timeInMinutes : 0;
 // Net WPM: (correct characters / 5) / time in minutes
 const netWpm = timeInMinutes > 0 ? (correctChars / 5) / timeInMinutes : 0;
 const accuracy = userInput.length > 0 ? (correctChars / userInput.length) * 100 : 0;
 const cpm = timeInMinutes > 0 ? correctChars / timeInMinutes : 0;

 return {
 wpm: Math.round(netWpm),
 accuracy: Math.round(accuracy),
 cpm: Math.round(cpm),
 time: duration.toFixed(1)
 };
 };

 const stats = calculateStats();

 const renderText = () => {
 return targetText.split("").map((char, index) => {
 let colorClass ="text-muted-foreground";
 if (index < userInput.length) {
 colorClass = userInput[index] === char ?"text-green-500 bg-green-500/10":"text-red-500 bg-red-500/20 rounded-sm";
 } else if (index === userInput.length && status !=="finished") {
 colorClass ="text-primary border-b-2 border-primary animate-pulse";
 }

 return (
 <span key={index} className={cn("text-2xl md:text-3xl font-mono transition-colors", colorClass)}>
 {char ===""?"": char}
 </span>
 );
 });
 };

 return (
 <div className="max-w-6xl mx-auto space-y-8">
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray="4 2"
        className="absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
      />

 <ToolPageHeader title="Typing Speed Test"description="Test and improve your typing speed and accuracy."/>
 
 <div className="grid gap-6 md:grid-cols-3">
 <Card className="md:col-span-2 shadow-sm border border-muted/50">
 <CardHeader className="flex flex-row items-center justify-between pb-2">
 <CardTitle className="text-lg">Typing Area</CardTitle>
 <div className="flex items-center gap-4">
 <div className="flex items-center gap-2">
 <Label htmlFor="difficulty"className="text-sm">Difficulty:</Label>
 <Select
 value={difficulty}
 onValueChange={(val: Difficulty) => {
 startNewTest(val);
 }}
 disabled={status ==="typing"}
 >
 <SelectTrigger id="difficulty"className="w-[120px] h-8 cursor-pointer">
 <SelectValue placeholder="Select"/>
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="easy">Easy</SelectItem>
 <SelectItem value="medium">Medium</SelectItem>
 <SelectItem value="hard">Hard (Code)</SelectItem>
 </SelectContent>
 </Select>
 </div>
 <Button size="sm"variant="outline"onClick={() => startNewTest()} className="h-8 cursor-pointer">
 <RotateCcw className="w-4 h-4 mr-1"/>
 Reset
 </Button>
 </div>
 </CardHeader>
 <CardContent className="pt-4">
 <div 
 className="relative p-6 bg-card border rounded-lg min-h-[200px] cursor-text"
 onClick={() => inputRef.current?.focus()}
 >
 <div className="absolute inset-0 p-6 pointer-events-none select-none break-words whitespace-pre-wrap leading-relaxed">
 {renderText()}
 </div>
 <textarea
 ref={inputRef}
 value={userInput}
 onChange={handleInputChange}
 className="absolute inset-0 w-full h-full opacity-0 resize-none z-10 cursor-text"
 disabled={status ==="finished"}
 autoFocus
 spellCheck={false}
 />
 {status ==="idle"&& userInput.length === 0 && (
 <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-muted-foreground text-sm flex items-center gap-2 animate-pulse">
 Start typing to begin
 </div>
 )}
 </div>
 </CardContent>
 </Card>

 <div className="space-y-6">
 <Card className="shadow-sm border border-muted/50">
 <CardHeader className="pb-2">
 <CardTitle className="text-lg flex items-center gap-2">
 <Timer className="w-5 h-5 text-primary"/>
 Live Stats
 </CardTitle>
 </CardHeader>
 <CardContent>
 <div className="space-y-6">
 <div className="flex flex-col items-center p-4 bg-muted/50 rounded-lg">
 <span className="text-4xl font-bold text-primary">{stats.wpm}</span>
 <span className="text-sm text-muted-foreground font-medium uppercase tracking-wider">WPM</span>
 </div>
 
 <div className="grid grid-cols-2 gap-4">
 <div className="flex flex-col items-center p-3 bg-muted/30 rounded-lg">
 <span className="text-2xl font-semibold">{stats.accuracy}%</span>
 <span className="text-xs text-muted-foreground uppercase tracking-wider">Accuracy</span>
 </div>
 <div className="flex flex-col items-center p-3 bg-muted/30 rounded-lg">
 <span className="text-2xl font-semibold">{stats.time}s</span>
 <span className="text-xs text-muted-foreground uppercase tracking-wider">Time</span>
 </div>
 </div>
 </div>
 </CardContent>
 </Card>

 {status ==="finished"&& (
 <Card className="border-primary/50 bg-primary/5 shadow-sm animate-in fade-in slide-in-from-bottom-4">
 <CardHeader className="pb-2">
 <CardTitle className="text-lg flex items-center gap-2">
 <Activity className="w-5 h-5 text-primary"/>
 Results
 </CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <div className="flex justify-between text-sm">
 <span className="text-muted-foreground">Net WPM</span>
 <span className="font-semibold">{stats.wpm}</span>
 </div>
 <div className="flex justify-between text-sm">
 <span className="text-muted-foreground">Accuracy</span>
 <span className="font-semibold">{stats.accuracy}%</span>
 </div>
 <div className="flex justify-between text-sm">
 <span className="text-muted-foreground">Characters (CPM)</span>
 <span className="font-semibold">{stats.cpm}</span>
 </div>
 <div className="flex justify-between text-sm">
 <span className="text-muted-foreground">Time taken</span>
 <span className="font-semibold">{stats.time}s</span>
 </div>
 </div>
 <Button onClick={() => startNewTest()} className="w-full group cursor-pointer">
 <Zap className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform"/>
 Try Again
 </Button>
 </CardContent>
 </Card>
 )}
 </div>
 </div>

 {/* SECTION 3: HOW IT WORKS */}
 <ToolHowItWorks
 steps={[
 {
 step:"01",
 title:"Read the Prompt",
 description:"A text passage appears on screen. Read it carefully before you begin — understanding the content helps you type more accurately and at a comfortable speed.",
 icon: BookOpen,
 },
 {
 step:"02",
 title:"Type the Text",
 description:"Start typing the passage. The timer begins automatically with your first keystroke. Correctly typed characters turn green; errors turn red. The test tracks every mistake.",
 icon: Keyboard,
 },
 {
 step:"03",
 title:"See Your Results",
 description:"When you finish, see your WPM (words per minute), accuracy percentage, number of errors, and time taken. Compare your score to industry benchmarks.",
 icon: BarChart3,
 },
 ]}
 badges={[
"WPM measurement",
"Accuracy tracking",
"Multiple difficulty levels",
 ]}
 />

 {/* SECTION 4: FEATURE GUIDES */}
 <ToolFeatureGuides
 features={[
 {
 icon: Zap,
 title:"Real-Time WPM Counter",
 description:"Shows your words per minute in real time as you type — so you can see your speed fluctuate and identify where you slow down or make errors.",
 },
 {
 icon: Target,
 title:"Accuracy Measurement",
 description:"Tracks every error and calculates accuracy as a percentage. A high WPM with low accuracy is counterproductive — the goal is high speed AND high accuracy (95%+).",
 },
 {
 icon: Timer,
 title:"Timed & Word Count Modes",
 description:"Choose a fixed time (1 min, 2 min, 5 min) to measure WPM, or a fixed word count (50, 100, 200 words) to measure completion speed with full accuracy.",
 },
 {
 icon: Keyboard,
 title:"Multiple Text Passages",
 description:"Tests use a variety of passages: common English words for beginners, longer sentences for intermediate, programming keywords for developers, and random text for challenge.",
 },
 {
 icon: Award,
 title:"Score Benchmarking",
 description:"Results are compared against average typing speeds for different professions — general users, office workers, programmers, and professional typists.",
 },
 {
 icon: TrendingUp,
 title:"Progress Tracking",
 description:"Take multiple tests and track your WPM improvement over time. Regular 10-minute practice sessions can increase typing speed by 10-20 WPM within weeks.",
 },
 ]}
 >
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <h3 className="text-lg font-semibold">Typing Speed Guide — WPM Benchmarks and How to Improve</h3>
 <p>
 Typing speed is measured in <strong>WPM (Words Per Minute)</strong>, where a"word"is
 standardized as 5 keystrokes (including spaces). A score of 40 WPM with 95% accuracy is
 considered the baseline for office work. Top typists reach 100-150+ WPM. The global
 average for adults is approximately 40 WPM.
 </p>

 <h4 className="font-semibold">Typing Speed Benchmarks by Level</h4>
 <div className="overflow-x-auto">
 <table className="w-full border-collapse text-sm">
 <thead>
 <tr className="bg-muted/50">
 <th className="border p-2 text-left">Level</th>
 <th className="border p-2 text-left">WPM Range</th>
 <th className="border p-2 text-left">Accuracy</th>
 <th className="border p-2 text-left">Context</th>
 </tr>
 </thead>
 <tbody>
 {[
 ["Beginner","10-30 WPM","< 90%","Two-finger hunt & peck"],
 ["Below average","30-40 WPM","90%+","Developing typist"],
 ["Average adult","40-55 WPM","92%+","General computer user"],
 ["Good typist","55-80 WPM","95%+","Office worker"],
 ["Fast typist","80-100 WPM","97%+","Professional, programmer"],
 ["Expert typist","100-130 WPM","98%+","Secretary, transcriptionist"],
 ["World-class","130-200+ WPM","99%+","Competitive typist"],
 ].map(([level, wpm, acc, context]) => (
 <tr key={level} className="odd:bg-muted/20">
 <td className="border p-2 font-medium text-xs">{level}</td>
 <td className="border p-2 text-primary font-mono text-xs">{wpm}</td>
 <td className="border p-2 text-xs">{acc}</td>
 <td className="border p-2 text-muted-foreground text-xs">{context}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>

 <h4 className="font-semibold">Top Tips to Increase Typing Speed</h4>
 <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
 <li><strong>Use all 10 fingers:</strong> Touch typing using the home row (ASDF JKL;) is the fastest method. Each finger is responsible for specific keys.</li>
 <li><strong>Don't look at the keyboard:</strong> Force yourself to look at the screen only. Place a cover over the keyboard if needed. This is the hardest but most important habit.</li>
 <li><strong>Prioritize accuracy over speed:</strong> Speed will come naturally as muscle memory develops. Focus on 95%+ accuracy first.</li>
 <li><strong>Practice daily:</strong> 10-15 minutes of deliberate practice daily is more effective than 2 hours weekly. Consistency builds muscle memory.</li>
 <li><strong>Use typing practice apps:</strong> Typing.com, Keybr, and Monkeytype are popular free tools for structured improvement.</li>
 <li><strong>Learn keyboard shortcuts:</strong> Ctrl+C, Ctrl+V, Ctrl+Z, and others reduce hand movement and increase effective productivity speed beyond raw WPM.</li>
 </ul>
 </div>
 </ToolFeatureGuides>

 {/* SECTION 5: FAQ + RELATED TOOLS */}
 <ToolFaqAccordion
 faqs={[
 {
 question:"What is a good typing speed in WPM?",
 answer:"40-55 WPM is considered average for adults. 60-80 WPM is good and sufficient for most office work. 80-100 WPM is fast and will make you noticeably more productive. Above 100 WPM is expert-level. Accuracy matters as much as speed — aim for 95%+ accuracy at whatever speed you're currently at.",
 },
 {
 question:"How is WPM calculated?",
 answer:"WPM (Words Per Minute) = (total characters typed / 5) / minutes elapsed. A 'word' is standardized as 5 characters (including spaces) to normalize for different word lengths. Only correctly typed characters count. Errors reduce your effective WPM score.",
 },
 {
 question:"How long does it take to improve typing speed?",
 answer:"With consistent daily practice (10-15 min/day), most people can gain 10-15 WPM in 4-6 weeks. Going from 40 to 60 WPM typically takes 2-3 months. From 60 to 80+ WPM takes 3-6 months of deliberate practice. The key is focusing on touch typing (all 10 fingers, not looking at keys) rather than just typing faster.",
 },
 {
 question:"What is touch typing?",
 answer:"Touch typing is typing without looking at the keyboard, using a systematic finger placement system. Each finger is assigned specific keys based on the QWERTY layout. The 8 'home row' keys (ASDF JKL;) are the starting positions. Expert touch typists can reach 100+ WPM because their fingers move by muscle memory, not conscious thought.",
 },
 {
 question:"What typing speed do programming jobs require?",
 answer:"There's no strict minimum for programming, but 60+ WPM makes a meaningful difference in productivity. More importantly, programmers benefit from fast keyboard shortcut usage (IDE shortcuts, terminal commands) and accurate symbol typing (brackets, semicolons, underscores). Speed on special characters matters more for programmers than raw WPM.",
 },
 ]}
 />
 <RelatedTools currentToolUrl="/tools/util/typing-test" max={6} />
 </div>
 );
}
