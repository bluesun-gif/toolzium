"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RotateCcw, Timer, Activity, Zap, Keyboard, ShieldCheck, Target, Cpu, Clock as ClockIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";

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

type Difficulty = "easy" | "medium" | "hard";

export default function TypingTestClient() {
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [targetText, setTargetText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [status, setStatus] = useState<"idle" | "typing" | "finished">("idle");
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
    if (status === "typing") {
      interval = setInterval(() => {
        setDuration((Date.now() - (startTime || Date.now())) / 1000);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [status, startTime]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    
    if (status === "idle" && value.length > 0) {
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
      let colorClass = "text-muted-foreground";
      if (index < userInput.length) {
        colorClass = userInput[index] === char ? "text-green-500 bg-green-500/10" : "text-red-500 bg-red-500/20 rounded-sm";
      } else if (index === userInput.length && status !== "finished") {
        colorClass = "text-primary border-b-2 border-primary animate-pulse";
      }

      return (
        <span key={index} className={cn("text-2xl md:text-3xl font-mono transition-colors", colorClass)}>
          {char === " " ? " " : char}
        </span>
      );
    });
  };

  const steps = [
    {
      step: "01",
      title: "Select Difficulty",
      description: "Choose between easy sentences, medium paragraphs, or hard developer code snippets.",
      icon: Cpu,
    },
    {
      step: "02",
      title: "Start Typing",
      description: "Focus the input window and start typing. The clock starts on your first keypress.",
      icon: Keyboard,
    },
    {
      step: "03",
      title: "Analyze Speed",
      description: "Once complete, review WPM, CPM, typing accuracy, and total time elapsed.",
      icon: Activity,
    },
  ];

  const features = [
    {
      title: "WPM Speed Tracker",
      description: "Computes Net WPM and Characters Per Minute (CPM) in real time using the standard formula.",
      icon: Activity,
    },
    {
      title: "Coding Mode (Hard)",
      description: "Test typing layout structures with standard HTML, JavaScript, Python, and SQL snippets.",
      icon: Keyboard,
    },
    {
      title: "Precision Accuracy",
      description: "Tracks wrong characters and displays correct vs. incorrect character ratios.",
      icon: Target,
    },
    {
      title: "Visual Highlighting",
      description: "Color-coded font overlays dynamically highlight correct, skipped, and typo keys.",
      icon: Keyboard,
    },
    {
      title: "Time Benchmarks",
      description: "Tracks precise elapsed time in seconds to measure pacing and speed progression.",
      icon: ClockIcon,
    },
    {
      title: "Instant Re-runs",
      description: "Click reset to fetch a new randomized block of text and start again instantly.",
      icon: RotateCcw,
    },
  ];

  const faqs = [
    {
      question: "How is typing speed (WPM) calculated?",
      answer: "Words Per Minute (WPM) is calculated using the standard formula: (Total Characters typed / 5) / Time taken in minutes. A 'word' is defined as exactly 5 characters, including spaces, numbers, and punctuation.",
    },
    {
      question: "What is a good typing speed?",
      answer: "The average typing speed is around 40 WPM. Professional typists, copywriters, and developers generally range from 60 to 80 WPM, while competitive typists can reach speeds exceeding 120 WPM with practice.",
    },
    {
      question: "Why does accuracy matter in a typing test?",
      answer: "Accuracy reflects your overall efficiency. While raw speed is interesting, Net WPM subtracts errors from your total, which is more representative of real-world productivity where correcting mistakes consumes extra time.",
    },
    {
      question: "Can I test my coding typing speed?",
      answer: "Yes. Our tool offers a 'Hard' difficulty mode loaded with real-world programming code snippets (HTML, CSS, JS, Python, SQL). This is perfect for developers who want to practice typing complex brackets, colons, and syntax.",
    },
    {
      question: "How can I improve my typing speed?",
      answer: "Practice touch typing by placing your fingers on the 'home row' (ASDF for left hand, JKL; for right hand). Focus entirely on accuracy first, as speed will naturally develop as your muscle memory improves.",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <ToolPageHeader title="Typing Speed Test" description="Test and improve your typing speed and accuracy." />
      
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2 shadow-sm border border-muted/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">Typing Area</CardTitle>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Label htmlFor="difficulty" className="text-sm">Difficulty:</Label>
                <Select
                  value={difficulty}
                  onValueChange={(val: Difficulty) => {
                    startNewTest(val);
                  }}
                  disabled={status === "typing"}
                >
                  <SelectTrigger id="difficulty" className="w-[120px] h-8 cursor-pointer">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard (Code)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button size="sm" variant="outline" onClick={() => startNewTest()} className="h-8 cursor-pointer">
                <RotateCcw className="w-4 h-4 mr-1" />
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
                disabled={status === "finished"}
                autoFocus
                spellCheck={false}
              />
              {status === "idle" && userInput.length === 0 && (
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
                <Timer className="w-5 h-5 text-primary" />
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

          {status === "finished" && (
            <Card className="border-primary/50 bg-primary/5 shadow-sm animate-in fade-in slide-in-from-bottom-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" />
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
                  <Zap className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  Try Again
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* SECTION 3: HOW IT WORKS */}
      <ToolHowItWorks steps={steps} />

      {/* SECTION 4: FEATURE HIGHLIGHTS & DEEP SEO GUIDE */}
      <ToolFeatureGuides features={features}>
        <div className="space-y-5 text-sm leading-relaxed text-muted-foreground">
          <h3 className="text-xl font-semibold text-foreground">How Words Per Minute (WPM) is Calculated</h3>
          <p>
            The standard metric for measuring typing speed is <strong>Words Per Minute (WPM)</strong>. In typing standards, a &quot;word&quot; is not defined by spaces or individual vocabulary length, as words vary from short links like <code>it</code> to complex terminology like <code>autobiography</code>. Instead, a standardized word is defined as exactly <strong>5 characters</strong> (including letters, spaces, numbers, and punctuation).
          </p>
          <p>
            The typing speed formula is:
            <code className="block p-3 bg-muted rounded-md text-center font-mono my-2">
              Gross WPM = (Total Typed Characters / 5) / Time in Minutes
            </code>
            This provides an objective baseline speed regardless of the complexity of the sentences typed.
          </p>

          <h3 className="text-xl font-semibold text-foreground">Understanding Gross WPM vs. Net WPM</h3>
          <p>
            While Gross WPM shows your raw movement speed across the keyboard, it does not account for spelling mistakes. In professional environments and employment testing, <strong>Net WPM</strong> is the default standard. Net WPM subtracts the number of uncorrected errors from your score:
            <code className="block p-3 bg-muted rounded-md text-center font-mono my-2">
              Net WPM = Gross WPM - (Uncorrected Errors / Time in Minutes)
            </code>
            This enforces speed discipline, as typing fast but leaving multiple typos represents low-quality work that requires correction time later.
          </p>

          <h3 className="text-xl font-semibold text-foreground">Typing Speed Classification and Occupations</h3>
          <p>
            Different careers demand varying typing speed capabilities. Review this bracket reference to assess your performance:
          </p>
          <table className="w-full border-collapse text-xs border border-border rounded-lg overflow-hidden my-4">
            <thead className="bg-muted text-foreground">
              <tr>
                <th className="border border-border p-2 text-left">Speed Class</th>
                <th className="border border-border p-2 text-left">WPM Range</th>
                <th className="border border-border p-2 text-left">Skill Level Description</th>
                <th className="border border-border p-2 text-left">Target Career Fields</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border p-2 font-medium">Slow / Beginner</td>
                <td className="border border-border p-2">Under 30 WPM</td>
                <td className="border border-border p-2">Hunt-and-peck typists using visual search</td>
                <td className="border border-border p-2">Basic desktop navigation, student training</td>
              </tr>
              <tr>
                <td className="border border-border p-2 font-medium">Average</td>
                <td className="border border-border p-2">30 - 50 WPM</td>
                <td className="border border-border p-2">Typical computer user speed with moderate touch proficiency</td>
                <td className="border border-border p-2">General office workers, managers, salespeople</td>
              </tr>
              <tr>
                <td className="border border-border p-2 font-medium">Productive</td>
                <td className="border border-border p-2">50 - 70 WPM</td>
                <td className="border border-border p-2">Comfortable touch-typists using muscle memory</td>
                <td className="border border-border p-2">Writers, journalists, software developers</td>
              </tr>
              <tr>
                <td className="border border-border p-2 font-medium">Fast / Professional</td>
                <td className="border border-border p-2">70 - 95 WPM</td>
                <td className="border border-border p-2">Highly fluid keyboard traversal with high accuracy</td>
                <td className="border border-border p-2">Executive assistants, court reporters, data transcribers</td>
              </tr>
              <tr>
                <td className="border border-border p-2 font-medium">Elite</td>
                <td className="border border-border p-2">95+ WPM</td>
                <td className="border border-border p-2">Flawless touch typing and reflex-level speed</td>
                <td className="border border-border p-2">Competitive typists, advanced stenographers</td>
              </tr>
            </tbody>
          </table>

          <h3 className="text-xl font-semibold text-foreground">Touch Typing Ergonomics and Posture</h3>
          <p>
            To reach professional speeds, you must learn <strong>touch typing</strong>—the ability to type without looking down at the keyboard. This relies on the home row keys (<code>A, S, D, F</code> for your left hand, and <code>J, K, L, ;</code> for your right hand). Notice the physical tactile bumps on the <code>F</code> and <code>J</code> keys; these guide your index fingers back to position without visual confirmation.
          </p>
          <p>
            Ergonomics are vital to avoid repetitive strain injuries (RSI) like Carpal Tunnel Syndrome. Maintain straight wrist alignment, keep your elbows at a 90-degree angle, and sit with straight spinal posture. Make sure you press keys with light, light taps rather than pounding keys.
          </p>

          <h3 className="text-xl font-semibold text-foreground">Keyboard Layouts: QWERTY vs. Dvorak and Colemak</h3>
          <p>
            While the **QWERTY** layout is standard, it was designed in 1873 for mechanical typewriters to deliberately separate common letter pairs, preventing physical type hammers from jamming. Alternative layouts like **Dvorak** (patented in 1936) place all vowels on the home row to reduce finger movement by up to 60%. **Colemak** is a newer, popular alternative that modifies only 17 keys from QWERTY, easing the learning curve while optimizing key rolls for maximum speed.
          </p>
        </div>
      </ToolFeatureGuides>

      {/* SECTION 5: FAQ & RELATED TOOLS */}
      <ToolFaqAccordion faqs={faqs} />
      <RelatedTools currentToolUrl="/tools/util/typing-test" max={6} />
    </div>
  );
}
