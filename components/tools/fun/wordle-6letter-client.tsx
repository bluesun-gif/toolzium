"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState, useMemo, useCallback, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Label } from"@/components/ui/label";
import { RotateCcw, Trophy, Share2, Keyboard, Hexagon } from"lucide-react";
import toast from"react-hot-toast";
import { GridPattern } from"@/components/magicui/grid-pattern";
import { GlassCard } from"@/components/ui/glass-card";

const cardClass ="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass ="border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass ="text-xs sm:text-sm font-semibold flex items-center gap-2";

const WORDS_6 ="abacus,abased,abates,abbess,abbey,abduct,abhors,abided,abides,abject,ablate,abodes,aborts,abound,abrade,absent,absorb,absurd,abused,abuser,abuses,acacia,accede,accent,accept,access,accord,accost,accrue,accuse,acedia,acetic,aching,acidic,acorns,across,acting,action,active,actors,actual,acumen,adapts,addend,adders,addict,adding,addled,adduce,adhere,adjoin,adjure,adjust,admire,admits,adobes,adopts,adored,adorer,adores,adorns,adroit,adults,advent,adverb,advert,advice,advise,aerate,aerial,aerobe,affair,affect,affirm,afford,affray,afghan,afield,aflame,afloat,afraid,agates,ageing,agency,agenda,agents,aghast,agleam,agreed,agrees,aiding,ailing,aiming,airbag,airing,airway,aisles,akimbo,alarms,albeit,albino,albums,alcove,alerts,alibis,aliens,alight,aligns,allege,alleys,allied,allies,allots,allows,allude,allure,almond,almost,alpine,altars,alters,alumni,always,amazed,amazes,amazon,ambled,ambush,amends,amicus,amidst,amigos,amines,amnion,amoeba,amount,ampere,ampler,amulet,amused,amuses,analog,anchor,angels,angers,angina,angled,angler,angles,angora,animal,animus,ankles,annals,annoys,annual,annuls,anodes,anodic,anoint,anomie,anorak,answer,antler,antral,anuses,anyhow,anyone,anyway,apathy,apiece,aplomb,apogee,appall,appeal,appear,append,apples,aprons,arable,arcade,arcane,arched,archer,arches,arcing,ardent,ardour,argued,arguer,argues,arisen,arises,armful,arming,armour,armpit,arnica,aromas,around,arouse,arrant,arrays,arrear,arrest,arrive,arrows,artery,artful,artist,ascend,ascent,ashore,asking,asleep,aspect,aspire,assail,assent,assert,assess,assets,assign,assist,assize,assume,assure,astern,assembly,asthma,astral,astray,astute,asylum,atolls,atomic,atonal,atoned,atones,atrium,attach,attack,attain,attest,attics,attire,attune,auburn,audits,august,auntie,aurora,author,autumn,avails,avatar,avenge,avenue,averse,averts,aviary,aviate,avidly,avoids,avowal,avowed,awaken,awards,aweigh,awhile,awning,awoken,axioms,azalea,babies,backer,backup,baffle,bagged,baited,bakers,bakery,baking,balcony,baldly,baling,ballad,balled,ballot,bamboo,banana,banded,bandit,banged,bangle,banker,banned,banter,barbed,barber,barely,baring,barley,barman,barred,barrel,barren,barrow,bartend,barton,baryon,basalt,bashed,bashes,basics,basing,basket,basses,basted,bastes,bathed,bather,bathes,batiks,bating,batted,batten,batter,bauble,bawled,bazaar,beacon,beaded,beadle,beaker,beamed,beanie,beards,bearer,beasts,beaten,beater,beauts,beauty,beaver,became,beckon,become,bedbug,bedded,bedlam,bedpan,beetle,befall,befell,befits,before,begged,begins,behalf,behave,behead,beheld,behest,behold,beings,belays,belief,belong,belove,bemoan,bemuse,bender,benign,bereft,berlin,berths,besets,beside,bestir,bestow,betide,betray,better,bewail,beware,beyond,bibles,biceps,bicker,bidden,bidder,biding,bigamy,bigger,bigwig,bikers,biking,bikini,bilges,billed,billet,binion,biopsy,biotic,bipeds,birdie,bistro,bitten,bitter,blades,blamed,blames,blandly,blanks,blasts,blazed,blazer,blazes,blazon,bleach,bleary,bleats,bleeds,blends,blight,blinds,blinks,blithe,blooms,bloopy,blossom,blotch,blouse,blower,bluest,bluffs,bluing,blunts,blurts,boards,boasts,boated,boater,bobbed,bodega,bodily,boding,bogged,boiled,boiler,bolero,bolster,bombay,bombed,bomber,bonded,bonier,bonnet,boogie,booked,bookie,boomer,boosts,booted,bootie,boozed,boozer,boozes,bopped,border,boring,borrow,bosoms,bosses,botany,bother,bottle,bottom,bought,bounce,bouncy,bounds,bounty,bouton,bovine,bowels,bowled,bowler,bowing,boxcar,boxers,boxing,braced,braces,braked,brakes,branch,brands,brandy,brassy,braved,braver,braves,brawls,brawny,breast,breath,breech,breeds,breeze,breezy,breves,brevet,brewed,brewer,briars,bribed,bribes,bridal,bridge,bridle,briefs,bright,brings,brinks,brisker,brisket,briton,broads,brogue,broils,broken,brooks,brooms,broths,browns,bruise,brunch,brutal,bubble,bubbly,bucket,buckle,budget,buffed,buffer,buffet,bugged,bugler,bugles,builds,bulges,bulked,bulged,bulges,bullet,bumble,bumped,bumper,bundle,bungle,bunion,bunked,bunker,bunkum,buoyed,burden,bureau,burger,burial,buried,buries,burned,burner,burped,burred,burrow,bursts,burton,bushed,bushel,bushes,busier,busily,busing,bustle,butane,butler,butted,butter,buttes,button,buyers,buying,buyout,buzzer,bygone,bylaws,bypass,cabins,cabled,cables,cached,caches,cackle,cactus,caddie,cadets,caftan,caging,caiman,cairns,cajole,calico,called,caller,callow,calmed,calmer,calmly,calves,camels,camera,campers,camping,campus,canals,canary,cancel,cancer,candid,candle,candor,canine,caning,canker,cannon,cannot,canoed,canoes,canopy,canted,canter,canton,canyon,capers,capons,capped,captor,carats,carbon,carboy,career,caress,carets,carina,caring,carnal,carnet,carols,carped,carpel,carpet,carrot,carted,carton,cartoon,carved,carver,carves,casein,cashed,cashes,cashew,casing,casket,casted,castle,castor,casual,catchy,caters,catgut,cation,catkin,catnip,caucus,caudal,caught,causal,causes,caveat,cavern,caviar,cavils,cavity,ceased,ceases,cedars,ceding,cellar,cellos,cement,censor,census,center,centre,ceramic,cereal,cereus,cerise,cervix,chains,chairs,chalet,champs,chance,chancy,change,chants,chapel,charms,charts,chased,chaser,chases,chasms,cheats,checks,cheeks,cheeky,cheers,cheery,cheese,cheesy,cheque,cherry,cherub,chesty,chiefs,chills,chilly,chimes,chimps,chinas,chinks,chinos,chirps,chirpy,choice,choirs,choked,choker,chokes,choose,choosy,chopin,choppy,choral,chords,chosen,chroma,chrome,chunky,church,cinema,cipher,circle,circus,cities,citing,citrus,claims,clammy,clamps,clangs,classy,clause,clergy,cleric,clerks,clever,clicks,client,cliffs,clinic,clique,cloaks,clocks,clones,closed,closer,closes,closet,cloths,clouds,cloudy,clover,cloves,clowns,clozes,clumps,clumsy,clutch,coarse,coasts,coated,cobalt,cobble,cobras,cobweb,cocoon,coddle,coders,coding,coerce,coffee,coffin,cogent,cohere,cohort,coiled,coined,coital,colony,colors,column,combos,comedy,comets,comics,coming,commit,common,compel,comply,concur,condom,condor,confer,convey,cookie,cooler,coolly,cooped,copied,copier,copies,coping,copper,copter,corals,cordon,corner,cornet,corona,corral,corset,cortex,cosmic,cosmos,costly,cotton,couple,coupon,courts,cousin,covert,coward,coyote,crabby,cracks,cradle,crafts,crafty,cramps,cranes,cranky,crater,crates,cravat,craved,craven,craves,crawls,crawly,crayon,crazed,crazes,creaks,creaky,creams,creamy,crease,create,credit,creeds,creeks,creeps,creepy,creole,crests,cretin,cringe,crises,crisis,crisps,crispy,critic,croaks,croaky,crocks,crooks,crops,crores,crossly,crotch,crouch,crowds,crowed,crowns,cruddy,cruder,cruels,cruets,cruise,crumbs,crumby,crummy,crunch,crusty,crutch,cruxes,crying,crypto,cubism,cubist,cubits,cuckoo,cuddle,cuddly,cuffed,cupola,curdle,curing,curios,curled,curler,curlew,cursed,curses,curtail,curtain,curved,curves,custom,cycles,cyclic,cymbal,cynics,cystic".split(",");

