"use client";

import React, { useState, useMemo, useCallback, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Label } from"@/components/ui/label";
import { RotateCcw, Trophy, Share2, Settings, Keyboard } from"lucide-react";
import toast from"react-hot-toast";
import { GridPattern } from"@/components/magicui/grid-pattern";
import { GlassCard } from"@/components/ui/glass-card";

const cardClass ="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass ="border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass ="text-xs sm:text-sm font-semibold flex items-center gap-2";

const WORDS_5 ="about,above,abuse,actor,acute,admit,adopt,adult,after,again,agent,agree,ahead,alarm,album,alert,alike,alive,allow,alone,along,alter,among,anger,angle,angry,apart,apple,apply,arena,argue,arise,array,aside,asset,audio,audit,avoid,award,aware,badly,baker,bases,basic,beach,began,begin,being,bench,billy,birth,black,blade,blame,blank,blast,bleed,blend,bless,blind,block,blood,board,boost,booth,bound,brain,brand,bread,break,breed,brief,bring,broad,broke,brown,brush,buddy,build,built,bunch,burst,buyer,cable,calif,carry,catch,cause,chain,chair,chart,chase,cheap,check,chest,chief,child,china,chose,civil,claim,class,clean,clear,click,clock,close,cloud,coach,coast,could,count,court,cover,craft,crash,cream,crime,cross,crowd,crown,curve,cycle,daily,dance,dated,dealt,death,debut,delay,depth,doing,doubt,dozen,draft,drama,drawn,dream,dress,drill,drink,drive,drove,dying,eager,early,earth,eight,elite,empty,enemy,enjoy,enter,entry,equal,error,event,every,exact,exist,extra,faith,false,fault,fiber,field,fifth,fifty,fight,final,first,fixed,flash,fleet,floor,fluid,focus,force,forth,forty,forum,found,frame,frank,fraud,fresh,front,fruit,fully,funny,giant,given,glass,globe,going,grace,grade,grand,grant,grass,great,green,gross,group,grown,guard,guess,guest,guide,happy,heart,heavy,hence,herbs,highs,hills,holds,homes,honor,horse,hotel,house,human,hurry,ideal,image,imply,index,inner,input,issue,ivory,japan,jimmy,joint,jones,judge,known,label,large,laser,later,laugh,layer,learn,lease,least,leave,legal,level,light,limit,links,lives,local,logic,loose,lower,lucky,lunch,lying,magic,major,maker,march,maria,match,maybe,mayor,meant,media,metal,might,minor,minus,mixed,model,money,month,moral,motor,mount,mouse,mouth,move,movie,music,needs,never,newer,newly,night,noble,noise,north,noted,novel,nurse,nylon,occur,ocean,offer,often,order,other,ought,outer,ozone,panic,paper,party,peace,penny,phase,phone,photo,piece,pilot,pitch,place,plain,plane,plant,plate,point,pound,power,press,price,pride,prime,print,prior,prize,proof,proud,prove,proxy,pupil,queen,query,quest,queue,quick,quiet,quite,quote,radar,radio,raise,range,rapid,ratio,reach,ready,realm,rebel,refer,relax,reply,right,rigid,risk,rival,river,robin,roger,roman,rough,round,route,royal,rural,rules,saint,salad,sauce,save,scale,scene,scope,score,sense,serve,seven,shade,shake,shall,shame,shape,share,sharp,sheet,shelf,shell,shift,shirt,shock,shoot,short,shown,sight,silly,since,sixth,sixty,sized,skill,slave,sleep,slide,small,smart,smell,smile,smoke,solid,solve,sorry,sound,south,space,spare,speak,speed,spend,spent,split,spoke,sport,staff,stage,stake,stand,start,state,steam,steel,stick,still,stock,stone,stood,store,storm,story,strip,stuck,study,stuff,style,sugar,suite,sunny,super,sweet,table,taken,taste,taxes,teach,teeth,terry,texas,thank,theft,their,theme,there,these,thick,thing,think,third,those,three,threw,throw,tight,token,total,touch,tough,tower,track,trade,train,treat,trend,trial,tried,tries,truck,truly,trust,twice,under,undue,union,unity,until,upper,upset,urban,usage,usual,valid,value,video,virus,visit,vital,voice,waste,watch,water,weigh,wheel,where,which,while,white,whole,whose,woman,women,world,worry,worse,worst,worth,would,wound,write,wrong,wrote,yield,young,youth,zebra,zones".split(",");

type LetterState ="correct"|"present"|"absent"|"empty"|"tbd";

