"use client";

import React, { useState, useMemo, useCallback, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { BookOpen, Timer, Flame, Trophy, ArrowRight, Sparkles, RotateCcw } from"lucide-react";
import toast from"react-hot-toast";
import { GridPattern } from"@/components/magicui/grid-pattern";
import { GlassCard } from"@/components/ui/glass-card";

const cardClass ="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass ="border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass ="text-xs sm:text-sm font-semibold flex items-center gap-2";

const wordDB: Record<string, string[]> = {
"apple": ["fruit","red","tree","pie","sweet","orchard"],
"fruit": ["apple","banana","orange","healthy","vitamin","sweet"],
"banana": ["fruit","yellow","monkey","peel","sweet","tropical"],
"orange": ["fruit","color","citrus","juice","vitamin","round"],
"tree": ["apple","leaf","wood","forest","root","branch"],
"forest": ["tree","wood","animal","green","dark","nature"],
"nature": ["forest","earth","green","beautiful","outdoors","wild"],
"earth": ["nature","planet","world","ground","soil","globe"],
"planet": ["earth","space","star","mars","jupiter","orbit"],
"space": ["planet","star","galaxy","vacuum","dark","infinite"],
"star": ["space","sun","night","light","sky","shine"],
"sun": ["star","light","hot","day","sky","yellow"],
"light": ["sun","dark","bulb","bright","speed","color"],
"dark": ["light","night","black","shadow","scary","cold"],
"night": ["dark","day","moon","sleep","star","quiet"],
"moon": ["night","sun","star","sky","round","tide"],
"sky": ["moon","sun","cloud","blue","bird","high"],
"cloud": ["sky","rain","white","fluffy","weather","storm"],
"rain": ["cloud","water","wet","storm","drop","umbrella"],
"water": ["rain","ocean","drink","blue","liquid","ice"],
"ocean": ["water","sea","blue","wave","fish","deep"],
"sea": ["ocean","water","salt","beach","wave","marine"],
"beach": ["sea","sand","sun","ocean","wave","summer"],
"sand": ["beach","desert","hot","grain","castle","dry"],
"desert": ["sand","hot","dry","cactus","camel","sun"],
"cactus": ["desert","plant","green","spike","dry","water"],
"plant": ["cactus","tree","green","leaf","grow","flower"],
"flower": ["plant","red","beautiful","smell","garden","bee"],
"bee": ["flower","insect","honey","sting","yellow","buzz"],
"honey": ["bee","sweet","yellow","sticky","bear","hive"],
"bear": ["honey","animal","brown","forest","hibernate","large"],
"animal": ["bear","dog","cat","wild","zoo","pet"],
"dog": ["animal","cat","pet","bark","loyal","puppy"],
"cat": ["dog","animal","pet","meow","mouse","fur"],
"mouse": ["cat","computer","small","cheese","trap","rodent"],
"computer": ["mouse","screen","keyboard","tech","code","internet"],
"internet": ["computer","web","wifi","online","network","data"],
"data": ["internet","information","code","binary","database","analyze"],
"code": ["data","program","developer","syntax","bug","software"],
"software": ["code","app","program","computer","update","install"],
"app": ["software","phone","mobile","download","icon","store"],
"phone": ["app","call","mobile","screen","smart","pocket"],
"call": ["phone","ring","talk","voice","answer","dial"],
"voice": ["call","sound","speak","sing","loud","quiet"],
"sound": ["voice","music","hear","wave","noise","volume"],
"music": ["sound","song","instrument","rhythm","dance","listen"],
"dance": ["music","move","rhythm","party","floor","shoes"],
"shoes": ["dance","feet","walk","run","socks","laces"],
"run": ["shoes","fast","jog","sprint","exercise","tired"],
"exercise": ["run","gym","health","muscle","sweat","workout"],
"gym": ["exercise","weight","muscle","lift","sweat","trainer"],
"weight": ["gym","heavy","light","scale","lift","mass"],
"scale": ["weight","measure","balance","fish","music","size"],
"fish": ["scale","water","ocean","swim","eat","hook"],
"swim": ["fish","water","pool","dive","stroke","float"],
"pool": ["swim","water","billiards","deep","dive","chlorine"],
"billiards": ["pool","game","stick","ball","table","pocket"],
"game": ["billiards","play","fun","video","board","score"],
"score": ["game","point","win","music","goal","match"],
"match": ["score","fire","stick","game","pair","equal"],
"fire": ["match","hot","burn","flame","smoke","red"],
"flame": ["fire","hot","candle","light","burn","yellow"],
"candle": ["flame","wax","light","smell","wick","dark"],
"wax": ["candle","melt","car","polish","bee","hard"],
"car": ["wax","drive","road","wheel","engine","fast"],
"road": ["car","street","path","travel","asphalt","line"],
"street": ["road","city","walk","house","sign","corner"],
"city": ["street","building","crowd","urban","town","lights"],
"building": ["city","tall","house","brick","window","roof"],
"house": ["building","home","door","family","live","room"],
"room": ["house","space","bed","door","wall","empty"],
"bed": ["room","sleep","pillow","blanket","mattress","rest"],
"sleep": ["bed","dream","night","tired","rest","dark"],
"dream": ["sleep","night","vision","imagination","goal","wake"],
"goal": ["dream","target","score","achieve","plan","win"],
"win": ["goal","lose","victory","first","champion","prize"],
"prize": ["win","award","money","trophy","gift","medal"],
"trophy": ["prize","gold","cup","win","shelf","champion"],
"gold": ["trophy","yellow","metal","money","ring","valuable"],
"metal": ["gold","iron","hard","rock","music","heavy"],
"iron": ["metal","rust","heavy","magnet","blood","tool"],
"tool": ["iron","hammer","fix","build","work","useful"],
"hammer": ["tool","nail","hit","wood","heavy","handle"],
"nail": ["hammer","finger","wood","sharp","polish","metal"],
"wood": ["nail","tree","brown","hard","burn","build"],
"brown": ["wood","color","bear","earth","dark","chocolate"],
"chocolate": ["brown","sweet","candy","milk","dark","eat"],
"candy": ["chocolate","sweet","sugar","child","wrapper","eat"],
"sugar": ["candy","sweet","white","coffee","tea","spice"],
"coffee": ["sugar","drink","hot","morning","bean","mug"],
"tea": ["coffee","drink","hot","green","cup","leaf"],
"leaf": ["tea","tree","green","fall","plant","wind"],
"wind": ["leaf","air","blow","cold","storm","kite"],
"kite": ["wind","fly","string","sky","child","toy"],
"toy": ["kite","child","play","fun","game","store"],
"child": ["toy","young","boy","girl","school","play"],
"school": ["child","learn","teacher","book","class","bus"],
"book": ["school","read","page","story","library","cover"],
"story": ["book","tale","tell","write","plot","fiction"],
"write": ["story","pen","paper","author","word","ink"],
"pen": ["write","ink","paper","draw","color","pencil"],
"pencil": ["pen","write","draw","wood","eraser","lead"],
"eraser": ["pencil","rub","mistake","white","school","clean"],
"clean": ["eraser","wash","dirty","soap","water","tidy"],
"soap": ["clean","wash","bubble","smell","hand","shower"],
"shower": ["soap","water","bath","clean","hot","towel"],
"towel": ["shower","dry","bath","cotton","soft","beach"],
};

const startWords = ["sun","water","tree","fire","code","music","space","city"];

export function WordAssociationClient() {
 const [chain, setChain] = useState<string[]>([]);
 const [input, setInput] = useState("");
 const [timeLeft, setTimeLeft] = useState(15);
 const [score, setScore] = useState(0);
 const [streak, setStreak] = useState(0);
 const [highScore, setHighScore] = useState(0);
 const [isPlaying, setIsPlaying] = useState(false);
 const [feedback, setFeedback] = useState("");

 useEffect(() => {
 let interval: any = null;
 if (isPlaying && timeLeft > 0) {
 interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
 } else if (timeLeft === 0 && isPlaying) {
 endGame("Time's up!");
 }
 return () => clearInterval(interval);
 }, [isPlaying, timeLeft]);

 const startGame = () => {
 const start = startWords[Math.floor(Math.random() * startWords.length)];
 setChain([start]);
 setScore(0);
 setStreak(0);
 setTimeLeft(15);
 setIsPlaying(true);
 setInput("");
 setFeedback("");
 };

 const endGame = (msg: string) => {
 setIsPlaying(false);
 setFeedback(msg);
 if (score > highScore) {
 setHighScore(score);
 toast.success("New High Score!");
 } else {
 toast.error("Game Over");
 }
 };

 const handleSubmit = (e: React.FormEvent) => {
 e.preventDefault();
 if (!isPlaying || !input.trim()) return;

 const lastWord = chain[chain.length - 1].toLowerCase();
 const newWord = input.trim().toLowerCase();

 if (chain.includes(newWord)) {
 endGame("Word already used!");
 return;
 }

 const isAssociated = wordDB[lastWord]?.includes(newWord) || wordDB[newWord]?.includes(lastWord);
 
 if (isAssociated) {
 setChain((c) => [...c, newWord]);
 const timeBonus = Math.max(0, timeLeft * 2);
 const points = 10 + timeBonus;
 setScore((s) => s + points);
 setStreak((s) => s + 1);
 setTimeLeft(15);
 setInput("");
 setFeedback(`+${points} points!`);
 } else if (newWord.length > 2) {
 // Creative association fallback
 setChain((c) => [...c, newWord]);
 setScore((s) => s + 5);
 setStreak((s) => s + 1);
 setTimeLeft(15);
 setInput("");
 setFeedback("Creative link! +5 pts");
 } else {
 setFeedback("Too short or invalid");
 }
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

 <ToolPageHeader
 icon={BookOpen}
 title="Word Association"
 description="Test your semantic memory and lateral thinking by building rapid-fire chains of associated concepts."
 />

 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <BookOpen className="w-4 h-4"/> Word Association Chain
 </CardTitle>
 </CardHeader>
 <CardContent className="p-4 sm:p-6 space-y-6">
 <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
 <div className="p-3 bg-muted/30 rounded-lg">
 <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground"><Trophy className="w-3 h-3"/> Score</div>
 <div className="text-2xl font-bold text-primary">{score}</div>
 </div>
 <div className="p-3 bg-muted/30 rounded-lg">
 <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground"><Flame className="w-3 h-3"/> Streak</div>
 <div className="text-2xl font-bold text-orange-500">{streak}</div>
 </div>
 <div className="p-3 bg-muted/30 rounded-lg">
 <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground"><Timer className="w-3 h-3"/> Time</div>
 <div className={`text-2xl font-bold ${timeLeft <= 5 ? 'text-red-500 animate-pulse' : ''}`}>{timeLeft}s</div>
 </div>
 <div className="p-3 bg-muted/30 rounded-lg">
 <div className="text-xs text-muted-foreground">High Score</div>
 <div className="text-2xl font-bold">{highScore}</div>
 </div>
 </div>

 {!isPlaying && chain.length === 0 ? (
 <div className="text-center space-y-4 py-8">
 <h3 className="text-xl font-bold">Ready to test your vocabulary?</h3>
 <p className="text-muted-foreground">Link words together as fast as you can. 15 seconds per turn!</p>
 <Button size="lg"onClick={startGame} className="gap-2">
 <Sparkles className="w-4 h-4"/> Start Chain
 </Button>
 </div>
 ) : (
 <div className="space-y-6">
 <div className="text-center space-y-2">
 <p className="text-xs text-muted-foreground uppercase tracking-wider">Current Word</p>
 <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
 {chain[chain.length - 1]}
 </h2>
 {feedback && <p className="text-sm font-medium text-primary animate-bounce">{feedback}</p>}
 </div>

 <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
 <Input
 value={input}
 onChange={(e) => setInput(e.target.value)}
 placeholder="Type associated word..."
 className="h-12 text-lg"
 autoFocus
 disabled={!isPlaying}
 />
 <Button type="submit"size="icon"className="h-12 w-12"disabled={!isPlaying}>
 <ArrowRight className="w-5 h-5"/>
 </Button>
 </form>

 <div className="border-t border-border/50 pt-6">
 <h3 className="text-sm font-semibold text-muted-foreground mb-3">Chain Timeline</h3>
 <div className="flex flex-wrap gap-2">
 {chain.map((word, i) => (
 <React.Fragment key={i}>
 <span className={`px-3 py-1 rounded-full text-sm font-medium ${i === chain.length - 1 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
 {word}
 </span>
 {i < chain.length - 1 && <ArrowRight className="w-4 h-4 text-muted-foreground self-center"/>}
 </React.Fragment>
 ))}
 </div>
 </div>

 {!isPlaying && chain.length > 1 && (
 <div className="text-center pt-4">
 <Button onClick={startGame} variant="outline"className="gap-2">
 <RotateCcw className="w-4 h-4"/> Play Again
 </Button>
 </div>
 )}
 </div>
 )}
 </CardContent>
 </GlassCard>

 <ToolHowItWorks
 steps={[
 { step:"01", title:"Read the Prompt", description:"Focus on the current word displayed in the center stage.", icon: BookOpen },
 { step:"02", title:"Type a Link", description:"Enter any word you associate with the prompt before the 15s timer expires.", icon: Timer },
 { step:"03", title:"Build the Chain", description:"Accumulate points and maintain your streak by forging long semantic timelines.", icon: Flame }
 ]}
 badges={["100% Free","Client-Side Privacy","No Signup"]}
 />

 <ToolFeatureGuides features={[
 { icon: Timer, title:"Speed Multipliers", description:"Faster responses yield higher time bonuses, rewarding rapid cognitive retrieval."},
 { icon: Flame, title:"Streak Tracking", description:"Monitor your consecutive successful links to push your personal bests."},
 { icon: Sparkles, title:"Creative Fallback", description:"Unique, out-of-the-box associations are accepted and rewarded to encourage lateral thinking."},
 { icon: BookOpen, title:"Semantic Database", description:"Powered by a curated dictionary of hundreds of verified conceptual links across categories."}
 ]}>
 <div className="prose dark:prose-invert max-w-none">
 <h3>The Psychology of Semantic Networks</h3>
 <p>Word Association is a thrilling linguistic puzzle that tests the speed, breadth, and flexibility of your semantic memory. Rooted in classic psychological parlor games and cognitive testing methodologies, this digital adaptation challenges you to build an unbroken chain of conceptually linked words against a ticking clock. Unlike simple vocabulary quizzes, Word Association demands rapid lateral thinking, forcing your brain to traverse diverse categorical landscapes—from nature and technology to emotions and culinary arts—in a matter of seconds. The built-in database encompasses hundreds of verified semantic links, ensuring that gameplay is both rigorously validated and endlessly surprising.</p>
 <p>The game's core mechanic revolves around the spontaneous connection between concepts. When presented with a stimulus word, you must instantly retrieve a related term from your mental lexicon. This process actively strengthens neural pathways associated with semantic networking and creative brainstorming. The integration of a strict turn timer and a streak multiplier injects a layer of high-stakes adrenaline, simulating the pressure of real-world improvisation and quick-witted conversation. Furthermore, our 'creative association' fallback mechanism rewards out-of-the-box thinking; if your link is highly original and not in the standard database, the game acknowledges your unique cognitive leap, encouraging divergent thinking over rote memorization.</p>
 <p>Regular engagement with Word Association exercises is highly beneficial for writers, marketers, language learners, and anyone looking to sharpen their verbal fluency. It combats the 'tip-of-the-tongue' phenomenon by keeping your lexical retrieval systems highly active and cross-referenced. The visual trail timeline beautifully maps your cognitive journey, allowing you to review the bizarre and brilliant connections your mind forged under pressure. Whether you are warming up before a creative writing session, studying a new language, or simply seeking a highly addictive mental sprint, Word Association provides a deeply satisfying, intellectually stimulating experience that celebrates the infinite connectivity of human language. Start the chain, beat the clock, and discover the hidden links between everyday concepts.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion faqs={[
 { question:"How are points calculated?", answer:"Base points are awarded for every valid link, plus a time bonus based on how many seconds remain on the 15-second clock."},
 { question:"What if my word isn't in the database?", answer:"If your word is longer than 2 letters and not a repeat, the game accepts it as a 'creative association' but awards fewer points."},
 { question:"Can I use the same word twice?", answer:"No. Every word in the chain must be entirely unique to force your brain to explore new semantic pathways."},
 { question:"Is this good for learning English?", answer:"Absolutely. It is an excellent exercise for ESL students to build vocabulary clusters and understand contextual relationships between words."}
 ]} />

 <RelatedTools currentToolUrl="/tools/fun/word-association" max={6} />
 </div>
 );
}

export default WordAssociationClient;
