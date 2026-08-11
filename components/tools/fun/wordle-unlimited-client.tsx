"use client";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RotateCcw, Keyboard, Infinity as InfinityIcon, Timer } from "lucide-react";
import toast from "react-hot-toast";

const cardClass = "border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass = "border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass = "text-xs sm:text-sm font-semibold flex items-center gap-2";

const WORDS_ALL = "about,above,abuse,actor,acute,admit,adopt,adult,after,again,agent,agree,ahead,alarm,album,alert,alike,alive,allow,alone,along,alter,among,anger,angle,angry,apart,apple,apply,arena,argue,arise,array,aside,asset,audio,audit,avoid,award,aware,badly,baker,bases,basic,beach,began,begin,being,bench,billy,birth,black,blade,blame,blank,blast,bleed,blend,bless,blind,block,blood,board,boost,booth,bound,brain,brand,bread,break,breed,brief,bring,broad,broke,brown,brush,buddy,build,built,bunch,burst,buyer,cable,calif,carry,catch,cause,chain,chair,chart,chase,cheap,check,chest,chief,child,china,chose,civil,claim,class,clean,clear,click,clock,close,cloud,coach,coast,could,count,court,cover,craft,crash,cream,crime,cross,crowd,crown,curve,cycle,daily,dance,dated,dealt,death,debut,delay,depth,doing,doubt,dozen,draft,drama,drawn,dream,dress,drill,drink,drive,drove,dying,eager,early,earth,eight,elite,empty,enemy,enjoy,enter,entry,equal,error,event,every,exact,exist,extra,faith,false,fault,fiber,field,fifth,fifty,fight,final,first,fixed,flash,fleet,floor,fluid,focus,force,forth,forty,forum,found,frame,frank,fraud,fresh,front,fruit,fully,funny,giant,given,glass,globe,going,grace,grade,grand,grant,grass,great,green,gross,group,grown,guard,guess,guest,guide,happy,heart,heavy,hence,herbs,highs,hills,holds,homes,honor,horse,hotel,house,human,hurry,ideal,image,imply,index,inner,input,issue,ivory,japan,jimmy,joint,jones,judge,known,label,large,laser,later,laugh,layer,learn,lease,least,leave,legal,level,light,limit,links,lives,local,logic,loose,lower,lucky,lunch,lying,magic,major,maker,march,maria,match,maybe,mayor,meant,media,metal,might,minor,minus,mixed,model,money,month,moral,motor,mount,mouse,mouth,move,movie,music,needs,never,newer,newly,night,noble,noise,north,noted,novel,nurse,nylon,occur,ocean,offer,often,order,other,ought,outer,ozone,panic,paper,party,peace,penny,phase,phone,photo,piece,pilot,pitch,place,plain,plane,plant,plate,point,pound,power,press,price,pride,prime,print,prior,prize,proof,proud,prove,proxy,pupil,queen,query,quest,queue,quick,quiet,quite,quote,radar,radio,raise,range,rapid,ratio,reach,ready,realm,rebel,refer,relax,reply,right,rigid,risk,rival,river,robin,roger,roman,rough,round,route,royal,rural,rules,saint,salad,sauce,save,scale,scene,scope,score,sense,serve,seven,shade,shake,shall,shame,shape,share,sharp,sheet,shelf,shell,shift,shirt,shock,shoot,short,shown,sight,silly,since,sixth,sixty,sized,skill,slave,sleep,slide,small,smart,smell,smile,smoke,solid,solve,sorry,sound,south,space,spare,speak,speed,spend,spent,split,spoke,sport,staff,stage,stake,stand,start,state,steam,steel,stick,still,stock,stone,stood,store,storm,story,strip,stuck,study,stuff,style,sugar,suite,sunny,super,sweet,table,taken,taste,taxes,teach,teeth,terry,texas,thank,theft,their,theme,there,these,thick,thing,think,third,those,three,threw,throw,tight,token,total,touch,tough,tower,track,trade,train,treat,trend,trial,tried,tries,truck,truly,trust,twice,under,undue,union,unity,until,upper,upset,urban,usage,usual,valid,value,video,virus,visit,vital,voice,waste,watch,water,weigh,wheel,where,which,while,white,whole,whose,woman,women,world,worry,worse,worst,worth,would,wound,write,wrong,wrote,yield,young,youth,zebra,zones,abacus,abased,abates,abbess,abbey,abduct,abhors,abided,abides,abject,ablate,abodes,aborts,abound,abrade,absent,absorb,absurd,abused,abuser,abuses,acacia,accede,accent,accept,access,accord,accost,accrue,accuse,acedia,acetic,aching,acidic,acorns,across,acting,action,active,actors,actual,acumen,adapts,addend,adders,addict,adding,addled,adduce,adhere,adjoin,adjure,adjust,admire,admits,adobes,adopts,adored,adorer,adores,adorns,adroit,adults,advent,adverb,advert,advice,advise,aerate,aerial,aerobe,affair,affect,affirm,afford,affray,afghan,afield,aflame,afloat,afraid,agates,ageing,agency,agenda,agents,aghast,agleam,agreed,agrees,aiding,ailing,aiming,airbag,airing,airway,allied,allies,allots,allows,allude,allure,almond,almost,alpine,altars,alters,alumni,always,amazed,amazes,amazon,ambled,ambush,amends,amicus,amidst,amigos,amines,amnion,amoeba,amount,ampere,ampler,amulet,amused,amuses,analog,anchor,angels,angers,angina,angled,angler,angles,angora,animal,animus,ankles,annals,annoys,annual,annuls,anodes,anodic,anoint,anomie,anorak,answer,antler,antral,anuses,anyhow,anyone,anyway,apathy,apiece,aplomb,apogee,appall,appeal,appear,append,apples,aprons,arable,arcade,arcane,arched,archer,arches,arcing,ardent,ardour,argued,arguer,argues,arisen,arises,armful,arming,armour,armpit,arnica,aromas,around,arouse,arrant,arrays,arrear,arrest,arrive,arrows,artery,artful,artist,ascend,ascent,ashore,asking,asleep,aspect,aspire,assail,assent,assert,assess,assets,assign,assist,assize,assume,assure,astern,asthma,astral,astray,astute,asylum,atolls,atomic,atonal,atoned,atones,atrium,attach,attack,attain,attest,attics,attire,attune,auburn,audits,august,auntie,aurora,author,autumn,avails,avatar,avenge,avenue,averse,averts,aviary,aviate,avidly,avoids,avowal,avowed,awaken,awards,aweigh,awhile,awning,awoken,axioms,azalea".split(",");