const evaluateGuess = (guess: string, solution: string): LetterState[] => {
 const res: LetterState[] = Array(5).fill("absent");
 const solArr = solution.split("");
 const gArr = guess.split("");
 const used = Array(5).fill(false);
 for (let i = 0; i < 5; i++) {
 if (gArr[i] === solArr[i]) { res[i] ="correct"; used[i] = true; gArr[i] =""; }
 }
 for (let i = 0; i < 5; i++) {
 if (gArr[i]) {
 const idx = solArr.findIndex((c, j) => c === gArr[i] && !used[j]);
 if (idx !== -1) { res[i] ="present"; used[idx] = true; }
 }
 }
 return res;
};

export function WordleClient() {
 const [solution, setSolution] = useState("");
 const [guesses, setGuesses] = useState<{ word: string; eval: LetterState[] }[]>([]);
 const [current, setCurrent] = useState("");
 const [gameOver, setGameOver] = useState(false);
 const [won, setWon] = useState(false);
 const [hardMode, setHardMode] = useState(false);
 const [stats, setStats] = useState({ played: 0, won: 0, streak: 0, max: 0, dist: [0,0,0,0,0,0] });
 const [showStats, setShowStats] = useState(false);

 const initGame = useCallback(() => {
 const sol = WORDS_5[Math.floor(Math.random() * WORDS_5.length)];
 setSolution(sol);
 setGuesses([]);
 setCurrent("");
 setGameOver(false);
 setWon(false);
 }, []);

 useEffect(() => { initGame(); }, [initGame]);

 useEffect(() => {
 const saved = localStorage.getItem("wordle_stats");
 if (saved) setStats(JSON.parse(saved));
 }, []);

 useEffect(() => {
 localStorage.setItem("wordle_stats", JSON.stringify(stats));
 }, [stats]);

 const submitGuess = useCallback(() => {
 if (current.length !== 5) return toast.error("Word must be 5 letters!");
 
 if (hardMode) {
 for (const g of guesses) {
 for (let i = 0; i < 5; i++) {
 if (g.eval[i] ==="correct"&& current[i] !== g.word[i]) return toast.error(`Hard Mode: Letter ${g.word[i]} must be in position ${i+1}`);
 if (g.eval[i] ==="present"&& !current.includes(g.word[i])) return toast.error(`Hard Mode: Must include letter ${g.word[i]}`);
 }
 }
 }

 const evalRes = evaluateGuess(current, solution);
 const newGuesses = [...guesses, { word: current, eval: evalRes }];
 setGuesses(newGuesses);
 setCurrent("");

 if (current === solution) {
 setWon(true); setGameOver(true);
 const newStats = { ...stats, played: stats.played + 1, won: stats.won + 1, streak: stats.streak + 1, max: Math.max(stats.max, stats.streak + 1), dist: [...stats.dist] };
 newStats.dist[newGuesses.length - 1]++;
 setStats(newStats);
 setTimeout(() => setShowStats(true), 1500);
 } else if (newGuesses.length >= 6) {
 setGameOver(true);
 const newStats = { ...stats, played: stats.played + 1, streak: 0, dist: [...stats.dist] };
 setStats(newStats);
 setTimeout(() => setShowStats(true), 1500);
 }
 }, [current, solution, guesses, hardMode, stats]);

 useEffect(() => {
 const handler = (e: KeyboardEvent) => {
 if (gameOver || showStats) return;
 if (e.key ==="Enter") submitGuess();
 else if (e.key ==="Backspace") setCurrent(g => g.slice(0, -1));
 else if (/^[a-zA-Z]$/.test(e.key) && current.length < 5) setCurrent(g => g + e.key.toLowerCase());
 };
 window.addEventListener("keydown", handler);
 return () => window.removeEventListener("keydown", handler);
 }, [current, gameOver, submitGuess, showStats]);

 const keyStates = useMemo(() => {
 const states: Record<string, LetterState> = {};
 for (const g of guesses) {
 for (let i = 0; i < 5; i++) {
 const letter = g.word[i];
 const state = g.eval[i];
 if (!states[letter] || state ==="correct"|| (state ==="present"&& states[letter] !=="correct")) {
 states[letter] = state;
 }
 }
 }
 return states;
 }, [guesses]);

 const shareResults = () => {
 const grid = guesses.map(g => g.eval.map(e => e ==="correct"?"🟩": e ==="present"?"🟨":"⬛").join("")).join("\n");
 const text = `Wordle ${won ? guesses.length :"X"}/6\n\n${grid}`;
 navigator.clipboard.writeText(text);
 toast.success("Results copied to clipboard!");
 };

 const renderGrid = () => {
 const rows = [];
 for (let i = 0; i < 6; i++) {
 const guess = guesses[i];
 const isCurrent = i === guesses.length && !gameOver;
 rows.push(
 <div key={i} className="flex gap-1.5 justify-center">
 {Array(5).fill(0).map((_, j) => {
 let letter ="";
 let state: LetterState ="empty";
 let border ="border-border";
 let bg ="bg-transparent";
 let text ="text-foreground";

 if (guess) {
 letter = guess.word[j];
 state = guess.eval[j];
 if (state ==="correct") { bg ="bg-green-600"; text ="text-white"; border ="border-green-600"; }
 else if (state ==="present") { bg ="bg-yellow-500"; text ="text-white"; border ="border-yellow-500"; }
 else { bg ="bg-zinc-500"; text ="text-white"; border ="border-zinc-500"; }
 } else if (isCurrent && current[j]) {
 letter = current[j];
 state ="tbd";
 border ="border-foreground";
 }
 
 return (
 <div key={j} className={`w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center text-2xl font-bold border-2 ${border} ${bg} ${text} transition-all duration-300`}>
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray="4 2"
        className="absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
      />

 {letter.toUpperCase()}
 </div>
 );
 })}
 </div>
 );
 }
 return rows;
 };

 const renderKeyboard = () => {
 const rows = ["qwertyuiop","asdfghjkl","zxcvbnm"];
 return (
 <div className="flex flex-col gap-1.5 mt-6">
 {rows.map((row, i) => (
 <div key={i} className="flex justify-center gap-1">
 {i === 2 && <Button variant="outline"size="sm"className="px-2 text-xs"onClick={() => setCurrent("")}>Enter</Button>}
 {row.split("").map(k => {
 const state = keyStates[k];
 let bg ="bg-muted";
 let text ="text-foreground";
 if (state ==="correct") { bg ="bg-green-600"; text ="text-white"; }
 else if (state ==="present") { bg ="bg-yellow-500"; text ="text-white"; }
 else if (state ==="absent") { bg ="bg-zinc-700"; text ="text-zinc-400"; }
 return <Button key={k} variant="outline"size="sm"className={`${bg} ${text} border-none min-w-[2rem] px-2`} onClick={() => current.length < 5 && setCurrent(c => c + k)}>{k.toUpperCase()}</Button>;
 })}
 {i === 2 && <Button variant="outline"size="sm"className="px-2 text-xs"onClick={() => setCurrent(c => c.slice(0, -1))}>Del</Button>}
 </div>
 ))}
 </div>
 );
 };

 return (
 <div className="max-w-6xl mx-auto space-y-8">
 <ToolPageHeader icon={Trophy} title="Wordle Clone"description="Play the classic 5-letter word guessing game entirely offline in your browser."/>
 
 <GlassCard>
 <CardHeader className={headerClass}>
 <div className="flex justify-between items-center w-full">
 <CardTitle className={titleClass}><Keyboard className="w-4 h-4"/> Daily Puzzle</CardTitle>
 <div className="flex gap-2 items-center">
 <Label className="flex items-center gap-2 cursor-pointer text-xs">
 <input type="checkbox"checked={hardMode} onChange={e => setHardMode(e.target.checked)} className="rounded"/> Hard Mode
 </Label>
 <Button size="sm"variant="ghost"onClick={initGame}><RotateCcw className="w-4 h-4"/></Button>
 <Button size="sm"variant="ghost"onClick={() => setShowStats(true)}><Trophy className="w-4 h-4"/></Button>
 </div>
 </div>
 </CardHeader>
 <CardContent className="p-6 flex flex-col items-center">
 <div className="flex flex-col gap-1.5">{renderGrid()}</div>
 {renderKeyboard()}
 </CardContent>
 </GlassCard>

 {showStats && (
 <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"onClick={() => setShowStats(false)}>
 <Card className="max-w-sm w-full bg-background p-6 space-y-4"onClick={e => e.stopPropagation()}>
 <CardTitle className="text-center text-2xl">{won ?"Magnificent!":"The word was:"+ solution.toUpperCase()}</CardTitle>
 <div className="grid grid-cols-4 gap-4 text-center">
 <div><div className="text-3xl font-bold">{stats.played}</div><div className="text-xs text-muted-foreground">Played</div></div>
 <div><div className="text-3xl font-bold">{stats.played ? Math.round((stats.won / stats.played) * 100) : 0}</div><div className="text-xs text-muted-foreground">Win %</div></div>
 <div><div className="text-3xl font-bold">{stats.streak}</div><div className="text-xs text-muted-foreground">Streak</div></div>
 <div><div className="text-3xl font-bold">{stats.max}</div><div className="text-xs text-muted-foreground">Max</div></div>
 </div>
 <div className="space-y-1">
 {stats.dist.map((count, i) => (
 <div key={i} className="flex items-center gap-2 text-xs">
 <span className="w-4 text-right">{i + 1}</span>
 <div className="flex-1 bg-muted rounded-sm h-5 flex items-center justify-end px-2 text-white font-bold"style={{ width: `${Math.max(10, (count / Math.max(...stats.dist, 1)) * 100)}%`, backgroundColor: won && guesses.length === i + 1 ?"#16a34a":"#6b7280"}}>{count}</div>
 </div>
 ))}
 </div>
 <div className="flex gap-2">
 <Button className="flex-1"onClick={shareResults}><Share2 className="w-4 h-4 mr-2"/> Share</Button>
 <Button className="flex-1"variant="outline"onClick={() => { setShowStats(false); initGame(); }}>Next</Button>
 </div>
 </Card>
 </div>
 )}

 <ToolHowItWorks steps={[
 { step:"01", title:"Make a Guess", description:"Type any 5-letter word and press Enter to submit your guess.", icon: Keyboard },
 { step:"02", title:"Analyze Feedback", description:"Green means correct spot, Yellow means wrong spot, Gray means not in word.", icon: Trophy },
 { step:"03", title:"Solve the Puzzle", description:"Use the color clues to deduce the hidden word within 6 attempts.", icon: Share2 }
 ]} badges={["100% Offline","No Ads","Hard Mode"]} />

 <ToolFeatureGuides features={[
 { icon: Keyboard, title:"Physical Keyboard", description:"Seamlessly type using your computer keyboard for a native app feel."},
 { icon: Trophy, title:"Statistics Tracking", description:"Track your win percentage, streaks, and guess distribution locally."},
 { icon: Settings, title:"Hard Mode", description:"Force yourself to use revealed hints in subsequent guesses."},
 { icon: Share2, title:"Shareable Results", description:"Generate an emoji grid of your performance to share with friends."}
 ]}>
 <div className="prose dark:prose-invert max-w-none mt-6">
 <h3>The Ultimate Browser-Based Word Puzzle</h3>
 <p>Wordle has taken the world by storm, combining vocabulary testing with deductive logic in a beautifully simple package. Our Toolzium Wordle Clone brings this exact experience directly to your browser without requiring any downloads, accounts, or daily limits. Because it runs entirely client-side, your statistics and streaks are stored securely in your browser's local storage, ensuring complete privacy.</p>
 <p>The game relies on a sophisticated feedback mechanism. When you submit a guess, the algorithm evaluates each letter against the secret solution. A green tile indicates an exact match in both letter and position. A yellow tile signifies that the letter exists in the target word but is currently placed incorrectly. A gray tile confirms that the letter does not appear anywhere in the solution. This iterative feedback loop forces players to think critically about letter frequency, common English digraphs, and vowel placement.</p>
 <p>For seasoned veterans, the integrated Hard Mode adds a rigorous layer of complexity. When activated, any hints revealed in previous guesses <em>must</em> be utilized in all subsequent guesses. If you uncover a green 'T', every future guess must feature a 'T' in that exact position. If you find a yellow 'R', it must be included somewhere in the word. This prevents players from using \"burner words\"to eliminate letters and demands genuine deductive reasoning. Whether you are looking to expand your vocabulary or simply kill five minutes during a coffee break, this offline Wordle clone provides a flawless, responsive, and deeply engaging puzzle experience.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion faqs={[
 { question:"Is my streak saved if I close the browser?", answer:"Yes! Your statistics, including games played, win percentage, and current streak, are saved in your browser's local storage. As long as you don't clear your cache, your progress is safe."},
 { question:"What is Hard Mode?", answer:"Hard Mode requires that any revealed hints (green or yellow letters) must be used in all subsequent guesses. You cannot play elimination words that ignore previous clues."},
 { question:"Can I play more than once a day?", answer:"Absolutely. Unlike the official daily version, this clone allows you to play unlimited games. Simply click the refresh icon to start a new puzzle instantly."}
 ]} />

 <RelatedTools currentToolUrl="/tools/fun/wordle" max={6} />
 </div>
 );
}

export default WordleClient;