type LetterState ="correct"|"present"|"absent"|"empty"|"tbd";

const evaluateGuess = (guess: string, solution: string): LetterState[] => {
 const res: LetterState[] = Array(6).fill("absent");
 const solArr = solution.split("");
 const gArr = guess.split("");
 const used = Array(6).fill(false);
 for (let i = 0; i < 6; i++) {
 if (gArr[i] === solArr[i]) { res[i] ="correct"; used[i] = true; gArr[i] =""; }
 }
 for (let i = 0; i < 6; i++) {
 if (gArr[i]) {
 const idx = solArr.findIndex((c, j) => c === gArr[i] && !used[j]);
 if (idx !== -1) { res[i] ="present"; used[idx] = true; }
 }
 }
 return res;
};

export function Wordle6LetterClient() {
 const [solution, setSolution] = useState("");
 const [guesses, setGuesses] = useState<{ word: string; eval: LetterState[] }[]>([]);
 const [current, setCurrent] = useState("");
 const [gameOver, setGameOver] = useState(false);
 const [won, setWon] = useState(false);
 const [hardMode, setHardMode] = useState(false);
 const [stats, setStats] = useState({ played: 0, won: 0, streak: 0, max: 0, dist: [0,0,0,0,0,0,0] });
 const [showStats, setShowStats] = useState(false);

 const initGame = useCallback(() => {
 const sol = WORDS_6[Math.floor(Math.random() * WORDS_6.length)];
 setSolution(sol);
 setGuesses([]);
 setCurrent("");
 setGameOver(false);
 setWon(false);
 }, []);

 useEffect(() => { initGame(); }, [initGame]);

 useEffect(() => {
 const saved = localStorage.getItem("wordle6_stats");
 if (saved) setStats(JSON.parse(saved));
 }, []);

 useEffect(() => {
 localStorage.setItem("wordle6_stats", JSON.stringify(stats));
 }, [stats]);

 const submitGuess = useCallback(() => {
 if (current.length !== 6) return toast.error("Word must be 6 letters!");
 
 if (hardMode) {
 for (const g of guesses) {
 for (let i = 0; i < 6; i++) {
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
 } else if (newGuesses.length >= 7) {
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
 else if (/^[a-zA-Z]$/.test(e.key) && current.length < 6) setCurrent(g => g + e.key.toLowerCase());
 };
 window.addEventListener("keydown", handler);
 return () => window.removeEventListener("keydown", handler);
 }, [current, gameOver, submitGuess, showStats]);

 const keyStates = useMemo(() => {
 const states: Record<string, LetterState> = {};
 for (const g of guesses) {
 for (let i = 0; i < 6; i++) {
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
 const text = `Wordle 6-Letter ${won ? guesses.length :"X"}/7\n\n${grid}`;
 navigator.clipboard.writeText(text);
 toast.success("Results copied!");
 };

 const renderGrid = () => {
 const rows = [];
 for (let i = 0; i < 7; i++) {
 const guess = guesses[i];
 const isCurrent = i === guesses.length && !gameOver;
 rows.push(
 <div key={i} className="flex gap-1 justify-center">
 {Array(6).fill(0).map((_, j) => {
 let letter ="";
 let state: LetterState ="empty";
 let border ="border-border";
 let bg ="bg-transparent";
 let text ="text-foreground";

 if (guess) {
 letter = guess.word[j];
 state = guess.eval[j];
 if (state ==="correct") { bg ="bg-blue-600"; text ="text-primary-foreground"; border ="border-blue-600"; }
 else if (state ==="present") { bg ="bg-orange-500"; text ="text-primary-foreground"; border ="border-orange-500"; }
 else { bg ="bg-zinc-500"; text ="text-primary-foreground"; border ="border-zinc-500"; }
 } else if (isCurrent && current[j]) {
 letter = current[j];
 state ="tbd";
 border ="border-foreground";
 }
 
 return (
 <div key={j} className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-xl font-bold border-2 ${border} ${bg} ${text} transition-all duration-300`}>
      <ToolBackground />

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
      <div className="relative flex flex-col gap-1.5 mt-6">
 {rows.map((row, i) => (
 <div key={i} className="flex justify-center gap-1">
 {i === 2 && <Button variant="outline"size="sm"className="px-2 text-xs"onClick={() => setCurrent("")}>Enter</Button>}
 {row.split("").map(k => {
 const state = keyStates[k];
 let bg ="bg-muted";
 let text ="text-foreground";
 if (state ==="correct") { bg ="bg-blue-600"; text ="text-primary-foreground"; }
 else if (state ==="present") { bg ="bg-orange-500"; text ="text-primary-foreground"; }
 else if (state ==="absent") { bg ="bg-zinc-700"; text ="text-zinc-400"; }
 return <Button key={k} variant="outline"size="sm"className={`${bg} ${text} border-none min-w-[2rem] px-2`} onClick={() => current.length < 6 && setCurrent(c => c + k)}>{k.toUpperCase()}</Button>;
 })}
 {i === 2 && <Button variant="outline"size="sm"className="px-2 text-xs"onClick={() => setCurrent(c => c.slice(0, -1))}>Del</Button>}
 </div>
 ))}
 </div>
 );
 };

 return (
 <div className="max-w-6xl mx-auto space-y-8">
 <ToolPageHeader icon={Hexagon} title="6-Letter Wordle"description="Step up the challenge with our 6-letter word puzzle featuring 7 attempts and extended vocabulary."/>
 
 <GlassCard>
 <CardHeader className={headerClass}>
 <div className="flex justify-between items-center w-full">
 <CardTitle className={titleClass}><Hexagon className="w-4 h-4"/> 6-Letter Challenge</CardTitle>
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
 <div className="flex flex-col gap-1">{renderGrid()}</div>
 {renderKeyboard()}
 </CardContent>
 </GlassCard>

 {showStats && (
 <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"onClick={() => setShowStats(false)}>
 <Card className="max-w-sm w-full bg-background p-6 space-y-4"onClick={e => e.stopPropagation()}>
 <CardTitle className="text-center text-2xl">{won ?"Brilliant!":"The word was:"+ solution.toUpperCase()}</CardTitle>
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
 <div className="flex-1 bg-muted rounded-sm h-5 flex items-center justify-end px-2 text-primary-foreground font-bold"style={{ width: `${Math.max(10, (count / Math.max(...stats.dist, 1)) * 100)}%`, backgroundColor: won && guesses.length === i + 1 ?"#2563eb":"#6b7280"}}>{count}</div>
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
 { step:"01", title:"Enter 6 Letters", description:"Type a valid 6-letter English word to begin your deduction process.", icon: Keyboard },
 { step:"02", title:"Decode the Colors", description:"Blue means exact match, Orange means wrong spot, Gray means absent.", icon: Hexagon },
 { step:"03", title:"Master the Grid", description:"Solve the puzzle within 7 attempts to maintain your winning streak.", icon: Trophy }
 ]} badges={["Extended Grid","7 Attempts","Brain Training"]} />

 <ToolFeatureGuides features={[
 { icon: Hexagon, title:"Expanded Grid", description:"A 6x7 matrix provides a deeper, more complex deductive reasoning challenge."},
 { icon: Keyboard, title:"Advanced Vocabulary", description:"Tests your knowledge of less common, longer English words and compound structures."},
 { icon: Trophy, title:"Separate Statistics", description:"Tracks your 6-letter performance independently from your standard 5-letter games."},
 { icon: RotateCcw, title:"Instant Replay", description:"Jump immediately into a new puzzle without waiting for a daily reset."}
 ]}>
 <div className="prose dark:prose-invert max-w-none mt-6">
 <h3>Elevate Your Word Puzzle Experience</h3>
 <p>For players who have mastered the standard 5-letter format, the 6-Letter Wordle offers a significantly more rigorous cognitive challenge. By adding just one extra letter to the target word and the guess matrix, the mathematical complexity of the game increases exponentially. The search space of valid English words expands dramatically, meaning your initial \"burner words\"(like CRANE or AUDIO) are no longer sufficient to guarantee a quick win. You must employ a much broader vocabulary and think critically about less common letter combinations, suffixes, and compound structures.</p>
 <p>To compensate for the increased difficulty, this version grants players 7 attempts instead of the standard 6. This delicate balance ensures the game remains fair while pushing your deductive limits. The color-coding system has also been adapted with a striking Blue/Orange theme to visually distinguish this mode from the classic green/yellow variant. Blue indicates a perfect positional match, while Orange signifies a correct letter in the wrong position.</p>
 <p>Whether you are a competitive wordsmith, a student looking to improve your spelling and vocabulary, or simply a puzzle enthusiast seeking a tougher mental workout, the 6-Letter Wordle provides an engaging, screen-friendly experience. Like all Toolzium utilities, it runs entirely locally in your browser. Your statistics, streaks, and guess distributions are saved securely on your device, ensuring a private, ad-free, and uninterrupted gaming session whenever you have a few spare minutes.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion faqs={[
 { question:"Why are there 7 attempts instead of 6?", answer:"The addition of a single letter exponentially increases the number of possible word combinations. The 7th attempt provides a necessary mathematical buffer to maintain a fair win rate compared to the 5-letter version."},
 { question:"Do my stats carry over from the 5-letter version?", answer:"No. To ensure accurate tracking of your skill level across different difficulties, the 6-Letter Wordle maintains a completely separate statistics profile in your local storage."},
 { question:"What do the blue and orange colors mean?", answer:"Blue replaces the traditional Green to indicate a letter is in the correct spot. Orange replaces Yellow to indicate the letter is in the word but in the wrong spot."}
 ]} />

 <RelatedTools currentToolUrl="/tools/fun/wordle-6letter" max={6} />
 </div>
 );
}

export { Wordle6LetterClient as Wordle6letterClient };
export default Wordle6LetterClient;