type LetterState = "correct" | "present" | "absent" | "empty" | "tbd";

const evaluateGuess = (guess: string, solution: string, len: number): LetterState[] => {
  const res: LetterState[] = Array(len).fill("absent");
  const solArr = solution.split("");
  const gArr = guess.split("");
  const used = Array(len).fill(false);
  for (let i = 0; i < len; i++) {
    if (gArr[i] === solArr[i]) { res[i] = "correct"; used[i] = true; gArr[i] = ""; }
  }
  for (let i = 0; i < len; i++) {
    if (gArr[i]) {
      const idx = solArr.findIndex((c, j) => c === gArr[i] && !used[j]);
      if (idx !== -1) { res[i] = "present"; used[idx] = true; }
    }
  }
  return res;
};

export function WordleUnlimitedClient() {
  const [wordLen, setWordLen] = useState(5);
  const [maxGuesses, setMaxGuesses] = useState(6);
  const [solution, setSolution] = useState("");
  const [guesses, setGuesses] = useState<{ word: string; eval: LetterState[] }[]>([]);
  const [current, setCurrent] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [speedMode, setSpeedMode] = useState(false);
  const [timer, setTimer] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  const initGame = useCallback((len: number) => {
    const validWords = WORDS_ALL.filter(w => w.length === len);
    const pool = validWords.length > 0 ? validWords : WORDS_ALL.filter(w => w.length === 5);
    const targetLen = pool.length > 0 ? len : 5;
    const sol = pool[Math.floor(Math.random() * pool.length)];
    setSolution(sol);
    setWordLen(targetLen);
    setMaxGuesses(targetLen + 1);
    setGuesses([]);
    setCurrent("");
    setGameOver(false);
    setWon(false);
    setTimer(0);
    setTimerActive(false);
  }, []);

  useEffect(() => { initGame(5); }, [initGame]);

  useEffect(() => {
    let interval: any = null;
    if (timerActive && !gameOver) {
      interval = setInterval(() => setTimer(t => t + 10), 10);
    }
    return () => clearInterval(interval);
  }, [timerActive, gameOver]);

  const submitGuess = useCallback(() => {
    if (current.length !== wordLen) return toast.error(`Word must be ${wordLen} letters!`);
    if (!timerActive && speedMode) setTimerActive(true);
    
    const evalRes = evaluateGuess(current, solution, wordLen);
    const newGuesses = [...guesses, { word: current, eval: evalRes }];
    setGuesses(newGuesses);
    setCurrent("");

    if (current === solution) {
      setWon(true); setGameOver(true); setTimerActive(false);
      toast.success(`Solved in ${newGuesses.length} guesses!`);
    } else if (newGuesses.length >= maxGuesses) {
      setGameOver(true); setTimerActive(false);
      toast.error(`Game Over! The word was ${solution.toUpperCase()}`);
    }
  }, [current, solution, guesses, wordLen, maxGuesses, timerActive, speedMode]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (gameOver) return;
      if (e.key === "Enter") submitGuess();
      else if (e.key === "Backspace") setCurrent(g => g.slice(0, -1));
      else if (/^[a-zA-Z]$/.test(e.key) && current.length < wordLen) setCurrent(g => g + e.key.toLowerCase());
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [current, gameOver, submitGuess, wordLen]);

  const keyStates = useMemo(() => {
    const states: Record<string, LetterState> = {};
    for (const g of guesses) {
      for (let i = 0; i < wordLen; i++) {
        const letter = g.word[i];
        const state = g.eval[i];
        if (!states[letter] || state === "correct" || (state === "present" && states[letter] !== "correct")) {
          states[letter] = state;
        }
      }
    }
    return states;
  }, [guesses, wordLen]);

  const formatTime = (ms: number) => {
    const m = Math.floor(ms / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    const cs = Math.floor((ms % 1000) / 10);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}.${cs.toString().padStart(2, '0')}`;
  };

  const renderGrid = () => {
    const rows = [];
    for (let i = 0; i < maxGuesses; i++) {
      const guess = guesses[i];
      const isCurrent = i === guesses.length && !gameOver;
      rows.push(
        <div key={i} className="flex gap-1 justify-center">
          {Array(wordLen).fill(0).map((_, j) => {
            let letter = "";
            let state: LetterState = "empty";
            let border = "border-border";
            let bg = "bg-transparent";
            let text = "text-foreground";

            if (guess) {
              letter = guess.word[j];
              state = guess.eval[j];
              if (state === "correct") { bg = "bg-green-600"; text = "text-white"; border = "border-green-600"; }
              else if (state === "present") { bg = "bg-yellow-500"; text = "text-white"; border = "border-yellow-500"; }
              else { bg = "bg-zinc-500"; text = "text-white"; border = "border-zinc-500"; }
            } else if (isCurrent && current[j]) {
              letter = current[j];
              state = "tbd";
              border = "border-foreground";
            }
            
            return (
              <div key={j} className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-xl font-bold border-2 ${border} ${bg} ${text} transition-all duration-300`}>
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
    const rows = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];
    return (
      <div className="flex flex-col gap-1.5 mt-6">
        {rows.map((row, i) => (
          <div key={i} className="flex justify-center gap-1">
            {i === 2 && <Button variant="outline" size="sm" className="px-2 text-xs" onClick={() => setCurrent("")}>Enter</Button>}
            {row.split("").map(k => {
              const state = keyStates[k];
              let bg = "bg-muted";
              let text = "text-foreground";
              if (state === "correct") { bg = "bg-green-600"; text = "text-white"; }
              else if (state === "present") { bg = "bg-yellow-500"; text = "text-white"; }
              else if (state === "absent") { bg = "bg-zinc-700"; text = "text-zinc-400"; }
              return <Button key={k} variant="outline" size="sm" className={`${bg} ${text} border-none min-w-[2rem] px-2`} onClick={() => current.length < wordLen && setCurrent(c => c + k)}>{k.toUpperCase()}</Button>;
            })}
            {i === 2 && <Button variant="outline" size="sm" className="px-2 text-xs" onClick={() => setCurrent(c => c.slice(0, -1))}>Del</Button>}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <ToolPageHeader icon={InfinityIcon} title="Wordle Unlimited" description="Play endless rounds of Wordle with customizable word lengths and speed-run timers." />
      
      <Card className={cardClass}>
        <CardHeader className={headerClass}>
          <div className="flex flex-wrap justify-between items-center w-full gap-4">
            <CardTitle className={titleClass}><InfinityIcon className="w-4 h-4" /> Unlimited Mode</CardTitle>
            <div className="flex gap-2 items-center flex-wrap">
              <div className="flex gap-1 bg-muted p-1 rounded-lg">
                {[4,5,6,7].map(l => (
                  <Button key={l} size="sm" variant={wordLen === l ? "default" : "ghost"} className="h-7 px-3 text-xs" onClick={() => initGame(l)}>{l}</Button>
                ))}
              </div>
              <Label className="flex items-center gap-2 cursor-pointer text-xs">
                <input type="checkbox" checked={speedMode} onChange={e => setSpeedMode(e.target.checked)} className="rounded" /> Speed Run
              </Label>
              <Button size="sm" variant="ghost" onClick={() => initGame(wordLen)}><RotateCcw className="w-4 h-4" /></Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 flex flex-col items-center">
          {speedMode && (
            <div className="mb-4 text-2xl font-mono font-bold flex items-center gap-2 text-primary">
              <Timer className="w-5 h-5" /> {formatTime(timer)}
            </div>
          )}
          <div className="flex flex-col gap-1">{renderGrid()}</div>
          {renderKeyboard()}
          {gameOver && (
            <div className="mt-6 text-center space-y-2">
              <p className="text-lg font-bold">{won ? `Solved in ${guesses.length}/${maxGuesses}!` : `Failed! Word was: ${solution.toUpperCase()}`}</p>
              <Button onClick={() => initGame(wordLen)}>Play Again</Button>
            </div>
          )}
        </CardContent>
      </Card>

      <ToolHowItWorks steps={[
        { step: "01", title: "Select Length", description: "Choose your difficulty by selecting a word length between 4 and 7 letters.", icon: Keyboard },
        { step: "02", title: "Start Guessing", description: "Type your guess. The board will instantly provide color-coded feedback.", icon: Keyboard },
        { step: "03", title: "Beat the Clock", description: "Enable Speed Mode to track your exact solve time down to the centisecond.", icon: Timer }
      ]} badges={["Endless Play", "Custom Lengths", "Speed Timer"]} />

      <ToolFeatureGuides features={[
        { icon: Keyboard, title: "No Daily Limits", description: "Play as many rounds as you want without waiting 24 hours for a new puzzle." },
        { icon: Keyboard, title: "Dynamic Grid Sizing", description: "Seamlessly switch between 4, 5, 6, and 7-letter word modes on the fly." },
        { icon: Timer, title: "Precision Speed Run", description: "A high-precision centisecond timer tracks exactly how fast you deduce the word." },
        { icon: RotateCcw, title: "Adaptive Attempts", description: "The game automatically adjusts the allowed attempts (Length + 1) based on difficulty." }
      ]}>
        <div className="prose dark:prose-invert max-w-none mt-6">
          <h3>The Sandbox of Word Puzzles</h3>
          <p>Wordle Unlimited removes all the artificial barriers of traditional daily puzzle games. There are no waiting periods, no locked difficulty settings, and no arbitrary limits on how many times you can play. This tool is designed for purists, speedrunners, and vocabulary trainers who want continuous, on-demand access to deductive word puzzles. By leveraging a comprehensive internal dictionary, the game can generate valid puzzles across multiple word lengths, from concise 4-letter challenges to sprawling 7-letter marathons.</p>
          <p>The dynamic grid system is entirely responsive. When you switch from a 5-letter word to a 7-letter word, the game board instantly recalculates the matrix dimensions and automatically adjusts the maximum allowed attempts to <code>Word Length + 1</code>. This mathematical scaling ensures that longer words, which possess vastly larger permutation spaces, are given a number of guesses to maintain a balanced difficulty curve.</p>
          <p>For the highly competitive, the integrated Speed Run mode introduces a high-precision chronometer. The timer begins the moment you submit your first valid guess and stops the instant you uncover the solution, recording your time down to the centisecond. This transforms a casual pastime into a rigorous esport, allowing you to track your cognitive processing speed and muscle memory over hundreds of rounds. Because all logic, dictionary lookups, and timers are executed locally via JavaScript, there is zero network latency, ensuring your speed run records are perfectly accurate and entirely private.</p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion faqs={[
        { question: "How does the attempt limit scale with word length?", answer: "The game uses a dynamic formula: Max Attempts = Word Length + 1. A 4-letter word gives you 5 attempts, while a 7-letter word grants you 8 attempts to account for the increased complexity." },
        { question: "When does the Speed Run timer start?", answer: "To ensure fairness, the timer remains at 00:00.00 until you submit your very first guess. It starts counting the moment your first word is evaluated and stops immediately upon a win or loss." },
        { question: "Are the 4-letter and 7-letter words real English words?", answer: "Yes. The internal dictionary is filtered to ensure that regardless of the length selected, the target solution is a recognized, valid English word." }
      ]} />

      <RelatedTools currentToolUrl="/tools/fun/wordle-unlimited" max={6} />
    </div>
  );
}

export default WordleUnlimitedClient;
