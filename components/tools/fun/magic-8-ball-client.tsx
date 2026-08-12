"use client";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Circle, Sparkles } from"lucide-react";

const cardClass ="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass ="border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass ="text-xs sm:text-sm font-semibold flex items-center gap-2";

const responses = [
"It is certain.","It is decidedly so.","Without a doubt.","Yes – definitely.",
"You may rely on it.","As I see it, yes.","Most likely.","Outlook good.",
"Yes.","Signs point to yes.","Reply hazy, try again.","Ask again later.",
"Better not tell you now.","Cannot predict now.","Concentrate and ask again.",
"Don't count on it.","My reply is no.","My sources say no.","Outlook not so good.",
"Very doubtful."
];

export default function Magic8BallClient() {
 const [question, setQuestion] = useState("");
 const [answer, setAnswer] = useState("");
 const [shaking, setShaking] = useState(false);
 const [history, setHistory] = useState<{ q: string; a: string }[]>([]);

 const ask = () => {
 setShaking(true);
 setAnswer("");
 setTimeout(() => {
 const res = responses[Math.floor(Math.random() * responses.length)];
 setAnswer(res);
 setShaking(false);
 if (question.trim()) {
 setHistory(prev => [{ q: question, a: res }, ...prev].slice(0, 10));
 setQuestion("");
 }
 }, 1500);
 };

 return (
 <div className="max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6">
 <ToolPageHeader icon={Circle} title="Magic 8 Ball"description="Ask the mystical 8-ball a yes-or-no question and receive your fate."/>
 
 <Card className={cardClass}>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>Ask Your Question</CardTitle>
 </CardHeader>
 <CardContent className="p-4 sm:p-6 space-y-6 flex flex-col items-center">
 <Input 
 placeholder="Type your yes/no question here..."
 value={question} 
 onChange={e => setQuestion(e.target.value)}
 className="max-w-md text-center"
 />

 <div 
 className={`relative w-64 h-64 rounded-full bg-gradient-to-br from-slate-800 to-black shadow-2xl flex items-center justify-center border-8 border-slate-900 transition-transform duration-300 ${shaking ?"animate-bounce rotate-12":""}`}
 >
 <div className="w-24 h-24 bg-blue-900 rounded-full flex items-center justify-center border-4 border-blue-700">
 <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[35px] border-b-white flex items-center justify-center">
 <span className="text-primary text-xs font-bold mt-2">
 {shaking ?"8": (answer ?"✧":"8")}
 </span>
 </div>
 </div>
 </div>

 <div className="h-16 flex items-center justify-center text-center px-4">
 {shaking ? (
 <span className="text-muted-foreground italic animate-pulse">Shaking the ethereal plane...</span>
 ) : (
 <span className="text-2xl font-bold text-primary">{answer ||"Ask to receive an answer"}</span>
 )}
 </div>

 <Button onClick={ask} disabled={shaking} size="lg"className="px-8">
 <Sparkles className="w-4 h-4 mr-2"/> {shaking ?"Consulting...":"Ask the 8-Ball"}
 </Button>

 {history.length > 0 && (
 <div className="w-full max-w-md mt-8 border-t border-border/50 pt-4 space-y-2">
 <h3 className="text-sm font-semibold text-center mb-2">Recent Consultations</h3>
 <div className="space-y-2 max-h-40 overflow-y-auto">
 {history.map((h, i) => (
 <div key={i} className="p-2 bg-muted/20 rounded-lg text-sm">
 <div className="text-muted-foreground italic">"{h.q}"</div>
 <div className="font-bold text-primary">{h.a}</div>
 </div>
 ))}
 </div>
 </div>
 )}
 </CardContent>
 </Card>

 <ToolHowItWorks 
 steps={[
 { step:"01", title:"Formulate Question", description:"Think of a clear yes-or-no question and type it into the input field.", icon: Circle },
 { step:"02", title:"Shake the Ball", description:"Click the ask button and watch the 8-ball shake as it consults the universe.", icon: Circle },
 { step:"03", title:"Read Prophecy", description:"The mystical triangle reveals your answer, which is also saved to your history.", icon: Circle }
 ]} 
 badges={["100% Free","Client-Side","Fun"]} 
 />

 <ToolFeatureGuides features={[
 { icon: Circle, title:"Classic Responses", description:"Features all 20 of the original, iconic Magic 8 Ball answers from positive to negative."},
 { icon: Circle, title:"Shake Animation", description:"Includes a satisfying visual bounce and rotation effect while the answer is being determined."},
 { icon: Circle, title:"Question History", description:"Keeps a log of your last 10 questions and answers for easy reference."},
 { icon: Circle, title:"Zero Latency", description:"The randomness is generated instantly in your browser for immediate gratification."}
 ]}>
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <p>The Magic 8 Ball has been the ultimate decision-making toy since the 1950s. Our digital recreation captures the suspense and nostalgia of the original liquid-filled sphere, right down to the blue triangle window.</p>
 <p>Whether you are trying to decide if you should text your crush, or if it will rain later today, the 8-ball provides a fun, randomized perspective to break through analysis paralysis.</p>
 <p>The history tracker allows you to look back on the session's prophecies, making it a great party game for taking turns asking the oracle questions.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion faqs={[
 { question:"How many possible answers are there?", answer:"Just like the physical toy, this digital version contains exactly 20 possible responses: 10 positive, 5 non-committal, and 5 negative."},
 { question:"Is the answer truly random?", answer:"Yes, it uses a high-quality pseudo-random number generator to ensure every shake has an equal probability of yielding any of the 20 answers."},
 { question:"Can I ask open-ended questions?", answer:"The Magic 8 Ball is designed strictly for 'Yes or No' questions. Open-ended questions will still yield a random yes/no response, which might not make sense."}
 ]} />

 <RelatedTools currentToolUrl="/tools/fun/magic-8-ball"max={6} />
 </div>
 );
}
